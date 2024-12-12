const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

// Parse incoming requests as JSON
app.use(express.json());

// Proxy endpoint
app.post('/api/generateReview', async (req, res) => {
  const { keywords, rating } = req.body;
  console.log(req.body)
  console.log("server")
  try {
    const response = await axios.post(
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

    // Send response back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from OpenAI:', error.body);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
