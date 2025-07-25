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
          <button class="copy-button">Copy</button>
        </div>
      </header>

      <section class="color-palette">
        <h4 class="text">Color Palette</h4>
        <div class="colors">
          <div class="color-box-palette" :style="{ background: primaryColor }"></div>
          <div class="color-box-palette" :style="{ background: accentColor }"></div>
          <div class="color-box-palette" :style="{ background: hoverAccentColor }"></div>
          <div class="color-box-palette" :style="{ background: contentBgColor }"></div>
          <div class="color-box-palette" :style="{ background: secondaryBgColor }"></div>
        </div>
      </section>

      <section class="preview-section">
        <h4 class="text">Preview</h4>
        <div class="colors">
          <div class="color-box" :style="{ background: primaryColor }"></div>
          <div class="color-box" :style="{ background: accentColor }"></div>
          <div class="color-box" :style="{ background: hoverAccentColor }"></div>
          <div class="color-box" :style="{ background: contentBgColor }"></div>
          <div class="color-box" :style="{ background: secondaryBgColor }"></div>
        </div>
      </section>
    </aside>

    <!-- Основное содержимое -->
    <main class="main-content">
      <section class="sports-tabs">
        <button class="sport-tab">Football</button>
        <button class="sport-tab">Tennis</button>
        <button class="sport-tab">Basketball</button>
      </section>
      
      <section class="matches-section">
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
        <div 
          v-for="event in mockEvents" 
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
import { ref } from 'vue'

// Пример данных цветов
const primaryColor = '#E5E5E5'
const accentColor = '#D0D0D0'
const hoverAccentColor = '#0A0A0A'
const contentBgColor = '#171717'
const secondaryBgColor = '#404040'

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
    name: 'Ales Langer vs Martin Kocvara',
    logo: '🏓',
    details: 'Table Tennis - Czech Republic · Tier 6 · Men\'s TT-Cup',
    odds: {
      team1: '4.62',
      team2: '1.27'
    }
  },
  {
    id: 2,
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
    name: 'Lakers vs Celtics',
    logo: '🏀',
    details: 'NBA Regular Season · Staples Center',
    odds: {
      team1: '2.10',
      team2: '1.75'
    }
  }
])
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
  background: #222;
  color: #fff;
  padding: 20px;
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
}

.copy-button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
}

.color-palette {
  margin-top: 20px;
  padding: 10px;
  border-style: solid;
  border-width: 1px;
  border-radius: calc(.625rem - 2px);
}

.colors {
  display: flex;
  gap: 10px;
}

.color-box {
  width: 30px;
  height: 30px;
  border-radius: 4px;
}

.color-box-palette {
  width: 15px;
  height: 15px;
  border-radius: 999px;
}

.preview-section {
  margin-top: 20px;
  padding: 10px;
  border-style: solid;
  border-width: 1px;
  border-radius: calc(.625rem - 2px);
}

.preview-container {
  display: flex;
  gap: 10px;
}

.preview-item {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.preview-text {
  color: #fff;
}

/* Стили для основного контента */
.main-content {
  flex: 1;
  padding: 20px;
  background: #111;
  color: #fff;
}

.tab-button {
  padding: 10px 20px;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
}

.tab-button.active {
  background: #333;
}

.matches-section {
  margin-top: 20px;
}

.match-card {
  display: flex;
  gap: 20px;
  background: #222;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.team-logos {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.team-logo {
  width: 40px;
  height: 40px;
  background: #333;
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
  color: #4CAF50;
  margin: 0 0 5px 0;
}

.match-names {
  font-size: 16px;
  margin: 5px 0;
  color: #fff;
}

.odds {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.odds span {
  background: #333;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
}

.sports-tabs {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.sport-tab {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #444;
  color: #aaa;
  cursor: pointer;
  border-radius: 20px;
}

.sport-tab.active {
  background: #333;
  color: #fff;
  border-color: #666;
}

.events-section {
  margin-top: 20px;
}

.event-card {
  display: flex;
  gap: 20px;
  background: #222;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.event-logo {
  width: 40px;
  height: 40px;
  background: #333;
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
  color: #fff;
}

.event-details {
  font-size: 14px;
  color: #aaa;
  margin: 5px 0;
}

.event-info .odds {
  margin-top: 10px;
}
</style>