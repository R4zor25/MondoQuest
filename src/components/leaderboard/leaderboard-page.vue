<template>
  <div>
    <Navbar class="navbar" @toggle-sidebar="toggleSidebar" />
    <Sidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
    <div class="frame mt-3">
      <h1>Leaderboard</h1>
      <div class="d-flex justify-content-between align-items-center mb-3 main-content">
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-primary" :class="{ active: mode === 'infinite' }" @click="changeMode('infinite')">Infinite</button>
          <button type="button" class="btn btn-primary" :class="{ active: mode === 'story' }" @click="changeMode('story')">Story</button>
        </div>
      <transition name="fade" mode="out-in">
        <table v-if="mode === 'infinite'" class="table table-hover table-bordered table-striped custom-table">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Player Name</th>
              <th scope="col">Score</th>
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
              <th scope="col">Rank</th>
              <th scope="col">Player Name</th>
              <th scope="col">Score</th>
              <th scope="col">Story Start</th>
              <th scope="col">Story End</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in players" :key="player.username">
              <td>{{ index + 1 }}</td>
              <td>{{ player.username }}</td>
              <td>{{ player.score }}</td>
              <td>{{ player.storyStart }}</td>
              <td>{{ player.storyEnd }}</td>
            </tr>
          </tbody>
        </table>
      </transition>
    </div>
    </div>
  </div>
</template>




<script>
import axios from 'axios';
import Navbar from "../component/navbar-component.vue";
import Sidebar from "../component/new-sidebar-component.vue";

export default {
  components: {
    Navbar, Sidebar
  },
  data() {
    return {
      players: [],
      mode: 'infinite',
      isSidebarVisible: true
    };
  },
  methods: {
    fetchLeaderboard() {
      const endpoint = this.mode === 'infinite'
        ? 'http://192.168.0.39:8081/api/user/leaderboard/infinite'
        : 'http://192.168.0.39:8081/api/user/leaderboard/story';

      axios
        .get(endpoint)
        .then((response) => {
          this.players = response.data;
        })
        .catch((error) => {
          console.error('Error fetching leaderboard:', error);
        });
    },
    changeMode(newMode) {
      this.mode = newMode;
      this.fetchLeaderboard();
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    }
  },
  mounted() {
    this.fetchLeaderboard();
  },
};
</script>

<style scoped>
.frame {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding-top: 16px;
  justify-content: center;
  align-items: center;
  background-color: #333;
}

.main-content{
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #333;
  align-items: center;
  padding: 16px;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #343a40;
  overflow-x: hidden;
  transition: transform 0.3s ease;
  z-index: 1000; 
}
h1, h2, h3, h4, h5, h6, li {
  color: #ccc;
  background: #333;
}

.table {
  margin-top: 20px;
  width: 80%;
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


.btn-group .btn {
  border-radius: 0;
}

.btn-group .btn.active {
  background-color: #1027a8;
  border-color: #1027a8;
}

.thead-dark {
  background-color: #343a40;
  color: #555;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(50px);
}
</style>
