/**
 * PROFDEMATHS 2.0 · Suivi des élèves · CEM Kennedy · 2026-2027
 * M. Thiam · cellule de mathématiques
 *
 * VERSION 2 (octobre 2026)
 *  - Inscription : CEM Kennedy (6e à 3e, classes A, B, C) ou autre établissement
 *    (une classe « HK » par niveau : 6HK, 5HK, 4HK, 3HK, avec l'école d'origine).
 *  - Comptes professeurs : chaque prof a son code et ne voit que ses classes.
 *    Le code administrateur (CODE_PROF) voit tout et gère les comptes.
 *  - Devoirs à rendre en photo : le prof publie un énoncé, l'élève envoie la photo
 *    de sa rédaction (rangée dans Google Drive), le prof la corrige dans l'application.
 *  - Remédiation : les élèves du groupe 1 (test de positionnement < 13/25) voient une alerte
 *    avec le créneau hebdomadaire (2 h) que le prof indique pour leur classe (onglet « Remédiation »).
 *  - La classe inscrite dans l'onglet « Élèves » fait foi : si vous la changez dans
 *    la feuille, le téléphone de l'élève se met à jour tout seul.
 *
 * MISE À JOUR DEPUIS LA VERSION 1 (à faire une seule fois, sur ordinateur) :
 *   1. Ouvrez ce projet Apps Script, remplacez TOUT le contenu de Code.gs par ce fichier,
 *      puis « Enregistrer ».
 *   2. Choisissez la fonction « miseAJour » puis « Exécuter ». Google demande une nouvelle
 *      autorisation (accès à Google Drive pour ranger les photos) : acceptez avec votre compte.
 *   3. « Déployer » > « Gérer les déploiements » > crayon (Modifier) sur le déploiement actuel
 *      > Version : « Nouvelle version » > « Déployer ».
 *      IMPORTANT : ne créez pas un nouveau déploiement, sinon l'adresse /exec change.
 */

var CODE_PROF = "Kennedy-56VVR";   // code administrateur (M. Thiam) : voit toutes les classes
var ADMIN_NOM = "M. Thiam";

var ENTETES = ["Date", "Heure", "Élève", "Prénom", "Nom", "Niveau", "Classe", "Type",
  "Chapitre", "Code", "Note", "Sur", "Note /20", "Durée (min)", "Tentative",
  "Compétences à revoir", "Identifiant appareil", "Pseudo"];
var ENTETES_ELEVES = ["Pseudo", "Prénom", "Nom", "Niveau", "Classe", "Code secret (empreinte)", "Inscrit le", "Dernière connexion",
  "Établissement", "École d'origine"];
var ENTETES_PROFS = ["Nom", "Code d'accès", "Classes", "Actif", "Créé le", "Dernière connexion"];
var ENTETES_DEVOIRS = ["ID", "Créé le", "Par", "Niveau", "Classes", "Chapitre", "Titre", "Énoncé", "Image de l'énoncé", "À rendre le", "Sur", "Actif"];
var ENTETES_COPIES = ["ID", "Clé", "Date", "Heure", "Pseudo", "Élève", "Niveau", "Classe", "Devoir", "Titre du devoir",
  "Fichiers", "Statut", "Note", "Sur", "Commentaire", "Corrigé par", "Corrigé le"];

var ENTETES_REMED = ["Classe", "Jour et heure", "Lieu", "Remarque", "Modifié par", "Modifié le"];

var NIVEAUX = ["6e", "5e", "4e", "3e"];
var SEUIL_REMED = 13;  // test de positionnement < 13/25 : groupe 1 · Remédiation (2 h par semaine)
var ETAB_K = "CEM Kennedy", ETAB_HK = "Autre établissement";
var TYPE_COPIE = "Devoir (copie)";
var RE_CLASSE = /^[3-6](?:[A-H]|HK)$/;          // 5B, 3HK… (et les anciennes 4D, 3G)
var RE_ONGLET_CLASSE = /^[3-6](?:[A-Z]|HK)$/;
var MAX_PHOTOS = 4, MAX_B64 = 2600000;           // ~1,9 Mo par photo après compression
var TZ = "Africa/Dakar";

/* ====================================================================== */
/*  Installation et mise à jour                                            */
/* ====================================================================== */
function installer() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty("SHEET_ID");
  var ss;
  if (id) { try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; } }
  if (!ss) {
    ss = SpreadsheetApp.create("Suivi des élèves · Maths · CEM Kennedy · 2026-2027");
    props.setProperty("SHEET_ID", ss.getId());
  }
  var sh = ss.getSheetByName("Résultats") || ss.getSheets()[0];
  sh.setName("Résultats");
  preparer_(sh);
  miseAJour();
}

/* À lancer une fois après avoir collé la version 2 (crée les nouveaux onglets et le dossier Drive). */
function miseAJour() {
  var ss = classeur_();
  onglet_(ss, "Élèves", ENTETES_ELEVES);
  onglet_(ss, "Professeurs", ENTETES_PROFS);
  onglet_(ss, "Devoirs", ENTETES_DEVOIRS);
  onglet_(ss, "Copies", ENTETES_COPIES);
  onglet_(ss, "Remédiation", ENTETES_REMED);
  var dossier = dossierRacine_();
  Logger.log("Feuille de suivi : " + ss.getUrl());
  Logger.log("Photos des copies : " + dossier.getUrl());
  Logger.log("Étape suivante : Déployer > Gérer les déploiements > Modifier > Nouvelle version > Déployer.");
}

function preparer_(sh) {
  if (sh.getLastRow() > 0 && sh.getLastColumn() < ENTETES.length) {
    sh.getRange(1, 1, 1, ENTETES.length).setValues([ENTETES]).setFontWeight("bold").setBackground("#0F2552").setFontColor("#FFFFFF");
  }
  if (sh.getLastRow() === 0) {
    sh.appendRow(ENTETES);
    sh.getRange(1, 1, 1, ENTETES.length).setFontWeight("bold").setBackground("#0F2552").setFontColor("#FFFFFF");
    sh.setFrozenRows(1);
    sh.setColumnWidth(3, 180); sh.setColumnWidth(9, 220); sh.setColumnWidth(16, 260);
  }
}

/* Crée l'onglet s'il manque et complète l'en-tête (ajoute les colonnes manquantes à la fin). */
function onglet_(ss, nom, H) {
  var sh = ss.getSheetByName(nom);
  if (!sh) sh = ss.insertSheet(nom);
  if (sh.getLastRow() === 0) {
    sh.appendRow(H);
    sh.setFrozenRows(1);
  } else {
    var cur = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), H.length)).getValues()[0];
    for (var i = 0; i < H.length; i++) if (String(cur[i] || "") === "") sh.getRange(1, i + 1).setValue(H[i]);
  }
  sh.getRange(1, 1, 1, H.length).setFontWeight("bold").setBackground("#0F2552").setFontColor("#FFFFFF");
  return sh;
}

function classeur_() {
  var id = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
  if (!id) throw new Error("Lancez d'abord la fonction installer.");
  return SpreadsheetApp.openById(id);
}

/* ====================================================================== */
/*  Petits outils                                                          */
/* ====================================================================== */
function proprio_(v, max) { return String(v == null ? "" : v).replace(/[\r\n\t]+/g, " ").replace(/^[=+\-@]/, "'$&").slice(0, max || 120); }
/* texte long (énoncé, commentaire) : garde les retours à la ligne */
function texte_(v, max) { return String(v == null ? "" : v).replace(/\r/g, "").replace(/\t/g, " ").replace(/^[=+\-@]/, "'$&").slice(0, max || 2000); }
function normClasse_(c) { return String(c == null ? "" : c).toUpperCase().replace(/\s+/g, ""); }
function maintenant_() { return Utilities.formatDate(new Date(), TZ, "dd/MM/yyyy HH:mm"); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function alea_(n) {
  var A = "ABCDEFGHJKMNPQRSTUVWXYZ23456789", s = "";
  for (var i = 0; i < n; i++) s += A.charAt(Math.floor(Math.random() * A.length));
  return s;
}
function empreinte_(pseudo, pin) {
  return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, "pdm|" + pseudo + "|" + pin, Utilities.Charset.UTF_8));
}
function codeEtab_(label) {
  label = String(label || "");
  if (label === ETAB_K) return "K";
  if (label === ETAB_HK) return "HK";
  return "";
}
function verrou_(f) {
  var lock = LockService.getScriptLock(); lock.waitLock(25000);
  try { return f(); } finally { lock.releaseLock(); }
}
/* Établissement + classe à partir de ce que l'élève a choisi. Renvoie {etab, classe, ecole} ou {erreur}. */
function placement_(niv, r) {
  if (NIVEAUX.indexOf(niv) < 0) return { erreur: "Choisis ton niveau." };
  var n = niv.charAt(0);
  if (r.etab === "HK") {
    var ecole = proprio_(r.ecole, 80).trim();
    if (ecole.length < 2) return { erreur: "Écris le nom de ton école d'origine." };
    return { etab: ETAB_HK, classe: n + "HK", ecole: ecole };
  }
  if (r.etab === "K") {
    var c = normClasse_(r.classe);
    if (c.length === 1) c = n + c;
    if (!new RegExp("^" + n + "[ABC]$").test(c)) return { erreur: "Choisis ta classe : A, B ou C." };
    return { etab: ETAB_K, classe: c, ecole: "" };
  }
  return null; // ancienne version de l'application
}

/* ====================================================================== */
/*  Élèves : inscription, reconnexion, état du compte                      */
/* ====================================================================== */
function ongletEleves_(ss) { return onglet_(ss, "Élèves", ENTETES_ELEVES); }

function ligneEleve_(ss, pseudo) {
  var sh = ss.getSheetByName("Élèves");
  if (!sh || sh.getLastRow() < 2) return null;
  var v = sh.getRange(2, 1, sh.getLastRow() - 1, ENTETES_ELEVES.length).getDisplayValues();
  for (var i = 0; i < v.length; i++) {
    if (String(v[i][0]).toLowerCase() === pseudo) {
      return { ligne: i + 2, pseudo: pseudo, prenom: v[i][1], nom: v[i][2], niveau: v[i][3], classe: normClasse_(v[i][4]),
        etab: codeEtab_(v[i][8]), ecole: v[i][9] || "", sh: sh };
    }
  }
  return null;
}

/* Inscription ou reconnexion d'un élève avec son pseudo et son code secret à 4 chiffres */
function inscrire_(r) {
  var pseudo = String(r.pseudo || "").toLowerCase().trim();
  var pin = String(r.pin || "");
  if (!/^[a-z0-9_.-]{3,20}$/.test(pseudo)) return { ok: false, erreur: "Pseudo invalide : 3 à 20 lettres, chiffres, point, tiret ou _." };
  if (!/^\d{4}$/.test(pin)) return { ok: false, erreur: "Le code secret doit avoir 4 chiffres." };
  if (supprimes_()[pseudo]) return { ok: false, supprime: true, erreur: "Ce compte a été supprimé par M. Thiam. Choisis un autre pseudo ou parle-lui." };
  var ss = classeur_(), sh = ongletEleves_(ss), v = sh.getDataRange().getValues();
  var h = empreinte_(pseudo, pin), maintenant = maintenant_();
  for (var i = 1; i < v.length; i++) {
    if (String(v[i][0]) === pseudo) {
      if (String(v[i][5]) !== h) return { ok: false, pris: true, erreur: "Ce pseudo est déjà pris. Choisis-en un autre (ou vérifie ton code secret si c'est le tien)." };
      // le niveau et la classe restent ceux de l'inscription : seul le professeur les change (dans la feuille)
      sh.getRange(i + 1, 2, 1, 2).setValues([[proprio_(r.prenom, 40), proprio_(r.nom, 40).toUpperCase()]]);
      sh.getRange(i + 1, 8).setValue(maintenant);
      return { ok: true, retour: true, pseudo: pseudo, niveau: String(v[i][3]), classe: normClasse_(v[i][4]),
        etab: codeEtab_(v[i][8]), ecole: String(v[i][9] || "") };
    }
  }
  var niv = NIVEAUX.indexOf(r.niveau) >= 0 ? r.niveau : "";
  if (!niv) return { ok: false, erreur: "Choisis ton niveau." };
  var pl = placement_(niv, r);
  if (pl && pl.erreur) return { ok: false, erreur: pl.erreur };
  if (!pl) pl = { etab: "", classe: normClasse_(proprio_(r.classe, 12)), ecole: "" };
  sh.appendRow([pseudo, proprio_(r.prenom, 40), proprio_(r.nom, 40).toUpperCase(), niv, pl.classe, h, maintenant, maintenant, pl.etab, pl.ecole]);
  return { ok: true, nouveau: true, pseudo: pseudo, niveau: niv, classe: pl.classe, etab: codeEtab_(pl.etab), ecole: pl.ecole };
}

/* Anciens comptes (avant la version 2) : l'élève indique une seule fois son établissement */
function completer_(r) {
  var pseudo = String(r.pseudo || "").toLowerCase().trim();
  var ss = classeur_(); ongletEleves_(ss);
  var e = ligneEleve_(ss, pseudo);
  if (!e) return { ok: false, erreur: "Compte introuvable : reconnecte-toi avec ton pseudo et ton code secret." };
  if (e.etab) return { ok: true, deja: true, niveau: e.niveau, classe: e.classe, etab: e.etab, ecole: e.ecole };
  var pl = placement_(e.niveau, r);
  if (!pl) return { ok: false, erreur: "Choisis ton établissement." };
  if (pl.erreur) return { ok: false, erreur: pl.erreur };
  e.sh.getRange(e.ligne, 5).setValue(pl.classe);
  e.sh.getRange(e.ligne, 9, 1, 2).setValues([[pl.etab, pl.ecole]]);
  return { ok: true, niveau: e.niveau, classe: pl.classe, etab: codeEtab_(pl.etab), ecole: pl.ecole };
}

function etat_(p) {
  var pseudo = String(p.pseudo || "").toLowerCase();
  var out = { ok: true, supprime: !!supprimes_()[pseudo] };
  if (!out.supprime && pseudo) {
    var e = ligneEleve_(classeur_(), pseudo);
    if (e) { out.trouve = true; out.niveau = e.niveau; out.classe = e.classe; out.etab = e.etab; out.ecole = e.ecole; }
  }
  return out;
}

/* ====================================================================== */
/*  Réception des données envoyées par l'application                      */
/* ====================================================================== */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (data && !Array.isArray(data) && data.action) {
      var a = data.action, out;
      if (a === "inscrire") out = verrou_(function () { return inscrire_(data); });
      else if (a === "completer") out = verrou_(function () { return completer_(data); });
      else if (a === "rendre") out = rendre_(data);
      else if (a === "enonce") out = enonce_(data);
      else if (a === "prof") out = profAction_(data);
      else out = { ok: false, erreur: "Action inconnue." };
      return json_(out);
    }
    verrou_(function () { enregistrerResultats_(Array.isArray(data) ? data : [data]); });
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, erreur: String(err && err.message || err) });
  }
}

function ligneResultat_(r, classe) {
  var d = new Date(r.t || Date.now());
  return [
    Utilities.formatDate(d, TZ, "dd/MM/yyyy"), Utilities.formatDate(d, TZ, "HH:mm"),
    proprio_(r.prenom, 40) + " " + proprio_(r.nom, 40).toUpperCase(), proprio_(r.prenom, 40), proprio_(r.nom, 40).toUpperCase(),
    r.niveau, classe, proprio_(r.type, 30), proprio_(r.chapitre, 80), proprio_(r.code, 12),
    Number(r.note) || 0, Number(r.sur) || 20, Math.round((Number(r.note) || 0) / (Number(r.sur) || 20) * 200) / 10,
    Math.round((Number(r.duree) || 0) / 6) / 10, Number(r.tentative) || 1, proprio_(r.revoir, 300), proprio_(r.uid, 24),
    proprio_(r.pseudo, 20).toLowerCase()
  ];
}

function enregistrerResultats_(lignes) {
  var ss = classeur_(), tout = ss.getSheetByName("Résultats"), sup = supprimes_();
  lignes.slice(0, 200).forEach(function (r) {
    if (!r || !r.nom || NIVEAUX.indexOf(r.niveau) < 0) return;
    if (r.pseudo && sup[String(r.pseudo).toLowerCase()]) return;
    if (tout.getLastColumn() < ENTETES.length) preparer_(tout);
    var classe = normClasse_(proprio_(r.classe || r.niveau, 12));
    var ligne = ligneResultat_(r, classe);
    tout.appendRow(ligne);
    var onglet = ss.getSheetByName(classe) || ss.insertSheet(classe);
    preparer_(onglet);
    onglet.appendRow(ligne);
  });
}

/* ====================================================================== */
/*  Devoirs à rendre en photo                                              */
/* ====================================================================== */
function dossierRacine_() {
  var props = PropertiesService.getScriptProperties(), id = props.getProperty("DOSSIER_ID"), d = null;
  if (id) { try { d = DriveApp.getFolderById(id); if (d.isTrashed()) d = null; } catch (e) { d = null; } }
  if (!d) { d = DriveApp.createFolder("Profdemaths 2.0 · Copies des élèves · 2026-2027"); props.setProperty("DOSSIER_ID", d.getId()); }
  return d;
}
function sousDossier_(parent, nom) {
  var it = parent.getFoldersByName(nom);
  return it.hasNext() ? it.next() : parent.createFolder(nom);
}
function b64Image_(s) {
  s = String(s || "");
  var m = s.match(/^data:image\/[a-z+]+;base64,(.*)$/);
  if (m) s = m[1];
  if (!s || s.length > MAX_B64 || !/^[A-Za-z0-9+\/=]+$/.test(s)) return null;
  return s;
}
function lireOnglet_(ss, nom, H) {
  var sh = onglet_(ss, nom, H), n = sh.getLastRow() - 1;
  var v = n > 0 ? sh.getRange(2, 1, n, H.length).getDisplayValues() : [];
  return { sh: sh, v: v };
}
function devoirDe_(row) {
  return { id: row[0], cree: row[1], par: row[2], niveau: row[3], classes: String(row[4]).split(/[,;\s]+/).map(normClasse_).filter(String),
    chap: row[5], titre: row[6], enonce: row[7], image: row[8], echeance: row[9], sur: Number(String(row[10]).replace(",", ".")) || 20,
    actif: String(row[11]) !== "Non" };
}
function copieDe_(row) {
  return { id: row[0], cle: row[1], date: row[2], heure: row[3], pseudo: row[4], eleve: row[5], niveau: row[6], classe: normClasse_(row[7]),
    devoir: row[8], titre: row[9], fichiers: String(row[10]).split(",").filter(String), statut: row[11], note: row[12], sur: row[13],
    com: row[14], par: row[15], le: row[16] };
}
function trouver_(t, id) {
  for (var i = 0; i < t.v.length; i++) if (String(t.v[i][0]) === String(id)) return { i: i, ligne: i + 2, row: t.v[i] };
  return null;
}

/* L'élève envoie les photos de sa copie */
function rendre_(r) {
  var pseudo = String(r.pseudo || "").toLowerCase().trim();
  if (!pseudo || supprimes_()[pseudo]) return { ok: false, erreur: "Ton compte n'est pas reconnu : reconnecte-toi." };
  var ss = classeur_(), e = ligneEleve_(ss, pseudo);
  if (!e) return { ok: false, erreur: "Ton compte n'est pas reconnu : reconnecte-toi avec ton pseudo et ton code secret." };
  var D = lireOnglet_(ss, "Devoirs", ENTETES_DEVOIRS), fd = trouver_(D, r.devoir);
  if (!fd) return { ok: false, erreur: "Ce devoir n'existe plus." };
  var dev = devoirDe_(fd.row);
  if (!dev.actif) return { ok: false, erreur: "Ce devoir est fermé : tu ne peux plus rendre ta copie." };
  if (dev.classes.indexOf(e.classe) < 0) return { ok: false, erreur: "Ce devoir n'est pas pour ta classe (" + e.classe + ")." };
  var imgs = (Array.isArray(r.images) ? r.images : []).slice(0, MAX_PHOTOS).map(b64Image_);
  if (!imgs.length || imgs.some(function (x) { return !x; })) return { ok: false, erreur: "Photo illisible ou trop lourde : reprends la photo." };

  var C = lireOnglet_(ss, "Copies", ENTETES_COPIES), ancienne = null;
  for (var i = 0; i < C.v.length; i++) if (String(C.v[i][4]).toLowerCase() === pseudo && String(C.v[i][8]) === dev.id) ancienne = { ligne: i + 2, c: copieDe_(C.v[i]) };
  if (ancienne && ancienne.c.statut === "Corrigée") return { ok: false, erreur: "Ta copie est déjà corrigée : tu ne peux plus la remplacer." };

  // photos dans Drive : un dossier par classe
  var dossier = sousDossier_(dossierRacine_(), e.classe), ids = [], stamp = Utilities.formatDate(new Date(), TZ, "yyyyMMdd-HHmm");
  imgs.forEach(function (b64, k) {
    var blob = Utilities.newBlob(Utilities.base64Decode(b64), "image/jpeg", e.classe + "_" + pseudo + "_" + dev.id + "_" + stamp + "_" + (k + 1) + ".jpg");
    var f = dossier.createFile(blob);
    f.setDescription(e.prenom + " " + e.nom + " · " + e.classe + " · " + dev.titre);
    ids.push(f.getId());
  });

  return verrou_(function () {
    var d = new Date(), date = Utilities.formatDate(d, TZ, "dd/MM/yyyy"), heure = Utilities.formatDate(d, TZ, "HH:mm");
    var sh = C.sh;
    if (ancienne) {
      ancienne.c.fichiers.forEach(function (fid) { try { DriveApp.getFileById(fid).setTrashed(true); } catch (x) {} });
      sh.getRange(ancienne.ligne, 3, 1, 10).setValues([[date, heure, pseudo, e.prenom + " " + e.nom, e.niveau, e.classe, dev.id, proprio_(dev.titre, 80), ids.join(","), "À corriger"]]);
      return { ok: true, id: ancienne.c.id, cle: ancienne.c.cle, remplacee: true };
    }
    var id = "C" + alea_(7), cle = alea_(16);
    sh.appendRow([id, cle, date, heure, pseudo, e.prenom + " " + e.nom, e.niveau, e.classe, dev.id, proprio_(dev.titre, 80), ids.join(","), "À corriger", "", dev.sur, "", "", ""]);
    return { ok: true, id: id, cle: cle };
  });
}

/* Image de l'énoncé d'un devoir (pour les élèves) */
function enonce_(r) {
  var ss = classeur_(), D = lireOnglet_(ss, "Devoirs", ENTETES_DEVOIRS), fd = trouver_(D, r.id);
  if (!fd) return { ok: false, erreur: "Devoir introuvable." };
  var dev = devoirDe_(fd.row);
  if (!dev.image) return { ok: false, erreur: "Pas d'image pour ce devoir." };
  return { ok: true, data: dataUrl_(dev.image) };
}
function dataUrl_(fid) {
  var b = DriveApp.getFileById(fid).getBlob();
  return "data:" + (b.getContentType() || "image/jpeg") + ";base64," + Utilities.base64Encode(b.getBytes());
}

/* Créneaux de remédiation par classe */
function remedClasses_(ss) {
  var o = {};
  lireOnglet_(ss, "Remédiation", ENTETES_REMED).v.forEach(function (r) {
    var c = normClasse_(r[0]); if (c) o[c] = { classe: c, creneau: r[1], lieu: r[2], remarque: r[3], par: r[4], le: r[5] };
  });
  return o;
}
/* Dernier test de positionnement de l'élève (lu dans l'onglet de sa classe) */
function dernierPositionnement_(ss, classe, pseudo) {
  var sh = ss.getSheetByName(classe);
  if (!sh || sh.getLastRow() < 2 || !pseudo) return null;
  var v = sh.getRange(2, 1, sh.getLastRow() - 1, ENTETES.length).getDisplayValues(), last = null;
  v.forEach(function (r) { if (String(r[17]).toLowerCase() === pseudo && r[7] === "Test de positionnement") last = r; });
  if (!last) return null;
  var sc = Number(String(last[10]).replace(",", ".")) || 0;
  return { score: sc, date: last[0], groupe: sc < SEUIL_REMED ? 1 : sc < 20 ? 2 : 3 };
}

/* Devoirs ouverts pour une classe + état des copies de l'élève (clés gardées sur son téléphone) */
function mesDevoirs_(p) {
  var classe = normClasse_(p.classe), ss = classeur_();
  var D = lireOnglet_(ss, "Devoirs", ENTETES_DEVOIRS), C = lireOnglet_(ss, "Copies", ENTETES_COPIES);
  var cles = {};
  String(p.k || "").split(",").forEach(function (x) { var t = x.split("."); if (t[0] && t[1]) cles[t[0]] = t[1]; });
  var copies = C.v.map(copieDe_).filter(function (c) { return cles[c.id] && cles[c.id] === c.cle; }).map(function (c) {
    var fini = c.statut === "Corrigée";
    return { id: c.id, devoir: c.devoir, titre: c.titre, date: c.date, heure: c.heure, statut: c.statut,
      note: fini ? c.note : "", sur: c.sur, com: fini ? c.com : "", par: fini ? c.par : "", le: fini ? c.le : "" };
  });
  var miens = {}; copies.forEach(function (c) { miens[c.devoir] = 1; });
  var devoirs = D.v.map(devoirDe_).filter(function (d) { return (d.actif && d.classes.indexOf(classe) >= 0) || miens[d.id]; }).map(function (d) {
    return { id: d.id, titre: d.titre, enonce: d.enonce, chap: d.chap, niveau: d.niveau, echeance: d.echeance, sur: d.sur,
      img: !!d.image, par: d.par, cree: d.cree, actif: d.actif };
  });
  var out = { ok: true, devoirs: devoirs, copies: copies };
  var pseudo = String(p.pseudo || "").toLowerCase();
  var pos = dernierPositionnement_(ss, classe, pseudo), cr = remedClasses_(ss)[classe] || null;
  out.remed = { pos: pos, creneau: cr };
  return out;
}

/* ====================================================================== */
/*  Professeurs                                                            */
/* ====================================================================== */
function ident_(code) {
  code = String(code || "").trim();
  if (!code) return null;
  if (code === CODE_PROF) return { admin: true, nom: ADMIN_NOM, classes: [] };
  var ss = classeur_(), P = lireOnglet_(ss, "Professeurs", ENTETES_PROFS);
  for (var i = 0; i < P.v.length; i++) {
    var row = P.v[i];
    if (String(row[1]).trim().toUpperCase() === code.toUpperCase() && String(row[3]) !== "Non") {
      return { admin: false, nom: row[0], code: row[1], ligne: i + 2, sh: P.sh,
        classes: String(row[2]).split(/[,;\s]+/).map(normClasse_).filter(String) };
    }
  }
  return null;
}
function peut_(id, classe) { return !!id && (id.admin || id.classes.indexOf(normClasse_(classe)) >= 0); }
function moi_(id) { return { nom: id.nom, admin: id.admin, classes: id.classes }; }

function listeProfs_(ss) {
  return lireOnglet_(ss, "Professeurs", ENTETES_PROFS).v.map(function (r) {
    return { nom: r[0], code: r[1], classes: String(r[2]).split(/[,;\s]+/).map(normClasse_).filter(String), actif: String(r[3]) !== "Non", cree: r[4], vu: r[5] };
  });
}
function classesValides_(l) {
  var out = [];
  (Array.isArray(l) ? l : String(l || "").split(/[,;\s]+/)).forEach(function (c) {
    c = normClasse_(c);
    if (RE_CLASSE.test(c) && out.indexOf(c) < 0) out.push(c);
  });
  return out;
}

/* Toutes les données de l'espace professeur, limitées aux classes du prof */
function donneesProf_(id) {
  var ss = classeur_(), sh = ss.getSheetByName("Résultats");
  var v = sh.getDataRange().getDisplayValues(), entetes = v.shift() || ENTETES;
  var lignes = v.filter(function (r) { return peut_(id, r[6]); });
  var se = ongletEleves_(ss), ins = [];
  if (se.getLastRow() > 1) {
    ins = se.getRange(2, 1, se.getLastRow() - 1, ENTETES_ELEVES.length).getDisplayValues()
      .filter(function (x) { return peut_(id, x[4]); })
      .map(function (x) { return [x[0], x[1], x[2], x[3], x[4], x[6], x[7], x[8], x[9]]; }); // sans l'empreinte du code secret
  }
  var devoirs = lireOnglet_(ss, "Devoirs", ENTETES_DEVOIRS).v.map(devoirDe_).filter(function (d) {
    return id.admin || d.classes.some(function (c) { return peut_(id, c); });
  });
  var copies = lireOnglet_(ss, "Copies", ENTETES_COPIES).v.map(copieDe_).filter(function (c) { return peut_(id, c.classe); })
    .map(function (c) { var o = {}; for (var k in c) if (k !== "cle") o[k] = c[k]; o.nb = c.fichiers.length; delete o.fichiers; return o; });
  var rc = remedClasses_(ss), remed = Object.keys(rc).filter(function (c) { return peut_(id, c); }).map(function (c) { return rc[c]; });
  var out = { ok: true, moi: moi_(id), entetes: entetes, lignes: lignes, inscrits: ins, devoirs: devoirs, copies: copies, remed: remed };
  if (id.admin) { out.feuille = ss.getUrl(); out.profs = listeProfs_(ss); try { out.dossier = dossierRacine_().getUrl(); } catch (x) {} }
  if (!id.admin && id.sh) { try { id.sh.getRange(id.ligne, 6).setValue(maintenant_()); } catch (x) {} }
  return out;
}

/* Actions du professeur (POST) */
function profAction_(r) {
  var id = ident_(r.code);
  if (!id) return { ok: false, erreur: "Code professeur incorrect ou compte désactivé." };
  var op = r.op, ss = classeur_();

  if (op === "images") {
    var C = lireOnglet_(ss, "Copies", ENTETES_COPIES), f = trouver_(C, r.id);
    if (!f) return { ok: false, erreur: "Copie introuvable." };
    var c = copieDe_(f.row);
    if (!peut_(id, c.classe)) return { ok: false, erreur: "Cette copie n'est pas dans vos classes." };
    var data = [];
    c.fichiers.forEach(function (fid) { try { data.push(dataUrl_(fid)); } catch (x) { data.push(""); } });
    return { ok: true, images: data };
  }

  if (op === "noter") {
    return verrou_(function () {
      var C = lireOnglet_(ss, "Copies", ENTETES_COPIES), f = trouver_(C, r.id);
      if (!f) return { ok: false, erreur: "Copie introuvable." };
      var c = copieDe_(f.row);
      if (!peut_(id, c.classe)) return { ok: false, erreur: "Cette copie n'est pas dans vos classes." };
      var sur = Number(String(r.sur).replace(",", ".")) || Number(c.sur) || 20;
      var note = Number(String(r.note).replace(",", "."));
      if (!(note >= 0 && note <= sur)) return { ok: false, erreur: "Note invalide : entre 0 et " + sur + "." };
      var le = maintenant_();
      C.sh.getRange(f.ligne, 12, 1, 6).setValues([["Corrigée", note, sur, texte_(r.com, 1500), proprio_(id.nom, 60), le]]);
      // la note entre aussi dans le suivi (onglet Résultats + onglet de la classe) ; une re-correction remplace l'ancienne
      var test = function (row) { return String(row[7]) === TYPE_COPIE && String(row[9]) === c.devoir && String(row[17]).toLowerCase() === String(c.pseudo).toLowerCase(); };
      [ss.getSheetByName("Résultats"), ss.getSheetByName(c.classe)].forEach(function (sh) { effacer_(sh, test); });
      var p = String(c.eleve).split(" "), nom = p.pop(), prenom = p.join(" ");
      enregistrerResultats_([{ prenom: prenom, nom: nom, niveau: c.niveau, classe: c.classe, type: TYPE_COPIE, chapitre: c.titre,
        code: c.devoir, note: note, sur: sur, duree: 0, tentative: 1, revoir: "", uid: c.id, pseudo: c.pseudo }]);
      return { ok: true };
    });
  }

  if (op === "devoir") {
    var classes = classesValides_(r.classes).filter(function (c) { return peut_(id, c); });
    var niv = NIVEAUX.indexOf(r.niveau) >= 0 ? r.niveau : "";
    if (!niv) return { ok: false, erreur: "Choisissez le niveau." };
    classes = classes.filter(function (c) { return c.charAt(0) === niv.charAt(0); });
    if (!classes.length) return { ok: false, erreur: "Choisissez au moins une de vos classes de " + niv + "." };
    var titre = proprio_(r.titre, 80).trim();
    if (!titre) return { ok: false, erreur: "Donnez un titre au devoir." };
    var enonce = texte_(r.enonce, 4000).trim();
    var sur = Number(String(r.sur || 20).replace(",", ".")) || 20;
    var ech = "";
    if (r.echeance && /^\d{4}-\d{2}-\d{2}$/.test(r.echeance)) { var t = r.echeance.split("-"); ech = t[2] + "/" + t[1] + "/" + t[0]; }
    var img = "";
    if (r.image) {
      var b = b64Image_(r.image);
      if (!b) return { ok: false, erreur: "Image de l'énoncé trop lourde ou illisible." };
      var fi = sousDossier_(dossierRacine_(), "Énoncés").createFile(Utilities.newBlob(Utilities.base64Decode(b), "image/jpeg", "enonce_" + Date.now() + ".jpg"));
      img = fi.getId();
    }
    if (!enonce && !img) return { ok: false, erreur: "Écrivez l'énoncé (ou ajoutez une photo de l'énoncé)." };
    return verrou_(function () {
      var D = lireOnglet_(ss, "Devoirs", ENTETES_DEVOIRS);
      if (r.id) {
        var f = trouver_(D, r.id);
        if (!f) return { ok: false, erreur: "Devoir introuvable." };
        var d = devoirDe_(f.row);
        if (!id.admin && !d.classes.every(function (c) { return peut_(id, c); })) return { ok: false, erreur: "Ce devoir concerne aussi des classes qui ne sont pas les vôtres." };
        D.sh.getRange(f.ligne, 4, 1, 8).setValues([[niv, classes.join(", "), proprio_(r.chap, 12), titre, enonce, img || (r.garderImage ? d.image : ""), ech, sur]]);
        return { ok: true, id: r.id };
      }
      var nid = "D" + alea_(5);
      D.sh.appendRow([nid, maintenant_(), proprio_(id.nom, 60), niv, classes.join(", "), proprio_(r.chap, 12), titre, enonce, img, ech, sur, "Oui"]);
      return { ok: true, id: nid };
    });
  }

  if (op === "devoirEtat") {
    return verrou_(function () {
      var D = lireOnglet_(ss, "Devoirs", ENTETES_DEVOIRS), f = trouver_(D, r.id);
      if (!f) return { ok: false, erreur: "Devoir introuvable." };
      var d = devoirDe_(f.row);
      if (!id.admin && !d.classes.every(function (c) { return peut_(id, c); })) return { ok: false, erreur: "Ce devoir concerne aussi des classes qui ne sont pas les vôtres." };
      D.sh.getRange(f.ligne, 12).setValue(r.actif ? "Oui" : "Non");
      return { ok: true };
    });
  }

  if (op === "remed") {
    var cl = normClasse_(r.classe);
    if (!RE_CLASSE.test(cl) || !peut_(id, cl)) return { ok: false, erreur: "Cette classe n\u0027est pas dans vos classes." };
    return verrou_(function () {
      var T = lireOnglet_(ss, "Remédiation", ENTETES_REMED), row = [cl, proprio_(r.creneau, 80), proprio_(r.lieu, 60), proprio_(r.remarque, 200), proprio_(id.nom, 60), maintenant_()];
      for (var i = 0; i < T.v.length; i++) if (normClasse_(T.v[i][0]) === cl) { T.sh.getRange(i + 2, 1, 1, row.length).setValues([row]); return { ok: true }; }
      T.sh.appendRow(row);
      return { ok: true };
    });
  }

  /* ----- gestion des comptes professeurs : administrateur seulement ----- */
  if (!id.admin) return { ok: false, erreur: "Réservé à l'administrateur." };

  if (op === "profCreer" || op === "profModifier") {
    return verrou_(function () {
      var P = lireOnglet_(ss, "Professeurs", ENTETES_PROFS);
      var nom = proprio_(r.nom, 60).trim(), cls = classesValides_(r.classes);
      if (!nom) return { ok: false, erreur: "Écrivez le nom du professeur." };
      if (!cls.length) return { ok: false, erreur: "Cochez au moins une classe." };
      if (op === "profCreer") {
        var code;
        do { code = "MATH-" + alea_(6); } while (P.v.some(function (x) { return String(x[1]).toUpperCase() === code; }));
        P.sh.appendRow([nom, code, cls.join(", "), "Oui", maintenant_(), ""]);
        return { ok: true, code: code };
      }
      for (var i = 0; i < P.v.length; i++) if (String(P.v[i][1]) === String(r.cible)) {
        P.sh.getRange(i + 2, 1).setValue(nom);
        P.sh.getRange(i + 2, 3, 1, 2).setValues([[cls.join(", "), r.actif === false ? "Non" : "Oui"]]);
        return { ok: true };
      }
      return { ok: false, erreur: "Compte introuvable." };
    });
  }
  if (op === "profSupprimer") {
    return verrou_(function () {
      var P = lireOnglet_(ss, "Professeurs", ENTETES_PROFS);
      for (var i = 0; i < P.v.length; i++) if (String(P.v[i][1]) === String(r.cible)) { P.sh.deleteRow(i + 2); return { ok: true }; }
      return { ok: false, erreur: "Compte introuvable." };
    });
  }
  return { ok: false, erreur: "Action inconnue." };
}

/* ====================================================================== */
/*  Suppression d'un élève (Espace professeur)                             */
/*  Rien n'est effacé définitivement : les lignes sont déplacées dans      */
/*  l'onglet « Corbeille ». Pour annuler, recopiez-les à leur place et     */
/*  retirez le pseudo avec la fonction restaurer().                        */
/* ====================================================================== */
function supprimes_() {
  try { return JSON.parse(PropertiesService.getScriptProperties().getProperty("SUPPRIMES") || "{}"); } catch (e) { return {}; }
}
function corbeille_(ss) {
  var c = ss.getSheetByName("Corbeille");
  if (!c) { c = ss.insertSheet("Corbeille"); c.appendRow(["Supprimé le", "Onglet d'origine", "Ligne"]); c.getRange(1, 1, 1, 3).setFontWeight("bold"); }
  return c;
}
function deplacer_(ss, sh, test, quand) {
  if (!sh || sh.getLastRow() < 2) return 0;
  var v = sh.getDataRange().getValues(), cb = corbeille_(ss), n = 0;
  for (var i = v.length - 1; i >= 1; i--) {
    if (test(v[i])) { cb.appendRow([quand, sh.getName()].concat(v[i])); sh.deleteRow(i + 1); n++; }
  }
  return n;
}
function effacer_(sh, test) {
  if (!sh || sh.getLastRow() < 2) return 0;
  var v = sh.getDataRange().getValues(), n = 0;
  for (var i = v.length - 1; i >= 1; i--) if (test(v[i])) { sh.deleteRow(i + 1); n++; }
  return n;
}
function classeDeLEleve_(ss, pseudo) { var e = pseudo ? ligneEleve_(ss, pseudo) : null; return e ? e.classe : ""; }

function supprimerEleve_(p, id) {
  var pseudo = String(p.pseudo || "").toLowerCase().trim(), eleve = String(p.eleve || "").trim(), classe = normClasse_(p.classe);
  if (!pseudo && !eleve) return { ok: false, erreur: "Élève non précisé." };
  return verrou_(function () {
    var ss = classeur_(), quand = maintenant_(), n = 0;
    if (!id.admin) {
      var c = pseudo ? classeDeLEleve_(ss, pseudo) : classe;
      if (!peut_(id, c)) return { ok: false, erreur: "Cet élève n'est pas dans vos classes." };
    }
    // lignes de résultats : par pseudo, ou (anciens élèves sans pseudo) par nom + classe
    var test = function (r) {
      if (pseudo) return String(r[17] || "").toLowerCase() === pseudo;
      return String(r[2]).trim() === eleve && normClasse_(r[6]) === classe && !String(r[17] || "");
    };
    ss.getSheets().forEach(function (sh) {
      var nom = sh.getName();
      if (nom === "Résultats" || RE_ONGLET_CLASSE.test(nom)) n += deplacer_(ss, sh, test, quand);
    });
    if (pseudo) {
      n += deplacer_(ss, ss.getSheetByName("Élèves"), function (r) { return String(r[0]).toLowerCase() === pseudo; }, quand);
      var s = supprimes_(); s[pseudo] = quand;
      PropertiesService.getScriptProperties().setProperty("SUPPRIMES", JSON.stringify(s));
    }
    return { ok: true, lignes: n };
  });
}
/* Retirer les résultats d'un élève pour une activité précise (ex. pseudo=mood, activite=3e-POS) : rangés dans la Corbeille */
function retirerResultat_(p, id) {
  var pseudo = String(p.pseudo || "").toLowerCase().trim(), act = String(p.activite || "").trim();
  if (!pseudo || !act) return { ok: false, erreur: "Élève ou activité non précisé." };
  return verrou_(function () {
    var ss = classeur_(), quand = maintenant_(), n = 0;
    if (!id.admin && !peut_(id, classeDeLEleve_(ss, pseudo))) return { ok: false, erreur: "Cet élève n'est pas dans vos classes." };
    var test = function (r) { return String(r[17] || "").toLowerCase() === pseudo && String(r[9]) === act; };
    ss.getSheets().forEach(function (sh) {
      var nom = sh.getName();
      if (nom === "Résultats" || RE_ONGLET_CLASSE.test(nom)) n += deplacer_(ss, sh, test, quand);
    });
    return { ok: true, lignes: n };
  });
}
/* À lancer à la main pour rendre un pseudo de nouveau utilisable : restaurer("medoune") */
function restaurer(pseudo) {
  var s = supprimes_(); delete s[String(pseudo).toLowerCase()];
  PropertiesService.getScriptProperties().setProperty("SUPPRIMES", JSON.stringify(s));
}

/* ====================================================================== */
/*  Classement public (pseudos uniquement, jamais les noms)                */
/* ====================================================================== */
function pointsDe_(type, note, n20) {
  note = Number(note) || 0;
  if (type === "Quiz") return note;                                    // quiz sur 10 : jusqu'à 10 points
  if (type === "Évaluation du mois") return Math.round(note * 1.5);   // jusqu'à 30 points
  if (type === TYPE_COPIE) return Math.round(Number(String(n20).replace(",", ".")) || 0); // copie corrigée : jusqu'à 20 points
  if (/valuation/.test(type)) return note;                            // évaluation sur 20 : jusqu'à 20 points
  return 0;
}
function dateDe_(v) {
  if (v instanceof Date) return v;
  var m = String(v).match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null;
}
function classement_() {
  var cache = CacheService.getScriptCache(), cle = "classement_v2";
  var base = cache.get(cle);
  if (!base) {
    var ss = classeur_(), sh = ss.getSheetByName("Résultats"), v = sh.getDataRange().getValues();
    var h = v.shift() || ENTETES, iD = h.indexOf("Date"), iT = h.indexOf("Type"), iN = h.indexOf("Note"), iC = h.indexOf("Classe"), iV = h.indexOf("Niveau"), iP = h.indexOf("Pseudo"), i20 = h.indexOf("Note /20");
    var now = new Date();
    var jour = Number(Utilities.formatDate(now, TZ, "u")); // 1 = lundi
    var lundi = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (jour - 1));
    var debutMois = new Date(now.getFullYear(), now.getMonth(), 1);
    var iK = h.indexOf("Code"), best = {};
    v.forEach(function (r) {
      var ps = String(r[iP] || "").toLowerCase();
      if (!ps || iP < 0) return;
      var d = dateDe_(r[iD]); if (!d || d < debutMois && d < lundi) return;
      // une seule note comptée par chapitre, par type d'activité et par jour : la meilleure
      var k = ps + "|" + r[iK] + "|" + r[iT] + "|" + d.toDateString(), pts = pointsDe_(String(r[iT]), r[iN], r[i20]);
      if (!best[k] || pts > best[k].pts) best[k] = { ps: ps, d: d, pts: pts, c: String(r[iC]), v: String(r[iV]) };
    });
    var acc = { semaine: {}, mois: {} };
    Object.keys(best).forEach(function (k) {
      var b = best[k];
      [["mois", debutMois], ["semaine", lundi]].forEach(function (x) {
        if (b.d < x[1]) return;
        var a = acc[x[0]][b.ps] || (acc[x[0]][b.ps] = { p: b.ps, pts: 0, n: 0, c: b.c, v: b.v });
        a.pts += b.pts; a.n++; a.c = b.c; a.v = b.v;
      });
    });
    base = JSON.stringify({ semaine: Object.keys(acc.semaine).map(function (k) { return acc.semaine[k]; }),
      mois: Object.keys(acc.mois).map(function (k) { return acc.mois[k]; }),
      maj: Utilities.formatDate(now, TZ, "dd/MM/yyyy HH:mm") });
    cache.put(cle, base, 300);
  }
  return JSON.parse(base);
}

/* ====================================================================== */
/*  Lectures (GET) : classement, état du compte, devoirs, espace professeur */
/* ====================================================================== */
function doGet(e) {
  var p = (e && e.parameter) || {};
  var out;
  try {
    if (p.action === "classement") out = { ok: true, classement: classement_() };
    else if (p.action === "etat") out = etat_(p);
    else if (p.action === "mesdevoirs") out = mesDevoirs_(p);
    else {
      var id = ident_(p.code);
      if (!id) out = { ok: false, erreur: "Code professeur incorrect ou compte désactivé." };
      else if (p.action === "supprimer") out = supprimerEleve_(p, id);
      else if (p.action === "retirerResultat") out = retirerResultat_(p, id);
      else out = donneesProf_(id);
    }
  } catch (err) {
    out = { ok: false, erreur: String(err && err.message || err) };
  }
  var txt = JSON.stringify(out);
  if (p.callback && /^[\w.]+$/.test(p.callback)) {
    return ContentService.createTextOutput(p.callback + "(" + txt + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(txt).setMimeType(ContentService.MimeType.JSON);
}
