<template>
  <div id="about-us" class = "row justify-between">
    <div class="text-content">
      <h4 class = "q-mb-md text-bold">About Us</h4>
      <p class = "text-body1 q-mb-xl">
        {{content.description}}
      </p>
      <q-btn to = "/about" :size = "size" style="background: black; color: #faca00; width: 25%; padding: .5%;" label="Know More" />
    </div>
    <div class="mast-image"></div>
  </div>
</template>

<script>
export default {
  name: "About_Us",
  props: {},
  data() {
    return {
      size: 'md',
      content: "",
    }
  },

  methods: {
    loadAboutUs() {
      this.$axios.get('http://54.251.82.57:8080/items/home?fields=top_page_blocks.page_blocks_id.*')
      .then((response) => {
        this.content = response.data.data.top_page_blocks[0].page_blocks_id;
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
    this.loadAboutUs();
  }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;700&display=swap");
#about-us {
  height: auto;
  padding: 9% 10%;
  .text-content {
    width: 40%;
    h4 {
      font-family: "Roboto Slab", serif;
    }
  }
  .mast-image {
    min-height: 500px;
    width: 46%;
    height: 100%;
    background-image: url("https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80");
    background-size: cover;
  }
}

$breakpoint-tablet: 999px;
$breakpoint-mobile: 666px;

@media screen and (max-width: $breakpoint-tablet) {
  #about-us {
    flex-flow: column-reverse;
    .text-content,
    .mast-image {
      width: 100%;
    }

    .mast-image {
      margin-bottom: 5%;
    }

    .button {
      width: 100% !important;
    }
  }
}
</style>
