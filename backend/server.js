const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize database (in-memory for simplicity)
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS progress (session_id TEXT, flag_found BOOLEAN)");
});

// API route to verify flag
app.post('/api/verify-flag', (req, res) => {
  const { flag } = req.body;
  const correctFlag = "KX{DR4G0NFLY_EXFIL}";
  if (flag === correctFlag) {
    // For simplicity, we're not tracking sessions. Just check the flag.
    res.json({ success: true, message: "Access granted. Facility intelligence secured." });
  } else {
    res.json({ success: false, message: "Incorrect. Trace the signal again." });
  }
});

// All other requests will be handled by React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});