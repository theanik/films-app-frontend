<template>
  <div>
    <div class="row justify-content-center">
      <b-spinner v-show="loading" style="width: 3rem; height: 3rem;" variant="primary" label="Spinning"></b-spinner>
    </div>
  <div class="row justify-content-center">
  <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                Sign Up
            </div>
            <div class="card-body">
              <b-form @submit="onSubmit" @reset="onReset">
                      <b-form-group
                      id="input-group-12"
                      label="Name:"
                      label-for="input-12"
                  >
                      <b-form-input
                      id="input-12"
                      v-model="name"
                      type="text"
                      required
                      placeholder="Enter Name"
                      ></b-form-input>
                  </b-form-group>

                  <b-form-group
                      id="input-group-1"
                      label="Email address:"
                      label-for="input-1"
                      description="We'll never share your email with anyone else."
                  >
                      <b-form-input
                      id="input-1"
                      v-model="email"
                      type="email"
                      required
                      placeholder="Enter email"
                      ></b-form-input>
                  </b-form-group>

                  <b-form-group id="input-group-2" label="Password" label-for="input-2">
                      <b-form-input
                      id="input-2"
                      v-model="password"
                      required
                      type="password"
                      placeholder="Enter Password"
                      ></b-form-input>
                  </b-form-group>
                    <b-alert v-show="errorAlert" show variant="danger">Something went wrong!!!</b-alert>
                    <b-alert v-show="suceessAlert" show variant="success">Account created successfully. <strong @click="login">Click here!!</strong>  to log in</b-alert>
                    <b-alert v-show="errors" v-for="(error,index) in errors" :key="index" show variant="danger">{{ error[0] }}</b-alert>
                    
                  

                    <b-button type="submit" :disabled="loading" variant="primary">Submit</b-button>
                    <b-button type="reset" :disabled="loading" variant="danger">Reset</b-button>
                    <router-link :to="'login'">Have an account?? To Login click here!!</router-link>
                  </b-form>
                </div> 
            </div>
             
  </div>
  </div>
  </div>
  
</template>

<script>
import axios from 'axios'
  export default {
    name : "Register",
    data() {
      return {
          name : '',
          email: '',
          password: '',
          errorAlert: false,
          suceessAlert: false,
          errors : {},
          loading : false
      }
    },
    methods: {
      onSubmit(evt) {
        this.loading = true
        this.$Progress.start()
        this.errorAlert = false
        this.suceessAlert = false
        evt.preventDefault()
        let info = {name:this.name,email:this.email,password:this.password,}
        axios.post(`${this.$baseApiUrl}/signup`,info)
        .then(res => {
            this.suceessAlert = true
            this.$Progress.finish()
            // this.$router.replace(this.$route.query.redirect || '/login')
            this.onReset()
            this.loading = false
        }).catch(e => {
            this.loading = true
            this.$Progress.fail()
            this.errorAlert = true
            this.errors = e.response.data.errors
        })
        
      },
      login(){
          this.$router.push({ name: 'Login'})
      },
      onReset() {
        this.name = ''
        this.email= ''
        this.password= ''
      }
    }
  }
</script>