<template>
<div>
    <div class="row">
        <b-card v-for="(film, index) in films" :key="index"
            :img-src="getImgUrl(film.photo)"
            :img-alt="film.name"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2 ml-3 col-md-4"
        >
         <b-card-title >
             <b-link @click="showDetails(film.slug)">
                <h4>{{ film.name }}</h4>
             </b-link>
        </b-card-title>
        <b-card-sub-title class="mb-2">Type : {{ film.genre }}</b-card-sub-title>
            <b-card-text>
            {{ film.description | truncate(180) }}
            </b-card-text>

            <!-- <b-button @click="showDetails(film.slug)" variant="primary">View Details</b-button> -->
            <template v-slot:footer>
                <em>{{ film.release_date | mydate}}</em>
            </template>
        </b-card>
    </div>
    <div class="row">
        <paginate v-if="pagination.last_page > 1"
        :pagination="pagination"
        :offset="3"  @paginate="getData()"></paginate >
    </div>
  



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
      films : [],
      pagination :{
        current_page : 1,
    },

    }
  },
  mounted() {
      this.getData()
      console.log(this.getImgUrl('mary-and-max2.png'))
  },
  methods:{
       getData() {
        this.$Progress.start()
         this.axios.get(this.$baseApiUrl+"/films?page="+this.pagination.current_page)
         .then((res) => {
            this.films = res.data.films.data
            this.pagination = res.data.films
            console.log(this.pagination.current_page)
            this.$Progress.finish()
            })
            .catch(err=>{
                this.$Progress.fail()
            })
        },

        getImgUrl(img) {
            return this.$baseUrl+'/film_photos/'+img
        },

        showDetails(slug){
            this.$router.push({ name: 'FilmDetails', params: { slug } })
        }
  }

  
}
</script>
