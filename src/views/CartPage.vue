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
        <div class="cart-items">
          <div v-for="item in items" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.name" class="item-image">
            <div class="item-details">
              <h3 class="item-name">{{ item.name }}</h3>
              <div class="item-specs">
                <span>Storage: {{ item.storage }}</span>
                <span>RAM: {{ item.ram }}</span>
                <span>Color: <span class="color-dot" :style="{ backgroundColor: item.color }"></span></span>
              </div>
              <div class="item-price">
                <span class="current-price">৳{{ item.price.toLocaleString() }}</span>
                <span class="original-price">৳{{ item.originalPrice.toLocaleString() }}</span>
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
          </div>
        </div>

        <div class="cart-summary">
          <h2>Order Summary</h2>
          <div class="summary-row">
            <span>Subtotal ({{ cartCount }} items)</span>
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
          <button class="checkout-btn" @click="$router.push('/checkout')">Proceed to Checkout</button>
          <button class="continue-shopping-btn" @click="$router.push('/')">Continue Shopping</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '../store/cartStore'

const { items, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()
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
  grid-template-columns: 1fr 400px;
  gap: 32px;
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
  grid-template-columns: 120px 1fr auto;
  gap: 24px;
  align-items: center;
}

.item-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
  background: #f8f8f8;
  border-radius: 8px;
  padding: 12px;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-name {
  font-size: 18px;
  font-weight: 600;
  color: #000;
  margin: 0;
}

.item-specs {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #666;
  align-items: center;
}

.color-dot {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #ddd;
  vertical-align: middle;
}

.item-price {
  display: flex;
  gap: 12px;
  align-items: center;
}

.current-price {
  font-size: 20px;
  font-weight: 700;
  color: #000;
}

.original-price {
  font-size: 16px;
  color: #999;
  text-decoration: line-through;
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8f8f8;
  border-radius: 50px;
  padding: 8px 16px;
}

.quantity-control button {
  background: #fff;
  border: 1px solid #ddd;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 18px;
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
  min-width: 32px;
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

.cart-summary {
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  height: fit-content;
  position: sticky;
  top: 120px;
}

.cart-summary h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #000;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 16px;
}

.summary-row span:first-child {
  color: #666;
}

.summary-row span:last-child {
  font-weight: 600;
  color: #000;
}

.summary-divider {
  height: 1px;
  background: #eee;
  margin: 24px 0;
}

.summary-row.total {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
}

.summary-row.total span {
  color: #000;
}

.checkout-btn {
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
  padding: 16px;
  border-radius: 50px;
  font-size: 16px;
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

  .cart-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 16px;
  }

  .item-image {
    width: 80px;
    height: 80px;
  }

  .item-actions {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: space-between;
  }

  .item-specs {
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
  }
}
</style>
