export function initStudioSwiper() {
  const studioSwiperElement = document.querySelector(".studio-swiper");

  if (!window.Swiper || !studioSwiperElement) {
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
