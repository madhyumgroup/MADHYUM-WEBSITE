```javascript
/* MADHYUM WEBSITE — FINAL V7 + LIVE BACKEND */
(function(){
  'use strict';

  /* =========================================================
     MADHYUM GOOGLE APPS SCRIPT BACKEND
  ========================================================= */

  const MADHYUM_API =
    'https://script.google.com/macros/s/AKfycbzRgbrdHLtZO6MB-WjazHCqHfQtVEeANQHrCet1Ag/exec';


  /* =========================================================
     HEADER
  ========================================================= */

  const header=document.querySelector('.site-header');
  let lastY=window.scrollY;
  let ticking=false;

  function onScroll(){
    const y=window.scrollY;

    if(header){
      header.classList.toggle('scrolled',y>30);

      if(y>lastY && y>90){
        header.classList.add('nav-hidden');
      }else if(y<lastY){
        header.classList.remove('nav-hidden');
      }
    }

    lastY=y;
    ticking=false;
  }

  window.addEventListener(
    'scroll',
    ()=>{
      if(!ticking){
        requestAnimationFrame(onScroll);
        ticking=true;
      }
    },
    {passive:true}
  );


  /* =========================================================
     MOBILE MENU
  ========================================================= */

  const mobileMenu=document.querySelector('.mobile-menu');
  const menuButton=document.querySelector('.menu-btn');
  const closeButtons=document.querySelectorAll('[data-close-mobile]');

  function closeMenu(){
    if(mobileMenu){
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden','true');
    }

    if(menuButton){
      menuButton.setAttribute('aria-expanded','false');
    }

    document.body.classList.remove('menu-open');
  }

  function openMenu(){
    if(mobileMenu){
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden','false');
    }

    if(menuButton){
      menuButton.setAttribute('aria-expanded','true');
    }

    document.body.classList.add('menu-open');
  }

  menuButton?.addEventListener(
    'click',
    ()=>{
      mobileMenu?.classList.contains('open')
        ? closeMenu()
        : openMenu();
    }
  );

  closeButtons.forEach(
    b=>b.addEventListener('click',closeMenu)
  );

  document.addEventListener(
    'keydown',
    e=>{
      if(e.key==='Escape'){
        closeMenu();
      }
    }
  );


  /* =========================================================
     SEARCH
  ========================================================= */

  const S=(terms,page,label)=>
    terms.split('|').map(t=>[t,page,label]);

  const SEARCH_DATA=[

    ...S(
      'real estate|property|properties|buy property|sell property|invest property|investment property|residential|commercial|plots|plot|land|new projects|projects|development|renovation|rent|rental|lease|apartment|apartments|flat|flats|duplex|villa|villas|bungalow|independent house|shop|office|showroom|property services|3 bhk|2 bhk|1 bhk|bhopal|kolar road|bawadiya kalan|hoshangabad road|jatkhedi|misrod|ayodhya bypass|awadhpuri|katara hills|salaiya|airport road|ratanpur|vidisha road|tintadi kheda|bhauri',
      'real-estate.html',
      'Real Estate'
    ),

    ...S(
      'travel|holiday|holidays|tour|tours|domestic holidays|international holidays|family holiday|family package|honeymoon|couple|solo|adventure|hiking|trekking|backpacking|group travel|friends trip|religious travel|spiritual travel|hajj|umrah|karbala|char dham|badrinath|gangotri|yamunotri|corporate travel|business travel|custom travel|weekend getaway|beach escape|mountain getaway|heritage journey|maldives|bali|switzerland|mauritius|dubai|kashmir|thailand|goa|manali|kerala|rajasthan|singapore|nepal|bhutan|tibet|flight|flights|hotel|hotels|resort|resorts|villa stay|airport transfer|cab|chauffeur|cruise|sightseeing|visa assistance|travel insurance|itinerary',
      'travel.html',
      'Travel'
    ),

    ...S(
      'education|admission|admissions|course|courses|study|college|university|institute|ug|undergraduate|pg|postgraduate|professional|mbbs|bds|bams|nursing|physiotherapy|btech|be|bca|mca|mtech|bba|bcom|mba|pgdm|mcom|pilot training|aviation management|cabin crew|airport management|llb|ba llb|llm|bba llb|fashion design|interior design|graphic design|ui ux|hotel management|hospitality|culinary arts|journalism|mass communication|digital media|advertising|bsc|msc|biotechnology|agriculture|barch|march|urban planning|pharmacy|paramedical|psychology|india education|study abroad|uk|germany|ireland|usa|canada|australia|new zealand|uae|russia|georgia|kazakhstan|kyrgyzstan|uzbekistan|delhi|noida|dehradun|jaipur|chandigarh|lucknow|mumbai|pune|ahmedabad|vadodara|surat|bengaluru|hyderabad|chennai|coimbatore|kochi|mangalore|bhubaneswar|ranchi|patna|indore|nagpur|raipur|kolkata',
      'education.html',
      'Education & Admissions'
    ),

    ...S(
      'consultancy|business services|business support|business setup|business registration|proprietorship|partnership|llp|company registration|gst|gst registration|udyam|msme|itr|tax|profit and loss|balance sheet|financial statements|accounting|compliance|legal assistance|documentation|registry|agreements|business consultancy|business planning|project report|project reports|business proposal|financial projection|growth|expansion|business advisory|website development|business website|digital presence|job consultancy|career consultation|recruitment|placement',
      'consultancy.html',
      'Consultancy & Business Services'
    ),

    ...S(
      'events|weddings|wedding|engagement|sagai|mehendi|haldi|sangeet|baraat|reception|vidai|ceremony|venue|banquet|resort|lawn|mandap|stage design|floral decor|theme decor|lighting|entrance decor|led wall|catering|live counters|food stations|desserts|beverages|guest hospitality|vip hospitality|photography|candid photography|videography|cinematic film|pre wedding|drone photography|album|dj|live band|singer|dhol|dance|choreography|anchor|emcee|artist booking|birthday|anniversary|party|get together|corporate event|conference|seminar|meeting|product launch|award function|concert|live show|cultural event|fog entry|cold spark|custom stage|luxury mandap|ramp walk|special effects',
      'events.html',
      'Events & Weddings'
    ),

    ...S(
      'membership|member|member privileges|dining|dining privileges|preferred access|brokerage|travel offers|admission assistance|professional expertise|event vendors',
      'membership.html',
      'MADHYUM Membership'
    )

  ];


  /* =========================================================
     SEARCH DRAWER
  ========================================================= */

  const drawer=document.querySelector('.drawer');
  const searchInput=document.querySelector('#searchInput');
  const searchResults=document.querySelector('#searchResults');

  function openSearch(){
    drawer?.classList.add('open');
    drawer?.setAttribute('aria-hidden','false');

    setTimeout(
      ()=>searchInput?.focus(),
      80
    );
  }

  function closeSearch(){
    drawer?.classList.remove('open');
    drawer?.setAttribute('aria-hidden','true');
  }

  document.querySelectorAll('[data-search]')
    .forEach(
      b=>b.addEventListener('click',openSearch)
    );

  document.querySelectorAll('[data-close-search]')
    .forEach(
      b=>b.addEventListener('click',closeSearch)
    );

  drawer?.addEventListener(
    'click',
    e=>{
      if(e.target===drawer){
        closeSearch();
      }
    }
  );

  function esc(s){
    return s.replace(
      /[&<>'"]/g,
      c=>({
        '&':'&amp;',
        '<':'&lt;',
        '>':'&gt;',
        "'":'&#39;',
        '"':'&quot;'
      }[c])
    );
  }

  function renderSearch(q=''){

    if(!searchResults){
      return;
    }

    const raw=q.trim().toLowerCase();

    if(!raw){

      searchResults.innerHTML=
        '<div class="result">'+
        '<strong>Start typing a requirement</strong>'+
        '<small>Try property, Dubai, honeymoon, MBBS, GST, wedding, Hajj, or membership.</small>'+
        '</div>';

      return;
    }

    const tokens=
      raw.split(/\s+/).filter(Boolean);

    const seen=new Set();

    const matches=SEARCH_DATA
      .map(
        ([termText,page,label])=>{
          const hay=termText.toLowerCase();

          const hits=
            tokens.filter(
              token=>hay.includes(token)
            ).length;

          return [
            termText,
            page,
            label,
            hits
          ];
        }
      )
      .filter(
        ([termText,page,label,hits])=>
          hits===tokens.length ||
          (
            tokens.length===1 &&
            hits>0
          )
      )
      .sort(
        (a,b)=>
          b[3]-a[3] ||
          a[0].length-b[0].length
      )
      .filter(
        ([t,p])=>{
          const k=p+'|'+t;

          if(seen.has(k)){
            return false;
          }

          seen.add(k);
          return true;
        }
      )
      .slice(0,40);

    if(!matches.length){

      searchResults.innerHTML=
        '<div class="result">'+
        '<strong>No matching keyword found</strong>'+
        '<small>Try a broader requirement or service name.</small>'+
        '</div>';

      return;
    }

    const pages={};

    matches.forEach(
      ([t,p,l])=>{
        if(!pages[p]){
          pages[p]={
            label:l,
            terms:[]
          };
        }

        pages[p].terms.push(t);
      }
    );

    searchResults.innerHTML=
      Object.entries(pages)
        .map(
          ([page,v])=>
            `<a class="result" href="${page}">
              <strong>${esc(v.label)}</strong>
              <small>${esc(v.terms.slice(0,8).join(' • '))}</small>
            </a>`
        )
        .join('');
  }

  searchInput?.addEventListener(
    'input',
    e=>renderSearch(e.target.value)
  );

  renderSearch();


  /* =========================================================
     PHOTO SLOTS
  ========================================================= */

  document.querySelectorAll(
    '.section-photo-slot[data-photo], '+
    '.package-photo[data-photo], '+
    '.location-card-photo[data-photo], '+
    '.category-card-photo[data-photo]'
  ).forEach(
    slot=>{

      const file=
        slot.getAttribute('data-photo');

      if(!file){
        return;
      }

      const img=new Image();

      img.onload=()=>{
        slot.classList.add('has-photo');

        slot.style.backgroundImage=
          `url("images/${file}")`;
      };

      img.onerror=()=>{
        slot.classList.add('photo-pending');
      };

      img.src=
        `images/${file}`;
    }
  );


  /* =========================================================
     HOME HERO IMAGE
  ========================================================= */

  const heroImage=
    document.querySelector(
      '.layered-hero-image'
    );

  if(heroImage){

    heroImage.addEventListener(
      'error',
      ()=>{

        if(!heroImage.dataset.fallback){

          heroImage.dataset.fallback='1';

          heroImage.src=
            'images/hero-madhyam.jpg';
        }

      },
      {once:false}
    );
  }


  /* =========================================================
     FIVE WING IMAGES
  ========================================================= */

  document.querySelectorAll(
    '.layered-wing img'
  ).forEach(
    img=>{

      img.addEventListener(
        'error',
        ()=>{

          const file=
            img.getAttribute('src')
              ?.split('/')
              .pop();

          if(
            file &&
            !img.dataset.fallback
          ){

            img.dataset.fallback='1';

            img.src=
              `https://raw.githubusercontent.com/madhyumgroup/MADHYUM-WEBSITE/main/${file}`;
          }

        }
      );

    }
  );


  /* =========================================================
     SERVICE PHOTO CIRCLES
  ========================================================= */

  document.querySelectorAll(
    '.solution-panel[data-photo]'
  ).forEach(
    panel=>{

      const file=
        panel.getAttribute('data-photo');

      if(file){

        panel.style.setProperty(
          '--solution-photo',
          `url("images/${file}")`
        );
      }

    }
  );


  /* =========================================================
     SMOOTH INTERNAL LINKS
  ========================================================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(
    link=>{

      link.addEventListener(
        'click',
        e=>{

          const id=
            link.getAttribute('href');

          if(
            !id ||
            id==='#'
          ){
            return;
          }

          const el=
            document.querySelector(id);

          if(!el){
            return;
          }

          e.preventDefault();

          closeMenu();

          el.scrollIntoView({
            behavior:'smooth',
            block:'start'
          });

        }
      );

    }
  );


  /* =========================================================
     REVEAL ANIMATIONS
  ========================================================= */

  const reveal=
    document.querySelectorAll('.reveal');

  if(
    'IntersectionObserver' in window
  ){

    const io=
      new IntersectionObserver(
        entries=>{
          entries.forEach(
            x=>{
              if(x.isIntersecting){
                x.target.classList.add(
                  'visible'
                );

                io.unobserve(
                  x.target
                );
              }
            }
          );
        },
        {
          threshold:.08
        }
      );

    reveal.forEach(
      x=>io.observe(x)
    );

  }else{

    reveal.forEach(
      x=>x.classList.add('visible')
    );
  }


  /* =========================================================
     HORIZONTAL HERO SLIDER
  ========================================================= */

  const wings=[
    ...document.querySelectorAll(
      '.layered-wing'
    )
  ];

  const prev=
    document.querySelector(
      '#layeredPrev'
    );

  const next=
    document.querySelector(
      '#layeredNext'
    );

  const dots=
    document.querySelector(
      '#layeredDots'
    );

  let active=0;
  let timer=null;
  let paused=false;

  if(wings.length){

    if(dots){

      dots.innerHTML='';

      wings.forEach(
        (w,i)=>{

          const d=
            document.createElement(
              'button'
            );

          d.type='button';

          d.className=
            'layered-dot';

          d.setAttribute(
            'aria-label',
            'Show '+
            (
              w.getAttribute(
                'aria-label'
              ) ||
              'business'
            )
          );

          d.addEventListener(
            'click',
            ()=>{
              active=i;
              update();
              restart();
            }
          );

          dots.appendChild(d);
        }
      );
    }


    function update(){

      const classes=[
        'is-active',
        'position-right',
        'position-far-right',
        'position-far-left',
        'position-left'
      ];

      wings.forEach(
        (w,i)=>{

          w.classList.remove(
            'position-left',
            'position-far-left',
            'is-active',
            'position-right',
            'position-far-right'
          );

          const rel=
            (
              i-
              active+
              wings.length
            ) %
            wings.length;

          const cls=
            classes[rel];

          if(cls){
            w.classList.add(cls);
          }

          w.setAttribute(
            'aria-current',
            rel===0
              ? 'true'
              : 'false'
          );
        }
      );

      dots?.querySelectorAll(
        '.layered-dot'
      ).forEach(
        (d,i)=>
          d.classList.toggle(
            'active',
            i===active
          )
      );
    }


    function goNext(){

      active=
        (active+1)%
        wings.length;

      update();
    }


    function goPrev(){

      active=
        (active-1+wings.length)%
        wings.length;

      update();
    }


    function stop(){

      if(timer){

        clearInterval(timer);
        timer=null;
      }
    }


    function start(){

      stop();

      if(!paused){

        timer=
          setInterval(
            goNext,
            5200
          );
      }
    }


    function restart(){
      start();
    }


    next?.addEventListener(
      'click',
      ()=>{
        goNext();
        restart();
      }
    );

    prev?.addEventListener(
      'click',
      ()=>{
        goPrev();
        restart();
      }
    );


    const hero=
      document.querySelector(
        '.layered-hero'
      );

    hero?.addEventListener(
      'mouseenter',
      ()=>{
        paused=true;
        stop();
      }
    );

    hero?.addEventListener(
      'mouseleave',
      ()=>{
        paused=false;
        start();
      }
    );


    let sx=0;

    hero?.addEventListener(
      'touchstart',
      e=>{
        sx=
          e.changedTouches[0]
            .clientX;
      },
      {passive:true}
    );

    hero?.addEventListener(
      'touchend',
      e=>{

        const dx=
          e.changedTouches[0]
            .clientX-
          sx;

        if(
          Math.abs(dx)>35
        ){

          dx<0
            ? goNext()
            : goPrev();

          restart();
        }

      },
      {passive:true}
    );


    update();
    start();
  }


  /* =========================================================
     DETAILS ACCESSIBILITY
  ========================================================= */

  document.querySelectorAll(
    '.service-more summary'
  ).forEach(
    s=>
      s.setAttribute(
        'role',
        'button'
      )
  );


  /* =========================================================
     PREMIUM HOVER HINTS
  ========================================================= */

  document.querySelectorAll(
    '.btn,.smalllink,.solution-link,'+
    '.service-more summary,.contact-pill,'+
    '.menu-btn,.iconbtn,.layered-control,'+
    '.layered-dot'
  ).forEach(
    el=>{

      if(el.hasAttribute('title')){
        return;
      }

      const label=
        el.getAttribute('aria-label') ||
        el.textContent
          .trim()
          .replace(/\s+/g,' ');

      if(label){
        el.setAttribute(
          'title',
          label
        );
      }
    }
  );


  /* =========================================================
     LIVE HOMEPAGE STATISTICS
     JSONP — NO CORS PROBLEM
  ========================================================= */

  if(
    document.body.classList.contains(
      'home-page'
    )
  ){

    const values={
      visitors:
        document.querySelector(
          '[data-stat-value="visitors"]'
        ),

      inquiries:
        document.querySelector(
          '[data-stat-value="inquiries"]'
        )
    };

    const status=
      document.querySelector(
        '[data-stats-status]'
      );


    function getVisitorId(){

      const key=
        'madhyum_visitor_id_v1';

      try{

        let id=
          localStorage.getItem(key);

        if(!id){

          id=
            window.crypto?.randomUUID?.() ||
            (
              'v_'+
              Date.now().toString(36)+
              '_'+
              Math.random()
                .toString(36)
                .slice(2)
            );

          localStorage.setItem(
            key,
            id
          );
        }

        return id;

      }catch(error){

        return(
          'session_'+
          Date.now().toString(36)+
          '_'+
          Math.random()
            .toString(36)
            .slice(2)
        );
      }
    }


    function animateStat(
      el,
      target
    ){

      if(
        !el ||
        !Number.isFinite(target)
      ){
        return;
      }

      const end=
        Math.max(
          0,
          Math.round(target)
        );

      const duration=1100;
      const started=performance.now();

      el.classList.remove(
        'is-loading'
      );

      function tick(now){

        const progress=
          Math.min(
            1,
            (now-started)/
            duration
          );

        const eased=
          1-
          Math.pow(
            1-progress,
            3
          );

        el.textContent=
          Math.round(
            end*eased
          ).toLocaleString(
            'en-IN'
          )+'+';

        if(progress<1){

          requestAnimationFrame(
            tick
          );
        }
      }

      requestAnimationFrame(
        tick
      );
    }


    function loadLiveStats(){

      Object.values(values)
        .forEach(
          el=>{
            el?.classList.add(
              'is-loading'
            );
          }
        );


      const callbackName=
        'madhyumStats_'+
        Date.now()+
        '_'+
        Math.random()
          .toString(36)
          .slice(2);


      window[callbackName]=
        function(data){

          try{

            if(
              !data ||
              data.success!==true
            ){
              throw new Error(
                'Invalid statistics response'
              );
            }

            const visitors=
              Number(data.visitors);

            const inquiries=
              Number(data.inquiries);

            if(
              !Number.isFinite(visitors) ||
              !Number.isFinite(inquiries)
            ){
              throw new Error(
                'Invalid statistics values'
              );
            }

            animateStat(
              values.visitors,
              visitors
            );

            animateStat(
              values.inquiries,
              inquiries
            );

            if(status){

              status.textContent=
                'Live figures from the MADHYUM network.';
            }

          }catch(error){

            if(values.visitors){
              values.visitors.textContent='—';
            }

            if(values.inquiries){
              values.inquiries.textContent='—';
            }

            if(status){

              status.textContent=
                'Live statistics are temporarily unavailable.';
            }
          }

          cleanup();
        };


      const script=
        document.createElement(
          'script'
        );

      let cleaned=false;

      function cleanup(){

        if(cleaned){
          return;
        }

        cleaned=true;

        clearTimeout(timeout);

        script.remove();

        try{
          delete window[callbackName];
        }catch(error){
          window[callbackName]=undefined;
        }
      }


      const url=
        new URL(
          MADHYUM_API,
          window.location.href
        );

      url.searchParams.set(
        'action',
        'stats'
      );

      url.searchParams.set(
        'visitorId',
        getVisitorId()
      );

      url.searchParams.set(
        'callback',
        callbackName
      );

      url.searchParams.set(
        '_',
        Date.now().toString()
      );


      script.src=
        url.toString();

      script.async=true;


      script.onerror=
        function(){

          if(values.visitors){
            values.visitors.classList.remove(
              'is-loading'
            );
            values.visitors.textContent='—';
          }

          if(values.inquiries){
            values.inquiries.classList.remove(
              'is-loading'
            );
            values.inquiries.textContent='—';
          }

          if(status){

            status.textContent=
              'Live statistics are temporarily unavailable.';
          }

          cleanup();
        };


      const timeout=
        setTimeout(
          ()=>{
            if(!cleaned){

              if(values.visitors){
                values.visitors.classList.remove(
                  'is-loading'
                );
                values.visitors.textContent='—';
              }

              if(values.inquiries){
                values.inquiries.classList.remove(
                  'is-loading'
                );
                values.inquiries.textContent='—';
              }

              if(status){

                status.textContent=
                  'Live statistics are temporarily unavailable.';
              }

              cleanup();
            }
          },
          15000
        );


      (
        document.head ||
        document.documentElement
      ).appendChild(script);
    }


    loadLiveStats();
  }


  /* =========================================================
     INQUIRY SYSTEM
     CORS-SAFE SEND BEACON
  ========================================================= */

  const INQUIRY_API_URL=
    MADHYUM_API;


  const pageWing={
    'real-estate.html':
      'Real Estate',

    'travel.html':
      'Travel',

    'education.html':
      'Education & Admissions',

    'consultancy.html':
      'Consultancy & Business Services',

    'events.html':
      'Events & Weddings',

    'contact.html':
      'General / Other'
  };


  function fieldValue(
    form,
    name
  ){

    const field=
      form.elements[name];

    return field
      ? String(field.value || '').trim()
      : '';
  }


  function buildInquiryPayload(
    form
  ){

    const page=
      (
        window.location.pathname
          .split('/')
          .pop() ||
        'index.html'
      ).toLowerCase();


    const all=[
      ...form.elements
    ].filter(
      el=>
        el.name &&
        !el.disabled &&
        el.type!=='submit' &&
        el.type!=='button'
    );


    const commonNames=
      new Set([
        'name',
        'phone',
        'mobile',
        'email',
        'requirement',
        'category'
      ]);


    const details=[];


    all.forEach(
      el=>{

        const value=
          String(
            el.value || ''
          ).trim();

        if(
          !value ||
          commonNames.has(el.name)
        ){
          return;
        }

        const label=
          el.closest('label')
            ?.childNodes
            ?. [0]
            ?.textContent
            ?.trim() ||
          el.name;

        details.push(
          `${label}: ${value}`
        );
      }
    );


    const requirement=
      page==='contact.html'
        ? fieldValue(
            form,
            'category'
          )
        :
          (
            pageWing[page] ||
            form.getAttribute(
              'data-form-name'
            ) ||
            'General / Other'
          );


    const freeText=
      fieldValue(
        form,
        'requirement'
      );


    if(freeText){

      details.push(
        `Requirement Details: ${freeText}`
      );
    }


    return{

      name:
        fieldValue(
          form,
          'name'
        ),

      mobile:
        fieldValue(
          form,
          'phone'
        ) ||
        fieldValue(
          form,
          'mobile'
        ),

      email:
        fieldValue(
          form,
          'email'
        ),

      requirement,

      details:
        details.join('\n'),

      source:
        page
    };
  }


  function submitInquiry(
    payload
  ){

    try{

      if(
        navigator.sendBeacon
      ){

        const blob=
          new Blob(
            [
              JSON.stringify(
                payload
              )
            ],
            {
              type:
                'text/plain;charset=UTF-8'
            }
          );


        const sent=
          navigator.sendBeacon(
            INQUIRY_API_URL,
            blob
          );


        if(sent){
          return true;
        }
      }

    }catch(error){
      /* fallback below */
    }


    try{

      const iframe=
        document.createElement(
          'iframe'
        );

      const iframeName=
        'madhyumInquiryFrame_'+
        Date.now();


      iframe.name=
        iframeName;


      iframe.setAttribute(
        'aria-hidden',
        'true'
      );


      iframe.style.position=
        'fixed';

      iframe.style.width=
        '1px';

      iframe.style.height=
        '1px';

      iframe.style.opacity=
        '0';

      iframe.style.pointerEvents=
        'none';

      iframe.style.border=
        '0';


      const form=
        document.createElement(
          'form'
        );


      form.method='POST';

      form.action=
        INQUIRY_API_URL;

      form.target=
        iframeName;

      form.style.display=
        'none';


      Object.keys(
        payload
      ).forEach(
        key=>{

          const input=
            document.createElement(
              'input'
            );

          input.type='hidden';

          input.name=key;

          input.value=
            String(
              payload[key] || ''
            );

          form.appendChild(
            input
          );
        }
      );


      document.body.appendChild(
        iframe
      );

      document.body.appendChild(
        form
      );


      form.submit();


      setTimeout(
        ()=>{
          iframe.remove();
          form.remove();
        },
        10000
      );


      return true;

    }catch(error){

      return false;
    }
  }


  /* =========================================================
     CONNECT ALL FORMS
  ========================================================= */

  document.querySelectorAll(
    '[data-form-name]'
  ).forEach(
    form=>{

      form.addEventListener(
        'submit',
        e=>{

          e.preventDefault();


          const success=
            form.querySelector(
              '.form-success'
            );


          const button=
            form.querySelector(
              'button[type="submit"]'
            );


          const payload=
            buildInquiryPayload(
              form
            );


          if(
            !payload.name ||
            !payload.mobile ||
            !payload.requirement
          ){

            if(success){

              success.textContent=
                'Please complete the required fields before sending your request.';
            }

            return;
          }


          if(button){

            button.disabled=true;

            button.dataset.originalText=
              button.textContent;

            button.textContent=
              'Sending...';
          }


          if(success){
            success.textContent='';
          }


          const submitted=
            submitInquiry(
              payload
            );


          if(submitted){

            if(success){

              success.textContent=
                'Thank you. Your request has been received. We will contact you soon.';
            }

            form.reset();

          }else{

            if(success){

              success.textContent=
                'We could not send your request right now. Please try again in a moment.';
            }
          }


          if(button){

            setTimeout(
              ()=>{
                button.disabled=false;

                button.textContent=
                  button.dataset.originalText ||
                  'Send Your Request →';
              },
              500
            );
          }

        }
      );

    });


  /* =========================================================
     JS READY MARKER
  ========================================================= */

  window.MADHYUM_JS_READY=true;

})();
```
