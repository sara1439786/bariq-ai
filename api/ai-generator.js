export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Missing OPENAI_API_KEY in Vercel environment variables"
      });
    }

    const { prompt, contentType, goal, brandName, audience } = req.body || {};

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const systemPrompt = `
You are Bariq AI, a premium AI marketing assistant for businesses.

Generate marketing content in clean JSON only.

Return exactly this JSON structure:
{
  "headline": "...",
  "subline": "...",
  "hook": "...",
  "caption": "...",
  "reelScript": "...",
  "whatsAppPromo": "...",
  "googleAdCopy": "...",
  "carouselIdeas": "..."
}

Rules:
- Keep output practical, clear, premium, and conversion-focused
- Match the user's business type and audience
- Make text useful for Indian businesses too
- No markdown
- No extra explanation outside JSON
`;

    const userPrompt = `
Prompt: ${prompt}
Content Type: ${contentType || "Instagram / Meta Ad"}
Goal: ${goal || "Lead Generation"}
Brand Name: ${brandName || "Not provided"}
Audience: ${audience || "Not provided"}

Generate strong marketing content now.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.8,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: data.error?.message || "OpenAI request failed"
      });
    }

    const text = data.choices?.[0]?.message?.content || "{}";

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        error: "AI returned invalid JSON",
        raw: text
      });
    }

    return res.status(200).json(parsed);
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
}
