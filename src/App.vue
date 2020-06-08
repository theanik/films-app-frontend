<template>
  <div id="app">
  <navbar></navbar>
  <div class="row">
    <div class="container">
      <div class="col-md-12 mt-3">
          <router-view />
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Navbar from './components/partials/Navbar'
export default {
  components: {
    Navbar
  },
  name: 'App',
  created: function () {
  this.axios.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      // if you ever get an unauthorized, logout the user
        this.$store.dispatch(AUTH_LOGOUT)
      // you can also redirect to /login if needed !
      }
      throw err;
    });
  });
}

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
