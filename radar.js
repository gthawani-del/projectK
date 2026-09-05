(()=>{
  if(location.pathname!=='/'&&location.pathname!=='/index.html')return;
  const anchor=document.getElementById('insights');
  if(!anchor)return;
  const radar=document.createElement('section');
  radar.className='reg-radar';
  radar.id='regulatory-radar';
  radar.setAttribute('aria-labelledby','reg-radar-title');
  radar.innerHTML=`
    <div class="reg-radar__head">
      <div><div class="eyebrow">Regulatory Radar</div><h2 id="reg-radar-title">What changed<br>recently.</h2></div>
      <p>A short, editorially selected view of developments relevant to Krida Legal's sectors. We link to the official source and keep commentary deliberately brief.</p>
    </div>
    <div class="reg-radar__meta"><span>Verified against official sources</span><span>Last reviewed: 06 Sep 2026</span></div>
    <div class="reg-radar__list">
      <article class="radar-card">
        <div class="radar-card__top"><span>Intellectual Property</span><time datetime="2026-09-04">04 Sep 2026</time></div>
        <h3>Patent Office issued draft examination guidelines for pharmaceutical and biotech applications.</h3>
        <p>IP India published draft examination guidance covering pharmaceutical patent applications and biotechnology applications.</p>
        <div class="radar-card__why"><small>Why it matters</small><p>Applicants, rights holders and advisers should review whether the proposed examination approach changes filing, prosecution or portfolio strategy.</p></div>
        <a class="radar-card__source" href="https://ipindia.gov.in/dynamic/news-updates" target="_blank" rel="noopener noreferrer">Official source <span>↗</span></a>
      </article>
      <article class="radar-card">
        <div class="radar-card__top"><span>Trade Marks</span><time datetime="2026-08-31">31 Aug 2026</time></div>
        <h3>Trade Marks Registry announced a special disposal drive for pending opposition matters.</h3>
        <p>The Registry published a special drive focused on settlement or withdrawal of pending trade mark opposition matters.</p>
        <div class="radar-card__why"><small>Why it matters</small><p>Parties with long-running opposition matters may want to check whether the drive creates a practical opportunity to resolve or narrow pending proceedings.</p></div>
        <a class="radar-card__source" href="https://ipindia.gov.in/dynamic/news-updates" target="_blank" rel="noopener noreferrer">Official source <span>↗</span></a>
      </article>
      <article class="radar-card">
        <div class="radar-card__top"><span>Gaming</span><time datetime="2026-04-22">22 Apr 2026</time></div>
        <h3>Online Gaming Authority of India was constituted and the 2026 rules were notified.</h3>
        <p>MeitY published the Promotion and Regulation of Online Gaming Rules, 2026, constituted the Online Gaming Authority of India and issued related enforcement notifications.</p>
        <div class="radar-card__why"><small>Why it matters</small><p>The framework materially changes the regulatory architecture for online gaming businesses, including compliance, oversight and enforcement considerations.</p></div>
        <a class="radar-card__source" href="https://www.meity.gov.in/documents/act-and-policies/promotion-andregulation-of-online-gaming-act-2025-and-its-corrigenda-kTMxQjMtQWa?pageTitle=Promotionand-Regulation-of-Online-Gaming-Act%2C-2025-and-its-Corrigenda" target="_blank" rel="noopener noreferrer">Official source <span>↗</span></a>
      </article>
    </div>
    <p class="reg-radar__note">For general information only. This module is not legal advice and is not intended to be a complete record of regulatory developments.</p>`;
  anchor.insertAdjacentElement('beforebegin',radar);
})();
