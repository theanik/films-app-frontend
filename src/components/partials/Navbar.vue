<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Film App</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ path: '/' }">Home</b-nav-item>
        <b-nav-item :to="{ path: '/films' }">Fims</b-nav-item>
        
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>
<script>
export default {
  name: 'Navbar',
  data () {
    return {
    }
  }
}
</script>