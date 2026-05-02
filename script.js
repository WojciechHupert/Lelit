// Phone Slideshow
var currentSlide = 0;
var screens = document.querySelectorAll('.phone-screen');
var dots = document.querySelectorAll('.dot');

function showSlide(n) {
  if (screens.length === 0) return;
  screens[currentSlide].classList.remove('active');
  if(dots[currentSlide]) dots[currentSlide].classList.remove('active');
  currentSlide = (n + screens.length) % screens.length;
  screens[currentSlide].classList.add('active');
  if(dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function moveSlide(dir) { showSlide(currentSlide + dir); }
function goSlide(n) { showSlide(n); }

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", (event) => {
  // 1. Custom Cursor
  const cursor = document.querySelector('.custom-cursor');
  const hoverElements = document.querySelectorAll('a, button, .slide-btn, .dot, .wa-send, .hero-cta, .cta-button, .phone-frame, .img-ph, .diagram-point');
  
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
  }

  // 2. Magnetic Buttons
  const magnets = document.querySelectorAll('.hero-cta-button, .cta-button');
  magnets.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const position = btn.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });
    btn.addEventListener('mouseout', function() {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // 3. Expandable Elements (Roadmap & Diagram)
  const expandableItems = document.querySelectorAll('.node-content.expandable, .diagram-point.expandable');
  expandableItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('expanded');
      // Refresh GSAP ScrollTrigger after the CSS transition completes
      if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(() => ScrollTrigger.refresh(), 500);
      }
    });
  });

  // 4. Scroll Reveal Animations (GSAP)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Reveal Text & Cards
    gsap.utils.toArray('.reveal').forEach(elem => {
      gsap.fromTo(elem, 
        { autoAlpha: 0, y: 40 }, 
        {
          autoAlpha: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Parallax on Hero elements
    if (document.querySelector('.hero-split-layout')) {
      gsap.to('.hero-split-layout', {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Phone mock parallax
    if (document.querySelector('.phone-frame')) {
      gsap.fromTo('.phone-frame', 
        { y: 60 },
        {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: ".comms-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }

    // Roadmap Timeline Progress
    if (document.querySelector('.roadmap-timeline')) {
      gsap.to('.timeline-progress', {
        height: '100%',
        ease: "none",
        scrollTrigger: {
          trigger: ".roadmap-timeline",
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });
      
      gsap.utils.toArray('.node-dot:not(.pulse)').forEach(dot => {
        gsap.to(dot, {
          backgroundColor: 'var(--terracotta)',
          borderColor: 'var(--terracotta)',
          scrollTrigger: {
            trigger: dot,
            start: "top center",
            toggleActions: "play none none reverse"
          }
        });
      });
    }

    // Cinematic Zoom for Circle Image
    gsap.utils.toArray('.cinematic-zoom').forEach(img => {
      gsap.to(img, {
        scale: 1.3,
        duration: 20,
        ease: "power1.out",
        scrollTrigger: {
          trigger: img,
          start: "top 80%",
          toggleActions: "play none none none" // Play once, don't repeat or reverse
        }
      });
    });
  }
});

// World Carousel (Experience Page)
var currentWorldSlide = 0;
var worldSlides = document.querySelectorAll('.world-slide');
var worldTrack = document.querySelector('.carousel-track');
var pDots = document.querySelectorAll('.p-dot');

function showWorldSlide(n) {
  if (worldSlides.length === 0) return;
  
  worldSlides[currentWorldSlide].classList.remove('active');
  if(pDots[currentWorldSlide]) pDots[currentWorldSlide].classList.remove('active');
  
  currentWorldSlide = (n + worldSlides.length) % worldSlides.length;
  
  worldSlides[currentWorldSlide].classList.add('active');
  if(pDots[currentWorldSlide]) pDots[currentWorldSlide].classList.add('active');
  
  if (worldTrack) {
    worldTrack.style.transform = `translateX(-${(currentWorldSlide * 33.333)}%)`;
  }
}

function moveWorldSlide(dir) { showWorldSlide(currentWorldSlide + dir); }
function goWorldSlide(n) { showWorldSlide(n); }

