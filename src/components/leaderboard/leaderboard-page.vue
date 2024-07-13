<template>
  <div class="frame">
    <Navbar class="navbar" @toggle-sidebar="toggleSidebar" />
    <Sidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
    <h1>Ranglista</h1>
    <div class="btn-container">
      <div class="btn-group" role="group">
        <button
          type="button"
          class="btn mode-button"
          :class="{ active: mode === 'infinite' }"
          @click="changeMode('infinite')"
        >
          Végtelen
        </button>
        <button
          type="button"
          class="btn mode-button"
          :class="{ active: mode === 'story' }"
          @click="changeMode('story')"
        >
          Story
        </button>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="table-container">
        <table v-if="mode === 'infinite'" class="table table-hover table-bordered table-striped custom-table">
          <thead>
            <tr>
              <th scope="col">Helyezés</th>
              <th scope="col">Játékos neve</th>
              <th scope="col">Pontszám</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in players" :key="player.username">
              <td>{{ index + 1 }}</td>
              <td>{{ player.username }}</td>
              <td>{{ player.score }}</td>
            </tr>
          </tbody>
        </table>
        <table v-else class="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">Helyezés</th>
              <th scope="col">Játékos neve</th>
              <th scope="col">Pontszám</th>
              <th scope="col">Story kezdete</th>
              <th scope="col">Story befejezése</th>
              <th scope="col">Teljesítés időtartama</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in players" :key="player.username">
              <td>{{ index + 1 }}</td>
              <td>{{ player.username }}</td>
              <td>{{ player.score }}</td>
              <td>{{ formatDate(player.startTime) }}</td>
              <td>{{ formatDate(player.finishTime) }}</td>
              <td>{{ calculateTime(player.startTime, player.finishTime) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from "../component/navbar-component.vue";
import Sidebar from "../component/new-sidebar-component.vue";
import store from '@/store';

export default {
  components: {
    Navbar, Sidebar
  },
  data() {
    return {
      players: [],
      mode: 'infinite',
      isSidebarVisible: false,
      token: null
    };
  },
  methods: {
    fetchLeaderboard() {
      const endpoint = this.mode === 'infinite'
        ? 'https://mondo-quest.fly.dev/api/user/leaderboard/infinite'
        : 'https://mondo-quest.fly.dev/api/user/leaderboard/story';

      axios
        .get(endpoint, {
          headers: {
            'Authorization': `Bearer ${this.token}` // Beállítjuk a header-t, hogy tartalmazza a JWT tokent
          }
        })
        .then((response) => {
          this.players = response.data;
        })
        .catch((error) => {
          console.error('Error fetching leaderboard:', error);
          alert('Hiba a ranglista betöltése közben. Kérlek próbáld újra később.');
        });
    },
    changeMode(newMode) {
      if(this.mode !== newMode){
      this.mode = newMode;
      this.fetchLeaderboard();
      }
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    formatDate(dateString) {
      if (dateString === null) {
        return "Nincs";
      }
      const date = new Date(dateString);
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${year}. ${month}. ${day}. ${hours}:${minutes}:${seconds}`;
    },
    calculateTime(startTime, finishTime) {
  if (startTime === null || finishTime === null) {
    return "Még nem végzett";
  }
  
  const start = new Date(startTime);
  const end = new Date(finishTime);
  const diff = end - start;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  let result = "";
  if (days > 0) {
    result += `${days} nap `;
  }
  if (hours > 0) {
    result += `${hours} óra `;
  }
  if (minutes > 0) {
    result += `${minutes} perc `;
  }
  if (seconds > 0) {
    result += `${seconds} másodperc`;
  }

  return result.trim();
}
  },
  mounted() {
    this.token = store.getters.getUser.token
    this.fetchLeaderboard();
  },
};
</script>

<style scoped>
.frame {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100%;
  background-image: url('@/assets/peak.jpeg');
    background-size: cover;
    background-position: center;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: transform 0.3s ease;
  background: #333;
  z-index: 1000;
}

h1 {
  color: #fff;
  text-align: center;
  margin-top: 20px;
  text-shadow: #000 0px 0px 15px;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.btn-group {
  display: flex;
  width: 100%;
  padding: 0px 32px 0px 32px;
}

.mode-button {
  flex: 1;
  background-color: #333;
  color: white;
  border: 1px solid #ccc;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 1.5rem;
  text-align: center;
}

.mode-button:hover {
  background-color: #555;
}

.mode-button.active {
  background-color: #777;
  color: #fff;
}

.table-container {
  width: 100%;
  padding: 32px;
  overflow-x: auto;
}

.table {
  margin-top: 20px;
  width: 100%;
  background: #333;
  color: #ccc;
}

td:nth-child(even) {
  background-color: #3a3a3a;
  color: #ddd;
}

td:nth-child(odd) {
  background-color: #6e6e6e;
  color: #ddd;
}

th:nth-child(even) {
  background-color: #3a3a3a;
  color: #ddd;
}

th:nth-child(odd) {
  background-color: #6e6e6e;
  color: #ddd;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
</style>
