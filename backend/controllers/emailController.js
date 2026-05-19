import transporter from "../config/mailer.js";
import User from "../models/Users.js";
import EmailSubscriber from "../models/EmailSubscriber.js";
import buildEmailHTML from "../utils/emailTemplates.js";
import sendInBatches from "../utils/rateLimiter.js";
import jwt from "jsonwebtoken";

// helper
const getAllRecipients = async () => {
  const [users, subs] = await Promise.all([
    User.find({ role: "customer", unsubscribed: false, isActive: true })
      .select("email")
      .lean(),
    EmailSubscriber.find({ unsubscribed: false }).select("email").lean(),
  ]);

  return [
    ...new Set([...users.map((u) => u.email), ...subs.map((s) => s.email)]),
  ];
};

const generateUnsubscribeToken = (email) => {
  return jwt.sign({ email }, process.env.UNSUBSCRIBE_JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const sendBulkEmail = async (req, res) => {
  const { subject, body } = req.body;

  if (!subject?.trim() || !body?.trim()) {
    return res.status(400).json({ message: "Subject and body are required" });
  }

  try {
    const recipients = await getAllRecipients();
    if (recipients.length === 0) {
      return res.status(400).json({ message: "No recipients found" });
    }

    const sendFn = async (recipient) => {
      const token = generateUnsubscribeToken(recipient);
      const unsubscribeUrl = `${process.env.FRONTEND_URL}/unsubscribe?token=${token}`;

      await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.GMAIL_USER}>`,
        to: recipient,
        subject: subject.trim(),
        html: buildEmailHTML({
          subject: subject.trim(),
          body: body.trim(),
          unsubscribeUrl,
        }),
      });
    };

    const results = await sendInBatches({
      recipients,
      sendFn,
      batchSize: 10,
      delayMs: 1000,
    });

    return res.status(200).json({
      message: "Bulk email job complete",
      total: recipients.length,
      sent: results.sent,
      failed: results.failed,
      ...(process.env.NODE_ENV === "development" && { errors: results.errors }),
    });
  } catch (err) {
    console.error("[sendBulkEmail] error:", err);
    return res.status(500).json({ error: "Failed to send emails." });
  }
};

export const unsubscribe = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({ error: "Token is required." });
  }

  try {
    const { email } = jwt.verify(token, process.env.UNSUBSCRIBE_JWT_SECRET);

    await Promise.all([
      User.updateOne({ email }, { $set: { unsubscribed: true } }),
      EmailSubscriber.updateOne({ email }, { $set: { unsubscribed: true } }),
    ]);

    return res.status(200).json({ message: "Unsubscribed successfully." });
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return res.status(400).json({ error: "Unsubscribe link has expired." });
    if (err.name === "JsonWebTokenError")
      return res.status(400).json({ error: "Invalid unsubscribe link." });

    console.error("[unsubscribe] error:", err);
    return res.status(500).json({ error: "Failed to unsubscribe." });
  }
};
