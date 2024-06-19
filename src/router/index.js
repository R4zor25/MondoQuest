import { createRouter, createWebHistory } from 'vue-router'
import homePage from '@/components/home/home-page.vue'
import formPage from '@/components/form/form-page.vue'
import questionPage from '@/components/question/question-page.vue'
import loginPage from '@/components/auth/login-page.vue'
import registerPage from '@/components/auth/register-page.vue'
import leaderboardPage from '@/components/leaderboard/leaderboard-page.vue'
import storyPage from '@/components/question/story-page.vue'
import onboardingPage from '@/components/auth/onboarding-page.vue'
import galleryPage from '@/components/gallery/user-image-gallery-page.vue'

const routes = [
    {
        path: '/', name: 'home', component: homePage,
        meta: { transition: 'slide-left', requiresAuth: true },
    },
    {
        path: '/form', name: 'form', component: formPage,
        meta: { transition: 'slide-left', requiresAuth: true },
    },
    {
        path: '/question',  name: 'question', component: questionPage,
        meta: { transition: 'slide-left', requiresAuth: true },
    },
    {
        path: '/story', name: 'story', component: storyPage,
        meta: { transition: 'slide-left', requiresAuth: true },
    },
    {
        path: '/leaderboard', name: 'leaderboard', component: leaderboardPage,
        meta: { transition: 'slide-left', requiresAuth: true },
    },
    {
        path: '/gallery', name: 'gallery', component: galleryPage
    },


    {
        path: '/onboarding', name: 'onboarding', component: onboardingPage
    },
    {
        path: '/login', name: 'login', component: loginPage
    },
    {
        path: '/register', name: 'register', component: registerPage
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user')
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
      next('/onboarding')
    } else {
      next()
    }
  })

export default router
