<template>
<div>
    <div class="row justify-content-center">
        <b-spinner v-show="loading2" style="width: 3rem; height: 3rem;" variant="primary" label="Spinning"></b-spinner>
    </div>
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
        <b-card-sub-title class="mb-2">Type : {{ film.genre }} || {{ film.release_date | mydate}}</b-card-sub-title>
            <b-card-text>
            {{ film.description | truncate(180) }}
            </b-card-text>

            <!-- <b-button @click="showDetails(film.slug)" variant="primary">View Details</b-button> -->
            <template v-slot:footer>
                <h4><b-badge variant="info">{{ film.ticket_price }}$</b-badge></h4>
            </template>
        </b-card>
    </div>
    <div class="row">
        <paginate v-if="pagination.last_page > 1"
        :pagination="pagination"
        :offset="5"  @paginate="getData()"></paginate >
    </div>
  </div>
  
</template>

<script>
import paginate  from './partials/Paginate'
export default {
    components:{
        paginate,
    },
  name: 'Films',
  data () {
    return {
      films : [],
      pagination :{
        current_page : 1,
    },
    loading2 : false


    }
  },
  mounted() {
      this.getData()
  },
  methods:{
       getData() {
            this.loading2 = true
            this.$Progress.start()
            this.axios.get(this.$baseApiUrl+"/films?page="+this.pagination.current_page)
            .then((res) => {
                this.films = res.data.films.data
                this.pagination = res.data.films
                this.$Progress.finish()
                this.loading2 = false
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
