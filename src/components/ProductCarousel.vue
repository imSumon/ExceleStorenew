<template>
  <section class="product-carousel">
    <div class="carousel-container">
      <h2 v-if="title" class="section-title">{{ title }}</h2>
      <div class="carousel-wrapper">
        <button
          class="scroll-btn scroll-btn-left"
          @click="scrollLeft"
          :disabled="isAtStart"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="products-scroll" ref="scrollContainer" @scroll="checkScrollPosition">
          <div v-for="product in products" :key="product.id" class="product-card">
            <div class="product-content">
              <div class="product-text">
                <h3 class="product-name">{{ product.name }}</h3>
              </div>
              <div class="product-image">
                <img :src="product.image" :alt="product.name" />
              </div>
              <button class="buy-button">Buy</button>
            </div>
          </div>
        </div>

        <button
          class="scroll-btn scroll-btn-right"
          @click="scrollRight"
          :disabled="isAtEnd"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Product {
  id: string | number
  name: string
  image: string
  price?: string
}

interface Props {
  title?: string
  products: Product[]
}

defineProps<Props>()

const scrollContainer = ref<HTMLElement | null>(null)
const isAtStart = ref(true)
const isAtEnd = ref(false)

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -300, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 300, behavior: 'smooth' })
  }
}

const checkScrollPosition = () => {
  if (scrollContainer.value) {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value
    isAtStart.value = scrollLeft <= 0
    isAtEnd.value = scrollLeft + clientWidth >= scrollWidth - 1
  }
}

onMounted(() => {
  checkScrollPosition()
  window.addEventListener('resize', checkScrollPosition)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScrollPosition)
})
</script>

<style scoped>
.product-carousel {
  padding: 60px 20px;
  background: #fff;
}

.carousel-container {
  max-width: 1440px;
  margin: 0 auto;
}

.section-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 40px;
  color: #000;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
}

.scroll-btn {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #e0e0e0;
  background: #fff;
  color: #000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  z-index: 10;
}

.scroll-btn:hover:not(:disabled) {
  background: #f5f5f5;
  border-color: #000;
  transform: scale(1.1);
}

.scroll-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.products-scroll {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 10px 0;
  flex: 1;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.products-scroll::-webkit-scrollbar {
  display: none;
}

.product-card {
  min-width: 342px;
  width: 342px;
  height: 342px;
  background: #f5f5f5;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  flex-shrink: 0;
  position: relative;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.product-content {
  position: relative;
  width: 342px;
  height: 342px;
  display: flex;
  flex-direction: column;
  padding: 24px;
}

.product-text {
  text-align: center;
  margin-bottom: 20px;
  z-index: 2;
}

.product-image {
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 20px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.08);
}

.product-name {
  font-size: 24px;
  font-weight: 700;
  color: #000;
  line-height: 1.2;
}

.buy-button {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 14px 48px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;
  z-index: 3;
}

.product-card:hover .buy-button {
  opacity: 1;
  visibility: visible;
}

.buy-button:hover {
  background: #333;
  transform: translateX(-50%) scale(1.05);
}

@media (max-width: 768px) {
  .product-carousel {
    padding: 40px 16px;
  }

  .section-title {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .scroll-btn {
    width: 40px;
    height: 40px;
  }

  .product-card {
    min-width: 280px;
    width: 280px;
    height: 280px;
  }

  .products-scroll {
    gap: 16px;
  }

  .product-content {
    padding: 20px;
    width: 280px;
    height: 280px;
  }

  .product-name {
    font-size: 20px;
  }


  .buy-button {
    padding: 12px 40px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 20px;
  }

  .product-card {
    min-width: 240px;
    width: 240px;
    height: 240px;
  }

  .scroll-btn {
    width: 36px;
    height: 36px;
  }

  .product-name {
    font-size: 18px;
  }

  .product-content {
    width: 240px;
    height: 240px;
  }
}
</style>
