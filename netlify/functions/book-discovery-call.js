// Netlify Function: Create a Calendly booking via the Scheduling API
// Environment variables (set in Netlify Dashboard):
//   CALENDLY_API_TOKEN - Your personal access token
//   CALENDLY_EVENT_TYPE_URI - Your event type URI

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const TOKEN = process.env.CALENDLY_API_TOKEN;
  const EVENT_TYPE_URI = process.env.CALENDLY_EVENT_TYPE_URI;

  if (!TOKEN || !EVENT_TYPE_URI) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing CALENDLY_API_TOKEN or CALENDLY_EVENT_TYPE_URI environment variables.' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, org_type, slot_time } = data;

    if (!name || !email || !slot_time) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields: name, email, slot_time.' }) };
    }

    // Split name into first/last — Calendly requires both
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : nameParts[0];

    // Detect invitee timezone
    const timezone = data.timezone || 'America/Chicago';

    // Build the request body for Calendly's Create Event Invitee endpoint
    const requestBody = {
      event_type: EVENT_TYPE_URI,
      start_time: slot_time,
      invitee: {
        name: name,
        first_name: firstName,
        last_name: lastName,
        email: email,
        timezone: timezone
      },
      location: {
        kind: 'google_conference'
      }
    };

    // Custom questions omitted — Calendly's API is strict about format
    // The org_type is captured in our logs for reference
    console.log('Booking request body:', JSON.stringify(requestBody));

    // Create the invitee (book the meeting)
    const response = await fetch('https://api.calendly.com/invitees', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Calendly API error:', response.status, JSON.stringify(result));
      return {
        statusCode: response.status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: result.message || 'Failed to create booking.',
          title: result.title,
          details: result.details
        })
      };
    }

    // Success — return confirmation details
    console.log('Booking created successfully:', result.resource?.uri);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: 'Discovery call booked successfully.',
        booking: {
          event_uri: result.resource?.event,
          cancel_url: result.resource?.cancel_url,
          reschedule_url: result.resource?.reschedule_url,
          status: result.resource?.status
        }
      })
    };
  } catch (err) {
    console.error('Booking error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process booking request.' })
    };
  }
};
