
import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { keywords, rating } = req.body;

    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: `Generate a brief review for a store based on the following keywords: ${keywords}. Ensure the tone is positive and with something like 'Overall, I would give it a solid ${rating}-star experience.'`
          }],
          max_tokens: 60,
          temperature: 0.7
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
          }
        }
      );

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data from OpenAI:', error.response?.data || error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
