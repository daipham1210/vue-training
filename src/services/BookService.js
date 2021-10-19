import http from "@services/http"

export default {
  getBooks() {
    return http.get('/books')
  },
  getBook(bookId) {
    return http.get(`/books/${bookId}`)
  },
  createBook(data) {
    return http.post('/books/', data)
  },
  updateBook(id, data) {
    return http.put(`/books/${id}`, data)
  },
  deleteBook(id) {
    return http.delete(`/books/${id}`)
  },
  // createBook
}