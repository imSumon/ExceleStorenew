<template>
  <section class="hero-banner" :class="{ scrolled: isScrolled }">
    <div class="banner-content">
      <picture v-if="!useVideo">
        <source :srcset="bannerImage.webp" type="image/webp" />
        <source :srcset="bannerImage.jpg" type="image/jpeg" />
        <img :src="bannerImage.jpg" :alt="title" class="banner-media" />
      </picture>
      <video
        v-else
        class="banner-media"
        autoplay
        muted
        loop
        playsinline
        :poster="bannerImage.jpg"
      >
        <source v-if="videoSrc" :src="videoSrc" type="video/webm" />
        <source v-if="videoSrc" :src="videoSrc.replace('.webm', '.mp4')" type="video/mp4" />
      </video>

      <div class="banner-overlay">
        <div class="banner-text">
          <h1 class="banner-title">{{ title }}</h1>
          <p class="banner-subtitle">{{ subtitle }}</p>
          <div class="banner-actions">
            <button class="btn-primary">{{ primaryBtnText }}</button>
            <button class="btn-secondary">{{ secondaryBtnText }}</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface BannerImage {
  webp: string
  jpg: string
}

interface Props {
  title: string
  subtitle: string
  primaryBtnText: string
  secondaryBtnText: string
  bannerImage: BannerImage
  videoSrc?: string
  useVideo?: boolean
}

withDefaults(defineProps<Props>(), {
  useVideo: false
})

const isScrolled = ref(false)
let ticking = false

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      isScrolled.value = window.scrollY > 100
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.hero-banner {
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #000;
  margin-top: -96px;
  padding-top: 36px;
  transition: max-width 0.8s cubic-bezier(0.4, 0.0, 0.2, 1),
              margin 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.hero-banner.scrolled {
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
}

.hero-banner.scrolled .banner-content {
  height: 810px;
  min-height: 810px;
}

.banner-content {
  position: relative;
  width: 100%;
  height: 960px;
  min-height: 960px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
  transition: height 0.8s cubic-bezier(0.4, 0.0, 0.2, 1),
              min-height 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.banner-media {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1440px;
  padding: 0 40px;
  margin: 0 auto;
}

.banner-text {
  max-width: 600px;
  color: #fff;
  text-align: left;
}

.banner-title {
  font-size: 56px;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.banner-subtitle {
  font-size: 20px;
  line-height: 1.5;
  margin-bottom: 32px;
  opacity: 0.95;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.banner-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-primary {
  background: #fff;
  color: #000;
}

.btn-primary:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
}

.btn-secondary {
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .hero-banner {
    margin-top: -56px;
  }

  .hero-banner.scrolled .banner-content {
    height: 600px;
    min-height: 600px;
  }

  .banner-content {
    height: 100vh;
    min-height: 500px;
    padding-top: 56px;
  }

  .banner-overlay {
    padding: 0 20px;
  }

  .banner-text {
    max-width: 100%;
  }

  .banner-title {
    font-size: 36px;
  }

  .banner-subtitle {
    font-size: 16px;
  }

  .banner-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .banner-content {
    min-height: 400px;
  }

  .banner-title {
    font-size: 28px;
  }

  .banner-subtitle {
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>
