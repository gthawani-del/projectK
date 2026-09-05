(()=>{
  if(location.pathname!=='/'&&location.pathname!=='/index.html')return;
  const data=[
    {title:'Sports & Gaming',type:'Practice',url:'/expertise/sports-gaming.html',keywords:'sports gaming fantasy gaming betting esports athlete governance federation league sponsorship media rights regulatory regulation integrity talent',desc:'Governance, regulation, transactions, disputes, sponsorship, talent and sector-specific advisory.'},
    {title:'Intellectual Property',type:'Practice',url:'/expertise/intellectual-property.html',keywords:'ip intellectual property trademark copyright brand licensing content technology media enforcement infringement passing off design',desc:'Brand protection, licensing, content, technology, trademarks, copyright and enforcement.'},
    {title:'Corporate & Commercial',type:'Practice',url:'/expertise/corporate-commercial.html',keywords:'corporate commercial contracts agreement transaction investment structuring business advisory joint venture sponsorship licensing deal',desc:'Contracts, investments, transactions, structuring and strategic commercial arrangements.'},
    {title:'Dispute Resolution',type:'Practice',url:'/expertise/dispute-resolution.html',keywords:'dispute litigation arbitration mediation regulatory dispute contentious court tribunal pre dispute strategy enforcement',desc:'Litigation, arbitration, regulatory disputes and pre-dispute strategy.'},
    {title:'Vidushpat Singhania',type:'Lawyer',url:'/people/vidushpat-singhania.html',keywords:'vidushpat singhania managing partner sports gaming governance regulation dispute',desc:'Managing Partner. Sports, gaming, governance, regulatory and dispute matters.'},
    {title:'Aashita Khanna',type:'Lawyer',url:'/people/aashita-khanna.html',keywords:'aashita khanna managing associate lawyer sports commercial',desc:'Managing Associate at Krida Legal.'},
    {title:'P. Jacob Ninan',type:'Lawyer',url:'/people/p-jacob-ninan.html',keywords:'jacob ninan senior associate fantasy gaming real money gaming rmg FEMA RBI GST sponsorship anti doping regulatory sports gaming',desc:'Senior Associate. Sports and gaming, regulatory, commercial and related advisory.'},
    {title:'People',type:'Directory',url:'/people.html',keywords:'lawyers team partner associate counsel people find lawyer',desc:'Browse Krida Legal lawyers and profiles.'},
    {title:'Insights',type:'Insights',url:'/insights.html',keywords:'insights articles analysis updates sports gaming ip commercial regulation',desc:'Perspectives on sport, gaming, intellectual property and business.'}
  ];

  const css=document.createElement('link');css.rel='stylesheet';css.href='/search.css';document.head.appendChild(css);

  const nav=document.querySelector('.desktop-nav');
  const desktopBtn=document.createElement('button');desktopBtn.className='krida-search-trigger';desktopBtn.type='button';desktopBtn.textContent='Search';desktopBtn.setAttribute('aria-haspopup','dialog');
  nav?.appendChild(desktopBtn);

  const mobileNav=document.querySelector('.mobile-menu__inner');
  const mobileBtn=document.createElement('button');mobileBtn.className='krida-search-trigger krida-search-trigger--mobile';mobileBtn.type='button';mobileBtn.textContent='Search Krida by issue, sector or lawyer';mobileBtn.setAttribute('aria-haspopup','dialog');
  mobileNav?.appendChild(mobileBtn);

  const overlay=document.createElement('section');
  overlay.className='krida-search';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Search Krida Legal');overlay.setAttribute('aria-hidden','true');
  overlay.innerHTML=`<div class="krida-search__inner"><div class="krida-search__top"><div class="krida-search__label">Krida / Search</div><button class="krida-search__close" type="button" aria-label="Close search">×</button></div><h2>Search by issue,<br>sector or lawyer.</h2><div class="krida-search__box"><input id="kridaSearchInput" type="search" autocomplete="off" placeholder="Try ‘fantasy gaming’ or ‘arbitration’" aria-label="Search Krida Legal"><span>↵</span></div><div class="krida-search__examples" aria-label="Search examples"><button type="button">fantasy gaming</button><button type="button">sponsorship</button><button type="button">copyright</button><button type="button">arbitration</button></div><div class="krida-search__count" id="kridaSearchCount">Suggested starting points</div><div class="krida-search__results" id="kridaSearchResults"></div><p class="krida-search__note">This search helps you find relevant Krida Legal pages and profiles. It does not provide legal advice and does not create an advocate–client relationship.</p></div>`;
  document.body.appendChild(overlay);

  const input=overlay.querySelector('#kridaSearchInput');
  const results=overlay.querySelector('#kridaSearchResults');
  const count=overlay.querySelector('#kridaSearchCount');
  const closeBtn=overlay.querySelector('.krida-search__close');
  let lastFocus=null;

  const score=(item,q)=>{
    const terms=q.toLowerCase().trim().split(/\s+/).filter(Boolean);if(!terms.length)return 1;
    const hay=(item.title+' '+item.type+' '+item.keywords+' '+item.desc).toLowerCase();
    return terms.reduce((s,t)=>s+(hay.includes(t)?1:0),0);
  };
  const render=(q='')=>{
    const ranked=data.map(item=>({item,s:score(item,q)})).filter(x=>q?x.s>0:true).sort((a,b)=>b.s-a.s).slice(0,q?7:5);
    count.textContent=q?`${ranked.length} relevant ${ranked.length===1?'result':'results'}`:'Suggested starting points';
    if(!ranked.length){results.innerHTML='<div class="krida-search__empty">No direct match. Try a broader term such as “gaming”, “IP”, “commercial” or “dispute”.</div>';return;}
    results.innerHTML=ranked.map(({item})=>`<a class="krida-search__result" href="${item.url}"><small>${item.type}</small><div><h3>${item.title}</h3><p>${item.desc}</p></div><b>↗</b></a>`).join('');
  };
  const open=()=>{lastFocus=document.activeElement;overlay.classList.add('is-open');overlay.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';render('');setTimeout(()=>input.focus(),30)};
  const close=()=>{overlay.classList.remove('is-open');overlay.setAttribute('aria-hidden','true');document.body.style.overflow='';lastFocus?.focus?.()};
  desktopBtn.addEventListener('click',open);mobileBtn.addEventListener('click',open);closeBtn.addEventListener('click',close);
  input.addEventListener('input',()=>render(input.value));
  overlay.querySelectorAll('.krida-search__examples button').forEach(btn=>btn.addEventListener('click',()=>{input.value=btn.textContent;render(input.value);input.focus()}));
  overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('is-open'))close();if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();open()}});
  input.addEventListener('keydown',e=>{if(e.key==='Enter'){const first=results.querySelector('a');if(first)location.href=first.href}});
})();