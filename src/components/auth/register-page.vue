<template>
    <div class="register">
      <h2>Regisztráció</h2>
      <form @submit.prevent>
        <div>
          <label for="username">Username</label>
          <input type="text" v-model="username" required>
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" v-model="password" required>
        </div>
        <div>
          <label for="role">Role</label>
          <select v-model="role" required>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button @click="registerUser">Regisztráció</button>
        <button @click="navigateToLogin">Bejelentkezés</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        role: 'USER'
      }
    },
    methods: {
      ...mapActions(['register']),
      registerUser() {
        this.register({ username: this.username, password: this.password })
          .then(() => {
            this.$router.replace('/login')
          })
          .catch(error => {
            console.error('Error registering:', error)
            alert('Registration failed')
          })
      },
      navigateToLogin() {
        this.$router.replace('/login')
      }
    }
  }
  </script>
  
  <style scoped>
  .register {
    max-width: 300px;
    margin: 0 auto;
  }
  </style>
  