
const adminForm=document.getElementById('admin-ai-form');
if(adminForm){
 const messages=document.getElementById('admin-ai-messages');
 const input=document.getElementById('admin-ai-input');
 function addAdmin(text,type){const d=document.createElement('div');d.className='ai-admin-msg '+type;d.textContent=text;messages.appendChild(d);messages.scrollTop=messages.scrollHeight}
 function localAdminAnswer(q){
   const t=q.toLowerCase();
   if(t.includes('offerte')) return 'Voor een offerte heb ik minimaal platform, klant, datum/locatie indien relevant, werkzaamheden, aantallen/uren en eventuele reiskosten nodig. Gebruik daarna de prijsberekening om verkoopprijs, kostprijs en marge vast te leggen.';
   if(t.includes('marge')) return 'Open de prijsberekening en vul per regel verkoopprijs en interne kostprijs in. De tool rekent brutomarge en margepercentage automatisch uit.';
   if(t.includes('spin my wedding')) return 'Denk bij Spin My Wedding aan DJ-/uitvoeringsuren, voorbereiding, techniek/show en reiskosten. De exacte tarieven laat je zelf bepalen in de interne standaardtarieven.';
   if(t.includes('liquid society')) return 'Voor The Liquid Society kun je hospitality/baruren, voorbereiding, ingrediënten per persoon, materialen/baropstelling en reiskosten calculeren.';
   return 'De interne AI is technisch voorbereid, maar nog niet gekoppeld aan een echte AI-backend. Bij livegang kunnen we deze assistent veilig laten werken met jouw admininformatie en prijsberekeningen.';
 }
 async function askAdmin(q){
   addAdmin(q,'user');input.value='';
   try{
     const r=await fetch('/api/admin-chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q,source:'admin'})});
     if(r.ok){const data=await r.json();if(data&&data.reply){addAdmin(data.reply,'bot');return}}
   }catch(e){}
   addAdmin(localAdminAnswer(q),'bot');
 }
 adminForm.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();if(q)askAdmin(q)});
 document.querySelectorAll('[data-admin-prompt]').forEach(b=>b.onclick=()=>askAdmin(b.dataset.adminPrompt));
}
