const asyncHandler = require("../../middleware/async");
const deviceToken = require("../../models/DeviceToken");
// const fetch = require("node-fetch");
const User = require("../../models/User");

// @desc      Send Notification To All User
// @route     POST /admin/api/v1/sendnotification/all
// @access    Private
exports.sendToAll = asyncHandler(async (req, res, next) => {
  const notificationBody = req.body.body;
  const notificationTitle = req.body.title;
  const serverKey = process.env.NOTIFICATION_SERVER_KEY;
  var allUsersWithToken = await deviceToken.findAll();
  allUsersWithToken = JSON.parse(JSON.stringify(allUsersWithToken));

  await Promise.all(
    allUsersWithToken.map(async (user) => {
      try {
        const response = await fetch("https://fcm.googleapis.com/fcm/send", {
          method: "POST",
          headers: {
            Authorization: `key=${serverKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: user.device_token,
            notification: {
              body: notificationBody,
              title: notificationTitle,
            },
          }),
        });

        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error("Error sending notification:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    })
  );

  res
    .status(200)
    .json({ success: true, message: "Notification send to all users" });
});

// eKYG2MEMSlaKAhbJ-orjwJ:APA91bFMDqJYztXRBAo5rj7Wy9SSblLAleKCG0S1p_Gw9D1VF0PHHKuRuNyLgo-qc2m9w9CLKvgX7TWCHoEaaTziwR1ZvfTwlveXdJfw7F7TLoEJnGB5aC6CK5atI8IodECVXQphLJhA
// 41628423748ss9+940994

// @desc      Send Notification To specific User
// @route     POST /admin/api/v1/sendnotification/:id
// @access    Private
exports.sendToUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  var data = await deviceToken.findOne({ where: { user_id: userId } });
  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No device token found for this user",
    });
  }
  var token = data.device_token;
  const fcmTokenOrTopic = token;
  const notificationBody = req.body.body;
  const notificationTitle = req.body.title;

  try {
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
    console.log(responseData);
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// @desc      Send Notification To Specific Country User
// @route     POST /admin/api/v1/sendnotification/:counteryId
// @access    Private
exports.sendToCountry = asyncHandler(async (req, res, next) => {
  const notificationBody = req.body.body;
  const notificationTitle = req.body.title;
  const serverKey = process.env.NOTIFICATION_SERVER_KEY;
  var allUsersWithToken = await deviceToken.findAll({
    include: [
      {
        model: User,
        where: { country: req.params.country },
      },
    ],
  });
  allUsersWithToken = JSON.parse(JSON.stringify(allUsersWithToken));
  console.log(allUsersWithToken);
  res.status(200).json({ allUsersWithToken });
});
