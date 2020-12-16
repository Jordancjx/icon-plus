<template>
  <div id="enquiry-form">
    <div class="enquiry-form-container">
      <div class="enquiry-form-header row justify-center items-center">
        <h4 class = "text-bold">Enquiry Form</h4>
      </div>
      <div class="form-container">
        <div class="enquiry-form-image"></div>
        <div class="actual-form">
          <h2>Have questions? We're here to help!</h2>
          <p class = "q-mt-md text-body2 text-bold">I am a</p>
          <q-btn-toggle
            v-model="selected_role"
            no-caps
            toggle-color="yellow-7"
            color="white"
            text-color="grey-6"
            toggle-text-color="black"
            unelevated
            push
            :options="[
              {value: 'Student', slot: 'one'},
              {value: 'Parent', slot: 'two'}
            ]"
          >

          <template v-slot:one class = "q-mr-md">
            <div class="row items-center no-wrap q-pa-sm round-corners q-mr-md">
              <q-icon right class = "q-mr-sm" name="img:icons/student.svg" />
              <div class="text-center">
                Student
              </div>
            </div>
          </template>

          <template v-slot:two class = "q-mr-md">
            <div class="row items-center no-wrap q-pa-sm round-corners q-mr-md">
              <q-icon class = "q-mr-sm" right name="img:icons/parent.svg" />
              <div class="text-center">
                Parent
              </div>
            </div>
          </template>
          
          </q-btn-toggle>
          <form action="#">
            <q-input
              class = "q-mt-md"
              type="text"
              v-for="text_input in text_fields"
              v-bind:key="text_input.title"
              :placeholder="text_input.title"
            />
            <q-select v-model = "test_selection"
            :options = "test_options"
               label = "Type of tests"
              class = "q-mt-md"
            />
            <q-select v-model = "country_selection"
            :options = "country_options"
               label = "Country of Residence"
              class = "q-mt-md"
            />
            <q-btn color="dark" type = "submit" label="Submit" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Enquiry-form",
  props: {},
  data() {
    return {
      text_fields: [],
      select_fields: [],
      role_select: [],
      selected_role: "Student",
      country_selection: "",
      country_options: [],
      test_options: [],
      test_selection: "",
    }
  },

  methods: {
    getFormFields() {
      this.role_select = [
        {
          role: "Student",
          role_icon:
            "https://www.flaticon.com/svg/static/icons/svg/3068/3068327.svg"
        },
        {
          role: "Parent",
          role_icon:
            "https://www.flaticon.com/svg/static/icons/svg/3763/3763166.svg"
        }
      ]

      this.text_fields = [
        { title: "Name" },
        { title: "Email Address" },
        { title: "Contact Number" }
      ]

      this.test_options = [
        "GSAT", "SAT", "BMIT"
      ]

      this.country_options = [
          "Singapore", "Taiwan", "Indonesia"
      ]

      console.log(this.test_options[0].options);
    }
  },

  mounted() {
    this.getFormFields()
  }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;700&display=swap");
$main-yellow :  #faca00;
#enquiry-form {
  height: auto;
  padding-top: 2%;
  padding-bottom: 5%;
  padding-left: 10%;
  padding-right: 10%;
}

button {
  margin-right: 30px !important;
}

.enquiry-form-container {
  height: 100%;
  .role-select {
    margin-top: 3%;
  }
  .enquiry-form-header {
    width: 100%;
    margin-bottom: 3.5%;
    h4 {
      font-family: "Roboto Slab", serif;
    }
  }
  .form-container {
    display: flex;
    height: auto;
    justify-content: space-between;
    .enquiry-form-image {
      min-height: 500px;
      width: 43%;
      padding: 2%;
      height: 100%;
      background-image: url("~assets/banners/homepg-enquiry@2x.jpg");
      background-position: center;
      background-size: cover;
    }
    .actual-form,
    .enquiry-form-image {
      width: 48%;
      height: 100%;
    }

    .actual-form {
      h2 {
        font-size: 1.88rem;
        font-family: "Roboto Slab", serif;
        font-weight: bold;
      }
      form {
        display: flex;
        flex-flow: column;
        justify-content: space-around;
        height: 100%;
        button {
          margin-top: 5%;
          width: 25%;
          padding-top: 1%;
          padding-bottom: 1%;
          color: #faca00 !important;
        }
      }
    }
  }
}
</style>
