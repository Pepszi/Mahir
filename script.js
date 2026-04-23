const root = document.documentElement;
const heroSection = document.querySelector(".hero-scroll");

if (window.gsap && window.ScrollTrigger && heroSection) {
  gsap.registerPlugin(ScrollTrigger);

  const clamp01 = (value) => Math.max(0, Math.min(1, value));
  const applyHeroProgress = (rawProgress) => {
    // Reach final state at 90% scroll, then hold for the last 10%.
    const progress = clamp01(rawProgress / 0.9);
    root.style.setProperty("--hero-progress", progress.toFixed(4));
  };

  const heroTrigger = ScrollTrigger.create({
    trigger: heroSection,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate(self) {
      applyHeroProgress(self.progress);
    },
    onRefresh(self) {
      applyHeroProgress(self.progress);
    },
  });

  // Sync state on reload when page opens at a non-zero scroll position.
  const syncHeroFromScrollPosition = () => {
    ScrollTrigger.refresh();
    applyHeroProgress(heroTrigger.progress);
  };

  syncHeroFromScrollPosition();
  window.addEventListener("load", () => requestAnimationFrame(syncHeroFromScrollPosition));
  window.addEventListener("pageshow", () => requestAnimationFrame(syncHeroFromScrollPosition));
}

const siteNav = document.querySelector(".site-nav");
const navToggle = siteNav?.querySelector(".nav-toggle");
const mobileNavMenu = siteNav?.querySelector(".mobile-nav-menu");

if (siteNav && navToggle && mobileNavMenu) {
  const closeMenu = () => {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Menü megnyitása");
    mobileNavMenu.hidden = true;
  };

  const openMenu = () => {
    siteNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Menü bezárása");
    mobileNavMenu.hidden = false;
  };

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  });

  mobileNavMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!siteNav.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
}
