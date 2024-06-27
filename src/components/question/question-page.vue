<template>
  <div class="frame">
    <Navbar class="navbar" @toggle-sidebar="toggleSidebar" />
    <Sidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
  <div class="container">
    <Transition name="slide-fade">
      <div class="question-card" v-show="!loading">
        <div class="point-difficulty-section">
        <h5>Jelenlegi pontszámod: {{ this.userPoint }}</h5>
        <h5>Kérdés Nehézsége: {{ translateDifficulty(question.difficulty) }}</h5>
      </div>
        <select class="form-select" @change="fetchQuestionById" id="dropdown1" v-model="selectedQuestionId">
          <option v-for="(value, key) in questionIds" :key="key" :value="value">
            {{ value }}
          </option>
        </select>
        <img v-if="question.questionType == 'IMAGE' || question.questionType == 'INTERACTIVE'" :src="'data:image/'+ imageType+';base64,'+ question.file" alt="Question Image" class="question-image" @click="toggleFullscreen"/>
        <audio v-if="question.questionType == 'AUDIO'" :src="'data:audio/wav;base64,'+ question.file" controls></audio>
        <h2>{{ question.title }}</h2>
        <h4>{{ question.description }}</h4>
        <div v-if="question.questionType !== 'INTERACTIVE'" class="select-answer-section">
        <div class="answer-row"  v-for="(row, rowIndex) in chunkedAnswers" :key="rowIndex">
          <div v-for="(answer, index) in row" :key="index" class="answer-card-container">
            <div 
              class="answer-card" 
              :class="{ 
                selected: selectedAnswer === (rowIndex * 2 + index) && resultSent !== true, 
                correct: result === true && selectedAnswer === (rowIndex * 2 + index) || (result != null && result.answerText === answer.answerText),  
                incorrect: result != null && result.isCorrect === false && selectedAnswer === (rowIndex * 2 + index) 
              }"
              @click="result === null && !resultSent && selectAnswer(rowIndex * 2 + index)"
              @mouseover="result === null && (hoveredAnswer = rowIndex * 2 + index)"
              @mouseleave="hoveredAnswer = null"
            >
              {{ answer.answerText }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="question.questionType === 'INTERACTIVE'" class="interactive-answer-section">
        <label for="imageUpload" class="form-label">Kép hozzáadása</label>
        <input class="form-control-file" @change="handleFileUpload"  type="file" id="imageUpload" accept="image/*" required>
      </div>
        <div class="submit-button-section">
        <Transition name="slide-fade">
        <button class="check-button" @click="submitAnswer" v-if="result === null" key="check">Ellenőrzés</button>
        </Transition>
        <Transition  name="slide-fade">
        <button class="next-button" @click="fetchQuestion" v-if="result !== null" key="next">Következő</button>
        </Transition>
      </div>
      <Transition name="slide-fade">
        <div v-if="result !== null" class="rating">
          <h5 class="average-rating">Átlagos értékelés:{{ (Math.round(question.averageRating * 100) / 100).toFixed(2) }}</h5>
          <span v-for="star in 5" :key="star" class="star" :class="{ 'active': star <= rating }" @click="rateQuestion(star)">
            ★
          </span>
        </div>
      </Transition>
      <Transition name="slide-fade">
        <div v-if="ratingSent" class="rating-sent">
          <h2>Köszönjük a visszajelzést!</h2>
        </div>
      </Transition>
      
        <div v-if="isFullscreen" class="fullscreen-overlay" @click="toggleFullscreen"></div>
          <div v-if="isFullscreen" class="fullscreen-image-container">
            <transition name="fullscreen-image-transition">
              <img
                :src="'data:image/' + imageType + ';base64,' + question.file"
                alt="Question Image (Fullscreen)"
                class="fullscreen-image"
              />
            </transition>
          </div>
        </div>
    </Transition>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import Navbar from '../component/navbar-component.vue';
import Sidebar from '../component/new-sidebar-component.vue';
import store from '@/store';
import QuestionDifficulty from '../model/QuestionDifficulty';

export default {
  components: {
    Navbar, Sidebar
  },
  data() {
    return {
      isSidebarVisible: true,
      userId: null,
      question: {},
      imageType: 'png',
      selectedAnswer: null,
      hoveredAnswer: null,
      result: null,
      userPoint: 0,
      resultSent: false,
      ratingSent: false,
      questionIds: [],
      selectedQuestionId: null,
      loading: false,
      rating: 0,
      isFullscreen: false,
      base64Image: '',
    };
  },
  computed: {
    chunkedAnswers() {
      return this.chunkArray(this.question.answers || [], 2);
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.base64Image = e.target.result.split(',')[1];
        };
        reader.readAsDataURL(file);
      }
    },
    translateDifficulty(value) {
      return QuestionDifficulty.toString(value);
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
    },
    fetchQuestion() {
    this.loading = true;
    this.selectedAnswer = null;
    this.hoveredAnswer = null;
    this.result = null;
    this.resultSent = false;
    this.ratingSent = false;
    this.rating = 0;
    setTimeout(() => {
      axios.get(`http://192.168.0.39:8081/api/question/infinite/random/${this.userId}`)
        .then(response => {
          this.question = response.data;
          if (this.question.questionType === "GIF") {
            this.imageType = 'gif'
          } else {
            this.imageType = 'png'
          }
          setTimeout(() => {
            this.loading = false;
        }, 300);
        })
        .catch(error => {
          console.error('Error fetching question:', error);
          this.loading = false;
        });
      }, 300);
     // Delay for animation
  },
    fetchAllQuestionId(){
      axios.get('http://192.168.0.39:8081/api/question/all').
        then(response => {
          this.questionIds = response.data;
        })
        .catch(error => {
          console.error('Error fetching question:', error);
        });
    },
    fetchQuestionById(){
      this.loading = true;
      this.selectedAnswer = null;
      this.hoveredAnswer = null;
      this.result = null;
      this.resultSent = false;
      this.ratingSent = false;
      axios.get(`http://192.168.0.39:8081/api/question/${this.selectedQuestionId}`).
        then(response => {
          this.question = response.data;
          setTimeout(() => {
            this.loading = false;
        }, 300);
        })
        .catch(error => {
          console.error('Error fetching question:', error);
          this.loading = false;
        });
    },
    selectAnswer(index) {
      this.selectedAnswer = index;
    },
    submitAnswer() {
      if ((this.selectedAnswer === null && this.question.questionType !== 'INTERACTIVE') || (this.base64Image === '' && this.question.questionType === 'INTERACTIVE')) {
        alert('Please select an answer.');
        return;
      }
      if(this.question.questionType !== 'INTERACTIVE'){
      const payload = this.question.answers[this.selectedAnswer];
      axios.post(`http://192.168.0.39:8081/api/question/${this.question.id}/infinite/answer/${this.userId}`, payload)
        .then(response => {
          this.resultSent = true;
          this.result = response.data;
          this.userPoint = response.data.userPoint;
          store.state.user.user.points = response.data.userPoint;
        })
        .catch(error => {
          console.error('Error submitting answer:', error);
        });
      } else {
        const payload = {
          imageFile: this.base64Image
        };
        axios.post(`http://192.168.0.39:8081/api/question/${this.question.id}/infinite/answer/interactive/${this.userId}`, payload)
        .then(response => {
          this.resultSent = true;
          this.result = response.data;
        })
        .catch(error => {
          console.error('Error submitting answer:', error);
        });
      }
    },
    rateQuestion(star) {
      if(!this.ratingSent){
      this.rating = star;
      this.ratingSent = true;
      axios.post(`http://192.168.0.39:8081/api/question/${this.question.id}/rate/${this.userId}`,  { rating: parseInt(star)})
      .then().catch(error => {
        console.error('Error rating question:', error);
      })
    }
    },
    chunkArray(array, chunkSize) {
      if (!Array.isArray(array)) {
        console.error('chunkArray: input is not an array');
        return [];
      }
      const result = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
      }
      return result;
    }
  },
  mounted() {
    this.fetchQuestion();
    this.fetchAllQuestionId();
    this.userPoint = store.getters.getUser.user.points;
    this.userId = store.getters.getUser.user.userId;
  }
};
</script>

<style scoped>
h2, h3, h4, h5 {
  color: #ddd;
}

.frame {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
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

.container {
  display: flex;
  flex-direction: column;
  background-color: #333;
  align-items: center;
  padding: 16px;
}

.point-difficulty-section {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  }

.question-card {
  width: 100%;
  align-items: center;
  max-width: 100vh;
  background-color: #555;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  opacity: 1;
  transition: all 0.5s ease;
}

.question-card.slide-fade-enter-active, 
.question-card.slide-fade-leave-active,
.check-button.slide-fade-enter-active,
.check-button.slide-fade-leave-active,
.next-button.slide-fade-enter-active,
.next-button.slide-fade-leave-active,
.rating.slide-fade-enter-active,
.rating.slide-fade-leave-active,
.rating-sent.slide-fade-enter-active,
.rating-sent.slide-fade-leave-active{
 /* transition: opacity 0.5s ease-in-out;*/
 transition: all 0.5s ease;
}

.question-card.slide-fade-enter-from,
 .question-card.slide-fade-leave-to,
 .rating.slide-fade-enter-from,
 .rating.slide-fade-leave-to,
 .rating-sent.slide-fade-enter-from,
 .rating-sent.slide-fade-leave-to
 {
  transform: translateY(50px);
  opacity: 0;
}

.check-button.slide-fade-enter-from {
  opacity: 0;
}
.check-button.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.next-button.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.next-button.slide-fade-leave-to {
  opacity: 0;
}

.question-card.slide-fade-enter-active .answer-card,
.question-card.slide-fade-leave-active .answer-card {
  transition: all 0.5s ease;
}

.question-card.slide-fade-enter-from .answer-card,
.question-card.slide-fade-leave-to .answer-card {
  opacity: 0;
}

.question-card.slide-fade-enter-active .question-image,
.question-card.slide-fade-leave-active .question-image {
  transition: all 0.5s ease;
}

.question-card.slide-fade-enter-from .question-image,
.question-card.slide-fade-leave-to .question-image {
  opacity: 0;
}

.question-image {
  width: auto;
  height: 35vh;
  margin-bottom: 20px;
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: pointer;
}

@media (max-width: 800px) { .question-image { 
  height: auto;
  width: 31vh;
  max-height: 80vh;
  margin-bottom: 20px;
  border-radius: 8px;
  margin-bottom: 16px;
}
}

.answer-row {
  display: flex;
  justify-content: space-between;
}

.answer-card-container {
  width: 48%;
}

.answer-card {
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  color: #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.5s;
}

.answer-card:hover {
  background-color: #777;
}

.answer-card.selected {
  background-color: #999;
}

.answer-card.correct {
  background-color: #28a745; /* Green background for correct answer */
  color: white;
}

.answer-card.incorrect {
  background-color: #dc3545; /* Red background for incorrect answer */
  color: white;
}

.submit-button-section{
  position: relative;
  margin-bottom: 75px;
}

.check-button {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-top: 16px;
  padding: 12px 24px;
  background-color: #1027a8;
  color: white;
  border: none;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.next-button {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-top: 16px;
  padding: 12px 24px;
  background-color: #1027a8;
  color: white;
  border: none;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.submit-button:hover {
  background-color: #0056b3;
}

.result {
  margin-top: 16px;
  font-size: 18px;
  font-weight: bold;
}

.rating {
  font-size: 24px;
  padding-block: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  transition: opacity 0.5s ease-in-out;
}

.average-rating{
  margin-right: 16px;
}

.rating-sent{
  transition: opacity 0.5s ease-in-out;
}

.star {
  cursor: pointer;
  color: #ccc;
}

.star:hover{
  color: #ffcc00;
}

.star.active {
  color: #ffcc00;
}

.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.fullscreen-image-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100vh;
  overflow: auto;
}

.fullscreen-image {
  width: auto;
  height: auto;
  min-width: 100%;
  min-height: 100%;
  max-width: 160vh;
  max-height: 160vh;
  object-fit: contain;
}
@media (max-width: 800px) { .fullscreen-image { 
  width: 43vh;
  height: auto;
  max-width: 45vh;
  max-height: 100vh;
  object-fit: contain;
}
}

.fullscreen-close-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 24px;
  color: #fff;
}
</style>
