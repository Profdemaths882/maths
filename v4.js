/* ====================================================================== */
/*  Profdemaths 2.0 · v4 : évaluations sur table (grilles de saisie),     */
/*  groupes de besoin recalculés, évolution des élèves (prof et élève).   */
/*  Fichier séparé, chargé après l'application : il complète l'appli      */
/*  sans toucher au reste.                                                */
/* ====================================================================== */
(function(){
const TYPE_T='Évaluation sur table';
const GCOL=['var(--red)','#C77700','var(--green)'];
const GNOM=k=>(GROUPES[k-1]||{}).nom||'';
const num=v=>{const x=parseFloat(String(v==null?'':v).replace(',','.'));return isNaN(x)?null:x};
const r1=x=>Math.round(x*10)/10;
const frN=x=>String(r1(x)).replace('.',',');
const BLOOM=['Connaître','Comprendre','Appliquer','Analyser','Évaluer','Créer'];
const gDeN20=n=>n<10?1:n<16?2:3;
const tsRow=r=>{const [d,m,y]=String(r.Date||r.d||'').split('/');const [h,mi]=String(r.Heure||r.h||'0:0').split(':');return new Date(+y,+m-1,+d,+h||0,+mi||0).getTime()||0};

/* ---------- groupe de besoin : dernière évaluation (positionnement, mois ou sur table) ---------- */
function evalsDe(rows,p){return rows.filter(r=>String(r.Pseudo||'').toLowerCase()===p&&(r.Type==='Test de positionnement'||r.Type==='Évaluation du mois'||r.Type===TYPE_T))
  .map(r=>{const pos=r.Type==='Test de positionnement',sc=num(r.Note)||0,n20=pos?r1(sc/25*20):(num(r['Note /20'])||r.n20||0);
    return{t:tsRow(r),date:r.Date,type:r.Type,titre:r.Chapitre,sc,sur:pos?25:(num(r.Sur)||20),n20,g:pos?posiGroupe(sc).k:gDeN20(n20),revoir:r['Compétences à revoir']||''}}).sort((a,b)=>a.t-b.t)}
const SRC=t=>t==='Test de positionnement'?'positionnement':t===TYPE_T?'éval. sur table':'éval. du mois';
window.posiParEleve=function(){const by={},rows=PR.rows||[],ps=new Set(rows.map(r=>String(r.Pseudo||'').toLowerCase()).filter(Boolean));
  ps.forEach(p=>{const L=evalsDe(rows,p),l=L[L.length-1];if(l)by[p]={t:l.t,sc:l.sc,sur:l.sur,date:l.date,k:l.g,src:SRC(l.type)}});return by};
/* élève : le serveur connaît la dernière évaluation, quelle qu'elle soit */
const _remedInfo=window.remedInfo;
window.remedInfo=function(){const sp=DV.remed&&DV.remed.pos,P=DB.profil;
  if(!sp||!P)return _remedInfo();
  if(sp.groupe!==1)return null;
  return{g:1,score:sp.score,sur:sp.sur||20,src:/positionnement/.test(sp.source||'')?'test de positionnement':String(sp.source||'').replace(/^Évaluation formative de/,'évaluation de'),cr:DV.remed&&DV.remed.creneau}};

/* ---------- petit graphique en courbe (SVG) ---------- */
function courbe(pts,o){o=o||{};const W=o.w||380,H=o.h||220,pl=30,pr=12,pt=12,pb=34;if(!pts.length)return '';
  const X=i=>pts.length===1?pl+(W-pl-pr)/2:pl+i*(W-pl-pr)/(pts.length-1),Y=v=>pt+(20-v)*(H-pt-pb)/20;
  const bands=[[0,10,'var(--red)'],[10,16,'#C77700'],[16,20,'var(--green)']].map(([a,b,c])=>`<rect x="${pl}" y="${Y(b)}" width="${W-pl-pr}" height="${Y(a)-Y(b)}" fill="${c}" opacity=".09"/>`).join('');
  const grid=[0,5,10,15,20].map(v=>`<line x1="${pl}" x2="${W-pr}" y1="${Y(v)}" y2="${Y(v)}" stroke="currentColor" opacity=".12"/><text x="${pl-6}" y="${Y(v)+4}" text-anchor="end" font-size="11" fill="currentColor" opacity=".6">${v}</text>`).join('');
  const line=pts.map((p,i)=>(i?'L':'M')+X(i).toFixed(1)+' '+Y(p.n20).toFixed(1)).join(' ');
  const dots=pts.map((p,i)=>`<circle cx="${X(i)}" cy="${Y(p.n20)}" r="5.5" fill="${GCOL[p.g-1]||'var(--blue)'}" stroke="var(--surface,#fff)" stroke-width="2"><title>${esc(p.date+' · '+p.titre+' : '+frN(p.n20)+'/20')}</title></circle>`).join('');
  const labs=pts.map((p,i)=>(pts.length<=8||i%Math.ceil(pts.length/8)===0||i===pts.length-1)?`<text x="${X(i)}" y="${H-12}" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".65">${esc(String(p.date).slice(0,5))}</text>`:'').join('');
  const vals=pts.length<=10?pts.map((p,i)=>`<text x="${X(i)}" y="${Y(p.n20)-10}" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">${frN(p.n20)}</text>`).join(''):'';
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Évolution des notes sur 20" style="display:block;color:var(--ink);max-width:100%">${bands}${grid}<path d="${line}" fill="none" stroke="var(--blue)" stroke-width="2.5" stroke-linejoin="round"/>${dots}${vals}${labs}</svg>
    <div class="row small" style="gap:12px;margin-top:4px"><span><b style="color:var(--red)">●</b> Remédiation (&lt; 10)</span><span><b style="color:#C77700">●</b> Application (10 à 16)</span><span><b style="color:var(--green)">●</b> Approfondissement (≥ 16)</span></div>`}
function puce(g){return g?`<span class="pill" style="background:${GCOL[g-1]};color:#fff">${g} · ${esc(GNOM(g))}</span>`:''}
function trajet(L){return L.map(e=>`<span title="${esc(e.titre+' · '+e.date)}" style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${GCOL[e.g-1]};color:#fff;font-weight:800;font-size:12px;line-height:22px;text-align:center">${e.g}</span>`).join('<span class="small" style="margin:0 2px">→</span>')}
function message(L,prenom){if(!L.length)return '';const l=L[L.length-1],a=L.length>1?L[L.length-2]:null,f=L[0],pn=prenom?' '+esc(prenom):'';
  if(l.g===3)return a&&a.g<3?`🏆 Bravo${pn} ! Tu es passé(e) en <b>approfondissement</b>. Ton travail paie : continue avec les défis et aide tes camarades.`:`🌟 Félicitations${pn} ! Tu restes en <b>approfondissement</b> avec ${frN(l.n20)}/20. Vise maintenant les olympiades !`;
  if(a&&l.n20>a.n20+0.4)return `📈 Tu progresses${pn} : de ${frN(a.n20)} à ${frN(l.n20)}/20 ! ${l.g===2?'Encore un effort pour atteindre 16/20 et l\'approfondissement.':'Continue ta remédiation, tu es sur la bonne voie.'}`;
  if(l.g===2)return `👍 C'est bien${pn} : tu es en <b>application</b>. Revois les compétences ci-dessous et entraîne-toi : 16/20 te fera passer en approfondissement.`;
  return f.g===1&&L.length>1?`💪 Courage${pn} ! Ne lâche rien : suis tes 2 heures de remédiation et refais les exercices des chapitres indiqués. Chaque petit progrès compte.`:`💪 Courage${pn} ! Avec la remédiation (2 h par semaine) et l'entraînement dans l'appli, tu vas remonter. On croit en toi !`}

/* ---------- élève : « Mon évolution » sur l'accueil ---------- */
function monEvolHTML(){const P=DB.profil,E=DV.evol;if(!P||!P.pseudo||!E||!E.length)return '';
  const L=E.filter(e=>e.g).map(e=>({date:e.d,titre:e.titre,type:e.type,n20:+e.n20,g:e.g,revoir:e.revoir})),l=L[L.length-1];if(!l)return '';
  const rev=String(l.revoir||'').split(/\s*[;,]\s*/).filter(Boolean).slice(0,6);
  return `<section class="card" style="display:flex;flex-direction:column;gap:10px;border-top:6px solid ${GCOL[l.g-1]}">
    <div class="row" style="justify-content:space-between;align-items:center"><p class="eyebrow">📈 Mon évolution</p>${puce(l.g)}</div>
    <p style="margin:0">${message(L,P.prenom)}</p>
    ${courbe(L,{h:190})}
    <div class="small">Mon parcours : ${trajet(L)}</div>
    ${rev.length?`<div class="enonce" style="white-space:normal"><p class="small" style="margin:0"><b>À retravailler</b> (${esc(l.titre)}) :</p><ul style="margin:6px 0 0;padding-left:18px">${rev.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:''}
    <p class="small">Ton groupe est recalculé après chaque évaluation : test de positionnement, évaluation du mois ou évaluation sur table corrigée par ton professeur.</p></section>`}
const _home=window.homeHTML;
window.homeHTML=function(){const h=_home();try{const c=monEvolHTML();if(!c)return h;const i=h.indexOf('<section class="levels">');return i>0?h.slice(0,i)+c+h.slice(i):h+c}catch(e){return h}};

/* ---------- espace prof : onglets « Notes sur table » et « Évolution » ---------- */
const _nav=window.profNavHTML;
window.profNavHTML=function(){let h=_nav();const t=PR.tab||'suivi',b=(k,l)=>`<button class="skill ${t===k?'on':''}" data-act="pt-tab" data-t="${k}">${l}</button>`;
  const i=h.indexOf('<button class="skill',h.indexOf('data-t="devoirs"'));const j=h.indexOf('</button>',h.indexOf('data-t="devoirs"'))+9;
  return j>8?h.slice(0,j)+b('table','✍️ Notes sur table')+b('evol','📈 Évolution')+h.slice(j):h};
const _tab=window.profTabHTML;
window.profTabHTML=function(){if(PR.tab==='table')return tableHTML();if(PR.tab==='evol')return evolHTML();return _tab()};
const T=PR.tb||(PR.tb={g:'',cl:'',notes:{},charge:'',busy:false,err:'',res:null,edit:null});

function grilles(){return PR.grilles||[]}
function chargerGrilles(){if(T.gl)return;T.gl=true;profOp({op:'grilles'}).then(r=>{T.gl=false;if(r.ok){PR.grilles=r.grilles;render()}})}
function chargerNotes(){const k=T.g+'|'+T.cl;if(!T.g||!T.cl||T.charge===k)return;T.charge=k;T.notes={};T.res=null;
  profOp({op:'notesTable',grille:T.g,classe:T.cl}).then(r=>{if(r.ok){(r.notes||[]).forEach(n=>{T.notes[n.pseudo]={pts:(n.pts||[]).map(v=>v===''?'':String(v)),absent:n.absent,saved:true}})}render()})}
function tableHTML(){if(!PR.grilles){chargerGrilles();return `<section class="card"><p class="small"><b>Chargement des grilles…</b></p></section>`}
  if(T.edit)return grilleFormHTML();
  const G=grilles(),cls=profClasses().filter(c=>/^[3-6]/.test(c));
  if(!G.find(g=>g.id===T.g))T.g=(G[0]||{}).id||'';
  const g=G.find(x=>x.id===T.g),ok=g?cls.filter(c=>g.classes.includes(c)||g.classes.includes(c[0]+'*')):[];
  if(!ok.includes(T.cl))T.cl=ok[0]||'';
  if(g&&T.cl)chargerNotes();
  const L=(PR.ins||[]).filter(x=>x.c===T.cl).sort((a,b)=>(a.nom+' '+a.prenom).localeCompare(b.nom+' '+b.prenom,'fr'));
  const ligne=x=>{const N=T.notes[x.p]||(T.notes[x.p]={pts:[],absent:false}),tot=g.questions.reduce((a,q,i)=>a+(num(N.pts[i])||0),0),vide=g.questions.every((q,i)=>N.pts[i]===''||N.pts[i]==null),n20=g.sur?tot/g.sur*20:0;
    return `<tr><td><b>${esc(x.nom)}</b> ${esc(x.prenom)}${N.saved?' <span class="small" title="Déjà enregistré">✓</span>':''}</td>
      ${g.questions.map((q,i)=>`<td><input class="gr-in" inputmode="decimal" data-gp="${esc(x.p)}" data-gi="${i}" value="${esc(N.pts[i]==null?'':N.pts[i])}" ${N.absent?'disabled':''} style="width:52px;padding:6px;border-radius:8px;border:1.5px solid var(--line);background:var(--surface2);color:var(--ink);font:inherit;text-align:center" aria-label="${esc(x.prenom+' question '+q.q)}"></td>`).join('')}
      <td style="text-align:center"><input type="checkbox" data-ga="${esc(x.p)}" ${N.absent?'checked':''} aria-label="Absent"></td>
      <td><b>${N.absent?'Abs.':vide?'—':frN(tot)+'/'+g.sur}</b></td><td>${N.absent||vide?'':`<b>${frN(n20)}</b>`}</td><td>${N.absent||vide?'':puce(gDeN20(n20))}</td></tr>`};
  const comp=g?bilanClasse(g,L):[];
  return `<div class="chap-head"><h1>✍️ Notes sur table</h1><p class="small">Après la correction d'une évaluation sur table (IEF, devoir, composition), saisissez les points de chaque question. L'appli calcule la note sur 20, les compétences réussies ou à revoir, et <b>met à jour le groupe de besoin</b> de chaque élève.</p></div>
  ${G.length?`<section class="card" style="display:flex;flex-direction:column;gap:10px">
    <div class="form"><label class="full" style="min-width:0">Évaluation<select data-gsel="g" style="width:100%;max-width:100%;min-width:0">${G.map(x=>`<option value="${esc(x.id)}" ${x.id===T.g?'selected':''}>${esc(x.titre)} · ${esc(x.niveau)} · /${x.sur}</option>`).join('')}</select></label></div>
    ${ok.length?`<div class="skills">${ok.map(c=>`<button class="skill ${c===T.cl?'on':''}" data-act="gr-cl" data-c="${c}">${esc(clsLab(c))}</button>`).join('')}</div>`:'<p class="small">Aucune de vos classes n\'est concernée par cette grille.</p>'}
    ${g?`<details><summary class="small"><b>Voir la grille</b> (${g.questions.length} questions · ${g.sur} points)</summary><div class="tablewrap"><table class="bilan"><tr><th>Question</th><th>Points</th><th>Compétence</th><th>Chapitre</th><th>Niveau de Bloom</th></tr>${g.questions.map(q=>`<tr><td>${esc(q.q)}</td><td>${q.pts}</td><td>${esc(q.comp)}</td><td>${esc(chapNom(g.niveau,q.chap))}</td><td>${esc(q.bloom||'')}</td></tr>`).join('')}</table></div>
      <div class="row" style="margin-top:8px"><button class="btn ghost sm" data-act="gr-edit" data-id="${esc(g.id)}">Modifier la grille</button></div></details>`:''}
  </section>`:`<section class="card"><p>Aucune grille pour le moment. M. Thiam prépare la grille de chaque évaluation de l'IEF ; vous pouvez aussi créer la vôtre.</p></section>`}
  ${g&&T.cl?`<section class="card" style="display:flex;flex-direction:column;gap:10px">
    <p class="eyebrow">${esc(clsLab(T.cl))} · ${L.length} élève${L.length>1?'s':''}</p>
    <p class="small">Tapez les points obtenus à chaque question (0,5 accepté). Laissez vide si non corrigé. Cochez « Abs. » pour un absent.</p>
    <div class="tablewrap"><table class="bilan" style="min-width:${360+g.questions.length*62}px"><tr><th>Élève</th>${g.questions.map(q=>`<th title="${esc(q.comp)}">${esc(q.q)}<br><span class="small">/${q.pts}</span></th>`).join('')}<th>Abs.</th><th>Total</th><th>/20</th><th>Groupe</th></tr>
    ${L.map(ligne).join('')}</table></div>
    ${T.err?`<p class="err">${esc(T.err)}</p>`:''}
    <div class="row"><button class="btn gold" data-act="gr-save" ${T.busy?'disabled':''}>${T.busy?'Enregistrement…':'Enregistrer les notes'}</button><button class="btn ghost" data-act="gr-print">🖨 Imprimer</button></div>
    ${T.res?`<p class="small" style="color:var(--green)"><b>✓ ${T.res.n} élève${T.res.n>1?'s':''} enregistré${T.res.n>1?'s':''}</b> : groupes de besoin mis à jour.</p>`:''}</section>
  ${comp.length?`<section class="card" style="display:flex;flex-direction:column;gap:8px"><p class="eyebrow">Compétences de la classe</p><p class="small">Pourcentage des points obtenus par la classe, compétence par compétence. En rouge : à reprendre en remédiation.</p>
    ${comp.map(c=>`<div><div class="row" style="justify-content:space-between"><span class="small"><b>${esc(c.comp)}</b></span><span class="small"><b>${Math.round(c.p)} %</b></span></div><div class="bar"><span style="width:${Math.round(c.p)}%;background:${c.p<50?'var(--red)':c.p<75?'#C77700':'var(--green)'}"></span></div></div>`).join('')}</section>`:''}`:''}
  <div class="row"><button class="btn ghost" data-act="gr-new">＋ Créer une grille</button></div>`}
function chapNom(niv,c){const x=LV[niv]&&LV[niv].chaps.find(y=>y[0]===c);return x?x[1]:c||''}
function bilanClasse(g,L){const o={};L.forEach(x=>{const N=T.notes[x.p];if(!N||N.absent)return;if(g.questions.every((q,i)=>N.pts[i]===''||N.pts[i]==null))return;
    g.questions.forEach((q,i)=>{const k=q.comp||('Question '+q.q);o[k]=o[k]||{comp:k,obt:0,max:0};o[k].obt+=Math.min(q.pts,num(N.pts[i])||0);o[k].max+=q.pts})});
  return Object.values(o).map(c=>Object.assign(c,{p:c.max?c.obt/c.max*100:0})).sort((a,b)=>a.p-b.p)}
/* créer / modifier une grille */
function grilleFormHTML(){const E=T.edit,cls=profClasses().filter(c=>/^[3-6]/.test(c)),nivs=ORD.filter(n=>cls.some(c=>c[0]===n[0])||(PR.me&&PR.me.admin));
  if(!nivs.includes(E.niveau))E.niveau=nivs[0]||'6e';
  const ncls=cls.filter(c=>c[0]===E.niveau[0]),chaps=(LV[E.niveau]||{chaps:[]}).chaps,sur=E.questions.reduce((a,q)=>a+(num(q.pts)||0),0);
  return `<div class="chap-head"><h1>${E.id?'Modifier la grille':'Nouvelle grille'}</h1><p class="small">Une ligne par question (ou sous-question) : ses points et la compétence évaluée. C'est ce qui permet de savoir ce que chaque élève a réussi.</p></div>
  <section class="card" style="display:flex;flex-direction:column;gap:12px">
    <div class="form"><label class="full">Titre<input data-ge="titre" value="${esc(E.titre||'')}" maxlength="100" placeholder="Ex. : 1re évaluation harmonisée · novembre 2026"></label>
      <label>Niveau<select data-ge="niveau">${nivs.map(n=>`<option ${n===E.niveau?'selected':''}>${n}</option>`).join('')}</select></label>
      <label>Date de l'évaluation<input type="date" data-ge="date" value="${esc(E.date||'')}"></label></div>
    <div><p class="lab">Classes</p><div class="cgrid">${PR.me&&PR.me.admin?`<label><input type="checkbox" data-gc="${E.niveau[0]}*" ${E.classes.includes(E.niveau[0]+'*')?'checked':''}> Toutes les ${E.niveau}</label>`:''}${ncls.map(c=>`<label><input type="checkbox" data-gc="${c}" ${E.classes.includes(c)?'checked':''}> ${esc(clsLab(c))}</label>`).join('')}</div></div>
    <div class="tablewrap"><table class="bilan" style="min-width:640px"><tr><th>Question</th><th>Points</th><th>Compétence évaluée</th><th>Chapitre</th><th>Bloom</th><th></th></tr>
      ${E.questions.map((q,i)=>`<tr><td><input data-gq="${i}" data-k="q" value="${esc(q.q||'')}" style="width:56px" placeholder="1a"></td><td><input data-gq="${i}" data-k="pts" inputmode="decimal" value="${esc(q.pts||'')}" style="width:52px"></td>
        <td><input data-gq="${i}" data-k="comp" value="${esc(q.comp||'')}" style="width:100%;min-width:200px" placeholder="Ex. : Calculer la somme de deux rationnels"></td>
        <td><select data-gq="${i}" data-k="chap"><option value="">—</option>${chaps.map(c=>`<option value="${c[0]}" ${q.chap===c[0]?'selected':''}>${esc(c[1])}</option>`).join('')}</select></td>
        <td><select data-gq="${i}" data-k="bloom"><option value="">—</option>${BLOOM.map(b=>`<option ${q.bloom===b?'selected':''}>${b}</option>`).join('')}</select></td>
        <td><button class="btn ghost sm" data-act="gr-qdel" data-i="${i}" aria-label="Supprimer la ligne">✕</button></td></tr>`).join('')}</table></div>
    <div class="row"><button class="btn ghost sm" data-act="gr-qadd">＋ Ajouter une question</button><span class="small">Total : <b>${frN(sur)} points</b> (la note est ramenée sur 20)</span></div>
    ${T.err?`<p class="err">${esc(T.err)}</p>`:''}
    <div class="row"><button class="btn gold" data-act="gr-gsave" ${T.busy?'disabled':''}>${T.busy?'Enregistrement…':'Enregistrer la grille'}</button><button class="btn ghost" data-act="gr-gcancel">Annuler</button></div></section>`}

/* ---------- évolution (prof) ---------- */
function evolHTML(){const cls=profClasses().filter(c=>/^[3-6]/.test(c)),rows=PR.rows||[];
  const E=PR.ev||(PR.ev={cl:'',p:''});if(!cls.includes(E.cl))E.cl=cls.find(c=>(PR.ins||[]).some(x=>x.c===c))||cls[0]||'';
  const L=(PR.ins||[]).filter(x=>x.c===E.cl).sort((a,b)=>(a.nom+' '+a.prenom).localeCompare(b.nom+' '+b.prenom,'fr'));
  const D=L.map(x=>({x,ev:evalsDe(rows,x.p)}));
  if(E.p){const d=D.find(y=>y.x.p===E.p);if(d)return eleveEvolHTML(d)}
  const avec=D.filter(d=>d.ev.length),depart=k=>avec.filter(d=>d.ev[0].g===k),now=k=>avec.filter(d=>d.ev[d.ev.length-1].g===k);
  const r1L=depart(1),sortis=r1L.filter(d=>d.ev[d.ev.length-1].g>1),monte=avec.filter(d=>d.ev.length>1&&d.ev[d.ev.length-1].g>d.ev[0].g),baisse=avec.filter(d=>d.ev.length>1&&d.ev[d.ev.length-1].g<d.ev[0].g);
  const barre=(lab,f)=>{const n=[1,2,3].map(k=>f(k).length),t=n[0]+n[1]+n[2]||1;return `<div><p class="small" style="margin:0 0 4px"><b>${lab}</b></p><div style="display:flex;height:26px;border-radius:8px;overflow:hidden">${n.map((v,i)=>v?`<div style="width:${v/t*100}%;background:${GCOL[i]};color:#fff;font-weight:800;font-size:12px;display:flex;align-items:center;justify-content:center" title="${GNOM(i+1)} : ${v}">${v}</div>`:'').join('')}</div></div>`};
  return `<div class="chap-head"><h1>📈 Évolution des élèves</h1><p class="small">Chaque point est une évaluation (test de positionnement, évaluation du mois, évaluation sur table). Le groupe de besoin est recalculé à chaque fois.</p></div>
  <div class="skills noprint">${cls.map(c=>`<button class="skill ${c===E.cl?'on':''}" data-act="ev-cl" data-c="${c}">${esc(clsLab(c))}</button>`).join('')}</div>
  <section class="card" style="display:flex;flex-direction:column;gap:12px"><p class="eyebrow">${esc(clsLab(E.cl))} · ${avec.length} élève${avec.length>1?'s':''} évalué${avec.length>1?'s':''}</p>
    ${avec.length?`${barre('Au départ (1re évaluation)',depart)}${barre('Aujourd\'hui (dernière évaluation)',now)}
    <div class="row small" style="gap:14px"><span><b style="color:var(--red)">■</b> Remédiation</span><span><b style="color:#C77700">■</b> Application</span><span><b style="color:var(--green)">■</b> Approfondissement</span></div>
    <div class="tablewrap"><table class="bilan"><tr><th>Indicateur</th><th>Élèves</th></tr>
      <tr><td>En remédiation au départ</td><td><b>${r1L.length}</b></td></tr>
      <tr><td>… sortis de la remédiation depuis</td><td><b style="color:var(--green)">${sortis.length}</b>${r1L.length?` (${Math.round(sortis.length/r1L.length*100)} %)`:''}</td></tr>
      <tr><td>Ont monté d'au moins un groupe</td><td><b style="color:var(--green)">${monte.length}</b></td></tr>
      <tr><td>Ont baissé d'au moins un groupe</td><td><b style="color:var(--red)">${baisse.length}</b></td></tr></table></div>`:'<p class="small">Aucune évaluation pour cette classe pour le moment.</p>'}</section>
  <section class="clist">${D.map(d=>{const l=d.ev[d.ev.length-1];return `<button class="crow gitem" data-act="ev-p" data-p="${esc(d.x.p)}" style="text-align:left"><div class="ct"><b>${esc(d.x.nom)} ${esc(d.x.prenom)}</b><small>${d.ev.length?trajet(d.ev)+(l?' · dernière note '+frN(l.n20)+'/20':''):'Pas encore évalué'}</small></div>${l?puce(l.g):''}</button>`}).join('')}</section>`}
function eleveEvolHTML(d){const x=d.x,L=d.ev,l=L[L.length-1];
  return `<div class="chap-head"><p class="eyebrow">${esc(clsLab(x.c))} · @${esc(x.p)}</p><h1>${esc(x.prenom)} ${esc(x.nom)}</h1>${l?puce(l.g):''}</div>
  <section class="card" style="display:flex;flex-direction:column;gap:10px">${L.length?courbe(L)+`<div class="small">Parcours : ${trajet(L)}</div><p style="margin:0">${message(L,x.prenom)}</p>`:'<p class="small">Pas encore d\'évaluation.</p>'}</section>
  ${L.length?`<section class="card"><div class="tablewrap"><table class="bilan"><tr><th>Date</th><th>Évaluation</th><th>Note</th><th>/20</th><th>Groupe</th><th>À revoir</th></tr>
    ${L.slice().reverse().map(e=>`<tr><td>${esc(e.date)}</td><td>${esc(e.titre||e.type)}<br><span class="small">${esc(SRC(e.type))}</span></td><td>${frN(e.sc)}/${e.sur}</td><td><b>${frN(e.n20)}</b></td><td>${puce(e.g)}</td><td class="small">${esc(e.revoir||'')}</td></tr>`).join('')}</table></div></section>`:''}
  <div class="row"><button class="btn ghost" data-act="ev-back">← Toute la classe</button><button class="btn ghost" data-act="pl-print">🖨 Imprimer</button></div>`}

/* ---------- actions ---------- */
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act;if(!/^(gr-|ev-)/.test(a))return;e.stopImmediatePropagation();
  if(a==='gr-cl'){T.cl=b.dataset.c;T.err='';T.res=null;render();return}
  if(a==='gr-print'){window.print();return}
  if(a==='gr-new'){T.edit={id:'',titre:'',niveau:(profClasses()[0]||'6')[0]+'e',classes:[],date:'',questions:[{q:'1',pts:'',comp:'',chap:'',bloom:''}]};T.err='';render();window.scrollTo(0,0);return}
  if(a==='gr-edit'){const g=grilles().find(x=>x.id===b.dataset.id);if(!g)return;T.edit={id:g.id,titre:g.titre,niveau:g.niveau,classes:g.classes.slice(),date:g.date,questions:g.questions.map(q=>Object.assign({},q))};T.err='';render();window.scrollTo(0,0);return}
  if(a==='gr-gcancel'){T.edit=null;T.err='';render();return}
  if(a==='gr-qadd'){T.edit.questions.push({q:String(T.edit.questions.length+1),pts:'',comp:'',chap:'',bloom:''});render();return}
  if(a==='gr-qdel'){T.edit.questions.splice(+b.dataset.i,1);render();return}
  if(a==='gr-gsave'){const E=T.edit;if(T.busy)return;T.busy=true;T.err='';render();
    profOp({op:'grille',id:E.id,titre:E.titre,niveau:E.niveau,classes:E.classes,date:E.date,questions:E.questions}).then(r=>{T.busy=false;if(r.ok){PR.grilles=r.grilles;T.g=r.id;T.edit=null;T.charge='';toast('Grille enregistrée')}else T.err=r.erreur;render()});return}
  if(a==='gr-save'){if(T.busy)return;const lignes=Object.entries(T.notes).filter(([p,N])=>!N.saved||N.dirty).map(([p,N])=>({pseudo:p,pts:N.pts,absent:!!N.absent}));
    if(!lignes.length){T.err='Rien de nouveau à enregistrer.';render();return}
    T.busy=true;T.err='';render();
    profOp({op:'saisirNotes',grille:T.g,classe:T.cl,lignes},90000).then(r=>{T.busy=false;if(r.ok){T.res=r;lignes.forEach(l=>{const N=T.notes[l.pseudo];if(N){N.saved=true;N.dirty=false}});toast(r.n+' saisie(s) enregistrée(s) · groupes mis à jour');if(typeof loadProf==='function')loadProf(PR.code,false)}else T.err=r.erreur;render()});return}
  if(a==='ev-cl'){PR.ev.cl=b.dataset.c;PR.ev.p='';render();return}
  if(a==='ev-p'){PR.ev.p=b.dataset.p;render();window.scrollTo(0,0);return}
  if(a==='ev-back'){PR.ev.p='';render();return}
},true);
/* saisie dans la grille : sans réafficher toute la page à chaque chiffre */
document.addEventListener('input',e=>{const t=e.target;
  if(t.dataset&&t.dataset.gp!==undefined){const N=T.notes[t.dataset.gp]||(T.notes[t.dataset.gp]={pts:[],absent:false});N.pts[+t.dataset.gi]=t.value.trim();N.dirty=true;
    const tr=t.closest('tr'),g=grilles().find(x=>x.id===T.g);if(tr&&g){const tot=g.questions.reduce((a,q,i)=>a+(num(N.pts[i])||0),0),n20=tot/g.sur*20,td=tr.querySelectorAll('td'),k=td.length;
      td[k-3].innerHTML=`<b>${frN(tot)}/${g.sur}</b>`;td[k-2].innerHTML=`<b>${frN(n20)}</b>`;td[k-1].innerHTML=puce(gDeN20(n20))}
    const q=g&&g.questions[+t.dataset.gi],v=num(t.value);t.style.borderColor=q&&v!=null&&(v>q.pts||v<0)?'var(--red)':'';return}
  if(t.dataset&&t.dataset.ge){T.edit[t.dataset.ge]=t.value;return}
  if(t.dataset&&t.dataset.gq!==undefined){T.edit.questions[+t.dataset.gq][t.dataset.k]=t.value;return}
},true);
document.addEventListener('change',e=>{const t=e.target;
  if(t.dataset&&t.dataset.ga!==undefined){const N=T.notes[t.dataset.ga]||(T.notes[t.dataset.ga]={pts:[],absent:false});N.absent=t.checked;N.dirty=true;render();return}
  if(t.dataset&&t.dataset.gsel==='g'){T.g=t.value;T.cl='';T.res=null;render();return}
  if(t.dataset&&t.dataset.gc!==undefined){const l=new Set(T.edit.classes);t.checked?l.add(t.dataset.gc):l.delete(t.dataset.gc);T.edit.classes=[...l];return}
  if(t.dataset&&t.dataset.ge==='niveau'){T.edit.niveau=t.value;T.edit.classes=[];render();return}
  if(t.dataset&&t.dataset.gq!==undefined&&t.tagName==='SELECT'){T.edit.questions[+t.dataset.gq][t.dataset.k]=t.value;return}
},true);
if(typeof render==='function'&&document.readyState!=='loading')try{render()}catch(e){}
})();
