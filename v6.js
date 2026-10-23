/* ====================================================================== */
/*  Profdemaths 2.0 · v6 : cours en ligne (Google Meet)                   */
/*  - Le prof dépose un lien Meet pour ses classes (onglet « Cours en     */
/*    ligne » de l'espace professeur).                                    */
/*  - L'élève voit le cours sur l'accueil et le rejoint d'un geste.       */
/*  Serveur : fichier Meet.gs (opérations meet, meetSuppr, meetListe ;    */
/*  la liste de l'élève arrive avec « mesdevoirs »).                      */
/* ====================================================================== */
(function(){
if(typeof devoirsCardHTML!=='function'||typeof loadDevoirs!=='function')return;
const MT={eleve:null,prof:null,load:false,busy:false,err:'',f:null,del:null};
try{const c=JSON.parse(localStorage.getItem('pdm_meet')||'null');if(Array.isArray(c))MT.eleve=c}catch(e){}
const RE_MEET=/^(?:https?:\/\/)?meet\.google\.com\/([a-z]{3}-[a-z]{4}-[a-z]{3})(?:[\/?#].*)?$/i,RE_CODE=/^([a-z]{3}-[a-z]{4}-[a-z]{3})$/i;
const lienOk=s=>{s=String(s||'').trim();const m=s.match(RE_MEET)||s.match(RE_CODE);return m?'https://meet.google.com/'+m[1].toLowerCase():''};
const pad=n=>String(n).padStart(2,'0');
const isoAuj=()=>{const d=new Date();return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
const hNow=()=>{const d=new Date();return pad(d.getHours())+':'+pad(d.getMinutes())};
const jour=iso=>{if(!iso)return 'Cours régulier';if(iso===isoAuj())return "Aujourd'hui";const t=new Date();t.setDate(t.getDate()+1);
  const dem=t.getFullYear()+'-'+pad(t.getMonth()+1)+'-'+pad(t.getDate());if(iso===dem)return 'Demain';
  const m=iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);return m?new Date(+m[1],+m[2]-1,+m[3]).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'}):iso};
const horaire=c=>c.debut?(c.fin?c.debut.replace(':',' h ')+' – '+c.fin.replace(':',' h '):'à '+c.debut.replace(':',' h ')):'';
/* statut : en cours, bientôt (moins de 30 min), terminé aujourd'hui */
function statut(c){if(!c.date||c.date!==isoAuj()||!c.debut)return '';const n=hNow();
  const avant=(()=>{const[h,m]=c.debut.split(':').map(Number);const t=h*60+m-30;return pad(Math.floor(Math.max(t,0)/60))+':'+pad(Math.max(t,0)%60)})();
  if(c.fin&&n>=c.fin)return 'fini';if(n>=c.debut)return 'live';if(n>=avant)return 'bientot';return ''}

/* ---------- élève : la liste arrive avec les devoirs ---------- */
const origLoad=loadDevoirs;
window.loadDevoirs=function(){
  const avant=new Set(Object.keys(window).filter(k=>k.indexOf('__pdmv')===0));
  const r=origLoad.apply(this,arguments);
  Object.keys(window).filter(k=>k.indexOf('__pdmv')===0&&!avant.has(k)).forEach(k=>{const f=window[k];if(typeof f!=='function'||f.__mt)return;
    const g=function(d){try{if(d&&d.ok){MT.eleve=Array.isArray(d.meet)?d.meet:[];try{localStorage.setItem('pdm_meet',JSON.stringify(MT.eleve))}catch(e){}}}catch(e){}return f.apply(this,arguments)};g.__mt=1;window[k]=g});
  return r};
function carteEleve(){const L=(MT.eleve||[]).filter(c=>statut(c)!=='fini');if(!L.length)return '';
  return `<section class="card" style="display:flex;flex-direction:column;gap:10px;border-top:6px solid #1a73e8">
    <p class="eyebrow">🎥 Cours en ligne</p>
    ${L.map(c=>{const s=statut(c);return `<div style="display:flex;flex-direction:column;gap:6px;padding:10px 12px;border:1.5px solid ${s==='live'?'#1e8e3e':'#c6d4f5'};border-radius:12px;background:${s==='live'?'#e6f4ea':'#f4f7fe'}">
      <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center"><b style="color:var(--ink)">${esc(c.titre)}</b>${s==='live'?'<span style="background:#1e8e3e;color:#fff;font-size:12px;font-weight:700;padding:2px 9px;border-radius:99px">● EN COURS</span>':s==='bientot'?'<span style="background:#C9962B;color:#fff;font-size:12px;font-weight:700;padding:2px 9px;border-radius:99px">BIENTÔT</span>':''}</div>
      <p class="small">${esc(jour(c.date))}${horaire(c)?' · '+esc(horaire(c)):''} · ${esc(c.matiere||'Mathématiques')}${c.par?' · '+esc(c.par):''}</p>
      ${c.consigne?`<p class="small">${esc(c.consigne)}</p>`:''}
      <a class="btn ${s==='live'?'gold':''}" style="align-self:flex-start;text-decoration:none" href="${esc(c.lien)}" target="_blank" rel="noopener">🎥 Rejoindre le cours</a></div>`}).join('')}
    <p class="small">Le lien ouvre Google Meet (installe l'application Google Meet sur ton téléphone). Entre avec ton vrai prénom et ton nom.</p></section>`}
const origCard=devoirsCardHTML;
window.devoirsCardHTML=function(){const h=origCard.apply(this,arguments);return h?carteEleve()+h:h};
setInterval(()=>{try{if(S.view==='home'&&(MT.eleve||[]).some(c=>c.date===isoAuj())&&typeof softRender==='function')softRender()}catch(e){}},60000);

/* ---------- professeur : onglet « Cours en ligne » ---------- */
const isProf=()=>{try{return !!(PR&&PR.code)}catch(e){return false}};
function charger(){if(MT.load||!isProf())return;MT.load=true;
  profOp({op:'meetListe'}).then(r=>{MT.load=false;if(r&&r.ok)MT.prof=r.meet||[];else{MT.prof=MT.prof||[];MT.err=(r&&r.erreur)||'Liste indisponible : vérifiez que le fichier Meet est installé sur le serveur.'}if(S.view==='prof'&&PR.tab==='meet')render()})}
function vide(){const me=PR.me||{};return {id:'',titre:'',lien:'',date:isoAuj(),debut:'',fin:'',classes:[],matiere:(me.matieres||['Mathématiques'])[0]||'Mathématiques',consigne:''}}
function ongletProf(){if(MT.prof===null)charger();const F=MT.f||(MT.f=vide()),me=PR.me||{};
  const ms=me.admin?['Mathématiques','Physique-Chimie','SVT']:(me.matieres||['Mathématiques']);
  const cls=(typeof profClasses==='function'?profClasses():me.classes||[]).filter(c=>/^(?:[3-6](?:[A-H]|HK)|2[LS]|1(?:L|S1|S2)|T(?:L|S1|S2))$/.test(c));
  const auj=isoAuj(),L=(MT.prof||[]).slice();
  return `<section class="card" style="display:flex;flex-direction:column;gap:12px;border-top:6px solid #1a73e8">
    <p class="eyebrow">🎥 Cours en ligne · Google Meet</p>
    <p class="small">1) Crée la réunion dans Google Meet, puis copie son lien. 2) Colle-le ici et coche tes classes. Les élèves de ces classes voient le cours sur leur page d'accueil et le rejoignent d'un geste.</p>
    <a class="btn ghost" style="align-self:flex-start;text-decoration:none" href="https://meet.google.com/new" target="_blank" rel="noopener">➕ Créer une réunion Meet</a>
    <div class="form">
      <label class="full">Lien de la réunion<input data-mt="lien" inputmode="url" autocomplete="off" value="${esc(F.lien)}" placeholder="https://meet.google.com/abc-defg-hij"></label>
      <label class="full">Titre<input data-mt="titre" maxlength="80" value="${esc(F.titre)}" placeholder="Ex. : Cours en ligne · Théorème de Thalès"></label>
      ${ms.length>1?`<label>Matière<select data-mt="matiere">${ms.map(m=>`<option ${F.matiere===m?'selected':''}>${esc(m)}</option>`).join('')}</select></label>`:''}
      <label>Date<input type="date" data-mt="date" min="${auj}" value="${esc(F.date)}"></label>
      <label>Début<input type="time" data-mt="debut" value="${esc(F.debut)}"></label>
      <label>Fin<input type="time" data-mt="fin" value="${esc(F.fin)}"></label>
      <label class="full">Consigne (facultatif)<input data-mt="consigne" maxlength="200" value="${esc(F.consigne)}" placeholder="Ex. : prévoir cahier de cours, règle et calculatrice"></label></div>
    <div><p class="lab">Classes</p><div class="cgrid">${cls.map(c=>`<label><input type="checkbox" data-mt="classes" value="${c}" ${F.classes.includes(c)?'checked':''}> ${esc(clsLab(c))}</label>`).join('')}</div></div>
    <p class="small">Sans date, le cours reste affiché jusqu'à ce que tu le retires (pratique pour un lien de classe permanent).</p>
    ${MT.err?`<p class="err">${esc(MT.err)}</p>`:''}
    <div class="row"><button class="btn gold" data-act="mt-save" ${MT.busy?'disabled':''}>${MT.busy?'Enregistrement…':F.id?'Enregistrer':'Publier le cours'}</button>${F.id?'<button class="btn ghost" data-act="mt-new">Annuler</button>':''}</div>
    ${MT.prof===null?'<p class="small">Chargement des cours…</p>':L.length?`<div class="clist">${L.map(c=>{const passe=c.date&&c.date<auj;return `<div class="crow" style="${passe?'opacity:.55':'border-left-color:#1a73e8'}"><div class="ct"><b>${esc(c.titre)}</b><small>${esc(jour(c.date))}${horaire(c)?' · '+esc(horaire(c)):''}${passe?' · passé':''} · ${esc(c.matiere)} · ${esc((c.classes||[]).map(clsLab).join(', '))}${me.admin&&c.par?' · '+esc(c.par):''}<br><a href="${esc(c.lien)}" target="_blank" rel="noopener">${esc(c.lien.replace('https://',''))}</a></small></div>
      <div class="row" style="gap:6px"><button class="btn ghost sm" data-act="mt-edit" data-id="${esc(c.id)}">Modifier</button>${MT.del===c.id?`<button class="btn sm" style="background:var(--red);color:#fff" data-act="mt-del-ok" data-id="${esc(c.id)}">Confirmer</button>`:`<button class="btn ghost sm" data-act="mt-del" data-id="${esc(c.id)}">Retirer</button>`}</div></div>`}).join('')}</div>`:'<p class="small">Aucun cours en ligne publié pour le moment.</p>'}
  </section>`}
const origNav=profNavHTML;
window.profNavHTML=function(){const h=origNav.apply(this,arguments);
  return h.replace(/(<div class="skills noprint">[\s\S]*?)(<\/div>)/,(m,a,b)=>a+`<button class="skill ${PR.tab==='meet'?'on':''}" data-act="pt-tab" data-t="meet">🎥 Cours en ligne</button>`+b)};
const origTab=profTabHTML;
window.profTabHTML=function(){if(PR.tab==='meet')return ongletProf();return origTab.apply(this,arguments)};

function lire(){const F=MT.f||(MT.f=vide());document.querySelectorAll('[data-mt]').forEach(el=>{const k=el.dataset.mt;
  if(k==='classes')return;F[k]=el.value});F.classes=[...document.querySelectorAll('[data-mt="classes"]:checked')].map(x=>x.value);return F}
document.addEventListener('input',e=>{if(e.target&&e.target.dataset&&e.target.dataset.mt)lire()},true);
document.addEventListener('change',e=>{if(e.target&&e.target.dataset&&e.target.dataset.mt)lire()},true);
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act;if(!/^mt-/.test(a))return;e.stopImmediatePropagation();e.preventDefault();
  if(a==='mt-new'){MT.f=vide();MT.err='';render();return}
  if(a==='mt-edit'){const c=(MT.prof||[]).find(x=>x.id===b.dataset.id);if(!c)return;MT.f={id:c.id,titre:c.titre,lien:c.lien,date:c.date||'',debut:c.debut||'',fin:c.fin||'',classes:(c.classes||[]).slice(),matiere:c.matiere,consigne:c.consigne||''};MT.err='';render();window.scrollTo(0,0);return}
  if(a==='mt-del'){MT.del=b.dataset.id;render();return}
  if(a==='mt-del-ok'){profOp({op:'meetSuppr',id:b.dataset.id}).then(r=>{MT.del=null;if(r&&r.ok){MT.prof=r.meet||[];toast('Cours retiré : les élèves ne le voient plus.')}else toast((r&&r.erreur)||'Échec.');render()});return}
  if(a==='mt-save'&&!MT.busy){const F=lire();MT.err='';
    const lien=lienOk(F.lien);
    if(!lien)MT.err="Colle le lien de la réunion Google Meet (il ressemble à https://meet.google.com/abc-defg-hij).";
    else if(String(F.titre||'').trim().length<3)MT.err='Écris le titre du cours.';
    else if(!F.classes.length)MT.err='Coche au moins une classe.';
    else if(F.debut&&F.fin&&F.fin<=F.debut)MT.err="L'heure de fin doit être après l'heure de début.";
    if(MT.err){render();return}
    MT.busy=true;render();
    profOp({op:'meet',id:F.id||'',lien,titre:F.titre,date:F.date||'',debut:F.debut||'',fin:F.fin||'',classes:F.classes,matiere:F.matiere,consigne:F.consigne||''}).then(r=>{MT.busy=false;
      if(r&&r.ok){MT.prof=r.meet||[];toast(F.id?'Cours modifié.':'Cours publié : vos élèves le voient sur leur accueil.');MT.f=vide()}else MT.err=(r&&r.erreur)||'Enregistrement impossible.';render()})}
},true);
})();
