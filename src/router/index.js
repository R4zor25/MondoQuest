import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import homePage from '@/components/home/home-page.vue'
import formPage from '@/components/form/form-page.vue'
import questionPage from '@/components/question/question-page.vue'
import loginPage from '@/components/auth/login-page.vue'
import registerPage from '@/components/auth/register-page.vue'
import leaderboardPage from '@/components/leaderboard/leaderboard-page.vue'
import storyPage from '@/components/question/story-page.vue'
import onboardingPage from '@/components/auth/onboarding-page.vue'
import galleryPage from '@/components/gallery/gallery-page.vue'
import interactivePage from '@/components/interactive/interactive-page.vue'

const routes = [
    {
        path: '/', name: 'home', component: homePage,
        meta: { transition: 'slide-left', requiresAuth: true },
    },
    {
        path: '/form', name: 'form', component: formPage,
        meta: { transition: 'slide-left', requiresAuth: true, requiresAdmin: true },
    },
    {
        path: '/infinite',  name: 'infinite', component: questionPage,
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
        path: '/gallery', name: 'gallery', component: galleryPage,
        meta: { transition: 'slide-left', requiresAuth: true },
    },
    {
        path: '/interactive', name: 'interactive', component: interactivePage,
        meta: { transition: 'slide-left', requiresAuth: true, requiresAdmin: true },
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
    const loggedIn = localStorage.getItem('user');
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  
    if (requiresAuth && !loggedIn) {
      next('/onboarding');
    } else {
      if (requiresAdmin) {
        const user = store.getters.getUser;
        if (user && user.user.role === 'ADMIN') {
          next();
        } else {
          next({ name: 'home' });
        }
      } else {
        next();
      }
    }
  });

export default router
