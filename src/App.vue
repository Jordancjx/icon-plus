<template>
  <div id="q-app">
    <q-layout view="hHh lpr ffr">
      <q-header elevated class="q-pl-xl text-dark no-wrap row justify-between nav-container" height-hint="98">
        <div id="nav-logo" class = "row no-wrap justify-center items-center">
          <router-link to="/" class = "row no-wrap justify-center items-center q-pt-md q-pb-sm">
            <img src="~assets/Logos/icon_logo_black.png" alt="logo-icon-plus" />
          </router-link>
        </div>
        
          <div class="buttons row no-wrap">
            <q-btn flat @click="drawerRight = !drawerRight" round dense icon="menu" />
            <q-tabs shrink align = "right">
              <q-btn color="primary" v-for = "parent in parent_items" :key = "parent.id" flat @mouseover="hello = true" :label="parent.title" icon-right = "keyboard_arrow_down" no-caps text-color = "black" class = "q-py-xl"></q-btn>
              <q-route-tab @mouseover="hello = false"
                v-for = "parentless in no_parent_items" :key = "parentless.id"
                :label="parentless.title"
                :to="parentless.link"
                exact
                no-caps
              />
            </q-tabs>
              <q-btn
                unelevated
                color="white"
                icon="fas fa-search"
                class = "q-px-md"
                text-color = "grey-7"
                style = "height: 100%; font-size: 0.6rem; border-radius: 0;"
              />
            <q-btn
              unelevated
              color="dark"
              icon="fas fa-search"
              label="Call Back"
              class = "q-px-md text-bold"
              text-color = "grey-3"
              style = "height: 100%; font-size: 1rem; border-radius: 0;"
            />
          </div>

          <q-menu v-model="hello" @mouseleave="hello = false" fit>
            <q-list style="min-width: 100px">
              <div class="row no-wrap q-py-md" id = "nav-menu">
                <div class="courses-parent-nav column q-px-xl q-pb-md" v-for = "parent in parent_items" :key = "parent.id" style = "width: 20%;">
                  <div class="text-subtitle1 text-center text-bold q-mb-md">{{parent.children[0].title}}</div>
                  <div class="course-nav row">
                    <q-btn v-for = "children in parent.children[0].children" :key = "children.id" flat color="white" no-caps class = "course-link" text-color="black" :to = "children.link" :label="children.title"/>
                  </div>
                </div>
              </div>
            </q-list>
          </q-menu>
      </q-header>

      

      <q-drawer v-model="right" side="right" overlay bordered>
        <!-- drawer content -->
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>

      <q-footer elevated class="bg-grey-8 text-white">
        <div class="footer-container">
          <div class="footer-left">
            <div class="logo-socials">
              <img src="~assets/Logos/icon_logo_white.png" alt="logo-icon-plus" />
              <div class="footer-social-icons row justify-between items-center q-mt-xl">
                <q-icon name = "fab fa-facebook-f"></q-icon>
                <q-icon name = "fab fa-linkedin-in"></q-icon>
                <q-icon name = "fab fa-twitter"></q-icon>
                <q-icon name = "fab fa-instagram"></q-icon>
              </div>
            </div>

            <div class="footer-left-links row no-wrap justify-between">
              <ul>
                <li class="footer-bold links-headers">Our Programmes</li>
                <li>Medicine</li>
                <li>US Schools & Colleges</li>
                <li>English</li>
                <li>MBA & Postgrad</li>
                <li>Law</li>
              </ul>

              <ul>
                <li class="footer-bold links-headers">About Us</li>
                <li>Who Are We</li>
                <li>Our instructors</li>
                <li>Careers</li>
              </ul>

              <ul>
                <li class="footer-bold links-headers">Events</li>
                <li class="footer-bold">Blog</li>
                <li class="footer-bold">FAQ</li>
                <li class="footer-bold">Contact us</li>
              </ul>
            </div>
          </div>
          <div class="footer-right row justify-between">
            <div class="location-text">
              <h6 class = "q-mb-lg">Location</h6>
              <p class = "q-mb-auto text-weight-bold">ICON+ Singapore Campus</p>
              <p>61 Stamford Road, Stamford Court, #01-01 Singapore 178892</p>
            </div>

            <div class="general-enquiry-text">
              <h6 class = "q-mb-lg">General Enquiry</h6>
              <p>
                +65 6336 6551 or +65 6336 6558 Monday to Friday: 10pm – 7pm
                Saturday to Sunday : 9am – 6pm Public Holiday: Closed
              </p>
            </div>
          </div>
        </div>

        <div class="footer-disclaimer">
          <p>Copyright 2020 Icon+ Education. All rights reserved.</p>
        </div>
      </q-footer>

    </q-layout>
  </div>
</template>
<script>
export default {
  data () {
    return {
      hello: false,
      nav_items: [],
      parent_items: [],
      no_parent_items: [],
      drawerRight: false
    }
  },
  methods: {
    getNavbar() {
      this.$axios.get('http://54.251.82.57:8080/items/menus?filter[slug][_eq]=site&fields=*,menu_items.*&fields=menu_items.children.*&fields=menu_items.children.children.*')
      .then((response) => {
        let nav_items = response.data.data[0].menu_items;
        nav_items.forEach(item => {
          if(item.children == null) {
            this.no_parent_items.push(item);
          }else {
            this.parent_items.push(item);
          }
        })
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
    this.getNavbar();
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;700&display=swap");
$main-color: #faca00;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  display: none;
}

.nav-container {
  min-height: 80px;
  width: 100%;
  height: 8vh;
  background-color: $main-color;
  #nav-logo {
    height: 100%;
    a {
      height: 100%;
    }
    img {
      height: 70%;
      object-fit: contain;
      display: block;
    }
  }
}

.courses-parent-nav {
  border-right: .5px solid grey;
}

.course-link {
  width: 48% !important;
}



footer {
  height: auto;
  background-color: #373939;
  padding: 0% 10%;
  padding-top: 3%;
  min-height: 300px;
  .footer-container {
    height: 90%;
    width: 100%;
    display: flex;
  }
  .footer-left {
    .footer-left-links {
      padding: 0% 3%;
      width: 60%;
      ul {
        list-style-type: none;
        li {
          margin-top: 2vh;
          color: $grey-5;
        }
      }
    }
    width: 60%;
    height: 100%;
    border-right: 0.2px solid rgba(255, 255, 255, 0.658);
    display: flex;
    justify-content: flex-start;
    .logo-socials {
      width: 25%;
      display: flex;
      flex-flow: column;
      height: 30%;
      justify-content: space-between;
      img {
        width: 50%;
      }
      .footer-social-icons {
        font-size: 1.4rem;
        color: $grey-5;
        width: 60%;
      }
    }
  }
  .footer-right {
    height: 100%;
    width: 40%;
    padding-left: 6%;
    .location-text,
    .general-enquiry-text {
      height: 100%;
      width: 45%;
      h6, p {
        color: $grey-1;
      }
    }
  }

  .footer-bold {
    font-weight: bold;
    color: white !important;
  }

  .links-headers {
    margin: 0 !important;
    color: white !important;
    font-weight: bold !important;
    font-family: "Roboto Slab", serif;
  }

  .footer-disclaimer {
    width: 100%;
    height: 10vh;
    padding-top: 1%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(151, 150, 150);
  }
}

$breakpoint-tablet: 999px;
$breakpoint-mobile: 666px;

@media (max-width: $breakpoint-md-max) {
  .q-tabs {
    display: none;
  }
}
</style>