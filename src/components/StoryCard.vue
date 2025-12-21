<template>
  <section class="stories-section">
    <div class="stories-container">
      <h2 class="section-title">Explore the Stories</h2>
      <div class="stories-wrapper">
        <button class="nav-button prev" @click="scrollPrev" aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div class="stories-grid" ref="storiesGrid">
          <div v-for="story in stories" :key="story.id" class="story-card">
            <div class="story-icon" :style="{ background: story.bgColor }">
              <img :src="story.icon" :alt="story.title" />
            </div>
            <h3 class="story-title">{{ story.title }}</h3>
          </div>
        </div>
        <button class="nav-button next" @click="scrollNext" aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Story {
  id: string | number
  title: string
  icon: string
  bgColor: string
}

interface Props {
  stories: Story[]
}

defineProps<Props>()

const storiesGrid = ref<HTMLElement | null>(null)

const scrollPrev = () => {
  if (storiesGrid.value) {
    storiesGrid.value.scrollBy({ left: -400, behavior: 'smooth' })
  }
}

const scrollNext = () => {
  if (storiesGrid.value) {
    storiesGrid.value.scrollBy({ left: 400, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.stories-section {
  padding: 80px 20px;
  background: #fff;
}

.stories-container {
  max-width: 1440px;
  margin: 0 auto;
}

.section-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 40px;
  color: #000;
}

.stories-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
}

.stories-grid {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 8px 0;
}

.stories-grid::-webkit-scrollbar {
  display: none;
}

.story-card {
  flex: 0 0 280px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.story-card:hover {
  transform: translateY(-8px);
}

.story-icon {
  width: 100%;
  height: 320px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  overflow: hidden;
  transition: transform 0.3s ease;
  position: relative;
}

.story-card:hover .story-icon {
  transform: scale(1.05);
}

.story-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.story-title {
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin-top: 8px;
}

.nav-button {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #e0e0e0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.nav-button:hover {
  background: #f5f5f5;
  border-color: #333;
  transform: scale(1.05);
}

.nav-button svg {
  color: #333;
}

@media (max-width: 768px) {
  .stories-section {
    padding: 60px 16px;
  }

  .section-title {
    font-size: 28px;
    margin-bottom: 24px;
  }

  .story-card {
    flex: 0 0 220px;
  }

  .story-icon {
    height: 260px;
  }

  .story-icon img {
    width: 100%;
    height: 100%;
  }

  .story-title {
    font-size: 16px;
  }

  .nav-button {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .story-card {
    flex: 0 0 180px;
  }

  .story-icon {
    height: 200px;
  }

  .story-icon img {
    width: 100%;
    height: 100%;
  }
}
</style>
