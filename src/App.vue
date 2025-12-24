<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeaderNav from './components/HeaderNav.vue'
import FooterSection from './components/FooterSection.vue'

const router = useRouter()

const handleCategoryOpen = () => {
  router.push({ name: 'Category' })
}

onMounted(() => {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.log('Service Worker registration failed:', err)
    })
  }
})
</script>

<template>
  <div class="app">
    <HeaderNav @open-category="handleCategoryOpen" />

    <main>
      <router-view />
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
