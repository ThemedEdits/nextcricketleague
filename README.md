# Next Cricket League — Website

## Folder Structure

```
next-cricket-league/
├── index.html              ← Main landing page
├── css/
│   ├── style.css           ← Main stylesheet
│   └── placeholder-page.css← Placeholder page styles
├── js/
│   └── main.js             ← All interactivity
├── images/                 ← Add your images here
│   └── (drop your logo and tournament/gallery photos here)
└── pages/
    ├── tournaments.html    ← Placeholder (build this later)
    └── gallery.html        ← Placeholder (build this later)
```

## How to Use

1. Open `index.html` in a browser — no server needed, works as a static site.
2. Replace the SVG logo in the navbar with your actual NCL logo PNG:
   - In `index.html`, find `.logo-mark` and replace the `<svg>` with `<img src="images/ncl-logo.png" ...>`
3. Add your actual tournament logos and gallery photos inside the `images/` folder and update the src paths.

## Sections
- **Hero** — Full-screen animated cricket pitch with stats
- **About** — NCL story + 3 founder cards (update names/bios)
- **Sponsors** — Tiered sponsor grid (Title, Gold, Supporting)
- **Tournaments** — Filter by Ongoing / Upcoming / Previous
- **Gallery** — Masonry-style grid (replace placeholders with real photos)
- **Contact** — WhatsApp, Instagram, Email cards

## Customization
- Update WhatsApp number in `index.html` (search `wa.me/923001234567`)
- Update Instagram handle (search `nextcricketleague`)
- Update email (search `info@nextcricketleague.pk`)
- Colors in `css/style.css` under `:root` variables
