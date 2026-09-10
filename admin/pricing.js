
const DEFAULTS = {
  "Lenntertainment": [
    ["Creatieve uren","uur",0,0],
    ["Project-/voorbereidingsuren","uur",0,0],
    ["Reiskosten","km",0,0]
  ],
  "Spin My Wedding": [
    ["DJ / uitvoeringsuren","uur",0,0],
    ["Voorbereidingsuren","uur",0,0],
    ["Techniek / show","opdracht",0,0],
    ["Reiskosten","km",0,0]
  ],
  "DJ Le Nerd": [
    ["DJ / performance","uur",0,0],
    ["Productie-uren","uur",0,0],
    ["Songwriting","uur",0,0],
    ["Mix / master / afwerking","opdracht",0,0],
    ["Reiskosten","km",0,0]
  ],
  "Lenntertainment Records": [
    ["Productie / begeleiding","uur",0,0],
    ["Releasevoorbereiding","opdracht",0,0],
    ["Artwork / content","opdracht",0,0],
    ["Overige releasekosten","opdracht",0,0]
  ],
  "The Liquid Society": [
    ["Hospitality / baruren","uur",0,0],
    ["Voorbereidingsuren","uur",0,0],
    ["Cocktail-/ingrediëntenpakket","persoon",0,0],
    ["Materialen / baropstelling","opdracht",0,0],
    ["Reiskosten","km",0,0]
  ],
  "Zakelijk": [
    ["Muziekproductie","uur",0,0],
    ["Songwriting / tekst","uur",0,0],
    ["Creatieve uitwerking","uur",0,0],
    ["Projectvoorbereiding","uur",0,0],
    ["Licentie / gebruik","opdracht",0,0]
  ]
};

let presets = JSON.parse(localStorage.getItem("lt_pricing_presets") || "null") || DEFAULTS;
let saved = JSON.parse(localStorage.getItem("lt_saved_calcs") || "[]");

const el = id => document.getElementById(id);
const euro = n => new Intl.NumberFormat("nl-NL",{style:"currency",currency:"EUR"}).format(Number(n||0));

function loadPlatform(){
  const platform = el("platform").value;
  el("items").innerHTML = "";
  (presets[platform] || []).forEach(p => addItem(p[0],1,p[2],p[3],p[1]));
  renderPresetSettings();
  calc();
}

function addItem(desc="", qty=1, price=0, cost=0, unit="st"){
  const row=document.createElement("div");
  row.className="item-row";
  row.innerHTML=`
    <input class="desc" value="${escapeHtml(desc)}" placeholder="Omschrijving">
    <input class="qty" type="number" min="0" step="0.01" value="${qty}">
    <input class="price" type="number" min="0" step="0.01" value="${price}">
    <input class="cost" type="number" min="0" step="0.01" value="${cost}">
    <button class="iconbtn del" title="Verwijderen">×</button>`;
  row.dataset.unit=unit;
  row.querySelectorAll("input").forEach(i=>i.addEventListener("input",calc));
  row.querySelector(".del").onclick=()=>{row.remove();calc()};
  el("items").appendChild(row);
}

function calc(){
  let revenue=0,costs=0;
  document.querySelectorAll(".item-row").forEach(r=>{
    const q=+r.querySelector(".qty").value||0;
    revenue += q*(+r.querySelector(".price").value||0);
    costs += q*(+r.querySelector(".cost").value||0);
  });
  const discount=(+el("discount").value||0)/100;
  const afterDiscount=revenue*(1-discount);
  const vat=(+el("vat").value||0)/100;
  const vatAmount=afterDiscount*vat;
  const total=afterDiscount+vatAmount;
  const margin=afterDiscount-costs;
  const marginPct=afterDiscount ? (margin/afterDiscount*100) : 0;

  el("revenue").textContent=euro(afterDiscount);
  el("costs").textContent=euro(costs);
  el("margin").textContent=euro(margin);
  el("marginpct").textContent=marginPct.toFixed(1)+"%";
  el("vatamount").textContent=euro(vatAmount);
  el("total").textContent=euro(total);
}

function currentData(){
  return {
    id: Date.now(),
    date: new Date().toISOString(),
    platform: el("platform").value,
    opdracht: el("opdracht").value.trim(),
    klant: el("klant").value.trim(),
    discount:+el("discount").value||0,
    vat:+el("vat").value||0,
    items:[...document.querySelectorAll(".item-row")].map(r=>({
      description:r.querySelector(".desc").value,
      quantity:+r.querySelector(".qty").value||0,
      price:+r.querySelector(".price").value||0,
      cost:+r.querySelector(".cost").value||0,
      unit:r.dataset.unit||"st"
    }))
  }
}

function saveCalc(){
  const d=currentData();
  if(!d.opdracht){alert("Geef de opdracht eerst een naam.");return}
  saved.unshift(d);
  saved=saved.slice(0,50);
  localStorage.setItem("lt_saved_calcs",JSON.stringify(saved));
  renderSaved();
}

function renderSaved(){
  const box=el("saved");
  box.innerHTML="";
  if(!saved.length){box.innerHTML='<div class="note">Nog geen berekeningen opgeslagen in deze browser.</div>';return}
  saved.slice(0,10).forEach(d=>{
    const div=document.createElement("div");
    div.className="saved-entry";
    div.innerHTML=`<div><strong>${escapeHtml(d.opdracht||"Zonder naam")}</strong><br><small>${escapeHtml(d.platform)} · ${escapeHtml(d.klant||"geen klant")} · ${new Date(d.date).toLocaleDateString("nl-NL")}</small></div><button class="secondary">Open</button>`;
    div.querySelector("button").onclick=()=>loadSaved(d.id);
    box.appendChild(div);
  });
}

function loadSaved(id){
  const d=saved.find(x=>x.id===id); if(!d)return;
  el("platform").value=d.platform; el("opdracht").value=d.opdracht; el("klant").value=d.klant;
  el("discount").value=d.discount; el("vat").value=d.vat;
  el("items").innerHTML="";
  d.items.forEach(i=>addItem(i.description,i.quantity,i.price,i.cost,i.unit));
  calc(); window.scrollTo({top:0,behavior:"smooth"});
}

function exportCalc(){
  const blob=new Blob([JSON.stringify(currentData(),null,2)],{type:"application/json"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download=(el("opdracht").value||"prijsberekening").replace(/[^a-z0-9_-]+/gi,"_")+".json";
  a.click(); URL.revokeObjectURL(a.href);
}

function resetCalc(){
  el("opdracht").value="";el("klant").value="";el("discount").value="0";el("vat").value="21";loadPlatform();
}

function renderPresetSettings(){
  const p=el("platform").value, box=el("presetSettings");
  box.innerHTML="";
  (presets[p]||[]).forEach((x,i)=>{
    const row=document.createElement("div");
    row.className="preset-row";
    row.innerHTML=`<span>${escapeHtml(x[0])}</span><input type="number" step="0.01" min="0" value="${x[2]}" title="Verkoopprijs"><input type="number" step="0.01" min="0" value="${x[3]}" title="Kostprijs">`;
    const ins=row.querySelectorAll("input");
    ins[0].onchange=()=>{presets[p][i][2]=+ins[0].value||0;savePresets()};
    ins[1].onchange=()=>{presets[p][i][3]=+ins[1].value||0;savePresets()};
    box.appendChild(row);
  });
}

function savePresets(){
  localStorage.setItem("lt_pricing_presets",JSON.stringify(presets));
}

function resetPresets(){
  if(confirm("Alle interne standaardtarieven terugzetten naar € 0,00?")){
    presets=JSON.parse(JSON.stringify(DEFAULTS));savePresets();loadPlatform();
  }
}

function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

el("platform").addEventListener("change",loadPlatform);
["discount","vat"].forEach(id=>el(id).addEventListener("input",calc));
el("addItem").onclick=()=>addItem();
el("saveCalc").onclick=saveCalc;
el("exportCalc").onclick=exportCalc;
el("printCalc").onclick=()=>window.print();
el("resetCalc").onclick=resetCalc;
el("resetPresets").onclick=resetPresets;

loadPlatform();
renderSaved();
