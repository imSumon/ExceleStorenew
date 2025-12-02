<template>
  <div class="product-details-page">
    <div class="product-details-container">
      <div class="details-content">
        <div class="details-left">
          <div class="sticky-top-bar">
            <h1 class="product-title">{{ product.name }}</h1>
            <div class="cashback-banner">Cashback Tk. {{ product.cashback || '7,000' }}</div>
          </div>

          <div class="product-gallery">
            <div class="main-image">
              <img :src="selectedImage" :alt="product.name">
            </div>
            <div
              class="thumbnail-list"
              ref="thumbnailContainer"
            >
              <img
                v-for="(img, idx) in productImages"
                :key="idx"
                :src="img"
                :class="{ active: selectedImage === img }"
                @click="handleImageClick(img)"
                :alt="`${product.name} view ${idx + 1}`"
              >
            </div>
          </div>

          <div class="details-tabs">
            <button
              v-for="tab in tabs"
              :key="tab"
              :class="{ active: activeTab === tab }"
              @click="activeTab = tab"
            >
              {{ tab }}
            </button>
          </div>

          <div class="tab-content">
            <div v-if="activeTab === 'Features'" class="features-list">
              <div class="feature-item">
                <span class="feature-icon">⭐</span>
                <span>Galaxy AI is here</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📱</span>
                <span>Simple. Impactful</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">⚡</span>
                <span>The most powerful processor</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🎨</span>
                <span>All new One UI 7, built for AI</span>
              </div>
            </div>
            <div v-if="activeTab === 'Specifications'" class="specs-content">
              <p>Detailed specifications will be displayed here.</p>
            </div>
            <div v-if="activeTab === 'Video'" class="video-content">
              <p>Product video will be displayed here.</p>
            </div>
          </div>
        </div>

        <div class="details-right">
          <div
            class="sticky-sidebar"
            ref="sidebarContainer"
          >
            <div class="delivery-badge">
              <img src="/images/icons/image.png" alt="Free Delivery">
              <span>FREE DELIVERY</span>
            </div>

            <h2 class="sidebar-title">{{ product.name }}</h2>

            <div class="pricing-section">
              <div class="price-row">
                <span class="label">Price (Pcs) :</span>
                <div class="prices">
                  <span class="old-price">Tk.{{ product.mrp }}</span>
                  <span class="current-price">Tk.{{ product.priceAmount }}</span>
                </div>
              </div>
            </div>

            <div class="options-section">
              <div class="option-group">
                <label>Storage:</label>
                <div
                  class="storage-buttons"
                  ref="storageContainer"
                >
                  <button
                    v-for="storage in product.storage"
                    :key="storage"
                    :class="{ active: selectedStorage === storage }"
                    @click="selectedStorage = storage"
                  >
                    {{ storage }}
                  </button>
                </div>
              </div>

              <div class="option-group">
                <label>RAM:</label>
                <div
                  class="storage-buttons"
                  ref="ramContainer"
                >
                  <button
                    v-for="ram in ramOptions"
                    :key="ram"
                    :class="{ active: selectedRam === ram }"
                    @click="selectedRam = ram"
                  >
                    {{ ram }}
                  </button>
                </div>
              </div>

              <div class="option-group">
                <label>Color:</label>
                <div class="color-buttons">
                  <button
                    v-for="color in product.colors"
                    :key="color"
                    :class="{ active: selectedColor === color }"
                    :style="{ backgroundColor: color }"
                    @click="selectedColor = color"
                  ></button>
                </div>
              </div>

              <div class="option-group">
                <label>Quantity:</label>
                <div class="quantity-selector">
                  <button @click="decreaseQuantity">-</button>
                  <input type="number" v-model.number="quantity" min="1">
                  <button @click="increaseQuantity">+</button>
                </div>
              </div>
            </div>

            <div class="warranty-info">
              <strong>Warranty:</strong> 1 Year Official Warranty from Samsung Care
            </div>

            <div class="payment-options">
              <div class="payment-tab" :class="{ active: paymentType === 'discount' }" @click="paymentType = 'discount'">
                <input type="radio" :checked="paymentType === 'discount'">
                <span>Discount</span>
              </div>
              <div class="payment-tab" :class="{ active: paymentType === 'emi' }" @click="paymentType = 'emi'">
                <input type="radio" :checked="paymentType === 'emi'">
                <span>EMI</span>
              </div>
              <div class="payment-tab" :class="{ active: paymentType === 'gift' }" @click="paymentType = 'gift'">
                <input type="radio" :checked="paymentType === 'gift'">
                <span>Gift</span>
              </div>
            </div>

            <div class="payment-details">
              <div v-if="paymentType === 'discount'" class="discount-details">
                <div class="discount-price">Tk. {{ discountPrice }}</div>
                <div class="discount-text">
                  <strong>Cash Discount Price</strong><br>
                  <span>Online / Cash Payment</span>
                </div>
              </div>
              <div v-if="paymentType === 'emi'" class="emi-details">
                <div class="emi-amount">
                  <span>Start From</span>
                  <strong>{{ emiAmount }}/month</strong>
                </div>
                <div class="emi-text">
                  0% EMI Price: Tk. {{ product.priceAmount }}<br>
                  Up to 6 Months***
                </div>
              </div>
            </div>

            <div v-show="paymentType === 'emi'" class="credit-card-emi">
              <button class="emi-calculator-btn" @click="emiAccordionOpen = !emiAccordionOpen">
                <span class="btn-icon">🏦</span>
                <span class="btn-text">{{ emiAccordionOpen ? 'Close EMI Calculator' : 'Calculate Your Bank EMI' }}</span>
                <span class="btn-arrow">{{ emiAccordionOpen ? '▲' : '▼' }}</span>
              </button>
              <div v-if="emiAccordionOpen" class="accordion-content">
                <div class="bank-selection">
                  <label>Select Bank</label>
                  <select v-model="selectedBank" class="bank-dropdown">
                    <option value="">Select your bank</option>
                    <option value="brac">BRAC Bank</option>
                    <option value="dbbl">Dutch-Bangla Bank</option>
                    <option value="city">City Bank</option>
                    <option value="eastern">Eastern Bank</option>
                    <option value="scb">Standard Chartered</option>
                  </select>
                </div>
                <div class="tenure-selection">
                  <label>Tenure:</label>
                  <select v-model="selectedTenure" class="tenure-dropdown">
                    <option value="">Select Tenure</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                    <option value="18">18 Months</option>
                    <option value="24">24 Months</option>
                  </select>
                </div>
                <div v-if="selectedBank && selectedTenure" class="emi-calculation">
                  <div class="emi-total">Total: ৳ {{ emiTotal }}</div>
                  <div class="emi-monthly">Monthly: ৳ {{ emiMonthly }} ({{ selectedTenure }} Month{{ parseInt(selectedTenure) > 1 ? 's' : '' }})</div>
                </div>
              </div>
            </div>


            <div class="care-options">
              <div class="care-label">We Care:</div>
              <div class="care-item">
                <input type="checkbox" id="screen-replacement">
                <label for="screen-replacement">1 Year screen replacement (Free)</label>
              </div>
              <div class="care-item">
                <input type="checkbox" id="full-coverage">
                <label for="full-coverage">1 Year Full Coverage (TK. 5000)</label>
              </div>
              <div class="care-note">
                Full Mobile protection Coverage including theft/loss.
              </div>
            </div>

            <button class="add-to-cart-btn">ADD TO CART</button>

            <div class="seller-info">
              <div class="seller-details">
                <img src="/images/icons/image copy copy.png" alt="Excel Telecom" class="seller-logo">
                <div class="seller-text">
                  <div>Sold By <strong>excel</strong></div>
                  <div class="contact">+8809610990120</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const product = ref({
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
  cashback: '7000',
  range: 'Galaxy A',
  storageCapacity: ['64GB'],
  displaySize: '6.3-6.5"',
  features: ['Fast Charging']
})

const selectedImage = ref(product.value.image)
const productImages = computed(() => [
  product.value.image,
  product.value.image,
  product.value.image
])

const activeTab = ref('Features')
const tabs = ['Features', 'Specifications', 'Video']

const selectedStorage = ref(product.value.storage[0])
const ramOptions = ref(['4GB', '6GB', '8GB'])
const selectedRam = ref('4GB')
const selectedColor = ref(product.value.colors[0])
const quantity = ref(1)
const paymentType = ref('discount')
const emiAccordionOpen = ref(false)
const selectedBank = ref('')
const selectedTenure = ref('')

const thumbnailContainer = ref<HTMLElement | null>(null)
const storageContainer = ref<HTMLElement | null>(null)
const ramContainer = ref<HTMLElement | null>(null)


const discountPrice = computed(() => {
  const price = parseInt(product.value.priceAmount.replace(/[^0-9]/g, ''))
  return (price - 7000).toLocaleString()
})

const emiAmount = computed(() => {
  const price = parseInt(product.value.priceAmount.replace(/[^0-9]/g, ''))
  return Math.floor(price / 6).toLocaleString()
})

const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const emiTotal = computed(() => {
  const price = parseInt(product.value.priceAmount.replace(/[^0-9]/g, ''))
  return price.toLocaleString()
})

const emiMonthly = computed(() => {
  if (!selectedTenure.value) return '0.00'
  const price = parseInt(product.value.priceAmount.replace(/[^0-9]/g, ''))
  return Math.ceil(price / parseInt(selectedTenure.value)).toLocaleString()
})


const handleImageClick = (img: string) => {
  selectedImage.value = img
}

watch(paymentType, (newValue) => {
  if (newValue === 'emi') {
    emiAccordionOpen.value = true
  } else {
    emiAccordionOpen.value = false
  }
})
</script>

<style scoped>
.product-details-page {
  min-height: 100vh;
  background: #fff;
  padding: 120px 20px 20px;
}

.product-details-container {
  max-width: 1440px;
  margin: 0 auto;
  background: #fff;
}

.details-content {
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 40px;
  padding: 40px 0;
}

.details-left {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.sticky-top-bar {
  background: #000;
  color: #fff;
  padding: 24px 32px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.cashback-banner {
  background: #fff;
  color: #000;
  padding: 8px 24px;
  border-radius: 24px;
  font-weight: 600;
  font-size: 16px;
}

.product-gallery {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-image {
  width: 100%;
  height: 500px;
  background: #f8f8f8;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.main-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.thumbnail-list {
  display: flex;
  gap: 12px;
  justify-content: flex-start;
  overflow-x: auto;
  padding: 12px 0;
  scrollbar-width: thin;
  scrollbar-color: #ddd #f5f5f5;
}

.thumbnail-list::-webkit-scrollbar {
  height: 8px;
}

.thumbnail-list::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 4px;
}

.thumbnail-list::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 4px;
}

.thumbnail-list::-webkit-scrollbar-thumb:hover {
  background: #bbb;
}


.thumbnail-list img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  background: #f8f8f8;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  flex-shrink: 0;
  pointer-events: auto;
}

.thumbnail-list img:hover {
  border-color: #0066ff;
  transform: scale(1.2) rotate(5deg) translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 102, 255, 0.3);
  z-index: 10;
  position: relative;
}

.thumbnail-list img.active {
  border-color: #000;
  transform: scale(1.05);
}

.details-tabs {
  display: flex;
  gap: 0;
  border-bottom: 2px solid #e0e0e0;
}

.details-tabs button {
  padding: 16px 32px;
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s;
}

.details-tabs button:hover {
  background: #f8f8f8;
}

.details-tabs button.active {
  border-bottom-color: #000;
}

.tab-content {
  padding: 32px 0;
  min-height: 300px;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 16px;
  padding: 16px;
  background: #f8f8f8;
  border-radius: 8px;
}

.feature-icon {
  font-size: 24px;
}

.specs-content,
.video-content {
  font-size: 16px;
  color: #666;
}

.details-right {
  position: relative;
}

.sticky-sidebar {
  position: relative;
  background: #f8f8f8;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.delivery-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  padding: 16px;
  border-radius: 8px;
}

.delivery-badge img {
  width: 48px;
  height: 48px;
}

.delivery-badge span {
  font-weight: 700;
  color: #ff6600;
}

.sidebar-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.pricing-section {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.label {
  font-size: 14px;
  color: #666;
}

.prices {
  display: flex;
  align-items: center;
  gap: 12px;
}

.old-price {
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
}

.current-price {
  font-size: 24px;
  font-weight: 700;
  color: #0066ff;
}

.options-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option-group label {
  font-weight: 600;
  font-size: 14px;
}

.storage-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 8px 0;
  scrollbar-width: thin;
  scrollbar-color: #ddd #f5f5f5;
}

.storage-buttons::-webkit-scrollbar {
  height: 6px;
}

.storage-buttons::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 3px;
}

.storage-buttons::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 3px;
}

.storage-buttons::-webkit-scrollbar-thumb:hover {
  background: #bbb;
}


.storage-buttons button {
  padding: 8px 20px;
  border: 2px solid #ddd;
  background: #fff;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  white-space: nowrap;
  pointer-events: auto;
}

.storage-buttons button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  transition: left 0.5s ease;
}

.storage-buttons button:hover {
  border-color: #000;
  transform: translateX(8px);
  box-shadow: -4px 4px 12px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
}

.storage-buttons button:hover::before {
  left: 100%;
}

.storage-buttons button.active {
  background: #000;
  color: #fff;
  border-color: #000;
  border-radius: 50px;
}

.color-buttons {
  display: flex;
  gap: 12px;
}

.color-buttons button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #ddd;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.color-buttons button:hover {
  transform: translateX(6px) scale(1.15);
  box-shadow: -3px 3px 10px rgba(0, 0, 0, 0.2);
  border-color: #000;
}

.color-buttons button.active {
  border-color: #000;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #000;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 12px;
}

.quantity-selector button {
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
}

.quantity-selector input {
  width: 60px;
  height: 36px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
}

.warranty-info {
  font-size: 13px;
  padding: 12px;
  background: #fff;
  border-radius: 8px;
}

.payment-options {
  display: flex;
  gap: 8px;
}

.payment-tab {
  flex: 1;
  padding: 12px;
  background: #fff;
  border: 2px solid #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.payment-tab.active {
  background: #fff4e6;
  border-color: #ff9800;
}

.payment-tab input {
  cursor: pointer;
}

.payment-details {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  min-height: 80px;
}

.discount-details {
  display: flex;
  gap: 16px;
  align-items: center;
}

.discount-price {
  font-size: 32px;
  font-weight: 700;
  color: #ff6600;
}

.discount-text {
  font-size: 14px;
}

.emi-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.emi-amount {
  display: flex;
  flex-direction: column;
}

.emi-amount span {
  font-size: 12px;
  color: #666;
}

.emi-amount strong {
  font-size: 20px;
  color: #000;
}

.emi-text {
  font-size: 12px;
  color: #666;
  text-align: right;
}

.care-options {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
}

.care-label {
  font-weight: 600;
  margin-bottom: 12px;
  color: #0066ff;
}

.care-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.care-item input {
  cursor: pointer;
}

.care-item label {
  font-size: 13px;
  cursor: pointer;
}

.care-note {
  font-size: 11px;
  color: #666;
  margin-top: 8px;
  font-style: italic;
}

.add-to-cart-btn {
  width: 100%;
  padding: 16px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.add-to-cart-btn:hover {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.seller-info {
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 20px;
}

.seller-details {
  display: flex;
  align-items: center;
  gap: 16px;
}

.seller-logo {
  width: 120px;
  height: auto;
  object-fit: contain;
}

.seller-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.contact {
  color: #0066ff;
  font-weight: 600;
}

.credit-card-emi {
  background: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.credit-card-emi:hover {
  border-color: #0066ff;
  box-shadow: 0 4px 12px rgba(0, 102, 255, 0.1);
}

.accordion-btn {
  width: 100%;
  padding: 18px 20px;
  background: transparent;
  border: none;
  text-align: left;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  position: relative;
}

.accordion-btn::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #0066ff, #00bfff);
  transition: width 0.3s ease;
}

.accordion-btn:hover {
  background: rgba(0, 102, 255, 0.08);
  color: #0066ff;
}

.accordion-btn:hover::before {
  width: 100%;
}

.emi-calculator-btn {
  width: 100%;
  padding: 18px 24px;
  background: linear-gradient(135deg, #0066ff 0%, #0052cc 100%);
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  color: #fff;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
  margin-top: 16px;
}

.emi-calculator-btn .btn-icon {
  font-size: 24px;
}

.emi-calculator-btn .btn-text {
  flex: 1;
  text-align: left;
}

.emi-calculator-btn .btn-arrow {
  font-size: 18px;
}

.emi-calculator-btn:hover {
  background: linear-gradient(135deg, #0052cc 0%, #003d99 100%);
  box-shadow: 0 6px 20px rgba(0, 102, 255, 0.4);
  transform: translateY(-2px);
}

.emi-calculator-btn:active {
  transform: translateY(0);
}

.accordion-content {
  padding: 24px;
  background: #fff;
  border-top: 2px solid #e0e0e0;
  animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    max-height: 500px;
    transform: translateY(0);
  }
}

.bank-selection,
.tenure-selection {
  margin-bottom: 16px;
}

.bank-selection label,
.tenure-selection label {
  display: block;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 8px;
  color: #333;
}

.bank-dropdown,
.tenure-dropdown {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  background: #fff;
  transition: all 0.3s ease;
  font-weight: 500;
}

.bank-dropdown:hover,
.tenure-dropdown:hover {
  border-color: #0066ff;
  background: rgba(0, 102, 255, 0.02);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 102, 255, 0.1);
}

.bank-dropdown:focus,
.tenure-dropdown:focus {
  outline: none;
  border-color: #0066ff;
  box-shadow: 0 0 0 4px rgba(0, 102, 255, 0.15);
  transform: translateY(-2px);
}

.emi-calculation {
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #f0f7ff 0%, #e6f2ff 100%);
  border-radius: 12px;
  border-left: 5px solid #0066ff;
  animation: fadeIn 0.4s ease-out;
  box-shadow: 0 2px 8px rgba(0, 102, 255, 0.08);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.emi-total {
  font-size: 20px;
  font-weight: 800;
  color: #0066ff;
  margin-bottom: 10px;
  letter-spacing: -0.5px;
}

.emi-monthly {
  font-size: 15px;
  color: #333;
  font-weight: 600;
  line-height: 1.5;
}

.credit-card-emi-static {
  margin: 20px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.emi-header {
  background: #5a5a5a;
  color: #fff;
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 15px;
}

.toggle-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.toggle-btn:hover {
  transform: scale(1.1);
}

.emi-content {
  padding: 20px;
  background: #f5f5f5;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.form-select {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.form-select:hover {
  border-color: #999;
}

.form-select:focus {
  outline: none;
  border-color: #0066ff;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
}

.emi-result {
  margin-top: 20px;
  padding: 16px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
}

.result-row:first-child {
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
  margin-bottom: 8px;
}

.result-row span {
  color: #666;
}

.result-row strong {
  color: #000;
  font-weight: 700;
  font-size: 15px;
}

@media (max-width: 1024px) {
  .details-content {
    grid-template-columns: 1fr;
  }

  .sticky-sidebar {
    position: relative;
    top: 0;
  }
}

@media (max-width: 768px) {
  .product-details-page {
    padding: 100px 10px 10px;
  }

  .sticky-top-bar {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .main-image {
    height: 300px;
  }
}
</style>
