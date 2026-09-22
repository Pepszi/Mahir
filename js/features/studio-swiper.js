const SWIPER_URL = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.mjs";

export async function initStudioSwiper() {
  const studioSwiperElement = document.querySelector(".studio-swiper");

  if (!studioSwiperElement) {
    return;
  }

  let Swiper;

  try {
    const swiperModule = await import(SWIPER_URL);
    Swiper = swiperModule.Swiper ?? swiperModule.default;
  } catch (error) {
    console.error("Failed to load Swiper", error);
    return;
  }

  if (!Swiper) {
    return;
  }

  new Swiper(studioSwiperElement, {
    slidesPerView: 1.2,
    spaceBetween: 24,
    speed: 500,
    navigation: {
      prevEl: ".gallery-button-prev",
      nextEl: ".gallery-button-next",
    },
    pagination: {
      el: ".gallery-pagination",
      clickable: true,
    },
    breakpoints: {
      901: {
        slidesPerView: 2.2,
      },
    },
  });
}
