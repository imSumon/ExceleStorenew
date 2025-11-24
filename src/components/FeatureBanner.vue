<template>
  <section class="feature-banner" :style="{ backgroundImage: `url(${image})` }">
    <div class="feature-overlay" :style="{ background: bgColor }"></div>
    <div class="feature-container">
      <div class="feature-content">
        <div class="feature-text">
          <h2 class="feature-title">{{ title }}</h2>
          <p class="feature-description">{{ description }}</p>
          <div class="feature-actions">
            <button class="btn-learn">Learn more</button>
            <button class="btn-buy">Buy</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  image: string
  bgColor?: string
}

withDefaults(defineProps<Props>(), {
  bgColor: '#f8f8f8'
})
</script>

<style scoped>
.feature-banner {
  padding: 0;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 1440px;
  height: 810px;
  margin: 0 auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
}

.feature-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
  z-index: 1;
}

.feature-container {
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 0 20px;
}

.feature-content {
  display: flex;
  align-items: center;
}

.feature-text {
  z-index: 2;
  max-width: 600px;
}

.feature-title {
  font-size: 48px;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 24px;
  color: #fff;
}

.feature-description {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 32px;
  color: rgba(255, 255, 255, 0.9);
}

.feature-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-learn,
.btn-buy {
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-learn {
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
}

.btn-learn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.btn-buy {
  background: #fff;
  color: #000;
  border: none;
}

.btn-buy:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
}


@media (max-width: 1024px) {
  .feature-text {
    text-align: center;
    margin: 0 auto;
  }

  .feature-actions {
    justify-content: center;
  }

  .feature-title {
    font-size: 36px;
  }
}

@media (max-width: 768px) {
  .feature-banner {
    height: 600px;
  }

  .feature-title {
    font-size: 28px;
  }

  .feature-description {
    font-size: 16px;
  }

  .feature-actions {
    flex-direction: column;
  }

  .btn-learn,
  .btn-buy {
    width: 100%;
    max-width: 300px;
  }
}
</style>
