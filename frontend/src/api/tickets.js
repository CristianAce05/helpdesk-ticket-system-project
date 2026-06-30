import axios from 'axios'

const BASE_URL = 'http://localhost:5001'

const authHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
})

export const getTickets = (token) =>
  axios.get(`${BASE_URL}/api/tickets`, authHeaders(token))

export const createTicket = (token, data) =>
  axios.post(`${BASE_URL}/api/tickets`, data, authHeaders(token))

export const updateTicket = (token, id, data) =>
  axios.put(`${BASE_URL}/api/tickets/${id}`, data, authHeaders(token))

export const deleteTicket = (token, id) =>
  axios.delete(`${BASE_URL}/api/tickets/${id}`, authHeaders(token))

export const getComments = (token, ticketId) =>
  axios.get(`${BASE_URL}/api/tickets/${ticketId}/comments`, authHeaders(token))

export const addComment = (token, ticketId, content) =>
  axios.post(`${BASE_URL}/api/tickets/${ticketId}/comments`, { content }, authHeaders(token))
