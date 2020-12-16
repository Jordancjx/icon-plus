<template>
  <div id="popular-courses" class = "q-py-md">
    <div class="courses-content ">
      <div class="courses-header-container q-pb-md">
        <div class="courses-header q-py-xl">
          <h4 class = "text-bold">Popular Courses</h4>
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
      height="auto"
    > 
      <q-carousel-slide v-for = "slides in paged_courses" :key = "slides[0].id" :name = "slides[0].id" class="column no-wrap q-pa-md-xs">
        <div class="row fit q-gutter-md q-col-gutter no-wrap-xl no-wrap-md">
          <q-card class="my-card rounded-borders col-4 full" v-for = "card in slides[1]" :key = "card.courses_id.id">
            <q-card-section class = "card-header column no-wrap justify-center">
              <div class="text-caption text-grey-1 q-mb-sm">{{getCourseField(card.courses_id.study_field)}}</div>
              <div class="icon_name row no-wrap items-center">
                <img :src="card.icon" alt="">
                <div class = "q-ml-md text-h2">{{card.courses_id.title}}</div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section class = "card-content">
              <div class="text-body2 q-mb-md">{{card.courses_id.summary}}</div>
              <router-link to = "/courses" class = "row items-center text-uppercase">More Info <q-icon name = "fas fa-arrow-right"></q-icon></router-link>
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
      study_fields: [],
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
    getStudyFields() {
      this.$axios.get(`http://54.251.82.57:8080/items/study_fields?fields=*.*`)
        .then((response) => {
          this.study_fields = response.data.data;
        })
    },

    getPopularCourses() {
      this.$axios.get('http://54.251.82.57:8080/items/home?fields=popular_courses.courses_id.*')
      .then((response) => {
        this.courses = response.data.data.popular_courses;
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

    getCourseField(course_id) {
      let field = this.study_fields.filter(s => {
        return s.id == course_id;
      });
      return field[0].title;
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
    this.getStudyFields();
    this.getPopularCourses();
    
    this.maxPages = Math.ceil(this.courses.length / 3);
  }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;700&display=swap");

#popular-courses {
  height: auto;
  background-image: url('~assets/banners/pop-courses&Iteach@2x.jpg');
  background-size: cover;
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

  .courses-content {
    height: 100%;
  }

  .q-carousel__slide, .q-carousel {
    background: transparent !important;
  }
  .q-carousel__slide {
    padding: 0% 10%;
  }

  .card-header {
    height: 30%;
    min-height: 120px;
    background-color: $dark;
    padding-left: 5%;
    padding-right: 5%;
    .icon_name {
      height: 60%;
      overflow: hidden;
      img {
        height: 80%;
      }
      div {
        color: #faca00;
        font-family: "Roboto Slab", serif;
      }
    }
  }

  .q-carousel__next-arrow--horizontal {
    margin-right: 3% !important;
  }

  .card-content {
    padding-left: 5%;
    padding-right: 5%;
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
        background-color: $grey-1;
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

@media (max-width: $breakpoint-md-max) {
  
}
</style>


