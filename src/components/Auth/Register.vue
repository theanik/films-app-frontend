<template>
  <div>
  <div class="row justify-content-center">
  <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                Sign Up
            </div>
            <div class="card-body">
                    <b-form @submit="onSubmit" @reset="onReset">
                            <b-form-group
                            id="input-group-1"
                            label="Name:"
                            label-for="input-1"
                        >
                            <b-form-input
                            id="input-1"
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

                        

                        <b-button type="submit" variant="primary">Submit</b-button>
                        <b-button type="reset" variant="danger">Reset</b-button>
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
      }
    },
    methods: {
      onSubmit(evt) {
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
        }).catch(e => {
          this.$Progress.fail()
            this.errorAlert = true
            console.log(e)
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