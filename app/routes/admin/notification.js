const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const { protect, authorize } = require("../../middleware/auth");

router.use(protect);
router.use(authorize("superadmin", "help_desk"));

router.post("/", async (req, res, next) => {
  try {
    const fcmTokenOrTopic = req.body.to;
    const notificationBody = req.body.notification.body;
    const notificationTitle = req.body.notification.title;

    const serverKey = process.env.NOTIFICATION_SERVER_KEY;
    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Authorization: `key=${serverKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: fcmTokenOrTopic,
        notification: {
          body: notificationBody,
          title: notificationTitle,
        },
      }),
    });

    const responseData = await response.json();
    res.json(responseData);
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
