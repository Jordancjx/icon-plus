<template>
  <q-layout view="lHh Lpr lFf">
    <home-masthead></home-masthead>
    <stats-tracker></stats-tracker>
    <about-us-section></about-us-section>
    <popular-courses></popular-courses>
    <awards-section></awards-section>
    <testimonials-section></testimonials-section>
    <enquiry-form></enquiry-form>
  </q-layout>
</template>

<script>

export default {
  name: 'Home_Layout',
  components: { 
    homeMasthead: () => import('../components/home-masthead'),
    PopularCourses: () => import('src/components/popular-courses.vue'),
    AboutUsSection: () => import('src/components/about-us-section.vue'),
    StatsTracker: () => import('src/components/stats-tracker.vue'),
    AwardsSection: () => import('src/components/awards-section.vue'),
    TestimonialsSection: () => import('src/components/testimonials-section.vue'),
    EnquiryForm: () => import('src/components/enquiry-form.vue')
  },
}
</script>
,
    StatsTracker