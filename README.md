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
