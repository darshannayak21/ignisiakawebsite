# Ignisia SEO and Reach Playbook

Updated: 2026-08-02

## Positioning to preserve

The homepage should continue to own the established association between **Ignisia**, **MIT-WPU**, **AI hackathon**, and **Pune**. The club and year-round initiatives can broaden that authority, but the former hackathon copy and URL must not disappear without checking Google Search Console first.

Primary homepage topic:

- Ignisia, MIT-WPU's AI and technology community and national AI hackathon organizer in Pune

Supporting homepage topics:

- student AI club at MIT-WPU
- national AI hackathon in India
- student innovation events in Pune
- AI workshops, build sprints, and industry mentorship

## What is already implemented

- The canonical homepage URL remains `https://ignisia.tech/`.
- The title and description preserve the high-value AI hackathon topic while introducing the AI club.
- Open Graph and Twitter metadata describe the current organization accurately.
- Structured data connects the `WebSite`, `Organization`, `WebPage`, and completed 2026 `Event` as one entity graph.
- The completed event is no longer advertised as having an in-stock ticket offer.
- The sitemap contains only canonical documents. Hash fragments such as `/#about` are sections of the homepage, not separate indexable URLs.
- Gallery images now have descriptive alternative text, lazy loading, and asynchronous decoding.
- The hero video uses metadata preload instead of eager preload.
- Unused web-font families and duplicate font requests were removed.

## Ranking-preservation checklist

Before every major content or URL release:

1. Export Search Console performance for the last 16 months by **page** and **query**.
2. Save the top queries, clicks, impressions, average position, and CTR for `/`.
3. Preserve the sections and wording that answer those queries unless a replacement page is ready.
4. Keep existing URLs. If a URL must change, use a direct server-side `301` to its closest equivalent.
5. Never redirect unrelated retired pages to the homepage.
6. Crawl the deployed site and confirm canonical URLs, status codes, internal links, sitemap entries, and indexability.
7. Compare Search Console weekly for at least six weeks after a significant release.

## Next content architecture

The current site has one indexable HTML page. The roadmap events exist inside homepage modals, so they cannot independently target distinct searches. Add dedicated pages only when each can provide genuinely useful, non-duplicated information.

Recommended order:

1. `/events/` — a year-round event hub linking every initiative.
2. `/events/incubex/` — eligibility, format, dates, judging, FAQs, and past outcomes for the startup challenge.
3. `/events/i-talk/` — speakers, audience, schedule, takeaways, and event archive.
4. `/events/technophilia-innovision/` — tracks, showcase format, eligibility, dates, and FAQs.
5. `/programs/ai-workshops/` — workshop topics, prerequisites, schedule, mentors, and learning outcomes.
6. `/club/` — membership, who can join, activities, leadership, selection process, and FAQs.

Do not create many thin keyword variants. Each page should satisfy a different intent and include first-hand material: photos, outcomes, schedules, winners, speaker details, judging criteria, projects, or participant guidance.

## On-page template for every new page

- One specific title of roughly 50–60 characters.
- One clear H1 matching the real page purpose.
- A unique summary that answers who, what, where, and when.
- Scannable sections covering eligibility, format, dates, venue, outcomes, and FAQs where relevant.
- Descriptive image filenames, alt text, dimensions, and compressed WebP/AVIF variants.
- Breadcrumb links and contextual links to closely related initiatives.
- A self-referencing canonical URL.
- Accurate `Event`, `Article`, or `Organization` structured data only when the visible page supports it.
- Inclusion in `sitemap.xml` only after the page is live, canonical, and indexable.

## Technical growth priorities

1. Compress or replace the roughly 71 MB hero video and serve responsive MP4/WebM sources. This is the largest remaining performance opportunity.
2. Generate true thumbnails for the gallery instead of loading the full-resolution originals into the thumbnail strip.
3. Create a purpose-built 1200×630 social preview image rather than using the square favicon.
4. Add privacy-respecting analytics and Search Console reporting for organic landing pages and membership conversions.
5. Configure long-lived cache headers for versioned images, fonts, CSS, JavaScript, and video at the hosting layer.
6. Add a real custom 404 page that links visitors back to the homepage and event hub.

## Monthly publishing rhythm

- Publish one substantial event/program page or first-hand recap.
- Update schedules and completed-event statuses immediately.
- Add internal links from the homepage and related pages.
- Share the canonical page from official MIT-WPU, speaker, sponsor, and partner profiles.
- Review high-impression/low-CTR queries and improve titles or descriptions without changing the page's intent.
- Refresh the sitemap `lastmod` only when a page's main content changes.

## Measurement

Track outcomes rather than raw keyword count:

- non-branded organic clicks
- clicks to membership or registration forms
- organic visits to event detail pages
- branded searches for Ignisia
- referring domains from universities, partners, speakers, and press
- indexed canonical pages and crawl errors
- mobile Core Web Vitals

Avoid adding a `keywords` meta tag; Google does not use it for ranking. Build topical relevance through useful visible content, descriptive titles/headings, internal links, and reputable external references.
