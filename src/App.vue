<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <hr/>
    <div class="col-12 input-group text-center">
      <input type="text" class="form-control" v-model="fname" placeholder="First name">
      <input type="text" class="form-control" v-model="lname" placeholder="Last name">
      <input type="number" class="form-control" min="18" max="50" v-model="age" value="0" placeholder="Age">
      <button @click="submitPerson()" type="button" class="btn btn-info">Add</button>
    </div>
    <br>

    <div>
      <table class="table">
        <thead class="thead-inverse">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>#</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="personInfo of person" v-bind:key="personInfo['.key']" v-if="!personInfo.edit">
              <td>{{ personInfo.fname }}</td>
              <td>{{ personInfo.lname }}</td>
              <td>{{ personInfo.age }}</td>
              <td><button @click="setEditPerson(personInfo['.key'])" class="btn btn-success">Edit</button></td>
              <td><button @click="removePerson(personInfo['.key'])" class="btn btn-danger">Remove</button></td>
          </tr>
          <tr v-else>
            <td><input type="text" class="form-control" v-model="personInfo.fname"></td>
            <td><input type="text" class="form-control" v-model="personInfo.lname"></td>
            <td><input type="text" class="form-control" v-model="personInfo.age"></td>
            <td><button @click="saveEdit(personInfo)" class="btn btn-success">Save</button></td>
            <td><button @click="cancelEdit(personInfo['.key'])" class="btn btn-danger">Cancel</button></td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { personRef } from './firebase';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to my Application, with i use VueFire',
      fname: '',
      lname: '',
      age: ''
    }
  },
  firebase:{
     person: personRef
  },
  methods:{
    submitPerson(){
      personRef.push({
          fname:this.fname,
          lname:this.lname,
          age:this.age,
          edit:false
        })
        this.fname = '';
        this.lname = '';
        this.age = '';
    },
    setEditPerson(key){
      personRef.child(key).update({ edit:true });
    },
    removePerson(key){
      personRef.child(key).remove();
    },
    cancelEdit(key){
      personRef.child(key).update({ edit:false });
    },
    saveEdit(person){
        const key = person['.key'];
        personRef.child(key).set({ 
          lname: person.lname,
          fname: person.fname,
          age: person.age,
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
