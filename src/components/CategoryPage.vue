<template>
  <div class="category-page">
    <header class="category-header">
      <div class="top-bar">
        <div class="top-bar-container">
          <div class="top-bar-links">
            <a href="#" class="top-link">Support</a>
            <a href="#" class="top-link">For Business</a>
          </div>
        </div>
      </div>

      <nav class="category-navbar">
        <div class="nav-container">
          <div class="nav-left">
            <button class="back-button" @click="$emit('close')">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <a href="#" class="logo">
              <svg width="120" height="20" viewBox="0 0 120 20" fill="currentColor">
                <text x="0" y="15" font-family="Arial, sans-serif" font-size="18" font-weight="bold">SAMSUNG</text>
              </svg>
            </a>
          </div>

          <div class="nav-center">
            <a href="#" class="nav-link active">Mobile</a>
            <a href="#" class="nav-link">TV & AV</a>
            <a href="#" class="nav-link">Home Appliances</a>
            <a href="#" class="nav-link">Computing</a>
            <a href="#" class="nav-link">Displays</a>
            <a href="#" class="nav-link">Accessories</a>
            <a href="#" class="nav-link">SmartThings</a>
          </div>

          <div class="nav-right">
            <button class="icon-btn search-btn" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
            <button class="icon-btn cart-btn" aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>

    <div class="breadcrumb">
      <a href="#">Mobile</a>
      <span>/</span>
      <a href="#">Galaxy Smartphones</a>
      <span>/</span>
      <span>All Galaxy Smartphones</span>
    </div>

    <h1 class="page-title">All Galaxy Smartphones</h1>

    <div class="category-tabs-container">
      <div class="category-tabs">
        <button class="tab-item active">
          <img src="/images/products/Galaxy-Z-Flip7.jpg" alt="Galaxy S" />
          <span>Galaxy S</span>
        </button>
        <button class="tab-item">
          <img src="/images/products/Galaxy-Z-Flip7.jpg" alt="Galaxy Z" />
          <span>Galaxy Z</span>
        </button>
        <button class="tab-item">
          <img src="/images/products/1.png" alt="Galaxy A" />
          <span>Galaxy A</span>
        </button>
        <button class="tab-item">
          <img src="/images/products/2.webp" alt="Galaxy M" />
          <span>Galaxy M</span>
        </button>
        <button class="tab-item">
          <span>Compare</span>
        </button>
      </div>
      <div class="tabs-navigation">
        <button class="tab-nav-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="tab-nav-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 4L14 10L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="content-wrapper">
      <aside class="filters-sidebar" :class="{ 'mobile-open': mobileFiltersOpen }">
        <div class="filters-header">
          <div class="filters-title">
            <h3>Filters</h3>
            <span class="results-count">{{ filteredProducts.length }} Results</span>
          </div>
          <button class="close-filters" @click="mobileFiltersOpen = false">×</button>
        </div>

        <div class="filter-group">
          <button class="filter-header" @click="toggleFilter('range')">
            <span>PRODUCT RANGE</span>
            <svg :class="{ rotated: openFilters.range }" width="16" height="16" viewBox="0 0 16 16">
              <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="filter-options" v-show="openFilters.range">
            <label v-for="option in productRanges" :key="option">
              <input type="checkbox" v-model="selectedRanges" :value="option" />
              <span>{{ option }}</span>
            </label>
          </div>
        </div>

        <div class="filter-group">
          <button class="filter-header" @click="toggleFilter('storage')">
            <span>STORAGE</span>
            <svg :class="{ rotated: openFilters.storage }" width="16" height="16" viewBox="0 0 16 16">
              <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="filter-options" v-show="openFilters.storage">
            <label v-for="option in storageOptions" :key="option">
              <input type="checkbox" v-model="selectedStorage" :value="option" />
              <span>{{ option }}</span>
            </label>
          </div>
        </div>

        <div class="filter-group">
          <button class="filter-header" @click="toggleFilter('display')">
            <span>DISPLAY SIZE</span>
            <svg :class="{ rotated: openFilters.display }" width="16" height="16" viewBox="0 0 16 16">
              <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="filter-options" v-show="openFilters.display">
            <label v-for="option in displaySizes" :key="option">
              <input type="checkbox" v-model="selectedDisplay" :value="option" />
              <span>{{ option }}</span>
            </label>
          </div>
        </div>

        <div class="filter-group">
          <button class="filter-header" @click="toggleFilter('features')">
            <span>FEATURES</span>
            <svg :class="{ rotated: openFilters.features }" width="16" height="16" viewBox="0 0 16 16">
              <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="filter-options" v-show="openFilters.features">
            <label v-for="option in features" :key="option">
              <input type="checkbox" v-model="selectedFeatures" :value="option" />
              <span>{{ option }}</span>
            </label>
          </div>
        </div>
      </aside>

      <main class="products-section">
        <div class="products-header">
          <button class="mobile-filters-btn" @click="mobileFiltersOpen = true">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M3 6h14M6 10h8M8 14h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Filters
          </button>
          <div class="sort-dropdown">
            <label>Sort</label>
            <select v-model="sortBy">
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <div class="products-grid">
          <div class="showcase-item">
            <div class="showcase-badge">New</div>
            <div class="showcase-content">
              <h2 class="showcase-title">Galaxy Z Fold7</h2>
              <p class="showcase-subtitle">Special colour available on samsung.com</p>
              <a href="#" class="showcase-link">Buy now</a>
            </div>
            <div class="showcase-image">
              <img src="/images/products/Galaxy-Z-Flip7.jpg" alt="Galaxy Z Fold7" />
            </div>
          </div>

          <div v-for="product in filteredProducts.slice(0, 2)" :key="product.id" class="product-card" @click="openProductDetails(product)" style="cursor: pointer;">
            <div class="product-badge-new" v-if="product.badge === 'New'">New</div>
            <div class="product-card-image">
              <img :src="product.image" :alt="product.name" />
            </div>
            <button class="quick-look-btn" @click.stop="openProductDetails(product)">Quick Look</button>
            <h3 class="product-card-title">{{ product.name }}</h3>
            <p class="product-color-label">Colour : {{ product.colorLabel || 'Light Violet' }}</p>
            <div class="product-colors">
              <button v-for="(color, index) in product.colors" :key="index" class="color-option" :class="{ active: index === 0 }" :style="{ background: color }" :aria-label="'Color option ' + (index + 1)"></button>
            </div>
            <div class="product-storage">
              <button v-for="storage in product.storage" :key="storage" class="storage-option" :class="{ active: storage === '64 GB' }">
                {{ storage }}
              </button>
            </div>
            <div class="product-pricing">
              <div class="price-main">
                <span class="price-amount">₹ {{ product.priceAmount || '9749.00' }}</span>
                <span class="price-save">Save ₹ {{ product.savingsAmount || '750.00' }}</span>
              </div>
              <p class="price-mrp">MRP: ₹ {{ product.mrp || '10499.00' }} (Incl. of all taxes)</p>
            </div>
            <div class="product-card-actions">
              <button class="btn-buy-now">Buy now</button>
              <button class="btn-learn-more">Learn more</button>
              <label class="compare-checkbox">
                <input type="checkbox" />
                <span>Compare</span>
              </label>
            </div>
          </div>
        </div>

        <div class="view-more">
          <button class="view-more-btn">View more</button>
        </div>
      </main>
    </div>
  </div>

  <ProductDetails
    v-if="selectedProduct"
    :product="selectedProduct"
    :visible="showProductDetails"
    @close="closeProductDetails"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ProductDetails from './ProductDetails.vue'

interface Product {
  id: number
  name: string
  price: string
  image: string
  badge?: string
  colors: string[]
  storage: string[]
  range: string
  storageCapacity: string[]
  displaySize: string
  features: string[]
  colorLabel?: string
  priceAmount?: string
  savingsAmount?: string
  mrp?: string
}

const mobileFiltersOpen = ref(false)
const sortBy = ref('recommended')
const showProductDetails = ref(false)
const selectedProduct = ref<Product | null>(null)

const openFilters = ref({
  range: true,
  storage: true,
  display: true,
  features: false,
  camera: false,
  series: false
})

const openProductDetails = (product: Product) => {
  selectedProduct.value = product
  showProductDetails.value = true
  document.body.style.overflow = 'hidden'
}

const closeProductDetails = () => {
  showProductDetails.value = false
  selectedProduct.value = null
  document.body.style.overflow = 'auto'
}

const productRanges = ['Galaxy S', 'Galaxy A', 'Galaxy M', 'Galaxy F']
const storageOptions = ['32GB', '64GB', '128GB', '256GB', '512GB']
const displaySizes = ['< 5.9"', '5.9-6.3"', '6.3-6.5"', '6.5-6.8"', '> 7.0"']
const features = ['5G', 'Water Resistant', 'Wireless Charging', 'Fast Charging']

const selectedRanges = ref<string[]>([])
const selectedStorage = ref<string[]>([])
const selectedDisplay = ref<string[]>([])
const selectedFeatures = ref<string[]>([])

const products = ref<Product[]>([
  {
    id: 1,
    name: 'Galaxy A07 (4 GB Memory)',
    price: '$199',
    image: '/images/products/3.png',
    badge: 'New',
    colors: ['#1A3A4A', '#2A2A2A', '#C8B8D8'],
    storage: ['64 GB'],
    colorLabel: 'Light Violet',
    priceAmount: '9749.00',
    savingsAmount: '750.00',
    mrp: '10499.00',
    range: 'Galaxy A',
    storageCapacity: ['64GB'],
    displaySize: '6.3-6.5"',
    features: ['Fast Charging']
  },
  {
    id: 2,
    name: 'Galaxy F07 (4 GB Memory)',
    price: '$299',
    image: '/images/products/6.png',
    badge: 'New',
    colors: ['#1A5A4A'],
    storage: ['64 GB'],
    colorLabel: 'Green',
    priceAmount: '8499.00',
    savingsAmount: '1500.00',
    mrp: '9999.00',
    range: 'Galaxy F',
    storageCapacity: ['64GB'],
    displaySize: '6.3-6.5"',
    features: ['5G', 'Fast Charging']
  },
  {
    id: 3,
    name: 'Galaxy A17 5G',
    price: '$299',
    image: '/images/products/1.png',
    badge: 'Quick Look',
    colors: ['#D4D4D4', '#1A1A1A', '#4A5A8A'],
    storage: ['64GB', '128GB'],
    range: 'Galaxy A',
    storageCapacity: ['64GB', '128GB'],
    displaySize: '6.3-6.5"',
    features: ['Fast Charging']
  },
  {
    id: 4,
    name: 'Galaxy A26 5G',
    price: '$349',
    image: '/images/products/4.png',
    badge: 'Quick Look',
    colors: ['#1A1A1A', '#D4D4D4'],
    storage: ['128GB', '256GB'],
    range: 'Galaxy A',
    storageCapacity: ['128GB', '256GB'],
    displaySize: '6.3-6.5"',
    features: ['5G', 'Fast Charging']
  },
  {
    id: 5,
    name: 'Galaxy A36 5G',
    price: '$399',
    image: '/images/products/5.png',
    badge: 'Quick Look',
    colors: ['#E8E8E8', '#1A1A1A', '#5A6F9E'],
    storage: ['128GB', '256GB'],
    range: 'Galaxy A',
    storageCapacity: ['128GB', '256GB'],
    displaySize: '6.3-6.5"',
    features: ['5G', 'Water Resistant']
  },
  {
    id: 6,
    name: 'Galaxy A56 5G',
    price: '$449',
    image: '/images/products/6.png',
    badge: 'Quick Look',
    colors: ['#D4D4D4', '#1A1A1A', '#8A9A7A'],
    storage: ['256GB'],
    range: 'Galaxy A',
    storageCapacity: ['256GB'],
    displaySize: '6.3-6.5"',
    features: ['5G', 'Water Resistant', 'Fast Charging']
  },
  {
    id: 7,
    name: 'Galaxy A06',
    price: '$149',
    image: '/images/products/7.png',
    badge: 'Quick Look',
    colors: ['#E8E8E8', '#1A1A1A', '#C8B8D8'],
    storage: ['64GB'],
    range: 'Galaxy A',
    storageCapacity: ['64GB'],
    displaySize: '6.3-6.5"',
    features: []
  },
  {
    id: 8,
    name: 'Galaxy A16 5G',
    price: '$249',
    image: '/images/products/8.png',
    badge: 'Quick Look',
    colors: ['#1A1A1A', '#4A8A9A'],
    storage: ['128GB', '256GB'],
    range: 'Galaxy A',
    storageCapacity: ['128GB', '256GB'],
    displaySize: '6.3-6.5"',
    features: ['5G']
  },
  {
    id: 9,
    name: 'Galaxy Z Flip6',
    price: '$999',
    image: '/images/products/Galaxy-Z-Flip7.jpg',
    badge: 'Quick Look',
    colors: ['#C8B8D8'],
    storage: ['256GB'],
    range: 'Galaxy S',
    storageCapacity: ['256GB'],
    displaySize: '6.5-6.8"',
    features: ['5G', 'Water Resistant', 'Wireless Charging']
  },
  {
    id: 10,
    name: 'Galaxy Z Fold6',
    price: '$1799',
    image: '/images/products/9.png',
    badge: 'Quick Look',
    colors: ['#C8C8C8'],
    storage: ['256GB', '512GB'],
    range: 'Galaxy S',
    storageCapacity: ['256GB', '512GB'],
    displaySize: '> 7.0"',
    features: ['5G', 'Water Resistant', 'Wireless Charging']
  },
  {
    id: 11,
    name: 'Galaxy S25 Ultra',
    price: '$1299',
    image: '/images/products/10.png',
    badge: 'Quick Look',
    colors: ['#5A6A7A', '#1A1A1A'],
    storage: ['256GB', '512GB', '1TB'],
    range: 'Galaxy S',
    storageCapacity: ['256GB', '512GB', '1TB'],
    displaySize: '6.5-6.8"',
    features: ['5G', 'Water Resistant', 'Wireless Charging', 'Fast Charging']
  },
  {
    id: 12,
    name: 'Galaxy S25+',
    price: '$999',
    image: '/images/products/TabS10_Lite.jpg',
    badge: 'Quick Look',
    colors: ['#5A6F9E', '#1A1A1A'],
    storage: ['256GB', '512GB'],
    range: 'Galaxy S',
    storageCapacity: ['256GB', '512GB'],
    displaySize: '6.5-6.8"',
    features: ['5G', 'Water Resistant', 'Wireless Charging']
  }
])

const filteredProducts = computed(() => {
  let filtered = products.value

  if (selectedRanges.value.length > 0) {
    filtered = filtered.filter(p => selectedRanges.value.includes(p.range))
  }

  if (selectedStorage.value.length > 0) {
    filtered = filtered.filter(p =>
      p.storageCapacity.some(s => selectedStorage.value.includes(s))
    )
  }

  if (selectedDisplay.value.length > 0) {
    filtered = filtered.filter(p => selectedDisplay.value.includes(p.displaySize))
  }

  if (selectedFeatures.value.length > 0) {
    filtered = filtered.filter(p =>
      selectedFeatures.value.every(f => p.features.includes(f))
    )
  }

  return filtered
})

const toggleFilter = (filterName: keyof typeof openFilters.value) => {
  openFilters.value[filterName] = !openFilters.value[filterName]
}
</script>

<style scoped>
.category-page {
  background: #fff;
  min-height: 100vh;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  z-index: 1001;
}

.category-header {
  position: relative;
  z-index: 100;
  background: #fff;
  color: #000;
  width: 100%;
  max-width: 1520.8px;
  height: 106px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.top-bar {
  display: none;
}

.top-bar-container {
  display: none;
}

.top-bar-links {
  display: none;
}

.top-link {
  display: none;
}

.category-navbar {
  width: 100%;
  background: transparent;
  border: none;
}

.nav-container {
  max-width: 1440px;
  width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 106px;
  box-sizing: border-box;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-left .logo {
  display: flex;
  align-items: center;
  color: #000;
  text-decoration: none;
  font-size: 24px;
  font-family: 'SamsungOne', Arial, sans-serif;
  font-weight: bold;
  letter-spacing: 2px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px;
  background: transparent;
  border: none;
  color: #000;
  cursor: pointer;
  transition: opacity 0.2s;
}

.back-button:hover {
  opacity: 0.7;
}

.back-button svg {
  width: 20px;
  height: 20px;
}

.nav-center {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-link {
  color: #000;
  text-decoration: none;
  font-size: 14px;
  font-family: 'SamsungOne', Arial, sans-serif;
  font-weight: 600;
  transition: opacity 0.2s;
  white-space: nowrap;
  padding: 4px 0;
  border-bottom: 2px solid transparent;
}

.nav-link:hover {
  opacity: 0.7;
}

.nav-link.active {
  border-bottom-color: #000;
}

.nav-right {
  display: flex;
  gap: 16px;
  align-items: center;
}

.icon-btn {
  background: none;
  border: none;
  color: #000;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}

.icon-btn:hover {
  opacity: 0.7;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #666;
  margin-bottom: 20px;
  background: #fff;
  padding: 10px 0;
  position: relative;
  z-index: 10;
}

.breadcrumb a {
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb a:hover {
  color: #000;
  text-decoration: underline;
}

.breadcrumb span:last-child {
  color: #000;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #000;
  background: #fff;
  position: relative;
  z-index: 10;
}

.category-tabs-container {
  position: relative;
  margin-bottom: 40px;
  background: #fff;
  z-index: 10;
}

.category-tabs {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 10px;
  border-bottom: 2px solid #e0e0e0;
  background: #fff;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.category-tabs::-webkit-scrollbar {
  display: none;
}

.tabs-navigation {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 8px;
  background: linear-gradient(to left, #fff 60%, transparent);
  padding-left: 40px;
}

.tab-nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-nav-btn:hover {
  background: #f5f5f5;
  border-color: #000;
}

.tab-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  padding: 32px 20px;
  background: #f7f7f7;
  border: none;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
  white-space: nowrap;
  border-radius: 8px 8px 0 0;
  width: 258px;
  height: 136px;
  box-sizing: border-box;
}

.tab-item:hover {
  background: #ebebeb;
}

.tab-item.active {
  background: #fff;
  border-bottom-color: #0000ee;
}

.tab-item img {
  width: 72px;
  height: 72px;
  object-fit: contain;
  flex-shrink: 0;
}

.tab-item span {
  font-size: 20px;
  font-family: 'SamsungOne', Arial, sans-serif;
  font-weight: 600;
  color: #000;
  text-align: left;
  line-height: 1.3;
  max-width: 86.6px;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;
  max-width: 1440px;
  margin: 0 auto;
}

.filters-sidebar {
  background: #fff;
  border-right: 1px solid #e0e0e0;
  padding-right: 30px;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.filters-title {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filters-title h3 {
  font-size: 18px;
  font-weight: 700;
  color: #000;
}

.results-count {
  font-size: 13px;
  color: #666;
}

.close-filters {
  display: none;
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: #000;
  padding: 0;
  width: 32px;
  height: 32px;
}

.filter-group {
  margin-bottom: 24px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 16px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  color: #000;
  letter-spacing: 0.5px;
}

.filter-header svg {
  transition: transform 0.2s;
}

.filter-header svg.rotated {
  transform: rotate(180deg);
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0;
}

.filter-options label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}

.filter-options input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.products-section {
  flex: 1;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.mobile-filters-btn {
  display: none;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #fff;
  border: 2px solid #000;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.mobile-filters-btn:hover {
  background: #f5f5f5;
}

.sort-dropdown {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sort-dropdown label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.sort-dropdown select {
  padding: 8px 32px 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  background: #fff;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%23000' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
}

.products-grid {
  display: grid;
  grid-template-columns: 312px 1fr 1fr;
  gap: 24px;
  margin-bottom: 40px;
  max-width: 1440px;
}

.showcase-item {
  width: 312px;
  height: 689.48px;
  background: #f4f4f4;
  border-radius: 12px;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  box-sizing: border-box;
}

.showcase-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: #0066ff;
  color: #fff;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  z-index: 10;
}

.showcase-content {
  flex-shrink: 0;
}

.showcase-title {
  font-size: 24px;
  font-family: 'SamsungOne', Arial, sans-serif;
  font-weight: 700;
  color: #000;
  margin-bottom: 12px;
  line-height: 1.2;
}

.showcase-subtitle {
  font-size: 12px;
  color: #666;
  margin-bottom: 16px;
  line-height: 1.5;
}

.showcase-link {
  display: inline-block;
  color: #000;
  text-decoration: underline;
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.2s;
}

.showcase-link:hover {
  opacity: 0.7;
}

.showcase-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  min-height: 0;
}

.showcase-image:hover {
  transform: scale(1.05);
  cursor: zoom-in;
}

.showcase-image img {
  width: 165px;
  height: 165px;
  object-fit: contain;
}

.product-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 689.48px;
}

.product-badge-new {
  position: absolute;
  top: 16px;
  left: 16px;
  background: #0066ff;
  color: #fff;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  z-index: 10;
}

.product-card-image {
  width: 239px;
  height: 239px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  background: #f9f9f9;
  border-radius: 8px;
}

.product-card-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 16px;
}

.quick-look-btn {
  width: 100%;
  padding: 10px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  font-size: 12px;
  font-weight: 600;
  color: #000;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background 0.2s;
}

.quick-look-btn:hover {
  background: #f5f5f5;
}

.product-card-title {
  font-size: 16px;
  font-family: 'SamsungOne', Arial, sans-serif;
  font-weight: 600;
  color: #000;
  margin-bottom: 10px;
  line-height: 1.3;
}

.product-color-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
}

.product-item {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease;
  position: relative;
}

.product-item:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.product-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.95);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  color: #000;
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.product-badge:hover {
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.product-image {
  width: 100%;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-item:hover .product-image img {
  transform: scale(1.05);
}

.product-name {
  font-size: 18px;
  font-weight: 700;
  color: #000;
  line-height: 1.3;
}

.product-price {
  font-size: 14px;
  color: #666;
}

.product-colors {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.color-option {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
  position: relative;
}

.color-option.active {
  border-color: #000;
  box-shadow: 0 0 0 1px #000;
}

.color-option:hover {
  transform: scale(1.1);
}

.product-storage {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.storage-option {
  padding: 8px 16px;
  background: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #000;
  cursor: pointer;
  transition: all 0.2s;
}

.storage-option.active {
  background: #000;
  color: #fff;
  border-color: #000;
}

.storage-option:hover {
  border-color: #000;
}

.product-pricing {
  margin-bottom: 16px;
  padding: 12px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}

.price-main {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.price-amount {
  font-size: 18px;
  font-weight: 700;
  color: #000;
}

.price-save {
  font-size: 12px;
  font-weight: 600;
  color: #d00;
}

.price-mrp {
  font-size: 11px;
  color: #666;
}

.product-card-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-buy-now,
.btn-learn-more {
  width: 100%;
  padding: 12px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-buy-now {
  background: #000;
  color: #fff;
}

.btn-buy-now:hover {
  background: #333;
}

.btn-learn-more {
  background: #fff;
  color: #000;
  border: 2px solid #000;
}

.btn-learn-more:hover {
  background: #f5f5f5;
}

.color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: transform 0.2s;
}

.color-dot:hover {
  transform: scale(1.2);
}

.storage-btn {
  padding: 6px 16px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.storage-btn:hover {
  background: #f5f5f5;
  border-color: #000;
}

.product-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: auto;
}

.action-btn {
  width: 100%;
  padding: 12px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #333;
  transform: scale(1.02);
}

.compare-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
}

.compare-checkbox input {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.view-more {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.view-more-btn {
  padding: 14px 48px;
  background: #fff;
  color: #000;
  border: 2px solid #000;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-more-btn:hover {
  background: #000;
  color: #fff;
}

@media (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 240px 1fr;
    gap: 24px;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .category-page {
    padding: 16px;
  }

  .category-header {
    max-width: 100%;
    height: auto;
    padding: 12px 0;
  }

  .nav-container {
    padding: 0 16px;
    height: 56px;
    width: 100%;
  }

  .nav-center {
    display: none;
  }

  .page-title {
    font-size: 24px;
  }

  .tabs-navigation {
    display: none;
  }

  .tab-item {
    padding: 16px;
    width: 180px;
    height: 100px;
    gap: 12px;
  }

  .tab-item img {
    width: 56px;
    height: 56px;
  }

  .tab-item span {
    font-size: 16px;
    max-width: 70px;
  }

  .product-badge {
    padding: 6px 12px;
    font-size: 11px;
    border-radius: 16px;
  }

  .content-wrapper {
    grid-template-columns: 1fr;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .showcase-item {
    width: 100%;
    height: auto;
    min-height: 500px;
  }

  .product-card {
    width: 100%;
  }

  .product-card-image {
    width: 100%;
    height: 280px;
  }

  .filters-sidebar {
    position: fixed;
    top: 0;
    left: -100%;
    width: 80%;
    max-width: 320px;
    height: 100vh;
    background: #fff;
    z-index: 1000;
    transition: left 0.3s ease;
    padding: 20px;
    overflow-y: auto;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  }

  .filters-sidebar.mobile-open {
    left: 0;
  }

  .close-filters {
    display: block;
  }

  .mobile-filters-btn {
    display: flex;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }

  .product-item {
    padding: 16px;
  }

  .product-image {
    height: 220px;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .tab-item {
    padding: 12px;
    width: 140px;
    height: 80px;
    gap: 8px;
  }

  .tab-item img {
    width: 40px;
    height: 40px;
  }

  .tab-item span {
    font-size: 14px;
    max-width: 60px;
  }

  .product-badge {
    padding: 5px 10px;
    font-size: 10px;
    border-radius: 14px;
    top: 12px;
    right: 12px;
  }
}
</style>
