const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Home Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Node.js App Successfully Deployed 🚀",
    version: "v3.0",
    deployment: "Integrated with Jenkins CI/CD & GitHub Webhook",
    status: "Running Successfully"
  });
});

// Health Check Route (Good for DevOps / Jenkins)
app.get('/health', (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Start Server
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});