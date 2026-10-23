/* Profdemaths 2.0 · passage de l'ancienne adresse (github.io) à https://racineprofdemaths.com
   Les données de l'élève (progrès, connexion) passent dans le « # » de l'adresse : il n'est jamais envoyé au serveur. */
(function(){
var NEW='https://racineprofdemaths.com/';
function enc(s){return btoa(unescape(encodeURIComponent(s)))}
function dec(s){return decodeURIComponent(escape(atob(s)))}
try{
  if(location.hash.indexOf('#migr=')===0){
    var d=JSON.parse(dec(location.hash.slice(6)));
    Object.keys(d).forEach(function(k){if(/^pdm/.test(k)&&localStorage.getItem(k)===null)localStorage.setItem(k,d[k])});
    history.replaceState(null,'',location.pathname+location.search);
  }
}catch(e){}
if(!/github\.io$/.test(location.hostname))return;
function go(){var d={};try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(/^pdm/.test(k))d[k]=localStorage.getItem(k)}}catch(e){}
  location.href=NEW+'#migr='+enc(JSON.stringify(d))}
function banner(){if(document.getElementById('pdm-migr'))return;var b=document.createElement('div');b.id='pdm-migr';
  b.style.cssText='position:fixed;left:10px;right:10px;bottom:10px;z-index:99999;background:#1E3F8A;color:#fff;border:2px solid #C9962B;border-radius:14px;padding:12px 14px;font:15px/1.4 Arial,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.3)';
  b.innerHTML='<b>📢 Profdemaths a une nouvelle adresse : racineprofdemaths.com</b><br>Touche le bouton : tes progrès et ta connexion sont transférés. Ensuite, installe l’appli depuis la nouvelle adresse et supprime l’ancienne.<div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap"><button id="pdm-migr-go" style="background:#C9962B;color:#fff;border:0;border-radius:10px;padding:8px 14px;font-weight:700;font-size:15px">Aller sur la nouvelle adresse</button><button id="pdm-migr-x" style="background:transparent;color:#fff;border:1px solid #fff;border-radius:10px;padding:8px 12px;font-size:14px">Plus tard</button></div>';
  document.body.appendChild(b);
  document.getElementById('pdm-migr-go').onclick=go;
  document.getElementById('pdm-migr-x').onclick=function(){b.remove()}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',banner);else banner();
})();
