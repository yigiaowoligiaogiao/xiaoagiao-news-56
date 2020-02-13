import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Profile from '../pages/Profile'
import EditProfile from '../pages/EditProfile'
import Follow from '../pages/Follow'
import Reply from '../pages/Reply.vue'
import Myfavorite from '../pages/Myfavorite.vue'
import Homepage from '../pages/Homepage.vue'
import News from '../pages/News.vue'
import EditManager from '../pages/EditManager.vue'
import Search from '../pages/Search.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Homepage, name: 'homepage' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', name: 'register', component: Register },
    { path: '/profile', name: 'profile', component: Profile },
    { path: '/EditProfile', name: 'edit-profile', component: EditProfile },
    { path: '/follow', name: 'follow', component: Follow },
    { path: '/reply', name: 'reply', component: Reply },
    { path: '/myfavorite', name: 'myfavorite', component: Myfavorite },
    /*  { path: '/homepage', component: Homepage, name: 'homepage' }, */
    { path: '/news/:id', name: '/news', component: News },
    { path: '/edit-manager', name: 'editmanager', component: EditManager },
    { path: '/search', name: 'search', component: Search }

  ]
})
const AuthUrls = [
  '/profile',
  '/edit-profile',
  '/follow',
  '/edit-profile',
  '/reply',
  '/myfavorite'
]
router.beforeEach(function (to, from, next) {
  const token = localStorage.getItem('token')
  if (AuthUrls.includes(to.path)) {
    if (token) {
      next()
    } else {
      this.$router.push('/login')
    }
  } else {
    next()
  }
})
export default router
