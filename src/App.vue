<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <hr/>
    <div class="col-4 input-group text-center">
      <div class="input-group-prepend">
        <span class="input-group-text">Name</span>
      </div>
      <input type="text" class="form-control" v-model="name">
      <button @click="submitName()" type="button" class="btn btn-info">Add</button>
    </div>
    <div class="col-3">
      <ul>
        <li v-for="personName of names" v-bind:key="personName['.key']">
          <div v-if="!personName.edit">
              <p>{{ personName.name }}</p>
              <button @click="removeName(personName['.key'])" class="btn btn-danger">Remove</button>
              <button @click="setEditName(personName['.key'])" class="btn btn-success">Edit</button>
          </div>
          <div v-else>
             <input type="text" class="form-control" v-model="personName.name">
             <button @click="saveEdit(personName)" class="btn btn-success">Save</button>
             <button @click="cancelEdit(personName['.key'])" class="btn btn-danger">Cancel</button>
          </div>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { namesRef } from './firebase';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to my Application, with i use VueJs and Firebase',
      name:''
    }
  },
  firebase:{
      names:namesRef
  },
  methods:{
    submitName(){
        namesRef.push({
          name:this.name,
          edit:false
        })
        this.name = '';
    },
    removeName(key){
        namesRef.child(key).remove();
    },
    setEditName(key){
        namesRef.child(key).update({ edit:true });
    },
    cancelEdit(key){
        namesRef.child(key).update({ edit:false });
    },
    saveEdit(person){
        const key = person['.key'];
        namesRef.child(key).set({ 
          name: person.name,
          edit:false
          });
    }
  }
}
</script>

<style>
body{
  display: flex;
  justify-content: center;
  background: #a3a6a8;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
ul{
  list-style: none;
}
li{
  font-size: 24px;
  margin: 20px 20px;
}
h1 {
  color:#ffff;
  font-weight: normal;
}

</style>
