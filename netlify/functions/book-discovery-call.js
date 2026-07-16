// Netlify Function: Book a discovery call via Calendly
// Endpoint: /.netlify/functions/book-discovery-call

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
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
    const body = JSON.parse(event.body || "{}");

    const { start_time, name, email, timezone, notes } = body;

    if (!start_time || !name || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing required fields: start_time, name, email" }),
      };
    }

    const response = await fetch("https://api.calendly.com/scheduled_events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CALENDLY_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_type: CALENDLY_EVENT_URI,
        start_time,
        invitee: {
          name,
          email,
          timezone: timezone || "America/New_York",
          questions_and_answers: notes
            ? [{ question: "Notes", answer: notes }]
            : [],
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: "Calendly booking failed", details: errorText }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, booking: data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to book discovery call", details: error.message }),
    };
  }
};
