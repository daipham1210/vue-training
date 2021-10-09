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
  updateBook(data) {
    return http.put('/books/', data)
  }
  // createBook
}