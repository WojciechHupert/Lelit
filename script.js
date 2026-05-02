// Phone Slideshow (legacy - kept for backwards compatibility)
var currentSlide = 0;
var screens = document.querySelectorAll('.phone-screen:not(#screen-typing)');
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

// ═══════════════════════════════════════════════════════════════
// Typing Conversation Simulation (The Weight of Smoke)
// ═══════════════════════════════════════════════════════════════
var typingConversation = [
  { from: 'recv', text: 'Still up?', time: '11:42 PM' },
  { from: 'sent', text: 'Yeah. Quiet night?', time: '11:43 PM' },
  { from: 'recv', text: 'Quieter than usual. I was sitting by the fountain and I started thinking about something.', time: '11:44 PM' },
  { from: 'sent', text: 'What about?', time: '11:45 PM' },
  { from: 'recv', text: 'You ever hear the story about Sir Walter Raleigh?', time: '11:46 PM' },
  { from: 'sent', text: 'The guy with the cloak and the puddle?', time: '11:46 PM' },
  { from: 'recv', text: 'That\'s him. He\'s also the one who brought tobacco to England. Apparently the Queen picked up the habit because of him.', time: '11:47 PM' },
  { from: 'recv', text: 'One day he made a bet with her. Told her he could measure the weight of smoke.', time: '11:48 PM' },
  { from: 'sent', text: 'That\'s impossible.', time: '11:48 PM' },
  { from: 'recv', text: 'That\'s what she said. But he did it.', time: '11:49 PM' },
  { from: 'recv', text: 'He weighed a cigar before he smoked it. Then he smoked it, carefully, and collected all the ash. Weighed the ash and the butt together. Subtracted that from the original weight.', time: '11:50 PM' },
  { from: 'recv', text: 'The difference was the weight of the smoke.', time: '11:51 PM' },
  { from: 'sent', text: 'That\'s actually kind of beautiful.', time: '11:52 PM' },
  { from: 'recv', text: 'I think about that story a lot. Measuring something that everyone assumes can\'t be measured. Proving it has weight, even when it looks like nothing.', time: '11:53 PM' },
  { from: 'sent', text: 'You\'re thinking about the people here.', time: '11:54 PM' },
  { from: 'recv', text: 'I\'m always thinking about the people here.', time: '11:55 PM' },
  { from: 'recv', text: 'Sometimes I wonder if that\'s what we\'re doing. Weighing something no one thinks can be weighed. Their ordinary days. Their small kindnesses. The conversations no one writes down.', time: '11:57 PM' },
  { from: 'sent', text: 'And the difference is what matters.', time: '11:58 PM' },
  { from: 'recv', text: 'Yeah. The difference is the whole point.', time: '11:59 PM' },
];

var typingStarted = false;
var typingMsgIndex = 0;

function startTypingConversation() {
  var chatContainer = document.getElementById('typing-chat');
  var statusEl = document.getElementById('wa-typing-status');
  if (!chatContainer || typingStarted) return;
  typingStarted = true;
  typingMsgIndex = 0;
  showNextTypingMessage(chatContainer, statusEl);
}

function showNextTypingMessage(chatContainer, statusEl) {
  if (typingMsgIndex >= typingConversation.length) {
    if (statusEl) statusEl.textContent = 'last seen today at 11:59 PM';
    return;
  }

  var msg = typingConversation[typingMsgIndex];
  var isRecv = msg.from === 'recv';

  // Show typing indicator first
  if (isRecv && statusEl) {
    statusEl.textContent = 'typing...';
  }
  
  var typingDelay = isRecv ? 800 + Math.random() * 1200 + (msg.text.length * 15) : 400 + Math.random() * 600;

  // Create and show typing dots for received messages
  var typingDots = null;
  if (isRecv) {
    typingDots = document.createElement('div');
    typingDots.className = 'wa-msg wa-recv';
    typingDots.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    chatContainer.appendChild(typingDots);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  setTimeout(function() {
    // Remove typing dots
    if (typingDots) {
      typingDots.remove();
    }
    
    // Create the actual message
    var msgEl = document.createElement('div');
    msgEl.className = 'wa-msg ' + (isRecv ? 'wa-recv' : 'wa-sent') + ' chat-msg-animated';
    
    var timeHtml = isRecv 
      ? '<span class="wa-time">' + msg.time + '</span>'
      : '<span class="wa-time">' + msg.time + ' <span class="wa-ticks">&#10003;&#10003;</span></span>';
    
    msgEl.innerHTML = '<p>' + msg.text + '</p>' + timeHtml;
    chatContainer.appendChild(msgEl);
    
    // Trigger animation
    requestAnimationFrame(function() {
      msgEl.classList.add('visible');
    });

    // Update status
    if (statusEl) {
      statusEl.textContent = isRecv ? 'online' : 'last seen today at ' + msg.time;
    }

    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    typingMsgIndex++;
    
    // Delay before next message
    var nextDelay = 600 + Math.random() * 800;
    showNextTypingMessage(chatContainer, statusEl);
  }, typingDelay);
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", (event) => {
  // 1. Custom Cursor
  const cursor = document.querySelector('.custom-cursor');
  const hoverElements = document.querySelectorAll('a, button, .slide-btn, .dot, .wa-send, .hero-cta, .cta-button, .phone-frame, .img-ph, .diagram-point, .nav-toggle');
  
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
      // If it's a diagram point, expand ALL diagram points in that section
      if (item.classList.contains('diagram-point')) {
        const allDiagramPoints = document.querySelectorAll('.diagram-point.expandable');
        const isExpanding = !item.classList.contains('expanded');
        allDiagramPoints.forEach(p => {
          if (isExpanding) p.classList.add('expanded');
          else p.classList.remove('expanded');
        });
      } else {
        // Normal toggle for roadmap items
        item.classList.toggle('expanded');
      }
      
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

    // Typing conversation - trigger when phone section scrolls into view
    if (document.getElementById('typing-chat')) {
      ScrollTrigger.create({
        trigger: '.comms-section',
        start: 'top 80%',
        onEnter: function() {
          startTypingConversation();
        },
        once: true
      });
    }

    // 5. Mobile Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-menu-inner a');

    if (navToggle && mobileMenu) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        // Prevent scrolling when menu is open
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
      });

      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          navToggle.classList.remove('active');
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }
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
