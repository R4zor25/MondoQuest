<template>
  <div>
      <Navbar class="navbar" @toggle-sidebar="toggleSidebar" />
      <Sidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
  <div class="frame">
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
import ImageCard from './image-card.vue';
import Navbar from "../component/navbar-component.vue";
import Sidebar from "../component/new-sidebar-component.vue";
import store from '@/store';

export default {
  components: {
    ImageCard, Navbar, Sidebar
  },
  data() {
    return {
      images: [],
      isConfirmVisible: false,
      confirmMessage: '',
      confirmAction: null,
      confirmAnswerId: null,
      isSidebarVisible: true,
      token: null
    };
  },
  mounted() {
    this.token = store.getters.getUser.token
    this.fetchImages();
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    async fetchImages() {
      try {
        const response = await axios.get('http://192.168.0.39:8081/api/question/interactive/pending',{
          headers: {
            'Authorization': `Bearer ${this.token}` // Beállítjuk a header-t, hogy tartalmazza a JWT tokent
          }
        });
        this.images = response.data;
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    },
    confirmAccept(answerId) {
      this.confirmMessage = 'Are you sure you want to accept this image?';
      this.confirmAction = 'accept';
      this.confirmAnswerId = answerId;
      this.isConfirmVisible = true;
    },
    confirmReject(answerId) {
      this.confirmMessage = 'Are you sure you want to reject this image?';
      this.confirmAction = 'reject';
      this.confirmAnswerId = answerId;
      this.isConfirmVisible = true;
    },
    async executeConfirmAction() {
      try {
        if (this.confirmAction === 'accept') {
          await this.acceptImage(this.confirmAnswerId);
        } else if (this.confirmAction === 'reject') {
          await this.rejectImage(this.confirmAnswerId);
        }
        this.images = this.images.filter(image => image.answerId !== this.confirmAnswerId);
      } catch (error) {
        console.error('Error processing action:', error);
      } finally {
        this.hideConfirm();
      }
    },
    async acceptImage(answerId) {
      try {
        await axios.post(`http://192.168.0.39:8081/api/question/interactive/${answerId}/accept`, {}, {
          headers: {
            'Authorization': `Bearer ${this.token}` // Beállítjuk a header-t, hogy tartalmazza a JWT tokent
          }
        });
      } catch (error) {
        console.error('Error accepting image:', error);
      }
    },
    async rejectImage(answerId) {
      try {
        await axios.post(`http://192.168.0.39:8081/api/question/interactive/${answerId}/reject`, {}, {
          headers: {
            'Authorization': `Bearer ${this.token}` // Beállítjuk a header-t, hogy tartalmazza a JWT tokent
          }
        });
      } catch (error) {
        console.error('Error rejecting image:', error);
      }
    },
    hideConfirm() {
      this.isConfirmVisible = false;
      this.confirmMessage = '';
      this.confirmAction = null;
      this.confirmAnswerId = null;
    },
  },
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
  justify-content: center;
  align-items: center;
  background-color: #333;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  background: #333;
  overflow-x: hidden;
  transition: transform 0.3s ease;
  z-index: 1000; 
}

.grid {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  background-color: #333;
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
