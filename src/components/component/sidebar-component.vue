<template>
  <div>
    <button class="btn btn-dark" @click="toggleSideBar" style="position: fixed; top: 10px; left: 10px; z-index: 1000;">
      <i class="bi bi-list"></i>
    </button>
    <div :class="['d-flex flex-column bg-dark sidebar', { 'sidebar-closed': isSidebarClosed }]" style="width: 250px;">
      <ul class="nav flex-column nav-pills mb-auto mt-3">
        <li class="nav-item border-bottom pb-2" @mouseover="hoverItem('home')" @mouseout="hoverOut('home')">
          <a class="nav-link d-flex align-items-center" href="#">
            <i class="bi bi-house-door"></i>
            <span class="flex-grow-1" style="color: #ddd; text-align: right;">
              <router-link to="/" style="text-decoration: none; color: inherit;">Kezdőlap</router-link>
            </span>
          </a>
        </li>
        <li class="nav-item border-bottom pb-2" @mouseover="hoverItem('about')" @mouseout="hoverOut('about')">
          <a class="nav-link d-flex align-items-center" href="#">
            <i class="bi bi-file-earmark-plus"></i>
            <span class="flex-grow-1" style="color: #ddd; text-align: right;">
              <router-link to="/form" style="text-decoration: none; color: inherit;">Kérdés létrehozása</router-link>
            </span>
          </a>
        </li>
        <li class="nav-item border-bottom pb-2" @mouseover="hoverItem('services')" @mouseout="hoverOut('services')">
          <a class="nav-link d-flex align-items-center" href="#">
            <i class="bi bi-question-circle"></i>
            <span class="flex-grow-1" style="color: #ddd; text-align: right;">
              <router-link to="/question" style="text-decoration: none; color: inherit;">Random kérdés</router-link>
            </span>
          </a>
        </li>
        <li class="nav-item" @mouseover="hoverItem('contact')" @mouseout="hoverOut('contact')">
          <a class="nav-link d-flex align-items-center" href="#">
            <span class="flex-grow-1" style="color: #ddd; text-align: right;">
              <router-link to="/leaderboard" style="text-decoration: none; color: inherit;">Ranglista</router-link>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
  data() {
    return {
      hoveredItem: null,
      isSidebarClosed: false,
    };
  },
  methods: {
    hoverItem(item) {
      this.hoveredItem = item;
    },
    hoverOut() {
      this.hoveredItem = null;
    },
    toggleSideBar(){
      store.state.isSidebarActive = !store.state.isSidebarActive;
    }
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  z-index: 1200; /* Ensure Sidebar is below Navbar */
}


.sidebar-closed {
  transform: translateX(+100%);
}

.nav-link {
  padding: 10px 15px;
  color: #ddd;
  text-decoration: none;
  display: flex;
}

.nav-link:hover {
  background-color: #333;
  transition: background-color 0.3s ease;
}

.nav-link span {
  transition: transform 0.3s ease;
}

.nav-link:hover span {
  transform: translateX(-10px);
}

.material-icons {
  font-size: 24px;
  margin-right: 10px;
}

.nav-item:last-child {
  border-bottom: none;
}
</style>
