<template>
  <div class="image-card">
    <div class="image-wrapper">
      <img :src="imageSrc" @click="showImage" />
    </div>
    <h3>{{ image.title }}</h3>
    <p>{{ image.description }}</p>
    <button @click="emitAccept">Accept</button>
    <button @click="emitReject">Reject</button>

    <div v-if="isModalVisible" class="image-modal-overlay" @click="hideImage">
      <div class="image-modal-content">
        <img :src="imageSrc" />
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    props: {
      image: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        isModalVisible: false,
      };
    },
    computed: {
      imageSrc() {
        return `data:image/jpeg;base64,${this.image.imageFile}`;
      },
    },
    methods: {
      showImage() {
        this.isModalVisible = true;
      },
      hideImage() {
        this.isModalVisible = false;
      },
      emitAccept() {
        this.$emit('accept', this.image.answerId);
      },
      emitReject() {
        this.$emit('reject', this.image.answerId);
      },
    },
  };
  </script>
  
<style scoped>
.image-card {
  border: 1px solid #ccc;
  padding: 10px;
  width: 200px;
  text-align: center;
}

.image-wrapper {
  width: 100%;
  height: 0;
  padding-bottom: 100%; /* 1:1 Aspect Ratio */
  position: relative;
}

.image-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

.image-modal-overlay {
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

.image-modal-content {
  max-width: 90%;
  max-height: 90%;
}

.image-modal-content img {
  width: 100%;
  height: auto; /* Maintain aspect ratio */
}

h3, p {
  color: #ccc
}
</style>