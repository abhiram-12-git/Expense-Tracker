const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/Auth");
const transactions = require("./routes/transactions");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/" , ()=> {
    console.log("working")
})

// Routes
app.use("/api/transactions", transactions);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
