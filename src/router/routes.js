
const routes = [
  {
    path: '/',
    component: () => import('layouts/home.vue'),
  },

  {
    path: '/about',
    component: () => import('layouts/home.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  {
    path: '/course/:course_name',
    component: () => import('layouts/course.vue'),
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
]

export default routes
