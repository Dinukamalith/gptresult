const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Endpoint to handle user questions
app.post('/ask', async (req, res) => {
  try {
    const question = req.body.question;

    // Make a request to GPT API
    const response = await axios.post("https://api.openai.com/v1/engines/davinci-codex/completions", {
      prompt: question,
      max_tokens: 100,
      temperature: 0.7,
    }, {
      headers: { 'Authorization': 'Bearer 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' }
    });

    const answer = response.data.choices[0].text.trim();

    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
