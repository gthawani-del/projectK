const generatedAssets={
  '/assets/hero-sport.svg':'/assets/hero-home-desktop.jpg',
  '/assets/sports-gaming.svg':'/assets/practice-sports-gaming.jpg',
  '/assets/ip.svg':'/assets/practice-ip.jpg'
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
