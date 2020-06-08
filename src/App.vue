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
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
