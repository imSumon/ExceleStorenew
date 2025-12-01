<template>
  <div v-if="visible" class="product-details-overlay" @click.self="$emit('close')">
    <div class="product-details-container">
      <button class="close-btn" @click="$emit('close')">&times;</button>

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
            <div class="thumbnail-list">
              <img
                v-for="(img, idx) in productImages"
                :key="idx"
                :src="img"
                :class="{ active: selectedImage === img }"
                @click="selectedImage = img"
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
          <div class="sticky-sidebar">
            <div class="delivery-badge">
              <img src="/images/icons/image.png" alt="Free Delivery">
              <span>FREE DELIVERY</span>
            </div>

            <h2 class="sidebar-title">{{ product.name }}</h2>

            <div class="pricing-section">
              <div class="price-row">
                <span class="label">Price (Pcs) :</span>
                <div class="prices">
                  <span class="old-price">Tk.{{ product.originalPrice }}</span>
                  <span class="current-price">Tk.{{ product.price }}</span>
                </div>
              </div>
            </div>

            <div class="options-section">
              <div class="option-group">
                <label>Storage:</label>
                <div class="storage-buttons">
                  <button
                    v-for="storage in storageOptions"
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
                <div class="storage-buttons">
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
                  0% EMI Price: Tk. {{ product.price }}<br>
                  Up to 6 Months***
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
              <div>Sold By <strong>excel</strong></div>
              <div class="contact">+8809610990120</div>
            </div>

            <div class="credit-card-emi">
              <button class="accordion-btn">Credit Card EMI +</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Product {
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  colors: string[];
  storage?: string[];
  cashback?: string;
}

const props = defineProps<{
  product: Product;
  visible: boolean;
}>();

defineEmits<{
  close: [];
}>();

const selectedImage = ref(props.product.image);
const productImages = computed(() => [
  props.product.image,
  props.product.image,
  props.product.image
]);

const activeTab = ref('Features');
const tabs = ['Features', 'Specifications', 'Video'];

const storageOptions = ref(['256GB', '512GB', '1TB']);
const selectedStorage = ref('256GB');

const ramOptions = ref(['12GB', '16GB']);
const selectedRam = ref('12GB');

const selectedColor = ref(props.product.colors[0]);
const quantity = ref(1);

const paymentType = ref('discount');

const discountPrice = computed(() => {
  const price = parseInt(props.product.price.replace(/,/g, ''));
  return (price - 7000).toLocaleString();
});

const emiAmount = computed(() => {
  const price = parseInt(props.product.price.replace(/,/g, ''));
  return Math.floor(price / 6).toLocaleString();
});

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};
</script>

<style scoped>
.product-details-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  overflow-y: auto;
  padding: 20px;
}

.product-details-container {
  max-width: 1440px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #000;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #333;
  transform: scale(1.1);
}

.details-content {
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 40px;
  padding: 80px 40px 40px;
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
  justify-content: center;
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
  transition: all 0.2s;
}

.thumbnail-list img:hover,
.thumbnail-list img.active {
  border-color: #000;
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
  position: sticky;
  top: 20px;
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
  flex-wrap: wrap;
}

.storage-buttons button {
  padding: 8px 20px;
  border: 2px solid #ddd;
  background: #fff;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.storage-buttons button:hover {
  border-color: #000;
}

.storage-buttons button.active {
  background: #000;
  color: #fff;
  border-color: #000;
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
  transition: all 0.2s;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  font-size: 14px;
}

.contact {
  color: #0066ff;
  font-weight: 600;
}

.credit-card-emi {
  background: #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.accordion-btn {
  width: 100%;
  padding: 16px;
  background: transparent;
  border: none;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
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
  .details-content {
    padding: 60px 20px 20px;
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
