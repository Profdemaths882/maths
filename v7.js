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

/* ====================================================================== */
/*  v7 (suite) · le cycle se choisit dès l'ouverture de l'appli           */
/*  - Accueil (avant inscription) : « Collège » ou « Lycée » d'abord ;    */
/*    les messages d'accueil et le formulaire suivent ce choix.           */
/*  - Élève du lycée : accueil, mot du prof et guide de l'année (diapos)  */
/*    adaptés à sa classe (programme officiel 2006, séries S et L).       */
/* ====================================================================== */
(function(){
if(typeof gateHomeHTML!=='function'||typeof homeHTML!=='function')return;
const L=window.LYS||{};
const getC=()=>{try{return localStorage.getItem('pdm_cycle')||''}catch(e){return ''}};
const setC=v=>{try{v?localStorage.setItem('pdm_cycle',v):localStorage.removeItem('pdm_cycle')}catch(e){}};
const lyc=()=>typeof isLycee==='function'&&isLycee(DB.profil);
/* le choix fait à l'accueil pré-remplit le formulaire */
const syncForm=()=>{const c=getC();if(!DB.profil&&!L.cycle&&c)L.cycle=c==='lycee'?'2':'1'};

/* ---------- programmes officiels par classe (2006) ---------- */
const PG={
 '2S':{n:'2nde S',h:5,t:'Bienvenue au lycée !',p:"La Seconde S consolide tout le collège et installe les outils du lycée : calcul algébrique, vecteurs, fonctions. C'est l'année où l'on apprend à raisonner avec rigueur.",mot:"En Seconde, le rythme change : on ne laisse jamais un chapitre « pour plus tard ».",
  f:[['Activités numériques',['Calcul dans ℝ','Intervalles et calcul approché','Fonctions numériques','Équations, inéquations et systèmes','Polynômes et fractions rationnelles','Statistique']],['Activités géométriques',['Calcul vectoriel et barycentre','Repérage cartésien','Angles et trigonométrie','Produit scalaire','Transformations du plan','Géométrie dans l\'espace']]]},
 '2L':{n:'2nde L',h:3,t:'Bienvenue au lycée !',p:"En série L, les maths sont un outil au service des autres disciplines : lire un graphique, calculer un pourcentage, interpréter des données.",mot:"Trois heures par semaine : chaque séance compte, révise un peu après chaque cours.",
  f:[['Calcul et fonctions',['Calcul dans ℝ','Situations de proportionnalité','Fonction affine et droites du plan','Systèmes et inéquations','Équations et inéquations du second degré']],['Graphiques et données',['Lectures graphiques','Tracé de courbes','Statistique']]]},
 '1L':{n:'1re L',h:3,t:'L\'année des fonctions',p:"En Première L, on étudie les fonctions et les suites, et on apprend à compter et à résumer des données.",mot:"Garde tes cours de Seconde à portée de main : ils servent tous les jours.",
  f:[['Algèbre et données',['Polynômes et trinôme du second degré','Dénombrement','Statistique (nuage de points, ajustement)']],['Analyse',['Fonctions numériques : limites, continuité, dérivation','Étude de fonctions','Suites arithmétiques et géométriques']]]},
 '1S1':{n:'1re S1 / S3',h:7,t:'L\'année des outils puissants',p:"La Première S1 donne les grands outils de l'analyse et de la géométrie : suites, dérivation, angles orientés, géométrie dans l'espace.",mot:"Sept heures par semaine : travaille tes leçons le jour même, c'est la clé.",
  f:[['Algèbre et analyse',['Applications','Polynômes, équations et inéquations','Suites numériques','Fonctions : limites, continuité, dérivation','Dénombrement','Statistique']],['Géométrie et trigonométrie',['Compléments : barycentre, lignes de niveau','Transformations du plan','Angles orientés et trigonométrie','Géométrie dans l\'espace']]]},
 '1S2':{n:'1re S2',h:6,t:'L\'année de l\'analyse',p:"En Première S2, l'analyse prend toute sa place : limites, continuité, dérivation et étude de fonctions, avec les suites et le dénombrement.",mot:"Maîtrise les dérivées cette année : en Terminale, tout repose dessus.",
  f:[['Analyse',['Généralités sur les fonctions','Limites et continuité','Dérivation','Étude et représentation de fonctions','Suites numériques']],['Algèbre, géométrie, données',['Équations, inéquations, systèmes','Dénombrement','Statistique à une et deux variables','Outil vectoriel et analytique','Angles orientés et trigonométrie']]]},
 'TL':{n:'Tle L',h:3,t:'Cap sur le Bac !',p:"En Terminale L, on termine l'étude des fonctions (logarithme, exponentielle) et on prépare l'épreuve de maths du Bac.",mot:"Fais chaque mois un sujet du Bac en conditions réelles.",
  f:[['Algèbre et données',['Composition de fonctions, polynômes','Probabilités','Statistique (régression linéaire)']],['Analyse',['Limites, dérivées, étude de fonctions','Fonctions logarithme et exponentielle','Suites numériques','Calcul intégral']]]},
 'TS1':{n:'Tle S1 / S3',h:9,t:'Cap sur le Bac !',p:"La Terminale S1 est l'année la plus riche : nombres complexes, arithmétique, analyse complète, géométrie et probabilités.",mot:"Neuf heures par semaine : organise-toi, un chapitre non compris se rattrape tout de suite.",
  f:[['Algèbre et analyse',['Nombres complexes','Arithmétique','Suites numériques','Fonctions : limites, continuité, dérivation','Calcul intégral','Équations différentielles','Probabilités']],['Géométrie',['Barycentre et lignes de niveau','Géométrie plane','Produit vectoriel','Transformations (similitudes)','Coniques']]]},
 'TS2':{n:'Tle S2',h:5,t:'Cap sur le Bac !',p:"En Terminale S2, l'analyse domine : fonctions logarithme et exponentielle, intégrales, équations différentielles, avec les complexes et les probabilités.",mot:"Au Bac, le problème d'analyse vaut gros : entraîne-toi sur des études de fonctions complètes.",
  f:[['Analyse',['Fonctions : rappels et compléments, primitives','Fonctions logarithme et exponentielle','Suites numériques','Calcul intégral','Équations différentielles']],['Algèbre et données',['Nombres complexes','Statistique','Probabilités']]]}
};
window.PROG_LY=PG;

/* ---------- diapositives du guide (même style que le collège) ---------- */
const hd=(e,t)=>`<div style="display:flex;flex-direction:column;gap:2.4px"><p style="font-size:12.5px;font-weight:800;letter-spacing:1.0px;text-transform:uppercase;color:#8A6210">${e}</p><h2 style="font-family:'Montserrat', Arial, sans-serif;font-size:28.6px;font-weight:800;line-height:1.15;color:#0F2552">${t}</h2></div>`;
const mot=t=>`<div style="display:flex;flex-direction:row;align-items:center"><img src="%%LOGO%%" alt="" style="width:45px;height:45px;object-fit:cover;border-radius:50%;border:1.2px solid #C9962B"><div style="flex:1;display:flex;flex-direction:column;gap:1.8px;background:#FFFDF8;border:1px solid #C9962B;border-radius:3.6px 12px 12px 12px;padding:7.2px 10.8px"><p style="font-family:'Caveat', cursive;font-size:19px;font-weight:700;line-height:1.1;color:#8A6210">Le mot de Profdemaths 2.0</p><p style="font-size:14px;line-height:1.35;color:#1B2A4A">${t}</p></div></div>`;
const COL=['#1E3F8A','#1F7A5A','#B4442F','#6B3FA0'];
function guideLy(cl){const P=PG[cl];if(!P||typeof GUIDE==='undefined'||!GUIDE['3e'])return null;
  const B=GUIDE['3e'],cp=o=>Object.assign({},o),T=cl[0]==='T';
  const g0=cp(B[0]);g0.html=g0.html.replace('Classe de 3e','Classe de '+P.n).replace(/M\. Thiam · Professeur de mathématiques · CEM Kennedy/,'Profdemaths 2.0 · Second cycle');
  const g1={id:'ly1',part:'Ouverture',title:P.t,eyebrow:'Bienvenue en '+P.n,bg:B[1].bg,fg:B[1].fg,
    html:hd('Bienvenue en '+P.n,P.t)+`<p style="font-size:16px;line-height:1.45;color:#33415C">${P.p}</p>`+mot(P.mot)};
  const nb=P.f.reduce((a,x)=>a+x[1].length,0);
  const g2={id:'ly2',part:'Ouverture',title:P.h+' heures par semaine, deux semestres',eyebrow:"Organisation de l'année",bg:B[2].bg,fg:B[2].fg,
    html:hd("Organisation de l'année",P.h+' heures par semaine, deux semestres')+`<div style="display:flex;flex-direction:row;gap:8.4px">
      <div style="flex:1;display:flex;flex-direction:column;gap:3px;background:#0F2552;border-radius:7.2px;padding:10.8px 9.6px"><p style="font-family:'Montserrat', Arial, sans-serif;font-size:40px;font-weight:900;line-height:1;color:#E0B54A">${P.h} h</p><p style="font-size:14px;line-height:1.35;color:#F7F4EC">de mathématiques chaque semaine</p></div>
      <div style="flex:1;display:flex;flex-direction:column;gap:3px;background:#FFFDF8;border:1px solid #D5DDEE;border-radius:7.2px;padding:10.8px 9.6px"><p style="font-family:'Montserrat', Arial, sans-serif;font-size:40px;font-weight:900;line-height:1;color:#1E3F8A">2</p><p style="font-size:14px;line-height:1.35;color:#33415C">semestres, chacun clôturé par une <b>composition</b></p></div>
      <div style="flex:1;display:flex;flex-direction:column;gap:3px;background:#FFFDF8;border:1px solid #D5DDEE;border-radius:7.2px;padding:10.8px 9.6px"><p style="font-family:'Montserrat', Arial, sans-serif;font-size:40px;font-weight:900;line-height:1;color:#1F7A5A">${nb}</p><p style="font-size:14px;line-height:1.35;color:#33415C">chapitres au programme officiel</p></div>
      <div style="flex:1;display:flex;flex-direction:column;gap:3px;background:#FFFDF8;border:1px solid #D5DDEE;border-radius:7.2px;padding:10.8px 9.6px"><p style="font-family:'Montserrat', Arial, sans-serif;font-size:40px;font-weight:900;line-height:1;color:#8A6210">${T?'Bac':'+'}</p><p style="font-size:14px;line-height:1.35;color:#33415C">${T?'en fin d\'année : chaque leçon compte':'des devoirs surveillés et des interrogations'}</p></div></div>`+mot(T?'Le Bac se prépare dès octobre, pas en juin.':'Un devoir se prépare dès la première leçon du chapitre.')};
  const g3={id:'ly3',part:'Le programme de '+P.n,title:nb+' leçons, deux grandes familles',eyebrow:"Le programme en un coup d'œil",bg:B[3].bg,fg:B[3].fg,
    note:"D'après le programme officiel de mathématiques du second cycle (séries S et L, 2006). L'ordre des leçons suit la progression de ton professeur.",
    html:hd("Le programme en un coup d'œil",nb+' leçons, deux grandes familles')+`<div style="display:flex;flex-direction:row;gap:12px">${P.f.map((F,k)=>`<div style="flex:1;display:flex;flex-direction:column;gap:3.6px;background:#FFFDF8;border:1px solid #E2D8C3;border-top:3px solid ${COL[k]};border-radius:7.2px;padding:9px 10.8px"><h3 style="font-family:'Montserrat', Arial, sans-serif;font-size:17px;font-weight:800;color:${COL[k]}">${F[0]}</h3>${F[1].map((c,i)=>`<div style="display:flex;flex-direction:row;align-items:center;gap:5.4px"><p style="width:23px;height:23px;border-radius:50%;background:${COL[k]};color:#F7F4EC;font-size:12.5px;font-weight:800;text-align:center;line-height:1.9">${i+1}</p><p style="flex:1;font-size:14px;color:#1B2A4A">${c}</p></div>`).join('')}</div>`).join('')}</div>`};
  const rep=s=>String(s).replace(/Au BFEM/g,T?'Au Bac':'En devoir et en composition').replace(/le BFEM/g,T?'le Bac':'les compositions').replace(/BFEM/g,T?'Bac':'composition')
    .replace(/Tout le programme de 3e sur ton téléphone/g,'Les révisions de tout le collège et bientôt les cours de '+P.n+' sur ton téléphone').replace(/de 3e/g,'de '+P.n).replace(/en 3e/g,'en '+P.n);
  const fin=B.slice(7).map(x=>{const y=cp(x);y.html=rep(y.html);y.title=rep(y.title);y.eyebrow=rep(y.eyebrow||'');if(y.note)y.note=rep(y.note);return y});
  return [g0,g1,g2,g3].concat(fin)}
const CACHE={};const gly=cl=>CACHE[cl]||(CACHE[cl]=guideLy(cl));
const oGuide=guideHTML;
window.guideHTML=function(){const cl=S.niv;if(!PG[cl])return oGuide.apply(this,arguments);
  const G=gly(cl);if(!G)return '<section class="card"><p>Guide indisponible.</p></section>';
  const sv=GUIDE[cl],sl=LV[cl];GUIDE[cl]=G;LV[cl]={nom:PG[cl].n,color:'#B4442F',chaps:[]};
  let h;try{h=oGuide.apply(this,arguments)}finally{if(sv===undefined)delete GUIDE[cl];else GUIDE[cl]=sv;if(sl===undefined)delete LV[cl];else LV[cl]=sl}
  return h.replace(/Bienvenue en [^<]+</,'Bienvenue en '+PG[cl].n+'<').replace(/<button class="btn( ghost)?" data-act="level" data-n="[^"]*">[^<]*<\/button>/g,'<button class="btn$1" data-act="home">Retour à l\'accueil</button>')};

/* ---------- accueil avant inscription : choisir son cycle ---------- */
const HERO_LY='Cours, exercices corrigés, séries et évaluations de la Seconde à la Terminale, séries L et S. <b>Crée ton compte ou connecte-toi</b> pour commencer.';
const oGate=gateHomeHTML;
window.gateHomeHTML=function(){const c=getC();syncForm();let h=oGate.apply(this,arguments);
  const choix=`<section class="card" style="display:flex;flex-direction:column;gap:12px;border-top:6px solid var(--gold)">
    <p class="eyebrow">Bienvenue sur Profdemaths 2.0</p><h2 style="font-size:21px;margin:0">Tu es au collège ou au lycée ?</h2>
    <div class="seg"><button type="button" class="segb ${c==='college'?'on':''}" data-act="cy-pick" data-v="college">🏫 Collège<br><small>6e · 5e · 4e · 3e</small></button><button type="button" class="segb ${c==='lycee'?'on':''}" data-act="cy-pick" data-v="lycee">🎓 Lycée<br><small>2nde · 1re · Tle · séries L et S</small></button></div>
    <p class="small">Tu es professeur ? <button type="button" class="linkbtn" data-act="role-prof">Je suis professeur</button></p></section>`;
  if(!c){h=h.replace(/<p class="lead">[\s\S]*?<\/p>/,'<p class="lead">Cours, exercices corrigés, séries et évaluations, <b>du collège au lycée</b>. Choisis d\'abord ton cycle.</p>');const k=h.indexOf('</section>')+10;const i=h.indexOf('<section class="card"><p class="eyebrow">🔒');
    return h.slice(0,k)+choix+(i>0?h.slice(i):'')}
  if(c==='lycee')h=h.replace(/<p class="eyebrow">Mathématiques · [^<]*<\/p>/,'<p class="eyebrow">Mathématiques · Second cycle · 2026-2027</p>').replace(/<p class="lead">[\s\S]*?<\/p>/,`<p class="lead">${HERO_LY}</p>`);
  const k=h.indexOf('</section>')+10;
  const bandeau=`<div class="row" style="justify-content:space-between;align-items:center;gap:8px"><span class="small">${c==='lycee'?'🎓 Espace <b>lycée</b> (second cycle)':'🏫 Espace <b>collège</b> (6e à 3e)'}</span><button class="linkbtn" data-act="cy-pick" data-v="">Changer</button></div>`;
  return h.slice(0,k)+bandeau+h.slice(k)};

/* ---------- accueil d'un élève du lycée ---------- */
const oHome2=homeHTML;
window.homeHTML=function(){let h=oHome2.apply(this,arguments);if(!lyc())return h;const P=DB.profil,cl=P.classe,G=PG[cl];
  h=h.replace(/<p class="eyebrow">Mathématiques · [^<]*<\/p>/,`<p class="eyebrow">Mathématiques · ${esc(clsLab(cl))} · 2026-2027</p>`)
   .replace(/<p class="lead">[\s\S]*?<\/p>/,`<p class="lead">Ton espace de <b>${esc(clsLab(cl))}</b> : guide de l'année, cours en ligne et devoirs de tes professeurs, révisions du collège. Les cours de ta classe arrivent au fur et à mesure.</p>`)
   .replace(/<p>Choisis ton niveau, puis travaille[\s\S]*?<\/p><p>À la fin, envoie-moi[\s\S]*?<\/p>/,`<p>${G?esc(G.mot):''}</p><p>Commence par le <b>guide de l'année</b> : programme officiel, organisation et méthode pour réussir${cl[0]==='T'?' jusqu\'au Bac':''}.</p>`);
  const guide=G?`<section class="card guidecard"><img src="${LOGO}" alt=""><div><p class="eyebrow">Guide de l'année · ${esc(G.n)}</p><b>Programme, organisation, méthode</b><p class="small">Les diapos de rentrée de ta classe, à relire quand tu veux.</p></div><button class="btn gold" data-act="guide" data-n="${cl}">Ouvrir</button></section>`:'';
  const k=h.indexOf('<section class="card" style="display:flex;flex-direction:column;gap:8px;border-top:6px solid #B4442F">');
  h=k>=0?h.slice(0,k)+guide+h.slice(k):h;
  return h.replace('<section class="levels">','<p class="eyebrow" style="margin:4px 2px -4px">Réviser les bases du collège</p><section class="levels">')};

/* en-tête */
const oRender=render;
window.render=function(){const r=oRender.apply(this,arguments);try{const s=document.getElementById('sub');if(s&&!DB.profil&&getC()==='lycee')s.textContent='Maths au lycée · 2nde · 1re · Tle'}catch(e){}return r};

document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act;
  if(a==='cy-pick'){e.stopImmediatePropagation();e.preventDefault();const v=b.dataset.v||'';setC(v);L.cycle=v==='lycee'?'2':v==='college'?'1':'';if(v!=='lycee'){L.niv='';L.ser=''}render();window.scrollTo(0,0);return}
  if(a==='guide'&&PG[b.dataset.n]){e.stopImmediatePropagation();e.preventDefault();S.view='guide';S.niv=b.dataset.n;S.gi=null;render();window.scrollTo(0,0);return}
},true);/* le premier affichage a eu lieu avant le chargement de ce fichier : on redessine */
try{if(S.view==='home'||S.view==='guide')render()}catch(e){}
})();
