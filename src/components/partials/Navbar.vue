<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Film App</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ path: '/' }"><b-icon icon="house-fill" aria-hidden="true"></b-icon> Home</b-nav-item>
        <b-nav-item :to="{ path: '/films' }"><b-icon icon="film" aria-hidden="true"></b-icon> Fims</b-nav-item>
        <b-nav-item :to="{ path: '/films/create' }"><b-icon icon="plus-circle-fill" aria-hidden="true"></b-icon> Add New Films</b-nav-item>
      </b-navbar-nav>
    </b-collapse>

    <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <div class="mb-4" v-show="isAuthenticated">
          <b-avatar></b-avatar>
           <b-navbar-brand href="#">{{profile.name}}</b-navbar-brand>
        </div>
        
        <div v-if="!isAuthenticated">
            <b-button @click="login">
              <b-icon icon="person-plus-fill" aria-hidden="true"></b-icon> Login
            </b-button>
        </div>
        <div v-else>
          <b-button @click="logout" class="mb-2">
            <b-icon icon="power" aria-hidden="true"></b-icon> Logout
          </b-button>
        </div>

      </b-navbar-nav>

  </b-navbar>
</template>
<script>
import { mapGetters,mapState } from "vuex";
import { AUTH_LOGOUT } from "../../store/actions/auth";
export default {
  name: 'Navbar',
  data () {
    return {
       profile :{
        id : '',
        name : '',
        email : ''
      },
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  mounted()
  {
    if(this.isAuthenticated){
      this.axios.get(`${this.$baseApiUrl}/user`)
       .then(res=>{
         this.profile = res.data
       })
    }
    
  },
  methods: {
    login(){
          this.$router.push({ name: 'Login'})
      },
      logout()
      {
         this.$Progress.start()
         this.$store.dispatch(AUTH_LOGOUT)
        .then(() => {
          this.$Progress.finish()
          this.$router.push({ name: 'Login'})
        })
      }
  }
}
</script>