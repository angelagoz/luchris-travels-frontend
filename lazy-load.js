// ============================================
// LAZY LOADING - Carga perezosa de imágenes
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Usar Intersection Observer para lazy loading
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;

        // Cargar imagen desde data-src
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
        }

        // Cargar background-image desde data-bg
        if (img.dataset.bg) {
          img.style.backgroundImage = `url('${img.dataset.bg}')`;
          img.removeAttribute('data-bg');
          img.classList.add('loaded');
        }

        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px' // Cargar 50px antes de que sea visible
  });

  // Observar todas las imágenes con lazy-load
  document.querySelectorAll('img[data-src], [data-bg]').forEach(img => {
    imageObserver.observe(img);
  });

  // Cargar imágenes de background en cards
  const bgElements = document.querySelectorAll('[data-bg]');
  bgElements.forEach(el => {
    imageObserver.observe(el);
  });
});

// Agregar atributo loading="lazy" a imágenes nuevas
export function lazyLoadImage(src) {
  const img = new Image();
  img.loading = 'lazy';
  img.src = src;
  return img;
}

// Precargar imágenes críticas (hero, etc)
export function preloadImage(src) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
}

// Detectar soporte para formatos modernos
export function supportsWebP() {
  const canvas = document.createElement('canvas');
  return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
}

// Obtener URL de imagen optimizada
export function getOptimizedImageUrl(url, width = 800, quality = 80) {
  if (!url) return url;

  // Si es de Unsplash, agregar parámetros de optimización
  if (url.includes('unsplash.com') || url.includes('images.unsplash.com')) {
    return `${url}?w=${width}&q=${quality}&auto=format&fit=crop`;
  }

  // Si es de via.placeholder.com, agregar parámetros
  if (url.includes('via.placeholder.com')) {
    return `${url}?text=${width}x${width}`;
  }

  return url;
}

console.log('✅ Lazy Loading inicializado');
