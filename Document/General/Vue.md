

## 基礎
### 基本架構 使用 CDN

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



## 模板語法 

```html
<span>Message: {{ msg }}</span>
<span v-once>这个将不会改变: {{ msg }}</span> 
执行一次性地插值，当数据改变时，插值处的内容不会更新

<p>Using v-html directive: <span v-html="rawHtml"></span></p>
v-html 轉譯 html 語法 「 避免使用 ： 容易导致 XSS 攻击 」
```
### Attribute 屬性

```html
<div v-bind:id="dynamicId"></div>
<button :disabled="isButtonDisabled">Button</button> 簡寫

<button :disabled="isButtonDisabled">Button</button> boolean

const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}

<div v-bind="objectOfAttrs"></div> 动态绑定多个值
```

```html
<input type="text" :value="someMessage" disabled />
===
<input type="text" :value="someMessage" :disabled="true" />
===
<input type="text" :value="someMessage" :disabled="someMessage !== ''" />

:disabled="false" 自動移除屬性
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


## 響應式基礎
## 計算屬性
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
###  透過 computed classObject 物件 

```javascript
<div :class="classObject"></div>
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

### 過程

```html
一般 HTML
<div id="test1" style="{width: 200px;}">TEST</div>

套用 computed (避免太多語法寫在HTML中), style前面要加 冒號 : 
缺點 : 無法傳入參數, 優點 : 不會隨時計算
1.
<div id="test2" :style="getWidth">TEST</div> // getWidth不用加()
  computed: {
    getWidth() {
      return { width: 300 + "px" }; // 單位要用 " or ' 括起來
    },
  }
2. 加入 this.playerWidth 
<div id="test2" :style="getWidth">TEST</div>
data(){
  return{
    playerWidth:300
  }
},
  computed: {
    getWidth() {
      return { width: this.playerWidth + "px" };
    },
  }
```



## :class 與 :style 綁定

```html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
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
<div :class="classObject"></div> 物件
結果為
<div class="active"></div>
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
errorClass 一直生效. isActive = true, activeClass 才會生效
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

```html
<div :style="{backgroundColor:'red'}">ABC</div>
background-color => backgroundColor 駝峰式
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
###  style 使用數組 

```html
<div :style="stylearr">ABBBZA</div>
...
[物件, 物件, ...]
stylearr:[{"backgroundColor":'red'}, {"fontSize":30+'px'}]
```

## 條件渲染
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

## 事件處理
### 透過事件異動資料

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
### 事件 @click

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

因為冒泡事件, 點擊 li click 會接著觸發 ul click
<ul @click="ulclick">
 <li @click="liclick">111</li>
 <li>222</li>
</ul>

<!-- 阻止单击事件继续传播 -->
<li @click.stop="liclick">111</li> 阻止冒泡事件
or
<ul @click.self="ulclick"> 限定點選自己有效

@click.once 只觸發一次
    
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
    
阻止預設事件
<a href="http://www.google.com" @click.prevent>Google</a>

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

```html
<button @click="isShow=true">Show</button>
<div class="box" v-show="isShow" @click.self="isShow=false"> 
  <input type="text" />
</div>
@click.self => 點選 div才會隱藏.未加入. self 點選 input text 也會隱藏.
or
input 中加入 @click.stop
```



### 按鍵修飾符.enter ...

```javascript
傳統的方式
keyup(evt) {
// keyboardEvent, 按鍵碼, 輸入值
  console.log(evt, evt.keyCode, evt.target.value);
  if (evt.keyCode === 13) {  // 只有輸入 enter 時才顯示訊息
    alert(evt.target.value);
  }
}
簡化後
<input type="text" @keyup.enter="keyup" /> 輸入 enter 時觸發
<input type="text" @keyup.enter.ctrl="keyup" /> 輸入 enter + ctrl 時觸發
<input type="text" @keyup.65="keyup" /> 輸入 a 時觸發
```

```html
<input v-on:keyup.enter="submit">
<input v-on:keyup.page-down="onPageDown"> $event.key 等于 PageDown 时被调用
<input v-on:keyup.13="submit">
.enter, .tab, .delete (捕获“删除”和“退格”键), .esc, .space, .up, .down, .left, .right, shift

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

### ref, this.$refs

```html
<input type="text" ref="userNo" />  // 加入 ref
<button @click="showUserNo">show UserNo</button>

  methods: {
    showUserNo() {
      alert(this.$refs.userNo.value); // 透過 this.refs 取值
    },
  },
```

## 表單輸入綁定
### 雙向綁定 v-model

```html
<input type="text" v-model="name" /> 雙向綁定 v-model
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
### 表單輸入綁定 v-model

```html
單行
<input v-model="message" placeholder="edit me">
message is string

多行
<textarea v-model="message" placeholder="add multiple lines"></textarea>
message is string

checkbox, 欄位
<input type="checkbox" id="checkbox" v-model="checked">
checked if boolean

複選 checkbox, 綁定同數組
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
checkedNames is []

radio
<input type="radio" id="one" value="One" v-model="picked"> 欄位
picked is string

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
selected is []

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
selected is []

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

## 生命週期
## 監聽器
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

## 模板引用
## 組件基礎

## 範例















---



---







---



---



### 存取本地資料 localStorage

```javascript
myArea: localStorage.getItem("myArea") 取本地資料
localStorage.setItem("myArea", this.myArea); 儲存本地
```

### 模糊查詢

```html
<input type="text" v-model="indata" @input="inputHandle" />
<ul>
  <li v-for="item in newDataList">{{item}}</li>
</ul>
```

```javascript
  data() {
    return {
      someMessage: "Hello World!!!",
      indata: "",
      dataList: ["a", "aa", "aab", "ba", "ccb", "cba", "bba"],
      newDataList: [],
    };
  },
  methods: {
    inputHandle() {
      this.newDataList = this.dataList.filter((item) => {
        return item.includes(this.indata);
      });
    },
  },
```


### 購物車

```html
datalist:[] 來源資料
checklist:[] 選取的資料
isAll 是否全選

<div id="app">
  <div class="box">
    雙向綁定, 點擊時處理資料. checkbox 時 @change 後資料才會改變
    <input type="checkbox" v-model="isAll" @change="allChange" />

    <ul v-for="(item, index) in datalist" :key="item">
      <li>
        <div>
          <input
            type="checkbox"
            v-model="checklist" 資料存入checklist
            :value="item"       存入的資料
            @change="ckChange"  當勾選觸發重新計算金額
          />
        </div>
        <div>
          <img :src="item.pic" alt="" /> 顯示圖片
        </div>
        <div>{{item.name}} ${{item.price}}</div> 顯示商品名稱與價格
        <div>
          <button
            class="btnA"
            type="button"
            @click="item.qty++"                增加數量
            :disabled="item.qty===item.limit"  限制最大數量
          >
            +
          </button>
          {{item.qty}}
          <button
            class="btnA"
            type="button"
            @click="item.qty--"        減少數量
            :disabled="item.qty===1"   限制最小數量
          >
            -
          </button>
        </div>
        <div>
          <button
            type="button"
            class="btnB"
            @click="delAllClick(index, item.id)" 處理刪除
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
  <div>{{sum()}}</div> 顯示加總金額
  {{checklist}}
</div>
```

```javascript
methods: {
  處理金額加總
  sum() {
    var total = 0;
    this.checklist.forEach((item) => (total += item.price * item.qty));
    return total;
  },
  刪除商品處理. index 處理 datalist, id 處理 checklist
  delAllClick(index, id) {
    console.log(index, id);
    this.datalist.splice(index, 1);
    this.checklist = this.checklist.filter((item) => item.id !== id); 取出非目前的商品
    this.ckChange(); 重新顯示 是否全選
  },
  全選, 全部選的處理
  allChange() {
    if (this.isAll)
         this.checklist = this.datalist;
    else this.checklist = [];
  },
  單筆選取與不選取時, 處理是否全選的顯示
  ckChange() {
    this.isAll = this.checklist.length === this.datalist.length;
  },
},
---
改變一: 計算的改成 computed 避免重複計算
computed: {
  sum() {
    var total = 0;
    this.checklist.forEach((item) => (total += item.price * item.qty));
    return total;
  },
},
{{sum()}} =>改成 {{sum}}
---
改變二: 改成 watch 資料監控.  [ 適用於異步處理 ]

mydata:""
...
watch:{
  mydata(newval, oldval){  建立與變數相同名稱函式
    ....
  }
}
---
差異:
methods  : 適用如點擊觸發
computed : 計算類[ 缺點無法傳參數 ]
watch    : 異步回傳
```



## Javascript

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

### Fetch get

```javascript
fetch("http://127.0.0.1:5500/json/test.json")
  .then((res) => res.json()) // 第一次處理相關例外...
                 res.json() 可以換成=> res.text() 
         回傳對象                 回傳字串
  .then((res) => (this.mydata = res)) // 第二次取回資料
  .catch(err=>{
	console.log(err) // 錯誤處理
}) 
```

###  Fetch post 

```javascript
方式一
fetch("", {
  method: "post",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: "name=kerwin&age=20",
})
  .then((res) => res.json())
  .then((res) => console.log(res));
---
方式二
fetch("", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "kerwin", age: 20 }),
})
  .then((res) => res.json())
  .then((res) => console.log(res));
```

### axios 

```javascript
axios
  .get("http://127.0.0.1:5500/json/test.json")
                                          狀態          .data 取回資料
  .then((res) => console.log(res.status, res.data));
---
會自動調整, 不需特別傳入參數
axios.post("", "name=kerwin&age=20")
axios.post("", {name:"kerwin", age:20})
```

## 深入組件

### Cli

```html
更新 npm      => npm update -g
安裝 vue/cli  => npm install -g @vue/cli
建立 test 專案 => vue create test (專案名稱)

VS-Code 安裝 ESLint
修改參數
    "editor.codeActionsOnSave": {
        "source.fixAll": true
    }
Vetur 語法高亮檢查
```

```html
檔案說明 ：
App.vue 	=》 程式進入點 

jsconfig.json =》基本設定
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "node",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ],
    "allowJs":true 允許使用 javascript, 預設為 typescript
  }
}
```

```html
.vue 格式 => 1.template, 2.script, 3.style
HelloView.vue 2個單字組成
<template>
    <h1>Hello world!!!</h1h1>
</template>
<script>
    export default{
        name: 'HelloView'
    }
</script>
<style lang="css">
    h1{
        color:lightgreen;
    }
</style>
```

```html
1.內容的部分
<template>
  <div>
    Hellp Vue!!! {{ myname }}
    <input type="text" v-model="indata">
    <button @click="handleclick"> Add </button>
    <ul >
      <li v-for="item in datalist" :key="item">{{ item }}</li>
    </ul>
    <MyNavbar></MyNavbar> 使用其他組件
  </div>
</template>

2.script 的部分
<script lang="js">
import MyNavbar from './components/MyNavbar' 引入其他組件
or
import MyNavbar from '@/components/MyNavbar.vue' 引入其他組件

export default {
  data () {
    return {
      myname: 'ABC',
      datalist: ['aaa', 'bbb', 'ccc'],
      indata: ''
    }
  },
  methods: {
    handleclick () {
      this.datalist.push(this.indata)
    }
  },
  components: {
    MyNavbar: MyNavbar 宣告其他組件
  }
}
</script>

3.CSS的部分
<style scoped lang="scss"> 使用SCSS語法, scoped 限此處使用
  ul{
    li{
      background-color: yellow;
      width: 200px;
    }
  }
</style>
```

### 註冊

```javascript
app.component("test", {
  template: `
    <h1>自定義組件</h1>
  `,
});
```

```javascript
全域組件
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
```

### 父傳子

```html
    <div id="app">
      <test :myname="name" :myage="age"></test>
    </div>
：myname2, :myage => 子組件的屬性 ; name, age => 父層的屬性
```

```javascript
// 父層
const app = Vue.createApp({
  data() {
    return {
      name: "Jelly",
      age: 28,
    };
  },
  methods: {},
});

// 子組件
app.component("test", {
  template: `
    <section>
      <button @click="leftClick">left</button>
      {{myname}}
      <button @click="rightClick">right</button>
      <div>{{myname2}} - {{myage}}</div>
    </section>
  `,
  props: ["myname", "myage"], 開放傳入的屬性
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
```

### 父傳子 + 屬性 指定形態

``` javasctipt
型態 : String, Number, Array, Boolean, Object, Date, Function, Symbol
props: {
  myage: {
    type: Number, 數值
    default: 22, 預設值
    validator: (value) => value > 20, 資料檢查
  },
  myName: {
    type: [String, Number], 多類型
    required: true,
    default: "ABC",
  }
}
```

### 演進過程 : 父傳子

```html
1. 一般列表
<template>
    <section>
        <ul>
            <li v-for="friend in friends" :key="friend.id">
                <div><label for="">id :</label>{{ friend.id }}</div>
                <div><label for="">name :</label>{{ friend.name }}</div>
                <div><label for="">phone :</label>{{ friend.phone }}</div>
                <div><label for="">mailAddress :</label>{{ friend.mailAddress }}</div>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
  name: 'HelloView',
  data () {
    return {
      friends: [
        {
          id: 1,
          name: 'Jelly fish',
          phone: '1234567890',
          mailAddress: 'JellyFish@pchome.com.tw'
        },
        {
          id: 1,
          name: 'Jack',
          phone: '0975000000',
          mailAddress: 'Jack@pchome.com.tw'
        }
      ]
    }
  }
}
</script>
```

```html
2. 使用組件, 資料先在組件中
FriendList.vue
<template>
    <ul>
        <li>
            <div><label for="">id :</label>{{ friend.id }}</div>
            <div><label for="">name :</label>{{ friend.name }}</div>
            <div><label for="">phone :</label>{{ friend.phone }}</div>
            <div><label for="">mailAddress :</label>{{ friend.mailAddress }}</div>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'FriendList',
  data () {
    return {
      friend: {
        id: 1,
        name: 'Jelly fish',
        phone: '1234567890',
        mailAddress: 'JellyFish@pchome.com.tw'
      }
    }
  }
}
</script>
-----------------------------------------------------
使用
<template>
  <div>
    <FriendList></FriendList> // 使用組件
  </div>
</template>

<script>
// 引用, frieldList 可以叫不同名稱. 但後面名稱都要一致    
import FriendList from '@/components/FriendList.vue' 

export default {
  name: 'HelloView',
  components: {  // 加入組件
    FriendList
  },
  data () {
    return {
...
    }
  }
}
</script>
```

```html
3.改傳入資料
FriendList.vue
<template>
    <ul>
        <li>
            <div><label for="">id :</label>{{ friendId }}</div>
            <div><label for="">name :</label>{{ friendName }}</div>
            <div><label for="">phone :</label>{{ friendPhone }}</div>
            <div><label for="">mailAddress :</label>{{ friendMailAddress }}</div>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'FriendList',
// 加入 props friendId => friend-id ...    
// props: ['friendId', 'friendName', 'friendPhone', 'friendMailAddress'],
// 可以改用明確定義 類型    
  props: {
    friendId: {
      type: [Number,String],  // 多形態
      required: true,
      validator: (value) => value >= 0
    },
    friendName: {
      type: String,
      required: true
    },
    friendPhone: {
      type: String,
      required: true,
      default: '0123456789'
    },
    friendMailAddress: {
      type: String,
      required: true
    },
    isFavorate:{
        type: Boolean,
        required: true,
        default: false
    }
  },    
  data () {
    return {
    }
  }
}
</script>
--------------------------------------------------------------------------
固定值
<friendList friend-id="1" friend-name="Mouse" friend-phone="123 456 789" friend-mailAddress="mouse@gmail.com"></friendList>

改用 data() 中的資料
<friendList :friend-id= "id" :friend-name= "name" :friend-phone="phone" :friend-mailAddress= "mailAddress" ></friendList>

改用 v-for
<li v-for="friend in friends" :key="friend.id" >
  <friendList :friend-id= "friend.id" :friend-name= "friend.name" :friend-phone="friend.phone" :friend-mailAddress= "friend.mailAddress" ></friendList>
</li>

可以修改成
<li v-for="friend in friends" :key="friend.id" >
  <friendList v-bind="friend"></friendList> 名稱需相同才可以使用
</li>
```

```html
props 明確定義類型
<friendList :is-Favorate=true ...</friendList> 
<friendList :is-Favorate="friend.isFavorate" ...</friendList> 可以傳入 Boolean, 非預設字串

```

### 子傳父

```html
增加 NewFriend.vue
<template>
    <form @submit.prevent="submitData">
        <div>
            <label for="">name</label>
            <input type="text" v-model="friendName">
        </div>
        <div>
            <label for="">phone</label>
            <input type="text" v-model="friendPhone">
        </div>
        <div>
            <label for="">mailAddress</label>
            <input type="text" v-model="friendMailAddress">
        </div>
        <div>
            <button @click="sendClick">Send</button>
        </div>
    </form>
</template>

<script>
export default {
//   emits: ['add-contact'],
  data () {
    return {
      friendName: 'ABC',
      friendPhone: '',
      friendMailAddress: ''
    }
  },
  methods: {
    submitData () {  // 透過事件通知, 呼叫方 
      this.$emit('add-contact', this.friendName, this.friendPhone, this.friendMailAddress)
    }
  }
}
</script>

呼叫方增加
html       元件事件名稱    回呼函式名稱 
<newFriend @add-contact="addContact"></newFriend>

script
// 引用 NewFriend.vue 元件
import newFriend from '@/components/NewFriend.vue'

  methods: {
    addContact (name, phone, mail) {  // 接受通知
      const data = {
        id: new Date().toString(), // 模擬唯一號碼
        name: name,                // 名稱需與 friends 中的欄位名稱一樣
        phone: phone,
        mailAddress: mail,
        isFavorate: false
      }
      this.friends.push(data) // 加入 friends 數組中
    }
  },
```

### 遠距離溝通

```html
emit 傳遞事件
ShowDataView => ShowDataBase => ShowDataGrid => ShowDataElement
             => ActiveElement
ShowDataElement.vue
<template>
    <section>
        <h3>{{ name }}</h3>
        <p>{{ desc }}</p>
        <button @click="$emit('select-card', id)">Click</button>
    </section>
</template>

<script>
export default {
  props: ['id', 'name', 'desc'],
  emits: ['select-card']
}
</script>

ShowDataGrid.vue
<template>
    <ul>
       <ShowDataElement
        v-for="card in cards"
        :key="card.id"
        :id="card.id"
        :name="card.name"
        :desc="card.description"
        @select-card="$emit('select-card', $event)"
    ></ShowDataElement>
    </ul>
</template>

<script>
import ShowDataElement from '@/components/Show/ShowDataElement.vue'
export default {
  props: ['cards'],
  emits: ['select-card'],
  components: { ShowDataElement }
}
</script>

ShowDataBase.vue
<template>
    <ShowDataGrid :cards="cards" @select-card="$emit('select-card', $event)"></ShowDataGrid>
</template>

<script>
import ShowDataGrid from '@/components/Show/ShowDataGrid.vue'

export default {
  props: ['cards'],
  emits: ['select-card'],
  components: { ShowDataGrid }
}
</script>

ShowDataView.vue
<template>
    <section>
        <div>
            <ShowDataBase :cards="cards" @select-card="selectCards"></ShowDataBase>
        </div>
        <div>
            <ActiveElement :name-data="activeCard && activeCard.name" :desc="activeCard && activeCard.description"></ActiveElement>
        </div>
    </section>
</template>

<script>
import ShowDataBase from '@/components/Show/ShowDataBase.vue'
import ActiveElement from '@/components/Show/ActiveElement.vue'

export default {
  name: 'ShowDataView',
  data () {
    return {
      cards: [
        {
          id: 1,
          name: 'AAA',
          description: 'AAA desc'
        },
        {
          id: 2,
          name: 'BBB',
          description: 'BBB desc'
        }
      ],
      activeCard: null
    }
  },
  methods: {
    selectCards (id) {
      this.activeCard = this.cards.find((card) => card.id === id)
    }
  },
  components: { ShowDataBase, ActiveElement }
}
</script> 
```



```html
main.js 元件都定義在這裡 : 全域的寫法

// 引用
import { createApp } from 'vue';

import App from './App.vue';
import ActiveElement from './components/ActiveElement.vue';
import KnowledgeBase from './components/KnowledgeBase.vue';
import KnowledgeElement from './components/KnowledgeElement.vue';
import KnowledgeGrid from './components/KnowledgeGrid.vue';

const app = createApp(App);
// 註冊組件
app.component('active-element', ActiveElement);
app.component('knowledge-base', KnowledgeBase);
app.component('knowledge-element', KnowledgeElement);
app.component('knowledge-grid', KnowledgeGrid);

app.mount('#app');
------------------------------------------------------------------------
active-element 顯示用
knowledge-base 外框 =》 knowledge-grid 生成多個 =》 knowledge-element 顯示與事件處理

ActiveElement.vue 顯示
<template> 
  <section>
    <h2>{{ topicTitle }}</h2>
    <p>{{ text }}</p>
  </section>
</template>

<script>
export default {
  props: ['topicTitle', 'text'],
};
</script>
--------------------------------------------
KnowledgeBase.vue
<template>
  <section>
    <h2>Select a Topic</h2>
    <knowledge-grid></knowledge-grid> 《=
  </section>
</template>

<script>
export default {};
</script>
--------------------------------------------
KnowledgeGrid.vue 生成 knowledge-element
<template>
  <ul>
    <knowledge-element 《= 顯示
      v-for="topic in topics"
      :key="topic.id"
      :id="topic.id"
      :topic-name="topic.title"
      :description="topic.description"
    ></knowledge-element>
  </ul>
</template>

<script>
export default {
  inject: ['topics'], // 接收
};
</script>
--------------------------------------------
KnowledgeElement.vue
<template>
  <li>
    <h3>{{ topicName }}</h3>
    <p>{{ description }}</p>
    <button @click="selectTopic(id)">Learn More</button> 《= 回傳 id
  </li>
</template>

<script>
export default {
  inject: ['selectTopic'],
  props: ['id', 'topicName', 'description'],
  emits: ['select-topic'],
};
</script>
注意事項:
1. props, emits 須加 s
2. $emit 不加 s
--------------------------------------------
App.vue
<template>
  <div>
    <active-element
      :topic-title="activeTopic && activeTopic.title"
      :text="activeTopic && activeTopic.fullText"
    ></active-element>
    <knowledge-base></knowledge-base>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topics: [
        {
          id: 'basics',
          title: 'The Basics',
          description: 'Core Vue basics you have to know',
          fullText:
            'Vue is a great framework and it has a couple of key concepts: Data binding, events, components and reactivity - that should tell you something!',
        },
        {
          id: 'components',
          title: 'Components',
          description:
            'Components are a core concept for building Vue UIs and apps',
          fullText:
            'With components, you can split logic (and markup) into separate building blocks and then combine those building blocks (and re-use them) to build powerful user interfaces.',
        },
      ],
      activeTopic: null,
    };
  },
  provide() {
    return { 
      topics: this.topics,
      selectTopic: this.activateTopic
    };
  },
  methods: {
    activateTopic(topicId) {
      this.activeTopic = this.topics.find((topic) => topic.id === topicId);
    },
  },
  mounted() {
    setTimeout(() => {
      this.topics.push({
        id: 'events',
        title: 'Events',
        description: 'Events are important in Vue',
        fullText: 'Events allow you to trigger code on demand!'
      });
    }, 3000);
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
}
body {
  margin: 0;
}
section {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 2rem auto;
  max-width: 40rem;
  padding: 1rem;
  border-radius: 12px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

li {
  border-radius: 12px;
  border: 1px solid #ccc;
  padding: 1rem;
  width: 15rem;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h2 {
  margin: 0.75rem 0;
  text-align: center;
}

button {
  font: inherit;
  border: 1px solid #c70053;
  background-color: #c70053;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 30px;
  cursor: pointer;
}

button:hover,
button:active {
  background-color: #e24d8b;
  border-color: #e24d8b;
}
</style>
--------------------------------------------
注意事項:
1. "activeTopic && activeTopic.title" 需檢查 activeTopic是否存在
2. 參數 :topic-title => topicTitle
```



### Props

### 事件

### 組件 v-model

### 透傳 Attributes

### 插槽

### 依賴注入

### 異步組件

## 邏輯複用

### 組合式函數

### 自定義指令

### 插件















