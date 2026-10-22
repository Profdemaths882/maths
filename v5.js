/* ====================================================================== */
/*  Profdemaths 2.0 · v5 : fiches de TD par chapitre (taxonomie de Bloom) */
/*  Fichier séparé : ajoute l'onglet « Fiche de TD » aux chapitres qui    */
/*  en ont une. Les fiches (formules déjà rendues en LaTeX/KaTeX) sont    */
/*  chargées à la demande depuis td/html/<chapitre>.json.                 */
/* ====================================================================== */
(function(){
if(typeof chapHTML!=='function')return;
const LISTE='6e-DEC,6e-ADD,6e-SOU,6e-GEO,6e-RAN,5e-PUI,5e-SYM,5e-MUL,5e-ANG,4e-RAT,4e-DIS,4e-CAL,3e-RAC,3e-THA,3e-EQI'.split(',');
const BL=[['Connaître','Je me souviens du cours','#5B6B8C'],['Comprendre',"J'explique, je reconnais",'#1F7A5A'],['Appliquer',"J'utilise une règle, une méthode",'#1E3F8A'],
  ['Analyser',"Je décompose, je trouve l'erreur",'#6B3FA0'],['Évaluer','Je juge, je justifie, je décide','#B86A12'],['Créer',"J'invente, je construis",'#B4442F']];
const col=b=>(BL.find(x=>x[0]===b)||[0,0,'#555'])[2];
const isProf=()=>{try{return !!(PR&&PR.code)}catch(e){return false}};
const TS={open:{},all:false,data:{},err:{}};
let cssOk=false;
function needCss(){if(cssOk)return;cssOk=true;const l=document.createElement('link');l.rel='stylesheet';l.href='td/katex/katex.min.css';document.head.appendChild(l);
  const s=document.createElement('style');s.textContent=`.td-ex{border:1px solid var(--line,#e3e3e3);border-left:5px solid var(--bc);border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:8px;background:var(--card,#fff)}
.td-h{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.td-b{background:var(--bc);color:#fff;font-size:11px;font-weight:800;letter-spacing:.4px;padding:2px 8px;border-radius:99px}
.td-s{font-size:11.5px;opacity:.7}.td-e,.td-c{line-height:1.6;overflow-x:auto}.td-c{background:rgba(31,122,90,.08);border-radius:10px;padding:8px 10px}
.td-leg{display:flex;flex-wrap:wrap;gap:6px}.td-leg span{font-size:11.5px;padding:2px 8px;border-radius:99px;color:#fff}
.td-e .katex,.td-c .katex{font-size:1.08em}.td-e .katex-display,.td-c .katex-display{margin:.5em 0;overflow-x:auto;overflow-y:hidden}`;document.head.appendChild(s)}
function charge(cid){if(TS.data[cid]||TS.data[cid]===0)return;TS.data[cid]=0;
  fetch('td/html/'+cid+'.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw 0;return r.json()}).then(d=>{TS.data[cid]=d;if(S.cid===cid&&S.tab==='td')render()})
  .catch(()=>{delete TS.data[cid];TS.err[cid]=1;if(S.cid===cid&&S.tab==='td')render()})}

function tdHTML(cid){
  needCss();
  const T=TS.data[cid];
  if(!T){if(!TS.err[cid])charge(cid);
    return `<section class="card"><p>${TS.err[cid]?'La fiche n\'a pas pu être chargée. Vérifie ta connexion puis rouvre l\'onglet.':'Chargement de la fiche de TD…'}</p></section>`}
  const p=isProf();
  const leg=BL.map(b=>`<span style="background:${b[2]}" title="${b[1]}">${b[0]}</span>`).join('');
  const ex=T.ex.map((x,i)=>{const o=TS.all||TS.open[cid+i];
    return `<article class="td-ex" style="--bc:${col(x.b)}"><div class="td-h"><b>Exercice ${i+1}</b><span class="td-b">${x.b}</span><span class="td-s">${x.s}</span></div>
    <div class="td-e">${x.e}</div>
    ${o?`<div class="td-c"><b>${p?'Corrigé':'Éléments de réponse'}</b><br>${x.c}</div>`:''}
    <button class="btn ghost" style="align-self:flex-start;padding:5px 12px;font-size:13px" data-act="td-c" data-i="${i}">${o?'Masquer':(p?'Voir le corrigé':'Voir les éléments de réponse')}</button></article>`}).join('');
  return `<section class="card" style="display:flex;flex-direction:column;gap:10px">
    <p class="eyebrow">Fiche de TD · cellule de mathématiques</p>
    <h2>Je m'exerce, du plus simple au plus difficile</h2>
    <p class="small">Exercices tirés du livret du ministère, des devoirs, des compositions et du BFEM, rangés selon les six niveaux de la taxonomie de Bloom. Cherche d'abord seul sur ton cahier, puis vérifie.</p>
    <div class="td-leg">${leg}</div>
    <p class="small"><b>Objectifs :</b> ${T.obj.join(' · ')}</p>
    <div class="td-c"><b>L'essentiel à savoir</b><ul style="margin:4px 0 0 18px;padding:0">${T.rap.map(x=>`<li>${x}</li>`).join('')}</ul></div>
    <div style="display:flex;flex-wrap:wrap;gap:8px">
      <a class="btn gold" href="td/pdf/${cid}.pdf" target="_blank" rel="noopener">Télécharger la fiche (PDF)</a>
      ${p?`<a class="btn ghost" href="td/pdf/${cid}-corrige.pdf" target="_blank" rel="noopener">Fiche et corrigé (PDF)</a>`:''}
      <button class="btn ghost" data-act="td-all">${TS.all?'Tout masquer':'Afficher toutes les réponses'}</button>
    </div></section>${ex}`;
}

const orig=chapHTML;
window.chapHTML=function(){
  const cid=S.cid;
  if(LISTE.indexOf(cid)<0||(REG[cid]&&(REG[cid].monthly||REG[cid].blanc)))return orig.apply(this,arguments);
  if(S.tab!=='td'){
    const h=orig.apply(this,arguments);
    return h.replace(/(<nav class="tabs"[^>]*>[\s\S]*?)(<\/nav>)/,`$1<button class="tab" data-act="tab" data-t="td">Fiche de TD</button>$2`);
  }
  S.tab='cours';const h=orig.apply(this,arguments);S.tab='td';
  const i=h.indexOf('</nav>');
  const head=h.slice(0,i).replace(/class="tab on"/g,'class="tab"')+`<button class="tab on" data-act="tab" data-t="td">Fiche de TD</button></nav>`;
  return head+`<div style="display:flex;flex-direction:column;gap:14px">${tdHTML(cid)}</div>`;
};
window.TD_LISTE=LISTE;

document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act;if(!/^td-/.test(a))return;e.stopImmediatePropagation();e.preventDefault();
  const T=TS.data[S.cid];if(!T)return;
  if(a==='td-c'){const k=S.cid+b.dataset.i;if(TS.all){TS.all=false;T.ex.forEach((_,i)=>TS.open[S.cid+i]=true)}TS.open[k]=!TS.open[k]}
  else if(a==='td-all'){TS.all=!TS.all;if(!TS.all)TS.open={}}
  render();},true);
})();
