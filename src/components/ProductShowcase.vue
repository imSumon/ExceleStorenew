<template>
  <section class="product-showcase">
    <div class="showcase-container">
      <h2 v-if="title" class="section-title">{{ title }}</h2>
      <div class="products-grid" :class="{ 'grid-4': products.length >= 4 }">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="product-content">
            <div class="product-header">
              <h3 class="product-name">{{ product.name }}</h3>
              <p v-if="product.description" class="product-description">{{ product.description }}</p>
            </div>
            <div class="product-image">
              <img :src="product.image" :alt="product.name" />
            </div>
            <button class="buy-button">Buy</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Product {
  id: string | number
  name: string
  image: string
  price?: string
  description?: string
  showBuyButton?: boolean
}

interface Props {
  title?: string
  products: Product[]
}

defineProps<Props>()
</script>

<style scoped>
.product-showcase {
  padding: 60px 20px;
  background: #fff;
}

.showcase-container {
  max-width: 1440px;
  margin: 0 auto;
}

.section-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 40px;
  color: #000;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.products-grid.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

.product-card {
  background: #f5f5f5;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  width: 342px;
  height: 342px;
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

.product-header {
  text-align: center;
  margin-bottom: 24px;
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
  max-height: 280px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.08);
}

.product-name {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #000;
  line-height: 1.2;
}

.product-description {
  font-size: 15px;
  color: #666;
  line-height: 1.4;
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

@media (max-width: 1200px) {
  .products-grid.grid-4 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .product-showcase {
    padding: 40px 16px;
  }

  .section-title {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .products-grid.grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .products-grid {
    gap: 16px;
  }

  .product-content {
    padding: 20px;
    width: 100%;
    height: 100%;
  }

  .product-card {
    width: 280px;
    height: 280px;
  }

  .product-name {
    font-size: 18px;
  }

  .product-description {
    font-size: 14px;
  }

  .product-image img {
    max-height: 240px;
  }

  .buy-button {
    padding: 12px 40px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .products-grid.grid-4 {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 20px;
  }

  .product-content {
    width: 100%;
    height: 100%;
  }

  .product-card {
    width: 240px;
    height: 240px;
  }

  .product-name {
    font-size: 16px;
  }

  .product-image img {
    max-height: 200px;
  }
}
</style>
