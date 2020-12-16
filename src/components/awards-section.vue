<template>
  <div id="awards">
    <div class="awards-container row justify-center">
      <div class="awards-area">
        <img
          v-for="award in awards"
          v-bind:key="award.id"
          :src="award.image_url"
          alt=""
        />
      </div>
      <div class="text-area column justify-center">
        <h1>Schools Accepted</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Awards_Section",
  props: {},
  data() {
    return {
      awards: []
    }
  },

  methods: {
    getAwards() {
      this.awards = [
        {
          id: 1,
          title: "Conventry",
          image_url:
            "https://www.coventry.ac.uk/globalassets/media/global/smarter-households/coventry-university-logo.jpg"
        },
        {
          id:2,
          title: "ECU",
          image_url:
            "https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Edith_Cowan_University_Logo_-_vector.svg/1200px-Edith_Cowan_University_Logo_-_vector.svg.png"
        },
        {
          id:3,
          title: "Cambridge",
          image_url:
            "https://img1.pnghut.com/1/5/6/wtkGrSbzuV/cambridge-test-area-gce-advanced-level-document.jpg"
        },
        {
          id:8,
          title: "Latrobe",
          image_url:
            "https://www.latrobe.edu.au/_media/la-trobe-api/v5/img/latrobe-logo-og.png"
        },
        {
          id:4,
          title: "Conventry",
          image_url:
            "https://www.coventry.ac.uk/globalassets/media/global/smarter-households/coventry-university-logo.jpg"
        },
        {
          id:5,
          title: "Conventry",
          image_url:
            "https://www.coventry.ac.uk/globalassets/media/global/smarter-households/coventry-university-logo.jpg"
        },
        {
          id: 9,
          title: "Conventry",
          image_url:
            "https://www.coventry.ac.uk/globalassets/media/global/smarter-households/coventry-university-logo.jpg"
        },
        {
          id:6,
          title: "Conventry",
          image_url:
            "https://www.coventry.ac.uk/globalassets/media/global/smarter-households/coventry-university-logo.jpg"
        },
        {
          id:7,
          title: "Conventry",
          image_url:
            "https://www.coventry.ac.uk/globalassets/media/global/smarter-households/coventry-university-logo.jpg"
        }
      ]
    }
  },

  mounted() {
    this.getAwards()
  }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;700&display=swap");

#awards {
  height: 50vh;
  min-height: 50vh;
  background-color: #f0f0f0;
  .awards-container {
    width: 100%;
    height: 100%;
    padding: 3% 10%;
  }
  .awards-area,
  .text-area {
    width: 48%;
    height: 100%;
  }
  .awards-area {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    img {
      height: 100%;
      object-fit: contain;
    }
  }

  .text-area {
    h1 {
      font-size: 2rem;
      font-family: "Roboto Slab", serif;
      font-weight: bold;
    }
    p {
      width: 80%;
    }
  }
}

$breakpoint-tablet: 999px;
$breakpoint-mobile: 666px;

@media screen and (max-width: $breakpoint-tablet) {
  .awards-container {
    flex-flow: column;
    .awards-area,
    .text-area {
      width: 100% !important;
    }
  }
}
</style>
