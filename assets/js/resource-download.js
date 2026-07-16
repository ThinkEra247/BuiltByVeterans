// Netlify Function: Gated resource download
// Endpoint: /.netlify/functions/resource-download
//
// Accepts email + resource slug, stores the lead, returns the download URL.
// Verifies the PDF exists before returning the link.
// Leads are stored via Netlify Blobs (built-in KV store, no external service needed).

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

  try {
    const body = JSON.parse(event.body || "{}");
    const { email, resourceSlug, source } = body;

    if (!email || !resourceSlug) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing required fields: email, resourceSlug" }),
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid email address" }),
      };
    }

    // Validate slug format (alphanumeric + hyphens only, reasonable length)
    const slugRegex = /^[a-z0-9-]{3,80}$/;
    if (!slugRegex.test(resourceSlug)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid resource slug format" }),
      };
    }

    // Build the download URL
    const siteUrl = process.env.URL || "https://builtbyveterans.ai";
    const resourceBasePath = "/resources/downloads/";
    const resourceFile = `${resourceBasePath}${resourceSlug}.pdf`;
    const downloadUrl = `${siteUrl}${resourceFile}`;

    // Verify the PDF actually exists before promising a download
    try {
      const checkResponse = await fetch(downloadUrl, { method: "HEAD" });
      if (!checkResponse.ok) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            error: "Resource not available yet",
            message: "This resource is being prepared and will be available shortly. Please try again in a few minutes.",
          }),
        };
      }
    } catch (fetchErr) {
      // If we can't verify (e.g., network issue), still return the URL
      // but log the warning — better to attempt the download than block it
      console.log("Could not verify PDF existence:", fetchErr.message);
    }

    // Store the lead using Netlify Blobs (serverless KV — no external DB needed)
    // Falls back gracefully if Blobs aren't available
    try {
      const { getStore } = await import("@netlify/blobs");
      const store = getStore("resource-leads");

      const leadKey = `${Date.now()}-${email.replace(/[^a-z0-9]/gi, "_")}`;
      await store.setJSON(leadKey, {
        email,
        resourceSlug,
        source: source || "article",
        downloadedAt: new Date().toISOString(),
        userAgent: event.headers["user-agent"] || "",
      });
    } catch (blobErr) {
      // If Blobs unavailable (local dev, etc.), log and continue
      console.log("Blob storage unavailable, lead not persisted:", blobErr.message);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        downloadUrl,
        resourceTitle: resourceSlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to process download request", details: error.message }),
    };
  }
};
