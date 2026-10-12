/* ============================================================
   script.js — Campus Tech Fest
   ============================================================
   This file contains ALL the JavaScript that makes the page
   interactive.  Every section is commented so you can follow
   what each piece does, even if you're brand-new to JS.
   ============================================================ */

// ─── 1. WAIT FOR THE PAGE TO LOAD ────────────────────────────
// "DOMContentLoaded" fires once all the HTML has been read by
// the browser.  We wrap everything inside so we know every
// element exists before we try to use it.
document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     2. STICKY NAVBAR
     When the visitor scrolls down, we add a "scrolled" class
     to the <nav> so CSS can give it a dark background.
     ========================================================= */
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    // If we've scrolled more than 60 px, add the class
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* =========================================================
     3. MOBILE MENU (HAMBURGER TOGGLE)
     Clicking the hamburger opens / closes the link list.
     Clicking any link also closes the menu.
     ========================================================= */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked (mobile UX)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  /* =========================================================
     4. COUNTDOWN TIMER
     We pick a target date and recalculate the remaining time
     every second.
     ========================================================= */
  // Target: November 15, 2026 at 09:00 AM
  const targetDate = new Date('2026-11-15T09:00:00');

  const daysEl    = document.getElementById('countdown-days');
  const hoursEl   = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secsEl    = document.getElementById('countdown-seconds');

  function updateCountdown() {
    const now  = new Date();
    const diff = targetDate - now;  // milliseconds remaining

    if (diff <= 0) {
      // Event has started!
      daysEl.textContent    = '0';
      hoursEl.textContent   = '0';
      minutesEl.textContent = '0';
      secsEl.textContent    = '0';
      return;
    }

    // Convert milliseconds → days, hours, minutes, seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hrs  = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    daysEl.textContent    = days;
    hoursEl.textContent   = String(hrs).padStart(2, '0');
    minutesEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent    = String(secs).padStart(2, '0');
  }

  updateCountdown();                 // run once immediately
  setInterval(updateCountdown, 1000); // then every 1 second

  /* =========================================================
     5. EVENT-DETAIL MODALS
     Each "View Details" button stores data about the event
     inside data-* attributes.  We read those attributes and
     populate a modal popup.
     ========================================================= */
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle   = document.getElementById('modal-title');
  const modalDesc    = document.getElementById('modal-desc');
  const modalList    = document.getElementById('modal-list');
  const modalClose   = document.getElementById('modal-close');

  // Data for each event — stored here so the HTML stays clean
  const eventDetails = {
    hackathon: {
      title: '24-Hour Hackathon',
      desc:  'Build a working prototype in 24 hours! Teams of up to 4 members will compete to solve real-world problems using technology. Industry mentors will be available throughout the event.',
      items: [
        { label: 'Date',   value: 'Nov 15, 2026 — 9 AM to Nov 16, 9 AM' },
        { label: 'Venue',  value: 'Main Auditorium, Block A' },
        { label: 'Team',   value: '2–4 members per team' },
        { label: 'Prizes', value: '₹50,000 / ₹30,000 / ₹15,000' },
        { label: 'Tracks', value: 'HealthTech · EdTech · FinTech' }
      ]
    },
    workshop: {
      title: 'AI & ML Workshop',
      desc:  'A hands-on workshop where you\'ll train your first machine-learning model. No prior ML experience needed — just bring your laptop and curiosity!',
      items: [
        { label: 'Date',    value: 'Nov 15, 2026 — 10 AM to 1 PM' },
        { label: 'Venue',   value: 'Seminar Hall 2, Block B' },
        { label: 'Speaker', value: 'Dr. Priya Sharma, IIT Delhi' },
        { label: 'Seats',   value: 'Limited to 120 participants' },
        { label: 'Prereq',  value: 'Basic Python knowledge helpful' }
      ]
    },
    expo: {
      title: 'Robotics Expo',
      desc:  'Explore cutting-edge robotics projects built by student teams across the country. Interactive demos, drone races, and a live bot-battle arena await!',
      items: [
        { label: 'Date',     value: 'Nov 15, 2026 — 11 AM to 5 PM' },
        { label: 'Venue',    value: 'Open-Air Arena, Block C' },
        { label: 'Exhibits', value: '30+ projects on display' },
        { label: 'Highlight',value: 'Live drone race at 3 PM' },
        { label: 'Entry',    value: 'Free for all registered attendees' }
      ]
    }
  };

  // Attach click handlers to every "View Details" button
  document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.event;         // e.g. "hackathon"
      const info = eventDetails[key];

      if (!info) return;

      // Fill the modal with the event's data
      modalTitle.textContent = info.title;
      modalDesc.textContent  = info.desc;
      modalList.innerHTML    = info.items
        .map(i => `<li><strong>${i.label}:</strong> ${i.value}</li>`)
        .join('');

      // Show the overlay
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // prevent scroll behind modal
    });
  });

  // Close modal — clicking the ✕ button
  modalClose.addEventListener('click', closeModal);

  // Close modal — clicking the dark backdrop
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Close modal — pressing the Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Also close the modal when the "Register for this event" link is clicked
  const modalRegBtn = document.getElementById('modal-register-btn');
  modalRegBtn.addEventListener('click', closeModal);

  /* =========================================================
     6. REGISTRATION FORM
     We validate the inputs, then show a success message.
     NOTE: This is a front-end-only demo — there is no server
     to receive the data.  The form simply shows a confirmation
     so you can see the UI flow.
     ========================================================= */
  const regForm    = document.getElementById('register-form');
  const regSuccess = document.getElementById('register-success');

  regForm.addEventListener('submit', (e) => {
    e.preventDefault();  // stop the browser from reloading

    const name  = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const event = document.getElementById('reg-event').value;

    // Basic validation
    if (!name || !email || !event) {
      alert('Please fill out all fields.');
      return;
    }

    // Simple email format check
    if (!email.includes('@') || !email.includes('.')) {
      alert('Please enter a valid email address.');
      return;
    }

    // Hide the form, show the success message
    regForm.style.display = 'none';
    regSuccess.classList.add('visible');

    // Log to the console (for demonstration)
    console.log('Registration submitted (demo only):', { name, email, event });
  });

  /* =========================================================
     7. SCROLL-REVEAL ANIMATIONS
     Elements with the class "reveal" start invisible.
     An IntersectionObserver watches them — once they scroll
     into view, we add "visible" so CSS can animate them.
     ========================================================= */
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, { threshold: 0.15 });  // trigger when 15% visible

  reveals.forEach(el => observer.observe(el));

  /* =========================================================
     8. HERO PARTICLES (Canvas Animation)
     We draw small floating dots on a <canvas> behind the
     hero text.  Each dot drifts slowly upward and fades.
     ========================================================= */
  const canvas = document.getElementById('hero-particles');
  const ctx    = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width  = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Create an array of particle objects
  const particles = Array.from({ length: 60 }, () => createParticle());

  function createParticle() {
    return {
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600),
      r: Math.random() * 2 + 0.5,               // radius
      dx: (Math.random() - 0.5) * 0.4,           // horizontal speed
      dy: -(Math.random() * 0.3 + 0.1),          // float upward
      alpha: Math.random() * 0.5 + 0.2           // transparency
    };
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += p.dx;
      p.y += p.dy;

      // Reset particle when it drifts off screen
      if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
        particles[i] = createParticle();
        particles[i].y = canvas.height + 10;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

}); // end DOMContentLoaded
