(()=>{
  const path=location.pathname.replace(/\/$/,'');
  const profileMap={
    '/people/vidushpat-singhania.html':{
      areas:[
        ['Sports governance','/expertise/sports-gaming.html'],
        ['Gaming regulation','/expertise/sports-gaming.html'],
        ['Sponsorship & media rights','/expertise/sports-gaming.html'],
        ['Commercial agreements','/expertise/corporate-commercial.html']
      ]
    },
    '/people/aashita-khanna.html':{
      areas:[
        ['Sports & gaming','/expertise/sports-gaming.html'],
        ['Sports governance','/expertise/sports-gaming.html'],
        ['Commercial matters','/expertise/corporate-commercial.html']
      ]
    },
    '/people/p-jacob-ninan.html':{
      areas:[
        ['Gaming regulation','/expertise/sports-gaming.html'],
        ['Sports regulation','/expertise/sports-gaming.html'],
        ['Commercial agreements','/expertise/corporate-commercial.html'],
        ['IP & licensing','/expertise/intellectual-property.html']
      ]
    }
  };

  const practiceMap={
    '/expertise/sports-gaming.html':[
      ['Vidushpat Singhania','Managing Partner','Sports governance · Gaming regulation · Sponsorship & media rights','/people/vidushpat-singhania.html'],
      ['Aashita Khanna','Managing Associate','Sports & gaming · Governance · Commercial matters','/people/aashita-khanna.html'],
      ['P. Jacob Ninan','Senior Associate','Gaming regulation · Sports regulation · Commercial agreements','/people/p-jacob-ninan.html']
    ],
    '/expertise/intellectual-property.html':[
      ['Vidushpat Singhania','Managing Partner','Intellectual property · Media rights · Commercial matters','/people/vidushpat-singhania.html'],
      ['P. Jacob Ninan','Senior Associate','IP & licensing · Sponsorship · Gaming matters','/people/p-jacob-ninan.html']
    ],
    '/expertise/corporate-commercial.html':[
      ['Vidushpat Singhania','Managing Partner','Commercial agreements · Sports & gaming · Media rights','/people/vidushpat-singhania.html'],
      ['P. Jacob Ninan','Senior Associate','Commercial agreements · Regulatory matters · Sponsorship','/people/p-jacob-ninan.html']
    ],
    '/expertise/dispute-resolution.html':[
      ['Vidushpat Singhania','Managing Partner','Sports & gaming matters · Commercial matters','/people/vidushpat-singhania.html'],
      ['P. Jacob Ninan','Senior Associate','Regulatory matters · Gaming matters · Commercial agreements','/people/p-jacob-ninan.html']
    ]
  };

  const profile=profileMap[path];
  if(profile){
    const host=document.querySelector('.practice-intro > div:last-child');
    if(host&&!host.querySelector('.works-across')){
      const box=document.createElement('div');
      box.className='works-across';
      box.innerHTML=`<span class="works-across__label">Works across</span><div class="works-across__tags">${profile.areas.map(([label,url])=>`<a href="${url}">${label}</a>`).join('')}</div>`;
      host.prepend(box);
    }
  }

  const lawyers=practiceMap[path];
  if(lawyers){
    const main=document.querySelector('main');
    if(main&&!main.querySelector('.practice-lawyers')){
      const section=document.createElement('section');
      section.className='practice-lawyers';
      section.setAttribute('aria-labelledby','practice-lawyers-title');
      section.innerHTML=`<div class="practice-lawyers__head"><div><div class="eyebrow">People connected to this work</div><h2 id="practice-lawyers-title">Relevant lawyers.</h2></div><p>Profiles are connected to the matters and practice areas they work across, so visitors can move from an issue to the people behind it.</p></div><div class="practice-lawyers__grid">${lawyers.map(([name,role,areas,url])=>`<a class="practice-lawyer" href="${url}"><small>${role}</small><h3>${name}</h3><p>${areas}</p><b>View profile ↗</b></a>`).join('')}</div>`;
      const context=main.querySelector('.context-links');
      if(context)context.insertAdjacentElement('afterend',section);else main.appendChild(section);
    }
  }
})();