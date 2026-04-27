export function initMobileNav() {
  const siteNav = document.querySelector(".site-nav");
  const navToggle = siteNav?.querySelector(".nav-toggle");
  const mobileNavMenu = siteNav?.querySelector(".mobile-nav-menu");

  if (!siteNav || !navToggle || !mobileNavMenu) {
    return;
  }

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
