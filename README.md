# Web Push Notification Nedir? Nasıl Kullanılır? | Netlify | Heroku ve daha fazlası

**Not :** Bu doküman kablosuzkedi youtube kanalı için hazırlanmıştır.

Bu dersimizde herhangi bir özel servis kullanmadan kendimize ait Native bir web push notification nasıl geliştiririz onu görüyoruz. Bunu yaparken 2 farklı bölüm ile ilerleyeceğiz. Birinci bölümde Push Notification için gerekli olan temel bilgileri aldıktan sonra **kategori bazlı nasıl bildirim gönderebiliriz?** sorusuna cevap verecek bir uygulama geliştiriyoruz.

2 uygulamayı da JavaScript temelli geliştiriyoruz fakat Siz yine de bildirimleri sunucu üzerinden PHP ya da başka bir dil kullanarak da gönderebilirsiniz. Aşağıda PHP için güzel bir kaynak önereceğim.

### Nasıl Oluyor?

Temel olarak yapacağımız işlem aslında oldukça basit. Siz sizden bildirim almak isteyen Client'lara Sunucu üzerinden bir bildirim gönderiyorsunuz Tarayıcınız içerisinde **Service Worker** olarak kayıt ettiğimiz uygulamamız otomatik olarak bunu alıyor ve daha sonrasında belirlediğimiz kriterlere göre bu bildirimi size gösteriyor.

Yani temel olarak uygulamalarımız 3 bölümden oluşuyor diyebiliriz.

- Server
- Client (UI) [Buradan Ulaşabilirsiniz](https://hardcore-perlman-bef54f.netlify.app/)
- Service Worker

Yapacağımız uygulamalar ise aşağıdaki gibidir.

### Push Notification Tutorial

Uygulaması içerisinde Push Notification'a ait temellerimizi atıyoruz.

**Server (Node.js)**

```
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

```

**UI (Basit HTML ve JS)**

```
window.addEventListener("load", async () => {
  const subscribeButton = document.querySelector("#subscribeButton");

  // Register Service Worker
  const sW = await navigator.serviceWorker.register("./sw.js");
  console.log("Service Worker => ", sW);

  subscribeButton.addEventListener("click", async () => {
    const serviceWorker = await navigator.serviceWorker.ready;
    const clientID = await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        "BKzZVuQH6nXRCJ5tx_-PQ9UUAKyg-WUyc-Xzl1Rsj4HqT_7IK0TjAkRGLao6rKGsbC2oe67GLlgKliuc0Bkaw0c",
    });

    console.log(clientID);
    console.log(JSON.stringify(clientID));
  });
});
```

**Service Worker**

```
self.addEventListener("push", (e) => {
  console.log("e :>> ", e.data.text());
  const config = {
    body: e.data.text() || "Yeni Makaleye Gözatın!!",
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "3",
    },
    icon: "images/logo.png",
    vibrate: [100, 50, 100],
    actions: [
      {
        action: "explore",
        title: "Action1",
        // icon: "images/"
      },
      {
        action: "close",
        title: "Bildirimi Kapat",
        // icon:
      },
    ],
  };
  e.waitUntil(
    self.registration.showNotification("Yeni Makale Eklendi!!", config)
  );
});
```

### Push Notification Web App

Bu uygulama içerisinde kategori bazlı Web Push Notification nasıl gönderilir sorusuna cevap veriyoruz. Buradaki tek fark

- Server (Node.js) [Buradan ulaşabilirsiniz](https://shrouded-inlet-70590.herokuapp.com/)
- UI (Vue.js) [Buradan ulaşabilirsiniz](https://friendly-franklin-30c32c.netlify.app/)
- Service Worker

**Server (app.js)**

```
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Web Push Ayarları..
const webPush = require("web-push");
const vapidKeys = {
  publicKey: "BKzZVuQH6nXRCJ5tx_-PQ9UUAKyg-WUyc-Xzl1Rsj4HqT_7IK0TjAkRGLao6rKGsbC2oe67GLlgKliuc0Bkaw0c",
  privateKey: "y4sqmuohkw5fRGWZSr8m9pgk69jUVhX9cyCF_bWVrug",
};
webPush.setVapidDetails("mailto:info@kablosuzkedii.com", vapidKeys.publicKey, vapidKeys.privateKey);

const PORT = process.env.PORT || 3000;
let { categoryList } = require("./data");

app.get("/", (req, res) => {
  res.status(200).send({ categoryList });
});
app.post("/subscribe/:categoryId", (req, res) => {
  if (req.params.categoryId && req.body.subscriber) {
    const matchedCategory = categoryList.find((c) => c.id == req.params.categoryId);
    if (!matchedCategory) return status(404).send({ message: "Kategori Bulunamadı!" });

    matchedCategory.subscriberList.push(req.body.subscriber);
    return res.status(201).send({
      message: `Tebrikler! ${matchedCategory.title} kategorisine bir konu eklendiğinde ilk sizin haberiniz olacak!`,
      category: {
        id: matchedCategory.id,
        title: matchedCategory.title,
      },
    });
  } else {
    return res.status(400).send({ message: "Eksik bilgi gönderildi..." });
  }
});

app.post("/send_notification/:categoryId", (req, res) => {
  if (req.params.categoryId && req.body.message) {
    const matchedCategory = categoryList.find((c) => c.id == req.params.categoryId);
    if (!matchedCategory) return status(404).send({ message: "Kategori Bulunamadı!" });

    const subscriberList = matchedCategory.subscriberList || [];

    subscriberList.forEach((sub) => {
      webPush.sendNotification(sub, req.body.message);
    });

    return res.status(201).send({
      message: `Bildirimler gönderildi..`,
    });
  } else {
    return res.status(400).send({ message: "Eksik bilgi gönderildi..." });
  }
});

app.listen(PORT, () => {
  console.log("Sunucu Başarılı bir şekilde çalışıyor...");
});

```

**DB (data.js)**

```
const { uid } = require("uid");

module.exports = {
  categoryList: [
    {
      id: uid(),
      title: "HTML 5",
      class: "html5",
      icon: "fa-html5",
      subscriberList: [],
    },
    {
      id: uid(),
      title: "JavaScript",
      class: "js",
      icon: "fa-js",
      subscriberList: [],
    },
    {
      id: uid(),
      title: "Vue",
      class: "vuejs",
      icon: "fa-vuejs",
      subscriberList: [],
    },
    {
      id: uid(),
      title: "React",
      class: "react",
      icon: "fa-react",
      subscriberList: [],
    },
    {
      id: uid(),
      title: "Node",
      class: "node",
      icon: "fa-node",
      subscriberList: [],
    },
    {
      id: uid(),
      title: "AWS",
      class: "aws",
      icon: "fa-aws",
      subscriberList: [],
    },
    {
      id: uid(),
      title: "SASS",
      class: "sass",
      icon: "fa-sass",
      subscriberList: [],
    },
    {
      id: uid(),
      title: "CSS3",
      class: "css",
      icon: "fa-css3",
      subscriberList: [],
    },
    {
      id: uid(),
      title: "Facebook Geliştiricileri",
      class: "facebook",
      icon: "fa-facebook",
      subscriberList: [],
    },
    {
      id: uid(),
      title: "Twitter Geliştiricileri",
      class: "twitter",
      icon: "fa-twitter",
      subscriberList: [],
    },
    {
      id: uid(),
      title: "Windows",
      class: "microsoft",
      icon: "fa-microsoft",
      subscriberList: [],
    },
    {
      id: uid(),
      title: "macOS",
      class: "apple",
      icon: "fa-apple",
      subscriberList: [],
    },
  ],
};

```

**UI (Basit VueApp)**
Bunun kodlarını buraya eklemedim takdir edersiniz ki :)) Fakat repo içerisinde bulabilirsiniz :)
**Service Worker**

```
self.addEventListener("push", (e) => {
  const config = {
    body: e.data.text() || "Yeni Makaleye Gözatın!!",
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "3",
    },
    icon: "images/logo.png",
    vibrate: [100, 50, 100],
    actions: [
      {
        action: "explore",
        title: "Action1",
        // icon: "images/"
      },
      {
        action: "close",
        title: "Bildirimi Kapat",
        // icon:
      },
    ],
  };
  e.waitUntil(
    self.registration.showNotification("Yeni Konu Eklendi!!", config)
  );
});

```

### Kaynaklar

- [Push Notification Doküman](https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications)
- [Web Push NPM Package](https://www.npmjs.com/package/web-push)
- [Web Push PHP Library](https://github.com/web-push-libs/web-push-php)
