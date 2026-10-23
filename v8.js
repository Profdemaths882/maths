/* ====================================================================== */
/*  Profdemaths 2.0 · v8 : vidéos par chapitre (YouTube intégré)          */
/*  - Onglet « Vidéos » dans chaque chapitre.                             */
/*  - La vidéo se lit DANS l'application (lecteur YouTube intégré).       */
/*  - Les professeurs ajoutent / retirent les vidéos depuis cet onglet.   */
/*  Serveur : fichier Videos.gs (liste envoyée avec « mesdevoirs » pour   */
/*  l'élève ; opérations videos, video, videoSuppr pour le prof).         */
/* ====================================================================== */
(function(){
if(typeof chapHTML!=='function')return;
/* les 6 onglets d'un chapitre restent tous visibles sur téléphone (2 lignes au lieu d'un défilement caché) */
try{const st=document.createElement('style');st.textContent='@media (max-width:700px){.tabs{flex-wrap:wrap;overflow-x:visible}.tabs .tab{flex:1 1 30%;padding:9px 6px;font-size:14px}}';document.head.appendChild(st)}catch(e){}
const VD={list:null,load:false,err:'',play:'',f:{},busy:false,del:null};
try{const c=JSON.parse(localStorage.getItem('pdm_videos')||'null');if(Array.isArray(c))VD.list=c}catch(e){}
const isProf=()=>{try{return !!(PR&&PR.code)}catch(e){return false}};
const ytId=s=>{s=String(s||'').trim();const m=s.match(/^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})(?:[?&#\/].*)?$/)||s.match(/^([A-Za-z0-9_-]{11})$/);return m?m[1]:''};
const rr=()=>{if(S.view==='chap'&&S.tab==='vid')render()};
const garde=L=>{VD.list=Array.isArray(L)?L:[];try{localStorage.setItem('pdm_videos',JSON.stringify(VD.list))}catch(e){}};

/* élève : la liste arrive avec les devoirs (même principe que les cours en ligne) */
if(typeof loadDevoirs==='function'){const o=loadDevoirs;
  window.loadDevoirs=function(){const avant=new Set(Object.keys(window).filter(k=>k.indexOf('__pdmv')===0));const r=o.apply(this,arguments);
    Object.keys(window).filter(k=>k.indexOf('__pdmv')===0&&!avant.has(k)).forEach(k=>{const f=window[k];if(typeof f!=='function'||f.__vd)return;
      const g=function(d){try{if(d&&d.ok&&Array.isArray(d.videos)){garde(d.videos);rr()}}catch(e){}return f.apply(this,arguments)};g.__vd=1;for(const p in f)g[p]=f[p];window[k]=g});
    return r}}
/* prof : liste complète à l'ouverture de l'onglet */
function chargeProf(){if(VD.load)return;VD.load=true;profOp({op:'videos'}).then(r=>{VD.load=false;if(r&&r.ok)garde(r.videos);else VD.err=(r&&r.erreur)||'Liste indisponible : vérifiez que le fichier Videos est installé sur le serveur.';rr()})}

function lecteur(v){const on=VD.play===v.id;
  return `<article class="card" style="display:flex;flex-direction:column;gap:8px;padding:12px">
    <div style="position:relative;width:100%;padding-top:56.25%;border-radius:12px;overflow:hidden;background:#000">
      ${on?`<iframe src="https://www.youtube-nocookie.com/embed/${v.yt}?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="${esc(v.titre)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe>`
        :`<button data-act="vd-play" data-id="${esc(v.id)}" aria-label="Lire la vidéo" style="position:absolute;inset:0;width:100%;height:100%;border:0;padding:0;cursor:pointer;background:#000 url(https://i.ytimg.com/vi/${v.yt}/hqdefault.jpg) center/cover no-repeat">
          <span style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:68px;height:48px;border-radius:14px;background:rgba(204,0,0,.92);display:flex;align-items:center;justify-content:center"><span style="width:0;height:0;border-left:18px solid #fff;border-top:11px solid transparent;border-bottom:11px solid transparent;margin-left:4px"></span></span></button>`}
    </div>
    <div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start;flex-wrap:wrap"><b style="color:var(--ink)">${esc(v.titre)}</b>
      ${isProf()&&((PR.me&&PR.me.admin)||(PR.me&&PR.me.nom===v.par))?(VD.del===v.id?`<button class="btn sm" style="background:var(--red);color:#fff" data-act="vd-del-ok" data-id="${esc(v.id)}">Confirmer</button>`:`<button class="btn ghost sm" data-act="vd-del" data-id="${esc(v.id)}">Retirer</button>`):''}</div>
    ${isProf()&&v.par?`<p class="small">Ajoutée par ${esc(v.par)}</p>`:''}
  </article>`}
function ongletVideos(cid){
  if(isProf()&&VD.list===null&&!VD.load)chargeProf();
  if(!isProf()&&VD.list===null&&typeof loadDevoirs==='function')setTimeout(()=>loadDevoirs(true),0);
  const L=(VD.list||[]).filter(v=>v.chap===cid),F=VD.f[cid]||(VD.f[cid]={lien:'',titre:''});
  let h='';
  if(isProf())h+=`<section class="card" style="display:flex;flex-direction:column;gap:10px;border-top:6px solid #cc0000">
    <p class="eyebrow">Ajouter une vidéo à ce chapitre</p>
    <div class="form"><label class="full">Lien YouTube<input data-vd="lien" inputmode="url" autocomplete="off" value="${esc(F.lien)}" placeholder="https://youtu.be/… ou https://www.youtube.com/watch?v=…"></label>
      <label class="full">Titre<input data-vd="titre" maxlength="100" value="${esc(F.titre)}" placeholder="Ex. : Théorème de Thalès · cours complet"></label></div>
    ${VD.err?`<p class="err">${esc(VD.err)}</p>`:''}
    <div class="row"><button class="btn gold" data-act="vd-add" ${VD.busy?'disabled':''}>${VD.busy?'Enregistrement…':'Ajouter la vidéo'}</button></div>
    <p class="small">Toutes les vidéos YouTube sont acceptées (la tienne ou celles d'autres chaînes). Les élèves la regardent dans l'application, sans être envoyés sur YouTube.</p></section>`;
  h+=L.length?`<div style="display:flex;flex-direction:column;gap:12px">${L.map(lecteur).join('')}</div>`
    :`<section class="card"><p class="eyebrow">🎬 Vidéos</p><p>${VD.list===null?'Chargement des vidéos…':'Pas encore de vidéo pour ce chapitre. Elles arrivent bientôt !'}</p></section>`;
  return h}

const orig=chapHTML;
window.chapHTML=function(){
  const cid=S.cid;
  if(!cid||(typeof REG!=='undefined'&&REG[cid]&&(REG[cid].monthly||REG[cid].blanc)))return orig.apply(this,arguments);
  const bouton=on=>`<button class="tab${on?' on':''}" data-act="tab" data-t="vid">Vidéos${(VD.list||[]).some(v=>v.chap===cid)?' ▶':''}</button>`;
  if(S.tab!=='vid'){const h=orig.apply(this,arguments);return h.replace(/(<nav class="tabs"[^>]*>[\s\S]*?)(<\/nav>)/,(m,a,b)=>a+bouton(false)+b)}
  S.tab='cours';const h=orig.apply(this,arguments);S.tab='vid';
  const i=h.indexOf('</nav>');if(i<0)return h;
  const head=h.slice(0,i).replace(/class="tab on"/g,'class="tab"')+bouton(true)+'</nav>';
  return head+`<div style="display:flex;flex-direction:column;gap:14px">${ongletVideos(cid)}</div>`;
};

function lire(cid){const F=VD.f[cid]||(VD.f[cid]={});document.querySelectorAll('[data-vd]').forEach(el=>{F[el.dataset.vd]=el.value});return F}
document.addEventListener('input',e=>{if(e.target&&e.target.dataset&&e.target.dataset.vd&&S.cid)lire(S.cid)},true);
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act;if(!/^vd-/.test(a))return;e.stopImmediatePropagation();e.preventDefault();
  const cid=S.cid;
  if(a==='vd-play'){VD.play=b.dataset.id;render();return}
  if(a==='vd-del'){VD.del=b.dataset.id;render();return}
  if(a==='vd-del-ok'){profOp({op:'videoSuppr',id:b.dataset.id}).then(r=>{VD.del=null;if(r&&r.ok){garde(r.videos);toast('Vidéo retirée.')}else toast((r&&r.erreur)||'Échec.');render()});return}
  if(a==='vd-add'&&!VD.busy){const F=lire(cid);VD.err='';
    if(!ytId(F.lien))VD.err="Colle le lien d'une vidéo YouTube (il commence par https://youtu.be/ ou https://www.youtube.com/).";
    else if(String(F.titre||'').trim().length<3)VD.err='Écris le titre de la vidéo.';
    if(VD.err){render();return}
    VD.busy=true;render();
    const n=(VD.list||[]).filter(v=>v.chap===cid).length;
    profOp({op:'video',chap:cid,lien:F.lien,titre:F.titre,ordre:n+1}).then(r=>{VD.busy=false;
      if(r&&r.ok){garde(r.videos);VD.f[cid]={lien:'',titre:''};toast('Vidéo ajoutée : les élèves la voient dans ce chapitre.')}else VD.err=(r&&r.erreur)||'Enregistrement impossible.';render()})}
},true);
})();
