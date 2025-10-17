<template>
  <div>
    <!-- This component manages SEO meta tags dynamically -->
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted} from 'vue';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

const props = withDefaults(defineProps<SEOProps>(), {
  title: 'SOLAR TRANSIENTS - Electronic Music Artist | Atmospheric Soundscapes',
  description:
    'Electronic music artist creating atmospheric soundscapes, ambient soundtracks, and immersive audio experiences. Explore music, create remixes, and discover electronic soundscapes.',
  keywords:
    'electronic music, ambient music, atmospheric soundscapes, electronic artist, music production, sound design, ambient soundtracks, electronic beats',
  canonical: 'https://solar-transients.de',
  ogImage: 'https://solar-transients.de/og-image.jpg',
  ogType: 'website',
});

const updateMetaTag = (name: string, content: string, property = false) => {
  const attribute = property ? 'property' : 'name';
  let meta = document.querySelector(`meta[${attribute}="${name}"]`);

  if (meta) {
    meta.setAttribute('content', content);
  } else {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  }
};

const updateTitle = (title: string) => {
  document.title = title;
};

const updateCanonical = (url: string) => {
  let canonical = document.querySelector('link[rel="canonical"]');

  if (canonical) {
    canonical.setAttribute('href', url);
  } else {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', url);
    document.head.appendChild(canonical);
  }
};

onMounted(() => {
  // Update title
  updateTitle(props.title);

  // Update meta tags
  updateMetaTag('description', props.description);
  updateMetaTag('keywords', props.keywords);
  updateMetaTag('og:title', props.title, true);
  updateMetaTag('og:description', props.description, true);
  updateMetaTag('og:type', props.ogType, true);
  updateMetaTag('og:image', props.ogImage, true);
  updateMetaTag('twitter:title', props.title);
  updateMetaTag('twitter:description', props.description);
  updateMetaTag('twitter:image', props.ogImage);

  // Update canonical URL
  updateCanonical(props.canonical);
});

onUnmounted(() => {
  // Reset to default values when component is destroyed
  updateTitle(
    'SOLAR TRANSIENTS - Electronic Music Artist | Atmospheric Soundscapes',
  );
  updateMetaTag(
    'description',
    'Electronic music artist creating atmospheric soundscapes, ambient soundtracks, and immersive audio experiences. Explore music, create remixes, and discover electronic soundscapes.',
  );
  updateMetaTag(
    'keywords',
    'electronic music, ambient music, atmospheric soundscapes, electronic artist, music production, sound design, ambient soundtracks, electronic beats',
  );
  updateCanonical('https://solar-transients.de');
});
</script>
