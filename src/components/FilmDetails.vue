<template>
<div>
  <b-card no-body class="overflow-hidden col-md-10" style="">
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

</template>

<script>
import paginate  from './partials/Paginate'
export default {
    components:{
        paginate 
    },
  name: 'Films',
  data () {
    return {
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
