export default function handler(req, res) {
    if (req.method === 'POST') {
      const { keywords, rating } = req.body;
      // Perform logic with keywords and rating
      res.status(200).json({ message: `Review generated with ${rating} stars for keywords: ${keywords}` });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  