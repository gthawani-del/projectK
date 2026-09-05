(()=>{
  const hero=document.querySelector('.hero');
  if(!hero||location.pathname!=='/')return;
  document.body.classList.add('home-page');

  const sectors=document.createElement('div');
  sectors.className='hero-sectors';
  sectors.setAttribute('aria-hidden','true');
  sectors.innerHTML='<span class="hero-sector is-active">Sports</span><span class="hero-sector">Gaming</span><span class="hero-sector">IP</span><span class="hero-sector">Business</span>';
  hero.appendChild(sectors);

  const progress=document.createElement('div');
  progress.className='hero-progress';
  progress.setAttribute('aria-hidden','true');
  hero.appendChild(progress);

  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced)return;

  const updatePointer=(x,y)=>{
    const r=hero.getBoundingClientRect();
    const px=((x-r.left)/Math.max(r.width,1)-.5)*2;
    const py=((y-r.top)/Math.max(r.height,1)-.5)*2;
    hero.style.setProperty('--hero-x',Math.max(-1,Math.min(1,px)).toFixed(3));
    hero.style.setProperty('--hero-y',Math.max(-1,Math.min(1,py)).toFixed(3));
  };

  if(window.matchMedia('(pointer:fine)').matches){
    hero.addEventListener('pointermove',e=>updatePointer(e.clientX,e.clientY),{passive:true});
    hero.addEventListener('pointerleave',()=>{
      hero.style.setProperty('--hero-x','0');
      hero.style.setProperty('--hero-y','0');
    });
  }

  const labels=[...sectors.children];
  const onScroll=()=>{
    const rect=hero.getBoundingClientRect();
    const total=Math.max(hero.offsetHeight,1);
    const p=Math.max(0,Math.min(1,-rect.top/total));
    progress.style.transform=`scaleX(${p.toFixed(3)})`;
    const idx=Math.min(labels.length-1,Math.floor(p*labels.length));
    labels.forEach((el,i)=>el.classList.toggle('is-active',i===idx));
  };
  onScroll();
  window.addEventListener('scroll',onScroll,{passive:true});
})();
