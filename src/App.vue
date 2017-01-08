<template>
  <div id="app">
    <h1 v-html='title'></h1>
    <input type='text' v-model="newItem" @keyup.enter="addNew">
    <ul>
      <li v-for='item in items' v-bind:class="{finished:item.isFinished}" v-on:click="toggleFinished(item)">
        {{item.label}}
      </li>
    </ul>
    <p>Child tells me:{{childwords}}</p>
    <Component-a msgfromfather='you win!'
                 v-on:child-tell-me-sth="listenToMyBoy"></Component-a>
  </div>
</template>

<script>
  import Store from './store'
  import ComponentA from './components/componentA'
  export default{
    data:function(){
      return {
        title:'<span>?</span>This is a todo list',
        items:Store.fetch(),
        newItem:"",
        childwords:''
      }
    },
    watch:{
      items:{
        handler:function(items){
          Store.save(items);
        },
        deep:true
      }
    },
    events:{
      'child-tell-me-sth':function(msg){
          this.childwords = msg;
      }
    },
    methods:{
      toggleFinished:function(item){
        item.isFinished = !item.isFinished;
      },
      addNew:function(){
        this.items.push({
          label:this.newItem,
          isFinished:false
        })
        this.newItem = '';
        this.$broadcast("onAddnew",this.items);
      },
      listenToMyBoy:function(msg){
        this.childwords = msg;
      }
    },
    components:{ComponentA}
  }
</script>

<style>
  .finished{
    text-decoration:underline;
  }
</style>
