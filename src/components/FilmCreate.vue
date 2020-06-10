<template>
  <div>
      <div class="card">
          <div class="card-header">
              Create a new Film
          </div>
          
          <div class="card-body">
              <div class="row">
                  <span v-show="successAlert" class="alert alert-success col-md-8">{{ msg }}</span>
                  <span v-show="errors" v-for="(error,index) in errors" :key="index" class="alert alert-danger col-md-8">{{ error[0] }}</span>
              </div>
            <b-form v-if="show" @submit="onSubmit">
                <b-form-group
                    id="name"
                    label="Film name:"
                    label-for="name"
                >
                    <b-form-input
                    id="name"
                    v-model="name"
                    type="text"
                    placeholder="Enter Name"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="description"
                    label="Film Description:"
                    label-for="name"
                >
                    <b-form-textarea
                    id="description"
                    v-model="description"
                    placeholder="Description"
                ></b-form-textarea>

                </b-form-group>

                <b-form-group
                    id="release_date"
                    label="Release date:"
                    label-for="name"
                >
                    <b-form-input
                    id="release_date"
                    v-model="release_date"
                    type="date"
                    placeholder="Enter Rlease date"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="ticket_price"
                    label="Ticket Price:"
                    label-for="ticket_price"
                >
                    <b-form-input
                    id="ticket_price"
                    v-model="ticket_price"
                    type="number"
                    placeholder="Enter Ticket Price"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="country" label="Country:" label-for="input-2">
                    <b-form-select v-model="country" :options="options"></b-form-select>
                </b-form-group>

                <b-form-group
                    id="genre"
                    label="Film Type:"
                    label-for="genre"
                >
                    <b-form-input
                    id="genre"
                    v-model="genre"
                    placeholder="Type"
                ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="photo"
                    label="Photo:"
                    label-for="photo"
                >
                <b-form-file
                v-on:change=fileName
                v-model="photoFile"
                placeholder="Choose a file or drop it here..."
                ></b-form-file>

                </b-form-group>


                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>

          </div>
      </div>
      
  </div>
</template>

<script>
  export default {
      components:{
      },
    data() {
      return {
        msg : '',
        photoFile : null,
        name : '',
        description : '',
        release_date : '',
        ticket_price : '',
        country : null,
        genre : '',
        photo : '',
        show: true,
        successAlert : false,
        errors : {},


        options: [
          { value: 'Bangladeh', text: 'Bangladesh' },
          { value: 'Canada', text: 'Canada' },
          { value: 'Finland', text: 'Finland' },
          { value: 'Germany', text: 'Germany' },
          { value: 'Turki', text: 'Turki' },
        ],



      }
    },
    mounted(){
        this.$Progress.finish()
    },
    methods: {
    fileName(files) {
        if (files) {
          this.photo = files.target.files[0]
        }
      },

      onSubmit(evt) {
        evt.preventDefault()
        this.$Progress.start()
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
 
        let formData = new FormData();
        formData.append('photo', this.photo);
        formData.append('name', this.name);
        formData.append('description', this.description);
        formData.append('release_date', this.release_date);
        formData.append('ticket_price', this.ticket_price);
        formData.append('genre', this.genre);
        formData.append('country', this.country);

        this.axios.post(this.$baseApiUrl+"/films",formData, config)
        .then(res=>{
            this.$router.push({ name: 'Films' })
            if(res.data.success == true){
                this.$Progress.finish()
                // this.successAlert = true
                // this.msg = res.data.message
                // this.timeOutHandeler()
                this.onReset()
                
                
            }
        })
        .catch(err=>{
            this.$Progress.fail()
            this.errors = err.response.data.errors
            this.timeOutHandeler()
            this.$Progress.fail()
        })
      },
      onReset() {
            this.name = ''
            this.description = ''
            this.release_date = ''
            this.ticket_price = ''
            this.country = ''
            this.genre = ''
            this.photo = ''
            this.photoFile = ''
      },

      timeOutHandeler(){
          setTimeout(() => {
            this.errors = {},
            this.successAlert = false
            this.msg = ''
          }, 6000);
        }

    }
  }
</script>