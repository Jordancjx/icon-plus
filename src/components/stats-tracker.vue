<template>
  <div id="tracker" class = "row no-wrap items-center q-pt-md p-pd-md">
    <div v-for="stat in stats" v-bind:key="stat.stat_title" class="stat-item row justify-center items-center col">
      <img :src="stat.stat_logo_url" alt="" />
      <div class="stat-content q-ml-md">
        <h4 class = "text-bold">{{ stat.stat_data }}</h4>
        <div class = "text-body2">{{ stat.stat_title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stats_Tracker",
  props: {},
  data() {
    return {
      stats: []
    }
  },

  methods: {
    //Api to get stats
    getStats() {
      this.stats = [
        {
          stat_title: "Average Review",
          stat_data: "4.87/5",
          stat_logo_url: require("assets/stats/review@2x.png")
        },
        {
          stat_title: "Students",
          stat_data: "8,590",
          stat_logo_url: require("assets/stats/students@2x.png")
        },
        {
          stat_title: "Instructors",
          stat_data: "50",
          stat_logo_url: require("assets/stats/instructors@2x.png")
        },
        {
          stat_title: "School Offers",
          stat_data: "372",
          stat_logo_url: require("assets/stats/school-offer@2x.png")
        }
      ]
    }
  },

  mounted() {
    this.getStats()
  }
}
</script>

<style scoped lang="scss">
$main-color: #faca00;
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;700&display=swap");
#tracker {
  height: auto;
  min-height: 150px;
  max-height: 300px;
  background-color: #373939;
  padding: 1.5% 13%;
  overflow: hidden;
}

.stat-item {
  min-width: 18%;
  height: 100%;
  img {
    width: 22%;
    object-fit: contain;
  }
  h4 {
    font-family: "Roboto Slab", serif;
    color: $main-color;
  }
  
  div {
    color: $grey-1;
  }
}

$breakpoint-tablet: 999px;
$breakpoint-mobile: 666px;

@media screen and (max-width: $breakpoint-tablet) {
  #tracker {
    padding: 2% 8%;
  }

  .stat-content {
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 0.9rem;
    }
  }

  .stat-item {
    img {
      width: 25%;
    }
  }
}
</style>
