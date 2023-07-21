function attackValue(max, min) {
  return Math.floor(Math.random(max - min)) + min; // max ~ min
}
const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      winer: null,
      counter: 0,
    };
  },
  watch: {
    monsterHealth(value) {
      if (value <= 0) {
        this.winer = this.playerHealth !== 0 ? "Player" : "draw";
      }
    },
    playerHealth(value) {
      if (value <= 0) {
        this.winer = this.monsterHealth !== 0 ? "Monster" : "draw";
      }
    },
  },
  computed: {},
  methods: {
    attackMonster() {
      this.counter++;
      const vv = attackValue(10, 5);
      this.monsterHealth -= vv;
      this.attackPlayer();
    },
    attackPlayer() {
      const vv = attackValue(15, 10);
      this.playerHealth -= vv;
    },
    attackMonsterSp() {
      this.counter++;
      const vv = attackValue(20, 15);
      this.monsterHealth -= vv;
      this.attackPlayer();
    },
    addPlayerHealth() {
      this.counter++;
      const vv = attackValue(20, 15);
      this.playerHealth += vv;
      this.attackPlayer();
    },
  },
});

app.mount("#app");
