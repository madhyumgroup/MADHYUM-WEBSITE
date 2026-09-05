```javascript
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

      if(y>lastY && y>90){
        header.classList.add('nav-hidden');
      }else if(y<lastY){
        header.classList.remove('nav-hidden');
      }
    }

    lastY=y;
    ticking=false;
  }

  window.addEventListener('scroll',()=>{
    if(!ticking){
      requestAnimationFrame(onScroll);
      ticking=true;
    }
  },{passive:true});


  /* =====================================================
     MOBILE MENU
     ===================================================== */

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

  menuButton?.addEventListener('click',()=>{
    mobileMenu?.classList.contains('open')
      ? closeMenu()
      : openMenu();
  });

  closeButtons.forEach(button=>{
    button.addEventListener('click',closeMenu);
  });

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      closeMenu();
    }
  });


  /* =====================================================
     SEARCH
     ===================================================== */

  const S=(terms,page,label)=>
    terms.split('|').map(term=>[term,page,label]);

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
      'education|admission|admissions|course|courses|study|college|university|institute|ug|undergraduate|pg|postgraduate|professional|mbbs|bds|bams|nursing|physiotherapy|btech|be|bca|mca|mtech|bba|bcom|mba|pgdm|mcom|pilot training|aviation management|cabin crew|airport management|llb|ba llb|llm|bba llb|fashion design|interior design|graphic design|ui ux|hotel management|hospitality|culinary arts|journalism|mass communication|digital media|advertising|bsc|msc|biotechnology|agriculture|barch|march|urban planning|pharmacy|paramedical|education|psychology|india education|study abroad|uk|germany|ireland|usa|canada|australia|new zealand|uae|russia|georgia|kazakhstan|kyrgyzstan|uzbekistan|delhi|noida|dehradun|jaipur|chandigarh|lucknow|mumbai|pune|ahmedabad|vadodara|surat|bengaluru|hyderabad|chennai|coimbatore|kochi|mangalore|bhubaneswar|ranchi|patna|indore|nagpur|raipur|kolkata',
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

  const drawer=document.querySelector('.drawer');
  const searchInput=document.querySelector('#searchInput');
  const searchResults=document.querySelector('#searchResults');

  function openSearch(){
    drawer?.classList.add('open');
    drawer?.setAttribute('aria-hidden','false');

    setTimeout(()=>{
      searchInput?.focus();
    },80);
  }

  function closeSearch(){
    drawer?.classList.remove('open');
    drawer?.setAttribute('aria-hidden','true');
  }

  document.querySelectorAll('[data-search]').forEach(button=>{
    button.addEventListener('click',openSearch);
  });

  document.querySelectorAll('[data-close-search]').forEach(button=>{
    button.addEventListener('click',closeSearch);
  });

  drawer?.addEventListener('click',e=>{
    if(e.target===drawer){
      closeSearch();
    }
  });

  function esc(value){
    return value.replace(
      /[&<>'"]/g,
      character=>({
        '&':'&amp;',
        '<':'&lt;',
        '>':'&gt;',
        "'":'&#39;',
        '"':'&quot;'
      }[character])
    );
  }

  function renderSearch(q=''){

    if(!searchResults)return;

    const raw=q.trim().toLowerCase();

    if(!raw){

      searchResults.innerHTML=
        '<div class="result">' +
        '<strong>Start typing a requirement</strong>' +
        '<small>Try property, Dubai, honeymoon, MBBS, GST, wedding, Hajj, or membership.</small>' +
        '</div>';

      return;
    }

    const tokens=raw
      .split(/\s+/)
      .filter(Boolean);

    const seen=new Set();

    const matches=SEARCH_DATA

      .map(([termText,page,label])=>{

        const hay=termText.toLowerCase();

        const hits=tokens.filter(
          token=>hay.includes(token)
        ).length;

        return [
          termText,
          page,
          label,
          hits
        ];

      })

      .filter(
        ([termText,page,label,hits])=>
          hits===tokens.length ||
          (tokens.length===1 && hits>0)
      )

      .sort(
        (a,b)=>
          b[3]-a[3] ||
          a[0].length-b[0].length
      )

      .filter(([termText,page])=>{

        const key=page+'|'+termText;

        if(seen.has(key)){
          return false;
        }

        seen.add(key);

        return true;

      })

      .slice(0,40);


    if(!matches.length){

      searchResults.innerHTML=
        '<div class="result">' +
        '<strong>No matching keyword found</strong>' +
        '<small>Try a broader requirement or service name.</small>' +
        '</div>';

      return;
    }


    const pages={};

    matches.forEach(([termText,page,label])=>{

      (pages[page]??={
        label:label,
        terms:[]
      }).terms.push(termText);

    });


    searchResults.innerHTML=
      Object.entries(pages)
        .map(([page,value])=>
          `<a class="result" href="${page}">
            <strong>${esc(value.label)}</strong>
            <small>${esc(value.terms.slice(0,8).join(' • '))}</small>
          </a>`
        )
        .join('');

  }

  searchInput?.addEventListener(
    'input',
    e=>renderSearch(e.target.value)
  );

  renderSearch();


  /* =====================================================
     PHOTO SLOTS
     ===================================================== */

  document
    .querySelectorAll(
      '.section-photo-slot[data-photo], ' +
      '.package-photo[data-photo], ' +
      '.location-card-photo[data-photo], ' +
      '.category-card-photo[data-photo]'
    )
    .forEach(slot=>{

      const file=slot.getAttribute('data-photo');

      if(!file)return;

      const img=new Image();

      img.onload=()=>{
        slot.classList.add('has-photo');
        slot.style.backgroundImage=
          `url("images/${file}")`;
      };

      img.onerror=()=>{
        slot.classList.add('photo-pending');
      };

      img.src=`images/${file}`;

    });


  /* =====================================================
     HOME HERO IMAGE
     ===================================================== */

  const heroImage=
    document.querySelector('.layered-hero-image');

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


  /* =====================================================
     FIVE ROTATING WING PHOTOGRAPHS
     ===================================================== */

  document
    .querySelectorAll('.layered-wing img')
    .forEach(img=>{

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

    });


  /* =====================================================
     SERVICE PHOTO CIRCLES
     ===================================================== */

  document
    .querySelectorAll('.solution-panel[data-photo]')
    .forEach(panel=>{

      const file=
        panel.getAttribute('data-photo');

      if(file){

        panel.style.setProperty(
          '--solution-photo',
          `url("images/${file}")`
        );

      }

    });


  /* =====================================================
     SMOOTH INTERNAL LINKS
     ===================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link=>{

      link.addEventListener(
        'click',
        e=>{

          const id=
            link.getAttribute('href');

          if(!id || id==='#')return;

          const element=
            document.querySelector(id);

          if(!element)return;

          e.preventDefault();

          closeMenu();

          element.scrollIntoView({
            behavior:'smooth',
            block:'start'
          });

        }
      );

    });


  /* =====================================================
     REVEAL ANIMATIONS
     ===================================================== */

  const reveal=
    document.querySelectorAll('.reveal');

  if('IntersectionObserver' in window){

    const io=
      new IntersectionObserver(
        entries=>
          entries.forEach(entry=>{
            if(entry.isIntersecting){
              entry.target.classList.add('visible');
            }
          }),
        {
          threshold:.08
        }
      );

    reveal.forEach(element=>{
      io.observe(element);
    });

  }else{

    reveal.forEach(element=>{
      element.classList.add('visible');
    });

  }


  /* =====================================================
     HOMEPAGE HERO SLIDER
     ===================================================== */

  const wings=[
    ...document.querySelectorAll('.layered-wing')
  ];

  const prev=
    document.querySelector('#layeredPrev');

  const next=
    document.querySelector('#layeredNext');

  const dots=
    document.querySelector('#layeredDots');

  let active=0;
  let timer=null;
  let paused=false;


  if(wings.length){

    if(dots){

      dots.innerHTML='';

      wings.forEach((wing,index)=>{

        const dot=
          document.createElement('button');

        dot.type='button';

        dot.className='layered-dot';

        dot.setAttribute(
          'aria-label',
          'Show ' +
          (
            wing.getAttribute('aria-label') ||
            'business'
          )
        );

        dot.addEventListener(
          'click',
          ()=>{
            active=index;
            update();
            restart();
          }
        );

        dots.appendChild(dot);

      });

    }


    function update(){

      const classes=[
        'is-active',
        'position-right',
        'position-far-right',
        'position-far-left',
        'position-left'
      ];

      wings.forEach((wing,index)=>{

        wing.classList.remove(
          'position-left',
          'position-far-left',
          'is-active',
          'position-right',
          'position-far-right'
        );

        const relative=
          (index-active+wings.length) %
          wings.length;

        const className=
          classes[relative];

        if(className){
          wing.classList.add(className);
        }

        wing.setAttribute(
          'aria-current',
          relative===0
            ? 'true'
            : 'false'
        );

      });


      dots
        ?.querySelectorAll('.layered-dot')
        .forEach((dot,index)=>{
          dot.classList.toggle(
            'active',
            index===active
          );
        });

    }


    function goNext(){

      active=
        (active+1) %
        wings.length;

      update();

    }


    function goPrev(){

      active=
        (active-1+wings.length) %
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
      document.querySelector('.layered-hero');


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
        sx=e.changedTouches[0].clientX;
      },
      {passive:true}
    );


    hero?.addEventListener(
      'touchend',
      e=>{

        const dx=
          e.changedTouches[0].clientX-sx;

        if(Math.abs(dx)>35){

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


  /* =====================================================
     ACCESSIBLE SERVICE DETAILS
     ===================================================== */

  document
    .querySelectorAll('.service-more summary')
    .forEach(summary=>{
      summary.setAttribute(
        'role',
        'button'
      );
    });


  /* =====================================================
     PREMIUM HOVER HINTS
     ===================================================== */

  document
    .querySelectorAll(
      '.btn,' +
      '.smalllink,' +
      '.solution-link,' +
      '.service-more summary,' +
      '.contact-pill,' +
      '.menu-btn,' +
      '.iconbtn,' +
      '.layered-control,' +
      '.layered-dot'
    )
    .forEach(element=>{

      if(element.hasAttribute('title'))return;

      const label=
        element.getAttribute('aria-label') ||
        element.textContent
          .trim()
          .replace(/\s+/g,' ');

      if(label){
        element.setAttribute(
          'title',
          label
        );
      }

    });


  /* =====================================================
     HOMEPAGE LIVE STATISTICS
     ===================================================== */

  if(
    document.body.classList.contains(
      'home-page'
    )
  ){

    /*
     * YOUR LIVE MADHYUM APPS SCRIPT URL
     */
    const statsUrl=
      window.MADHYUM_INQUIRY_API_URL ||
      'https://script.google.com/macros/s/AKfycby1axGjQXJHFYlsvPK4O9hW-oETEKNz7nQy9pS-jkGiKE6e14ogG3oAOY1ZM0MqKOc/exec';


    /*
     * Persistent browser visitor ID.
     *
     * The same browser is counted once.
     * A new browser/device receives a new ID.
     */
    const visitorKey=
      'madhyum_visitor_id_v1';


    function getVisitorId(){

      try{

        let id=
          localStorage.getItem(
            visitorKey
          );


        if(!id){

          id=
            window.crypto?.randomUUID?.() ||
            (
              'v_' +
              Date.now().toString(36) +
              '_' +
              Math.random()
                .toString(36)
                .slice(2)
            );


          localStorage.setItem(
            visitorKey,
            id
          );

        }


        return id;

      }catch(error){

        return (
          'session_' +
          Date.now().toString(36) +
          '_' +
          Math.random()
            .toString(36)
            .slice(2)
        );

      }

    }


    /*
     * Animate the number from 0 to the
     * actual backend value.
     */
    function animateStat(
      element,
      target
    ){

      if(
        !element ||
        !Number.isFinite(target)
      ){
        return;
      }


      const end=
        Math.max(
          0,
          Math.round(target)
        );


      const start=0;

      const duration=1100;

      const started=
        performance.now();


      element.classList.remove(
        'is-loading'
      );


      function tick(now){

        const progress=
          Math.min(
            1,
            (now-started) /
            duration
          );


        const eased=
          1 -
          Math.pow(
            1-progress,
            3
          );


        const value=
          start +
          (end-start) *
          eased;


        element.textContent=
          Math.round(value)
            .toLocaleString(
              'en-IN'
            ) +
          '+';


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


    function setStatsError(
      values,
      status
    ){

      Object
        .values(values)
        .forEach(element=>{

          if(element){

            element.classList.remove(
              'is-loading'
            );

            element.textContent='—';

          }

        });


      if(status){

        status.textContent=
          'Live statistics are temporarily unavailable.';

      }

    }


    function loadLiveStats(){

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


      if(
        !values.visitors &&
        !values.inquiries
      ){

        return;

      }


      if(!statsUrl){

        if(status){

          status.textContent=
            'Live figures will appear here after the MADHYUM backend is connected.';

        }

        return;

      }


      Object
        .values(values)
        .forEach(element=>{
          element?.classList.add(
            'is-loading'
          );
        });


      /*
       * Fixed callback name.
       *
       * This avoids problems with some browsers,
       * GitHub Pages and Apps Script redirects.
       */
      const callbackName=
        'madhyumLiveStatsCallback';


      let settled=false;

      let script=null;

      let timeoutId=null;


      function cleanup(){

        if(timeoutId){

          clearTimeout(
            timeoutId
          );

          timeoutId=null;

        }


        if(script){

          script.remove();

          script=null;

        }


        try{

          delete window[
            callbackName
          ];

        }catch(error){

          window[
            callbackName
          ]=undefined;

        }

      }


      function fail(){

        if(settled)return;

        settled=true;

        cleanup();

        setStatsError(
          values,
          status
        );

      }


      /*
       * Remove any previous callback with the
       * same name before creating a new one.
       */
      try{

        delete window[
          callbackName
        ];

      }catch(error){

        window[
          callbackName
        ]=undefined;

      }


      window[
        callbackName
      ]=function(data){

        if(settled)return;

        settled=true;

        try{

          if(
            !data ||
            data.success !== true
          ){

            throw new Error(
              data?.message ||
              'Unable to load live statistics.'
            );

          }


          const visitors=
            Number(
              data.visitors
            );


          const inquiries=
            Number(
              data.inquiries
            );


          if(
            !Number.isFinite(visitors) ||
            !Number.isFinite(inquiries)
          ){

            throw new Error(
              'Invalid statistics received.'
            );

          }


          cleanup();


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

          cleanup();

          setStatsError(
            values,
            status
          );

        }

      };


      script=
        document.createElement(
          'script'
        );


      script.async=true;


      script.onerror=fail;


      const url=
        new URL(
          statsUrl,
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


      /*
       * Cache buster.
       */
      url.searchParams.set(
        '_',
        Date.now().toString()
      );


      script.src=
        url.toString();


      /*
       * Safety timeout.
       */
      timeoutId=
        setTimeout(
          fail,
          15000
        );


      document.head.appendChild(
        script
      );

    }


    loadLiveStats();

  }


  /* =====================================================
     INQUIRY FORMS
     ===================================================== */

  /*
   * Same Apps Script backend.
   *
   * EMAIL REMAINS OPTIONAL.
   */
  const INQUIRY_API_URL=
    window.MADHYUM_INQUIRY_API_URL ||
    'https://script.google.com/macros/s/AKfycby1axGjQXJHFYlsvPK4O9hW-oETEKNz7nQy9pS-jkGiKE6e14ogG3oAOY1ZM0MqKOc/exec';


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
      ? String(
          field.value || ''
        ).trim()
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
      element=>
        element.name &&
        !element.disabled &&
        element.type!=='submit' &&
        element.type!=='button'
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


    all.forEach(element=>{

      const value=
        String(
          element.value || ''
        ).trim();


      if(
        !value ||
        commonNames.has(
          element.name
        )
      ){

        return;

      }


      const label=
        element.closest('label')
          ?.childNodes
          ?.[
            0
          ]
          ?.textContent
          ?.trim() ||
        element.name;


      details.push(
        `${label}: ${value}`
      );

    });


    const requirement=
      page==='contact.html'
        ? fieldValue(
            form,
            'category'
          )
        : (
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


    return {

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

      requirement:
        requirement,

      details:
        details.join('\n'),

      source:
        page

    };

  }


  document
    .querySelectorAll(
      '[data-form-name]'
    )
    .forEach(form=>{

      form.addEventListener(
        'submit',
        async e=>{

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


          if(!INQUIRY_API_URL){

            if(success){

              success.textContent=
                'Your request form is ready. The secure submission connection will be activated after the MADHYUM backend is deployed.';

            }

            return;

          }


          if(button){

            button.disabled=true;

            button.dataset.originalText=
              button.textContent;

            button.textContent=
              'Sending…';

          }


          if(success){

            success.textContent='';

          }


          try{

            const response=
              await fetch(
                INQUIRY_API_URL,
                {
                  method:'POST',

                  headers:{
                    'Content-Type':
                      'text/plain;charset=utf-8'
                  },

                  body:
                    JSON.stringify(
                      payload
                    )
                }
              );


            const result=
              await response.json();


            if(!result.success){

              throw new Error(
                result.message ||
                'Unable to submit the inquiry.'
              );

            }


            if(success){

              success.textContent=
                `Thank you. Your request has been received${
                  result.inquiryId
                    ? ` (${result.inquiryId})`
                    : ''
                }. We will contact you soon.`;

            }


            form.reset();


          }catch(error){

            if(success){

              success.textContent=
                'We could not send your request right now. Please try again in a moment.';

            }

          }finally{

            if(button){

              button.disabled=false;

              button.textContent=
                button.dataset.originalText ||
                'Send Your Request →';

            }

          }

        }
      );

    });

})();
```
