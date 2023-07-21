

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
        {{showMessage}}
    </div>
    <button @click="handleClick">OK</button>
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
},
methods:{
  showMessage(){
      return this.message;
  },
  handleClick(){
    this.message = Math.random(); // 畫面會連動更新
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

## 模板語法

```html
<span>Message: {{ msg }}</span>
<span v-once>这个将不会改变: {{ msg }}</span> 执行一次性地插值，当数据改变时，插值处的内容不会更新
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
v-html 轉譯 html 語法 「 避免使用 ： 容易导致 XSS 攻击 」
```

### Attribute 屬性

```html
<div v-bind:id="dynamicId"></div>
<button v-bind:disabled="isButtonDisabled">Button</button>
```

###  動態載入圖片 

```javascript
<img :src="imgpath"/>
...
this.imgpath="https://picsum.photos/id/237/200/300"
```



### 使用 JavaScript 表达式

```html
单个表达式

{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

### v-if 指令, 條件渲染

```html
<p v-if="seen">现在你看到我了</p>
```

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

```html
<div v-if="Math.random() > 0.5">
  Now you see me
</div>
<div v-else>
  Now you don't
</div>
```

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

#### 資料不同, 重新渲染 :key

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```



####  v-show

```html
true : display: block;
false: display: none; 佔據位置空間

<h1 v-show="ok">Hello!</h1>
v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS property display。
注意，v-show 不支持 <template> 元素，也不支持 v-else。
```

#### v-show vs v-if

```html
v-if : false 時不會佔據空間

v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。
```

---

## 列表渲染 v-for

```html
<ul id="example-1">
  <li v-for="item in items" :key="item.message">
    {{ item.message }}
  </li>
</ul>
--- of => in 功能一樣
<div v-for="item of items"></div>
```

```javascript
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
```

---

### 第二參數 index

```html
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

### for in object

```html
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
or
<div v-for="(value, name) in object">
  {{ name }}: {{ value }} => 鍵 ： 值
</div>
or
<div v-for="(value, name, index) in object">
  {{ index }}. {{ name }}: {{ value }} => 索引 ： 鍵 ： 值
</div>
```

```javascript
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
```

### for in number

```html
<span v-for="n in 10">{{ n }}</span>
1 ..10
```



## 數組更新檢測

```javascript
push(), pop(), shift(), unshift(), splice(), sort(), reverse()

```



### 計算屬性 [ 優點：不會重複計算 ]

```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

```html
<div id="example">
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```javascript
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
```

### 監聽屬性 : 當屬性改變就會觸發

```javascript
 watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
    or
    lastName(newValue, oldValue){
      this.fullName = this.firstName + ' ' + newValue
    }
  }
比較
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
```



---

## :class 與 :style 綁定

```html
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
結果為
<div class="static active"></div>
```

```javascript
data: {
  isActive: true, 透過 true or false 結定是否套用
  hasError: false
}
```

---

```html
<div v-bind:class="classObject"></div> 物件
結果為
<div v-bind:class="classObject"></div>
```

```javascript
  classObject: {
    active: true,  透過 true or false 結定是否套用
    'text-danger': false
  }
```

```html
<div :class="{ color: isActive ? 'demo redColor':'demo' }"></div>
demo, redColor => class Name
```

```html
<div class="font32" :class="{red:false}">{{name}}</div>
class 不受引響. :class動態改變
or
<div class="font32" :class="{red:canShow}">{{name}}</div>
or
<div class="font32" :class="xxx">{{name}}</div> 不需加() 如 : xxx()
computed:{
  xxx(){
    return {red：this.canShow}
  }
}
```



---

### 數組語法 「綁定名稱」

```html
<div v-bind:class="['activeClass', 'errorClass']"></div>
結果為
<div class="active text-danger"></div>
```

```javascript
data: {
  activeClass: 'active', 替換名稱===套用不同 class
  errorClass: 'text-danger'
}
```

```html
<div v-bind:class="[isActive ? activeClass : '', 'errorClass']"></div> 加入運算
```

```html
<div v-bind:class="[{ active: isActive }, 'errorClass']"></div> 加入物件判斷
```

```html
<div :class="['font32', { red:true }]">{{name}}</div> class Name 需加入 ''
```

### :style

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div> 記得加 ‘px’
```

```javascript
data: {
  activeColor: 'red',
  fontSize: 30 or 30 + 'px'
}
```

---

```html
<div v-bind:style="styleObject"></div> 直接綁定物件
```

```javascript
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

```html
<div :style="{ color: isActive ? 'red':'#ccc' }"></div>
透過 isActive 屬性 true or false => 'red' or '#ccc'

```



---

### 改變背景顏色

```html
<div :class="colors">{{ message }} - {{age}}</div>
```

```javascript
data:function(){ return ...}
簡寫成 ↓
data(){
  return{
    colors:'blue' // 1.需用字串 2. blue 指的是 css樣式. 可以透過工具確認有無加入
  }
}
```

```css
.blue{
    color: blue;
    font-size: 24px;
}
```

---

```javascript
<div :class="isColor?'red':'blue'">{{ someMessage }}</div>
改變 this.isColor = !this.isColor, 就可以套用不同 class. red, blue is className
```

```javascript
<div :class="{ active: isActive }"></div>
isActive : true 套用 active, false 不套用
```

---

###  透過 computed classObject 物件 

```javascript
<div v-bind:class="classObject"></div>
...
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

### 數組 + 事件

```html
    <div id="app">
      <div :class="dynamic">{{ name }}</div>
      <button @click="addFont32">Add</button>
      <button @click="removeFont32">Remove</button>
    </div>
```

```javascript
  data() {
    return {
      dynamic: ["blue"],
    };
  },
  methods: {
    removeFont32() {
      this.dynamic.pop(); // 移除
    },
    addFont32() {
      this.dynamic.push("font32"); // 加入
    }
}
```

```css
}
.blue {
  color: blue;
}
.font32 {
  font-size: 32px;
}
```

---

### Array function

**`push()`** 方法會添加一個或多個元素至陣列的**末端**，並且**回傳陣列的新長度**。 **+尾部**

 **`pop()`** 方法會移除並回傳陣列的**最後一個**元素。**-尾部**

 **`unshift()`** 方法會添加一個或多個元素至陣列的開頭，並且回傳陣列的新長度。 **+頭部**

 **`shift()`** 方法會移除並回傳陣列的**第一個**元素。此方法會改變陣列的長度。  **-頭部**

 **`slice()`** 方法會回傳一個新陣列物件，為原陣列選擇之 `begin` 至 `end`（不含 `end`）部分的淺拷貝（shallow copy）。**原本的陣列將不會被修改**。 

```javascript
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// Expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice());
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
```

 **`splice()`** 方法可以藉由刪除既有元素並／或加入新元素來改變一個陣列的內容。 

```javascript
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb'); 無刪除, 但有插入
// Inserts at index 1
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// Replaces 1 element at index 4
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]
```

### 差異

```javascript
filter()、concat() 和 slice()。它们不会变更原始数组，而总是返回一个新数组。

example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})

computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```



###  style 使用數組 

```html
<div :style="stylearr">ABBBZA</div>
...
[物件, 物件, ...]
stylearr:[{"backgroundColor":'red'}, {"fontSize":30+'px'}]
```



---

## 事件 @click

```html
<input type="text" :value="name" @keyup.enter="keyup($event)" />
顯示綁定 :value="name" 更新 @keyup.enter="keyup($event)"
@keyup.enter === v-on:keyup.enter
```

```javascript
keyup(event) {
  this.name = event.target.value;
}
$event 系統參數
```

### 雙向綁定 v-model

```html
<input type="text" v-model="name" /> 雙向綁定 v-model
```

### todolist

```html
    <div id="app">
      <input type="text" v-model="name" />
      <button @click="addData">Add</button>
      <ul>
        <li v-for="(item, index) in datalist" :key="item"> 加入:key識別.最好是唯一
          {{item}}
          <button @click="removeData(index)">Remove</button>
          <input type="text" /> 未加入 :key 識別, 會有問題. 因為Vue會重複利用 
        </li>
      </ul>
    </div>
```

```javascript
  data() {
    return {
      name: "123",
      datalist: [],
    };
  },
  methods: {
    addData() {  // 新增
      this.datalist.push(this.name);
      this.name = "";
    },
    removeData(index) { // 移除, 傳入所在位置. 然後重新渲染.
      this.datalist.splice(index, 1);
    },
  }
```

### 點擊變更顏色

```html
<li
    v-for="(item, index) in datalist"
    @click="change(index)" // 記錄目前的 index
    :class="current===index?'red':''" // 判斷套用class的條件
>
...
</li>
```

```javascript
data add property current

change(index) {
      this.current = index;
},
```



---

### 事件修飾符 .prevent

```html
<form @submit="submitForm">
    <input type="text" :value="name" />
    <button>Submit</button>
</form>
```

```javascript
submitForm(event) {
  event.preventDefault(); 阻止預設行為 : 發送
  alert(this.name);
}
```

```html
<form @submit.prevent="submitForm">
    <input type="text" :value="name" />
    <button>Submit</button>
</form>
@submit.prevent === event.preventDefault();

<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

使用修饰符时，顺序很重要
v-on:click.prevent.self 会阻止所有的点击
v-on:click.self.prevent 只会阻止对元素自身的点击
```

### 按鍵修飾符

```html
<input v-on:keyup.enter="submit">
<input v-on:keyup.page-down="onPageDown"> $event.key 等于 PageDown 时被调用
<input v-on:keyup.13="submit">
.enter, .tab, .delete (捕获“删除”和“退格”键), .esc, .space, .up, .down, .left, .right

// 全局 config.keyCodes 对象自定义按键修饰符别名： `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```

### 系統修飾鍵

```html
.ctrl, .alt, .shift, .meta
<!-- Alt + C -->
<input v-on:keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div v-on:click.ctrl="doSomething">Do something</div> ctrl 須按住不放
keyCode：keyup.17 單獨按一下 ctrl
```

### .exact 修飾符

```html
.exact 修饰符允许你控制由精确的系统修饰符组合触发的事件

<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>
```

### 滑鼠按鍵修飾符

```html
.left, .right, .middle
```

---

## 表單輸入綁定 v-model

```html
單行
<input v-model="message" placeholder="edit me">

多行
<textarea v-model="message" placeholder="add multiple lines"></textarea>

checkbox, 欄位
<input type="checkbox" id="checkbox" v-model="checked">
複選 checkbox, 綁定同數組
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>

radio
<input type="radio" id="one" value="One" v-model="picked"> 欄位

multi radio = list combobox
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span> 欄位
</div>

combobox multi selected
<div id="example-6">
  <select v-model="selected" multiple style="width: 50px;">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span> 陣列
</div>

v-for 渲染
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>

  data: {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
---
綁定值 value
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">

<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">

<!-- 当选中第一个选项时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>

選中後的值
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes" <==
  false-value="no" <==
>

<input type="radio" v-model="pick" v-bind:value="a">
// 当选中时
vm.pick === vm.a
```

### 修飾符

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg">

输入值转为数值类型
<input v-model.number="age" type="number">

首尾空白字符
<input v-model.trim="msg">
```





















