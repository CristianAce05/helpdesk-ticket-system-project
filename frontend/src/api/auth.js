import axios from 'axios'

const BASE_URL = 'http://localhost:5001/api/auth'

export const register = (email, password, name, role) =>
  axios.post(`${BASE_URL}/register`, { email, password, name, role })

export const login = (email, password) =>
  axios.post(`${BASE_URL}/login`, { email, password })
