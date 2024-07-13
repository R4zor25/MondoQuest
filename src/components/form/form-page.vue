<template>

  <div class="frame">
    <Navbar class="navbar" @toggle-sidebar="toggleSidebar" />
    <Sidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
  <div class="container" >
  <form >
    <div class="container">
  <h1 class="mb-5">Kérdés létrehozó form</h1>

  <form @submit.prevent="sendQuestion">
    <!-- Title Input -->
    <div>
      <label for="title" class="form-label">Cím</label>
      <input type="text" class="form-control" id="title" placeholder="Adja meg a címet" v-model="title" required>
    </div>

    <!-- Description Input -->
    <div>
      <label for="description" class="form-label">Leírás</label>
      <textarea class="form-control" id="description" rows="3" placeholder="Adja meg a kérdés leírását" v-model="description"></textarea>
    </div>

    <div>
      <label for="dropdown1" class="form-label">Válasz fajtája</label>
      <select class="form-select" id="dropdown1" v-model="solutionType">
        <option selected value="choice">Négy válaszlehetőség</option>
        <option value="gallows">Akasztófa</option>
        <option value="image">Kép</option>
      </select>
    </div>

    <!-- Single Choice Input -->
    <div class="mb-3" v-if="solutionType === 'choice'">
      <label for="singleChoice" class="form-label">Első válaszlehetőség (MINDIG EZ LEGYEN A HELYES, lekérésnél random sorrend lesz mindig)</label>
      <input type="text" class="form-control" id="singleChoice" placeholder="Roksi" v-model="answers[0].answerText" required>
      <label for="singleChoice" class="form-label">Második válaszlehetőség</label>
      <input type="text" class="form-control" id="singleChoice" placeholder="Eriszü" v-model="answers[1].answerText" required>
      <label for="singleChoice" class="form-label">Harmadik válaszlehetőség</label>
      <input type="text" class="form-control" id="singleChoice" placeholder="Rudi" v-model="answers[2].answerText" required>
      <label for="singleChoice" class="form-label">Negyedik válaszlehetőség</label>
      <input type="text" class="form-control" id="singleChoice" placeholder="Farsi" v-model="answers[3].answerText" required>
    </div>

    <div class="mb-3" v-if="solutionType === 'gallows'">
      <label for="singleChoice" class="form-label">Első válaszlehetőség</label>
      <input type="text" class="form-control" id="singleChoice" placeholder="Roksi" v-model="answers[0].answerText" required>
    </div>

    <!-- Dropdown 1 -->
    <div class="mb-3">
      <label for="dropdown1" class="form-label">Kérdés Típusa</label>
      <select class="form-select" id="dropdown1" v-model="questionType">
        <option v-for="(value, key) in questionTypes" :key="key" :value="value">
          {{ translateType(value) }}
        </option>
      </select>
    </div>

    <div class="mb-3" v-if="questionType === 'IMAGE' || solutionType === 'image'">
      <label for="imageUpload" class="form-label">Kép hozzáadása</label>
      <input class="form-control-file" @change="handleFileUpload"  type="file" id="imageUpload" accept="image/*" :required="questionType !== 'INTERACTIVE'">
    </div>

    <!-- GIF Upload -->
    <div class="mb-3" v-if="questionType === 'GIF'">
      <label for="gifUpload" class="form-label">Upload GIF</label>
      <input class="form-control" @change="handleFileUpload" type="file" id="gifUpload" accept="image/gif" required>
    </div>

    <!-- Audio Upload -->
    <div class="mb-3" v-if="questionType === 'AUDIO'">
      <label for="audioUpload" class="form-label">Upload Audio</label>
      <input class="form-control" @change="handleFileUpload" type="file" id="audioUpload" accept="audio/*">
    </div>

    <div class="mb-3" v-if="questionType === 'VIDEO'">
      <label for="singleChoice" class="form-label">Video Link (Youtube, lehetőleg unlisted, de jöhet bármi)</label>
      <input type="text" class="form-control" id="singleChoice" placeholder="Adja meg a Youtube linket">
    </div>

    <!-- Dropdown 2 -->
    <div class="mb-3">
      <label for="dropdown2" class="form-label">Kérdés nehézsége</label>
      <select class="form-select" id="dropdown2" v-model="questionDifficulty">
        <option v-for="(value, key) in difficulties" :key="key" :value="value">
          {{ translateDifficulty(value) }}
        </option>
      </select>
    </div>

    <div>
      <button type="submit" class="btn btn-primary">Kérdés létrehozása</button>
    </div> 
    
  </form>
  </div>
  </form>
</div>
</div>
</template>

<script>
import axios from 'axios';
import QuestionDifficulty from '../model/QuestionDifficulty';
import QuestionType from '../model/QuestionType';
import Navbar from '../component/navbar-component.vue';
import Sidebar from '../component/new-sidebar-component.vue';
import store from '@/store';

export default {
  components: {
    Navbar, Sidebar
  },
    data(){
        return{
          isSidebarVisible: true,
          difficulties: QuestionDifficulty,
          questionTypes: QuestionType,
            title: '',
            description: '',
            questionType: QuestionType.TEXT,
            answers:[{
              answerText: '',
            }, {
              answerText: '',
            }, {
              answerText: '',
            }, {
              answerText: '',
            }],
            questionDifficulty: QuestionDifficulty.VERY_EASY,
            solutionType: 'choice',
            selectedFile: null,
            base64Image: '',
            token: null
        }
    },
    methods:{
      toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
      translateDifficulty(value) {
      return QuestionDifficulty.toString(value);
    },
    translateType(value) {
      return QuestionType.toString(value);
    },
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
      async sendQuestion(){
        let payload = {
          title: this.title,
          description: this.description,
          answers: this.answers,
          correctAnswer: this.answers[0],
          questionDifficulty: this.questionDifficulty,
          questionType: this.questionType,
          file: this.base64Image
        };
        axios.post('https://mondo-quest.fly.dev/api/question/create', payload, {
          headers: {
            'Authorization': `Bearer ${this.token}` // Beállítjuk a header-t, hogy tartalmazza a JWT tokent
          }
        }).then(response => {
          alert('Sikeres feltöltés', response.data);
        })
        .catch(error => {
          alert(`Valami szar ${error.toString()}`, );
        });
      }
    },
    mounted() {
      this.token = store.getters.getUser.token
    }
}
</script>

<style scoped>
.frame {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh; /* minimum magasság a képernyő magassága */
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

h1, h2, h3, h4, h5, h6, label {
  color: #ccc;
}
</style>