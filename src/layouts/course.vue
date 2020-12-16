<template>
  <q-layout view="lHh Lpr lFf">
      <home-static-masthead :course = "course"></home-static-masthead>
  </q-layout>
</template>

<script>

export default {
  name: 'Home_Layout',
  components: { 
        HomeStaticMasthead: () => import('src/components/home-static-masthead.vue')
    },
  data() {
      return {
          course_name: this.$route.params.course_name,
          course: [],
          study_fields: [],
      }
  },
  methods: {
      getCourse() {
        this.$axios.get(`http://54.251.82.57:8080/items/courses?filter[slug][_eq]=${this.course_name}&fields=*&fields=section_contents.page_blocks_id.*&fields=instructors.instructors_id.*`)
        .then((response) => {
            this.course = response.data.data[0];
            console.log(this.course);
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

      getStudyField() {
        
      }
  },
  mounted() {
      console.log(this.course_name);
      this.getCourse();
  }
}
</script>