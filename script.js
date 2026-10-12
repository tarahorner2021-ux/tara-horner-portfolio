(() => {
  "use strict";

  /* ===========================================================
     1. Sticky nav: shrink/blur bg on scroll + active link tracking
     =========================================================== */
  const nav = document.getElementById("nav");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const toTopBtn = document.getElementById("toTop");

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 24);
    toTopBtn.classList.toggle("is-visible", y > 700);
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Active-link tracking via IntersectionObserver
  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = "#" + entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => sectionObserver.observe(s));
  }

  /* ===========================================================
     2. Mobile nav toggle
     =========================================================== */
  const navToggle = document.getElementById("navToggle");
  const navLinksList = document.getElementById("navLinks");

  const closeMobileNav = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navLinksList.classList.remove("is-open");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navLinksList.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMobileNav));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileNav();
  });

  /* ===========================================================
     3. Scroll-reveal animations
     =========================================================== */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${(i % 3) * 90}ms`;
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ===========================================================
     4. Accordion — "How I work"
     =========================================================== */
  const accordion = document.getElementById("accordion");
  if (accordion) {
    const items = Array.from(accordion.querySelectorAll(".accordion-item"));

    items.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      header.addEventListener("click", () => {
        const willOpen = !item.classList.contains("is-open");

        items.forEach((other) => {
          other.classList.remove("is-open");
          other.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
        });

        if (willOpen) {
          item.classList.add("is-open");
          header.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ===========================================================
     5. Magnetic hover for primary CTA buttons
     =========================================================== */
  const magneticEls = document.querySelectorAll("[data-magnetic]");
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (supportsHover) {
    magneticEls.forEach((el) => {
      let rect;
      el.addEventListener("mouseenter", () => {
        rect = el.getBoundingClientRect();
      });
      el.addEventListener("mousemove", (e) => {
        if (!rect) rect = el.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        el.style.setProperty("--btn-x", `${relX * 0.25}px`);
        el.style.setProperty("--btn-y", `${relY * 0.35}px`);
      });
      el.addEventListener("mouseleave", () => {
        el.style.setProperty("--btn-x", `0px`);
        el.style.setProperty("--btn-y", `0px`);
      });
    });
  }

  /* ===========================================================
     6. Hero collage — gentle parallax on pointer move
     =========================================================== */
  const collage = document.getElementById("heroCollage");
  if (collage && supportsHover) {
    const items = Array.from(collage.querySelectorAll(".collage-item"));
    let raf = null;
    let targetX = 0, targetY = 0;

    collage.addEventListener("mousemove", (e) => {
      const rect = collage.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
      if (!raf) raf = requestAnimationFrame(applyParallax);
    });

    collage.addEventListener("mouseleave", () => {
      targetX = 0; targetY = 0;
      if (!raf) raf = requestAnimationFrame(applyParallax);
    });

    function applyParallax() {
      items.forEach((item) => {
        const depth = parseFloat(item.dataset.depth || "0.5");
        const moveX = targetX * 24 * depth;
        const moveY = targetY * 24 * depth;
        item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
      raf = null;
    }
  }

  /* ===========================================================
     7. Feature card "video" loop — crossfades through captured frames
     =========================================================== */
  const featureLoop = document.getElementById("featureLoop");
  if (featureLoop) {
    const frames = Array.from(featureLoop.querySelectorAll(".loop-frame"));
    let loopVisible = false;
    const FRAME_MS = 6000; // slow enough to actually read each screen
    let current = 0;
    let timer = null;

    const advance = () => {
      const next = (current + 1) % frames.length;
      frames[current].classList.remove("is-active");
      frames[next].classList.add("is-active");
      current = next;
    };

    const start = () => {
      if (timer || frames.length < 2) return;
      timer = setInterval(advance, FRAME_MS);
    };
    const stop = () => {
      clearInterval(timer);
      timer = null;
    };

    // Pause while someone is hovering or focusing the card so they can read it.
    featureLoop.closest(".feature-card").addEventListener("mouseenter", stop);
    featureLoop.closest(".feature-card").addEventListener("focusin", stop);
    const resume = () => { if (loopVisible) start(); };
    featureLoop.closest(".feature-card").addEventListener("mouseleave", resume);
    featureLoop.closest(".feature-card").addEventListener("focusout", resume);

    // Only run while the card is on screen, and respect reduced-motion.
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion && "IntersectionObserver" in window) {
      const loopObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => { loopVisible = entry.isIntersecting; loopVisible ? start() : stop(); });
        },
        { threshold: 0.35 }
      );
      loopObserver.observe(featureLoop);
    } else if (!prefersReducedMotion) {
      start();
    }
  }

  /* ===========================================================
     8. Smooth-scroll for in-page anchors (fallback / offset)
     =========================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav ? nav.getBoundingClientRect().height + 24 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

})();
