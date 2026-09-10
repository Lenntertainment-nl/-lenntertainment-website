LENNTERTAINMENT WEBSITE — V2

Wat is nieuw:
- Visuele richting veel dichter bij de goedgekeurde mock-up.
- Officieel Lenntertainment-logo verwerkt.
- Echte logo's voor Spin My Wedding, DJ Le Nerd en The Liquid Society.
- Platforms bewust als vier verschillende merkwerelden vormgegeven.
- Volledige pagina's: Home, About, Missie, Platforms, Records, Zakelijk, Contact.
- Responsive mobiel ontwerp.
- Eerste CMS-configuratie (.pages.yml + content/site.json) voorbereid.

Lokaal bekijken:
1. Pak de ZIP uit.
2. Open index.html in Safari of Chrome.
3. Gebruik de navigatie om alle pagina's te bekijken.

Nog niet live:
- Contactformulier gebruikt in V2 nog mailto.
- CMS is voorbereid maar nog niet gekoppeld aan GitHub/Pages CMS.
- FirstTunes staat bewust nog niet publiek op de site.
- Geen stock/AI-fotografie toegevoegd: V2 gebruikt de merklogo's, typografie en grafische vormen als visuele basis.

Volgende stap na goedkeuring:
GitHub repository → Pages CMS → Cloudflare Pages → STRATO-domein.


V2.1 wijziging:
- Homepage hero aangepast.
- Het officiële Lenntertainment-logo is nu het dominante eerste element.
- De gesplitste LEN NTER / TAINMENT hero-typografie is verwijderd.
- Intro en CTA zijn bewust kleiner/rustiger gemaakt zodat het merk voorop staat.


V2.2:
- De goedgekeurde V2.1 hero is ongewijzigd gebleven.
- About uitgebreid naar een echte Lenntertainment-bio.
- Spin My Wedding-teksten aangescherpt op basis van de officiële website.
- DJ Le Nerd-teksten aangescherpt op basis van de officiële website.
- Geen onbevestigde chartclaims toegevoegd.
- De platformteksten op Home en Platforms vertellen nu hetzelfde verhaal.


V2.3:
- DJ Le Nerd inhoudelijk uitgebreid naar artist, DJ, producer en songwriter.
- DJ Le Nerd benoemd als artiestenalias van Lennart De Roo.
- Eigen tracks/distributie via DistroKid en aanwezigheid op de grote muziekplatforms verwerkt.
- Buma/Stemra-registratie als tekstschrijver van Lennart De Roo verwerkt.
- The Liquid Society uitgebreid van event/cocktailconcept naar breder cocktail- en hospitalitymerk.
- Digitale pijler toegevoegd: YouTube-instructievideo's om zelf cocktails te leren maken.
- Home, About, Platforms en content/site.json consequent bijgewerkt.
- De goedgekeurde V2.1/V2.2 hero en visuele basis zijn ongewijzigd gebleven.


V2.3 FINAL:
- Op Home en Platforms gebruikt Lenntertainment Records nu het officiële Lenntertainment-logo.
- Het tijdelijke ronde L.-symbool is verwijderd.
- De eerder goedgekeurde hero, bio, DJ Le Nerd- en The Liquid Society-teksten zijn verder ongewijzigd.


V2.4 ADMIN:
- Officieel Lenntertainment Records-logo toegevoegd op Home en Platforms.
- Nieuwe interne adminmap: /admin/
- /admin/pricing.html bevat een prijsberekening per opdracht en per platform.
- Ondersteunt verkoopprijs, kostprijs, bruto marge, korting, btw en totaal incl. btw.
- Per platform zijn interne calculatieregels voorbereid; bedragen zijn bewust nog € 0,00.
- Standaardtarieven en opgeslagen calculaties worden lokaal in de browser bewaard (localStorage).
- Calculaties kunnen als JSON worden geëxporteerd of via Print als PDF worden opgeslagen.
- Admin staat niet in de publieke navigatie en is noindex.
- Voor echte privacy bij livegang moet /admin/ achter authenticatie/toegangsbeveiliging worden geplaatst.


V2.5 AI:
- Publieke AI-chatknop toegevoegd op alle websitepagina's.
- De publieke chat kan in testmodus veelvoorkomende vragen lokaal beantwoorden.
- Voor onbekende vragen verwijst de testmodus veilig naar contact.
- Interne admin AI-assistent toegevoegd: /admin/ai.html
- Admin-assistent is bedoeld voor calculatiehulp, offertevoorbereiding en interne vragen.
- Cloudflare Pages Functions scaffolding toegevoegd onder /functions/api/.
- Er is GEEN API-sleutel in HTML of JavaScript opgenomen.
- Echte AI-functionaliteit vereist bij livegang een server-side provider/API-configuratie en beveiligde admin-login.
