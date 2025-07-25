<template>
  <div class="customize-page fullscreen">
    <!-- Левая панель -->
    <aside class="sidebar">
      <header class="sidebar-header">
        <nav class="tabs">
          <button class="tab-button active">Colors</button>
          <button class="tab-button">Visual</button>
          <button class="tab-button">Fonts</button>
        </nav>
        
        <div class="theme-presets">
          <h3 class="text">Theme presets</h3>
          <button class="copy-button" @click="copyTheme">Copy</button>
        </div>
        
        <!-- Кнопки пресетов с учётом темы -->
        <div class="presets-buttons">
          <button 
            v-for="preset in themePresets" 
            :key="preset.name"
            class="preset-button"
            @click="applyThemePreset(preset)"
          >
            {{ preset.name }}
          </button>
        </div>
      </header>

      <section class="color-palette">
        <h4 class="text">Color Palette</h4>
        <div class="colors">
          <div 
            v-for="(color, index) in colorPalette" 
            :key="index"
            class="color-box-palette" 
            :style="{ background: color }"
            @click="selectColorFromPalette(color)"
          ></div>
        </div>
      </section>

      <section class="preview-section">
        <h4 class="text">Preview</h4>
        <div class="colors">
          <div 
            class="color-box" 
            :style="{ background: primaryColor }"
            @click="() => openColorPicker('primary')"
          ></div>
          <div 
            class="color-box" 
            :style="{ background: accentColor }"
            @click="() => openColorPicker('accent')"
          ></div>
          <div 
            class="color-box" 
            :style="{ background: hoverAccentColor }"
            @click="() => openColorPicker('hover')"
          ></div>
          <div 
            class="color-box" 
            :style="{ background: contentBgColor }"
            @click="() => openColorPicker('content')"
          ></div>
          <div 
            class="color-box" 
            :style="{ background: secondaryBgColor }"
            @click="() => openColorPicker('secondary')"
          ></div>
        </div>
        
        <!-- Color picker -->
        <div v-if="showColorPicker" class="color-picker">
          <input 
            type="color" 
            v-model="currentColor"
            @input="updateCurrentColor"
          />
          <button @click="confirmColorChange">Apply</button>
          <button @click="closeColorPicker">Cancel</button>
        </div>
      </section>
    </aside>

    <!-- Основное содержимое -->
    <main class="main-content">
      <section class="sports-tabs">
        <button 
          v-for="sport in sports" 
          :key="sport" 
          class="sport-tab"
          :class="{ active: selectedSport === sport }"
          @click="selectedSport = sport"
        >
          {{ sport }}
        </button>
      </section>
      
      <section class="matches-section">
        <h3>Football Matches</h3>
        <div 
          v-for="match in mockMatches" 
          :key="match.id" 
          class="match-card"
        >
          <div class="team-logos">
            <div class="team-logo">{{ match.team1Logo }}</div>
            <div class="team-logo">{{ match.team2Logo }}</div>
          </div>
          <div class="match-info">
            <p class="match-time">{{ match.time }}</p>
            <p class="match-names">
              {{ match.team1 }} vs {{ match.team2 }}
            </p>
            <div class="odds">
              <span>T1: {{ match.odds.team1 }}</span>
              <span>X: {{ match.odds.draw }}</span>
              <span>T2: {{ match.odds.team2 }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="events-section">
        <h3>{{ selectedSport }} Events</h3>
        <div 
          v-for="event in filteredEvents" 
          :key="event.id" 
          class="event-card"
        >
          <div class="event-logo">{{ event.logo }}</div>
          <div class="event-info">
            <p class="event-name">{{ event.name }}</p>
            <p class="event-details">{{ event.details }}</p>
            <div class="odds">
              <span v-for="(odd, key) in event.odds" :key="key">
                {{ key.toUpperCase() }}: {{ odd }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// Реактивные данные цветов
const primaryColor = ref('#E5E5E5')
const accentColor = ref('#D0D0D0')
const hoverAccentColor = ref('#0A0A0A')
const contentBgColor = ref('#171717')
const secondaryBgColor = ref('#404040')

// Дополнительные переменные для color picker
const showColorPicker = ref(false)
const currentColor = ref('#FFFFFF')
const currentColorType = ref('')

// Данные для навигации
const sports = ['Football', 'Tennis', 'Basketball', 'Table Tennis']
const selectedSport = ref('Football')

// Цветовая палитра
const colorPalette = ref([
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
])

// Mock-данные для матчей
const mockMatches = ref([
  {
    id: 1,
    team1: 'Royal Antwerp',
    team2: 'Union Saint Gilloise',
    team1Logo: '⚽',
    team2Logo: '⚽',
    time: '21:45',
    odds: {
      team1: '4.31',
      draw: '3.63',
      team2: '2.02'
    }
  },
  {
    id: 2,
    team1: 'Club Brugge',
    team2: 'Standard Liege',
    team1Logo: '⚽',
    team2Logo: '⚽',
    time: '19:30',
    odds: {
      team1: '1.85',
      draw: '3.40',
      team2: '4.20'
    }
  },
  {
    id: 3,
    team1: 'Genk',
    team2: 'Charleroi',
    team1Logo: '⚽',
    team2Logo: '⚽',
    time: '20:00',
    odds: {
      team1: '2.10',
      draw: '3.25',
      team2: '3.50'
    }
  }
])

// Mock-данные для событий
const mockEvents = ref([
  {
    id: 1,
    sport: 'Table Tennis',
    name: 'Ales Langer vs Martin Kocvara',
    logo: '🏓',
    details: 'Czech Republic · Tier 6 · Men\'s TT-Cup',
    odds: {
      team1: '4.62',
      team2: '1.27'
    }
  },
  {
    id: 2,
    sport: 'Tennis',
    name: 'Novak Djokovic vs Rafael Nadal',
    logo: '🎾',
    details: 'ATP Finals · Indoor Hard Court',
    odds: {
      team1: '1.95',
      team2: '1.85'
    }
  },
  {
    id: 3,
    sport: 'Basketball',
    name: 'Lakers vs Celtics',
    logo: '🏀',
    details: 'NBA Regular Season · Staples Center',
    odds: {
      team1: '2.10',
      team2: '1.75'
    }
  },
  {
    id: 4,
    sport: 'Football',
    name: 'Real Madrid vs Barcelona',
    logo: '⚽',
    details: 'La Liga · Santiago Bernabeu',
    odds: {
      team1: '2.50',
      draw: '3.20',
      team2: '2.80'
    }
  }
])

// Вычисляемые свойства
const filteredEvents = computed(() => {
  return mockEvents.value.filter(event => event.sport === selectedSport.value)
})

// Функции для работы с цветами
const openColorPicker = (colorType) => {
  currentColorType.value = colorType
  showColorPicker.value = true
  
  switch(colorType) {
    case 'primary':
      currentColor.value = primaryColor.value
      break
    case 'accent':
      currentColor.value = accentColor.value
      break
    case 'hover':
      currentColor.value = hoverAccentColor.value
      break
    case 'content':
      currentColor.value = contentBgColor.value
      break
    case 'secondary':
      currentColor.value = secondaryBgColor.value
      break
  }
}

const updateCurrentColor = () => {
  // Можно добавить обновление в реальном времени
}

const confirmColorChange = () => {
  updateColor(currentColorType.value, currentColor.value)
  closeColorPicker()
}

const closeColorPicker = () => {
  showColorPicker.value = false
  currentColorType.value = ''
}

const selectColorFromPalette = (color) => {
  currentColor.value = color
  // Здесь можно добавить логику применения цвета
}

const copyTheme = () => {
  const cssVariables = `
:root {
  --primary-color: ${primaryColor.value};
  --accent-color: ${accentColor.value};
  --hover-accent-color: ${hoverAccentColor.value};
  --content-bg-color: ${contentBgColor.value};
  --secondary-bg-color: ${secondaryBgColor.value};
}
`
  navigator.clipboard.writeText(cssVariables)
    .then(() => {
      alert('Theme CSS copied to clipboard!')
    })
}

const updateColor = (colorType, newColor) => {
  switch(colorType) {
    case 'primary':
      primaryColor.value = newColor
      break
    case 'accent':
      accentColor.value = newColor
      break
    case 'hover':
      hoverAccentColor.value = newColor
      break
    case 'content':
      contentBgColor.value = newColor
      break
    case 'secondary':
      secondaryBgColor.value = newColor
      break
  }
}

// Пресеты тем с учётом светлой/тёмной темы
const themePresets = computed(() => {
  // Здесь можно добавить логику определения текущей темы
  // Пока используем статические пресеты
  return [
    {
      name: 'Dark',
      colors: {
        primary: '#E5E5E5',
        accent: '#D0D0D0',
        hover: '#0A0A0A',
        content: '#171717',
        secondary: '#404040'
      }
    },
    {
      name: 'Light',
      colors: {
        primary: '#333333',
        accent: '#666666',
        hover: '#CCCCCC',
        content: '#FFFFFF',
        secondary: '#F5F5F5'
      }
    },
    {
      name: 'Blue',
      colors: {
        primary: '#FFFFFF',
        accent: '#4A90E2',
        hover: '#357ABD',
        content: '#1E3A5F',
        secondary: '#2D4A78'
      }
    }
  ]
})

const applyThemePreset = (preset) => {
  primaryColor.value = preset.colors.primary
  accentColor.value = preset.colors.accent
  hoverAccentColor.value = preset.colors.hover
  contentBgColor.value = preset.colors.content
  secondaryBgColor.value = preset.colors.secondary
}

// Функция для определения текущей темы
const getCurrentTheme = () => {
  // Проверяем тему в localStorage
  const savedTheme = localStorage.getItem('vitepress-theme-appearance')
  if (savedTheme) {
    return savedTheme
  }
  
  // Проверяем системную тему
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  
  return 'light'
}

// Функция для применения темы
const applyCurrentTheme = () => {
  const theme = getCurrentTheme()
  document.documentElement.classList.toggle('dark', theme === 'dark')
  
  // Применяем соответствующий пресет
  if (theme === 'light') {
    applyThemePreset(themePresets.value[1]) // Light preset
  } else {
    applyThemePreset(themePresets.value[0]) // Dark preset
  }
}

// Слушатель изменений темы
let observer

onMounted(() => {
  // Применяем текущую тему при загрузке
  applyCurrentTheme()
  
  // Наблюдаем за изменениями в localStorage
  const handleStorageChange = (e) => {
    if (e.key === 'vitepress-theme-appearance') {
      applyCurrentTheme()
    }
  }
  
  window.addEventListener('storage', handleStorageChange)
  
  // Наблюдаем за изменениями в DOM
  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const isDark = document.documentElement.classList.contains('dark')
        // Здесь можно добавить логику для синхронизации с темой сайта
      }
    })
  })
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  window.removeEventListener('storage', handleStorageChange)
})
</script>

<style scoped>
.fullscreen {
  display: flex;
  position: fixed;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow: auto;
  z-index: 1000;
}

/* Стили для левой панели */
.sidebar {
  width: 300px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  padding: 20px;
  border-right: 1px solid var(--vp-c-divider);
}

.sidebar-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
}

.tabs {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.theme-presets {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.text {
  margin: 0;
  color: var(--vp-c-text-1);
}

.copy-button {
  background: none;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.copy-button:hover {
  background: var(--vp-c-bg-alt);
}

.color-palette {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: calc(.625rem - 2px);
}

.colors {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.color-box {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
}

.color-box-palette {
  width: 15px;
  height: 15px;
  border-radius: 999px;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
}

.preview-section {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: calc(.625rem - 2px);
}

/* Стили для основного контента */
.main-content {
  flex: 1;
  padding: 20px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  min-height: 100vh;
}

.sports-tabs {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.sport-tab {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  cursor: pointer;
  border-radius: 20px;
}

.sport-tab:hover {
  background: var(--vp-c-bg-soft);
}

.sport-tab.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.matches-section {
  margin-top: 30px;
}

.matches-section h3 {
  margin-top: 0;
  color: var(--vp-c-text-1);
}

.match-card {
  display: flex;
  gap: 20px;
  background: var(--vp-c-bg-soft);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid var(--vp-c-divider);
}

.team-logos {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.team-logo {
  width: 40px;
  height: 40px;
  background: var(--vp-c-bg-alt);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.match-info {
  flex: 1;
}

.match-time {
  font-weight: bold;
  color: var(--vp-c-brand-1);
  margin: 0 0 5px 0;
}

.match-names {
  font-size: 16px;
  margin: 5px 0;
  color: var(--vp-c-text-1);
}

.odds {
  display: flex;
  gap: 15px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.odds span {
  background: var(--vp-c-bg-alt);
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid var(--vp-c-divider);
}

.events-section {
  margin-top: 30px;
}

.events-section h3 {
  margin-top: 0;
  color: var(--vp-c-text-1);
}

.event-card {
  display: flex;
  gap: 20px;
  background: var(--vp-c-bg-soft);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid var(--vp-c-divider);
}

.event-logo {
  width: 40px;
  height: 40px;
  background: var(--vp-c-bg-alt);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.event-info {
  flex: 1;
}

.event-name {
  font-weight: bold;
  margin: 0 0 5px 0;
  color: var(--vp-c-text-1);
}

.event-details {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 5px 0;
}

.event-info .odds {
  margin-top: 10px;
}

/* Стили для color picker */
.color-picker {
  margin-top: 15px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

.color-picker input[type="color"] {
  width: 50px;
  height: 30px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}

.color-picker button {
  margin-left: 10px;
  padding: 5px 10px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
}

.color-picker button:hover {
  background: var(--vp-c-bg);
}

/* Стили для пресетов кнопок */
.presets-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
  width: 100%;
}

.preset-button {
  padding: 6px 12px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 15px;
  cursor: pointer;
  font-size: 12px;
  flex: 1;
  min-width: 60px;
}

.preset-button:hover {
  background: var(--vp-c-bg-soft);
}
</style>