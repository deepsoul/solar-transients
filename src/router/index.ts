import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/views/Home.vue';
import Music from '@/views/Music.vue';
import About from '@/views/About.vue';
import Contact from '@/views/Contact.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'SOLAR TRANSIENTS - Electronic Music Artist',
      description:
        'Electronic music artist creating atmospheric soundscapes and immersive audio experiences.',
    },
  },
  {
    path: '/music',
    name: 'Music',
    component: Music,
    meta: {
      title: 'Music - SOLAR TRANSIENTS',
      description:
        'Explore the latest releases and music from SOLAR TRANSIENTS.',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About - SOLAR TRANSIENTS',
      description:
        'Learn more about SOLAR TRANSIENTS and the artistic vision behind the music.',
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contact - SOLAR TRANSIENTS',
      description:
        'Get in touch with SOLAR TRANSIENTS for bookings and collaborations.',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {top: 0};
    }
  },
});

// Update document title and meta tags on route change
router.afterEach((to) => {
  document.title = (to.meta.title as string) || 'SOLAR TRANSIENTS';

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      'content',
      (to.meta.description as string) || '',
    );
  }

  // Update Open Graph title
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', (to.meta.title as string) || '');
  }

  // Update Open Graph description
  const ogDescription = document.querySelector(
    'meta[property="og:description"]',
  );
  if (ogDescription) {
    ogDescription.setAttribute(
      'content',
      (to.meta.description as string) || '',
    );
  }
});

export default router;
