
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


/* =========================================================
   ASK LENN — Lenntertainment Digital Assistant
   ========================================================= */

(function () {

  /* ASK LENN centraal opbouwen */
  let launcher = document.getElementById('ai-chat-launcher');
  let panel = document.getElementById('ai-chat-panel');

  /*
     De HTML-pagina's bevatten voorlopig nog de bestaande chat.
     We gebruiken dezelfde elementen, maar vullen ze centraal
     vanuit site.js zodat ASK LENN maar op één plek onderhouden wordt.
  */

  if (!launcher || !panel) return;

  launcher.textContent = 'ASK LENN';
  launcher.setAttribute('aria-label', 'Vraag het Lenn');

  panel.innerHTML = `
    <div class="ai-chat-head">
      <div class="ai-chat-identity">
  <div class="ai-chat-name">
    <span class="ai-status-dot"></span>
    <strong>LENN</strong>
  </div>
  <small>Digital Assistant · Lenntertainment</small>
</div>
      <button class="ai-chat-close" aria-label="Sluiten">×</button>
    </div>

    <div class="ai-chat-messages">
      <div class="ai-msg bot">
        Hoi, ik ben Lenn. Welkom bij Lenntertainment. Waar kan ik je mee helpen?
      </div>
    </div>
<div class="ai-chat-prompt">Waar kan ik je mee helpen?</div>

    <div class="ai-chat-suggestions">
      <button class="ai-chip">Muziek & releases</button>
      <button class="ai-chip">DJ & events</button>
      <button class="ai-chip">Hospitality</button>
      <button class="ai-chip">Digital & AI</button>
      <button class="ai-chip">Zakelijk</button>
    </div>

    <form class="ai-chat-form">
      <input
        type="text"
        placeholder="Vraag het Lenn..."
        aria-label="Vraag"
        autocomplete="off"
      >
      <button type="submit" aria-label="Versturen">→</button>
    </form>

    <div class="ai-chat-note">
      Digitale assistent namens Lenntertainment.
    </div>
  `;

  const close = panel.querySelector('.ai-chat-close');
  const form = panel.querySelector('.ai-chat-form');
  const input = panel.querySelector('input');
  const messages = panel.querySelector('.ai-chat-messages');
  const chips = panel.querySelectorAll('.ai-chip');

  /* Lokale kennis / fallback */
const FAQ = [

  // =========================================================
  // LENNTERTAINMENT ALGEMEEN
  // =========================================================
  {
    keys: [
      "lenntertainment",
      "wat is lenntertainment",
      "wat doen jullie",
      "wat doet lenntertainment",
      "wie zijn jullie",
      "bedrijf",
      "over jullie"
    ],
    answer:
      "Lenntertainment is een creatieve onderneming rond muziek, entertainment, hospitality, events, conceptontwikkeling en digitale oplossingen. Onder Lenntertainment vallen verschillende gespecialiseerde platforms en projecten. De filosofie: More Than One Beat."
  },

  {
    keys: [
      "onderdelen",
      "platforms",
      "merken",
      "projecten",
      "wat valt onder lenntertainment",
      "activiteiten"
    ],
    answer:
      "Binnen Lenntertainment vind je onder andere DJ Le Nerd, Spin My Wedding, Lenntertainment Records, The Liquid Society, Lenneration en HorecaMattie. Elk onderdeel heeft zijn eigen specialisme, maar ze komen samen onder één creatieve onderneming."
  },

  {
    keys: [
      "missie",
      "visie",
      "filosofie",
      "more than one beat",
      "waar staan jullie voor"
    ],
    answer:
      "De missie van Lenntertainment is ruimte creëren waarin ideeën, mensen en energie samenkomen. Muziek vormt een belangrijke basis, maar Lenntertainment kijkt bewust verder dan één vakgebied. Vandaar: More Than One Beat."
  },

  // =========================================================
  // DJ LE NERD / MUZIEK
  // =========================================================
  {
    keys: [
      "dj le nerd",
      "le nerd",
      "dj lenn",
      "artiest",
      "producer",
      "producties",
      "produceren"
    ],
    answer:
      "DJ Le Nerd is het artiesten- en producerproject binnen Lenntertainment. De muzikale richting beweegt onder andere tussen house, dance, disco, funk en electronic, met ruimte om buiten vaste genregrenzen te werken."
  },

  {
    keys: [
      "muziek",
      "releases",
      "release",
      "tracks",
      "track",
      "songs",
      "platen",
      "discografie"
    ],
    answer:
      "Lenntertainment ontwikkelt en brengt eigen muziek uit via DJ Le Nerd en bouwt daarnaast aan Lenntertainment Records. Wil je meer weten over een specifieke release of samenwerking? Stel gerust een gerichte vraag."
  },

  {
    keys: [
      "muziek op maat",
      "muziek laten maken",
      "eigen muziek",
      "commercial muziek",
      "jingle",
      "soundtrack",
      "bedrijfsmuziek"
    ],
    answer:
      "Lenntertainment kan muziek op maat ontwikkelen voor bijvoorbeeld commercials, campagnes, bedrijfsvideo's, social content, events, jingles en andere creatieve toepassingen. Voor een aanvraag kun je vertellen waarvoor je de muziek wilt gebruiken."
  },

  // =========================================================
  // SPIN MY WEDDING / DJ EVENTS
  // =========================================================
  {
  keys: [
    "wat kost een dj voor mijn bruiloft",
    "wat kost een bruiloft dj",
    "wat kost een bruiloftdj",
    "prijs bruiloft",
    "prijs bruiloft dj",
    "kosten bruiloft",
    "kosten bruiloft dj",
    "tarief bruiloft",
    "bruiloft prijs",
    "bruiloft kosten"
  ],
answer:
  "Elke bruiloft is anders. Daarom werkt Spin My Wedding met een offerte op maat, afgestemd op jullie locatie, tijden, wensen, licht en geluid. De prijzen voor een bruiloft starten vanaf €850. Vertel me gerust wat jullie plannen zijn, dan kan ik aangeven welke informatie nodig is voor een offerte."},
  {
    keys: [
      "spin my wedding",
      "bruiloft",
      "bruiloften",
      "trouwen",
      "trouwerij",
      "wedding",
      "bruiloft dj",
      "bruiloftdj"
    ],
    answer:
      "Spin My Wedding is het gespecialiseerde onderdeel voor bruiloften. Muziek, voorbereiding, professioneel geluid en verlichting worden als één geheel benaderd om een feest te bouwen dat bij het bruidspaar en de gasten past."
  },

  {
    keys: [
      "dj huren",
      "dj boeken",
      "dj nodig",
      "feest dj",
      "dj feest",
      "evenement dj",
      "event dj",
      "dj event"
    ],
    answer:
      "Voor feesten, bruiloften en evenementen kun je Lenntertainment benaderen voor DJ-entertainment. Vertel bij een aanvraag bij voorkeur de datum, locatie, het soort evenement en het verwachte aantal gasten."
  },

  {
    keys: [
      "licht",
      "geluid",
      "lichtshow",
      "apparatuur",
      "dj apparatuur",
      "pa"
    ],
    answer:
      "Bij DJ- en eventopdrachten kan professioneel geluid en verlichting onderdeel zijn van de productie. Wat precies nodig is hangt af van de locatie, het aantal gasten en het type evenement."
  },

  // =========================================================
  // LENNTERTAINMENT RECORDS
  // =========================================================
  {
    keys: [
      "lenntertainment records",
      "records",
      "platenlabel",
      "label",
      "record label"
    ],
    answer:
      "Lenntertainment Records is een onafhankelijk platenlabel in opbouw. Het uitgangspunt is creatieve vrijheid: artiesten en muziek hoeven niet onnodig in vaste hokjes of genregrenzen te worden geplaatst."
  },

  {
    keys: [
      "artiest aanmelden",
      "muziek opsturen",
      "demo",
      "demo opsturen",
      "demo sturen",
      "bij label",
      "aansluiten label"
    ],
    answer:
      "Interesse in Lenntertainment Records? Je kunt contact opnemen en kort vertellen wie je bent, welke muziek je maakt en waar je naar op zoek bent. Omdat het label nog in ontwikkeling is, wordt per aanvraag bekeken wat mogelijk is."
  },

  // =========================================================
  // THE LIQUID SOCIETY
  // =========================================================
  {
    keys: [
      "the liquid society",
      "liquid society",
      "cocktail",
      "cocktails",
      "hospitality",
      "horeca",
      "bartender",
      "bar"
    ],
    answer:
      "The Liquid Society is het cocktail- en hospitalityplatform binnen Lenntertainment. Het draait om cocktails, kennis, inspiratie, hospitality en de wereld achter de bar."
  },

  {
    keys: [
      "cocktail recepten",
      "cocktailrecept",
      "recepten",
      "liquid library"
    ],
    answer:
      "The Liquid Society bouwt aan The Liquid Library: een collectie rond cocktails, recepten, kennis en inspiratie. Het platform wordt verder uitgebreid met nieuwe content en ideeën uit de hospitalitywereld."
  },

  // =========================================================
  // LENNERATION
  // =========================================================
  {
    keys: [
      "lenneration",
      "software",
      "it",
      "digital solutions",
      "digitale oplossingen",
      "digital",
      "webapp",
      "web app",
      "app bouwen",
      "software bouwen"
    ],
    answer:
      "Lenneration is de digitale tak: Software, IT, Digital Solutions en AI. Het uitgangspunt is niet techniek om de techniek, maar praktische digitale oplossingen voor echte problemen binnen bedrijven en organisaties."
  },

  {
    keys: [
      "website",
      "website maken",
      "website bouwen",
      "websites"
    ],
    answer:
      "Digitale ontwikkeling valt binnen Lenneration. Heb je een idee voor een website, platform, webapp of andere digitale oplossing? Beschrijf kort wat je wilt bereiken, dan kan ik je helpen bepalen waar je aanvraag thuishoort."
  },

  {
    keys: [
      "ai",
      "kunstmatige intelligentie",
      "artificial intelligence",
      "ai oplossing",
      "ai oplossingen"
    ],
    answer:
      "AI valt binnen Lenneration. Daarbij wordt gekeken waar AI praktisch iets kan verbeteren, vereenvoudigen of automatiseren. Het doel is een bruikbare oplossing, niet AI toevoegen alleen omdat het kan."
  },

  // =========================================================
  // HORECAMATTIE
  // =========================================================
  {
    keys: [
      "horecamattie",
      "horeca mattie",
      "horeca app",
      "horeca software"
    ],
    answer:
      "HorecaMattie is een digitaal concept voor de horecawerkvloer. Het is gericht op eenvoudige dagelijkse processen zoals notities, bestellen en bijvullen, met als uitgangspunt dat software het werk juist makkelijker moet maken."
  },

  // =========================================================
  // ZAKELIJK / SAMENWERKING
  // =========================================================
  {
    keys: [
      "zakelijk",
      "zakelijke opdracht",
      "opdracht",
      "samenwerken",
      "samenwerking",
      "bedrijf",
      "bedrijven",
      "commercial",
      "campagne"
    ],
    answer:
      "Lenntertainment werkt aan zakelijke en creatieve opdrachten op het gebied van muziek, entertainment, hospitality, content, conceptontwikkeling en digitale oplossingen. Vertel kort wat je wilt realiseren, dan kan ik je naar het juiste onderdeel sturen."
  },

  // =========================================================
  // OFFERTE
  // =========================================================
  {
    keys: [
      "offerte",
      "offerte aanvragen",
      "offerte sturen",
      "offerte maken",
      "prijsopgave",
      "aanvraag",
      "kostenopgave"
    ],
    answer:
      "Zeker. Voor een goede offerteaanvraag heb ik eerst wat informatie nodig: waar gaat de opdracht over, wanneer moet het plaatsvinden of worden opgeleverd en wat heb je ongeveer nodig? Daarna kun je de aanvraag via Lenntertainment indienen."
  },

  // =========================================================
  // PRIJZEN
  // =========================================================
  {
    keys: [
      "prijs",
      "prijzen",
      "kosten",
      "tarief",
      "tarieven",
      "wat kost",
      "hoeveel kost",
      "budget"
    ],
    answer:
      "De prijs hangt af van het soort opdracht en wat ervoor nodig is. Ik geef daarom geen bedrag zonder voldoende informatie. Vertel me eerst of het gaat om bijvoorbeeld een DJ, bruiloft, muziekproductie, hospitality of een digitale oplossing."
  },

  // =========================================================
  // BESCHIKBAARHEID
  // =========================================================
  {
    keys: [
      "beschikbaar",
      "beschikbaarheid",
      "datum vrij",
      "zijn jullie vrij",
      "ben je vrij",
      "boeken op"
    ],
    answer:
      "Ik kan geen actuele beschikbaarheid bevestigen. Stuur de gewenste datum, locatie en het type opdracht naar Lenntertainment, dan kan de beschikbaarheid worden gecontroleerd."
  },

  // =========================================================
  // CONTACT
  // =========================================================
  {
    keys: [
      "contact",
      "contact opnemen",
      "mail",
      "email",
      "e-mail",
      "mailen",
      "telefoon",
      "bellen",
      "bereiken"
    ],
    answer:
      "Je kunt Lenntertainment bereiken via info@lenntertainment.nl of telefonisch via 06 81142517. Je kunt ook het contactformulier op deze website gebruiken."
  },

  // =========================================================
  // WIE IS LENN?
  // =========================================================
  {
    keys: [
      "wie ben jij",
      "ben jij lenn",
      "wie is lenn",
      "wat ben jij",
      "robot",
      "assistent"
    ],
    answer:
      "Ik ben LENN, de digitale assistent van Lenntertainment. Ik kan je helpen met informatie over de verschillende onderdelen en je naar de juiste plek sturen. Ik ben niet Lennart zelf."
  },

  // =========================================================
  // GROETEN
  // =========================================================
  {
    keys: [
      "hallo",
      "hoi",
      "hey",
      "goedemorgen",
      "goedemiddag",
      "goedenavond"
    ],
    answer:
      "Hoi! Ik ben LENN, de digitale assistent van Lenntertainment. Waar kan ik je mee helpen? Je kunt me bijvoorbeeld iets vragen over muziek, DJ & events, hospitality, Lenneration of een zakelijke aanvraag."
  },

  // =========================================================
  // BEDANKT
  // =========================================================
  {
    keys: [
      "bedankt",
      "dank je",
      "dankjewel",
      "thanks",
      "top bedankt"
    ],
    answer:
      "Graag gedaan! Als je nog iets wilt weten over Lenntertainment of een van de onderdelen, vraag het gerust."
  }

];

  function add(text, type) {
    const message = document.createElement('div');
    message.className = 'ai-msg ' + type;
    message.textContent = text;

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function localAnswer(question) {
    const text = question.toLowerCase();
if (
  text.includes("bruiloft") &&
  (
    text.includes("prijs") ||
    text.includes("kost") ||
    text.includes("kosten") ||
    text.includes("tarief")
  )
) {
  return "Elke bruiloft is anders. Daarom werkt Spin My Wedding met een offerte op maat, afgestemd op jullie locatie, tijden, wensen, licht en geluid. De prijzen voor een bruiloft starten vanaf €850. Vertel me gerust wat jullie plannen zijn, dan help ik je verder.";
}
    for (const item of FAQ) {
      if (item.keys.some(key => text.includes(key))) {
        return item.answer;
      }
    }

    return "Daar heb ik nog niet genoeg informatie over om je een betrouwbaar antwoord te geven. Je kunt je vraag wel rechtstreeks sturen naar info@lenntertainment.nl.";
  }

async function ask(question) {
  add(question, 'user');
  input.value = '';

  const answer = localAnswer(question);
  add(answer, 'bot');
}

  launcher.addEventListener('click', () => {
    panel.classList.toggle('open');

    if (panel.classList.contains('open')) {
      setTimeout(() => input.focus(), 150);
    }
  });

  close.addEventListener('click', () => {
    panel.classList.remove('open');
  });

  form.addEventListener('submit', event => {

    event.preventDefault();

    const question = input.value.trim();

    if (question) {
      ask(question);
    }
  });

  chips.forEach(chip => {

    chip.addEventListener('click', () => {
      ask(chip.textContent.trim());
    });

  });

})();