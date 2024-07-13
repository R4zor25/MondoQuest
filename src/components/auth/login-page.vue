<template>
  <div class="login-container">
    <h1>MondoQuest Kvíz</h1>
    <h1> Bejelentkezés </h1>
    <img :src="MondoQuestImage" alt="MondoQuest Logo">
    <div class="login-box">
      <div class="login-icon">
      </div>
      <form @submit.prevent>
        <div class="input-group">
          <i class="bi bi-person-circle"></i>
          <input type="text" placeholder="Felhasználónév" v-model="username" required>
        </div>
        <div class="input-group">
          <i class="bi bi-lock"></i>
          <input type="password" placeholder="Jelszó" v-model="password" required>
        </div>
        <button @click="loginUser" class="btn">Bejelentkezés</button>
        <button @click="navigateToRegister" class="btn">Regisztrációs képernyő</button>
      </form>
    </div>
  </div>
</template>
  
  <script>
  import { mapActions } from 'vuex';
  import MondoQuestImage from '@/assets/badge.png';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        MondoQuestImage: MondoQuestImage,
      }
    },
    methods: {
      ...mapActions(['login']),
      loginUser() {
        this.login({ username: this.username, password: this.password })
          .then(() => {
            this.$router.replace('/')
          })
          .catch(error => {
            error
            alert('Bejelentkezés sikertelen.');
          })
      },
      navigateToRegister() {
        this.$router.replace('/register')
      }
    }
  }
  </script>
  
  <style scoped>


.login-container {
  margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-direction: column;
    background-image: url('@/assets/peak.jpeg');
    background-size: cover;
    background-position: center;
    font-family: Arial, sans-serif;
    min-height: 100vh; /* minimum magasság a képernyő magassága */
    width: 100%;
}

img {
  display: block;
  align-content: center;
  width: 50%;
  max-width:380px;
  margin-bottom: 20px;
  width: auto;
  height: auto;
}

.login-box {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: center;
    width: 300px;
}

.login-icon {
    font-size: 50px;
    color: #fff;
    margin-bottom: 20px;
}

.input-group {
    position: relative;
    margin-bottom: 20px;
}

.input-group i {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #fff;
}

.input-group input {
    width: 100%;
    padding: 10px 10px 10px 40px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 5px;
    color: #fff;
    outline: none;
}

.input-group input::placeholder {
    color: #ddd;
}

.btn {
    width: 100%;
    padding: 10px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    margin-top: 10px;
    transition: transform 0.3s ease;
}

.btn:hover {
    background: rgba(255, 255, 255, 0.3);
}

h1 {
  color: #fff;
  text-shadow: #000 0px 0px 15px;
  transition: text-shadow 0.3s ease-in-out;
  text-align: center;
  background: none;
}

  </style>
  