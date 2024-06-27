<template>
    <div>
      <Navbar class="navbar" @toggle-sidebar="toggleSidebar" />
      <Sidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
  <div class="app">
    <div class="toggle-buttons">
      <button :class="{ active: viewMode === 'own' }" @click="setViewMode('own')">Saját válaszok</button>
      <button :class="{ active: viewMode === 'all' }" @click="setViewMode('all')">Mindenki válasza</button>
    </div>
    <div class="grid">
      <ImageCard
        v-for="image in images"
        :key="image.answerId"
        :image="image"
        @accept="confirmAccept"
        @reject="confirmReject"
      />
    </div>

    <div v-if="isConfirmVisible" class="modal-overlay" @click="hideConfirm">
      <div class="modal-content" @click.stop>
        <p>{{ confirmMessage }}</p>
        <button @click="executeConfirmAction">Yes</button>
        <button @click="hideConfirm">No</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store';
import ImageCard from './image-card.vue';
import Navbar from "../component/navbar-component.vue";
import Sidebar from "../component/new-sidebar-component.vue";

export default {
  components: {
    ImageCard, Navbar, Sidebar
  },
  data() {
    return {
      images: [],
      viewMode: 'own', // 'own' or 'all'
      userId: null,
      isConfirmVisible: false,
      confirmMessage: '',
      confirmAction: null,
      confirmAnswerId: null,
      isSidebarVisible: true,
    };
  },
  mounted() {
    this.userId = store.getters.getUser.user.userId;
    this.fetchImages();

  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    async fetchImages() {
      let url = '';
      if (this.viewMode === 'own') {
        url = `http://192.168.0.39:8081/api/question/interactive/${this.userId}`;
      } else {
        url = 'http://192.168.0.39:8081/api/question/interactive/accepted';
      }
      try {
        const response = await axios.get(url);
        this.images = response.data;
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    },
    setViewMode(mode) {
      this.viewMode = mode;
      this.fetchImages();
    },
  },
};
</script>

<style>
.app {
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

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #343a40;
  overflow-x: hidden;
  transition: transform 0.3s ease;
  z-index: 1000; 
}

.toggle-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.toggle-buttons button {
  margin: 0 10px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
}

.toggle-buttons button.active {
  background-color: #0056b3;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.modal-content p {
  margin-bottom: 20px;
}
</style>