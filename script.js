const disclaimer=document.getElementById('disclaimer');
const agreeBtn=document.getElementById('agreeBtn');
const declineBtn=document.getElementById('declineBtn');
const menuBtn=document.getElementById('menuBtn');
const mobileMenu=document.getElementById('mobileMenu');
const header=document.getElementById('header')||document.querySelector('.site-header');

if(disclaimer){
  const closeDisclaimer=()=>{
    sessionStorage.setItem('kridaDisclaimerAccepted','1');
    disclaimer.hidden=true;
    document.body.style.overflow='';
  };
  if(sessionStorage.getItem('kridaDisclaimerAccepted')==='1'){
    disclaimer.hidden=true;
  }else{
    document.body.style.overflow='hidden';
  }
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

document.querySelectorAll('.contact-form').forEach(form=>form.addEventListener('submit',e=>{
  e.preventDefault();
  const btn=e.currentTarget.querySelector('button[type="submit"]');
  if(!btn)return;
  const old=btn.innerHTML;
  btn.textContent='Enquiry form ready for backend connection';
  setTimeout(()=>btn.innerHTML=old,2400);
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
