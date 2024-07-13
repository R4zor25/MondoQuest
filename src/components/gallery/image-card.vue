<template>
  <div class="image-card">
    <div class="image-wrapper">
      <img :src="imageSrc" @click="showImage" />
    </div>
    <h4>{{ image.title }}</h4>
    <p>{{ image.description }}</p>
    <p :class="imageAnswerStateClass" v-if="image.imageAnswerState">Állapot: {{ translateImageAnswerState(image.imageAnswerState) }}</p>
    <p v-if="image.questionGroupType">Mód: {{ translateQuestionGroupType(image.questionGroupType) }}</p>
    <div v-if="isModalVisible" class="image-modal-overlay" @click="hideImage">
      <div class="image-modal-content">
        <img :src="imageSrc" />
      </div>
    </div>
  </div>
</template>

<script>
import ImageAnswerState from '../model/ImageAnswerState';
import QuestionGroupType from '../model/QuestionGroupType';

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
    translateImageAnswerState(state) {
      return ImageAnswerState.toString(state);
    },
    translateQuestionGroupType(type) {
      return QuestionGroupType.toString(type);
    },
    showImage() {
      this.isModalVisible = true;
    },
    hideImage() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style scoped>
.image-card {
  border-radius: 8px;
  padding: 10px;
  width: 400px;
  text-align: center;
  background: #333;
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
  z-index: 10;
}

.image-modal-content {
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
}

.image-modal-content img {
  max-width: 50%;
  max-height: 50%;
  object-fit: contain;
}

h4, p {
  color: #ccc;
}
</style>
