/* ====================================================================== */
/*  Profdemaths 2.0 · v9 : cours de 3e tirés du livre                      */
/*  « Collection √Racine – Mathématiques 3e » (Racine Thiam)               */
/*  - cours/<chapitre>.html : texte du livre, formules en LaTeX ($…$),     */
/*    rendues sur le téléphone par KaTeX (td/katex).                       */
/*  - Remplace l'onglet « Cours » des chapitres disponibles.               */
/* ====================================================================== */
(function(){
if(typeof REG==='undefined')return;
const LIVRE=['3e-RAC'];
const C={html:{},err:{}};let kx=null,css=false;
function needCss(){if(css)return;css=true;
  const l=document.createElement('link');l.rel='stylesheet';l.href='td/katex/katex.min.css';document.head.appendChild(l);
  const s=document.createElement('style');s.textContent=`
.bk{font-family:'Times New Roman','DejaVu Serif',Georgia,serif;font-size:16.5px;line-height:1.55;color:#1B2A4A;display:flex;flex-direction:column;gap:12px}
.bk p{margin:0 0 6px}.bk ul,.bk ol{margin:4px 0 6px;padding-left:20px}.bk li{margin:2px 0}.bk ul li::marker{content:'◆ ';color:#C9962B;font-size:.8em}
.bk-chap{display:flex;align-items:center;gap:14px;background:#1E3F8A;color:#fff;border-radius:12px;padding:12px 16px;border-bottom:4px solid #C9962B}.bk-chap span{width:46px;height:46px;border-radius:50%;background:#C9962B;color:#0F2552;font:800 26px Georgia,serif;display:flex;align-items:center;justify-content:center;flex:none}.bk-chap h2{margin:0;font:700 24px Georgia,serif;color:#fff}
.bk-row{display:grid;grid-template-columns:1fr;gap:12px;align-items:start}@media(min-width:760px){.bk-row{grid-template-columns:1fr 1fr}}
.bk-cols{display:block}@media(min-width:760px){.bk-cols{column-count:2;column-gap:22px}.bk-cols>*{break-inside:avoid}}
.bk-box{border-radius:12px;overflow:hidden;border:1.5px solid var(--bc);background:var(--bg);box-shadow:0 2px 8px rgba(15,37,82,.08)}.bk-box>h4{margin:0;padding:7px 12px;background:var(--bc);color:#fff;font:700 15px Georgia,serif}.bk-box>:not(h4){margin-left:12px;margin-right:12px}.bk-box>:last-child{margin-bottom:10px}.bk-box>h4+*{margin-top:9px}
.bk-navy{--bc:#1B2E5C;--bg:#fff}.bk-blue{--bc:#2F6FC0;--bg:#F3F6FD}.bk-green{--bc:#2E8B57;--bg:#F1F8F3}.bk-ent{--bc:#5E7394;--bg:#F3F4F6}.bk-gold{--bc:#C9962B;--bg:#FFFDF6}.bk-goldl{--bc:#E3C47A;--bg:#FFFCF2}.bk-goldl>h4{color:#7A5410}.bk-red{--bc:#B4442F;--bg:#FFF6F4}
.bk-hist{background:#FDF6E1;border-left:4px solid #C9962B;border-radius:8px;padding:8px 12px}.bk-hist h4{margin:0 0 4px;color:#8A6210;font:700 15px Georgia,serif}
.bk-part{margin:8px 0 0;color:#1E3F8A;font:700 21px Georgia,serif}.bk-part::first-letter{color:#C9962B}
.bk-sec{display:flex;align-items:center;gap:10px;margin:10px 0 0;color:#1E3F8A;font:700 18px Georgia,serif;border-bottom:2px solid #C9962B;padding-bottom:4px}.bk-sec>span:first-child{background:#1B2E5C;color:#fff;padding:2px 9px;border-radius:4px;font-size:15px}
.bk-sub{margin:6px 0 0;color:#2F6FC0;font:700 17px Georgia,serif}
.bk-lab{font:800 13px Arial,sans-serif;letter-spacing:.4px;color:#2F6FC0;margin-right:4px}.bk-lab.bk-or{color:#B8860B}.bk-bl{color:#1B2E5C}.bk-rouge{color:#B4442F}.bk-q{color:#B8860B;font-weight:700}
.bk-n{color:#1E3F8A;font-family:Arial,sans-serif;font-size:14px;margin-right:4px}
.bk-res{display:inline-block;border:1.5px solid #D9A63A;background:#FFF5D6;border-radius:6px;padding:0 6px}.bk-cadre{display:inline-block;border:1.5px solid #1B2A4A;padding:2px 8px}.bk-c{text-align:center}
.bk-key{display:inline-block;border:1.5px solid #1B2A4A;border-radius:3px;padding:0 5px;font-size:.92em}
.bk-ret{background:#F4F6FA;border:1.5px solid #2F6FC0;border-radius:10px;padding:8px 12px}.bk-retg{background:#FFF7DD;border-color:#E3C47A}
.bk-warn{background:#FFF1EF;border:1.5px solid #D9776A;border-radius:10px;padding:8px 12px}.bk-faux{color:#C0392B;font-family:Arial,sans-serif;font-size:13px;font-weight:700}
.bk-bulle{display:flex;gap:10px;align-items:center;background:#FFF8E1;border:1.5px solid #E3C47A;border-radius:12px;padding:8px 12px;font-style:italic;color:#7A5410}.bk-bulle img{width:44px;height:44px;border-radius:50%;border:1.5px solid #C9962B;flex:none;object-fit:cover}.bk-bulle p{margin:0}
.bk-tab{border-collapse:collapse;margin:4px 0;font-size:.95em}.bk-tab th,.bk-tab td{border:1px solid #7C8BA8;padding:3px 8px;text-align:center}.bk-tab th{background:#1B2E5C;color:#fff;font-weight:700}.bk-tab .bk-hl td{background:#FFF1C9}.bk-small{font-size:.9em}
.bk-grid td{padding:3px 10px 3px 0}.bk-dec td{padding:1px 8px;font-variant-numeric:tabular-nums}.bk-dec td:first-child{border-right:1.5px solid #1B2A4A;text-align:right}
.bk-fig{max-width:100%;height:auto;justify-self:center;align-self:center;border-radius:6px}
.bk code{font-family:monospace;background:#EEF1F7;padding:0 4px;border-radius:3px}
.bk .katex{font-size:1.05em}.bk .katex-display{margin:.4em 0;overflow-x:auto;overflow-y:hidden}
@media(max-width:560px){.bk{font-size:16px}.bk-chap h2{font-size:20px}}`;
  document.head.appendChild(s)}
function katexJs(){return kx||(kx=new Promise((ok,ko)=>{if(window.katex)return ok(window.katex);const s=document.createElement('script');s.src='td/katex/katex.min.js';s.onload=()=>ok(window.katex);s.onerror=()=>{kx=null;ko()};document.head.appendChild(s)}))}
const prep=t=>{t=t.replace(/(\d),(?=\d)/g,'$1{,}').replace(/\\begin\{array\}\{[^}]*\}/g,m=>m.replace(/\|/g,'\u0001'));let k=0;return t.replace(/(\\left|\\right|\\big|\\Big)?\|/g,(m,lr)=>lr?m:(k++%2?'\\rvert ':'\\lvert ')).replace(/\u0001/g,'|')};
function rendre(K,s){const r=(t,d)=>{try{return K.renderToString(prep(t),{displayMode:d,throwOnError:false,strict:'ignore'})}catch(e){return t}};
  return s.replace(/\$\$([\s\S]+?)\$\$/g,(_,t)=>r(t,true)).replace(/\$([^$]+?)\$/g,(_,t)=>r(t,false))}
const rr=cid=>{if(S.view==='chap'&&S.cid===cid&&(S.tab||'cours')==='cours')render()};
function charge(cid){if(cid in C.html)return;C.html[cid]=null;
  Promise.all([fetch('cours/'+cid+'.html',{cache:'no-cache'}).then(r=>{if(!r.ok)throw 0;return r.text()}),katexJs()])
  .then(([h,K])=>{const logo=(typeof LOGO==='string'?LOGO:'');
    C.html[cid]=rendre(K,h).replace(/<div class="bk-bulle">/g,`<div class="bk-bulle"><img src="${logo}" alt="">`);rr(cid)})
  .catch(()=>{delete C.html[cid];C.err[cid]=1;rr(cid)})}
/* l'activité de découverte du livre remplace l'ancienne carte « Activité de découverte » */
if(typeof decouvHTML==='function'){const o=decouvHTML;window.decouvHTML=function(cid){return LIVRE.includes(cid)?'':o.apply(this,arguments)}}
LIVRE.forEach(cid=>{const R=REG[cid];if(!R)return;const ancien=R.cours;
  R.cours=function(){needCss();const h=C.html[cid];
    if(h)return `<div class="bk">${h}<p class="small" style="text-align:center;font-family:Arial,sans-serif">Extrait du livre <b>Collection √Racine · Mathématiques 3<sup>e</sup></b> · © Racine Thiam · Profdemaths 2.0</p></div>`;
    if(C.err[cid]){delete C.err[cid];return typeof ancien==='function'?ancien.apply(this,arguments):''}
    charge(cid);return '<section class="card"><p>Chargement du cours…</p></section>'}});
})();
