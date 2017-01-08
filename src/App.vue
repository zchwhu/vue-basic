<template>
  <div id="app">
    <h1 v-html='title'></h1>
    <input type='text' v-model="newItem" @keyup.enter="addNew">
    <ul>
      <li v-for='item in items' v-bind:class="{finished:item.isFinished}" v-on:click="toggleFinished(item)">
        {{item.label}}
      </li>
    </ul>
  </div>
</template>

<script>
  import Store from './store'
  export default{
    data:function(){
      return {
        title:'<span>?</span>This is a todo list',
        items:Store.fetch(),
        newItem:""
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
      }
    }
  }
</script>

<style>
  .finished{
    text-decoration:underline;
  }
</style>
