import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import CategoryPage from '../components/CategoryPage.vue'
import ProductDetailsPage from '../views/ProductDetailsPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/category',
    name: 'Category',
    component: CategoryPage
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetailsPage,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
