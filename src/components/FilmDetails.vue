<template>
<div>
<div class="row justify-content-center">
      <b-spinner v-show="loading1" style="width: 3rem; height: 3rem;" variant="primary" label="Spinning"></b-spinner>
  </div>
  <div class="row" v-show="!loading1">
    <b-card no-body class="overflow-hidden col-md-12" style="">
      <b-row no-gutters>
        <b-col md="5">
          <b-card-img :src="getImgUrl(film.photo)" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="7">
          <b-card-body :title="film.name">
            <b-card-text>
              {{ film.description }}
            </b-card-text>

            <b-list-group flush>
              <b-list-group-item>
                  <strong class="text-info">
                      Type : 
                  </strong>
                  {{ film.genre }}
              </b-list-group-item>
              <b-list-group-item>
                  <strong class="text-info">
                      Release date : 
                  </strong>
                  {{ film.release_date | mydate }}
              </b-list-group-item>
              <b-list-group-item>
                  <strong class="text-info">
                      Ticket price : 
                  </strong>
                  {{ film.ticket_price }} $
              </b-list-group-item>
              <b-list-group-item>
                  <strong class="text-info">
                      Country : 
                  </strong>
                  {{ film.country }}
              </b-list-group-item>

              <b-list-group-item>
                  <strong class="text-info">
                      Rating : 
                  </strong>
                  {{ getRating ? getRating : 0.00 }}<b-icon icon="star-fill" animation="fade" aria-hidden="true"></b-icon>
                  {{ ratings.length ? ratings.length : 0.00 }}<b-icon icon="person-fill" aria-hidden="true"></b-icon>

              </b-list-group-item>

          </b-list-group>

          </b-card-body>

        </b-col>
      </b-row>
    </b-card>    
  </div>
  
  <div class="row mt-3">
    <span v-show="errorAlert" class="alert alert-warning col-md-8">For commemt or rating you have to <router-link :to="'/login'" class="alert-link">Log in...Click Here!!</router-link></span>
    <span v-show="errorAlert2" class="alert alert-warning col-md-8">{{ msg }}</span>
    <span v-show="successAlert" class="alert alert-success col-md-8">{{ msg }}</span>
  </div>


  <div class="row mt-3" v-show="!loading1">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">
          Comment panel <b-badge variant="info">{{ comments.length }}</b-badge>
        </div>
        <div class="card-body">
            <div class="panel-body">
                  <b-form @submit.prevent="commentOnSubmit">
                    <b-textarea v-model="comment" class="form-control" placeholder="write a comment..." rows="3"></b-textarea>
                    <br>
                    <b-button type="submit" class="btn btn-info pull-right">Post</b-button>
                  </b-form>
                    <div class="clearfix"></div>
                    <hr>
                    <ul class="media-list" v-for="(comment, index) in comments" :key="index">
                        <li class="media">
                            <div class="media-body">
                                <strong class="text-success">@{{ comment.user.name }}</strong>
                                <span class="text-muted pull-right">
                                    <small class="text-muted">{{comment.created_at|mydate}}</small>
                                </span>
                                <p>
                                  {{ comment.comment }} <a href="#"> </a>.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
        <star-rating @rating-selected ="setRating" v-model="rating"></star-rating>
    </div>
  </div>

</div>

</template>

<script>
import StarRating from 'vue-star-rating'
import axios from "axios"
import {mapGetters} from "vuex"
export default {
    components:{
        StarRating
    },
  name: 'Films',
  data () {
    return {
        loading1 : false,
        profile :{
          id : '',
          name : '',
          email : ''
        },
        rating : 0,
        comment : '',
        slug : this.$route.params.slug,
        film : {},
        comments : {},
        ratings : [],
        errorAlert : false,
        successAlert : false,
        errorAlert2 : false,
        msg : '',
        
    }
  },
  mounted() {
    if(this.isAuthenticated){
       this.axios.get(`${this.$baseApiUrl}/user`)
      .then(res => {
        this.profile = res.data
      })
    }
   
    this.getDetails()
    this.$Progress.finish()
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    getRating(){
      let result =  this.ratings.reduce((acc,item) => acc + item.rate, 0) / this.ratings.length
      return result
    }

  },
  methods:{
       getDetails() {
         this.loading1 = true
         this.$Progress.start()
         this.axios.get(this.$baseApiUrl+"/films/"+this.slug)
         .then((res) => {
            this.film = res.data.film
            this.comments = res.data.film.comments
            this.ratings = res.data.film.rating
            if(this.isAuthenticated){
              this.getCurrentUserRating(this.film.id)
            }
            this.timeOutHandeler()
            this.$Progress.finish()
            this.loading1 = false
         })
         .catch(err=>{
           this.$Progress.fail()
         })
        },

        getImgUrl(img) {
            return this.$baseUrl+'/film_photos/'+img
        },

        commentOnSubmit()
        {
          this.$Progress.start()
          if(!this.isAuthenticated){
            this.$Progress.fail()
            this.errorAlert = true
            this.timeOutHandeler()
          }else{
            let data = {
              comment : this.comment,
              user_id : this.profile.id,
              film_id : this.film.id
            }
            this.axios.post(`${this.$baseApiUrl}/comment`,data)
            .then(res => {
              this.successAlert = true
              this.msg = res.data.message
              this.getDetails()
              this.comment = ''
              this.$Progress.finish()
            }).catch(err => {
              this.errorAlert2 = true
              this.msg = "You must enter a comment"
              this.getDetails()
              this.$Progress.fail()
            })
          }
        },

        setRating(rating){
          this.rating = rating
          if(!this.isAuthenticated){
            this.rating = 0
            this.errorAlert = true
            this.timeOutHandeler()
          }else{
            
              let data = {
                rate : this.rating,
                user_id : this.profile.id,
                film_id : this.film.id
              }
              this.axios.post(`${this.$baseApiUrl}/rating`,data)
              .then(res => {
                this.successAlert = true
                this.msg = res.data.message
                this.getDetails()
              })
              .catch(err => {
                // console.log(err)
              })

          }
        },

        getCurrentUserRating(film_id){
          this.axios.get(`${this.$baseApiUrl}/rating/current/${film_id}`)
          .then(res => {
            if(res.data.success = true){
              this.rating = res.data.rating
            }
          })
        },

      

        timeOutHandeler(){
          setTimeout(() => {
            this.successAlert = false,
            this.errorAlert = false,
            this.errorAlert2 = false,
            this.msg = ''
          }, 8000);
        }


  }

  
}
</script>

<style scoped>

.panel-body {
    max-height:650px;
    overflow:auto;
}


.media-list .media {
    border-bottom:1px dashed #efefef;
    margin-bottom:25px;
}
       
</style>
