import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import Register from '../pages/Register.vue'
import Blog from '../pages/Blog.vue'
import Create from '../pages/Create.vue'
import Edit from '../pages/Edit.vue'
import BlogDetail from '../pages/BlogDetail.vue'
import { isLoggedIn } from '../auth'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login, meta: { guest: true } },
  { path: '/register', name: 'Register', component: Register, meta: { guest: true } },
  { path: '/blog', name: 'Blog', component: Blog, meta: { requiresAuth: true } },
  { path: '/create', name: 'Create', component: Create, meta: { requiresAuth: true } },
  { path: '/edit/:id', name: 'Edit', component: Edit, meta: { requiresAuth: true } },
  { path: '/blogdetail/:id', name: 'BlogDetail', component: BlogDetail, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    next('/login')
  } else if (to.meta.guest && isLoggedIn.value) {
    next('/blog')
  } else {
    next()
  }
})

export default router