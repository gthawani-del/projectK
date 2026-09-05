const generatedAssets={
  '/assets/hero-sport.svg':'/assets/hero-home-desktop.jpg',
  '/assets/sports-gaming.svg':'/assets/practice-sports-gaming.jpg',
  '/assets/ip.svg':'/assets/practice-ip.jpg',
  '/assets/commercial.svg':'/assets/practice-corporate.jpg',
  '/assets/disputes.svg':'/assets/practice-dispute.jpg'
};
document.querySelectorAll('img[src]').forEach(img=>{
  const key=new URL(img.getAttribute('src'),location.origin).pathname;
  if(generatedAssets[key]) img.src=generatedAssets[key];
});

const disclaimer=document.getElementById('disclaimer');
const agreeBtn=document.getElementById('agreeBtn');
const declineBtn=document.getElementById('declineBtn');
const menuBtn=document.getElementById('menuBtn');
const mobileMenu=document.getElementById('mobileMenu');
const header=document.getElementById('header')||document.querySelector('.site-header');

if(disclaimer){
  const closeDisclaimer=()=>{sessionStorage.setItem('kridaDisclaimerAccepted','1');disclaimer.hidden=true;document.body.style.overflow=''};
  if(sessionStorage.getItem('kridaDisclaimerAccepted')==='1'){disclaimer.hidden=true}else{document.body.style.overflow='hidden'}
  agreeBtn?.addEventListener('click',closeDisclaimer);
  declineBtn?.addEventListener('click',()=>{window.location.href='about:blank'});
}

const toggleMenu=(force)=>{
  if(!mobileMenu||!menuBtn)return;
  const open=typeof force==='boolean'?force:!mobileMenu.classList.contains('is-open');
  mobileMenu.classList.toggle('is-open',open);
  mobileMenu.setAttribute('aria-hidden',String(!open));
  menuBtn.setAttribute('aria-expanded',String(open));
  menuBtn.setAttribute('aria-label',open?'Close menu':'Open menu');
  document.body.style.overflow=open?'hidden':'';
};
menuBtn?.addEventListener('click',()=>toggleMenu());
mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')toggleMenu(false)});

const hero=document.querySelector('.hero');
if(hero&&location.pathname==='/'){
  if(!document.querySelector('link[href="/navigator.css"]')){
    const css=document.createElement('link');css.rel='stylesheet';css.href='/navigator.css';document.head.appendChild(css);
  }
  const issueData={
    gaming:{title:'Gaming regulation',copy:'Start with the team that works across gaming regulation, market structure, commercial arrangements and related disputes.',links:[['Sports & Gaming','/expertise/sports-gaming.html','Relevant practice'],['P. Jacob Ninan','/people/p-jacob-ninan.html','Relevant profile']]},
    governance:{title:'Sports governance',copy:'For federation, league, governance, integrity and sports-structure matters, begin with Krida’s Sports & Gaming practice.',links:[['Sports & Gaming','/expertise/sports-gaming.html','Relevant practice'],['Vidushpat Singhania','/people/vidushpat-singhania.html','Relevant profile']]},
    sponsorship:{title:'Sponsorship & media rights',copy:'These matters often cross commercial agreements, intellectual property and sports-sector regulation.',links:[['Sports & Gaming','/expertise/sports-gaming.html','Start here'],['Intellectual Property','/expertise/intellectual-property.html','Connected expertise']]},
    ip:{title:'Trademark & intellectual property',copy:'For brand protection, licensing, content, technology and enforcement questions, start with Intellectual Property.',links:[['Intellectual Property','/expertise/intellectual-property.html','Relevant practice'],['People','/people.html','Find a lawyer']]},
    commercial:{title:'Commercial agreement',copy:'For contracts, transactions, investments and business structuring, start with Corporate & Commercial.',links:[['Corporate & Commercial','/expertise/corporate-commercial.html','Relevant practice'],['People','/people.html','Find a lawyer']]},
    dispute:{title:'Dispute',copy:'For contentious commercial, regulatory or sector-specific matters, start with Dispute Resolution.',links:[['Dispute Resolution','/expertise/dispute-resolution.html','Relevant practice'],['People','/people.html','Find a lawyer']]}
  };
  const section=document.createElement('section');
  section.className='issue-nav';section.id='start-here';
  section.innerHTML=`<div class="issue-nav__head"><div><div class="eyebrow">Start here</div><h2>What do you need<br>help with?</h2></div><p>Choose the issue closest to yours. We’ll point you to the most relevant part of Krida Legal. This is a navigation aid, not legal advice.</p></div><div class="issue-nav__layout"><div class="issue-nav__choices" role="group" aria-label="Choose an issue"><button class="issue-choice" data-issue="gaming" aria-pressed="true"><span>01</span><strong>Gaming regulation</strong><b>→</b></button><button class="issue-choice" data-issue="governance" aria-pressed="false"><span>02</span><strong>Sports governance</strong><b>→</b></button><button class="issue-choice" data-issue="sponsorship" aria-pressed="false"><span>03</span><strong>Sponsorship & media rights</strong><b>→</b></button><button class="issue-choice" data-issue="ip" aria-pressed="false"><span>04</span><strong>Trademark / IP</strong><b>→</b></button><button class="issue-choice" data-issue="commercial" aria-pressed="false"><span>05</span><strong>Commercial agreement</strong><b>→</b></button><button class="issue-choice" data-issue="dispute" aria-pressed="false"><span>06</span><strong>Dispute</strong><b>→</b></button></div><div class="issue-result" aria-live="polite"><div class="issue-result__label">Relevant starting point</div><h3></h3><p></p><div class="issue-result__links"></div><p class="issue-result__note">For general information only. Selecting an issue does not create an advocate–client relationship.</p></div></div>`;
  hero.insertAdjacentElement('afterend',section);
  const result=section.querySelector('.issue-result');
  const renderIssue=(key)=>{
    const data=issueData[key];if(!data)return;
    result.querySelector('h3').textContent=data.title;
    result.querySelector(':scope > p').textContent=data.copy;
    result.querySelector('.issue-result__links').innerHTML=data.links.map(([label,url,type])=>`<a href="${url}"><span><small>${type}</small>${label}</span><b>↗</b></a>`).join('');
    section.querySelectorAll('.issue-choice').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.issue===key)));
  };
  section.querySelectorAll('.issue-choice').forEach(btn=>btn.addEventListener('click',()=>renderIssue(btn.dataset.issue)));
  renderIssue('gaming');
}

document.querySelectorAll('.contact-form').forEach(form=>form.addEventListener('submit',async e=>{
  e.preventDefault();
  const btn=form.querySelector('button[type="submit"]');
  const note=form.querySelector('.form-note')||document.getElementById('formNote');
  if(!btn)return;
  const old=btn.innerHTML;
  btn.disabled=true;
  btn.textContent='Sending…';
  const data=Object.fromEntries(new FormData(form).entries());
  try{
    const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    const json=await r.json().catch(()=>({}));
    if(!r.ok)throw new Error(json.error||'Unable to send');
    form.reset();
    btn.textContent='Enquiry sent';
    if(note)note.textContent='Thank you. Your enquiry has been sent.';
  }catch(err){
    btn.textContent='Could not send';
    if(note)note.textContent='The contact service is not configured or is temporarily unavailable.';
  }finally{
    setTimeout(()=>{btn.innerHTML=old;btn.disabled=false},2500);
  }
}));

if(header){
  let lastY=0;
  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    header.style.transform=y>lastY&&y>120?'translateY(-120%)':'translateY(0)';
    header.style.transition='transform .35s ease';
    lastY=y;
  },{passive:true});
}
