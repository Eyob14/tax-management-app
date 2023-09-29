import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/authentication/LandingView.vue'
import RegisterView from '../views/authentication/RegisterView.vue'
import LoginView from '../views/authentication/LoginView.vue'
import UserDashboard from '../views/user/UserDashboard.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import NotFoundView from '../views/error/NotFoundView.vue'
import PrivateRoute from './PrivateRoute.vue'
import ProfileView from '../views/profile/ProfileView.vue'
import TaxHistory from '../views/admin/TaxHistory.vue'
// import AuthenticationManager from '../storage/AuthenticationManager'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
      // beforeEnter: (to, from, next) => {
      //   if (AuthenticationManager.isLoggedIn() === true) {
      //     const userRole = AuthenticationManager.getLoggedInUserRole()
      //     console.log('UserRole', userRole)
      //     if (userRole === 'admin') {
      //       next('/adminDashboard')
      //     } else if (userRole === 'user') {
      //       next('/userDashboard')
      //     }
      //   } else {
      //     next()
      //   }
      // }
    },
    {
      path: '/admin',
      component: PrivateRoute,
      children: [
        {
          path: '',
          name: 'adminDashboard',
          component: AdminDashboard
        },
        {
          path: 'history',
          name: 'taxHistory',
          component: TaxHistory
        }
      ]
    },
    {
      path: '/user',
      component: PrivateRoute,
      children: [
        {
          path: '',
          name: 'userDashboard',
          component: UserDashboard
        }
      ]
    },
    {
      path: '/profile',
      component: PrivateRoute,
      children: [
        {
          path: '',
          name: 'userProfile',
          component: ProfileView
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router
