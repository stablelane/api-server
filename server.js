const express = require('express');

const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

// Parse incoming requests as JSON
app.use(express.json());

// Proxy endpoint
app.use('/api', (req, res) => {
  res.redirect('https://api-server-nine-mu.vercel.app/api' + req.path);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
