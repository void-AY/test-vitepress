<template>
    <div>
            <h1>Customize Your Sportsbook</h1>
            <p class="page-description">
            Choose from various customization options to make your sportsbook unique
            </p>
            <div class="card-grid">
                <div 
                v-for="card in cards" 
                :key="card.title" 
                class="card"
                @click="handleCardClick(card)"
                >
                    <div class="card-icon">{{ card.icon }}</div>
                        <h3>{{ card.title }}</h3>
                        <p>{{ card.description }}</p>
                        <div class="card-action">
                        <span>Learn more →</span>
                    </div>
                </div>
            </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

const cards = ref([
  {
    title: 'Theme Colors',
    description: 'Customize the color scheme and branding of your sportsbook interface',
    icon: '🎨',
    path: '/customize/colors'
  },
  {
    title: 'Layout Options',
    description: 'Configure the layout, positioning and responsive behavior',
    icon: '📐',
    path: '/customize/layout'
  },
  {
    title: 'Sports Filters',
    description: 'Set up which sports, leagues and markets to display',
    icon: '⚽',
    path: '/customize/sports'
  },
  {
    title: 'Navigation Setup',
    description: 'Customize menus, breadcrumbs and user navigation',
    icon: '🧭',
    path: '/customize/navigation'
  }
])

const handleCardClick = (card) => {
  // Переход по ссылке при клике на карточку
  router.go(card.path)
}
</script>

<style scoped>
.customize-page {
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
}

.page-description {
  color: var(--vp-c-text-2);
  font-size: 1.1em;
  margin-bottom: 30px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 20px;
}

.card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  cursor: pointer;
  background: var(--vp-c-bg-soft);
}

.card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.card-icon {
  font-size: 28px;
  margin-bottom: 16px;
}

.card h3 {
  margin: 0 0 12px 0;
  font-size: 1.3em;
  color: var(--vp-c-text-1);
}

.card p {
  margin: 0 0 16px 0;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.card-action {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.card-action span {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>