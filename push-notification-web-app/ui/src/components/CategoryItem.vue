<template>
  <div :class="{ [category.class]: true }">
    <span>
      <i :class="{ [category.icon]: true }" class="fab fa-2x"></i>
      <span>{{ category.title }} - {{ category.id }} </span>
    </span>
    <button @click="subscribe">Takip Et!</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["category"],
  data() {
    return {
      serviceWorker: null,
    };
  },
  methods: {
    async subscribe() {
      this.serviceWorker = await navigator.serviceWorker.ready;
      const clientID = await this.serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          "BKzZVuQH6nXRCJ5tx_-PQ9UUAKyg-WUyc-Xzl1Rsj4HqT_7IK0TjAkRGLao6rKGsbC2oe67GLlgKliuc0Bkaw0c",
      });
      // {...}
      axios
        .post(
          `https://shrouded-inlet-70590.herokuapp.com/subscribe/${this.category.id}`,
          {
            subscriber: clientID,
          }
        )
        .then((category_sub_response) => {
          console.log("category_sub_response :>> ", category_sub_response);
        });
    },
  },
  async created() {
    this.serviceWorker = await navigator.serviceWorker.register("./sw.js");
  },
};
</script>
