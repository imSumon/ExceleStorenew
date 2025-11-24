<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HeaderNav from './components/HeaderNav.vue'
import HeroBanner from './components/HeroBanner.vue'
import ProductShowcase from './components/ProductShowcase.vue'
import ProductCarousel from './components/ProductCarousel.vue'
import FeatureBanner from './components/FeatureBanner.vue'
import StoryCard from './components/StoryCard.vue'
import FooterSection from './components/FooterSection.vue'
import CategoryPage from './components/CategoryPage.vue'

const showCategoryPage = ref(false)

const handleCategoryOpen = () => {
  showCategoryPage.value = true
}

const handleCategoryClose = () => {
  showCategoryPage.value = false
}

const heroData = {
  title: 'Fab Grab Fest',
  subtitle: 'Get the best AI tech',
  primaryBtnText: 'Shop',
  secondaryBtnText: 'Explore'
}

const featuredProducts = [
  { id: 1, name: 'Galaxy Z Flip7', image: '/images/products/Galaxy-Z-Flip7.jpg', description: 'Fold. Unfold. Explore.' },
  { id: 2, name: 'Galaxy Watch6 Classic', image: '/images/products/watch1.jpg', description: 'Health tracking redefined' },
  { id: 3, name: 'Galaxy Watch6', image: '/images/products/watch2.jpg', description: 'Your fitness companion' },
  { id: 4, name: 'Galaxy Tab S10 Ultra', image: '/images/products/TabS10_Lite.jpg', description: 'Ultra performance' }
]

const tvProducts = [
  { id: 1, name: 'Neo QLED 8K', image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=400', description: '8K AI Upscaling' },
  { id: 2, name: 'The Frame', image: 'https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Art meets innovation' },
  { id: 3, name: 'Q-Series Soundbar', image: 'https://images.pexels.com/photos/1263410/pexels-photo-1263410.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Immersive sound' },
  { id: 4, name: 'Smart Monitor M8', image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Work and play' }
]

const applianceProducts = [
  { id: 1, name: 'Bespoke AI Refrigerator', image: '/images/banners/landry-1.png', description: 'Smart cooling technology', showBuyButton: true },
  { id: 2, name: 'Bespoke AI Laundry', image: '/images/banners/landry-2.jpg', description: 'AI Wash & Dry system', showBuyButton: true },
  { id: 3, name: 'Bespoke AI WindFree AC', image: '/images/banners/landry-3.jpg', description: 'Cooling without direct airflow', showBuyButton: true },
  { id: 4, name: 'Microwave Ovens', image: '/images/banners/landry4.jpg', description: 'Smart cooking made easy', showBuyButton: true }
]

const recommendedProducts = [
  { id: 1, name: 'Galaxy Z Flip7', price: '₹ 109999.00', image: '/images/products/Galaxy-Z-Flip7.jpg' },
  { id: 2, name: 'Galaxy Watch6 Classic', price: '₹ 44999.00', image: '/images/products/watch1.jpg' },
  { id: 3, name: 'Galaxy Watch Ultra', price: '₹ 49999.00', image: '/images/products/watch2.jpg' },
  { id: 4, name: 'Galaxy Tab S10 Lite', price: '₹ 39999.00', image: '/images/products/TabS10_Lite.jpg' }
]

const stories = [
  { id: 1, title: 'Smartthings', icon: '/images/icons/Explore_Card1.jpg', bgColor: 'linear-gradient(135deg, #4169E1 0%, #6B8DD6 100%)' },
  { id: 2, title: 'Why Samsung Smart TV', icon: '/images/icons/Explore_Card2.jpg', bgColor: 'linear-gradient(135deg, #5F9ACF 0%, #A8C5DD 100%)' },
  { id: 3, title: 'Samsung Health', icon: '/images/icons/Explore_Card3.jpg', bgColor: 'linear-gradient(135deg, #20B2AA 0%, #7DD3CB 100%)' },
  { id: 4, title: 'Switch to Galaxy', icon: '/images/icons/Explore_Card4.jpg', bgColor: 'linear-gradient(135deg, #6A5ACD 0%, #9B8FD9 100%)' },
  { id: 5, title: 'Gaming TV', icon: '/images/icons/Explore_Card5.jpg', bgColor: 'linear-gradient(135deg, #4682B4 0%, #87ADCE 100%)' }
]

onMounted(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.log('Service Worker registration failed:', err)
    })
  }
})
</script>

<template>
  <div class="app">
    <HeaderNav @open-category="handleCategoryOpen" />

    <CategoryPage v-if="showCategoryPage" @close="handleCategoryClose" />

    <main v-else>
      <HeroBanner
        :title="heroData.title"
        :subtitle="heroData.subtitle"
        :primary-btn-text="heroData.primaryBtnText"
        :secondary-btn-text="heroData.secondaryBtnText"
        :banner-image="{
          webp: '/images/banners/Banner-1.jpg',
          jpg: '/images/banners/Banner-1.jpg'
        }"
      />

      <FeatureBanner
        title="Fab AI companion"
        description="Galaxy AI is here"
        image="/images/banners/Banner-3.jpg"
        bg-color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      />

      <ProductShowcase :products="featuredProducts" />

      <FeatureBanner
        title="Fab 4K AI upscaling"
        description="Grab the Frame TV"
        image="/images/banners/Banner-4.jpg"
        bg-color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      />

      <ProductShowcase :products="tvProducts" />

      <FeatureBanner
        title="Fab one-stop laundry"
        description="Grab Bespoke AI Laundry Combo"
        image="/images/banners/Banner-2.jpg"
        bg-color="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
      />

      <ProductShowcase :products="applianceProducts" />

      <ProductCarousel title="Recommended for you" :products="recommendedProducts" />

      <StoryCard :stories="stories" />
    </main>

    <FooterSection />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'SamsungOne', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #fff;
  color: #000;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 48px;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
