# MADHYUM GROUP — Clean Layout Build

This build keeps the existing MADHYUM page structure/content while replacing the accumulated CSS patches with one authoritative responsive stylesheet.

## Main navigation
MADHYUM | Why MADHYUM | Solutions | Network | Membership | Search | Contact Us | Menu

## Pages
- index.html
- about.html
- real-estate.html
- travel.html
- education.html
- consultancy.html
- events.html
- membership.html
- contact.html

## Layout decisions in this build
- Home hero uses the repository-root `hero-background.png` as the primary hero image.
- The same hero URL on GitHub is included as a fallback so the image can still load when the root asset has not yet been copied locally.
- Five business wings stay in a horizontal bottom slider with their five named image files.
- Why MADHYUM keeps a proper two-line heading and a right-side photograph.
- Solutions keeps five compact cards with small circular image areas.
- Network keeps the photograph beside the heading and uses meaningful relationship copy.
- Membership keeps the photograph beside the heading, with the member-benefit sentence directly below the heading.
- All major inner-page sections use a consistent right-side photograph beside the section heading on desktop and stack cleanly on mobile.
- Inner heroes use limited-opacity photographs behind their headings.
- Real Estate network uses BUYER → MADHYUM → SELLER and INVESTOR ↔ MADHYUM ↔ DEVELOPER with an explanatory sentence.
- Service-card `View More` labels are replaced by `Inquire`.

## Hero asset
The exact file requested by the project is:

`hero-background.png`

It belongs in the website root, alongside `index.html`. The GitHub repository already contains that file. The CSS first references `../hero-background.png` from `css/style.css`, then the current GitHub raw image as fallback.

## Wing image names
Keep these filenames when replacing the current image slots:
- `images/real-estate.png`
- `images/travel.png`
- `images/education.png`
- `images/consultancy.png`
- `images/events.png`

The current five files are image slots/placeholder visuals; replacing them with the final five wing photographs will automatically use the new photographs without changing the HTML.

## Section photo names
The existing section-specific filenames are preserved in the HTML so final photographs can be replaced without code changes.

## Forms
Forms are front-end demo forms. They show a success state but do not send data to a backend yet.


## Photo slots — locked naming

Replace photos using these exact filenames. The files are already referenced by the website, so only the image file needs to be replaced.

### Homepage
- `hero-background.png` — main homepage hero
- `why-madhyum.jpg` — Why MADHYUM
- `solutions.jpg` — Solutions heading/photo
- `network.jpg` — Network heading/photo
- `membership-preview.jpg` — Membership preview
- `home-final-cta.jpg` — final CTA

### Landing-page hero photographs
- `real-estate-hero.jpg` — Real Estate hero behind “Find the Right Property. We Can Help.”
- `travel-hero.jpg` — Travel hero
- `education-hero.jpg` — Education hero
- `consultancy-hero.jpg` — Consultancy & Business Services hero
- `events-hero.jpg` — Events & Weddings hero
- `membership-privileges.jpg` — Membership hero

### Other section photographs
All existing section photo filenames in `images/` remain locked; replace the image with the same filename to keep the current layout.

## Complete photo filename list

Use these exact filenames when replacing the current images. Do not rename them.

**Homepage:**
- `hero-background.png`
- `why-madhyum.jpg`
- `solutions.jpg`
- `network.jpg`
- `membership-preview.jpg`
- `home-final-cta.jpg`

**Real Estate:**
- `real-estate-hero.jpg`
- `real-estate-why-real-estate.jpg`
- `property-solutions.jpg`
- `property-categories.jpg`
- `property-location.jpg`
- `property-network.jpg`
- `property-requirement.jpg`
- `real-estate-final-cta.jpg`

**Travel:**
- `travel-hero.jpg`
- `travel-why-travel.jpg`
- `travel-solutions.jpg`
- `travel-section.jpg`
- `travel-network.jpg`
- `travel-requirement.jpg`
- `travel-final-cta.jpg`

**Education & Admissions:**
- `education-hero.jpg`
- `education-why-admission.jpg`
- `education-courses.jpg`
- `academic-path.jpg`
- `education-india-education.jpg`
- `education-abroad-education.jpg`
- `education-institutes.jpg`
- `admission-network.jpg`
- `admission-requirement.jpg`
- `education-final-cta.jpg`

**Consultancy & Business Services:**
- `consultancy-hero.jpg`
- `consultancy-why-business.jpg`
- `business-services.jpg`
- `business-network.jpg`
- `business-requirement.jpg`

**Events & Weddings:**
- `events-hero.jpg`
- `events-why-events.jpg`
- `event-services.jpg`
- `events-section.jpg`
- `events-occasion-types.jpg`
- `signature-experiences.jpg`
- `event-network.jpg`
- `event-requirement.jpg`
- `events-final-cta.jpg`

**Membership:**
- `membership-privileges.jpg`
- `membership-final-cta.jpg`

**Contact:**
- `contact-section.jpg`
- `contact-requirement.jpg`

## V16 PHOTO FILENAME MAP — USE THESE EXACT NAMES

### Website starting-point / hero photographs
- `hero-background.png` — homepage hero background (place in website root beside `index.html`)
- `real-estate-hero.jpg` — Real Estate page opening hero
- `travel-hero.jpg` — Travel page opening hero
- `education-hero.jpg` — Education & Admissions page opening hero
- `consultancy-hero.jpg` — Business Consultancy page opening hero
- `events-hero.jpg` — Events & Weddings page opening hero
- `membership-privileges.jpg` — Membership page opening hero / membership imagery

### Homepage section photographs
- `why-madhyum.jpg` — Why MADHYUM
- `solutions.jpg` — Solutions
- `network.jpg` — Network
- `index-section.jpg` — Membership preview
- `home-final-cta.jpg` — Start With MADHYUM / final CTA

### Real Estate — requested individual block photographs
- `real-estate-apartments-flats.jpg` — Apartments & Flats
- `real-estate-duplexes-villas-bungalows.jpg` — Duplexes, Villas & Bungalows
- `real-estate-plots-land-investment.jpg` — Plots, Land & Investment
- `real-estate-commercial-property.jpg` — Commercial Property
- `real-estate-residential.jpg` — Residential category
- `real-estate-commercial.jpg` — Commercial category
- `real-estate-plots-land.jpg` — Plots & Land category
- `real-estate-other.jpg` — Other property category

### Real Estate other sections
- `real-estate-why-real-estate.jpg`
- `property-solutions.jpg`
- `property-categories.jpg`
- `property-location.jpg`
- `property-network.jpg`
- `property-requirement.jpg`
- `real-estate-final-cta.jpg`

### Travel
- `travel-why-travel.jpg`
- `travel-solutions.jpg`
- `travel-section.jpg`
- `travel-network.jpg`
- `travel-requirement.jpg`
- `travel-final-cta.jpg`

### Education & Admissions
- `education-why-admission.jpg`
- `education-courses.jpg`
- `academic-path.jpg`
- `education-india-education.jpg`
- `education-abroad-education.jpg`
- `education-institutes.jpg`
- `admission-network.jpg`
- `admission-requirement.jpg`
- `education-final-cta.jpg`

### Business Consultancy
- `consultancy-why-business.jpg`
- `business-services.jpg`
- `business-network.jpg`
- `business-requirement.jpg`
- `consultancy-hero.jpg`

### Events & Weddings
- `events-why-events.jpg`
- `event-services.jpg`
- `events-section.jpg`
- `events-occasion-types.jpg`
- `signature-experiences.jpg`
- `event-network.jpg`
- `event-requirement.jpg`
- `events-final-cta.jpg`

### Membership / Contact / About
- `membership-privileges.jpg`
- `membership-final-cta.jpg`
- `contact-section.jpg`
- `contact-requirement.jpg`
- `about-why-madhyum.jpg`
- `about-network.jpg`

**Photo rule:** save each photograph with the exact filename above. Missing photos automatically remain as clean photo spaces; no HTML changes are required when the image is later uploaded.


## NEW PHOTO NAMES / UPLOAD MAP
Use these exact filenames inside the `images/` folder when replacing the photo spaces:

### Membership
- `membership-privileges.jpg` — Membership benefits section
- `membership-final-cta.jpg` — Membership final CTA

### Real Estate — network / categories
- `real-estate-residential.jpg` — Residential category
- `real-estate-commercial.jpg` — Commercial category
- `real-estate-plots-land.jpg` — Plots & Land category
- `real-estate-other.jpg` — Other property category
- `real-estate-apartments-flats.jpg` — Apartments & Flats location block
- `real-estate-duplexes-villas-bungalows.jpg` — Duplexes, Villas & Bungalows location block
- `real-estate-plots-land-investment.jpg` — Plots, Land & Investment location block
- `real-estate-commercial-property.jpg` — Commercial Property location block

### Page opening / hero photographs
- `hero-background.png` — Homepage hero
- `real-estate-hero.jpg` — Real Estate opening hero
- `travel-hero.jpg` — Travel opening hero
- `education-hero.jpg` — Education opening hero
- `consultancy-hero.jpg` — Business Consultancy opening hero
- `events-hero.jpg` — Events & Weddings opening hero
- `membership-privileges.jpg` — Membership page visual
