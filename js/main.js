/* ============================================================
   Zicheng Liu — Personal Website
   Interactions: mobile nav, scroll reveal, active link, header
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Mobile navigation toggle ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu after tapping a link
    menu.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  const header = document.querySelector(".site-header");

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ---------- Reveal sections on scroll ---------- */
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealItems.length) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    // Fallback: show everything if IntersectionObserver is unavailable
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* ---------- Highlight the active section in the nav ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav__link[href^='#']");

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;
    let currentId = "";

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      const isCurrent = link.getAttribute("href") === "#" + currentId;
      link.classList.toggle("is-active", isCurrent);
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Typewriter identity line ---------- */
  const typeTarget = document.getElementById("typewriter-text");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (typeTarget) {
    const roles = [
      "Gamer",
      "Player",
      "Researcher",
      "Project Manager",
      "AI User",
      "Builder",
      "Hardware Nerd",
      "Dual-Degree Student",
      "Lifelong Learner",
      "Community Builder",
    ];

    if (reduceMotion) {
      typeTarget.textContent = "researcher, builder, and gamer";
    } else {
      let roleIndex = 0;
      let charIndex = roles[0].length;
      let deleting = true;

      function tick() {
        const current = roles[roleIndex];

        if (deleting) {
          charIndex--;
          typeTarget.textContent = current.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            window.setTimeout(tick, 320);
            return;
          }
          window.setTimeout(tick, 45);
        } else {
          const next = roles[roleIndex];
          charIndex++;
          typeTarget.textContent = next.slice(0, charIndex);
          if (charIndex === next.length) {
            deleting = true;
            window.setTimeout(tick, 1900); // hold the full word
            return;
          }
          window.setTimeout(tick, 85);
        }
      }

      window.setTimeout(tick, 2200); // hold the first word before looping
    }
  }

  /* ---------- Interactive particle background (full page) ---------- */
  const canvas = document.getElementById("page-particles");

  if (canvas && canvas.getContext && !reduceMotion) {
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let particles = [];
    let animationId = null;
    const mouse = { x: -9999, y: -9999 };
    const ripples = [];

    const CONFIG = {
      density: 14000, // px² per particle
      maxParticles: 120,
      speed: 0.35,
      connectDist: 130,
      mouseRadius: 150,
      particleColor: "194, 65, 12", // warm accent (matches theme)
      lineColor: "28, 35, 51",
    };

    function particleCount() {
      return Math.min(
        CONFIG.maxParticles,
        Math.max(24, Math.round((width * height) / CONFIG.density))
      );
    }

    function createParticle(x, y) {
      return {
        x: x !== undefined ? x : Math.random() * width,
        y: y !== undefined ? y : Math.random() * height,
        vx: (Math.random() - 0.5) * CONFIG.speed * 2,
        vy: (Math.random() - 0.5) * CONFIG.speed * 2,
        r: Math.random() * 2.2 + 1.1,
      };
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = particleCount();
      if (particles.length > target) {
        particles.length = target;
      } else {
        while (particles.length < target) particles.push(createParticle());
      }
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections first (under particles)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distSq = dx * dx + dy * dy;
          const maxSq = CONFIG.connectDist * CONFIG.connectDist;
          if (distSq < maxSq) {
            const alpha = (1 - Math.sqrt(distSq) / CONFIG.connectDist) * 0.22;
            ctx.strokeStyle = "rgba(" + CONFIG.lineColor + "," + alpha + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion — particles gently dodge the cursor
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdistSq = mdx * mdx + mdy * mdy;
        const nearMouse =
          mdistSq < CONFIG.mouseRadius * CONFIG.mouseRadius && mdistSq > 0.01;
        if (nearMouse) {
          const mdist = Math.sqrt(mdistSq);
          const force = (1 - mdist / CONFIG.mouseRadius) * 1.1;
          p.vx += (mdx / mdist) * force;
          p.vy += (mdy / mdist) * force;
        }

        // Click ripple push
        for (let k = 0; k < ripples.length; k++) {
          const rp = ripples[k];
          const rdx = p.x - rp.x;
          const rdy = p.y - rp.y;
          const rdistSq = rdx * rdx + rdy * rdy;
          const ringSq = rp.radius * rp.radius;
          if (rdistSq < ringSq * 1.4 && rdistSq > ringSq * 0.5 && rdistSq > 0.01) {
            const rdist = Math.sqrt(rdistSq);
            p.vx += (rdx / rdist) * 1.4;
            p.vy += (rdy / rdist) * 1.4;
          }
        }

        // Damping toward normal speed
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Keep a minimum drift so particles never fully stop
        const spSq = p.vx * p.vx + p.vy * p.vy;
        if (spSq < CONFIG.speed * CONFIG.speed * 0.25) {
          p.vx += (Math.random() - 0.5) * 0.12;
          p.vy += (Math.random() - 0.5) * 0.12;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -12) p.x = width + 12;
        else if (p.x > width + 12) p.x = -12;
        if (p.y < -12) p.y = height + 12;
        else if (p.y > height + 12) p.y = -12;

        // Particles glow when close to the cursor
        if (nearMouse) {
          ctx.fillStyle = "rgba(212, 162, 78, 0.85)";
          ctx.shadowColor = "rgba(212, 162, 78, 0.9)";
          ctx.shadowBlur = 12;
        } else {
          ctx.fillStyle = "rgba(" + CONFIG.particleColor + ", 0.6)";
          ctx.shadowBlur = 0;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Expand and fade ripples
      for (let k = ripples.length - 1; k >= 0; k--) {
        const rp = ripples[k];
        rp.radius += 3.2;
        rp.alpha *= 0.93;
        if (rp.alpha < 0.03) {
          ripples.splice(k, 1);
          continue;
        }
        ctx.strokeStyle = "rgba(" + CONFIG.particleColor + ", " + rp.alpha + ")";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationId = window.requestAnimationFrame(step);
    }

    // Track the mouse across the whole page
    window.addEventListener(
      "mousemove",
      function (e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      },
      { passive: true }
    );

    document.addEventListener("mouseleave", function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    // Click ripples anywhere except on links and buttons
    document.addEventListener("click", function (e) {
      if (e.target.closest("a, button, input, textarea, select")) return;
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 8,
        alpha: 0.55,
      });
    });

    // Pause the animation when the tab is hidden (saves battery/CPU)
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        if (animationId !== null) {
          window.cancelAnimationFrame(animationId);
          animationId = null;
        }
      } else if (animationId === null) {
        animationId = window.requestAnimationFrame(step);
      }
    });

    let resizeTimer = null;
    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    });

    resize();
    animationId = window.requestAnimationFrame(step);
  }
})();
