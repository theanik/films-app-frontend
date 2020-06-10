<template>
  <div>
    <div class="row justify-content-center">
      <b-spinner v-show="loading" style="width: 3rem; height: 3rem;" variant="primary" label="Spinning"></b-spinner>
    </div>
    <div class="row justify-content-center">
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                Log In
            </div>
            <div class="card-body">
                <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
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
                  <b-alert v-show="errors" v-for="(error,index) in errors" :key="index" show variant="danger">{{ error[0] }}</b-alert>
                <b-button type="submit" :disabled="loading" variant="primary">Submit</b-button>
                <b-button type="reset" :disabled="loading" variant="danger">Reset</b-button>
                <router-link :to="'signup'">New User?? To Register click here!!</router-link>
                        
                </b-form>
                </div> 
            </div>
             
      </div>
    </div>
     
  </div>
</template>

<script>
import { AUTH_REQUEST } from "../../store/actions/auth";
  export default {
    name : "Login",
    data() {
      return {
          email: '',
          password: '',
          errorAlert: false,
          errors : {},
          loading : false
      }
    },
    methods: {
      onSubmit(evt) {
        this.loading = true
        evt.preventDefault()
        this.$Progress.start()
        let {email, password} = this
        this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
          this.$Progress.finish()
          this.$router.push({name : 'Home'})
          this.loading = false
            
        }).catch(e => {
            this.errorAlert = true
            this.errors = e.response.data.errors
            this.$Progress.fail()
            this.loading = true
        })
        
      },
      onReset(evt) {
        
      }
    }
  }
</script>