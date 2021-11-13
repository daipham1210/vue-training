import { createRouter, createWebHistory } from 'vue-router'
import ListFriend from '@components/friend-contact/ListFriend.vue'
import SurveyLearning from '@components/survey/SurveyLearning.vue'
import ListGoal from '@components/ListGoal.vue'
import ListTeam from '@components/team/ListTeam.vue'
import TeamDetail from '@components/team/TeamDetail.vue'
import UserDetail from '@components/team/UserDetail.vue'
import Book from '@components/books/Book.vue'
import NotFound from '@components/layouts/NotFound.vue'
import root from '@components/provide-example/root.vue'
import Main from '@components/event-bus-example/main.vue'
import CreateBook from '@components/books/CreateBook.vue'
import ListBook from '@components/book-paginate/list-book.vue'
const routes = [
  {
    path: '/',
    alias: ['/friends'], // dành cho multi path
    name: 'ListFriend',
    component: ListFriend,
  },
  {
    path: '/surveys',
    name: 'SurveyLearning',
    component: SurveyLearning,
  },
  {
    path: '/listgoals',
    name: 'ListGoal',
    component: ListGoal,
  },
  {
    path: '/teams',
    name: 'Team',
    component: ListTeam,
  },
  {
    path: '/teams/:teamId',
    name: 'TeamDetail',
    component: TeamDetail,
  },
  {
    path: '/users/:userId',
    name: 'UserDetail',
    component: UserDetail,
  },
  {
    path: '/books',
    name: 'books',
    component: Book,
  },
  {
    path: '/list-book',
    name: 'list-book',
    component: ListBook,
  },
  {
    path: '/books/create',
    name: 'CreateBook',
    component: CreateBook,
  },
  {
    path: '/:catchAll(.*)', // truong hop ko tim thay url thi se nhay vao component nay
    component: NotFound,
  },
  {
    path: '/provide-example',
    name: 'provide-example',
    component: root,
  },
  {
    path: '/event-bus',
    name: 'event-bus',
    component: Main,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: 'active',
})

export default router
