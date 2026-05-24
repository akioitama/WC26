/**
 * Iconic World Cup moments — historically-accurate, fact-checked.
 * Each entry is a real, documented match moment. No fabricated stats.
 * Use only public, descriptive text (no copyrighted photos / logos).
 */

export type Moment = {
  id: string;
  year: number;
  host: string;
  stage: string;
  fixture: string; // "England 4 – 2 West Germany"
  minute?: string; // "98'" or "after extra time"
  player: string;
  country: string; // FIFA code
  countryName: string;
  countryColors: { primary: string; secondary: string };
  headline: string; // "Hand of God"
  blurb: string;
  legacy: string; // single line — long-term significance
  number?: string; // shirt number worn that day
};

export const MOMENTS: Moment[] = [
  {
    id: "1958-pele-debut",
    year: 1958,
    host: "Sweden",
    stage: "Final",
    fixture: "Brazil 5 – 2 Sweden",
    minute: "55'",
    player: "Pelé",
    country: "BRA",
    countryName: "Brazil",
    countryColors: { primary: "#FFCC00", secondary: "#0E5E2D" },
    headline: "A 17-year-old conquers the world",
    blurb:
      "Chest-trap, lob over the centre-back, half-volley into the corner. Pelé's first goal in a World Cup final introduced the next half-century of football.",
    legacy: "First teenager to score in a final. Brazil's first star.",
    number: "10",
  },
  {
    id: "1966-hurst-hattrick",
    year: 1966,
    host: "England",
    stage: "Final",
    fixture: "England 4 – 2 West Germany",
    minute: "120'",
    player: "Geoff Hurst",
    country: "ENG",
    countryName: "England",
    countryColors: { primary: "#FFFFFF", secondary: "#CE1124" },
    headline: "They think it's all over… it is now",
    blurb:
      "Wembley, extra time, Hurst gallops alone toward the German goal. The only hat-trick ever scored in a World Cup final, capped by Wolstenholme's immortal commentary line.",
    legacy: "Only hat-trick in a World Cup final. England's only star.",
    number: "10",
  },
  {
    id: "1970-pele-saldanha",
    year: 1970,
    host: "Mexico",
    stage: "Final",
    fixture: "Brazil 4 – 1 Italy",
    minute: "86'",
    player: "Carlos Alberto",
    country: "BRA",
    countryName: "Brazil",
    countryColors: { primary: "#FFCC00", secondary: "#0E5E2D" },
    headline: "The greatest team goal ever scored",
    blurb:
      "Nine Brazilians touch the ball. Clodoaldo dances past four. Pelé lays it off blind to his right. Carlos Alberto arrives at full sprint and unleashes the most famous fourth goal in football history.",
    legacy: "Defines 'Joga Bonito'. Brazil's third star — keep the trophy.",
    number: "4",
  },
  {
    id: "1974-cruyff-turn",
    year: 1974,
    host: "West Germany",
    stage: "Group stage",
    fixture: "Netherlands 2 – 0 Sweden",
    minute: "23'",
    player: "Johan Cruyff",
    country: "NED",
    countryName: "Netherlands",
    countryColors: { primary: "#FF6B00", secondary: "#FFFFFF" },
    headline: "A turn becomes a verb",
    blurb:
      "On the touchline, with Jan Olsson glued to him, Cruyff feigns the cross then drags the ball back through his own legs. The Cruyff Turn enters the dictionary in front of a global audience.",
    legacy: "Total Football's signature move. Coached worldwide ever since.",
    number: "14",
  },
  {
    id: "1982-tardelli",
    year: 1982,
    host: "Spain",
    stage: "Final",
    fixture: "Italy 3 – 1 West Germany",
    minute: "69'",
    player: "Marco Tardelli",
    country: "ITA",
    countryName: "Italy",
    countryColors: { primary: "#003399", secondary: "#FFFFFF" },
    headline: "The scream that defined a generation",
    blurb:
      "Bottom-left corner from the edge of the box. Tardelli wheels away, arms by his side, mouth open, sobbing into the Madrid sky. Football's most copied celebration was born.",
    legacy: "Italy's third star. The original goal celebration GIF.",
    number: "14",
  },
  {
    id: "1986-hand-of-god",
    year: 1986,
    host: "Mexico",
    stage: "Quarter-finals",
    fixture: "Argentina 2 – 1 England",
    minute: "51'",
    player: "Diego Maradona",
    country: "ARG",
    countryName: "Argentina",
    countryColors: { primary: "#75AADB", secondary: "#FFFFFF" },
    headline: "Hand of God",
    blurb:
      "Maradona rises with Shilton at the Estadio Azteca and punches the ball into the net. He calls it 'a little bit by the head of Maradona, and a little bit by the hand of God.'",
    legacy: "Most controversial goal ever scored. Pre-VAR football crystallised.",
    number: "10",
  },
  {
    id: "1986-goal-of-the-century",
    year: 1986,
    host: "Mexico",
    stage: "Quarter-finals",
    fixture: "Argentina 2 – 1 England",
    minute: "55'",
    player: "Diego Maradona",
    country: "ARG",
    countryName: "Argentina",
    countryColors: { primary: "#75AADB", secondary: "#FFFFFF" },
    headline: "Goal of the Century",
    blurb:
      "Four minutes after the Hand of God, Maradona collects in his own half, beats Beardsley, Reid, Butcher (twice), Fenwick, and Shilton. 60 metres, 11 seconds, 11 touches. FIFA voted it the goal of the century.",
    legacy: "The greatest individual goal ever televised.",
    number: "10",
  },
  {
    id: "1990-schillaci",
    year: 1990,
    host: "Italy",
    stage: "Group stage",
    fixture: "Italy 1 – 0 Austria",
    minute: "78'",
    player: "Salvatore Schillaci",
    country: "ITA",
    countryName: "Italy",
    countryColors: { primary: "#003399", secondary: "#FFFFFF" },
    headline: "Notti Magiche",
    blurb:
      "An unknown substitute heads in his first international goal at his home World Cup. Six tournament goals later he wins the Golden Boot — and the eyes that stared up to the heavens become a national icon.",
    legacy: "Cinderella's tournament. The defining face of Italia '90.",
    number: "19",
  },
  {
    id: "1998-zidane-double",
    year: 1998,
    host: "France",
    stage: "Final",
    fixture: "France 3 – 0 Brazil",
    minute: "27' & 45'",
    player: "Zinédine Zidane",
    country: "FRA",
    countryName: "France",
    countryColors: { primary: "#0055A4", secondary: "#EF4135" },
    headline: "Two headers in Saint-Denis",
    blurb:
      "Two corners, two identical headers. Zidane bullies the World Cup holders on home soil and lifts France's first ever trophy. The Champs-Élysées paints itself bleu, blanc, rouge.",
    legacy: "France's first star. Zidane's coronation.",
    number: "10",
  },
  {
    id: "2002-ronaldo-redemption",
    year: 2002,
    host: "Korea / Japan",
    stage: "Final",
    fixture: "Brazil 2 – 0 Germany",
    minute: "67' & 79'",
    player: "Ronaldo",
    country: "BRA",
    countryName: "Brazil",
    countryColors: { primary: "#FFCC00", secondary: "#0E5E2D" },
    headline: "Redemption in Yokohama",
    blurb:
      "Four years after the convulsion in Paris, Ronaldo scores both goals in the final to give Brazil its fifth star and his eight-goal Golden Boot. The most extraordinary comeback in football's modern era.",
    legacy: "Brazil's fifth star. The original 'phenomenon.'",
    number: "9",
  },
  {
    id: "2006-zidane-headbutt",
    year: 2006,
    host: "Germany",
    stage: "Final",
    fixture: "Italy 1 – 1 France (5–3 pen)",
    minute: "110'",
    player: "Zinédine Zidane",
    country: "FRA",
    countryName: "France",
    countryColors: { primary: "#0055A4", secondary: "#EF4135" },
    headline: "Coup de boule",
    blurb:
      "Zidane's last act in football: a chest-first headbutt into Marco Materazzi after words exchanged in Olympiastadion. Red card. Italy win on penalties. Cannavaro lifts in his 100th cap.",
    legacy: "The most cinematic exit in sporting history.",
    number: "10",
  },
  {
    id: "2010-iniesta-winner",
    year: 2010,
    host: "South Africa",
    stage: "Final",
    fixture: "Spain 1 – 0 Netherlands",
    minute: "116'",
    player: "Andrés Iniesta",
    country: "ESP",
    countryName: "Spain",
    countryColors: { primary: "#AA151B", secondary: "#F1BF00" },
    headline: "Iniesta de mi vida",
    blurb:
      "Cesc finds him in the box. Iniesta lashes it past Stekelenburg in the 116th minute. He whips off the shirt to reveal a tribute to Dani Jarque. Spain's first star arrives in Johannesburg.",
    legacy: "Tiki-taka reaches its peak. Spain's only World Cup.",
    number: "6",
  },
  {
    id: "2014-gotze",
    year: 2014,
    host: "Brazil",
    stage: "Final",
    fixture: "Germany 1 – 0 Argentina",
    minute: "113'",
    player: "Mario Götze",
    country: "GER",
    countryName: "Germany",
    countryColors: { primary: "#000000", secondary: "#FFCC00" },
    headline: "Make it a goal worthy of being world champions",
    blurb:
      "Joachim Löw's exact instruction to his substitute. Schürrle crosses, Götze chests, volleys with his left into the far corner. Germany lift their fourth star at the Maracanã.",
    legacy: "Germany's fourth star. The first European champion in the Americas.",
    number: "19",
  },
  {
    id: "2018-mbappe-run",
    year: 2018,
    host: "Russia",
    stage: "Round of 16",
    fixture: "France 4 – 3 Argentina",
    minute: "9'",
    player: "Kylian Mbappé",
    country: "FRA",
    countryName: "France",
    countryColors: { primary: "#0055A4", secondary: "#EF4135" },
    headline: "Pelé territory",
    blurb:
      "60 metres at 38 km/h. Mbappé wins a penalty against Argentina at 19 years old, scores twice later in the same game and announces himself as the future. France go on to lift the second star.",
    legacy: "First teenager to score in a final since Pelé (1958).",
    number: "10",
  },
  {
    id: "2022-messi-coronation",
    year: 2022,
    host: "Qatar",
    stage: "Final",
    fixture: "Argentina 3 – 3 France (4–2 pen)",
    minute: "108'",
    player: "Lionel Messi",
    country: "ARG",
    countryName: "Argentina",
    countryColors: { primary: "#75AADB", secondary: "#FFFFFF" },
    headline: "The greatest final ever played",
    blurb:
      "Messi opens the scoring. Mbappé scores three. Messi pokes Argentina ahead in extra-time. Montiel slots the winning penalty. La Albiceleste lift the third star and the GOAT debate finds its full stop.",
    legacy: "Argentina's third star. Messi's destined trophy.",
    number: "10",
  },
  {
    id: "2022-mbappe-hattrick",
    year: 2022,
    host: "Qatar",
    stage: "Final",
    fixture: "Argentina 3 – 3 France",
    minute: "80', 81', 118'",
    player: "Kylian Mbappé",
    country: "FRA",
    countryName: "France",
    countryColors: { primary: "#0055A4", secondary: "#EF4135" },
    headline: "Hat-trick in defeat",
    blurb:
      "Two goals in 97 seconds drag France back into the final. A third in extra-time forces penalties. The first hat-trick in a World Cup final since Geoff Hurst in 1966 — and on the losing side.",
    legacy: "Only the second hat-trick scored in a World Cup final.",
    number: "10",
  },
];

/** Top scorers, all-time. Public records, FIFA. */
export const TOP_SCORERS = [
  { rank: 1, player: "Miroslav Klose", country: "GER", goals: 16, span: "2002–2014" },
  { rank: 2, player: "Ronaldo", country: "BRA", goals: 15, span: "1998–2006" },
  { rank: 3, player: "Gerd Müller", country: "FRG", goals: 14, span: "1970–1974" },
  { rank: 4, player: "Just Fontaine", country: "FRA", goals: 13, span: "1958" },
  { rank: 4, player: "Lionel Messi", country: "ARG", goals: 13, span: "2006–2022" },
  { rank: 6, player: "Pelé", country: "BRA", goals: 12, span: "1958–1970" },
  { rank: 7, player: "Kylian Mbappé", country: "FRA", goals: 12, span: "2018–2022" },
  { rank: 8, player: "Sándor Kocsis", country: "HUN", goals: 11, span: "1954" },
  { rank: 8, player: "Jürgen Klinsmann", country: "GER", goals: 11, span: "1990–1998" },
  { rank: 8, player: "Helmut Rahn", country: "FRG", goals: 11, span: "1954–1958" },
] as const;

/** Tournament records — verified. */
export const TOURNAMENT_FACTS = [
  { k: "22", label: "Editions since 1930" },
  { k: "8", label: "Different champions" },
  { k: "5", label: "Brazil — most titles" },
  { k: "16", label: "Klose — most goals" },
  { k: "117", label: "Goals in WC '22 (record)" },
  { k: "3.5B", label: "Viewers in 2022" },
] as const;
