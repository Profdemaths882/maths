/* ====================================================================== */
/*  Profdemaths 2.0 · v5 : séries d'exercices (fiches de TD) par chapitre */
/*  - Énoncés : td/html/<chapitre>.json (formules LaTeX déjà rendues).    */
/*  - Corrigés : sur le serveur seulement. Les profs les voient ; les     */
/*    élèves seulement quand l'administrateur les débloque.               */
/* ====================================================================== */
(function(){
if(typeof chapHTML!=='function')return;
/* Mise en page « série d'exercices » commune à l'appli et aux PDF (version en couleurs). */
var SX_BL = { 'Corrigé': '#1F7A5A', 'Connaître': '#5B6B8C', 'Comprendre': '#1F7A5A', 'Appliquer': '#1E3F8A', 'Analyser': '#6B3FA0', 'Évaluer': '#B86A12', 'Créer': '#B4442F' };
var SX_CSS = `.sx{position:relative;isolation:isolate;background:#FFFDF8;color:#1b1b1b;font-family:'Times New Roman','DejaVu Serif',Georgia,serif;font-size:16.5px;line-height:1.6;padding:20px 20px 24px;border-radius:14px;box-shadow:0 4px 18px rgba(30,63,138,.14);border:1px solid #E7DCC3;overflow:hidden}
.sx-wm{position:absolute;inset:0;z-index:-1;background-repeat:no-repeat;background-position:center 46%;background-size:min(70%,420px);opacity:.07;pointer-events:none}
.sx-head{display:flex;justify-content:space-between;gap:12px;font-size:12.5px;line-height:1.4;color:#1E3F8A;border-bottom:3px solid #C9962B;padding-bottom:8px}.sx-head .sx-r{text-align:right}.sx-head small{font-style:italic;color:#8A6210}.sx-head b{color:#B4442F}
.sx-logo{width:54px;height:54px;border-radius:50%;border:2px solid #C9962B;flex:none;align-self:center;background:#fff}
.sx-titre{margin:16px auto 18px;padding:10px 14px;text-align:center;max-width:560px;border-radius:14px;color:#fff;background:linear-gradient(135deg,#1E3F8A 0%,#2C58B8 60%,#1E3F8A 100%);box-shadow:0 5px 14px rgba(30,63,138,.35);border:2px solid #C9962B}
.sx-titre small{display:block;font-family:Arial,sans-serif;font-size:11.5px;letter-spacing:2.5px;color:#F3D489;font-weight:700}.sx-titre span{display:block;font-size:1.35em;font-weight:700;margin-top:2px}
.sx-leg{display:flex;flex-wrap:wrap;justify-content:center;gap:5px;margin:0 0 14px;font-family:Arial,sans-serif}.sx-leg span{color:#fff;font-size:11px;font-weight:700;padding:2px 9px;border-radius:99px}
.sx-ex{break-inside:avoid;page-break-inside:avoid;margin:0 0 16px;background:rgba(255,255,255,.8);border:1.5px solid var(--c,#1E3F8A);border-radius:12px;box-shadow:3px 4px 0 var(--cs,rgba(30,63,138,.18)),0 2px 10px rgba(0,0,0,.08);overflow:hidden}
.sx-eh{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:6px 12px;background:var(--c,#1E3F8A);color:#fff}
.sx-eh b{font-family:Arial,sans-serif;font-size:14px;letter-spacing:.4px}.sx-tag{font-family:Arial,sans-serif;font-size:10.5px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;background:rgba(255,255,255,.22);padding:1px 8px;border-radius:99px}.sx-meta{font-family:Arial,sans-serif;font-size:10.5px;opacity:.85;margin-left:auto}
.sx-eb{padding:10px 14px 12px}
.sx-consigne{font-style:italic;margin:0 0 8px}
.sx-qcm{width:100%;border-collapse:separate;border-spacing:0;font-size:.97em;border:1.5px solid #1E3F8A;border-radius:10px;overflow:hidden}.sx-qcm th,.sx-qcm td{border-bottom:1px solid #C9D3EA;border-right:1px solid #C9D3EA;padding:6px 8px;vertical-align:middle}
.sx-qcm th{background:#1E3F8A!important;color:#fff!important;font-family:Arial,sans-serif;font-weight:700;font-size:13px;text-align:center;letter-spacing:0;text-transform:none}.sx-qcm th:nth-child(n+3){background:#C9962B!important}
.sx-qcm tbody tr:nth-child(odd) td{background:rgba(234,240,252,.75)}.sx-qcm tbody tr:nth-child(even) td{background:rgba(255,255,255,.55)}.sx td{color:#1b1b1b}.sx-qcm td.n{text-align:center;width:30px;font-weight:700;color:#1E3F8A}.sx-qcm td.r{text-align:center}
.sx-cols{column-gap:22px}
.sx-cor{margin-top:20px}.sx-cor h3{margin:0 auto 14px;max-width:320px;text-align:center;color:#fff;background:linear-gradient(135deg,#1F7A5A,#2E9E76);border-radius:12px;padding:8px;font-size:1.15em;letter-spacing:2px;box-shadow:0 4px 12px rgba(31,122,90,.3)}
.sx-cor .sx-ex{--c:#1F7A5A;--cs:rgba(31,122,90,.18)}.sx .sx-cor .sx-cols{column-count:1!important}.sx-ok{display:inline-block;min-width:28px;text-align:center;font-weight:700;color:#fff;background:#1F7A5A;border-radius:6px;margin-right:6px}
.sx .katex{font-size:1.05em}.sx .katex-display{margin:.45em 0;overflow-x:auto;overflow-y:hidden}
@media (min-width:860px){.sx .sx-cols{column-count:2}}
@media (max-width:560px){.sx{padding:14px 10px;font-size:16px}.sx-head{font-size:10.5px}.sx-logo{width:40px;height:40px}.sx-qcm thead{display:none}.sx-qcm,.sx-qcm tbody,.sx-qcm tr,.sx-qcm td{display:block;width:auto;border:0}.sx-qcm{border:0}.sx-qcm tr{border:1.5px solid #1E3F8A;border-radius:10px;margin-bottom:8px;padding:6px 8px;background:#F3F6FD}
.sx-qcm tbody tr td{background:transparent!important;padding:2px 0;text-align:left!important;border:0}.sx-qcm td.n{display:inline}.sx-qcm td.q{display:inline}.sx-qcm td.r::before{content:attr(data-l) ") ";font-weight:700;color:#C9962B}}`;

function sxFeuille(o) {
  /* o = {cid, niv, titre, logo, data:{qcm,ex}, prof:bool, corr:null|{qcm:[[ok,jHTML]],ex:[html]}} */
  var d = o.data, L = ['A', 'B', 'C'];
  var box = function (n, b, body, meta) {
    var c = SX_BL[b] || '#1E3F8A';
    return '<div class="sx-ex" style="--c:' + c + ';--cs:' + c + '33"><div class="sx-eh"><b>Exercice ' + n + '</b>' + (b ? '<span class="sx-tag">' + b + '</span>' : '') + (meta ? '<span class="sx-meta">' + meta + '</span>' : '') + '</div><div class="sx-eb">' + body + '</div></div>';
  };
  var h = '<div class="sx">' + (o.logo ? '<div class="sx-wm" style="background-image:url(' + o.logo + ')"></div>' : '')
    + '<div class="sx-head"><div>République du Sénégal<br><small>Un Peuple – Un But – Une Foi</small><br>Ministère de l\'Éducation nationale<br>IA de Dakar · IEF de Dakar-Plateau<br><b>CEM John Fitzgerald Kennedy</b></div>'
    + (o.logo ? '<img class="sx-logo" src="' + o.logo + '" alt="">' : '')
    + '<div class="sx-r">Année scolaire 2026-2027<br>Cellule de mathématiques<br>Niveau : <b>' + o.niv + '</b><br>Prénom et nom : …………………<br>Classe : ………</div></div>'
    + '<div class="sx-titre"><small>SÉRIE D\'EXERCICES</small><span>' + o.titre + '</span></div>'
    + '<div class="sx-leg">' + Object.keys(SX_BL).filter(function (k) { return k !== 'Corrigé'; }).map(function (k) { return '<span style="background:' + SX_BL[k] + '">' + k + '</span>'; }).join('') + '</div>';
  h += box(1, 'Connaître', '<p class="sx-consigne">Pour chacun des énoncés suivants, une seule des réponses proposées est juste. Recopie le numéro de l\'énoncé suivi de la lettre de la bonne réponse.</p>'
    + '<table class="sx-qcm"><thead><tr><th>N°</th><th>Énoncés</th><th>Réponse A</th><th>Réponse B</th><th>Réponse C</th></tr></thead><tbody>'
    + d.qcm.map(function (q, i) { return '<tr><td class="n">' + (i + 1) + '</td><td class="q">' + q.q + '</td>' + q.r.map(function (r, j) { return '<td class="r" data-l="' + L[j] + '">' + r + '</td>'; }).join('') + '</tr>'; }).join('')
    + '</tbody></table>');
  h += '<div class="sx-cols">' + d.ex.map(function (x, i) { return box(i + 2, x.b, x.e, o.prof ? x.s : ''); }).join('') + '</div>';
  if (o.corr) {
    h += '<div class="sx-cor"><h3>CORRIGÉ</h3>'
      + box(1, 'Corrigé', o.corr.qcm.map(function (c, i) { return (i + 1) + ') <span class="sx-ok">' + c[0] + '</span>' + (c[1] ? ' ' + c[1] : ''); }).join('<br>'))
      + '<div class="sx-cols">' + o.corr.ex.map(function (c, i) { return box(i + 2, 'Corrigé', c); }).join('') + '</div></div>';
  }
  return h + '</div>';
}
if (typeof module !== 'undefined') module.exports = { SX_CSS: SX_CSS, sxFeuille: sxFeuille };
const LISTE='6e-DEC,6e-ADD,6e-SOU,6e-GEO,6e-RAN,5e-PUI,5e-SYM,5e-MUL,5e-ANG,4e-RAT,4e-DIS,4e-CAL,3e-RAC,3e-THA,3e-EQI'.split(',');
const isProf=()=>{try{return !!(PR&&PR.code)}catch(e){return false}};
const isAdmin=()=>{try{return !!(PR&&PR.code&&PR.me&&PR.me.admin)}catch(e){return false}};
const TS={data:{},err:{},corr:{},etat:{},show:{},busy:false};
let cssOk=false,kx=null;
function needCss(){if(cssOk)return;cssOk=true;const l=document.createElement('link');l.rel='stylesheet';l.href='td/katex/katex.min.css';document.head.appendChild(l);
  const s=document.createElement('style');s.textContent=SX_CSS+'.sx-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}';document.head.appendChild(s)}
function katexJs(){return kx||(kx=new Promise((ok,ko)=>{const s=document.createElement('script');s.src='td/katex/katex.min.js';s.onload=()=>ok(window.katex);s.onerror=()=>{kx=null;ko()};document.head.appendChild(s)}))}
const prep=t=>{t=t.replace(/(\d),(?=\d)/g,'$1{,}');let k=0;return t.replace(/(\\left|\\right)?\|/g,(m,lr)=>lr?m:(k++%2?'\\rvert ':'\\lvert '))};
function conv(K,s){const r=(t,d)=>{try{return K.renderToString(prep(t),{displayMode:d,throwOnError:false,strict:'ignore'})}catch(e){return t}};
  return s.replace(/\$\$([\s\S]+?)\$\$/g,(_,t)=>r(t,true)).replace(/\$([^$]+?)\$/g,(_,t)=>r(t,false))}
const rr=cid=>{if(S.cid===cid&&S.tab==='td')render()};

function charge(cid){if(cid in TS.data)return;TS.data[cid]=0;
  fetch('td/html/'+cid+'.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw 0;return r.json()}).then(d=>{TS.data[cid]=d;rr(cid)})
  .catch(()=>{delete TS.data[cid];TS.err[cid]=1;rr(cid)})}
function etat(cid){if(cid in TS.etat)return;TS.etat[cid]=null;
  if(isProf()){profOp({op:'tdCorrige',cid}).then(r=>{if(r&&r.ok){TS.etat[cid]={ouvert:r.ouvert,depuis:r.depuis};recoit(cid,r.c)}else TS.etat[cid]={err:(r&&r.erreur)||'Corrigé indisponible.'};rr(cid)});return}
  if(typeof trackOn==='function'&&!trackOn()){TS.etat[cid]={ouvert:false};return}
  const cb='tdc'+Date.now(),s=document.createElement('script');
  const fin=()=>{delete window[cb];s.remove()};
  window[cb]=r=>{fin();TS.etat[cid]=r&&r.ok?{ouvert:!!r.ouvert,depuis:r.depuis||''}:{ouvert:false};if(r&&r.ouvert)recoit(cid,r.c);rr(cid)};
  s.onerror=()=>{fin();delete TS.etat[cid];TS.err['c'+cid]=1;rr(cid)};
  s.src=TRACK_URL+'?action=corrige&cid='+encodeURIComponent(cid)+'&callback='+cb;document.body.appendChild(s)}
function recoit(cid,c){if(!c)return;katexJs().then(K=>{TS.corr[cid]={qcm:c.qcm.map(x=>[x[0],x[1]?conv(K,x[1]):'']),ex:c.ex.map(x=>conv(K,x))};rr(cid)}).catch(()=>{})}

function tdHTML(cid){
  needCss();
  const D=TS.data[cid];
  if(!D){if(!TS.err[cid])charge(cid);
    return `<section class="card"><p>${TS.err[cid]?'La série n\'a pas pu être chargée. Vérifie ta connexion puis rouvre l\'onglet.':'Chargement de la série d\'exercices…'}</p></section>`}
  etat(cid);
  const p=isProf(),E=TS.etat[cid],C=TS.corr[cid],c=chapInfo(cid);
  const voir=!!(TS.show[cid]&&C);
  let bar='';
  if(p){
    bar+=C?`<button class="btn ${voir?'ghost':'gold'}" data-act="td-voir">${voir?'Masquer le corrigé':'Afficher le corrigé'}</button>`:(E&&E.err?`<span class="small">${esc(E.err)}</span>`:'<span class="small">Chargement du corrigé…</span>');
    if(E&&!E.err)bar+=`<span class="small">${E.ouvert?'🔓 Corrigé débloqué pour les élèves'+(E.depuis?' depuis le '+E.depuis:''):'🔒 Corrigé bloqué pour les élèves'}</span>`;
    if(isAdmin()&&E&&!E.err)bar+=`<button class="btn ${E.ouvert?'ghost':'gold'}" data-act="td-ouvrir" ${TS.busy?'disabled':''}>${E.ouvert?'Rebloquer le corrigé':'Débloquer le corrigé pour les élèves'}</button>`;
  }else{
    if(E&&E.ouvert)bar+=C?`<button class="btn ${voir?'ghost':'gold'}" data-act="td-voir">${voir?'Masquer la correction':'Voir la correction'}</button>`:'<span class="small">Chargement de la correction…</span>';
    else bar+=`<span class="small">🔒 La correction n'est pas encore disponible : elle sera débloquée par l'administrateur, en général une semaine après la fin du chapitre. Cherche les exercices sur ton cahier.</span>`;
  }
  return `<section class="card" style="display:flex;flex-direction:column;gap:10px">
    <p class="eyebrow">Série d'exercices · cellule de mathématiques</p>
    <div class="sx-bar"><a class="btn ghost" href="td/pdf/${cid}.pdf" target="_blank" rel="noopener">Télécharger la série (PDF)</a>${bar}</div>
  </section>
  ${sxFeuille({cid,niv:c.niv,titre:c.titre,logo:(typeof LOGO==='string'?LOGO:''),data:D,prof:p,corr:voir?C:null})}`;
}

const orig=chapHTML;
window.chapHTML=function(){
  const cid=S.cid;
  if(LISTE.indexOf(cid)<0||(REG[cid]&&(REG[cid].monthly||REG[cid].blanc)))return orig.apply(this,arguments);
  if(S.tab!=='td'){
    const h=orig.apply(this,arguments);
    return h.replace(/(<nav class="tabs"[^>]*>[\s\S]*?)(<\/nav>)/,`$1<button class="tab" data-act="tab" data-t="td">Série d'exercices</button>$2`);
  }
  S.tab='cours';const h=orig.apply(this,arguments);S.tab='td';
  const i=h.indexOf('</nav>');
  const head=h.slice(0,i).replace(/class="tab on"/g,'class="tab"')+`<button class="tab on" data-act="tab" data-t="td">Série d'exercices</button></nav>`;
  return head+`<div style="display:flex;flex-direction:column;gap:14px">${tdHTML(cid)}</div>`;
};
window.TD_LISTE=LISTE;

document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act;if(!/^td-/.test(a))return;e.stopImmediatePropagation();e.preventDefault();
  const cid=S.cid;
  if(a==='td-voir'){TS.show[cid]=!TS.show[cid];render();return}
  if(a==='td-ouvrir'&&isAdmin()&&!TS.busy){const E=TS.etat[cid];if(!E)return;TS.busy=true;render();
    profOp({op:'tdOuvrir',cid,ouvrir:!E.ouvert}).then(r=>{TS.busy=false;if(r&&r.ok){const d=r.ouverts||{};TS.etat[cid]={ouvert:!!d[cid],depuis:d[cid]||''};toast(d[cid]?'Corrigé débloqué : les élèves peuvent le voir.':'Corrigé rebloqué.')}else toast((r&&r.erreur)||'Échec.');render()})}
},true);
})();
