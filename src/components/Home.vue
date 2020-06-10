<template>
  <div class="home">
      <b-card class="text-center">
        <h1>{{ msg }}</h1>
        <h3 v-show="isAuthenticated">Welcome {{ profile.name }}</h3>
        <div class="bg-secondary text-light">
          
        </div>
      </b-card>
  </div>
</template>

<script>
import { mapState,mapGetters } from "vuex"
import { USER_REQUEST } from "../store/actions/user";
import axios from 'axios'
export default {
  components:{
    
  },
  
  name: 'Home',
  data () {
    return {
      profile :{
        id : '',
        name : '',
        email : ''
      },
      msg: 'Explore what’s streaming'
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  mounted(){
    if(this.isAuthenticated){
      this.getUser();
    }
    
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
