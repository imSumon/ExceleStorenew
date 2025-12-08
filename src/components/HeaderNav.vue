<template>
  <header class="main-header" :class="{ scrolled: isScrolled }">
    <div class="top-bar">
      <div class="top-bar-container">
        <div class="top-bar-links">
          <a href="#" class="top-link">Support</a>
          <a href="#" class="top-link">For Business</a>
        </div>
      </div>
    </div>

    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-left">
          <a href="/" class="logo">
            <svg width="120" height="20" viewBox="0 0 120 20" fill="currentColor">
              <text x="0" y="15" font-family="Arial, sans-serif" font-size="18" font-weight="bold">SAMSUNG</text>
            </svg>
          </a>
        </div>

        <div class="nav-center" :class="{ active: mobileMenuOpen }">
          <router-link to="/category/mobile" class="nav-link" @click="closeMobileMenu">Mobile</router-link>
          <router-link to="/category/tv-av" class="nav-link" @click="closeMobileMenu">TV & AV</router-link>
          <router-link to="/category/home-appliances" class="nav-link" @click="closeMobileMenu">Home Appliances</router-link>
          <router-link to="/category/computing" class="nav-link" @click="closeMobileMenu">Computing</router-link>
          <router-link to="/category/displays" class="nav-link" @click="closeMobileMenu">Displays</router-link>
          <router-link to="/category/accessories" class="nav-link" @click="closeMobileMenu">Accessories</router-link>
          <router-link to="/category/smartthings" class="nav-link" @click="closeMobileMenu">SmartThings</router-link>
        </div>

        <div class="nav-right">
          <button class="icon-btn search-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
          <button class="icon-btn cart-btn" aria-label="Cart" @click="$router.push('/cart')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
          </button>
          <button class="icon-btn menu-btn" @click="toggleMobileMenu" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useCart } from '../store/cartStore'

const { cartCount } = useCart()

const mobileMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(50, 50, 50, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #fff;
  z-index: 1000;
  transition: all 0.3s ease;
}

.main-header.scrolled {
  background: rgba(40, 40, 40, 0.98);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.top-bar {
  width: 100%;
  background: transparent;
  border-bottom: none;
}

.top-bar-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: flex-end;
  height: 36px;
  align-items: center;
}

.top-bar-links {
  display: flex;
  gap: 24px;
}

.top-link {
  color: #fff;
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
  transition: opacity 0.2s;
}

.top-link:hover {
  opacity: 0.7;
}

.navbar {
  width: 100%;
}

.nav-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.nav-left .logo {
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
}

.nav-center {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.nav-link:hover {
  opacity: 0.7;
}

.nav-right {
  display: flex;
  gap: 16px;
  align-items: center;
}

.icon-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
  position: relative;
}

.icon-btn:hover {
  opacity: 0.7;
}

.cart-btn {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #ff4444;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
}

.menu-btn {
  display: none;
}

@media (max-width: 1024px) {
  .nav-center {
    position: fixed;
    top: 96px;
    left: 0;
    right: 0;
    background: #000;
    flex-direction: column;
    gap: 0;
    padding: 20px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .nav-center.active {
    transform: translateX(0);
  }

  .nav-link {
    padding: 16px 0;
    width: 100%;
    border-bottom: 1px solid #333;
  }

  .menu-btn {
    display: flex;
  }
}

@media (max-width: 768px) {
  .top-bar {
    display: none;
  }

  .nav-container {
    padding: 0 16px;
    height: 56px;
  }

  .nav-right {
    gap: 8px;
  }

  .nav-center {
    top: 56px;
  }
}
</style>
