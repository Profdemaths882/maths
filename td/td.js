/* Profdemaths 2.0 · Fiches de TD (Cellule de mathématiques, CEM John F. Kennedy)
   Exercices pris ou adaptés du livret DEMSG (« Mon livret de mathématiques », juin 2023),
   de SENEMATHS 4e, des sujets du BFEM, complétés par la cellule.
   Chaque exercice est classé selon la taxonomie de Bloom. */
(function (G) {
  const f = (a, b) => `<span class="fr"><span>${a}</span><span>${b}</span></span>`;
  const r = x => `√<span class="rad">${x}</span>`;
  const L6 = 'Livret DEMSG 6e', L5 = 'Livret DEMSG 5e', L3 = 'Livret DEMSG 3e', SN4 = 'SENEMATHS 4e', CEL = 'Cellule de maths';
  const BLOOM = [
    ['Connaître', 'Je me souviens du cours', '#5B6B8C'],
    ['Comprendre', 'J\'explique, je reconnais', '#1F7A5A'],
    ['Appliquer', 'J\'utilise une règle, une méthode', '#1E3F8A'],
    ['Analyser', 'Je décompose, je trouve l\'erreur', '#6B3FA0'],
    ['Évaluer', 'Je juge, je justifie, je décide', '#B86A12'],
    ['Créer', 'J\'invente, je construis', '#B4442F']
  ];
  const X = (b, s, e, c) => ({ b, s, e, c });

  const TD = {
    /* ===================== 6e ===================== */
    '6e-DEC': {
      obj: ['Lire et écrire un nombre décimal en chiffres et en lettres', 'Donner le rang de chaque chiffre', 'Utiliser { }, ∈, ∉, ⊂, ∩ et ∪'],
      rap: ['Un nombre décimal a une partie entière et une partie décimale séparées par la virgule.', 'Partie décimale : dixièmes, centièmes, millièmes… Partie entière : unités, dizaines, centaines, milliers…', 'On ne change pas un décimal en ajoutant des zéros à gauche de la partie entière ou à droite de la partie décimale.'],
      ex: [
        X('Connaître', L6 + ' · L1 ex. 1', `Complète :<br>a) Le plus petit entier naturel de 4 chiffres est …<br>b) Le plus petit entier naturel de 4 chiffres <b>distincts</b> est …<br>c) Dans 235, le chiffre 3 est le chiffre des …<br>d) Dans 976,02, le … est le chiffre des dixièmes.`,
          `a) 1 000 · b) 1 023 · c) dizaines · d) 0 est le chiffre des dixièmes.`),
        X('Comprendre', L6 + ' · L1 ex. 4', `Récris les nombres en supprimant les zéros inutiles (s'il y en a) :<br>52,400 · 253,3004 · 0026,1250 · 004560 · 154,0216 · 402,000`,
          `52,4 · 253,3004 (aucun zéro inutile) · 26,125 · 4 560 · 154,0216 (aucun) · 402.`),
        X('Comprendre', L6 + ' · L1 ex. 6', `1. Donne la partie entière et la partie décimale de : 32,25 ; 124,001 ; 200 ; 015,80.<br>2. Donne le rang de chaque chiffre du nombre 1 325,046.`,
          `1. 32 et 25 · 124 et 001 · 200 et 0 · 15 et 8 (0,80 = 0,8).<br>2. 1 : milliers ; 3 : centaines ; 2 : dizaines ; 5 : unités ; 0 : dixièmes ; 4 : centièmes ; 6 : millièmes.`),
        X('Appliquer', L6 + ' · L1 ex. 10', `Donne l'écriture décimale :<br>a) sept unités et huit dixièmes ; b) cent unités, huit dixièmes et un centième ; c) deux unités et trois centièmes ; d) treize centaines, neuf dixièmes et quatre millièmes ; e) trente-six milliers et huit millièmes ; f) cinq unités et quinze millièmes.`,
          `a) 7,8 · b) 100,81 · c) 2,03 · d) 1 300,904 · e) 36 000,008 · f) 5,015`),
        X('Appliquer', L6 + ' · L1 ex. 7', `1. Écris en lettres : 573 023.<br>2. Écris en chiffres : sept cent trente-huit mille douze.`,
          `1. Cinq cent soixante-treize mille vingt-trois.<br>2. 738 012.`),
        X('Analyser', L6 + ' · L1 ex. 8', `Le maître écrit 403,651. Chaque élève se trompe sur un seul chiffre.<br>Pierre écrit 403,751 ; Demba 413,651 ; Sophie 403,681. Fatou écrit 9 comme chiffre des dixièmes.<br>Quel chiffre chacun a-t-il changé ? Qu'a écrit Fatou ?`,
          `Pierre : chiffre des dixièmes · Demba : chiffre des dizaines · Sophie : chiffre des centièmes · Fatou a écrit 403,951.`),
        X('Analyser', L6 + ' · L1 ex. 13', `A est l'ensemble des lettres du mot <i>ananas</i>, B celui des lettres du mot <i>banane</i>, C l'ensemble des chiffres de 888, D celui des chiffres de 1 890.<br>1. Écris A, B, C et D avec des accolades.<br>2. Complète par ∈, ∉, ⊂ ou ⊄ : n … A ; s … B ; A … B ; C … D.<br>3. Détermine A ∩ B, C ∩ A, A ∪ B et A ∪ C.`,
          `1. A = {a ; n ; s} · B = {b ; a ; n ; e} · C = {8} · D = {1 ; 8 ; 9 ; 0}<br>2. n ∈ A ; s ∉ B ; A ⊄ B ; C ⊂ D<br>3. A ∩ B = {a ; n} · C ∩ A = ∅ · A ∪ B = {a ; n ; s ; b ; e} · A ∪ C = {a ; n ; s ; 8}`),
        X('Évaluer', L6 + ' · L1 ex. 18', `Sur un monument de Dakar, on lit l'année MCMLX en chiffres romains (M = 1 000 ; C = 100 ; L = 50 ; X = 10 ; un symbole placé à gauche d'un plus fort se retranche).<br>Ton ami pense que c'est 2160. A-t-il raison ? Quelle est cette année et que rappelle-t-elle pour le Sénégal ?`,
          `M = 1 000 ; CM = 1 000 − 100 = 900 ; L = 50 ; X = 10. MCMLX = 1 960. Il a tort (il a ajouté C au lieu de le retrancher). 1960 : année de l'indépendance du Sénégal.`),
        X('Créer', L6 + ' · L1 ex. 16 + ' + CEL, `1. Devinette : « Je suis un nombre plus petit que 1 000. La somme de mes chiffres est 21. Mon chiffre des unités est le double de mon chiffre des centaines. Qui suis-je ? »<br>2. À ton tour, invente une devinette dont la réponse est un nombre décimal à deux chiffres après la virgule. Donne-la à ton voisin.`,
          `1. Le nombre a 3 chiffres. (centaines ; unités) peut être (1 ; 2), (2 ; 4), (3 ; 6), (4 ; 8). La somme 21 impose le chiffre des dizaines : 18, 15, 12 ou 9. Seul 9 est un chiffre : <b>498</b>.<br>2. Réponse libre ; le professeur vérifie qu'une seule réponse est possible.`)
      ]
    },
    '6e-ADD': {
      obj: ['Poser et effectuer une addition de décimaux', 'Utiliser la commutativité et l\'associativité pour calculer astucieusement', 'Donner un ordre de grandeur d\'une somme'],
      rap: ['a + b = b + a (commutativité) ; (a + b) + c = a + (b + c) (associativité) ; a + 0 = a.', 'Pour poser une addition, on aligne les virgules.', 'Ordre de grandeur : on remplace chaque terme par un nombre proche, facile à calculer.'],
      ex: [
        X('Connaître', L6 + ' · L2 ex. 1', `Complète :<br>1. Le résultat de 4,25 + 8,34 est la … des nombres 4,25 et 8,34.<br>2. Dans 12,4 + 13,5 = 25,9, les nombres 12,4 et 13,5 sont les … de l'addition.<br>3. a + b = b + a : on dit que l'addition est …<br>4. (a + b) + c = a + (b + c) : on dit que l'addition est …`,
          `1. somme · 2. termes · 3. commutative · 4. associative`),
        X('Comprendre', CEL, `Vrai ou faux ? Justifie.<br>1. Pour tous décimaux a et b, a + b = b + a.<br>2. 0 + 7,5 = 7,5.<br>3. Un ordre de grandeur donne le résultat exact.<br>4. Pour additionner 3,5 et 12, on aligne le 5 sous le 2.`,
          `1. Vrai (commutativité). 2. Vrai (0 est l'élément neutre). 3. Faux : il donne une valeur approchée. 4. Faux : on aligne les virgules (12 = 12,0), donc 3 sous le 2.`),
        X('Appliquer', L6 + ' · L2 ex. 5', `Pose et effectue : a) 13,54 + 23,45 ; b) 32 + 153,46 ; c) 66,549 + 23,26.`,
          `a) 36,99 · b) 185,46 · c) 89,809`),
        X('Appliquer', L6 + ' · L2 ex. 6', `Regroupe astucieusement puis calcule, en citant les propriétés utilisées :<br>A = 12,45 + 12,5 + 20,55<br>B = 4,13 + 5,39 + 2,27 + 3,10 + 6,11 + 4,20`,
          `A = (12,45 + 20,55) + 12,5 = 33 + 12,5 = <b>45,5</b><br>B = (4,13 + 2,27) + (5,39 + 6,11) + (3,10 + 4,20) = 6,4 + 11,5 + 7,3 = <b>25,2</b><br>Propriétés : commutativité (on change l'ordre) et associativité (on regroupe).`),
        X('Appliquer', L6 + ' · L2 ex. 4 et 10', `1. Donne un ordre de grandeur de 3 025,98 + 6 947,65.<br>2. Papa achète un sachet de lait de 400 g, un pot de café de 200 g et 1,750 kg de sucre. Quelle est la masse totale en kg ?`,
          `1. 3 000 + 7 000 = 10 000.<br>2. 0,4 + 0,2 + 1,750 = <b>2,35 kg</b>.`),
        X('Analyser', L6 + ' · L2 ex. 7', `Fatou calcule A = 12,5 + 3 + 1,5 + 1,9 + 7 + 2,1 :<br>A = 12,5 + 1,5 + 1,9 + 2,1 + 3 + 7<br>A = 14 + 4 + 40<br>A = 28<br>1. Quelle propriété utilise-t-elle à la 2e ligne ? à la 3e ligne ?<br>2. Ses calculs sont-ils tous exacts ? Corrige si besoin.`,
          `1. 2e ligne : commutativité. 3e ligne : associativité (regroupements).<br>2. La 3e ligne contient une erreur : 3 + 7 = 10 et non 40. La bonne ligne est A = 14 + 4 + 10. Le résultat final 28 est juste, mais la ligne intermédiaire est fausse.`),
        X('Évaluer', L6 + ' · L2 ex. 8', `Mamadou achète un pantalon à 7 850 F, une chemise à 5 450 F et des chaussures à 13 900 F. Il a 27 000 F.<br>1. Donne une estimation du montant à payer.<br>2. Calcule le montant exact. Peut-il tout payer ?`,
          `1. 8 000 + 5 000 + 14 000 = 27 000 F environ.<br>2. 7 850 + 5 450 + 13 900 = 27 200 F. Non : il lui manque 200 F. L'estimation ne suffit pas pour décider quand on est proche de la somme disponible.`),
        X('Créer', CEL, `Écris trois nombres décimaux, aucun n'étant entier, dont la somme est égale à 10. Vérifie ta réponse en posant l'addition.`,
          `Exemple : 2,5 + 3,7 + 3,8 = 10. Beaucoup de réponses sont possibles.`)
      ]
    },
    '6e-SOU': {
      obj: ['Poser et effectuer une soustraction de décimaux', 'Compléter une égalité a + … = b', 'Résoudre un problème de la vie courante avec des différences'],
      rap: ['a − b n\'est possible dans 𝒟 que si a ≥ b.', 'La soustraction n\'est ni commutative ni associative.', 'Pour compléter a + … = b, on calcule b − a.'],
      ex: [
        X('Connaître', L6 + ' · L3 ex. 1', `Complète : 1. Le résultat de 15,5 − 12,4 est la … des nombres 15,5 et 12,4.<br>2. Dans 20,5 − 14,4 = 6,1, les nombres 20,5 et 14,4 sont les … de la soustraction.`,
          `1. différence · 2. termes`),
        X('Comprendre', L6 + ' · L3 ex. 2 et 3', `1. Vrai ou faux : a) a − b = b − a pour tous décimaux ; b) en général (a − b) − c ≠ a − (b − c) ; c) la différence de deux décimaux arithmétiques est toujours un décimal arithmétique.<br>2. Parmi 12 − 11,98 ; 35,5 − 35,7 ; 3,4 − 3,1254, lesquelles sont possibles dans 𝒟 ?`,
          `1. a) Faux · b) Vrai · c) Faux (35,5 − 35,7 est impossible dans 𝒟).<br>2. 12 − 11,98 et 3,4 − 3,1254.`),
        X('Appliquer', L6 + ' · L3 ex. 5', `Pose et effectue : 85 765 − 29 586 ; 25 284,2 − 327,55 ; 1 − 0,303 ; 15,122 − 8,79.`,
          `56 179 · 24 956,65 · 0,697 · 6,332`),
        X('Appliquer', L6 + ' · L3 ex. 6 et 7', `1. Donne un ordre de grandeur de 3 498,25 − 1 201,01.<br>2. Complète : … + 215,45 = 850,68 ; 57,12 = 87,4 − …`,
          `1. 3 500 − 1 200 = 2 300.<br>2. 850,68 − 215,45 = <b>635,23</b> ; 87,4 − 57,12 = <b>30,28</b>.`),
        X('Analyser', L6 + ' · L3 ex. 8', `De combien 15,598 est-il plus petit que 15,6 ? De combien 2 561,14 est-il plus grand que 2 560,95 ?`,
          `15,6 − 15,598 = 0,002 · 2 561,14 − 2 560,95 = 0,19`),
        X('Évaluer', L6 + ' · L3 ex. 10', `Moustapha a 18 ans et son papa 54 ans. Sa petite sœur Fatou a 3 ans de moins que lui et son grand frère Ousmane 2 ans de plus.<br>Quel âge avait le papa à la naissance de chaque enfant ?`,
          `Fatou : 15 ans → 54 − 15 = 39 ans. Moustapha : 54 − 18 = 36 ans. Ousmane : 20 ans → 54 − 20 = 34 ans.`),
        X('Analyser', L6 + ' · L3 ex. 11', `Mamadou achète une maison, y fait 1 501 500 F de travaux et veut la revendre 68 828 500 F pour gagner 5 330 000 F. Retrouve le prix d'achat de la maison.`,
          `Prix de revient = 68 828 500 − 5 330 000 = 63 498 500 F. Prix d'achat = 63 498 500 − 1 501 500 = <b>61 997 000 F</b>.`),
        X('Créer', CEL, `Invente un petit problème de marché (ou de boutique) qui se résout par la soustraction 2 500 − 1 375. Résous-le.`,
          `Exemple : « Awa paie 1 375 F de légumes avec un billet de 2 500 F. Combien lui rend-on ? » → 1 125 F.`)
      ]
    },
    '6e-GEO': {
      obj: ['Connaître le vocabulaire : point, droite, segment, demi-droite, solides', 'Utiliser ∈, ∉, ⊂ en géométrie', 'Utiliser l\'inégalité triangulaire'],
      rap: ['Pavé droit et cube : 6 faces, 8 sommets, 12 arêtes.', 'Si M ∈ [AB] alors AM + MB = AB ; sinon AM + MB > AB.', 'Deux droites sont sécantes (un point commun), disjointes (aucun) ou confondues.'],
      ex: [
        X('Connaître', L6 + ' · G1 ex. 1 et 2', `Complète :<br>1. Un parallélépipède rectangle a … sommets ; un cube a … arêtes et … faces.<br>2. Les bases d'un cylindre droit sont deux … superposables.<br>3. Deux droites qui n'ont aucun point commun sont dites …<br>4. Trois points situés sur une même … sont dits alignés.`,
          `1. 8 ; 12 ; 6 · 2. disques · 3. disjointes · 4. droite`),
        X('Comprendre', CEL, `A, B et C sont trois points d'une droite (d), placés dans cet ordre. D est un point qui n'est pas sur (d).<br>Complète par ∈, ∉ ou ⊂ : B … [AC] ; D … (AB) ; [AB] … [AC) ; C … [BA) ; A … (BC).`,
          `B ∈ [AC] ; D ∉ (AB) ; [AB] ⊂ [AC) ; C ∉ [BA) (la demi-droite part de B vers A) ; A ∈ (BC).`),
        X('Appliquer', L6 + ' · G1 ex. 9', `Dis si F appartient au segment [AG], puis si A, F et G sont alignés :<br>a) AF = 10 cm ; AG = 19,6 cm ; FG = 9,6 cm.<br>b) AF = 5,7 cm ; AG = 21 cm ; FG = 18,6 cm.<br>c) AF = 17,2 cm ; AG = 11,5 cm ; FG = 28,7 cm.`,
          `a) 10 + 9,6 = 19,6 = AG : F ∈ [AG], points alignés.<br>b) 5,7 + 18,6 = 24,3 ≠ 21 et aucune autre somme ne marche : F ∉ [AG], points non alignés.<br>c) AF + FG ≠ AG mais AF + AG = 28,7 = FG : c'est A qui est sur [FG]. F ∉ [AG] mais les points sont alignés.`),
        X('Appliquer', L6 + ' · G1 ex. 10', `1. Construis A, B, C tels que AB = 7 cm, AC = 3 cm et BC = 4 cm. Où est C ?<br>2. Place D sur la droite (AC) tel que CD = 5 cm. Calcule BD (il y a deux positions possibles).`,
          `1. AC + CB = 3 + 4 = 7 = AB : C est sur le segment [AB].<br>2. Si D est du côté de A : D est à 2 cm de A, au-delà de A, et BD = 4 + 5 = <b>9 cm</b>. Si D est du côté de B : D est à 1 cm au-delà de B, et BD = 5 − 4 = <b>1 cm</b>. Dans les deux cas A, B, D sont alignés.`),
        X('Analyser', L6 + ' · G1 ex. 11', `Aliou va de son village A au village B puis de B à C, en ligne droite à chaque fois, avec des pas de 68 cm. Il fait 455 pas de A à B et 968 pas de B à C.<br>1. Calcule AB et BC en mètres.<br>2. Que peux-tu dire de la distance AC ? Dans quel cas AC = AB + BC ?`,
          `1. AB = 455 × 0,68 = 309,4 m ; BC = 968 × 0,68 = 658,24 m.<br>2. Inégalité triangulaire : AC ≤ 309,4 + 658,24 = 967,64 m. AC = 967,64 m seulement si B est sur le segment [AC].`),
        X('Évaluer', CEL, `Awa affirme : « Deux droites qui ne sont pas sécantes sont forcément confondues. » A-t-elle raison ? Justifie par une figure.`,
          `Non. Deux droites non sécantes peuvent être disjointes (aucun point commun), comme les deux bords d'une règle. Elles sont alors parallèles mais pas confondues.`),
        X('Créer', CEL, `Écris un programme de construction (4 ou 5 phrases) pour une figure contenant : une droite (d), deux points de (d), un point hors de (d), une demi-droite et un segment. Échange avec ton voisin : il doit réussir ta figure.`,
          `Exemple : « Trace une droite (d). Place A et B sur (d). Place C hors de (d). Trace la demi-droite [AC). Trace le segment [BC]. » Le professeur vérifie que la figure est réalisable sans ambiguïté.`)
      ]
    },
    '6e-RAN': {
      obj: ['Comparer deux décimaux', 'Ranger dans l\'ordre croissant ou décroissant', 'Encadrer un décimal à l\'unité, au dixième, au centième'],
      rap: ['On compare d\'abord les parties entières, puis les dixièmes, puis les centièmes…', 'Ordre croissant : du plus petit au plus grand.', 'b < a < c est un encadrement au dixième près si c − b = 0,1.'],
      ex: [
        X('Connaître', L6 + ' · L4 ex. 1', `Complète :<br>1. Si deux décimaux ont des parties entières différentes, le plus grand est celui qui a la … partie entière.<br>2. 3,4 < 3,412 < 3,5 est l'encadrement de 3,412 au … près.`,
          `1. plus grande · 2. dixième`),
        X('Comprendre', L6 + ' · L4 ex. 2 et 3', `1. Remplace … par <, > ou = : 5,321 … 3,987 ; 045,00 … 45 ; 87,521 … ${f('87 521', '1 000')} ; 14,5 … 14,001965.<br>2. Lesquelles sont vraies ? a) 3,4501 < 906,92 ; b) 45,273 > 44,984 ; c) 1,2754 < 0,88889 ; d) 200,07 > 200,008 ; e) 121,340 < 121,400.`,
          `1. > ; = ; = ; ><br>2. a, b, d et e sont vraies ; c est fausse.`),
        X('Appliquer', L6 + ' · L4 ex. 8 et 9', `1. Range dans l'ordre croissant : 15,07 ; 15,003 ; 14,057 ; 10,234 ; 8,256 ; 7 ; 15,16 ; 11,238.<br>2. Range dans l'ordre décroissant : 53,678 ; 53,68 ; 53,09 ; 53,7 ; 35,679 ; 53,76.`,
          `1. 7 < 8,256 < 10,234 < 11,238 < 14,057 < 15,003 < 15,07 < 15,16<br>2. 53,76 > 53,7 > 53,68 > 53,678 > 53,09 > 35,679`),
        X('Appliquer', L6 + ' · L4 ex. 7', `1. Encadre 23,578 par deux entiers consécutifs.<br>2. Encadre 75,35145 au dixième près, puis au centième près, puis au millième près.`,
          `1. 23 < 23,578 < 24<br>2. 75,3 < 75,35145 < 75,4 · 75,35 < 75,35145 < 75,36 · 75,351 < 75,35145 < 75,352`),
        X('Analyser', L6 + ' · L4 ex. 14', `Range dans l'ordre décroissant : 3 dm ; 29 cm ; 98 mm ; 0,04 dam ; 0,0006 km.`,
          `En cm : 30 ; 29 ; 9,8 ; 40 ; 60. Donc 0,0006 km > 0,04 dam > 3 dm > 29 cm > 98 mm.`),
        X('Évaluer', L6 + ' · L4 ex. 16', `Scores à un concours : Ousmane 16,78 ; Elisabeth 16,125 ; Seynabou 16,25 ; Issa 16,8 ; Laurent 16,09.<br>Elisabeth dit : « J'ai le meilleur score car 16,125 a le plus de chiffres. » Réponds-lui et donne le classement.`,
          `Elle a tort : le nombre de chiffres ne compte pas, on compare rang par rang. Classement : Issa (16,8) ; Ousmane (16,78) ; Seynabou (16,25) ; Elisabeth (16,125) ; Laurent (16,09).`),
        X('Créer', CEL, `Trouve trois nombres décimaux compris entre 4,5 et 4,6, puis range-les dans l'ordre croissant.`,
          `Exemple : 4,51 < 4,55 < 4,599. Il y en a une infinité.`)
      ]
    },

    /* ===================== 5e ===================== */
    '5e-PUI': {
      obj: ['Écrire un produit de facteurs égaux sous forme de puissance', 'Utiliser aᵐ × aⁿ = aᵐ⁺ⁿ, (aᵐ)ⁿ = aᵐˣⁿ, (ab)ᵐ = aᵐbᵐ', 'Calculer une expression avec des puissances'],
      rap: ['aⁿ = a × a × … × a (n facteurs) ; a¹ = a ; a⁰ = 1 si a ≠ 0.', 'aᵐ × aⁿ = aᵐ⁺ⁿ ; (aᵐ)ⁿ = aᵐˣⁿ ; (a × b)ᵐ = aᵐ × bᵐ.', 'Attention : 2 × 3² = 2 × 9 = 18, et non 6².'],
      ex: [
        X('Connaître', L5 + ' · L1 ex. 1', `Complète :<br>1. p³ se lit « p … 3 » ; c'est le produit de … facteurs égaux à … : p³ = p × … × …<br>2. aⁿ × aᵐ = …<br>3. (1,6)⁰ = …`,
          `1. puissance (ou « au cube ») ; 3 ; p ; p × p × p · 2. aⁿ⁺ᵐ · 3. 1`),
        X('Comprendre', L5 + ' · L1 ex. 2 et 4', `1. Choisis la bonne réponse : 3 × 3 × 3 × 3 = (A) 3 × 4 ; (B) 3 + 4 ; (C) 3⁴. — 4² = (A) 8 ; (B) 16 ; (C) 6.<br>2. a est un décimal. Associe : le carré du double de a ; le cube du triple de a ; le double du carré de a ; le triple du cube de a — avec : 2a² ; (3a)³ ; 3a³ ; (2a)².`,
          `1. C ; B.<br>2. Carré du double : (2a)² · cube du triple : (3a)³ · double du carré : 2a² · triple du cube : 3a³.`),
        X('Appliquer', L5 + ' · L1 ex. 7 et 8', `1. Écris sous la forme d'une seule puissance : A = (2²)³ × 2² × 2³ ; B = (0,5 × 6)² × 3 ; D = (2,5²)³ × 4³.<br>2. Trouve n : 1,5ⁿ × 1,5² = 1,5⁶ ; 1,5³ × 4³ = (1,5 × 4)ⁿ ; 2⁸ = (2²)ⁿ ; 7² × 7² × 7² = 7ⁿ.`,
          `1. A = 2⁶ × 2² × 2³ = 2¹¹ · B = 3² × 3 = 3³ · D = 2,5⁶ × 2⁶ = (2,5 × 2)⁶ = 5⁶<br>2. n = 4 ; n = 3 ; n = 4 ; n = 6.`),
        X('Appliquer', L5 + ' · L1 ex. 11', `X = a² × b + b⁴ + b² × a et Y = a³ + b³ + a² × b³.<br>Calcule X et Y pour a = 2 et b = 3.`,
          `X = 4 × 3 + 81 + 9 × 2 = 12 + 81 + 18 = <b>111</b><br>Y = 8 + 27 + 4 × 27 = 8 + 27 + 108 = <b>143</b>`),
        X('Analyser', L5 + ' · L1 ex. 9', `Ton camarade a écrit : a) 4² = 2⁴ ; b) 2⁵ = 32 ; c) (7 × 5)⁶ = 7⁶ × 5⁶ ; d) 2 × 7³ = (2 × 7)³ ; e) 2 × 3² = 6² ; f) (11⁷)⁵ = 11¹².<br>Repère les égalités fausses et corrige-les.`,
          `a, b et c sont justes (16 = 16).<br>d) Faux : 2 × 7³ = 686 et (2 × 7)³ = 14³ = 2 744.<br>e) Faux : 2 × 3² = 18 ≠ 36.<br>f) Faux : (11⁷)⁵ = 11³⁵.`),
        X('Évaluer', L5 + ' · L1 ex. 12', `Le jardin carré de Moussa a une aire de 1 764 m². Sachant que 1 764 = 49 × 36, son fils dit que le périmètre est 4 × 49 = 196 m. Est-ce juste ? Trouve le bon périmètre.`,
          `Non. 1 764 = 7² × 6² = (7 × 6)² = 42². Le côté mesure 42 m, le périmètre 4 × 42 = <b>168 m</b>.`),
        X('Analyser', L5 + ' · L1 ex. 14', `Un nénuphar double sa surface chaque jour ; il couvre 2 m² le 1er jour.<br>1. Quelle surface couvre-t-il les 2e, 3e et 4e jours ?<br>2. Il couvre la moitié du marigot le 8e jour. Quand couvrira-t-il tout le marigot ?<br>3. Écris l'aire du marigot sous forme de puissance de 2.`,
          `1. 4 m² ; 8 m² ; 16 m² (le n-ième jour : 2ⁿ m²).<br>2. Le 9e jour (il double encore une fois).<br>3. 2 × 2⁸ = 2⁹ = 512 m².`),
        X('Créer', CEL, `Écris le nombre 64 de trois façons différentes sous la forme aⁿ (avec n ≥ 2). Fais de même avec un nombre de ton choix.`,
          `64 = 2⁶ = 4³ = 8². Exemple : 81 = 3⁴ = 9².`)
      ]
    },
    '5e-SYM': {
      obj: ['Construire le symétrique d\'un point, d\'un segment, d\'une droite, d\'un cercle', 'Utiliser les propriétés de conservation de la symétrie centrale', 'Reconnaître un centre de symétrie'],
      rap: ['A\' est le symétrique de A par rapport à O si O est le milieu de [AA\'].', 'La symétrie centrale conserve les longueurs, les angles, les aires, l\'alignement et le parallélisme.', 'Le symétrique d\'une droite est une droite qui lui est parallèle.'],
      ex: [
        X('Connaître', L5 + ' · G1 ex. 4', `Complète :<br>1. Si E et F sont … par rapport à O, alors O est le milieu de …<br>2. Si K est le milieu de [RS], alors R et S sont … par rapport à …<br>3. Le symétrique d'un segment est un … de même …<br>4. La symétrie centrale … l'alignement.`,
          `1. symétriques ; [EF] · 2. symétriques ; K · 3. segment ; longueur · 4. conserve`),
        X('Comprendre', L5 + ' · G1 ex. 3', `Vrai ou faux ? Corrige les phrases fausses.<br>1. Le symétrique d'une droite est une droite qui lui est parallèle.<br>2. Le symétrique d'une demi-droite est une demi-droite de même sens.<br>3. Un triangle équilatéral admet un centre de symétrie.<br>4. La symétrie centrale conserve les aires.<br>5. Un cercle admet une infinité de centres de symétrie.`,
          `1. Vrai. 2. Faux : de sens opposé. 3. Faux (il a 3 axes de symétrie mais pas de centre). 4. Vrai. 5. Faux : un seul, son centre.`),
        X('Appliquer', CEL, `Dans un repère, place A(3 ; 2), B(−1 ; 4) et I(1 ; 1).<br>1. Donne les coordonnées des symétriques de A et de B par rapport à l'origine O.<br>2. Construis A', symétrique de A par rapport à I. Lis ses coordonnées.`,
          `1. A₁(−3 ; −2) ; B₁(1 ; −4) (on prend les opposés).<br>2. I milieu de [AA'] : A'(2 × 1 − 3 ; 2 × 1 − 2) = <b>(−1 ; 0)</b>.`),
        X('Appliquer', L5 + ' · G1 ex. 6', `Construis un rectangle ABCD de centre O avec AB = 5 cm et AD = 3 cm. Par la symétrie de centre C, construis le symétrique du segment [AB], de la droite (BD), du triangle CBD et du cercle de centre O passant par B. Laisse les traits de construction.`,
          `Pour chaque point M, on prolonge [MC] d'une longueur égale. Le symétrique de [AB] mesure 5 cm et lui est parallèle ; celui de (BD) est parallèle à (BD) ; C est son propre symétrique ; le cercle image a pour centre O' (symétrique de O, donc le point tel que C soit le milieu de [OO']) et le même rayon OB.`),
        X('Analyser', L5 + ' · G1 ex. 8', `ABCD est un rectangle avec AB = 4 cm et AD = 3 cm. E est tel que B, C, E sont alignés dans cet ordre avec CE = 3 cm ; F est tel que D, C, F sont alignés dans cet ordre avec CF = 4 cm.<br>1. Démontre que les triangles BCD et ECF sont symétriques par rapport à C.<br>2. Déduis-en que DB = FE et que (DB) // (FE).`,
          `1. CB = AD = 3 = CE et B, C, E alignés : C est le milieu de [BE], donc E est le symétrique de B. De même CD = AB = 4 = CF : F est le symétrique de D. C est son propre symétrique. Donc ECF est le symétrique de BCD.<br>2. La symétrie conserve les longueurs : DB = FE. L'image de la droite (DB) est la droite (FE), qui lui est parallèle.`),
        X('Analyser', L5 + ' · G1 ex. 10', `ABC est isocèle en A. D et E sont les symétriques de B et C par rapport à A. I est le milieu de [BC], J celui de [DE]. Démontre que J, A et I sont alignés.`,
          `La symétrie de centre A transforme [BC] en [DE] et conserve les milieux : J est le symétrique de I. Donc A est le milieu de [IJ] : les points J, A, I sont alignés.`),
        X('Évaluer', L5 + ' · G1 ex. 13', `Jeanne veut mesurer la largeur d'une rivière sans la traverser. A est un arbre sur l'autre rive, C un piquet sur sa rive avec (AC) perpendiculaire à la rivière. Elle plante O, puis B tel que O soit le milieu de [BC]. Elle marche sur la perpendiculaire à la rivière passant par B et s'arrête en J quand elle est alignée avec O et A.<br>Explique pourquoi BJ est égal à la largeur AC. Quelle propriété utilise-t-elle ?`,
          `Dans la symétrie de centre O, C a pour image B ; la droite (AC) a pour image la parallèle à (AC) passant par B, c'est-à-dire le chemin de Jeanne ; A est sur (AO), donc son image est sur (AO). L'image de A est donc J. Le symétrique de [AC] est [JB] et la symétrie conserve les longueurs : AC = BJ.`),
        X('Créer', CEL, `Dessine un motif (ou écris un mot en majuscules) qui admet un centre de symétrie. Marque ce centre en rouge et explique comment tu l'as vérifié.`,
          `Exemples : lettres N, S, Z, H, O, X ; le mot « SOS » ; un carré, un parallélogramme. Vérification : chaque point a son symétrique sur la figure.`)
      ]
    },
    '5e-MUL': {
      obj: ['Utiliser les critères de divisibilité', 'Reconnaître un nombre premier, décomposer en facteurs premiers', 'Calculer un PGCD et un PPCM et les utiliser dans un problème'],
      rap: ['a = b × q + r avec 0 ≤ r < b (division euclidienne).', 'Un nombre premier a exactement deux diviseurs : 1 et lui-même.', 'PGCD : facteurs communs avec le plus petit exposant. PPCM : tous les facteurs avec le plus grand exposant.'],
      ex: [
        X('Connaître', L5 + ' · L2 ex. 1', `Complète : si p = q × t, alors p est un … de q et de t ; q et t sont des … de p. 1 est … de tout entier ; 0 est … de tout entier.<br>Donne les cinq premiers nombres premiers.`,
          `multiple ; diviseurs ; diviseur ; multiple. 2 ; 3 ; 5 ; 7 ; 11.`),
        X('Comprendre', L5 + ' · L2 ex. 2', `U est le chiffre des unités du nombre 137U. Par quels chiffres peut-on remplacer U pour que ce nombre soit divisible : a) par 2 ? b) par 5 ? c) par 3 ?`,
          `a) 0, 2, 4, 6, 8 · b) 0 ou 5 · c) 1 + 3 + 7 + U = 11 + U doit être un multiple de 3 : U = 1, 4 ou 7.`),
        X('Comprendre', L5 + ' · L2 ex. 4', `Quelles égalités traduisent une division euclidienne ? Précise le diviseur.<br>280 = 13 × 18 + 46 ; 250 = 13 × 18 + 16 ; 240 = 13 × 18 + 6 ; 54 = 27 × 2 + 0.`,
          `280 = 13 × 18 + 46 : non (46 est plus grand que 13 et que 18). 250 = 13 × 18 + 16 : oui pour la division par 18 (16 < 18), non par 13. 240 = 13 × 18 + 6 : oui (par 13 et par 18). 54 = 27 × 2 + 0 : oui.`),
        X('Appliquer', L5 + ' · L2 ex. 9 et 10', `1. Ces nombres sont-ils premiers ? 91 ; 201 ; 203 ; 131 ; 301 ; 109.<br>2. Décompose en facteurs premiers : 42 ; 50 ; 60 ; 63 ; 76 ; 84.`,
          `1. 91 = 7 × 13 ; 201 = 3 × 67 ; 203 = 7 × 29 ; 301 = 7 × 43 : non premiers. 131 et 109 sont premiers.<br>2. 42 = 2 × 3 × 7 ; 50 = 2 × 5² ; 60 = 2² × 3 × 5 ; 63 = 3² × 7 ; 76 = 2² × 19 ; 84 = 2² × 3 × 7.`),
        X('Appliquer', L5 + ' · L2 ex. 11', `Détermine le PGCD et le PPCM de 100 et 180.`,
          `100 = 2² × 5² ; 180 = 2² × 3² × 5. PGCD = 2² × 5 = <b>20</b> ; PPCM = 2² × 3² × 5² = <b>900</b>.`),
        X('Analyser', L5 + ' · L2 ex. 12', `Émilie a 48 roses et 56 tulipes. Elle veut faire des bouquets identiques en utilisant toutes ses fleurs.<br>1. Donne toutes les possibilités.<br>2. Elle veut le plus grand nombre de bouquets. Combien en fera-t-elle et quelle sera leur composition ?`,
          `1. Le nombre de bouquets divise 48 et 56 : 1, 2, 4 ou 8.<br>2. PGCD(48 ; 56) = 8 : 8 bouquets de 6 roses et 7 tulipes.`),
        X('Évaluer', L5 + ' · L2 ex. 16', `Viviane doit carreler une pièce carrée de 5 m de côté avec des carreaux entiers d'un seul modèle : 30 × 25 cm, 15 × 15 cm ou 25 × 20 cm. Quel modèle doit-elle choisir ? Justifie.`,
          `500 cm doit être un multiple des deux dimensions. 500 n'est pas multiple de 30 ni de 15. 500 = 25 × 20 = 20 × 25 : seul le <b>modèle 3 (25 × 20)</b> convient (20 carreaux sur un côté, 25 sur l'autre, 500 carreaux).`),
        X('Évaluer', L5 + ' · L2 ex. 15', `Ibrahima et Maïmouna ont assez de plants pour faire soit des rangées de 6, soit des rangées de 7, soit des rangées de 14, sans qu'il en reste. Quel est le nombre minimal de plants ?`,
          `C'est le PPCM(6 ; 7 ; 14) = 2 × 3 × 7 = <b>42</b> plants.`),
        X('Créer', CEL, `Trouve un nombre de trois chiffres divisible à la fois par 2, 3, 5 et 9. Explique ta démarche, puis trouve-les tous.`,
          `Il doit être multiple de PPCM(2 ; 3 ; 5 ; 9) = 90 : 180, 270, 360, 450, 540, 630, 720, 810, 900, 990.`)
      ]
    },
    '5e-ANG': {
      obj: ['Reconnaître les angles opposés par le sommet, alternes-internes, alternes-externes, correspondants', 'Calculer des mesures d\'angles', 'Démontrer que deux droites sont parallèles avec les angles'],
      rap: ['Deux angles opposés par le sommet ont la même mesure.', 'Deux droites parallèles coupées par une sécante forment des angles alternes-internes (ou correspondants) de même mesure.', 'Réciproque : si deux angles alternes-internes ont la même mesure, les droites sont parallèles.'],
      ex: [
        X('Connaître', L5 + ' · G2 ex. 4', `1. Une sécante coupe deux droites : cite tous les types de paires d'angles que l'on peut voir.<br>2. Si les deux droites ne sont pas parallèles, quels angles ont toujours la même mesure ?<br>3. Et si elles sont parallèles ?`,
          `1. Opposés par le sommet, alternes-internes, alternes-externes, correspondants.<br>2. Seulement les angles opposés par le sommet.<br>3. Les quatre types : opposés par le sommet, alternes-internes, alternes-externes et correspondants.`),
        X('Comprendre', L5 + ' · G2 ex. 1', `Vrai ou faux ?<br>1. Deux droites sécantes déterminent deux paires d'angles opposés par le sommet.<br>2. Deux angles alternes-internes ont toujours la même mesure.<br>3. Deux droites coupées par une sécante qui forment des angles alternes-externes de même mesure sont parallèles.<br>4. Deux droites coupées par une sécante qui forment des angles correspondants sont parallèles.`,
          `1. Vrai. 2. Faux (seulement si les droites sont parallèles). 3. Vrai. 4. Faux : il faut que les angles correspondants aient la même mesure.`),
        X('Appliquer', CEL, `Deux droites parallèles (d) et (d') sont coupées par une sécante (s) en A et B. Un des angles de sommet A mesure 65°.<br>Fais une figure et donne la mesure des huit angles formés. Justifie deux réponses.`,
          `En A : 65°, 115°, 65°, 115° (opposés par le sommet, et angles adjacents supplémentaires). En B : les mêmes mesures, car les angles correspondants (ou alternes-internes) sont égaux puisque (d) // (d').`),
        X('Appliquer', L5 + ' · G2 ex. 8', `1. Trace un angle xOy de 120° et sa bissectrice [Oz).<br>2. Place A sur [Oz) et B sur [Oy) tels que OA = OB.<br>3. Calcule les angles du triangle OAB.<br>4. Justifie que (AB) // (Ox).`,
          `3. AOB = 120 ÷ 2 = 60°. OAB est isocèle en O, donc OAB = OBA = (180 − 60) ÷ 2 = 60° : le triangle est équilatéral.<br>4. Les angles xOA (60°) et OAB (60°) sont alternes-internes, formés par (Ox), (AB) et la sécante (OA), et ont la même mesure : (AB) // (Ox).`),
        X('Analyser', L5 + ' · G2 ex. 10', `ABC est isocèle en A avec BAC = 100°. D est tel que l'angle CBD mesure 40°, D et A étant de part et d'autre de (BC). Démontre que (BD) // (AC).`,
          `ACB = (180 − 100) ÷ 2 = 40°. Les angles CBD et BCA sont alternes-internes (sécante (BC)) et mesurent tous deux 40° : (BD) // (AC).`),
        X('Évaluer', L5 + ' · G2 ex. 15', `Un topographe dessine une rue délimitée par (AB) et (CD). ABC est isocèle en A avec ABC = 65°. Il affirme : « Si je place D tel que ACD = 50°, D et B étant de part et d'autre de (AC), alors (AB) // (CD). » Justifie son affirmation.`,
          `BAC = 180 − 2 × 65 = 50°. Les angles BAC et ACD sont alternes-internes (sécante (AC)) et mesurent 50° : (AB) // (CD). Le topographe a raison.`),
        X('Évaluer', CEL, `Moussa dit : « Deux angles correspondants ont toujours la même mesure. » Trouve un contre-exemple et corrige sa phrase.`,
          `Contre-exemple : deux droites non parallèles coupées par une sécante (les angles correspondants sont différents). Phrase correcte : « Si deux droites sont parallèles, les angles correspondants qu'elles forment avec une sécante ont la même mesure. »`),
        X('Créer', CEL, `Construis deux droites (d₁), (d₂) et une sécante de sorte que deux angles alternes-internes mesurent 70° et 75°. Que peux-tu dire de (d₁) et (d₂) ? Où se coupent-elles ?`,
          `Les angles alternes-internes n'ont pas la même mesure : les droites ne sont pas parallèles. Elles se coupent du côté où la somme des angles intérieurs est inférieure à 180°.`)
      ]
    },

    /* ===================== 4e ===================== */
    '4e-RAT': {
      obj: ['Reconnaître un nombre rationnel', 'Calculer dans ℚ (somme, produit, quotient, puissance)', 'Comparer deux rationnels, écrire en notation scientifique'],
      rap: ['ℕ ⊂ ℤ ⊂ 𝔻 ⊂ ℚ ; π n\'est pas rationnel.', `${f('a', 'b')} + ${f('c', 'd')} = ${f('ad + bc', 'bd')} ; ${f('a', 'b')} × ${f('c', 'd')} = ${f('ac', 'bd')} ; diviser, c'est multiplier par l'inverse.`, 'Écriture scientifique : a × 10ᵖ avec 1 ≤ a < 10.'],
      ex: [
        X('Connaître', SN4 + ' · ch. 1', `1. Donne la définition d'un nombre rationnel.<br>2. Complète par ⊂ : ℕ … ℤ … 𝔻 … ℚ.<br>3. Quel est l'inverse de ${f(13, 9)} ? de −6 ? Quel est l'opposé de ${f('−2', 3)} ? Pourquoi 0 n'a-t-il pas d'inverse ?`,
          `1. Un nombre qui s'écrit ${f('a', 'b')} avec a et b entiers relatifs, b ≠ 0.<br>2. ℕ ⊂ ℤ ⊂ 𝔻 ⊂ ℚ.<br>3. ${f(9, 13)} ; ${f('−1', 6)} ; ${f(2, 3)}. Aucun nombre multiplié par 0 ne donne 1.`),
        X('Comprendre', SN4 + ' · activité 1', `Parmi ${f(3, 4)} ; ${f('−1', 2)} ; ${f('−1', 9)} ; ${f(13, 7)} ; ${f(19, 3)} ; ${f(27, 4)}, lesquels sont des décimaux relatifs ? Tous sont-ils rationnels ?`,
          `Décimaux : ${f(3, 4)} = 0,75 ; ${f('−1', 2)} = −0,5 ; ${f(27, 4)} = 6,75. Les autres ont une écriture décimale illimitée. Tous sont rationnels.`),
        X('Appliquer', SN4 + ' · ch. 1', `Rends irréductibles : A = ${f(492, 504)} ; B = ${f('−777', 888)}.`,
          `492 = 2² × 3 × 41 et 504 = 2³ × 3² × 7 : PGCD = 12, A = ${f(41, 42)}. B = −${f('7 × 111', '8 × 111')} = ${f('−7', 8)}.`),
        X('Appliquer', SN4 + ' · ch. 1', `Calcule et donne le résultat sous forme irréductible :<br>A = ${f(1, 2)} + ${f(1, 4)} − ${f(1, 8)} ; B = ${f(2, 5)} − ${f(3, 35)} + ${f(4, 7)} ; C = ${f(7, 2)} × ${f(11, '−5')} ; D = ${f(8, 5)} ÷ 13 ; E = (${f(2, 3)})⁴.`,
          `A = ${f(5, 8)} · B = ${f('14 − 3 + 20', 35)} = ${f(31, 35)} · C = ${f('−77', 10)} · D = ${f(8, 65)} · E = ${f(16, 81)}`),
        X('Appliquer', SN4 + ' · ch. 1', `Donne l'écriture scientifique : 2 136 ; 0,00045 ; 456 ; −596,9.`,
          `2,136 × 10³ ; 4,5 × 10⁻⁴ ; 4,56 × 10² ; −5,969 × 10².`),
        X('Analyser', SN4 + ' · ch. 1', `Compare, en étudiant le signe de la différence : a) ${f(7, 6)} et ${f(12, 11)} ; b) ${f('−4', 9)} et ${f('−1', 6)}. Puis calcule |${f(2, 3)} − ${f(3, 4)}|.`,
          `a) ${f(7, 6)} − ${f(12, 11)} = ${f('77 − 72', 66)} = ${f(5, 66)} > 0 : ${f(7, 6)} > ${f(12, 11)}.<br>b) ${f('−4', 9)} + ${f(1, 6)} = ${f('−8 + 3', 18)} = ${f('−5', 18)} < 0 : ${f('−4', 9)} < ${f('−1', 6)}.<br>|${f(8, 12)} − ${f(9, 12)}| = |${f('−1', 12)}| = ${f(1, 12)}.`),
        X('Évaluer', SN4 + ' · ch. 3', `Dans une classe de 4e, ${f(1, 4)} des élèves écrivent, ${f(1, 4)} dessinent, ${f(1, 6)} calculent, ${f(1, 10)} bavardent et les 7 autres sont absents. Un élève dit : « On ne peut pas savoir combien nous sommes. » A-t-il raison ? Calcule l'effectif.`,
          `Non. ${f(1, 4)} + ${f(1, 4)} + ${f(1, 6)} + ${f(1, 10)} = ${f('15 + 15 + 10 + 6', 60)} = ${f(23, 30)}. Les absents représentent ${f(7, 30)} de la classe, soit 7 élèves : la classe compte <b>30 élèves</b>.`),
        X('Créer', CEL, `Trouve trois rationnels compris entre ${f(1, 3)} et ${f(1, 2)}. Explique ta méthode pour en trouver autant que tu veux.`,
          `${f(1, 3)} = ${f(4, 12)} et ${f(1, 2)} = ${f(6, 12)} : ${f(5, 12)} convient. Avec des dénominateurs plus grands (${f(8, 24)} et ${f(12, 24)}) : ${f(9, 24)}, ${f(10, 24)}, ${f(11, 24)}… On peut aussi prendre la moyenne de deux nombres.`)
      ]
    },
    '4e-DIS': {
      obj: ['Connaître les positions relatives de deux cercles et d\'une droite et d\'un cercle', 'Utiliser le critère d\'existence d\'un triangle', 'Utiliser la médiatrice et la bissectrice (distances)'],
      rap: ['Cercles (O ; r) et (O\' ; r\') : tangents extérieurement si OO\' = r + r\', sécants si |r − r\'| < OO\' < r + r\'.', 'Un triangle de côtés a, b, c existe si chaque côté est inférieur à la somme des deux autres.', 'Droite et cercle : d = distance du centre à la droite ; d < r sécants, d = r tangents, d > r disjoints.'],
      ex: [
        X('Connaître', SN4 + ' · G1', `Recopie et complète pour deux cercles (O ; r) et (O' ; r') avec r > r' :<br>OO' = r + r' → … ; OO' = r − r' → … ; OO' > r + r' → … ; r − r' < OO' < r + r' → …`,
          `Tangents extérieurement ; tangents intérieurement ; disjoints extérieurement ; sécants.`),
        X('Comprendre', CEL, `Deux cercles ont pour rayons 4 cm et 3 cm. Donne leur position quand la distance des centres vaut : a) 7 cm ; b) 1 cm ; c) 5 cm ; d) 9 cm ; e) 0,5 cm.`,
          `r + r' = 7 et r − r' = 1. a) tangents extérieurement ; b) tangents intérieurement ; c) sécants ; d) disjoints extérieurement ; e) disjoints intérieurement.`),
        X('Appliquer', SN4 + ' · G1', `Peut-on construire le triangle ABC ? a) AB = 4 ; BC = 5 ; AC = 8. b) AB = BC = AC = 10. c) AB = 6 ; BC = 3 ; AC = 2 (en cm).`,
          `a) 4 + 5 = 9 > 8 : oui. b) oui (triangle équilatéral). c) 3 + 2 = 5 < 6 : non.`),
        X('Appliquer', CEL, `Un cercle a pour centre O et pour rayon 3 cm. H est le pied de la perpendiculaire à une droite (Δ) passant par O. Donne la position de (Δ) et du cercle si : OH = 2 cm ; OH = 3 cm ; OH = 4,5 cm.`,
          `OH = 2 < 3 : sécants (2 points communs). OH = 3 : tangents (1 point). OH = 4,5 > 3 : disjoints.`),
        X('Analyser', SN4 + ' · G1 ex. d\'application', `Soit un cercle (C) de centre O et de rayon 3 cm, A un point de (C).<br>1. Montre que la droite (D) passant par A et perpendiculaire à (OA) est tangente à (C).<br>2. [BM] est un diamètre de (C), avec B et M distincts de A. Montre que ABM est rectangle.<br>3. K est un point de (D) distinct de A. Quelle est la nature du triangle KAO ?`,
          `1. La distance de O à (D) est OA = 3 cm = rayon : (D) est tangente en A.<br>2. A est sur le cercle de diamètre [BM] : ABM est rectangle en A.<br>3. (D) ⊥ (OA) en A : KAO est rectangle en A.`),
        X('Analyser', SN4 + ' · G1', `xOy est un angle de bissectrice [Oz). M est un point de [Oz), A et B sont les pieds des perpendiculaires à (Ox) et (Oy) passant par M. Compare MA et MB. Que représente (OM) pour le segment [AB] ?`,
          `M est sur la bissectrice, donc il est équidistant des côtés : MA = MB. Par symétrie d'axe (OM), OA = OB aussi : O et M sont équidistants de A et B, donc (OM) est la médiatrice de [AB].`),
        X('Évaluer', CEL, `Fatou dit : « Avec trois bâtons de 12 cm, 5 cm et 6 cm, je peux faire un triangle. » Binta répond : « Il suffit que 12 < 5 + 6 + 12. » Qui a raison ? Explique.`,
          `Aucune des deux. Le plus grand côté doit être inférieur à la somme des deux autres : 5 + 6 = 11 < 12, donc c'est impossible. L'inégalité de Binta est toujours vraie et ne prouve rien.`),
        X('Créer', CEL, `Deux villages A et B sont distants de 6 km. On veut construire un forage plus proche de A que de B et à moins de 4 km de A. Colorie la zone possible et explique ta construction.`,
          `On trace la médiatrice de [AB] : la zone plus proche de A est le demi-plan contenant A. On trace le cercle de centre A et de rayon 4 km. Zone : intérieur du disque, du côté de A par rapport à la médiatrice.`)
      ]
    },
    '4e-CAL': {
      obj: ['Réduire et ordonner une expression littérale', 'Développer avec la distributivité et les égalités remarquables', 'Factoriser (facteur commun, égalités remarquables), calculer une valeur numérique'],
      rap: ['(a + b)² = a² + 2ab + b² ; (a − b)² = a² − 2ab + b² ; (a − b)(a + b) = a² − b².', 'k(a + b) = ka + kb ; (a + b)(c + d) = ac + ad + bc + bd.', 'Une parenthèse précédée de « − » : on change tous les signes à l\'intérieur.'],
      ex: [
        X('Connaître', SN4 + ' · ch. 2', `Complète les égalités remarquables : (a + b)² = … ; (a − b)² = … ; (a − b)(a + b) = …`,
          `a² + 2ab + b² ; a² − 2ab + b² ; a² − b²`),
        X('Comprendre', SN4 + ' · ch. 2', `Réduis et ordonne : A = 3x² − 2x + 5 − x² − 4x − 9 ; B = a² + b − 3a − 2a² + 5b + b².`,
          `A = 2x² − 6x − 4 · B = −a² + b² − 3a + 6b`),
        X('Appliquer', SN4 + ' · ch. 2', `Développe et réduis : B = 5(2x + 3) ; C = (x + 2)(2x + 4) ; D = (x + 5)(x − 3) ; E = (3x − 2)(4x − 1).`,
          `B = 10x + 15 · C = 2x² + 8x + 8 · D = x² + 2x − 15 · E = 12x² − 11x + 2`),
        X('Appliquer', SN4 + ' · ch. 2', `Développe : A = (x + 3)² ; B = (4 − 3x)² ; C = (2x − 3)(2x + 3) ; D = (2x − 3)² + (x + 5)(3 − x).`,
          `A = x² + 6x + 9 · B = 9x² − 24x + 16 · C = 4x² − 9 · D = 4x² − 12x + 9 + (3x − x² + 15 − 5x) = <b>3x² − 14x + 24</b>`),
        X('Appliquer', SN4 + ' · ch. 2', `Factorise : E = (x + 5)(2x − 7) − 4(x + 5) ; G = (2x + 4)(x − 1) + (3x + 6) ; H = x² + 10x + 25 ; I = 4x² − 12x + 9 ; J = 16x² − 81.`,
          `E = (x + 5)(2x − 11) · G = 2(x + 2)(x − 1) + 3(x + 2) = (x + 2)(2x + 1) · H = (x + 5)² · I = (2x − 3)² · J = (4x − 9)(4x + 9)`),
        X('Analyser', SN4 + ' · ch. 2', `Factorise K = (9x² − 25) − (6x + 10). Indique le facteur commun « caché » et comment tu l'as trouvé.`,
          `9x² − 25 = (3x − 5)(3x + 5) et 6x + 10 = 2(3x + 5). Facteur commun : (3x + 5). K = (3x + 5)(3x − 5 − 2) = <b>(3x + 5)(3x − 7)</b>.`),
        X('Analyser', SN4 + ' · ch. 2', `Calcul mental avec les égalités remarquables : 31² ; 29² ; 41 × 39 ; 99² ; 101 × 99.`,
          `31² = 900 + 60 + 1 = 961 · 29² = 900 − 60 + 1 = 841 · 41 × 39 = 1 600 − 1 = 1 599 · 99² = 10 000 − 200 + 1 = 9 801 · 101 × 99 = 10 000 − 1 = 9 999`),
        X('Évaluer', SN4 + ' · ch. 2', `Q = 4x² − 12x + 9. Calcule Q pour x = −1 avec la forme développée, puis avec la forme factorisée. Quelle forme est la plus rapide ici ? Et pour x = ${f(3, 2)} ?`,
          `Développée : 4 + 12 + 9 = 25. Factorisée : (2 × (−1) − 3)² = (−5)² = 25. Pour x = ${f(3, 2)}, la forme factorisée donne immédiatement (3 − 3)² = 0 : elle est plus rapide.`),
        X('Évaluer', CEL, `Un élève écrit : (a + b)² = a² + b². Prouve-lui qu'il a tort avec un exemple, puis explique d'où vient le terme qui manque (aire d'un carré de côté a + b).`,
          `Avec a = 3 et b = 4 : (3 + 4)² = 49 alors que 9 + 16 = 25. Le carré de côté a + b se découpe en un carré a², un carré b² et deux rectangles a × b : il manque 2ab.`),
        X('Créer', CEL, `Invente une expression dont la forme factorisée est (x + 1)(x − 4). Donne sa forme développée, puis invente une expression de la forme a² − b² et factorise-la.`,
          `(x + 1)(x − 4) = x² − 3x − 4. Exemple : 25x² − 49 = (5x − 7)(5x + 7).`)
      ]
    },

    /* ===================== 3e ===================== */
    '3e-RAC': {
      obj: ['Calculer avec les racines carrées', 'Simplifier, rendre rationnel un dénominateur, comparer', 'Utiliser les racines carrées dans des problèmes (BFEM)'],
      rap: [`${r('a')} × ${r('b')} = ${r('ab')} ; ${r('a²b')} = a${r('b')} (a ≥ 0) ; ${r('a²')} = |a|.`, `Expressions conjuguées : (a + ${r('b')})(a − ${r('b')}) = a² − b.`, `Pour comparer deux nombres positifs, on compare leurs carrés.`],
      ex: [
        X('Connaître', L3 + ' · L1 ex. 1', `Complète : la racine carrée d'un réel a ≥ 0 est le nombre … dont le … est égal à a. Pour a, b ≥ 0 : ${r('a')} × ${r('b')} = … ; (${r('a')})² = … ; ${r('a/b')} = … (b ≠ 0) ; ${r('a²b')} = … ${r('b')}.`,
          `positif ; carré · ${r('ab')} · a · ${f(r('a'), r('b'))} · a`),
        X('Comprendre', L3 + ' · L1 ex. 2 et 3', `1. On donne ${r('(−5)²')} ; ${r('−5²')} ; −(${r(5)})² ; (−${r(5)})². Laquelle n'a pas de sens ? Lesquelles sont égales ? opposées ?<br>2. Vrai ou faux : ${r(90)} = 3${r(10)} ; ${r(14)} = 7 ; ${r(49)} − ${r(16)} = 3 ; ${r('(−7)²')} = −7.`,
          `1. ${r('−5²')} = ${r('−25')} n'a pas de sens. ${r('(−5)²')} = 5 et (−${r(5)})² = 5 sont égales ; −(${r(5)})² = −5 leur est opposée.<br>2. Vrai ; Faux ; Vrai (7 − 4) ; Faux (= 7).`),
        X('Appliquer', L3 + ' · L1 ex. 8', `Écris sous la forme a${r('b')} avec b le plus petit possible : A = ${r(32)} ; B = ${r(720)} ; C = ${r(8)} + ${r(50)} − ${r(18)} ; D = 3${r(27)} × 2${r(15)}.`,
          `A = 4${r(2)} · B = ${r('144 × 5')} = 12${r(5)} · C = 2${r(2)} + 5${r(2)} − 3${r(2)} = 4${r(2)} · D = 6${r('405')} = 6 × 9${r(5)} = 54${r(5)}`),
        X('Appliquer', L3 + ' · L1 ex. 5 et 7', `1. Développe : (5 + ${r(3)})² ; (1 − 2${r(7)})² ; (6 + ${r(5)})(6 − ${r(5)}).<br>2. Rends rationnel le dénominateur : ${f(2, r(5))} ; ${f(r(5) + ' + ' + r(3), r(5) + ' − ' + r(3))}.`,
          `1. 28 + 10${r(3)} · 29 − 4${r(7)} · 31<br>2. ${f('2' + r(5), 5)} · ${f('(' + r(5) + ' + ' + r(3) + ')²', '5 − 3')} = ${f('8 + 2' + r(15), 2)} = 4 + ${r(15)}`),
        X('Analyser', L3 + ' · L1 ex. 9', `Sans calculatrice, compare : a) ${r(17)} et 3${r(2)} ; b) 11 et 4${r(6)}.`,
          `a) (3${r(2)})² = 18 > 17 : ${r(17)} < 3${r(2)}.<br>b) 11² = 121 et (4${r(6)})² = 96 : 11 > 4${r(6)}.`),
        X('Analyser', L3 + ' · L1 ex. 11 · BFEM 2011', `m = 1 − 2${r(3)} ; p = ${r('13 − 4√3')} ; q = ${r('13 + 4√3')}.<br>1. Montre que m < 0. 2. Calcule m², déduis-en que p et m sont opposés. 3. Encadre m à 10⁻² près (1,732 < ${r(3)} < 1,733). 4. Montre que p × q = 11.`,
          `1. 2${r(3)} = ${r(12)} > 1 donc m < 0.<br>2. m² = 1 − 4${r(3)} + 12 = 13 − 4${r(3)} ; p = ${r('m²')} = |m| = −m.<br>3. 3,464 < 2${r(3)} < 3,466 donc −2,466 < m < −2,464.<br>4. p × q = ${r('(13 − 4√3)(13 + 4√3)')} = ${r('169 − 48')} = ${r(121)} = 11.`),
        X('Évaluer', L3 + ' · L1 ex. 13 · BFEM 2017', `a = 7 − 5${r(2)} ; b = −7 − 5${r(2)} ; c = −7 + 5${r(2)}.<br>1. Démontre que a est l'inverse de b. 2. Justifie que a et c sont opposés. 3. Calcule a², puis donne une écriture simplifiée de ${r('99 − 70√2')}.`,
          `1. a × b = −(7 − 5${r(2)})(7 + 5${r(2)}) = −(49 − 50) = 1.<br>2. c = −(7 − 5${r(2)}) = −a.<br>3. a² = 49 − 70${r(2)} + 50 = 99 − 70${r(2)}. Comme 5${r(2)} = ${r(50)} > 7, a < 0 : ${r('99 − 70√2')} = |a| = <b>5${r(2)} − 7</b>.`),
        X('Créer', L3 + ' · L1 ex. 20', `Un champ rectangulaire a pour dimensions (2${r(3)} + 2) hm et (2${r(3)} − 2) hm.<br>1. Calcule son périmètre, son aire et le diamètre du cercle circonscrit.<br>2. Invente toi-même des dimensions avec des racines carrées pour que l'aire soit un nombre entier.`,
          `1. P = 2 × 4${r(3)} = 8${r(3)} hm ; A = 12 − 4 = 8 hm² ; diagonale² = (2${r(3)} + 2)² + (2${r(3)} − 2)² = 2 × (12 + 4) = 32, d = 4${r(2)} hm.<br>2. Il suffit de prendre des dimensions conjuguées, par exemple (3 + ${r(5)}) et (3 − ${r(5)}) : aire = 9 − 5 = 4.`)
      ]
    },
    '3e-THA': {
      obj: ['Utiliser le théorème de Thalès pour calculer des longueurs', 'Utiliser la réciproque pour démontrer un parallélisme', 'Placer un point qui partage un segment dans un rapport donné'],
      rap: [`Si M ∈ (AB), N ∈ (AC) et (MN) // (BC), alors ${f('AM', 'AB')} = ${f('AN', 'AC')} = ${f('MN', 'BC')}.`, `Réciproque : si ${f('AM', 'AB')} = ${f('AN', 'AC')} et si les points sont dans le même ordre, alors (MN) // (BC).`, 'Si les rapports sont différents, les droites ne sont pas parallèles.'],
      ex: [
        X('Connaître', CEL, `Énonce le théorème de Thalès dans le triangle ABC avec M ∈ [AB] et N ∈ [AC], puis sa réciproque. Fais une figure codée.`,
          `Si (MN) // (BC), alors ${f('AM', 'AB')} = ${f('AN', 'AC')} = ${f('MN', 'BC')}. Réciproque : si ${f('AM', 'AB')} = ${f('AN', 'AC')} (points dans le même ordre), alors (MN) // (BC).`),
        X('Comprendre', L3 + ' · G1 ex. 4', `(BC) // (DE), avec D ∈ (AB) et E ∈ (AC). Quelles égalités sont justes ? a) ${f('AD', 'AB')} = ${f('BC', 'DE')} ; b) ${f('AD', 'AB')} = ${f('AE', 'AC')} ; c) ${f('AB', 'AD')} = ${f('AC', 'AE')} = ${f('BC', 'DE')} ; d) ${f('AD', 'AE')} = ${f('AB', 'AC')}.`,
          `b, c et d sont justes (d découle de b). a est fausse : il faudrait ${f('DE', 'BC')}.`),
        X('Appliquer', CEL, `ABC est un triangle avec AB = 5 cm, AC = 7 cm, BC = 6 cm. E ∈ [AB] avec AE = 2 cm. La parallèle à (BC) passant par E coupe [AC] en F. Calcule AF et EF.`,
          `Thalès : ${f(2, 5)} = ${f('AF', 7)} = ${f('EF', 6)}. AF = ${f(14, 5)} = 2,8 cm ; EF = ${f(12, 5)} = 2,4 cm.`),
        X('Appliquer', L3 + ' · G1 ex. 6', `EFG est un triangle avec EF = 5,4 ; EG = 9 ; FG = 7,2. I est sur (EG), hors de [EG], avec GI = 3. La parallèle à (EF) passant par I coupe (FG) en J. Fais la figure et calcule FJ et IJ.`,
          `I est au-delà de G (sinon GI > 9). Triangles GEF et GIJ, (IJ) // (EF) : ${f('GI', 'GE')} = ${f('GJ', 'GF')} = ${f('IJ', 'EF')}, soit ${f(3, 9)} = ${f('GJ', '7,2')} = ${f('IJ', '5,4')}. GJ = 2,4 ; IJ = 1,8. J est au-delà de G : FJ = 7,2 + 2,4 = <b>9,6</b>.`),
        X('Analyser', L3 + ' · G1 ex. 7', `(BM) et (PC) sont sécantes en A, M ∈ [AB], P ∈ [AC]. AB = 7 cm ; AM = 4 cm ; AP = 6 cm ; AC = 8 cm. Les droites (BC) et (PM) sont-elles parallèles ?`,
          `${f('AM', 'AB')} = ${f(4, 7)} ≈ 0,57 et ${f('AP', 'AC')} = ${f(6, 8)} = 0,75. Les rapports sont différents : d'après la contraposée du théorème de Thalès, (BC) et (PM) ne sont pas parallèles.`),
        X('Analyser', CEL, `ABC est un triangle avec AB = 6 cm, AC = 8 cm, BC = 10 cm. M ∈ [AB] avec AM = 4,5 cm et N ∈ [AC] avec AN = 6 cm. Démontre que (MN) // (BC) et calcule MN.`,
          `${f('AM', 'AB')} = ${f('4,5', 6)} = 0,75 et ${f('AN', 'AC')} = ${f(6, 8)} = 0,75, points dans le même ordre : (MN) // (BC) (réciproque). MN = 0,75 × 10 = 7,5 cm.`),
        X('Évaluer', CEL, `Pour mesurer la hauteur d'un rônier, Modou plante un bâton vertical de 1,5 m : son ombre mesure 2 m. Au même moment, l'ombre du rônier mesure 12 m. Modou annonce 8 m de hauteur. Vérifie son calcul.`,
          `Les rayons du soleil sont parallèles : Thalès donne ${f('h', '1,5')} = ${f(12, 2)} = 6, donc h = 9 m. Modou s'est trompé (il a probablement fait 12 − 2 − 2 ou mal placé les rapports).`),
        X('Créer', L3 + ' · G1 ex. 9', `Sur un segment [AB] de 7 cm (longueur non multiple de 3), construis, sans mesurer de fraction, le point M de [AB] tel que AM = ${f(2, 3)} AB. Rédige ta méthode, puis invente une construction pour AM = ${f(3, 5)} AB.`,
          `Trace une demi-droite [Ax) ; reporte 3 longueurs égales A1, 12, 23. Joins 3 à B ; la parallèle à (3B) passant par 2 coupe [AB] en M : ${f('AM', 'AB')} = ${f(2, 3)} (Thalès). Même méthode avec 5 graduations et la parallèle passant par la 3e.`)
      ]
    },
    '3e-EQI': {
      obj: ['Résoudre des équations produit nul, avec valeur absolue, du type x² = a', 'Résoudre des inéquations du 1er degré et produit', 'Mettre un problème en équation'],
      rap: ['A × B = 0 ⇔ A = 0 ou B = 0.', '|X| = a (a > 0) ⇔ X = a ou X = −a ; si a < 0, pas de solution.', 'Multiplier une inéquation par un nombre négatif change le sens de l\'inégalité.'],
      ex: [
        X('Connaître', L3 + ' · L2 ex. 5', `1. Range dans l'ordre les étapes d'un problème de mise en équation : résolution de l'équation – mise en équation – choix de l'inconnue – conclusion.<br>2. Complète : A × B = 0 ⇔ … ; |X| = 3 ⇔ …`,
          `1. Choix de l'inconnue ; mise en équation ; résolution ; conclusion (avec vérification).<br>2. A = 0 ou B = 0 ; X = 3 ou X = −3.`),
        X('Comprendre', L3 + ' · L2 ex. 1 et 3', `1. Pour quelle équation −2 est-il solution ? a) |2x + 1| = 3 ; b) |x + 3| = |1 − x| ; c) −3x² + 1 = 0.<br>2. Vrai ou faux : x² − 7 = 0 a deux solutions ; x² = 9 a pour solution S = {3} ; |−x + 1| = −3 n'a pas de solution.`,
          `1. a) |−3| = 3 : oui. b) 1 ≠ 3 : non. c) −11 ≠ 0 : non.<br>2. Vrai (±${r(7)}) ; Faux (S = {−3 ; 3}) ; Vrai.`),
        X('Appliquer', L3 + ' · L2 ex. 6', `Résous dans ℝ : a) −3x(4x − 3) = 0 ; b) (2x − 3)² − (1 − x)² = 0 ; c) 9(x + 2)² − (2x − 2)² = 0 ; d) ${f('x + 3', 2)} − ${f('4x − 3', 3)} = 1 − ${f('5x − 12', 6)}.`,
          `a) S = {0 ; ${f(3, 4)}}<br>b) (3x − 4)(x − 2) = 0 : S = {${f(4, 3)} ; 2}<br>c) (x + 8)(5x + 4) = 0 : S = {−8 ; ${f('−4', 5)}}<br>d) ×6 : 3x + 9 − 8x + 6 = 6 − 5x + 12, soit 15 = 18 : impossible, S = ∅.`),
        X('Appliquer', L3 + ' · L2 ex. 7', `Résous : a) |3x − 4| = 2 ; b) |−x + 7| = −3 ; c) |3x − 4| = |x − 1|.`,
          `a) 3x − 4 = 2 ou 3x − 4 = −2 : S = {${f(2, 3)} ; 2}<br>b) S = ∅<br>c) 3x − 4 = x − 1 ou 3x − 4 = −x + 1 : S = {${f(5, 4)} ; ${f(3, 2)}}`),
        X('Appliquer', L3 + ' · L2 ex. 9', `Résous : a) 2x − 1 ≥ 5x + 2 ; b) (2x + 1)(x − 3) > 0 ; c) −9x² + 4 < 0.`,
          `a) −3x ≥ 3 donc x ≤ −1 : S = ]−∞ ; −1]<br>b) Tableau de signes : S = ]−∞ ; ${f('−1', 2)}[ ∪ ]3 ; +∞[<br>c) (2 − 3x)(2 + 3x) < 0 : S = ]−∞ ; ${f('−2', 3)}[ ∪ ]${f(2, 3)} ; +∞[`),
        X('Analyser', L3 + ' · L2 ex. 11', `A(x) = x² − 4 + (x + 2)(−2x + 3).<br>1. Factorise A(x). 2. Résous A(x) = 0. 3. Déduis-en les solutions de A(x) < 0.`,
          `1. A(x) = (x + 2)(x − 2) + (x + 2)(−2x + 3) = (x + 2)(−x + 1).<br>2. S = {−2 ; 1}.<br>3. Tableau de signes : A(x) < 0 pour x < −2 ou x > 1 : S = ]−∞ ; −2[ ∪ ]1 ; +∞[.`),
        X('Évaluer', L3 + ' · L2 ex. 14, 17, 18', `1. Un âne porte 15 sacs de sel et 2 kg d'olives ; un mulet 2 sacs de sel et 41 kg d'olives. Ils portent la même charge. Masse d'un sac ?<br>2. Peut-on trouver trois entiers consécutifs de somme 2 022 ? et de somme 2 023 ?<br>3. Un père a 27 ans de plus que son fils. Dans 6 ans, il aura le double de l'âge de son fils. Âges ?`,
          `1. 15s + 2 = 2s + 41 ⇒ 13s = 39 ⇒ s = 3 kg.<br>2. 3n + 3 = 2 022 ⇒ n = 673 : 673, 674, 675. Pour 2 023 : 3n = 2 020 n'a pas de solution entière : impossible.<br>3. f + 33 = 2(f + 6) ⇒ f = 21 ans, père 48 ans.`),
        X('Évaluer', L3 + ' · L2 ex. 15', `Un élève a 12 au devoir (coefficient 1). Le devoir de synthèse a le coefficient 2. Il dit : « Il me faut au moins 14 pour avoir 13 de moyenne. » Vérifie.`,
          `${f('12 + 2x', 3)} ≥ 13 ⇔ 2x ≥ 27 ⇔ x ≥ 13,5. Il lui faut seulement 13,5 ; avec 14, il aura 13,33.`),
        X('Créer', L3 + ' · L2 ex. 10 + ' + CEL, `1. Si on augmente de 2 cm le côté d'un carré, son aire devient 9 cm². Calcule le côté initial.<br>2. Invente une équation dont les solutions sont −3 et 5, puis un petit problème qui s'y ramène.`,
          `1. (x + 2)² = 9 ⇒ x + 2 = 3 (une longueur est positive) ⇒ x = 1 cm.<br>2. (x + 3)(x − 5) = 0, soit x² − 2x − 15 = 0. Problème libre.`)
      ]
    }
  };
  G.TD = TD; G.TD_BLOOM = BLOOM; G.TD_F = f;
})(typeof window !== 'undefined' ? window : globalThis);
