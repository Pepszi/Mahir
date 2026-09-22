import { initHeroScroll } from "./features/hero-scroll.js";
import { initMobileNav } from "./features/mobile-nav.js";
import { initStudioSwiper } from "./features/studio-swiper.js";
import { initContactForm } from "./features/contact-form.js";
import { initFooterYear } from "./features/footer-year.js";
import { initAccordion } from "./features/accordion.js";

function safeInit(label, init) {
  try {
    const result = init();

    if (result && typeof result.then === "function") {
      result.catch((error) => {
        console.error(`${label} failed to initialize`, error);
      });
    }
  } catch (error) {
    console.error(`${label} failed to initialize`, error);
  }
}

// Initialize local features first so the contact form never waits on CDN scripts.
safeInit("contact form", initContactForm);
safeInit("mobile nav", initMobileNav);
safeInit("footer year", initFooterYear);
safeInit("accordion", initAccordion);
safeInit("hero scroll", initHeroScroll);
safeInit("studio swiper", initStudioSwiper);
