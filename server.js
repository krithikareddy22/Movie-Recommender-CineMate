const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files and parse JSON
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle new rating submission
app.post('/add-rating', (req, res) => {
  const { movieId, rating } = req.body;

  if (!movieId || typeof rating !== 'number') {
    return res.status(400).send('Invalid data');
  }

  const line = `999,${movieId},${rating}\n`;
  const filePath = path.join(__dirname, 'public','data', 'rating_generated.csv');

  fs.appendFile(filePath, line, (err) => {
    if (err) {
      console.error('❌ Error writing to CSV:', err);
      return res.status(500).send('Server error');
    }
    res.status(200).send('✅ Rating saved');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
