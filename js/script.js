/* MADHYUM WEBSITE — CLEAN V7 JAVASCRIPT */
(function(){
  'use strict';

  const header=document.querySelector('.site-header');
  let lastY=window.scrollY;
  let ticking=false;
  function onScroll(){
    const y=window.scrollY;
    if(header){
      header.classList.toggle('scrolled',y>30);
      if(y>lastY && y>90) header.classList.add('nav-hidden');
      else if(y<lastY) header.classList.remove('nav-hidden');
    }
    lastY=y;
    ticking=false;
  }
  window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(onScroll);ticking=true;}},{passive:true});

  const mobileMenu=document.querySelector('.mobile-menu');
  const menuButton=document.querySelector('.menu-btn');
  const closeButtons=document.querySelectorAll('[data-close-mobile]');
  function closeMenu(){if(mobileMenu){mobileMenu.classList.remove('open');mobileMenu.setAttribute('aria-hidden','true');} if(menuButton)menuButton.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');}
  function openMenu(){if(mobileMenu){mobileMenu.classList.add('open');mobileMenu.setAttribute('aria-hidden','false');} if(menuButton)menuButton.setAttribute('aria-expanded','true');document.body.classList.add('menu-open');}
  menuButton?.addEventListener('click',()=>mobileMenu?.classList.contains('open')?closeMenu():openMenu());
  closeButtons.forEach(b=>b.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});

  // Search: broad keyword index across all locked website categories.
  const S=(terms,page,label)=>terms.split('|').map(t=>[t,page,label]);
  const SEARCH_DATA=[
    ...S('real estate|property|properties|buy property|sell property|invest property|investment property|residential|commercial|plots|plot|land|new projects|projects|development|renovation|rent|rental|lease|apartment|apartments|flat|flats|duplex|villa|villas|bungalow|independent house|shop|office|showroom|property services|3 bhk|2 bhk|1 bhk|bhopal|kolar road|bawadiya kalan|hoshangabad road|jatkhedi|misrod|ayodhya bypass|awadhpuri|katara hills|salaiya|airport road|ratanpur|vidisha road|tintadi kheda|bhauri','real-estate.html','Real Estate'),
    ...S('travel|holiday|holidays|tour|tours|domestic holidays|international holidays|family holiday|family package|honeymoon|couple|solo|adventure|hiking|trekking|backpacking|group travel|friends trip|religious travel|spiritual travel|hajj|umrah|karbala|char dham|badrinath|gangotri|yamunotri|corporate travel|business travel|custom travel|weekend getaway|beach escape|mountain getaway|heritage journey|maldives|bali|switzerland|mauritius|dubai|kashmir|thailand|goa|manali|kerala|rajasthan|singapore|nepal|bhutan|tibet|flight|flights|hotel|hotels|resort|resorts|villa stay|airport transfer|cab|chauffeur|cruise|sightseeing|visa assistance|travel insurance|itinerary','travel.html','Travel'),
    ...S('education|admission|admissions|course|courses|study|college|university|institute|ug|undergraduate|pg|postgraduate|professional|mbbs|bds|bams|nursing|physiotherapy|btech|be|bca|mca|mtech|bba|bcom|mba|pgdm|mcom|pilot training|aviation management|cabin crew|airport management|llb|ba llb|llm|bba llb|fashion design|interior design|graphic design|ui ux|hotel management|hospitality|culinary arts|journalism|mass communication|digital media|advertising|bsc|msc|biotechnology|agriculture|barch|march|urban planning|pharmacy|paramedical|education|psychology|india education|study abroad|uk|germany|ireland|usa|canada|australia|new zealand|uae|russia|georgia|kazakhstan|kyrgyzstan|uzbekistan|delhi|noida|dehradun|jaipur|chandigarh|lucknow|mumbai|pune|ahmedabad|vadodara|surat|bengaluru|hyderabad|chennai|coimbatore|kochi|mangalore|bhubaneswar|ranchi|patna|indore|nagpur|raipur|kolkata','education.html','Education & Admissions'),
    ...S('consultancy|business services|business support|business setup|business registration|proprietorship|partnership|llp|company registration|gst|gst registration|udyam|msme|itr|tax|profit and loss|balance sheet|financial statements|accounting|compliance|legal assistance|documentation|registry|agreements|business consultancy|business planning|project report|project reports|business proposal|financial projection|growth|expansion|business advisory|website development|business website|digital presence|job consultancy|career consultation|recruitment|placement','consultancy.html','Consultancy & Business Services'),
    ...S('events|weddings|wedding|engagement|sagai|mehendi|haldi|sangeet|baraat|reception|vidai|ceremony|venue|banquet|resort|lawn|mandap|stage design|floral decor|theme decor|lighting|entrance decor|led wall|catering|live counters|food stations|desserts|beverages|guest hospitality|vip hospitality|photography|candid photography|videography|cinematic film|pre wedding|drone photography|album|dj|live band|singer|dhol|dance|choreography|anchor|emcee|artist booking|birthday|anniversary|party|get together|corporate event|conference|seminar|meeting|product launch|award function|concert|live show|cultural event|fog entry|cold spark|custom stage|luxury mandap|ramp walk|special effects','events.html','Events & Weddings'),
    ...S('membership|member|member privileges|dining|dining privileges|preferred access|brokerage|travel offers|admission assistance|professional expertise|event vendors','membership.html','MADHYUM Membership')
  ];
  const drawer=document.querySelector('.drawer');
  const searchInput=document.querySelector('#searchInput');
  const searchResults=document.querySelector('#searchResults');
  function openSearch(){drawer?.classList.add('open');drawer?.setAttribute('aria-hidden','false');setTimeout(()=>searchInput?.focus(),80)}
  function closeSearch(){drawer?.classList.remove('open');drawer?.setAttribute('aria-hidden','true')}
  document.querySelectorAll('[data-search]').forEach(b=>b.addEventListener('click',openSearch));
  document.querySelectorAll('[data-close-search]').forEach(b=>b.addEventListener('click',closeSearch));
  drawer?.addEventListener('click',e=>{if(e.target===drawer)closeSearch()});
  function esc(s){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
  function renderSearch(q=''){
    if(!searchResults)return;
    const raw=q.trim().toLowerCase();
    if(!raw){searchResults.innerHTML='<div class="result"><strong>Start typing a requirement</strong><small>Try property, Dubai, honeymoon, MBBS, GST, wedding, Hajj, or membership.</small></div>';return;}
    const tokens=raw.split(/\s+/).filter(Boolean);
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
    if(!matches.length){searchResults.innerHTML='<div class="result"><strong>No matching keyword found</strong><small>Try a broader requirement or service name.</small></div>';return;}
    const pages={};
    matches.forEach(([t,p,l])=>(pages[p]??={label:l,terms:[]}).terms.push(t));
    searchResults.innerHTML=Object.entries(pages).map(([page,v])=>`<a class="result" href="${page}"><strong>${esc(v.label)}</strong><small>${esc(v.terms.slice(0,8).join(' • '))}</small></a>`).join('');
  }
  searchInput?.addEventListener('input',e=>renderSearch(e.target.value));
  renderSearch();


  // Photo slots: use the named image when it exists. Missing uploads stay as clean boxes (no broken-image icon).
  document.querySelectorAll('.section-photo-slot[data-photo]').forEach(slot=>{
    const file=slot.getAttribute('data-photo');
    if(!file) return;
    const img=new Image();
    img.onload=()=>{slot.classList.add('has-photo');slot.style.backgroundImage=`url("images/${file}")`;};
    img.onerror=()=>slot.classList.add('photo-pending');
    img.src=`images/${file}`;
  });

  // Smooth internal links.
  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',e=>{
    const id=link.getAttribute('href'); if(!id||id==='#')return; const el=document.querySelector(id); if(!el)return; e.preventDefault(); closeMenu(); el.scrollIntoView({behavior:'smooth',block:'start'});
  }));

  // Reveal animations.
  const reveal=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(x=>x.isIntersecting&&x.target.classList.add('visible')),{threshold:.08});reveal.forEach(x=>io.observe(x));}else reveal.forEach(x=>x.classList.add('visible'));

  // Horizontal hero slider: cards move left-to-right instead of C-orbit rotation.
  const wings=[...document.querySelectorAll('.layered-wing')];
  const prev=document.querySelector('#layeredPrev'), next=document.querySelector('#layeredNext'), dots=document.querySelector('#layeredDots');
  let active=0, timer=null, paused=false;
  if(wings.length){
    if(dots){dots.innerHTML='';wings.forEach((w,i)=>{const d=document.createElement('button');d.type='button';d.className='layered-dot';d.setAttribute('aria-label','Show '+(w.getAttribute('aria-label')||'business'));d.addEventListener('click',()=>{active=i;update();restart()});dots.appendChild(d)})}
    function update(){
      const classes=['is-active','position-right','position-far-right','position-far-left','position-left'];
      wings.forEach((w,i)=>{
        w.classList.remove('position-left','position-far-left','is-active','position-right','position-far-right');
        const rel=(i-active+wings.length)%wings.length;
        const cls=classes[rel];
        if(cls)w.classList.add(cls);
        w.setAttribute('aria-current',rel===0?'true':'false');
      });
      dots?.querySelectorAll('.layered-dot').forEach((d,i)=>d.classList.toggle('active',i===active));
    }
    function goNext(){active=(active+1)%wings.length;update()}
    function goPrev(){active=(active-1+wings.length)%wings.length;update()}
    function stop(){if(timer){clearInterval(timer);timer=null}}
    function start(){stop();if(!paused)timer=setInterval(goNext,5200)}
    function restart(){start()}
    next?.addEventListener('click',()=>{goNext();restart()});prev?.addEventListener('click',()=>{goPrev();restart()});
    const hero=document.querySelector('.layered-hero'); hero?.addEventListener('mouseenter',()=>{paused=true;stop()});hero?.addEventListener('mouseleave',()=>{paused=false;start()});
    let sx=0;hero?.addEventListener('touchstart',e=>sx=e.changedTouches[0].clientX,{passive:true});hero?.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>35){dx<0?goNext():goPrev();restart()}},{passive:true});
    update();start();
  }

  // Accessible View More details remain native <details>; no hidden tiny links.
  document.querySelectorAll('.service-more summary').forEach(s=>s.setAttribute('role','button'));

  // Basic inquiry form feedback.
  document.querySelectorAll('[data-form-name]').forEach(form=>form.addEventListener('submit',e=>{
    e.preventDefault();const success=form.querySelector('.form-success');if(success)success.textContent='Thank you. We received your request. We will contact you soon.';form.reset();
  }));
})();
