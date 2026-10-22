/* ====================================================================== */
/*  Profdemaths 2.0 · v5 : fiches de TD par chapitre (taxonomie de Bloom) */
/*  Fichier séparé : ajoute l'onglet « Fiche de TD » aux chapitres qui    */
/*  en ont une (données dans td.js), avec corrigés et PDF à imprimer.     */
/* ====================================================================== */
(function(){
if(typeof chapHTML!=='function'||!window.TD)return;
const TD=window.TD,BL=window.TD_BLOOM;
const col=b=>(BL.find(x=>x[0]===b)||[0,0,'#555'])[2];
const isProf=()=>{try{return !!(PR&&PR.code)}catch(e){return false}};
const TS={open:{},all:false};
const css=document.createElement('style');
css.textContent=`.td-ex{border:1px solid var(--line,#e3e3e3);border-left:5px solid var(--bc);border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:8px;background:var(--card,#fff)}
.td-h{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.td-b{background:var(--bc);color:#fff;font-size:11px;font-weight:800;letter-spacing:.4px;padding:2px 8px;border-radius:99px}
.td-s{font-size:11.5px;opacity:.7}.td-e{line-height:1.55}.td-c{background:rgba(31,122,90,.08);border-radius:10px;padding:8px 10px;line-height:1.55}
.td-leg{display:flex;flex-wrap:wrap;gap:6px}.td-leg span{font-size:11.5px;padding:2px 8px;border-radius:99px;color:#fff}
.fr{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;margin:0 2px;line-height:1.1;font-size:.92em}.fr>span:first-child{border-bottom:1.2px solid currentColor;padding:0 3px}.fr>span:last-child{padding:0 3px}
.rad{border-top:1.2px solid currentColor;padding:0 2px}`;
document.head.appendChild(css);

function tdHTML(cid){
  const T=TD[cid],p=isProf();
  const leg=BL.map(b=>`<span style="background:${b[2]}" title="${b[1]}">${b[0]}</span>`).join('');
  const ex=T.ex.map((x,i)=>{const o=TS.all||TS.open[cid+i];
    return `<article class="td-ex" style="--bc:${col(x.b)}"><div class="td-h"><b>Exercice ${i+1}</b><span class="td-b">${x.b}</span><span class="td-s">${x.s}</span></div>
    <div class="td-e">${x.e}</div>
    ${o?`<div class="td-c"><b>${p?'Corrigé':'Éléments de réponse'} :</b><br>${x.c}</div>`:''}
    <button class="btn ghost" style="align-self:flex-start;padding:5px 12px;font-size:13px" data-act="td-c" data-i="${i}">${o?'Masquer':(p?'Voir le corrigé':'Voir les éléments de réponse')}</button></article>`}).join('');
  return `<section class="card" style="display:flex;flex-direction:column;gap:10px">
    <p class="eyebrow">Fiche de TD · cellule de mathématiques</p>
    <h2>Je m'exerce du plus simple au plus difficile</h2>
    <p class="small">Exercices tirés du livret du ministère, des devoirs, des compositions et du BFEM, rangés selon les six niveaux de Bloom. Cherche d'abord seul, puis vérifie.</p>
    <div class="td-leg">${leg}</div>
    <p class="small"><b>Objectifs :</b> ${T.obj.join(' · ')}</p>
    <div class="td-c"><b>L'essentiel à savoir</b><ul style="margin:4px 0 0 18px;padding:0">${T.rap.map(x=>`<li>${x}</li>`).join('')}</ul></div>
    <div class="row" style="display:flex;flex-wrap:wrap;gap:8px">
      <a class="btn gold" href="td/pdf/${cid}.pdf" target="_blank" rel="noopener">Télécharger la fiche (PDF)</a>
      ${p?`<a class="btn ghost" href="td/pdf/${cid}-corrige.pdf" target="_blank" rel="noopener">Fiche + corrigé (PDF)</a>`:''}
      <button class="btn ghost" data-act="td-all">${TS.all?'Tout masquer':'Afficher toutes les réponses'}</button>
    </div></section>${ex}`;
}

const orig=chapHTML;
window.chapHTML=function(){
  const cid=S.cid;
  if(!TD[cid]||(REG[cid]&&(REG[cid].monthly||REG[cid].blanc)))return orig.apply(this,arguments);
  if(S.tab!=='td'){
    const h=orig.apply(this,arguments);
    return h.replace(/(<nav class="tabs"[^>]*>[\s\S]*?)(<\/nav>)/,`$1<button class="tab" data-act="tab" data-t="td">Fiche de TD</button>$2`);
  }
  S.tab='cours';const h=orig.apply(this,arguments);S.tab='td';
  const i=h.indexOf('</nav>');
  const head=h.slice(0,i).replace(/class="tab on"/g,'class="tab"')+`<button class="tab on" data-act="tab" data-t="td">Fiche de TD</button></nav>`;
  return head+`<div style="display:flex;flex-direction:column;gap:14px">${tdHTML(cid)}</div>`;
};

document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act;if(!/^td-/.test(a))return;e.stopImmediatePropagation();e.preventDefault();
  if(a==='td-c'){const k=S.cid+b.dataset.i;if(TS.all){TS.all=false;TD[S.cid].ex.forEach((_,i)=>TS.open[S.cid+i]=true)}TS.open[k]=!TS.open[k]}
  else if(a==='td-all'){TS.all=!TS.all;if(!TS.all)TS.open={}}
  render();},true);
})();
