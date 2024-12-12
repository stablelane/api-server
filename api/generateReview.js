const dotenv = require('dotenv');
dotenv.config();


async function handler(req, res) {
  if (req.method === 'POST') {
    const { keywords, rating } = req.body;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // Free-tier friendly model
          messages: [{
            role: "user", content: `Generate a breif review for a store based on the following.Keywords: ${keywords}.
            Ensure the tone is positive and with something like 'Overall, I would give it a solid ${rating}-star experience.`
          }],
          max_tokens: 60, // Limits the output to conserve tokens
          temperature: 0.7, // Adds some creativity to the response
        }),
      });

      const data = await response.json();
      res.status(200).json({
        "api": process.env.OPENAI_API_KEY,
      });
    } catch (error) {
      console.error('Error fetching data from OpenAI:', error.response?.data || error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
module.exports = handler; 