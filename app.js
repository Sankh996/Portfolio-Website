/**
 * Sankhadeep Ganguly - Portfolio Application Controller
 * High-performance vanilla JavaScript logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Switcher (Dark / Light)
  initThemeSwitcher();

  // 2. Typewriter Effect in Hero
  initTypewriter();

  // 3. Navigation Scroll Spy & Mobile Menu
  initNavigation();

  // 4. Project Category Filtering & Modal Deep-Dive
  initProjects();

  // 5. Contact Hub, Copy-to-Clipboard & Form Handling
  initContactHub();

  // 6. Interactive 3D Card Tilt
  init3DTilt();

  // 7. Resume Viewer Modal
  initResumeModal();
});

/* ==========================================================================
   1. Theme Switcher
   ========================================================================== */
function initThemeSwitcher() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check localStorage or system preference
  const savedTheme = localStorage.getItem('sankhadeep_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('sankhadeep_theme', newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} theme`);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }
}

/* ==========================================================================
   2. Dynamic Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const typedTextEl = document.getElementById('typed-text');
  if (!typedTextEl) return;

  const roles = [
    "Co-Founder @ Near Hai",
    "Computer Science Engineer",
    "AI & Machine Learning Developer",
    "OCI Multicloud Architect Certified",
    "Microsoft Azure AI-900 Certified",
    "National Hackathon Finalist"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at full text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new text
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. Navigation & Scroll Spy
   ========================================================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const backToTopBtn = document.getElementById('back-to-top');

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        if (mobileToggle) mobileToggle.textContent = '☰';
      });
    });
  }

  // Scroll spy & back to top
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar blur/shadow effect
    if (scrollY > 50) {
      navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Highlight active section
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   4. Projects Filter & Interactive Modal
   ========================================================================== */
const PROJECTS_DATA = {
  nearhai: {
    title: "Near Hai – Hyperlocal Discovery Platform",
    subtitle: "Co-Founder & Lead Developer | Bharat Mandapam Startup Finalist",
    badge: "Startup Prototype",
    category: "Startups & Full-Stack",
    description: "Developed a comprehensive hyperlocal discovery platform that connects urban residents with nearby neighbourhood shops, essential services, transport routes, and live local events using interactive digital mapping.",
    highlights: [
      "Selected as National Finalist among 25,000+ registered teams in India Innovates Startup Hackathon (organized by Delhi Municipal Corporation at Bharat Mandapam, Pragati Maidan, New Delhi).",
      "Designed real-time geolocation query framework and intuitive user interface for seamless location-based discovery.",
      "Collaborated with a cross-functional team of 5 to engineer scalable software architecture.",
      "Delivered a live interactive prototype presented to national jury panels and municipal stakeholders."
    ],
    techStack: ["Web Development", "Geolocation APIs", "Interactive Maps", "JavaScript", "Real-Time Data", "UI/UX Framework"],
    github: "https://github.com/Sankh996",
    demo: "#"
  },
  agriai: {
    title: "AgriAI – Soil Monitoring & Fake Fertilizer Detection",
    subtitle: "Team Lead | Square Hack 2025 – IIT Delhi Finalist",
    badge: "AI & Computer Vision",
    category: "AI & Hackathons",
    description: "An intelligent agricultural technology software system combining Computer Vision AI models for soil pH & texture detection with cryptographic QR verification to protect farmers from counterfeit fertilizers.",
    highlights: [
      "Led a 4-member engineering team to become Finalists among 600+ teams in Square Hack 2025 (IIT Delhi Hackathon, organized by The Tale of Humankind and Ashoka Innovators).",
      "Trained custom image classification AI models using Google Teachable Machine to identify soil classifications and estimated pH levels from camera feeds.",
      "Built an anti-counterfeit QR scanning and verification pipeline that differentiates legitimate certified fertilizer packages from fraudulent replicas.",
      "Engineered an easy-to-use farmer-centric UI for instant field diagnostics."
    ],
    techStack: ["Python", "Teachable Machine", "Computer Vision", "AI Image Classification", "QR Code Verification", "UI Prototyping"],
    github: "https://github.com/Sankh996",
    demo: "#"
  },
  smartlights: {
    title: "IoT-Based Smart Street Lighting System",
    subtitle: "Embedded Systems & Smart City Project | Chandigarh University",
    badge: "IoT & Embedded",
    category: "IoT & Hardware",
    description: "An automated smart city street lighting energy management solution designed with Arduino and Infrared (IR) motion detection sensors to optimize electricity usage by dynamically illuminating only when traffic or pedestrians are present.",
    highlights: [
      "Constructed a hardware prototype utilizing Arduino microcontroller, infrared motion sensors, and high-efficiency LED arrays.",
      "Programmed real-time sensor polling loops to detect approaching vehicles and dynamically adjust brightness levels.",
      "Achieved significant power consumption reduction compared to static traditional grid lighting.",
      "Demonstrated practical implementation of IoT and sensor automation in sustainable smart city infrastructure."
    ],
    techStack: ["Arduino IDE", "C/C++", "Infrared (IR) Sensors", "Embedded Systems", "Hardware Prototyping", "Energy Optimization"],
    github: "https://github.com/Sankh996",
    demo: "#"
  }
};

function initProjects() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const modalOverlay = document.getElementById('project-modal');
  const modalContent = document.getElementById('project-modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          card.classList.add('animate-fade-in-up');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Details Modal Triggers
  const detailButtons = document.querySelectorAll('.view-project-details-btn');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const project = PROJECTS_DATA[projectId];
      if (project && modalOverlay && modalContent) {
        populateProjectModal(project);
        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  function populateProjectModal(project) {
    const techBadgesHtml = project.techStack
      .map(t => `<span class="tech-badge" style="color:var(--accent-cyan);">${t}</span>`)
      .join('');

    const highlightsHtml = project.highlights
      .map(h => `<li style="margin-bottom: 0.6rem; padding-left: 1.5rem; position: relative;"><span style="position:absolute; left:0; color:var(--accent-cyan);">▹</span>${h}</li>`)
      .join('');

    modalContent.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span class="timeline-badge" style="margin-bottom: 0.75rem; display:inline-block;">${project.badge}</span>
        <h2 style="font-size: 1.75rem; margin-bottom: 0.35rem;">${project.title}</h2>
        <p style="color: var(--accent-cyan); font-weight: 600; font-size: 1rem;">${project.subtitle}</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text-primary);">Overview</h4>
        <p style="color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem;">${project.description}</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--text-primary);">Key Architectural Highlights & Outcomes</h4>
        <ul style="list-style: none; color: var(--text-secondary); font-size: 0.92rem; line-height: 1.5;">
          ${highlightsHtml}
        </ul>
      </div>

      <div style="margin-bottom: 1.75rem;">
        <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text-primary);">Technologies & Tools</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${techBadgesHtml}
        </div>
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap; border-top: 1px solid var(--border-glass); padding-top: 1.25rem;">
        <a href="${project.github}" target="_blank" class="btn btn-primary btn-sm">
          <span>GitHub Repository</span> ↗
        </a>
        <a href="https://www.linkedin.com/in/sankhadeep-ganguly-8612a0269/" target="_blank" class="btn btn-outline btn-sm">
          <span>Discuss Project</span>
        </a>
      </div>
    `;
  }
}

/* ==========================================================================
   5. Contact Hub, Copy Toast & Form Validation
   ========================================================================== */
function initContactHub() {
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  const contactForm = document.getElementById('portfolio-contact-form');

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'sankhadeepganguly4@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('📋 Email copied to clipboard: sankhadeepganguly4@gmail.com');
      }).catch(() => {
        showToast('Email: sankhadeepganguly4@gmail.com');
      });
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('⚠️ Please fill in all required fields.');
        return;
      }

      // Simulate sending
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending message...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        // Open user's default email client pre-filled as fallback
        const mailtoUrl = `mailto:sankhadeepganguly4@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
        window.location.href = mailtoUrl;

        showToast('✅ Message prepped! Opening your email client...');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 700);
    });
  }
}

/* ==========================================================================
   Toast Notification Generator
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('portfolio-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portfolio-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   6. Interactive 3D Card Tilt
   ========================================================================== */
function init3DTilt() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   7. Resume Viewer Modal
   ========================================================================== */
function initResumeModal() {
  const viewResumeBtns = document.querySelectorAll('.open-resume-btn');
  const resumeModal = document.getElementById('resume-modal');
  const resumeCloseBtn = document.getElementById('resume-close-btn');

  if (!resumeModal) return;

  viewResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      resumeModal.classList.add('active');
    });
  });

  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', () => {
      resumeModal.classList.remove('active');
    });
  }

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      resumeModal.classList.remove('active');
    }
  });
}
