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
