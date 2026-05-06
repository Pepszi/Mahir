# Mahir Website

Static marketing/presentation website built with semantic HTML, modern CSS, and Vanilla JavaScript modules.

## Technologies Used

### Core Frontend
- HTML5
- CSS3
- Vanilla JavaScript (ES modules)

### UI and Animation Libraries
- [Swiper](https://swiperjs.com/) for the studio/gallery slider
- [GSAP](https://gsap.com/) for animations
- GSAP ScrollTrigger for scroll-driven hero effects

### External Services and Integrations
- Cloudflare R2 public asset hosting (`.r2.dev` images/video)
- [FormSubmit](https://formsubmit.co/) for contact form delivery
- Google Maps (embed iframe + location link)

### Runtime Delivery
- [jsDelivr](https://www.jsdelivr.com/) CDN for loading GSAP and Swiper assets in the browser

## Project Structure

```text
.
├── index.html
├── css/
│   └── main.css
└── js/
    ├── main.js
    └── features/
        ├── contact-form.js
        ├── footer-year.js
        ├── hero-scroll.js
        ├── mobile-nav.js
        └── studio-swiper.js
```

## Run Locally

No build step is required. Serve the project as static files:

```bash
cd /Users/pepszi/Documents/Dev/Mahir
python3 -m http.server 5500
```

Then open:

- `http://localhost:5500`

## Notes

- This repository currently has no `package.json` and no bundler configuration.
- Third-party libraries are loaded via CDN script/link tags in `index.html`.
