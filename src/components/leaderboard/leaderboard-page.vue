<template>
  <div>
    <Navbar @toggle-sidebar="toggleSidebar" />
    <Sidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
    <div class="container mt-3">
      <h1>Leaderboard</h1>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-primary" :class="{ active: mode === 'infinite' }" @click="changeMode('infinite')">Infinite</button>
          <button type="button" class="btn btn-primary" :class="{ active: mode === 'story' }" @click="changeMode('story')">Story</button>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <table v-if="mode === 'infinite'" class="table table-bordered table-striped">
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
.container {
  margin-top: 20px;
}

.table {
  margin-top: 20px;
}

.btn-group .btn {
  border-radius: 0;
}

.btn-group .btn.active {
  background-color: #0056b3;
  border-color: #0056b3;
}

.thead-dark {
  background-color: #343a40;
  color: #fff;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
