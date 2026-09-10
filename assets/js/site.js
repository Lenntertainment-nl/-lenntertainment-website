
const burger=document.querySelector('.burger');
const mobile=document.querySelector('.mobile-nav');
if(burger&&mobile) burger.addEventListener('click',()=>mobile.classList.toggle('open'));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

const form=document.getElementById('contact-form');
if(form){
 form.addEventListener('submit',(e)=>{
   e.preventDefault();
   const d=new FormData(form);
   const subject=encodeURIComponent('Website aanvraag — '+d.get('onderwerp'));
   const body=encodeURIComponent(`Naam: ${d.get('naam')}\nE-mail: ${d.get('email')}\nOnderwerp: ${d.get('onderwerp')}\n\n${d.get('bericht')}`);
   window.location.href=`mailto:info@lenntertainment.nl?subject=${subject}&body=${body}`;
 });
}


(function(){
 const launcher=document.getElementById('ai-chat-launcher');
 const panel=document.getElementById('ai-chat-panel');
 if(!launcher||!panel) return;
 const close=panel.querySelector('.ai-chat-close');
 const form=panel.querySelector('.ai-chat-form');
 const input=panel.querySelector('input');
 const messages=panel.querySelector('.ai-chat-messages');
 const chips=panel.querySelectorAll('.ai-chip');

 const FAQ = [
  {keys:["spin my wedding","bruiloft","wedding"],answer:"Spin My Wedding verzorgt persoonlijk voorbereide wedding DJ-shows met muziek, professioneel licht en geluid en een verzorgde presentatie. Voor een concrete datum of offerte kun je het beste contact opnemen via info@spinmywedding.nl."},
  {keys:["dj le nerd","producer","spotify","beatport","deezer","itunes","apple music"],answer:"DJ Le Nerd is het artiestenalias van Lennart De Roo: artist, DJ, producer en songwriter. Eigen tracks worden via DistroKid uitgebracht op de grote muziekplatforms. Muzikaal beweegt DJ Le Nerd tussen house, dance, disco, funk en electronic."},
  {keys:["records","label","lenntertainment records"],answer:"Lenntertainment Records is het onafhankelijke label binnen Lenntertainment. De exacte toekomstige vorm blijft bewust flexibel, maar het richt zich op muziek en releases zonder onnodige genregrenzen."},
  {keys:["liquid society","cocktail","cocktails","bar"],answer:"The Liquid Society is een cocktail- en hospitalitymerk voor events én digitale instructiecontent. Het concept combineert een mobiele cocktailbar met online video’s waarmee mensen zelf cocktails kunnen leren maken."},
  {keys:["zakelijk","bedrijf","commercial","jingle","muziek op maat"],answer:"Lenntertainment maakt ook muziek en creatieve content voor zakelijke toepassingen, zoals commercials, bedrijfsvideo’s, social content, jingles, intro’s, outro’s, eventmuziek en educatieve muziek."},
  {keys:["contact","mail","email","telefoon","bellen"],answer:"Je kunt Lenntertainment bereiken via info@lenntertainment.nl of 06 81142517."},
  {keys:["wie is lenntertainment","wat is lenntertainment","about","bio"],answer:"Lenntertainment is een creatieve onderneming op het snijvlak van muziek, entertainment, hospitality, events en conceptontwikkeling. Verschillende merken en projecten krijgen er ruimte om hun eigen karakter te houden."}
 ];

 function add(text,type){
  const d=document.createElement('div'); d.className='ai-msg '+type; d.textContent=text; messages.appendChild(d); messages.scrollTop=messages.scrollHeight;
 }
 function localAnswer(q){
  const t=q.toLowerCase();
  for(const item of FAQ){
   if(item.keys.some(k=>t.includes(k))) return item.answer;
  }
  return "Daar kan ik in deze testversie nog geen betrouwbaar antwoord op geven. Stuur je vraag naar info@lenntertainment.nl, dan komt hij goed terecht.";
 }
 async function ask(q){
  add(q,'user'); input.value='';
  // Production hook: POST to /api/chat. Falls back locally until backend is connected.
  try{
    const r=await fetch('/api/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:q,source:'public-site'})
    });
    if(r.ok){
      const data=await r.json();
      if(data && data.reply){ add(data.reply,'bot'); return; }
    }
  }catch(e){}
  add(localAnswer(q),'bot');
 }
 launcher.onclick=()=>panel.classList.toggle('open');
 close.onclick=()=>panel.classList.remove('open');
 form.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();if(q)ask(q)});
 chips.forEach(c=>c.onclick=()=>ask(c.textContent));
})();
