from pathlib import Path

root=Path('/mnt/data/madhyum_current')

# --- JavaScript: fix horizontal slider indexing and make search work with multi-word queries ---
p=root/'script.js'
s=p.read_text()
old="""function renderSearch(q=''){
    if(!searchResults)return;
    const term=q.trim().toLowerCase();
    if(!term){searchResults.innerHTML='<div class=\"result\"><strong>Start typing a requirement</strong><small>Try property, Dubai, honeymoon, MBBS, GST, wedding, Hajj, or membership.</small></div>';return;}
    const seen=new Set();
    const matches=SEARCH_DATA.filter(([termText])=>termText.toLowerCase().includes(term)).filter(([t,p])=>{const k=p+'|'+t;if(seen.has(k))return false;seen.add(k);return true}).slice(0,24);
    if(!matches.length){searchResults.innerHTML='<div class=\"result\"><strong>No exact keyword found</strong><small>Try a broader requirement or service name.</small></div>';return;}
    const pages={};
    matches.forEach(([t,p,l])=>(pages[p]??={label:l,terms:[]}).terms.push(t));
    searchResults.innerHTML=Object.entries(pages).map(([p,v])=>`<a class=\"result\" href=\"${p}\"><strong>${esc(v.label)}</strong><small>${esc(v.terms.slice(0,7).join(' • '))}</small></a>`).join('');
  }"""
new="""function renderSearch(q=''){
    if(!searchResults)return;
    const raw=q.trim().toLowerCase();
    if(!raw){searchResults.innerHTML='<div class=\"result\"><strong>Start typing a requirement</strong><small>Try property, Dubai, honeymoon, MBBS, GST, wedding, Hajj, or membership.</small></div>';return;}
    const tokens=raw.split(/\\s+/).filter(Boolean);
    const seen=new Set();
    const matches=SEARCH_DATA
      .map(([termText,page,label])=>{
        const hay=termText.toLowerCase();
        const hits=tokens.filter(token=>hay.includes(token)).length;
        return [termText,page,label,hits];
      })
      .filter(([termText,page,label,hits])=>hits===tokens.length || (tokens.length===1 && hits>0))
      .sort((a,b)=>b[3]-a[3] || a[0].length-b[0].length)
      .filter(([t,p])=>{const k=p+'|'+t;if(seen.has(k))return false;seen.add(k);return true})
      .slice(0,40);
    if(!matches.length){searchResults.innerHTML='<div class=\"result\"><strong>No matching keyword found</strong><small>Try a broader requirement or service name.</small></div>';return;}
    const pages={};
    matches.forEach(([t,p,l])=>(pages[p]??={label:l,terms:[]}).terms.push(t));
    searchResults.innerHTML=Object.entries(pages).map(([page,v])=>`<a class=\"result\" href=\"${page}\"><strong>${esc(v.label)}</strong><small>${esc(v.terms.slice(0,8).join(' • '))}</small></a>`).join('');
  }"""
if old not in s:
    raise SystemExit('renderSearch block not found')
s=s.replace(old,new)
old2="""function update(){wings.forEach((w,i)=>{w.classList.remove('position-left','position-far-left','is-active','position-right','position-far-right');let rel=(i-active+wings.length)%wings.length;const cls=['position-left','position-far-left','is-active','position-right','position-far-right'][rel];if(cls)w.classList.add(cls);w.setAttribute('aria-current',rel===2?'true':'false')});dots?.querySelectorAll('.layered-dot').forEach((d,i)=>d.classList.toggle('active',i===active))}"""
new2="""function update(){
      const classes=['is-active','position-right','position-far-right','position-far-left','position-left'];
      wings.forEach((w,i)=>{
        w.classList.remove('position-left','position-far-left','is-active','position-right','position-far-right');
        const rel=(i-active+wings.length)%wings.length;
        const cls=classes[rel];
        if(cls)w.classList.add(cls);
        w.setAttribute('aria-current',rel===0?'true':'false');
      });
      dots?.querySelectorAll('.layered-dot').forEach((d,i)=>d.classList.toggle('active',i===active));
    }"""
if old2 not in s:
    raise SystemExit('slider update block not found')
s=s.replace(old2,new2)
p.write_text(s)

# --- Add one compact visual communication block to consultancy page ---
p=root/'consultancy.html'
s=p.read_text()
marker='''  <section class="section">\n    <div class="container">\n      <div class="section-head reveal"><div><div class="eyebrow">03 / FOR EVERY STAGE OF YOUR BUSINESS</div>'''
insert='''  <section class="section consultancy-photo-section">\n    <div class="container">\n      <div class="single-photo-card reveal">\n        <img src="consultancy-business.jpg" alt="Business consultancy and professional support">\n        <div class="single-photo-caption">BUSINESS &amp; PROFESSIONAL NETWORK</div>\n      </div>\n    </div>\n  </section>\n\n'''
if marker not in s:
    raise SystemExit('consultancy insertion marker not found')
s=s.replace(marker,insert+marker,1)
p.write_text(s)

# --- Collapse the two-photo sections to one strong photo; keep the existing approved filename. ---
for fn, keep in {
    'real-estate.html':'real-estate-property.jpg',
    'travel.html':'travel-destination.jpg',
    'education.html':'education-campus.jpg',
    'events.html':'events-wedding.jpg',
}.items():
    p=root/fn; s=p.read_text()
    import re
    pattern=r'<div class="section-media photo-pair reveal">.*?</div>'
    replacement=f'<div class="section-media single-photo-card reveal"><figure><img src="{keep}" alt="MADHYUM {fn.replace(".html", "").replace("-", " ")} visual"><figcaption>FEATURED VISUAL</figcaption></figure></div>'
    ns,n=re.subn(pattern,replacement,s,count=1,flags=re.S)
    if n:
        p.write_text(ns)

# --- Append a single final override layer to the current stylesheet. ---
css=root/'style.css'
append=r'''

/* =========================================================
   FINAL REQUESTED REFINEMENT — 01 SEP 2026
   Layout-only refinement. Existing MADHYUM content and navigation
   architecture are preserved.
========================================================= */

/* ---------- GLOBAL ---------- */
html{scroll-padding-top:86px}
body{overflow-x:hidden}
.container{width:min(1180px,92vw)}
.section{padding:68px 0}
.section.tight{padding:56px 0}
.eyebrow{font-size:.9rem;font-weight:700;letter-spacing:.15em;color:#2c3338}
.eyebrow.light{color:#d8dee2}
.section-head{gap:42px;margin-bottom:28px}
.section-head h2{margin-top:7px}

/* ---------- NAVIGATION ----------
   Home keeps the visual treatment over the hero.
   Inner pages get a solid contrasting bar so the category hero
   never collides with the navigation. JS still hides it on scroll down
   and restores it on scroll up. */
.category-page .site-header,
.membership-page .site-header,
.contact-page .site-header{
  background:rgba(7,17,27,.98)!important;
  box-shadow:0 8px 28px rgba(0,0,0,.18);
  padding:12px 0!important;
  backdrop-filter:blur(16px);
}
.category-page main,
.membership-page main,
.contact-page main{padding-top:74px}
.site-header .nav{min-height:46px}
.site-header .navlinks{gap:24px}
.site-header .actions{gap:12px}
.site-header .contact-pill{display:inline-flex!important;align-items:center;justify-content:center;white-space:nowrap}
.site-header .menu-btn{display:grid!important;place-items:center}
.site-header.nav-hidden{transform:translateY(-110%)}

/* ---------- CATEGORY HERO ---------- */
.category-page .inner-hero,
.category-page .category-hero,
.category-page .category-consultancy{
  position:relative;
  min-height:calc(100svh - 74px);
  display:flex;
  align-items:flex-end;
  overflow:hidden;
  color:#fff;
  background-color:#07111b;
  isolation:isolate;
}
.category-page .inner-hero::before{
  content:"";
  position:absolute;
  inset:0;
  z-index:-2;
  background-position:center;
  background-size:cover;
  background-repeat:no-repeat;
  filter:saturate(.92);
}
.category-page .inner-hero::after{
  content:"";
  position:absolute;
  inset:0;
  z-index:-1;
  background:linear-gradient(90deg,rgba(3,10,17,.88) 0%,rgba(3,10,17,.62) 42%,rgba(3,10,17,.28) 100%),linear-gradient(0deg,rgba(3,10,17,.72),transparent 55%);
}
.category-real-estate::before{background-image:url("../real-estate-property.jpg")}
.category-travel::before{background-image:url("../travel-destination.jpg")}
.category-education::before{background-image:url("../education-campus.jpg")}
.category-consultancy::before{background-image:url("../consultancy-business.jpg")}
.category-events::before{background-image:url("../events-wedding.jpg")}
.category-page .inner-hero-inner{width:min(1180px,92vw);padding:88px 0 74px;position:relative;z-index:1}
.category-page .inner-hero h1{max-width:980px;margin:10px 0 18px;font-size:clamp(2.8rem,5.2vw,5.9rem);line-height:.98;letter-spacing:-.035em}
.category-page .inner-hero p{max-width:760px;margin:0 0 26px;font-size:1.03rem;line-height:1.7;color:#e4e9ec}
.category-page .hero-actions{display:flex;flex-wrap:wrap;gap:12px}
.category-page .hero-actions .btn{min-height:48px;padding:12px 21px;font-weight:700}
.category-page .hero-actions .btn.primary{background:#e0bf7b!important;color:#10151a!important;border-color:#e0bf7b!important}
.category-page .hero-actions .btn:not(.primary){background:rgba(4,13,21,.82)!important;color:#fff!important;border-color:rgba(255,255,255,.72)!important}

/* ---------- HOMEPAGE HERO: horizontal ticker at the bottom ---------- */
.home-page .layered-orbit{top:auto!important;bottom:58px!important;left:0!important;width:100%!important;height:126px!important;transform:none!important;overflow:hidden!important}
.home-page .layered-wing{top:50%!important;left:50%!important;width:min(235px,20vw)!important;height:112px!important}
.home-page .layered-wing .layered-wing-visual{height:64px!important}
.home-page .layered-wing .layered-wing-visual img{max-height:58px!important;max-width:102px!important}
.home-page .layered-wing-title{font-size:.86rem!important;line-height:1.2!important;margin-top:4px!important}
.home-page .layered-controls{bottom:12px!important;gap:7px!important;padding:4px 7px!important;background:rgba(4,12,20,.74)!important;border-color:rgba(255,255,255,.18)!important}
.home-page .layered-control{width:34px!important;height:34px!important}
.home-page .layered-dots{gap:5px!important}

/* ---------- HOMEPAGE WHY: clean editorial two-column layout ---------- */
.home-page .why-section{padding:64px 0 58px}
.home-page .why-section .section-head{grid-template-columns:minmax(0,1.25fr) minmax(300px,.75fr);align-items:start;gap:46px;margin-bottom:22px}
.home-page .why-section .section-head h2{font-size:clamp(2.35rem,4vw,4.25rem);line-height:1.02;max-width:900px}
.home-page .why-section .section-head>p{max-width:520px;margin:8px 0 0;line-height:1.6}
.home-page .why-layout{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:28px;align-items:stretch}
.home-page .why-copy{padding:22px 24px;border:1px solid var(--line);border-radius:14px;background:#fff}
.home-page .why-copy>.lead{font-size:1.18rem;line-height:1.5;max-width:720px}
.home-page .why-points{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:20px;border-top:1px solid var(--line)}
.home-page .why-points>div{padding:16px 16px 8px 0;min-height:104px;border-bottom:0!important}
.home-page .why-points>div+div{padding-left:16px;border-left:1px solid var(--line)!important}
.home-page .why-points strong{display:block;font-size:.76rem;letter-spacing:.12em}
.home-page .why-points span{display:block;margin-top:5px;font-size:.86rem;line-height:1.45;color:var(--muted)}
.home-page .why-diagram{display:grid;grid-template-columns:1fr 28px 1.15fr 28px 1fr;align-items:stretch;gap:8px;margin:0;padding:14px;border:1px solid var(--line);border-radius:14px;background:#faf9f5}
.home-page .diagram-node,.home-page .diagram-core{min-height:116px!important;border:1px solid #d8d4cc;background:#fff;border-radius:10px}
.home-page .diagram-node{display:grid;place-items:center;align-content:center;text-align:center;padding:12px;font-size:.82rem;font-weight:700;letter-spacing:.08em}
.home-page .diagram-node span{display:block;margin-top:6px;font-size:.72rem;font-weight:500;letter-spacing:0;color:var(--muted)}
.home-page .diagram-core{display:grid;place-items:center;text-align:center;background:var(--navy);color:#fff;border-color:var(--navy);font-size:.72rem;letter-spacing:.1em;line-height:1.5}
.home-page .diagram-core strong{font-size:1.05rem;letter-spacing:.12em}
.home-page .diagram-line{align-self:center;background:#b5b0a8!important}
.home-page .section-close{margin-top:18px}
.home-page .trust-lockup{display:grid;grid-template-columns:auto 1fr;gap:20px;align-items:center;padding:14px 18px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.home-page .trust-line{font-weight:800;letter-spacing:.14em;font-size:.82rem}
.home-page .trust-lockup p{margin:0;color:var(--muted);font-size:.9rem}

/* ---------- HOMEPAGE SOLUTIONS: compact 2 + 2 + 1 grid ---------- */
.home-page .solutions-section{padding:62px 0}
.home-page .solutions-section .section-head{margin-bottom:22px}
.home-page .solution-panels{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important}
.home-page .solution-panel,.home-page .solution-panel-wide{position:relative;min-height:156px!important;height:auto!important;padding:20px 22px!important;border:1px solid rgba(17,24,31,.14)!important;border-radius:14px!important;background:#fff!important;color:#10151a!important;box-shadow:0 7px 22px rgba(0,0,0,.045);overflow:hidden}
.home-page .solution-panel-wide{grid-column:1/-1!important;min-height:132px!important}
.home-page .solution-panel img{display:block!important;position:absolute!important;right:18px!important;top:18px!important;width:70px!important;height:70px!important;object-fit:contain!important;opacity:.9}
.home-page .solution-panel>div{max-width:calc(100% - 82px)!important}
.home-page .solution-panel h3{margin:34px 0 5px!important;font-size:clamp(1.45rem,2.2vw,2.25rem)!important;line-height:1.05!important;color:#11161b!important}
.home-page .solution-panel p{margin:0!important;color:#697178!important;font-size:.88rem!important}
.home-page .solution-index{color:#7b6849!important;font-weight:700}

/* ---------- HOMEPAGE NETWORK: same compact column logic ---------- */
.home-page .network-section{padding:58px 0 52px}
.home-page .network-section .section-head{margin-bottom:20px}
.home-page .relationship-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;border:0!important}
.home-page .relationship-card,.home-page .relationship-card-wide{min-height:92px!important;padding:17px 18px!important;border:1px solid var(--line)!important;border-radius:12px!important;background:#fff!important}
.home-page .relationship-card-wide{grid-column:1/-1!important}
.home-page .relationship-card h3{font-size:clamp(1.05rem,1.65vw,1.38rem)!important;line-height:1.25!important}
.home-page .network-statement{margin-top:14px!important;padding:15px 18px!important;border:1px solid var(--line);border-radius:12px;background:#faf9f5}
.home-page .network-statement .lead{font-size:1rem!important}

/* ---------- DEDICATED PAGE SECTION RHYTHM / BOX HIERARCHY ---------- */
.category-page .section{padding:60px 0}
.category-page .section-head h2{font-size:clamp(2rem,3.3vw,3.55rem)!important;line-height:1.05!important}
.category-page .section-head p{font-size:.94rem;line-height:1.6}
.category-page .benefit-grid{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:12px!important;border:0!important}
.category-page .benefit-card{min-height:150px!important;padding:18px!important;border:1px solid var(--line)!important;border-radius:12px!important;background:#fff!important;box-shadow:0 6px 20px rgba(0,0,0,.035)}
.category-page .benefit-card+.benefit-card{padding-left:18px!important;border-left:1px solid var(--line)!important}
.category-page .benefit-card h3{font-size:1.08rem!important;line-height:1.2!important}
.category-page .benefit-card p{font-size:.86rem!important;line-height:1.5!important}
.category-page .service-grid,.category-page .service-grid-five,.category-page .service-grid-six,.category-page .course-grid,.category-page .category-columns,.category-page .location-grid,.category-page .occasion-grid,.category-page .signature-grid,.category-page .region-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important}
.category-page .service-card,.category-page .course-card,.category-page .category-list,.category-page .location-card,.category-page .occasion-card,.category-page .signature-column,.category-page .region-item{min-height:0!important;padding:20px!important;border:1px solid var(--line)!important;border-radius:12px!important;background:#fff!important;box-shadow:0 6px 20px rgba(0,0,0,.035)}
.category-page .service-card h3,.category-page .course-card h3,.category-page .category-list h3,.category-page .location-card h3,.category-page .occasion-card h3,.category-page .signature-column h3,.category-page .region-item h3{line-height:1.15}
.category-page .service-card p,.category-page .course-card p,.category-page .category-list p,.category-page .location-card p,.category-page .occasion-card p,.category-page .signature-column p,.category-page .region-item p{font-size:.88rem;line-height:1.55}
.category-page .service-more summary{font-size:.95rem!important;min-height:42px;padding:10px 0!important;color:#7a5e2a!important;font-weight:800!important}
.category-page .dark .service-more summary{color:#f0d9a7!important}
.category-page .more-copy{font-size:.86rem;line-height:1.6}

/* Travel cards: retain two-column Sulekha-style service discovery. */
.travel-page .package-list{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important}
.travel-page .package-item{min-height:235px!important;padding:20px!important;border:1px solid rgba(255,255,255,.15)!important;border-radius:12px!important;background:#101d2a!important;color:#fff!important}
.travel-page .package-item h3{font-size:1.35rem!important;line-height:1.15!important}
.travel-page .package-item p{font-size:.87rem!important;line-height:1.5!important;color:#c2cbd1!important}
.travel-page .package-examples{padding-top:10px!important;border-top:1px solid rgba(255,255,255,.12)!important}
.travel-page .package-examples span{font-size:.84rem!important;line-height:1.5!important}
.travel-page .package-examples strong{font-size:.66rem!important}

/* ---------- NETWORK DIAGRAMS: clear top -> centre -> partners hierarchy ---------- */
.clean-network,.network-stage{width:100%!important;max-width:980px!important;margin:24px auto 0!important}
.clean-network .network-top,.network-stage .network-pill:first-child{width:min(100%,620px)!important;margin:0 auto!important;padding:13px 18px!important;text-align:center!important;border-radius:10px!important}
.clean-network .network-line.vertical{height:24px!important;background:#aeb1b0!important}
.network-center.large,.network-stage .network-center{min-width:190px!important;min-height:70px!important;padding:15px 24px!important;border-radius:10px!important}
.clean-network .partner-row{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:10px!important;margin-top:6px!important}
.clean-network .partner-row span{min-height:58px!important;padding:10px!important;border-radius:10px!important;font-size:.69rem!important;background:#fff!important}
.network-stage{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:10px!important;align-items:stretch!important}
.network-stage .network-pill:first-child{grid-column:1/-1!important;grid-row:1!important}
.network-stage .network-center{grid-column:1/-1!important;grid-row:2!important;justify-self:center!important;width:min(230px,100%)!important;background:var(--navy)!important;color:#fff!important;border-color:var(--navy)!important;box-shadow:0 8px 22px rgba(0,0,0,.12)}
.network-stage .network-pill:not(:first-child){grid-row:3!important;min-height:60px!important;display:grid!important;place-items:center!important;text-align:center!important;padding:12px!important;border:1px solid var(--line)!important;border-radius:10px!important;background:#fff!important;color:#11161b!important;font-size:.7rem!important;font-weight:800!important;letter-spacing:.08em!important}
.network-boxes{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;max-width:900px;margin:24px auto 0}
.network-boxes>div{min-height:92px;padding:18px;border:1px solid rgba(255,255,255,.14);border-radius:12px;background:#101d2a;color:#fff;display:flex;flex-direction:column;justify-content:center}
.network-boxes span{font-size:.7rem;letter-spacing:.1em;color:#aeb8c0}
.network-boxes strong{margin-top:6px;font-size:1.05rem}

/* ---------- ONE DIGNIFIED PHOTO PER LANDING PAGE ---------- */
.single-photo-card{position:relative;overflow:hidden;border:1px solid var(--line);border-radius:14px;background:#111;min-height:260px;box-shadow:0 10px 28px rgba(0,0,0,.07)}
.single-photo-card figure{margin:0;position:relative;height:100%;min-height:260px}
.single-photo-card img{width:100%;height:320px;object-fit:cover;display:block}
.single-photo-card::after{content:"";position:absolute;inset:45% 0 0;background:linear-gradient(0deg,rgba(4,10,16,.76),transparent);pointer-events:none}
.single-photo-caption{position:absolute;left:20px;bottom:17px;z-index:2;padding:7px 10px;background:rgba(4,12,20,.78);border:1px solid rgba(255,255,255,.16);border-radius:7px;color:#fff;font-size:.66rem;letter-spacing:.12em;font-weight:800}
.single-photo-card figcaption{position:absolute;left:20px;bottom:17px;z-index:2;padding:7px 10px;background:rgba(4,12,20,.78);border:1px solid rgba(255,255,255,.16);border-radius:7px;color:#fff;font-size:.66rem;letter-spacing:.12em;font-weight:800}
.consultancy-photo-section{padding-top:12px!important;padding-bottom:12px!important}

/* ---------- DARK SECTION CONTRAST ---------- */
.category-page .dark{background:var(--navy)!important;color:#fff}
.category-page .dark .section-head p{color:#c2cbd1!important}
.category-page .dark .service-card,.category-page .dark .course-card,.category-page .dark .region-item,.category-page .dark .signature-column,.category-page .dark .location-card,.category-page .dark .occasion-card{background:#101d2a!important;border-color:rgba(255,255,255,.15)!important;color:#fff!important}
.category-page .dark .service-card h3,.category-page .dark .course-card h3,.category-page .dark .region-item h3,.category-page .dark .signature-column h3,.category-page .dark .location-card h3,.category-page .dark .occasion-card h3{color:#fff!important}

/* ---------- RESPONSIVE ---------- */
@media(max-width:960px){
  .category-page main,.membership-page main,.contact-page main{padding-top:68px}
  .category-page .inner-hero{min-height:calc(100svh - 68px)}
  .category-page .inner-hero-inner{padding:72px 0 58px}
  .home-page .why-layout{grid-template-columns:1fr}
  .home-page .why-section .section-head{grid-template-columns:1fr;gap:14px}
  .home-page .relationship-grid,.home-page .solution-panels{grid-template-columns:repeat(2,minmax(0,1fr))!important}
  .home-page .solution-panel-wide,.home-page .relationship-card-wide{grid-column:1/-1!important}
  .category-page .benefit-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
  .category-page .service-grid,.category-page .service-grid-five,.category-page .service-grid-six,.category-page .course-grid,.category-page .category-columns,.category-page .location-grid,.category-page .occasion-grid,.category-page .signature-grid,.category-page .region-grid,.travel-page .package-list{grid-template-columns:repeat(2,minmax(0,1fr))!important}
  .clean-network .partner-row{grid-template-columns:repeat(2,minmax(0,1fr))!important}
  .network-stage{grid-template-columns:repeat(2,minmax(0,1fr))!important}
  .network-stage .network-pill:not(:first-child){grid-row:auto!important}
}
@media(max-width:700px){
  .section{padding:52px 0}
  .home-page .why-points{grid-template-columns:1fr!important}
  .home-page .why-points>div,.home-page .why-points>div+div{padding-left:0!important;border-left:0!important;border-bottom:1px solid var(--line)!important}
  .home-page .trust-lockup{grid-template-columns:1fr;gap:7px}
  .home-page .solution-panels,.home-page .relationship-grid,.category-page .benefit-grid,.category-page .service-grid,.category-page .service-grid-five,.category-page .service-grid-six,.category-page .course-grid,.category-page .category-columns,.category-page .location-grid,.category-page .occasion-grid,.category-page .signature-grid,.category-page .region-grid,.travel-page .package-list,.network-boxes{grid-template-columns:1fr!important}
  .home-page .solution-panel-wide,.home-page .relationship-card-wide{grid-column:auto!important}
  .home-page .layered-orbit{bottom:56px!important;height:112px!important}
  .home-page .layered-wing{width:180px!important;height:96px!important}
  .home-page .layered-wing .layered-wing-visual{height:52px!important}
  .home-page .layered-wing .layered-wing-visual img{max-height:48px!important;max-width:84px!important}
  .home-page .layered-wing-title{font-size:.68rem!important}
  .home-page .layered-wing.position-left{transform:translate(-50%,-50%) translateX(-122px) scale(.72)!important}
  .home-page .layered-wing.position-far-left{transform:translate(-50%,-50%) translateX(-240px) scale(.55)!important;opacity:.12!important}
  .home-page .layered-wing.position-right{transform:translate(-50%,-50%) translateX(122px) scale(.72)!important}
  .home-page .layered-wing.position-far-right{transform:translate(-50%,-50%) translateX(240px) scale(.55)!important;opacity:.12!important}
  .home-page .layered-wing.is-active{transform:translate(-50%,-50%) scale(.88)!important}
  .home-page .layered-controls{bottom:8px!important}
  .category-page .inner-hero h1{font-size:clamp(2.35rem,10vw,3.7rem)}
  .category-page .inner-hero p{font-size:.92rem}
  .category-page .hero-actions{display:grid;grid-template-columns:1fr}
  .category-page .hero-actions .btn{width:100%}
  .clean-network .partner-row,.network-stage{grid-template-columns:1fr!important}
  .network-stage .network-pill:not(:first-child){grid-column:auto!important}
  .single-photo-card img{height:250px}
  .site-header .nav{gap:10px}
  .site-header .navlinks{display:none}
}
'''
css.write_text(css.read_text()+append)
