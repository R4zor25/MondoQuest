<template>
  <div class="register-container">
    <h1>MondoQuest Kvíz</h1>
    <H1> Regisztráció </H1>
    <img :src="MondoQuestImage" alt="MondoQuest Logo">
    <div class="register-box">
      <div class="register-icon">
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
        <button @click="registerUser" class="btn">Fiók létrehozása</button>
        <button @click="navigateToLogin" class="btn">Bejelentkező képernyő</button>
      </form>
    </div>
  </div>
</template>
  
  <script>
  import { mapActions } from 'vuex'
  import MondoQuestImage from '@/assets/badge.png';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        MondoQuestImage: MondoQuestImage
      }
    },
    methods: {
      ...mapActions(['register']),
      registerUser() {
  // Trim the username and password to remove leading and trailing whitespace
  const trimmedUsername = this.username.trim();
  const trimmedPassword = this.password.trim();

  // Check if either the username or password is empty after trimming
  if (!trimmedUsername || !trimmedPassword) {
    alert('Egyik mező sem lehet üres!');
    return;
  }

        this.register({ username: this.username, password: this.password })
          .then(() => {
            this.$router.replace('/')
          })
          .catch(error => {
            alert(this.username + ' ' + this.password);
            console.error('Error registering:', error)
            alert(`Regisztrációs sikertelen : ${error.message}`)
          })
      },
      navigateToLogin() {
        this.$router.replace('/login')
      }
    }
  }
  </script>
  
  <style scoped>
 .register-container {
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

.register-box {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: center;
    width: 300px;
}

.register-icon {
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
  