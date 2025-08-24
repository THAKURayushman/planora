// server.js
const dotenv = require("dotenv");
dotenv.config(); // Load env vars before anything else

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
