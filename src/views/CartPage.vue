<template>
  <div class="cart-page">
    <div class="cart-container">
      <h1 class="page-title">Shopping Cart</h1>

      <div v-if="items.length === 0" class="empty-cart">
        <div class="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add items to get started</p>
        <button class="continue-shopping" @click="$router.push('/')">Continue Shopping</button>
      </div>

      <div v-else class="cart-content">
        <div class="cart-left">
          <div class="cart-items">
            <div v-for="item in items" :key="item.id" class="cart-item">
              <img :src="item.image" :alt="item.name" class="item-image">
              <div class="item-info">
                <h3 class="item-name">{{ item.name }}</h3>
                <div class="item-specs">
                  <span>Storage: {{ item.storage }}</span>
                  <span>RAM: {{ item.ram }}</span>
                  <span>Color: <span class="color-dot" :style="{ backgroundColor: item.color }"></span></span>
                </div>
                <div class="item-price-row">
                  <div class="item-price">
                    <span class="current-price">৳{{ item.price.toLocaleString() }}</span>
                    <span class="original-price">৳{{ item.originalPrice.toLocaleString() }}</span>
                    <span v-if="item.discountPercent" class="discount-badge">{{ item.discountPercent.toFixed(0) }}% OFF</span>
                  </div>
                  <div class="badges-row">
                    <div v-if="item.fullCoverage" class="coverage-badge">
                      <span class="coverage-icon">🛡️</span>
                      <span>Full Coverage (+৳5,000)</span>
                      <button class="remove-coverage-btn" @click="removeCoverage(item.id)" title="Remove Full Coverage">✕</button>
                    </div>
                    <div v-if="selectedEMI" class="emi-badge">
                      <span class="emi-icon">💳</span>
                      <span>EMI Selected</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item-actions">
                <div class="quantity-control">
                  <button @click="updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity <= 1">-</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
                </div>
                <button class="remove-btn" @click="removeFromCart(item.id)">Remove</button>
              </div>
              <div v-if="appliedCoupon?.giftItem" class="free-gift-badge">Free Gift</div>
            </div>
          </div>

          <div class="special-note-section">
            <h3>Special Note</h3>
            <textarea
              v-model="specialNote"
              class="special-note-textarea"
              placeholder="Add delivery instructions or special requests (Optional)"
              rows="4"
              maxlength="500"
            ></textarea>
            <div class="character-count">{{ specialNote.length }}/500</div>
          </div>

          <div class="delivery-options-section">
            <h3>Delivery Options</h3>
            <div class="delivery-type-selector">
              <label class="delivery-option" :class="{ active: deliveryType === 'home' }">
                <input type="radio" value="home" v-model="deliveryType" name="delivery">
                <div class="option-content">
                  <span class="option-icon">🏠</span>
                  <div class="option-text">
                    <strong>Home Delivery</strong>
                    <small>Free delivery to your doorstep</small>
                  </div>
                </div>
              </label>

              <label class="delivery-option" :class="{ active: deliveryType === 'pickup' }">
                <input type="radio" value="pickup" v-model="deliveryType" name="delivery">
                <div class="option-content">
                  <span class="option-icon">📍</span>
                  <div class="option-text">
                    <strong>Pick-up Point</strong>
                    <small>Collect from our store</small>
                  </div>
                </div>
              </label>
            </div>

            <div v-if="deliveryType === 'pickup'" class="pickup-location-selector">
              <label>Select Pick-up Location:</label>
              <select v-model="selectedPickupPoint" class="pickup-dropdown">
                <option value="">Choose a location</option>
                <option value="dhaka-gulshan">Dhaka - Gulshan Store</option>
                <option value="dhaka-dhanmondi">Dhaka - Dhanmondi Store</option>
                <option value="dhaka-uttara">Dhaka - Uttara Store</option>
                <option value="chittagong-agrabad">Chittagong - Agrabad Store</option>
                <option value="sylhet-zindabazar">Sylhet - Zindabazar Store</option>
              </select>
              <div v-if="selectedPickupPoint" class="pickup-info">
                <p class="pickup-address">{{ getPickupAddress(selectedPickupPoint) }}</p>
                <p class="pickup-hours">⏰ Working Hours: 10:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div class="cart-right">
          <div class="coupon-section">
            <h3>Apply Coupon</h3>
            <div class="coupon-input-group">
              <input
                v-model="couponCode"
                type="text"
                placeholder="ENTER COUPON CODE"
                class="coupon-input"
                :disabled="!!appliedCoupon"
              >
              <button
                v-if="!appliedCoupon"
                @click="handleApplyCoupon"
                class="apply-coupon-btn"
                :disabled="!couponCode || applyingCoupon"
              >
                {{ applyingCoupon ? 'Applying...' : 'Apply' }}
              </button>
              <button
                v-else
                @click="handleRemoveCoupon"
                class="remove-coupon-btn"
              >
                Remove
              </button>
            </div>
            <div v-if="couponError" class="coupon-error">{{ couponError }}</div>
            <div v-if="appliedCoupon" class="coupon-success">
              <span class="success-icon">✓</span>
              <span>Coupon "{{ appliedCoupon.code }}" applied successfully!</span>
            </div>
          </div>

          <div class="cart-summary">
            <h2>Order Details</h2>

            <div class="summary-section">
              <div class="summary-row">
                <span>Subtotal ({{ cartCount }} items)</span>
                <span>৳{{ subtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</span>
              </div>

              <div v-if="productDiscounts > 0" class="summary-row discount">
                <span>Product Discounts</span>
                <span>-৳{{ productDiscounts.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</span>
              </div>

              <div v-if="couponDiscount > 0" class="summary-row discount">
                <span>Coupon Discount ({{ appliedCoupon?.code }})</span>
                <span>-৳{{ couponDiscount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</span>
              </div>

              <div v-if="totalDiscount > 0" class="summary-row total-savings">
                <span>Total Savings</span>
                <span>৳{{ totalDiscount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</span>
              </div>
            </div>

            <div class="summary-section">
              <div class="summary-row">
                <span>Tax (18%)</span>
                <span>৳{{ taxAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</span>
              </div>

              <div class="summary-row">
                <span>Shipping</span>
                <span class="free-badge">Free</span>
              </div>
            </div>

            <div v-if="appliedCoupon?.giftItem" class="gift-section">
              <div class="gift-icon">🎁</div>
              <div class="gift-text">
                <strong>Free Gift!</strong>
                <p>{{ appliedCoupon.giftItem }}</p>
              </div>
            </div>

            <div v-if="selectedEMI" class="emi-section">
              <div class="emi-header">
                <span class="emi-icon">💳</span>
                <strong>EMI Selected</strong>
              </div>
              <div class="emi-details">
                <p class="emi-plan-name">{{ selectedEMI.name }}</p>
                <p class="emi-monthly">
                  <strong>৳{{ emiMonthlyAmount?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</strong>/month
                </p>
                <p class="emi-info">
                  {{ selectedEMI.interestRate === 0 ? 'No Cost EMI' : `${selectedEMI.interestRate}% Interest` }}
                  • {{ selectedEMI.months }} Months
                </p>
                <p v-if="selectedEMI.processingFee > 0" class="emi-fee">
                  Processing Fee: ৳{{ selectedEMI.processingFee }}
                </p>
              </div>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-row total">
              <span>Total Amount</span>
              <span>৳{{ finalTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</span>
            </div>

            <button class="checkout-btn" @click="$router.push('/checkout')">
              Proceed to Checkout
            </button>
            <button class="continue-shopping-btn" @click="$router.push('/')">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '../store/cartStore'
import { verifyCoupon } from '../services/supabase'

const {
  items,
  removeFromCart,
  updateQuantity,
  updateFullCoverage,
  cartCount,
  subtotal,
  productDiscounts,
  couponDiscount,
  totalDiscount,
  taxAmount,
  finalTotal,
  selectedEMI,
  appliedCoupon,
  emiMonthlyAmount,
  applyCoupon,
  removeCoupon
} = useCart()

const couponCode = ref('')
const couponError = ref('')
const applyingCoupon = ref(false)
const deliveryType = ref('home')
const selectedPickupPoint = ref('')
const specialNote = ref('')

const pickupLocations = {
  'dhaka-gulshan': 'House 45, Road 11, Block E, Gulshan 1, Dhaka 1212',
  'dhaka-dhanmondi': '127/A, Dhanmondi Road 27, Dhaka 1209',
  'dhaka-uttara': 'House 12, Sector 7, Uttara, Dhaka 1230',
  'chittagong-agrabad': 'Agrabad C/A, 2nd Floor, Chittagong 4100',
  'sylhet-zindabazar': 'Zindabazar Point, East Zindabazar, Sylhet 3100'
}

const getPickupAddress = (locationId: string) => {
  return pickupLocations[locationId as keyof typeof pickupLocations] || ''
}

const removeCoverage = (itemId: string) => {
  updateFullCoverage(itemId, false)
}

const handleApplyCoupon = async () => {
  if (!couponCode.value.trim()) {
    couponError.value = 'Please enter a coupon code'
    return
  }

  applyingCoupon.value = true
  couponError.value = ''

  try {
    const coupon = await verifyCoupon(couponCode.value.trim())

    if (!coupon) {
      couponError.value = 'Invalid or expired coupon code'
      applyingCoupon.value = false
      return
    }

    if (subtotal.value < coupon.min_order_amount) {
      couponError.value = `Minimum order amount is ৳${coupon.min_order_amount.toLocaleString()}`
      applyingCoupon.value = false
      return
    }

    applyCoupon({
      id: coupon.id,
      code: coupon.code,
      discountType: coupon.discount_type,
      discountValue: coupon.discount_value,
      minOrderAmount: coupon.min_order_amount,
      maxDiscount: coupon.max_discount,
      giftItem: coupon.gift_item,
      validUntil: coupon.valid_until
    })

    couponCode.value = ''
  } catch (error) {
    console.error('Error applying coupon:', error)
    couponError.value = 'Failed to apply coupon. Please try again.'
  } finally {
    applyingCoupon.value = false
  }
}

const handleRemoveCoupon = () => {
  removeCoupon()
  couponCode.value = ''
  couponError.value = ''
}
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 120px 20px 40px;
}

.cart-container {
  max-width: 1440px;
  margin: 0 auto;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 32px;
  color: #000;
}

.empty-cart {
  text-align: center;
  padding: 80px 20px;
  background: #fff;
  border-radius: 12px;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 24px;
}

.empty-cart h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #000;
}

.empty-cart p {
  color: #666;
  margin-bottom: 32px;
}

.continue-shopping {
  background: #000;
  color: #fff;
  border: none;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.continue-shopping:hover {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
}

.cart-left {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-right {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 120px;
  height: fit-content;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 20px;
  align-items: start;
  transition: all 0.3s ease;
  position: relative;
}

.cart-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  background: #f8f8f8;
  border-radius: 8px;
  padding: 12px;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-name {
  font-size: 17px;
  font-weight: 600;
  color: #000;
  margin: 0;
}

.item-specs {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #666;
  align-items: center;
}

.color-dot {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #ddd;
  vertical-align: middle;
}

.item-price-row {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 4px;
}

.item-price {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.current-price {
  font-size: 19px;
  font-weight: 700;
  color: #000;
}

.original-price {
  font-size: 15px;
  color: #999;
  text-decoration: line-through;
}

.discount-badge {
  background: #4caf50;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.badges-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.coverage-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #e8f5e9;
  color: #2e7d32;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  position: relative;
}

.coverage-icon {
  font-size: 16px;
}

.remove-coverage-btn {
  background: transparent;
  border: none;
  color: #2e7d32;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  padding: 0 4px;
  margin-left: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  opacity: 0.7;
}

.remove-coverage-btn:hover {
  opacity: 1;
  color: #c62828;
  transform: scale(1.2);
}

.emi-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #e3f2fd;
  color: #1565c0;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
}

.emi-icon {
  font-size: 16px;
}

.free-gift-badge {
  position: absolute;
  top: 24px;
  right: 24px;
  background: linear-gradient(135deg, #fff4e6 0%, #ffe4b5 100%);
  color: #e65100;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
  border: 2px solid #ff9800;
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-end;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8f8f8;
  border-radius: 50px;
  padding: 6px 14px;
}

.quantity-control button {
  background: #fff;
  border: 1px solid #ddd;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quantity-control button:hover:not(:disabled) {
  background: #000;
  color: #fff;
  border-color: #000;
}

.quantity-control button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.quantity-control span {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
}

.remove-btn {
  background: transparent;
  border: none;
  color: #ff4444;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  color: #cc0000;
  text-decoration: underline;
}

.coupon-section {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
}

.coupon-section h3 {
  font-size: 17px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #000;
}

.coupon-input-group {
  display: flex;
  gap: 8px;
}

.coupon-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  transition: all 0.3s ease;
  color: #666;
}

.coupon-input::placeholder {
  color: #bbb;
}

.coupon-input:focus {
  outline: none;
  border-color: #0066ff;
}

.coupon-input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.apply-coupon-btn {
  padding: 12px 24px;
  background: #6c9aff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.apply-coupon-btn:hover:not(:disabled) {
  background: #5a89f0;
}

.apply-coupon-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.remove-coupon-btn {
  padding: 12px 24px;
  background: #ff4444;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-coupon-btn:hover {
  background: #cc0000;
}

.coupon-error {
  margin-top: 12px;
  padding: 12px;
  background: #fff3cd;
  color: #856404;
  border-radius: 8px;
  font-size: 13px;
  border-left: 4px solid #ffc107;
}

.coupon-success {
  margin-top: 12px;
  padding: 12px;
  background: #d4edda;
  color: #155724;
  border-radius: 8px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-left: 4px solid #4caf50;
}

.success-icon {
  font-size: 18px;
  font-weight: 700;
}

.delivery-options-section {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
}

.delivery-options-section h3 {
  font-size: 17px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #000;
}

.delivery-type-selector {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.delivery-option {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
}

.delivery-option:hover {
  border-color: #0066ff;
  background: #f8f9ff;
}

.delivery-option.active {
  border-color: #0066ff;
  background: #e6f2ff;
  box-shadow: 0 2px 8px rgba(0, 102, 255, 0.15);
}

.delivery-option input[type="radio"] {
  display: none;
}

.option-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.option-icon {
  font-size: 28px;
}

.option-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.option-text strong {
  font-size: 16px;
  color: #000;
}

.option-text small {
  font-size: 13px;
  color: #666;
}

.pickup-location-selector {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
}

.pickup-location-selector label {
  display: block;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;
}

.pickup-dropdown {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pickup-dropdown:hover {
  border-color: #0066ff;
}

.pickup-dropdown:focus {
  outline: none;
  border-color: #0066ff;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
}

.pickup-info {
  margin-top: 12px;
  padding: 12px;
  background: #f8f9ff;
  border-radius: 8px;
  border-left: 4px solid #0066ff;
}

.pickup-address {
  font-size: 14px;
  color: #333;
  margin: 0 0 8px 0;
  font-weight: 500;
}

.pickup-hours {
  font-size: 13px;
  color: #666;
  margin: 0;
}

.special-note-section {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
}

.special-note-section h3 {
  font-size: 17px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #000;
}

.special-note-textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.special-note-textarea:focus {
  outline: none;
  border-color: #0066ff;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
}

.special-note-textarea::placeholder {
  color: #999;
}

.character-count {
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 6px;
}

.cart-summary {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
}

.cart-summary h2 {
  font-size: 19px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #000;
}

.summary-section {
  margin-bottom: 16px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
}

.summary-row span:first-child {
  color: #666;
}

.summary-row span:last-child {
  font-weight: 600;
  color: #000;
}

.summary-row.discount span:last-child {
  color: #4caf50;
}

.summary-row.total-savings {
  background: #e8f5e9;
  padding: 12px;
  border-radius: 8px;
  margin-top: 12px;
  font-weight: 600;
}

.summary-row.total-savings span {
  color: #2e7d32;
}

.free-badge {
  color: #4caf50 !important;
  font-weight: 700 !important;
}

.gift-section {
  background: linear-gradient(135deg, #fff4e6 0%, #ffe4b5 100%);
  padding: 16px;
  border-radius: 12px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin: 16px 0;
  border-left: 4px solid #ff9800;
}

.gift-icon {
  font-size: 32px;
}

.gift-text strong {
  font-size: 16px;
  color: #e65100;
  display: block;
  margin-bottom: 4px;
}

.gift-text p {
  margin: 0;
  font-size: 14px;
  color: #5d4037;
}

.emi-section {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  padding: 16px;
  border-radius: 12px;
  margin: 16px 0;
  border-left: 4px solid #2196f3;
}

.emi-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.emi-icon {
  font-size: 24px;
}

.emi-header strong {
  font-size: 16px;
  color: #1565c0;
}

.emi-details {
  padding-left: 32px;
}

.emi-plan-name {
  font-size: 15px;
  font-weight: 600;
  color: #0d47a1;
  margin: 0 0 8px 0;
}

.emi-monthly {
  font-size: 14px;
  color: #1565c0;
  margin: 0 0 4px 0;
}

.emi-monthly strong {
  font-size: 20px;
}

.emi-info {
  font-size: 13px;
  color: #424242;
  margin: 0 0 4px 0;
}

.emi-fee {
  font-size: 12px;
  color: #757575;
  margin: 0;
}

.summary-divider {
  height: 1px;
  background: #eee;
  margin: 24px 0;
}

.summary-row.total {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 24px;
  padding-top: 8px;
}

.summary-row.total span {
  color: #000;
}

.checkout-btn {
  width: 100%;
  background: #000;
  color: #fff;
  border: none;
  padding: 14px;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 12px;
}

.checkout-btn:hover {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.continue-shopping-btn {
  width: 100%;
  background: transparent;
  color: #000;
  border: 2px solid #000;
  padding: 14px;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.continue-shopping-btn:hover {
  background: #000;
  color: #fff;
}

@media (max-width: 1024px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-right {
    position: static;
  }
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 16px;
    padding: 20px;
  }

  .item-image {
    width: 80px;
    height: 80px;
  }

  .item-actions {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .item-specs {
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
  }

  .free-gift-badge {
    position: static;
    grid-column: 1 / -1;
    width: fit-content;
    margin-top: 8px;
  }
}
</style>
