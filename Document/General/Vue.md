## 基本架構 使用 CDN

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="comm.css">
</head>
<body>
    <div id="app">
        {{message}}
    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

app.js

```javascript
const vm = Vue.createApp({
data(){
    return{
        message:"Hello world!!!"
    }
}
}).mount('#app');
```

---

## 透過事件異動資料

```javascript
透過事件異動資料
<button @click="num++">change</button>
<button @click="handlechange()">change</button>
data(){
  return{
    num:0
  }
},
methods:{
  handlechange(){
    vm.num++ or this.num++
  }
}
```

---

## 動態綁定

改變背景顏色

```html
<div :class="colors">{{ message }} - {{age}}</div>
```

```javascript
data(){
  return{
    colors:'blue' // 1.需用字串 2. blue 指的是 css樣式
  }
}
```

```css
.blue{
    color: blue;
    font-size: 24px;
}
```





