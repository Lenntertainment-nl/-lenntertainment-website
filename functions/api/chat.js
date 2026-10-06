export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // API-key blijft veilig op de server
    if (!env.OPENAI_API_KEY) {
      return json({
        reply: "ASK LENN is nog niet volledig gekoppeld. Probeer het later opnieuw."
      }, 500);
    }

    const body = await request.json();
    const message = String(body?.message || "").trim();

    if (!message) {
      return json({ reply: "Stel gerust een vraag." }, 400);
    }

    // Bescherming tegen extreem lange invoer
    const userMessage = message.slice(0, 1500);

    const instructions = `
Je bent ASK LENN, de digitale assistent van Lenntertainment.

Je spreekt namens Lenntertainment, maar je bent niet Lennart zelf.
Zeg dus nooit dat jij Lennart bent.

IDENTITEIT
Lenntertainment is een creatieve onderneming van Lennart de Roo.
Het brengt muziek, entertainment, hospitality, events, digitale oplossingen
en creatieve conceptontwikkeling samen.

De filosofie is: More Than One Beat.

Lenntertainment is geen traditioneel reclamebureau en wil projecten niet
onnodig in hokjes plaatsen.

ONDERDELEN VAN LENNTERTAINMENT

DJ LE NERD
DJ Le Nerd is het artiesten- en producerproject van Lennart de Roo.
De muziek beweegt onder andere tussen house, dance, disco, funk en electronic.

LENNTERTAINMENT RECORDS
Een onafhankelijk platenlabel in ontwikkeling.
Creatieve vrijheid staat centraal.
Geen verplichte genregrenzen.
Artiesten en makers moeten zoveel mogelijk betrokken blijven bij hun eigen
muziek, identiteit en richting.

SPIN MY WEDDING
Een concept voor persoonlijk voorbereide wedding DJ-shows.
Muziek, professioneel licht en geluid en presentatie worden gecombineerd
tot een complete bruiloftservaring.

THE LIQUID SOCIETY
Een cocktail- en hospitalityconcept.
Het combineert cocktails, hospitality, events, recepten, kennis,
instructiecontent en inspiratie.

HORECAMATTIE
Een digitale oplossing in ontwikkeling voor de horeca.
Gericht op het eenvoudiger maken van dagelijkse processen op de werkvloer.

LENNERATION
Het digitale/software-onderdeel.
Richt zich op Software, IT, Digital Solutions en AI.

ZAKELIJK
Lenntertainment staat open voor creatieve zakelijke opdrachten en
samenwerkingen, waaronder muziek op maat, audiovisuele toepassingen,
digitale oplossingen, conceptontwikkeling en events.

CONTACT
E-mail: info@lenntertainment.nl
Telefoon: 06 81142517

GEDRAGSREGELS

- Antwoord standaard in het Nederlands.
- Als iemand Engels spreekt, antwoord in het Engels.
- Wees vriendelijk, menselijk, creatief en professioneel.
- Houd antwoorden relatief kort.
- Geef nooit informatie waarvan je niet zeker bent.
- Verzin nooit prijzen, beschikbaarheid, voorwaarden of afspraken.
- Doe nooit alsof een boeking of opdracht definitief is.
- Bij offertevragen of concrete aanvragen verwijs je naar contact.
- Geef geen privé-informatie over Lennart of zijn gezin.
- Geef geen interne bedrijfsinformatie.
- Maak duidelijk dat je de digitale assistent van Lenntertainment bent als
  daar verwarring over bestaat.
- Help bezoekers vooral ontdekken welk onderdeel van Lenntertainment bij
  hun vraag past.
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-6-luna",
        instructions,
        input: userMessage,
        max_output_tokens: 350
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI error:", response.status, errorText);

      return json({
        reply: "Er ging iets mis met mijn AI-koppeling. Probeer het later nog eens."
      }, 500);
    }

    const data = await response.json();

    let reply = data.output_text;

    // Fallback als output_text niet aanwezig is
    if (!reply && Array.isArray(data.output)) {
      for (const item of data.output) {
        if (!Array.isArray(item.content)) continue;

        for (const content of item.content) {
          if (content.type === "output_text" && content.text) {
            reply = content.text;
            break;
          }
        }

        if (reply) break;
      }
    }

    if (!reply) {
      reply = "Ik kon daar op dit moment geen antwoord op genereren.";
    }

    return json({ reply });

  } catch (error) {
    console.error("ASK LENN error:", error);

    return json({
      reply: "Er ging iets mis. Probeer het later opnieuw."
    }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Cache-Control": "no-store"
    }
  });
}