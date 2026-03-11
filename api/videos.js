export default async function handler(req, res) {
  const query = req.query.q || "business";

  try {
    const response = await fetch(
      "https://api.pexels.com/videos/search?query=" +
        encodeURIComponent(query) +
        "&per_page=4",
      {
        headers: {
          Authorization: process.env.PEXELS_KEY
        }
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Video fetch failed" });
  }
}
