const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const auth = require("../middleware/Auth");

// Search transactions by text (user-specific)
router.get("/search", auth, async (req, res) => {
  const { q } = req.query;

  try {
    const transactions = await Transaction.find({
      user: req.user.id,
      text: { $regex: q || "", $options: "i" }, // case-insensitive
    }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all transactions for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add transaction
router.post("/", auth, async (req, res) => {
  try {
    const { text, amount } = req.body;
    const transaction = await Transaction.create({
      text,
      amount,
      user: req.user.id,
    });
    res.status(201).json(transaction);
  } catch (err) {
    console.error("Transaction POST error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Delete transaction
router.delete("/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!transaction) return res.status(404).json({ msg: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
