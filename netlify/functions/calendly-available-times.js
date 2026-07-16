// Netlify Function: Fetch available Calendly time slots
// Endpoint: /.netlify/functions/calendly-available-times
//
// Calendly's API limits availability lookups to 7-day windows.
// This function accepts start_time/end_time params and will batch
// requests in 7-day chunks to cover the full requested range.

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const CALENDLY_TOKEN = process.env.CALENDLY_API_TOKEN;
  const CALENDLY_EVENT_URI = process.env.CALENDLY_EVENT_TYPE_URI;

  if (!CALENDLY_TOKEN || !CALENDLY_EVENT_URI) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Calendly environment variables not configured" }),
    };
  }

  try {
    const params = event.queryStringParameters || {};
    const now = new Date();

    // Parse requested range (default: next 28 days)
    let start = params.start_time ? new Date(params.start_time) : now;
    let end = params.end_time ? new Date(params.end_time) : new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000);

    // Ensure start is not in the past
    if (start < now) start = now;

    // Cap at 60 days max to avoid too many API calls
    const maxEnd = new Date(start.getTime() + 60 * 24 * 60 * 60 * 1000);
    if (end > maxEnd) end = maxEnd;

    // Batch into 7-day windows (Calendly API limit)
    const allSlots = [];
    let windowStart = new Date(start);

    while (windowStart < end) {
      let windowEnd = new Date(windowStart.getTime() + 7 * 24 * 60 * 60 * 1000);
      if (windowEnd > end) windowEnd = end;

      const url = `https://api.calendly.com/event_type_available_times?event_type=${encodeURIComponent(CALENDLY_EVENT_URI)}&start_time=${encodeURIComponent(windowStart.toISOString())}&end_time=${encodeURIComponent(windowEnd.toISOString())}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${CALENDLY_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          statusCode: response.status,
          headers,
          body: JSON.stringify({
            error: "Calendly API error",
            details: errorText,
            request_url: url.replace(CALENDLY_TOKEN, "***"),
          }),
        };
      }

      const data = await response.json();
      if (data.collection) {
        allSlots.push(...data.collection);
      }

      windowStart = windowEnd;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ collection: allSlots }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to fetch available times", details: error.message }),
    };
  }
};
