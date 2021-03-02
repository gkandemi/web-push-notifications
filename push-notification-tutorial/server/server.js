const webPush = require("web-push");
// const vapidKeys = webPush.generateVAPIDKeys();
const vapidKeys = {
  publicKey:
    "BKzZVuQH6nXRCJ5tx_-PQ9UUAKyg-WUyc-Xzl1Rsj4HqT_7IK0TjAkRGLao6rKGsbC2oe67GLlgKliuc0Bkaw0c",
  privateKey: "y4sqmuohkw5fRGWZSr8m9pgk69jUVhX9cyCF_bWVrug",
};
webPush.setVapidDetails(
  "mailto:info@kablosuzkedii.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
// console.log(vapidKeys);

const subscriberChrome = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/fImxgQak34o:APA91bFnI3coBICYr8Yqdl7BnkmdZpaVr-1AswxMrInALhLAhHSBquSwjpN7qOhChXVF-aWSiZhgRtl6AAaHLD112CDjI6wEVn-6yBvK-ylrX86GLH7Uuh-0OmzsAQ6jefpVR6C1cZZB",
  expirationTime: null,
  keys: {
    p256dh:
      "BJbKhHgYtsnc27tEcdZse7VHlpyEgSBFubw3w3Iz43jjBXJdelYzaeJ1tF-dWvfS5_aE9AjbYSO8HK_sQywxJoQ",
    auth: "1yPfOCUYyeh6nEv5890OCw",
  },
};
const subscriberFirefox = {
  endpoint:
    "https://updates.push.services.mozilla.com/wpush/v2/gAAAAABgPRz5Ae3YkDPFcWpJ0XhyezI_qO_97bqPBcD-OSbZjjiqBnL0QDfunbG1TwKVCcSZEVQue_2DspN1oQ6xSzVuaIWVM-yosYa4J0F6OGWx9ckpTPTi0p3VEzOvwTrT_jc7NTl5_3KsbJv3cm0QuOF937uKgX7mXjmdaHRtJOFuowOQ3Mc",
  keys: {
    auth: "P8jlNPtuZQWxkoiO0dS9Fg",
    p256dh:
      "BIpvJFC7jdx3or6p_vhmuB95JPBHrI5_khxAhO1ioRch4fiL2xvq96Objt1jO4s-U1E5axt-egTfE0RGRW-mAMQ",
  },
};

webPush.sendNotification(subscriberChrome, "Push Notification Nasıl Yapılır?");
webPush.sendNotification(subscriberFirefox, "Push Notification Nasıl Yapılır?");
