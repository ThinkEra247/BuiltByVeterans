// Netlify Function: Proxy for Calendly API available times
// Environment variables (set in Netlify Dashboard > Site > Environment):
//   CALENDLY_API_TOKEN - Your personal access token
//   CALENDLY_EVENT_TYPE_URI - Your event type URI

exports.handler = async (event) => {
  const TOKEN = process.env.CALENDLY_API_TOKEN;
  const EVENT_TYPE_URI = process.env.CALENDLY_EVENT_TYPE_URI;

  if (!TOKEN || !EVENT_TYPE_URI) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing CALENDLY_API_TOKEN or CALENDLY_EVENT_TYPE_URI environment variables.' })
    };
  }

  const { start_time, end_time } = event.queryStringParameters || {};

  if (!start_time || !end_time) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing start_time or end_time query parameters.' })
    };
  }

  try {
    const url = `https://api.calendly.com/event_type_available_times?event_type=${encodeURIComponent(EVENT_TYPE_URI)}&start_time=${encodeURIComponent(start_time)}&end_time=${encodeURIComponent(end_time)}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch available times.' })
    };
  }
};
