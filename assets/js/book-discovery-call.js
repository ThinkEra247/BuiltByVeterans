// Netlify Function: Book a discovery call via Calendly Scheduling API
// Endpoint: /.netlify/functions/book-discovery-call
// Uses POST /invitees with google_conference location
// v2.0 - Fixed endpoint and location

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
    const { start_time, name, email, timezone, org_type } = body;

    if (!start_time || !name || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing required fields: start_time, name, email" }),
      };
    }

    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || name;
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const inviteePayload = {
      event_type: CALENDLY_EVENT_URI,
      start_time: start_time,
      invitee: {
        name: name,
        first_name: firstName,
        last_name: lastName,
        email: email,
        timezone: timezone || "America/Chicago",
      },
      location: {
        kind: "google_conference"
      }
    };

    if (org_type) {
      inviteePayload.questions_and_answers = [
        { question: "What type of organization are you?", answer: org_type, position: 0 }
      ];
    }

    const response = await fetch("https://api.calendly.com/invitees", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CALENDLY_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inviteePayload),
    });

    const responseText = await response.text();

    if (!response.ok) {
      // Return everything so we can see it in the alert
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Calendly API returned " + response.status,
          calendly_response: responseText,
          request_sent: inviteePayload,
          token_starts_with: CALENDLY_TOKEN.substring(0, 10),
          event_type_uri: CALENDLY_EVENT_URI
        }),
      };
    }

    const data = JSON.parse(responseText);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        booking: data,
      }),
    };
  } catch (error) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: false, error: "Function error: " + error.message }),
    };
  }
};
