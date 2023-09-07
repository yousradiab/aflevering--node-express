# Artist App

Artist App er en webbaseret applikation til administrering af kunstnere. Den inkluderer både et RESTful API til håndtering af kunstnerdata og en brugergrænseflade (UI) til at interagere med disse data.

## Funktioner

### REST API (server)

- **Kunstneradministration:**
  - Oprettelse, læsning, opdatering og sletning af kunstnere.
  - Hentning af en enkelt kunstner baseret på id.
  - JSON-datakommunikation med klientapplikationen.

### Webapplikation (klient)

- **Brugervenlig grænseflade:**
  - HTML-side med knapper, formularer og navigation.
  - Oprettelse, opdatering, sletning og visning af kunstnere.
  - Filtrering og søgning efter kunstnere.
  - Navigering mellem "Home Page" og "Favorites" (liked artists).

## Krav

- Node.js-server til at betjene REST API'et.
- Webbrowser til brug af klientapplikationen.

## Installation

1. Download eller klon dette repository.
2. Åbn en terminal og naviger til projektets rodmappe.
3. Kør `npm install` for at installere dependencies.
4. Start serveren med `npm start`.
5. Åbn en webbrowser og besøg `http://localhost:4333` for at bruge klientapplikationen.

## Brug

- Gennemse kunstnere på "Home Page."
- Tilføj kunstnere til "Favorites" ved at klikke på hjerteikonet (liked artists).
- Opret nye kunstnere ved at klikke på "CREATE ARTIST."
- Opdater kunstneroplysninger ved at klikke på "UPDATE" under hver kunstners detaljer.
- Slet kunstnere ved at klikke på "DELETE" under hver kunstners detaljer.
- Brug filter og søgning til at finde specifikke kunstnere.

## Autor

Dette projekt blev udviklet af Yousra Diab.

## Supplerende Bemærkninger

- Dialogelementer bruges til interaktive oprettelses-, opdaterings- og sletningsfunktioner.
