<template>
  <div :class="['sidebar', { 'sidebar-hidden': !isSidebarVisible }]">
    <button class="open-button btn btn-outline-secondary mb-3" @click="toggleSidebar">
      <h2>Mondo Quest</h2>
      <i class="bi bi-list"></i>
    </button>
    <ul class="nav flex-column nav-pills mb-auto">
      <li class="nav-item border-bottom pb-2">
        <router-link class="nav-link d-flex align-items-center" to="/" replace>
          <i class="bi bi-house-door icon-background" ></i>
          <span class="flex-grow-1" style="color: #ddd;">Kezdőlap</span>
        </router-link>
      </li>
      <li v-if="this.isAdmin"  class="nav-item border-bottom pb-2">
        <router-link class="nav-link d-flex align-items-center" to="/form" replace>
          <i class="bi bi-file-earmark-plus"></i>
          <span class="flex-grow-1" style="color: #ddd;">Kérdés létrehozása</span>
        </router-link>
      </li>
      <li class="nav-item border-bottom pb-2">
        <router-link class="nav-link d-flex align-items-center" to="/infinite" replace>
          <i class="bi bi-question-circle"></i>
          <span class="flex-grow-1" style="color: #ddd;">Végtelen mód</span>
        </router-link>
      </li>
      <li class="nav-item border-bottom pb-2">
        <router-link class="nav-link d-flex align-items-center" to="/story" replace>
          <i class="bi bi-book"></i>
          <span class="flex-grow-1" style="color: #ddd;">Story mód</span>
        </router-link>
      </li>
      <li v-if="this.isAdmin" class="nav-item border-bottom pb-2">
        <router-link class="nav-link d-flex align-items-center" to="/interactive" replace>
          <i class="bi bi-trophy"></i>
          <span class="flex-grow-1" style="color: #ddd;">Interaktív kiértékelés</span>
        </router-link>
      </li>
      <li class="nav-item border-bottom pb-2">
        <router-link class="nav-link d-flex align-items-center" to="/gallery" replace>
          <i class="bi bi-images"></i>
          <span class="flex-grow-1" style="color: #ddd;">Galéria</span>
        </router-link>
      </li>
      <li class="nav-item border-bottom pb-2">
        <router-link class="nav-link d-flex align-items-center" to="/leaderboard" replace>
          <i class="bi bi-trophy"></i>
          <span class="flex-grow-1" style="color: #ddd;">Ranglista</span>
        </router-link>
      </li>
      <li class="nav-item mt-auto">
        <router-link class="nav-link align-items-center" to="/login" replace>
          <div @click="clearUserData" class="d-flex align-items-center">
          <i class="bi bi-box-arrow-right"></i>
          <span class="flex-grow-1" style="color: #ddd;">Kijelentkezés</span>
        </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'SidebarComponent',
  data() {
    return {
      isAdmin: false
    };
  },
  props: {
    isSidebarVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    },
    clearUserData(){
      store.commit('logout');
    }
  },
  mounted() {
    this.isAdmin = store.getters.getUser.user.role === 'ADMIN';
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: #333;
  overflow-x: hidden;
  transition: transform 0.3s ease;
  z-index: 1000; 
}
.sidebar-hidden {
  transform: translateX(-100%);
}
.nav-link {
  padding: 10px 15px 10px 15px;
  color: #ddd;
  text-decoration: none;
}
.nav-link:hover {
  background-color: #666;
  transition: background-color 0.3s ease;
}
.icon-background:hover{
  background-color: #fff;
}
.open-button{
  padding: 10px, 10px, 10px, 10px;
}

</style>
