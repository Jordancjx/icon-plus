<template>
  <div id="popular-courses" class = "q-mt-md q-pb-xl">
    <div class="courses-content">
      <div class="courses-header-container">
        <div class="courses-header q-py-xl">
          <h4 class = "text-bold">Testimonials</h4>
        </div>
      </div>

      <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-type="push"
      control-color="black"
      padding
      arrows
      swipeable
      height="600px"
    > 
      <q-carousel-slide v-for = "slides in paged_courses" :key = "slides[0].id" :name = "slides[0].id" class="column no-wrap">
        <div class="row fit q-gutter-md q-col-gutter no-wrap">
          <q-card class="my-card rounded-borders col-4 full-height no-shadow" v-for = "card in slides[1]" :key = "card.title" >
            <q-card-section :style="{background: 'url(' + card.testimonials_id.cover_photo_url +')'}" class = "card-header column no-wrap justify-center" ></q-card-section>
            <q-separator />
            <q-card-section class = "card-content">
              <div id = "card-name" class="text-h6 q-mb-sm text-bold text-dark">{{card.testimonials_id.full_name}}</div>
              <div class="text-caption q-mb-md text-grey-14">{{card.testimonials_id.title}}</div>
              <div class="text-body2 q-mb-md">{{card.testimonials_id.description}}</div>
            </q-card-section>
          </q-card>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div class="courses-pagination-container row justify-center items-center q-my-xl">
        <div class="courses-pagination row no-wrap">
          <div
            class="paginate-links"
            v-for="n in paged_courses"
            v-bind:key="n[0].id"
            :class="{ active: n[0].id == slide }"
          ></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Popular_Courses",
  props: {},
  data() {
    return {
      courses: [],
      paged_courses: [],
      maxPages: 0,
      currentPage: 1,
      slide: 0,
      controlType: 'push',
    }
  },

  methods: {
    prevCourses() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.paginate()
      }
    },
    nextCourses() {
      if (this.currentPage < this.maxPages) {
        this.currentPage++
        this.paginate()
      }
    },
    getPopularCourses() {
      this.$axios.get('http://54.251.82.57:8080/items/home?fields=testimonials.testimonials_id.*')
      .then((response) => {
        let testimonials_data = response.data.data.testimonials;
        testimonials_data.forEach(t => {
          t.testimonials_id.cover_photo_url = `http://54.251.82.57:8080/assets/${t.testimonials_id.cover_photo}`
        })
        this.courses = testimonials_data;

        this.paginate();
      })
      .catch(() => {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
      })
    },

    splitArray(myArray, chunk_size){
      var index = 0;
      var arrayLength = myArray.length;
      var tempArray = [];
      for (index = 0; index < arrayLength; index += chunk_size) {
          var myChunk = myArray.slice(index, index+chunk_size);
          tempArray.push([{id : index}, myChunk]);
      }
      return tempArray;
    },

    paginate() {
      this.paged_courses = this.splitArray(this.courses, 3);
    }

  },

  mounted() {
    this.getPopularCourses()
    this.maxPages = Math.ceil(this.courses.length / 3);
    this.paginate()
  }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;700&display=swap");

#popular-courses {
  height: auto;
  background-size: cover;
  min-height: 700px;
  .courses-header-container {
    width: 100%;
    padding: 0% 10%;
    .courses-header {
      width: 100%;
      h4 {
        font-family: "Roboto Slab", serif;
      }
    }
  }

  .q-carousel__slide, .q-carousel {
    background: transparent !important;
  }
  .q-carousel__slide {
    padding: 0% 10%;
  }

  .card-header {
    height: 50%;
    background-size: cover !important;
    background-position: center !important;
    padding-left: 5%;
    padding-right: 5%;
  }

  .card-content {
    #card-name {
      font-family: "Roboto Slab", serif;
    }
  }

  .my-card {
    border: 1px solid $grey-4;
  }

  .q-carousel__next-arrow--horizontal {
    margin-right: 3% !important;
  }

  .courses-content {
    height: 100%;
    a {
      font-weight: bold;
      color: #F9981D;
      text-decoration: none;
    }
    i {
      margin-left: 1%;
    }
  }

  .courses-pagination-container {
    width: 100%;
    padding-left: 10%;
    padding-right: 10%;
    .courses-pagination {
      width: auto;
      .paginate-links {
        width: 35px;
        height: 2.5px;
        background-color: $grey-4;
        margin-right: 4%;
        transition: all .5s;
        &.active {
          width: 65px;
          background-color: $dark;
        }
      }
    }
  }
}

$breakpoint-tablet: 999px;
$breakpoint-mobile: 666px;

@media screen and (max-width: $breakpoint-tablet) {
  .card {
    width: 100% !important;
    margin-top: 3%;
  }

  .courses-flex {
    flex-flow: column;
  }
}
</style>
