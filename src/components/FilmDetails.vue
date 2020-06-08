<template>
<div>
  <div class="row">
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
                  {{ film.release_date }}
              </b-list-group-item>
              <b-list-group-item>
                  <strong class="text-info">
                      Ticket price : 
                  </strong>
                  {{ film.ticket_price }}
              </b-list-group-item>
              <b-list-group-item>
                  <strong class="text-info">
                      Country : 
                  </strong>
                  {{ film.country }}
              </b-list-group-item>
          </b-list-group>

          </b-card-body>

        </b-col>
      </b-row>
    </b-card>    
  </div>

  <div class="row mt-5">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">
          Comment panel
        </div>
        <div class="card-body">
            <div class="panel-body">
                    <textarea class="form-control" placeholder="write a comment..." rows="3"></textarea>
                    <br>
                    <button type="button" class="btn btn-info pull-right">Post</button>
                    <div class="clearfix"></div>
                    <hr>
                    <ul class="media-list">
                        <li class="media">
                            <div class="media-body">
                                
                                <strong class="text-success">@MartinoMont</strong>
                                <span class="text-muted pull-right">
                                    <small class="text-muted">30 min ago</small>
                                </span>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Lorem ipsum dolor sit amet, <a href="#">#consecteturadipiscing </a>.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
        <star-rating v-model="rating"></star-rating>
    </div>
  </div>



</div>

</template>

<script>
import StarRating from 'vue-star-rating'
import paginate  from './partials/Paginate'
export default {
    components:{
        paginate,
        StarRating
    },
  name: 'Films',
  data () {
    return {
        rating : 0,
        slug : this.$route.params.slug,
        film : {},
    }
  },
  mounted() {
      this.getDetails()
      console.log(this.getImgUrl('mary-and-max2.png'))
  },
  methods:{
       getDetails() {
         this.axios.get(this.$baseApiUrl+"/film/"+this.slug)
         .then((res) => {
            this.film = res.data.film
         })
        },

        getImgUrl(img) {
            return this.$baseUrl+'/film_photos/'+img
        },
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
