<template>
  <div>
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

                

                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
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
          errors : [],
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        this.$Progress.start()
        let {email, password} = this
        this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
          this.$Progress.finish()
          this.$router.push('/')
            
        }).catch(e => {
            this.errorAlert = true
            console.log(e)
            this.$Progress.fail()
        })
        
      },
      onReset(evt) {
        
      }
    }
  }
</script>