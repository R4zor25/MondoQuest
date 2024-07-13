<template>
  <div>
    <div class="frame">
      <Navbar class="navbar" @toggle-sidebar="toggleSidebar" />
      <Sidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
      <div class="btn-container">
        <div class="btn-group" role="group">
          <button
            type="button"
            class="btn mode-button"
            :class="{ active: viewMode === 'own' }"
            @click="changeMode('own')"
          >
            Saját képek
          </button>
          <button
            type="button"
            class="btn mode-button"
            :class="{ active: viewMode === 'infinite' }"
            @click="changeMode('infinite')"
          >
            Megosztott képek
          </button>
        </div>
      </div>
      <div class="grid">
        <ImageCard
          v-for="image in images"
          :key="image.answerId"
          :image="image"
        />
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <button @click="nextPage" :disabled="!hasMore">Next</button>
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
      viewMode: 'own', // 'own' or 'infinite'
      userId: null,
      currentPage: 1,
      itemsPerPage: 10,
      hasMore: false,
      isSidebarVisible: true,
      token: null
    };
  },
  mounted() {
    this.token = store.getters.getUser.token;
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
        url = `https://mondo-quest.fly.dev/api/question/interactive/${this.userId}`;
      } else {
        url = 'https://mondo-quest.fly.dev/api/question/interactive/accepted';
      }
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          },
          params: {
            page: this.currentPage - 1 
          }
        });
        this.images = response.data.imageAnswers;
        this.hasMore = response.data.hasMore;
      } catch (error) {
        console.error('Error fetching images:', error);
        alert('Hiba történt a képek betöltésekor. Kérjük, próbálja újra később.');
      }
    },
    changeMode(mode) {
      if (this.viewMode !== mode) {
        this.viewMode = mode;
        this.currentPage = 1; // Reset to first page
        this.fetchImages();
      }
    },
    nextPage() {
      if (this.hasMore) {
        this.currentPage++;
        this.fetchImages();
        window.scrollTo({
        top: 0,
        behavior: 'smooth' // Az 'auto' érték is használható, ha azonnali görgetést szeretnénk
      });
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchImages();
        window.scrollTo({
        top: 0,
        behavior: 'smooth' // Az 'auto' érték is használható, ha azonnali görgetést szeretnénk
      });
      }
    }
  }
};
</script>

<style scoped>
.frame {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh; /* minimum magasság a képernyő magassága */
  width: 100%;
  padding-top: 16px;
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

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}

.btn-group {
  display: flex;
  width: 100%;
  padding: 0px 32px 0px 32px;
}

.mode-button {
  flex: 1;
  background: #333;
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

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-left: 32px;
  padding-right: 32px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 10px 20px;
  font-size: 1rem;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
