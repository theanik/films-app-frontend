<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Film App</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ path: '/' }">Home</b-nav-item>
        <b-nav-item :to="{ path: '/films' }">Fims</b-nav-item>
        <b-nav-item :to="{ path: '/films/create' }">Create New Films</b-nav-item>
        
      </b-navbar-nav>

    </b-collapse>

    <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
        </b-nav-form>

        <div v-if="!isAuthenticated">
            <b-button @click="login" variant="success">Login</b-button>
        </div>
        <div v-else>
          <div class="p-3 mb-2 bg-light text-dark">{{ profile.name }}</div>
          <b-button @click="logout" variant="success">Logout</b-button>
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
    this.axios.get(`${this.$baseApiUrl}/user`)
       .then(res=>{
         this.profile = res.data
       })
  },
  methods: {
    login(){
          this.$router.push({ name: 'Login'})
      },
      logout()
      {
         this.$store.dispatch(AUTH_LOGOUT)
        .then(() => {
          this.$router.push('/login')
        })
      }
  }
}
</script>