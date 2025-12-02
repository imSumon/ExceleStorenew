<template>
  <div class="checkout-page">
    <div class="checkout-container">
      <h1 class="page-title">Checkout</h1>

      <div class="checkout-content">
        <div class="checkout-form">
          <div class="form-section">
            <h2>Contact Information</h2>
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="formData.email" placeholder="you@example.com">
            </div>
            <div class="form-group">
              <label>Phone Number</label>
              <input type="tel" v-model="formData.phone" placeholder="+880 1XXX-XXXXXX">
            </div>
          </div>

          <div class="form-section">
            <h2>Shipping Address</h2>
            <div class="form-row">
              <div class="form-group">
                <label>First Name</label>
                <input type="text" v-model="formData.firstName" placeholder="First name">
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input type="text" v-model="formData.lastName" placeholder="Last name">
              </div>
            </div>
            <div class="form-group">
              <label>Address</label>
              <input type="text" v-model="formData.address" placeholder="Street address">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>City</label>
                <input type="text" v-model="formData.city" placeholder="City">
              </div>
              <div class="form-group">
                <label>Postal Code</label>
                <input type="text" v-model="formData.postalCode" placeholder="1200">
              </div>
            </div>
            <div class="form-group">
              <label>District</label>
              <select v-model="formData.district">
                <option value="">Select District</option>
                <option value="dhaka">Dhaka</option>
                <option value="chittagong">Chittagong</option>
                <option value="sylhet">Sylhet</option>
                <option value="rajshahi">Rajshahi</option>
                <option value="khulna">Khulna</option>
                <option value="barisal">Barisal</option>
                <option value="rangpur">Rangpur</option>
                <option value="mymensingh">Mymensingh</option>
              </select>
            </div>
          </div>

          <div class="form-section">
            <h2>Payment Method</h2>
            <div class="payment-methods">
              <label class="payment-option">
                <input type="radio" v-model="formData.paymentMethod" value="cod">
                <div class="payment-card">
                  <span class="payment-icon">💵</span>
                  <div>
                    <div class="payment-title">Cash on Delivery</div>
                    <div class="payment-desc">Pay when you receive</div>
                  </div>
                </div>
              </label>
              <label class="payment-option">
                <input type="radio" v-model="formData.paymentMethod" value="card">
                <div class="payment-card">
                  <span class="payment-icon">💳</span>
                  <div>
                    <div class="payment-title">Credit/Debit Card</div>
                    <div class="payment-desc">Secure payment</div>
                  </div>
                </div>
              </label>
              <label class="payment-option">
                <input type="radio" v-model="formData.paymentMethod" value="bkash">
                <div class="payment-card">
                  <span class="payment-icon">📱</span>
                  <div>
                    <div class="payment-title">bKash</div>
                    <div class="payment-desc">Mobile payment</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div v-if="formData.paymentMethod === 'card'" class="form-section">
            <h2>Card Details</h2>
            <div class="form-group">
              <label>Card Number</label>
              <input type="text" v-model="formData.cardNumber" placeholder="1234 5678 9012 3456">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Expiry Date</label>
                <input type="text" v-model="formData.expiryDate" placeholder="MM/YY">
              </div>
              <div class="form-group">
                <label>CVV</label>
                <input type="text" v-model="formData.cvv" placeholder="123">
              </div>
            </div>
          </div>

          <div v-if="formData.paymentMethod === 'bkash'" class="form-section">
            <h2>bKash Details</h2>
            <div class="form-group">
              <label>bKash Number</label>
              <input type="tel" v-model="formData.bkashNumber" placeholder="01XXX-XXXXXX">
            </div>
          </div>
        </div>

        <div class="order-summary-sidebar">
          <div class="summary-sticky">
            <h2>Order Summary</h2>
            <div class="summary-items">
              <div v-for="item in items" :key="item.id" class="summary-item">
                <img :src="item.image" :alt="item.name">
                <div class="summary-item-details">
                  <div class="summary-item-name">{{ item.name }}</div>
                  <div class="summary-item-specs">{{ item.storage }} • {{ item.ram }}</div>
                  <div class="summary-item-qty">Qty: {{ item.quantity }}</div>
                </div>
                <div class="summary-item-price">৳{{ (item.price * item.quantity).toLocaleString() }}</div>
              </div>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-totals">
              <div class="summary-row">
                <span>Subtotal</span>
                <span>৳{{ cartTotal.toLocaleString() }}</span>
              </div>
              <div class="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-row total">
                <span>Total</span>
                <span>৳{{ cartTotal.toLocaleString() }}</span>
              </div>
            </div>

            <button class="place-order-btn" @click="placeOrder" :disabled="!isFormValid">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../store/cartStore'

const router = useRouter()
const { items, cartTotal, clearCart } = useCart()

const formData = ref({
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  postalCode: '',
  district: '',
  paymentMethod: 'cod',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  bkashNumber: ''
})

const isFormValid = computed(() => {
  const base = formData.value.email &&
                formData.value.phone &&
                formData.value.firstName &&
                formData.value.lastName &&
                formData.value.address &&
                formData.value.city &&
                formData.value.district &&
                formData.value.paymentMethod

  if (formData.value.paymentMethod === 'card') {
    return base && formData.value.cardNumber && formData.value.expiryDate && formData.value.cvv
  }

  if (formData.value.paymentMethod === 'bkash') {
    return base && formData.value.bkashNumber
  }

  return base
})

const placeOrder = () => {
  if (!isFormValid.value) return

  alert('Order placed successfully! Thank you for your purchase.')
  clearCart()
  router.push('/')
}
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 120px 20px 40px;
}

.checkout-container {
  max-width: 1440px;
  margin: 0 auto;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 32px;
  color: #000;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 450px;
  gap: 32px;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.form-section {
  background: #fff;
  border-radius: 12px;
  padding: 32px;
}

.form-section h2 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #000;
}

.form-group {
  margin-bottom: 20px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #000;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #000;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.payment-option {
  cursor: pointer;
}

.payment-option input[type="radio"] {
  display: none;
}

.payment-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.payment-option input[type="radio"]:checked + .payment-card {
  border-color: #000;
  background: #f8f8f8;
}

.payment-card:hover {
  border-color: #666;
}

.payment-icon {
  font-size: 32px;
}

.payment-title {
  font-weight: 600;
  font-size: 16px;
  color: #000;
}

.payment-desc {
  font-size: 14px;
  color: #666;
}

.order-summary-sidebar {
  position: relative;
}

.summary-sticky {
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  position: sticky;
  top: 120px;
}

.summary-sticky h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #000;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  max-height: 400px;
  overflow-y: auto;
}

.summary-item {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 12px;
  align-items: center;
}

.summary-item img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  background: #f8f8f8;
  border-radius: 8px;
  padding: 8px;
}

.summary-item-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-item-name {
  font-size: 14px;
  font-weight: 600;
  color: #000;
}

.summary-item-specs {
  font-size: 12px;
  color: #666;
}

.summary-item-qty {
  font-size: 12px;
  color: #666;
}

.summary-item-price {
  font-size: 14px;
  font-weight: 600;
  color: #000;
}

.summary-divider {
  height: 1px;
  background: #eee;
  margin: 20px 0;
}

.summary-totals {
  margin-bottom: 24px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 16px;
}

.summary-row span:first-child {
  color: #666;
}

.summary-row span:last-child {
  font-weight: 600;
  color: #000;
}

.summary-row.total {
  font-size: 20px;
  font-weight: 700;
  margin-top: 12px;
}

.summary-row.total span {
  color: #000;
}

.place-order-btn {
  width: 100%;
  background: #000;
  color: #fff;
  border: none;
  padding: 16px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.place-order-btn:hover:not(:disabled) {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.place-order-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .summary-sticky {
    position: static;
  }
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-section {
    padding: 20px;
  }

  .summary-sticky {
    padding: 20px;
  }
}
</style>
