<template>
  <div class="home">
      <h1>{{ msg }} {{ profile.name }}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { USER_REQUEST } from "../store/actions/user";
import axios from 'axios'
export default {
  
  name: 'Home',
  data () {
    return {
      profile :{
        id : '',
        name : '',
        email : ''
      },
      msg: 'Welcome to Film App'
    }
  },
  mounted(){
    this.getUser();
  },
  methods:{
    getUser(){
       this.axios.get(`${this.$baseApiUrl}/user`)
       .then(res=>{
         this.profile = res.data
       })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
