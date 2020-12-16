<template>
  <div
    class="masthead"
    :style="{
      background:
        'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,212,255,0) 100%), url(' +
        Image_URL +
        ')'
    }"
  >
    <div class="text-content">
      <q-btn color="amber" dense :label="course.study_field" />
      <h1 class = "text-grey-1 text-bold">{{course.title}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home_Masthead",
  props: ['course'],
  data() {
    return {
      Image_URL: "",
      title: "",
      content: "",
      study_field: "",
    }
  },

  methods: {
    
  },

  mounted() {
    console.log(this.course);
    this.Image_URL = `http://54.251.82.57:8080/assets/${this.course.banner_image}`;
    this.title = this.course.title;
  }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;700&display=swap");

.masthead {
  height: auto;
  min-height: 40vh;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  position: relative;
  padding: 5% 10%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  h1 {
    font-family: "Roboto Slab";
  }
  p {
    color: white;
    font-size: 1.1rem;
    line-height: 1.5;
    margin-top: 2vh;
  }
  .text-content {
    width: 50%;
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
