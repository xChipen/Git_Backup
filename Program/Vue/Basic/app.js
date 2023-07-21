const app = Vue.createApp({
  data() {
    return {};
  },
  methods: {},
});

// app.component("test", {
//   template: `
//     <h1>自定義組件</h1>
//   `,
// });

app.component("test", {
  template: `
    <section>
      <button @click="leftClick">left</button>
      {{myname}}
      <button @click="rightClick">right</button>
    </section>
  `,
  data() {
    return {
      myname: "ABC",
    };
  },
  methods: {
    leftClick() {
      console.log("Left Click");
    },
    rightClick() {
      console.log("Right Click");
    },
  },
});

app.mount("#app");
