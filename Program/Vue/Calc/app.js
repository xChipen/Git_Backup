const app = Vue.createApp({
  data() {
    return {
      someMessage: "Hello World!!!",

      sum: 0,
      temp: "",
      sTemp: "",
      sTemp2: "",
      func: "",
      nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, "0"],
      funcs: ["+", "-", "*", "/", "C", "="],
      show: false,
    };
  },
  watch: {
    sTemp(value) {
      this.show = value !== "" || this.sTemp2 !== "";
    },
    sTemp2(value) {
      this.show = value !== "" || this.sTemp !== "";
    },
  },
  methods: {
    numClick(evt) {
      if (this.func === "") {
        this.sTemp += evt.target.innerHTML;
      } else {
        this.sTemp2 += evt.target.innerHTML;
      }
    },
    funcClick(evt) {
      const data = evt.target.innerHTML;
      if (data === "C") {
        this.sum = 0;
        this.clear();
      } else if (data === "=") {
        if (this.sTemp === "") {
          this.sum = this.calc(this.sum, parseInt(this.sTemp2, 10), this.func);
        } else {
          this.sum = this.calc(
            parseInt(this.sTemp, 10),
            parseInt(this.sTemp2, 10),
            this.func
          );
        }
        this.clear();
      } else this.func = data;
    },
    calc(num, num2, fun) {
      if (fun === "+") return num + num2;
      else if (fun === "-") return num - num2;
      else if (fun === "*") return num * num2;
      else if (fun === "/") return num / num2;
      else return 0;
    },
    clear() {
      this.sTemp = "";
      this.sTemp2 = "";
      this.func = "";
    },
  },
  computed: {},
});

app.mount("#app");
