/* ====================================================================== */
/*  Profdemaths 2.0 · v5 : séries d'exercices (fiches de TD) par chapitre */
/*  - Énoncés : td/html/<chapitre>.json (formules LaTeX déjà rendues).    */
/*  - Corrigés : sur le serveur seulement. Les profs les voient ; les     */
/*    élèves seulement quand l'administrateur les débloque.               */
/* ====================================================================== */
(function(){
if(typeof chapHTML!=='function')return;
/* Mise en page « série d'exercices » commune à l'appli et aux PDF. */
var SX_CSS = `.sx{background:#fff;color:#111;font-family:'Times New Roman','DejaVu Serif',Georgia,serif;font-size:15px;line-height:1.5;padding:18px 18px 22px;border-radius:6px;box-shadow:0 1px 6px rgba(0,0,0,.12)}
.sx-head{display:flex;justify-content:space-between;gap:12px;font-size:12.5px;line-height:1.35}.sx-head .sx-r{text-align:right}.sx-head small{font-style:italic}
.sx-titre{margin:12px auto 14px;border:2px solid #111;border-radius:4px;padding:6px 10px;text-align:center;font-weight:700;letter-spacing:.5px;max-width:520px}.sx-titre span{display:block;font-size:1.12em;letter-spacing:0}
.sx-ex{break-inside:avoid;page-break-inside:avoid;margin:0 0 12px}.sx-ex h4{display:inline;font-size:1em;margin:0;text-decoration:underline}.sx-meta{font-family:Arial,sans-serif;font-size:11px;color:#777;margin-left:6px}
.sx-qcm{width:100%;border-collapse:collapse;margin:8px 0 14px;font-size:.95em}.sx-qcm th,.sx-qcm td{border:1px solid #111;padding:4px 6px;vertical-align:middle}.sx-qcm th{background:#eee!important;color:#111!important;font-weight:700;text-align:center;font-size:inherit;letter-spacing:0;text-transform:none}.sx td{color:#111}.sx-qcm td.n{text-align:center;width:28px}.sx-qcm td.r{text-align:center}
.sx-cols{column-gap:26px;column-rule:1px solid #999}
.sx-cor{margin-top:16px;border-top:2px solid #111;padding-top:10px}.sx-cor h3{text-align:center;margin:0 0 8px;font-size:1.1em;letter-spacing:.5px}.sx-ok{display:inline-block;min-width:26px;text-align:center;font-weight:700;border:1px solid #111;border-radius:3px;margin-right:4px}
.sx .katex{font-size:1.06em}.sx .katex-display{margin:.4em 0;overflow-x:auto;overflow-y:hidden}
@media (min-width:760px){.sx .sx-cols{column-count:2}}
@media (max-width:560px){.sx{padding:14px 12px;font-size:14.5px}.sx-head{font-size:11px}.sx-qcm thead{display:none}.sx-qcm,.sx-qcm tbody,.sx-qcm tr,.sx-qcm td{display:block;width:auto;border:0}.sx-qcm tr{border:1px solid #111;margin-bottom:6px;padding:4px 6px}
.sx-qcm td{padding:1px 0;text-align:left!important}.sx-qcm td.n{display:inline;font-weight:700}.sx-qcm td.q{display:inline}.sx-qcm td.r::before{content:attr(data-l) ") ";font-weight:700}}`;

function sxFeuille(o) {
  /* o = {cid, niv, titre, data:{qcm,ex}, prof:bool, corr:null|{qcm:[[ok,jHTML]],ex:[html]}} */
  var d = o.data, L = ['A', 'B', 'C'];
  var h = '<div class="sx"><div class="sx-head"><div>République du Sénégal<br><small>Un Peuple – Un But – Une Foi</small><br>Ministère de l\'Éducation nationale<br>IA de Dakar · IEF de Dakar-Plateau<br><b>CEM John Fitzgerald Kennedy</b></div>'
    + '<div class="sx-r">Année scolaire 2026-2027<br>Cellule de mathématiques<br>Niveau : <b>' + o.niv + '</b><br>Prénom et nom : …………………<br>Classe : ………</div></div>'
    + '<div class="sx-titre">SÉRIE D\'EXERCICES<span>' + o.titre + '</span></div>';
  h += '<div class="sx-ex"><h4>Exercice 1 :</h4> Pour chacun des énoncés suivants, une seule des réponses proposées est juste. Recopie le numéro de l\'énoncé suivi de la lettre de la bonne réponse.'
    + '<table class="sx-qcm"><thead><tr><th>N°</th><th>Énoncés</th><th>Réponse A</th><th>Réponse B</th><th>Réponse C</th></tr></thead><tbody>'
    + d.qcm.map(function (q, i) { return '<tr><td class="n">' + (i + 1) + '</td><td class="q">' + q.q + '</td>' + q.r.map(function (r, j) { return '<td class="r" data-l="' + L[j] + '">' + r + '</td>'; }).join('') + '</tr>'; }).join('')
    + '</tbody></table></div><div class="sx-cols">';
  h += d.ex.map(function (x, i) { return '<div class="sx-ex"><h4>Exercice ' + (i + 2) + ' :</h4>' + (o.prof ? '<span class="sx-meta">' + x.b + ' · ' + x.s + '</span>' : '') + '<br>' + x.e + '</div>'; }).join('');
  h += '</div>';
  if (o.corr) {
    h += '<div class="sx-cor"><h3>CORRIGÉ</h3><div class="sx-ex"><h4>Exercice 1 :</h4><br>'
      + o.corr.qcm.map(function (c, i) { return (i + 1) + ') <span class="sx-ok">' + c[0] + '</span>' + (c[1] ? ' ' + c[1] : ''); }).join('<br>') + '</div><div class="sx-cols">'
      + o.corr.ex.map(function (c, i) { return '<div class="sx-ex"><h4>Exercice ' + (i + 2) + ' :</h4><br>' + c + '</div>'; }).join('') + '</div></div>';
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
  ${sxFeuille({cid,niv:c.niv,titre:c.titre,data:D,prof:p,corr:voir?C:null})}`;
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
