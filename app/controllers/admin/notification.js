const asyncHandler = require("../../middleware/async");
const deviceToken = require("../../models/DeviceToken");
// const fetch = require("node-fetch");
const { google } = require("googleapis");
// const axios = require("axios");
const SCOPES = "https://www.googleapis.com/auth/firebase.messaging";
const User = require("../../models/User");

const getAccessToken = () => {
  return new Promise(function (resolve, reject) {
    const key = require("../../../config/googleConfigFile.json");
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );

    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
};

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
    const access_token = await getAccessToken();
    var notification = JSON.stringify({
      message: {
        token: fcmTokenOrTopic, // this is the fcm token of user which you want to send notification
        notification: {
          body: notificationBody,
          title: notificationTitle,
        },
        apns: {
          headers: {
            "apns-priority": "10",
          },
          payload: {
            aps: {
              sound: "default",
            },
          },
        },
        data: req.body.for_app,
      },
    });
    const response = await fetch(
      "https://fcm.googleapis.com/v1/projects/pregnancy-journey/messages:send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: notification,
      }
    );

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
