import axios from 'axios'

// Single source of truth for the API base URL. Override without touching
// tracked files by creating a .env.local with VUE_APP_API_BASE_URL=...
const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:8081'
})

export default http
