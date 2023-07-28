const app = Vue.createApp({
  data() {
    return {
      name: "Jelly",
      age: 28,
      iWidth: 200,
    };
  },
  methods: {
    showUserNo() {
      alert(this.$refs.userNo.value);
    },
  },
  computed: {
    getWidth() {
      return { width: 300 + "px" };
    },
  },
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
      <div>{{myname2}} - {{myage}}</div>
    </section>
  `,
  props: ["myname2", "myage"],
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
