import express from "express";
import legalContent from "../data/legalContent.js";

const router = express.Router();

router.post("/contact-message", (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ message: "Name, email, and message are required." });
  }

  console.log("New contact submission:", { name, email, subject, message });

  res.status(200).json({
    message: "Thanks for contacting ImportEase. We will get back to you soon.",
  });
});

router.get("/:page", (req, res) => {
  const key = req.params.page?.toLowerCase();

  if (!key || !legalContent[key]) {
    return res.status(404).json({ message: "Requested page not found." });
  }

  res.json(legalContent[key]);
});

export default router;


