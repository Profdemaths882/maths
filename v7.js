/* ====================================================================== */
/*  Profdemaths 2.0 · v7 : second cycle (lycée)                           */
/*  - À l'inscription, l'élève choisit « Premier cycle » (6e → 3e, CEM     */
/*    Kennedy ou autre établissement, comme avant) ou « Second cycle ».    */
/*  - Second cycle : une classe par niveau et par série :                  */
/*    2nde L, 2nde S ; 1re L, 1re S1/S3, 1re S2 ; Tle L, Tle S1/S3, Tle S2 */
/*    (codes 2L, 2S, 1L, 1S1, 1S2, TL, TS1, TS2) + nom du lycée.           */
/*  - En attendant les cours du lycée, l'élève a accès aux révisions de    */
/*    tout le collège, aux devoirs en photo et aux cours en ligne.         */
/* ====================================================================== */
(function(){
if(typeof profilForm!=='function')return;
const LY={'2nde':{nom:'Seconde',p:'2',s:[['L','L'],['S','S']]},'1re':{nom:'Première',p:'1',s:[['L','L'],['S1','S1 / S3'],['S2','S2']]},'Tle':{nom:'Terminale',p:'T',s:[['L','L'],['S1','S1 / S3'],['S2','S2']]}};
const LAB={};Object.keys(LY).forEach(n=>LY[n].s.forEach(([c,l])=>{LAB[LY[n].p+c]=n+' '+l}));
window.LYLAB=LAB;                                  /* utilisé par clsLab (index.html) */
window.LYCL=Object.keys(LAB);                      /* 2L, 2S, 1L, 1S1, 1S2, TL, TS1, TS2 */
window.isLycee=p=>!!(p&&LY[p.niveau]);
const lyc=()=>isLycee(DB.profil);
const L=window.LYS={cycle:'',niv:'',ser:''};

/* accès : un élève du lycée peut réviser tout le collège */
const oCan=canNiv;
window.canNiv=function(n){return lyc()?true:oCan.apply(this,arguments)};

/* fonctions du collège qui attendent un niveau 6e-3e : rien à afficher pour un niveau du lycée */
['weakHTML','weakList'].forEach(f=>{if(typeof window[f]==='function'){const o=window[f];window[f]=function(n){return (typeof LV!=='undefined'&&!LV[n])?(f==='weakList'?[]:''):o.apply(this,arguments)}}});

/* ---------- formulaire d'inscription ---------- */
function champsLycee(d){const n=L.niv,sers=n?LY[n].s:[];
  return `<div class="full"><p class="lab">Mon niveau</p><div class="seg">${Object.keys(LY).map(k=>`<button type="button" class="segb ${n===k?'on':''}" data-act="ly-niv" data-v="${k}">${LY[k].nom}</button>`).join('')}</div></div>
  ${n?`<div class="full"><p class="lab">Ma série</p><div class="seg">${sers.map(([c,l])=>`<button type="button" class="segb ${L.ser===c?'on':''}" data-act="ly-ser" data-v="${c}">${n} ${l}</button>`).join('')}</div></div>`:''}
  <label class="full">Mon lycée<input id="pf-lycee" maxlength="80" value="${esc(d.ecole||'')}" placeholder="Ex. : Lycée Seydina Limamou Laye"></label>
  <p class="small full">Au second cycle, il y a une seule classe par série sur Profdemaths : par exemple <b>Tle S2</b> réunit tous les élèves de Terminale S2.</p>`}
function cycleHTML(){return `<div class="full"><p class="lab">Mon cycle</p><div class="seg">
  <button type="button" class="segb ${L.cycle==='1'?'on':''}" data-act="ly-cycle" data-v="1">Premier cycle (6e → 3e)</button>
  <button type="button" class="segb ${L.cycle==='2'?'on':''}" data-act="ly-cycle" data-v="2">Second cycle (lycée)</button></div></div>`}
const oForm=profilForm;
window.profilForm=function(){let h=oForm.apply(this,arguments);
  const P=DB.profil;
  if(P&&LY[P.niveau]){  /* profil lycée déjà enregistré : texte de l'établissement */
    return h.replace(/Établissement : <b>[\s\S]*?<\/b> · classe/,`Établissement : <b>${esc(P.ecole||'lycée')}</b> · classe`)}
  if(P&&P.niveau)return h;                        /* élève du collège déjà inscrit : rien ne change */
  const i=h.indexOf('<label class="full">Niveau'),j=h.indexOf('<label>Mon pseudo');
  if(i<0||j<0)return h;
  const d=S.draft||{};
  const mid=L.cycle==='2'?champsLycee(d):L.cycle==='1'?h.slice(i,j):'<p class="small full">Choisis d\'abord ton cycle.</p>';
  return h.slice(0,i)+cycleHTML()+mid+h.slice(j)};

/* garde la saisie avant de redessiner le formulaire */
function garder(){try{grabDraft()}catch(e){}const e=document.getElementById('pf-lycee');if(e){S.draft=S.draft||{};S.draft.ecole=e.value}}

/* ---------- accueil : carte du second cycle ---------- */
const oHome=homeHTML;
window.homeHTML=function(){const h=oHome.apply(this,arguments);if(!lyc())return h;const P=DB.profil;
  const carte=`<section class="card" style="display:flex;flex-direction:column;gap:8px;border-top:6px solid #B4442F">
    <p class="eyebrow">Second cycle · ${esc(clsLab(P.classe))}</p>
    <p><b style="color:var(--ink)">Les cours de ta classe arrivent bientôt.</b></p>
    <p class="small">En attendant, tu reçois les <b>devoirs en photo</b> et les <b>cours en ligne</b> de tes professeurs, et tu peux <b>réviser tout le programme du collège</b> (6e à 3e) : c'est la base du lycée.</p></section>`;
  const k=h.indexOf('<section class="levels">');return k<0?h+carte:h.slice(0,k)+carte+h.slice(k)};

/* ---------- actions ---------- */
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act;
  if(a==='ly-cycle'||a==='ly-niv'||a==='ly-ser'){e.stopImmediatePropagation();e.preventDefault();garder();
    if(a==='ly-cycle'){L.cycle=b.dataset.v;if(L.cycle==='1'){L.niv='';L.ser=''}}
    if(a==='ly-niv'){if(L.niv!==b.dataset.v)L.ser='';L.niv=b.dataset.v}
    if(a==='ly-ser')L.ser=b.dataset.v;
    S.err='';render();return}
  if(a!=='save-profil'||DB.profil||L.cycle==='1')return;
  e.stopImmediatePropagation();e.preventDefault();
  if(L.cycle!=='2'){S.err='Choisis ton cycle : premier cycle (collège) ou second cycle (lycée).';render();return}
  if(S.busy)return;garder();
  if(!S.cgu){S.err="Coche la case pour accepter les conditions d'utilisation.";render();return}
  const D=S.draft||{},t=x=>String(x==null?'':x).trim();
  const P={prenom:t(D.prenom),nom:t(D.nom),niveau:L.niv,pseudo:t(D.pseudo).toLowerCase(),etab:'LY',ecole:t(D.ecole)};
  const pin=t(D.pin);
  if(!P.prenom||!P.nom){S.err='Écris ton prénom et ton nom.';render();return}
  if(!L.niv){S.err='Choisis ton niveau : Seconde, Première ou Terminale.';render();return}
  if(!L.ser){S.err='Choisis ta série.';render();return}
  if(P.ecole.length<2){S.err='Écris le nom de ton lycée.';render();return}
  if(!/^[a-z0-9_.-]{3,20}$/.test(P.pseudo)){S.err='Choisis un pseudo de 3 à 20 caractères : lettres sans accent, chiffres, point, tiret ou _.';render();return}
  if(!/^\d{4}$/.test(pin)){S.err='Choisis un code secret de 4 chiffres.';render();return}
  P.classe=LY[L.niv].p+L.ser;
  const fin=ok=>{S.draft=null;P.ok=ok;if(!ok)P.pinTmp=pin;DB.profil=P;save();S.editProfil=false;S.busy=false;S.err='';S.view='home';
    L.cycle=L.niv=L.ser='';render();window.scrollTo({top:0,behavior:'smooth'});
    toast(ok?'Profil enregistré · @'+P.pseudo:'Profil enregistré. Ton pseudo sera vérifié à la prochaine connexion.');try{loadDevoirs(true)}catch(x){}};
  if(!trackOn()){fin(true);return}
  S.busy=true;S.err='';render();
  registerPseudo(P,pin).then(r=>{
    if(r===null){fin(false);return}
    if(!r.ok){S.busy=false;S.err=r.erreur||"Ce pseudo n'est pas disponible.";render();return}
    if(r.retour&&r.niveau){P.niveau=r.niveau;P.classe=String(r.classe||P.classe).toUpperCase();P.etab=r.etab||P.etab;P.ecole=r.ecole||P.ecole}
    else if(r.classe)P.classe=String(r.classe).toUpperCase();
    fin(true)});
},true);
})();
