<template>
  <div>
    <div class = "masthead">
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        control-color="white"
        padding
        height="80vh"
        class="text-white shadow-1"
        infinite
        :autoplay = "autoplay"
      >
        <q-carousel-slide v-for = "slides in mast_content" v-bind:key = "slides.title" :name = "slides.carousel_items_id.id" class="column no-wrap flex-start justify-center q-pl-xl" :style="{
        background:'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,212,255,0) 100%), url(' +slides.carousel_items_id.image_url +')'}">
          <div class="text-content q-mt-md text-left q-ml-xl" :name="slides.carousel_items_id.title">
            <h3>{{slides.carousel_items_id.title}}</h3>
            <p class = "text-body1 q-pt-md">{{slides.carousel_items_id.description}}</p>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>


  
</template>

<script>
export default {
  name: "Home_Masthead",
  props: {},
  data() {
    return {
      Image_URL: "",
      title: "",
      content: "",
      mast_content: [],
      slide: 1,
      autoplay: true,
    }
  },

  methods: {
    getMasthead() {
      this.$axios.get('http://54.251.82.57:8080/items/home?fields=carousel.carousel_items_id.*.*')
      .then((response) => {
        let carousel = response.data.data.carousel;
        carousel.forEach((c) => {
          c.carousel_items_id.image_url = `http://54.251.82.57:8080/assets/${c.carousel_items_id.item_image.id}`
        })
        this.mast_content = carousel;
      })
      .catch(() => {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
      })
    }
  },

  mounted() {
    this.getMasthead()
  }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;700&display=swap");

.masthead {
  height: auto;
  min-height: 80vh;
  .q-carousel__slide {
    background-repeat: no-repeat !important; 
    background-size: cover !important;
  }
  h3 {
    color: $grey-1;
    font-family: "Roboto Slab", serif;
    font-weight: 500;
    line-height: 1.5;
  }
  p {
    color: $grey-1;
    line-height: 1.5;
  }
  .text-content {
    width: 40%;
  }
}

$breakpoint-tablet: 999px;
$breakpoint-mobile: 666px;

@media screen and (max-width: $breakpoint-tablet) {
  .text-content {
    width: 85% !important;
  }
}
</style>
