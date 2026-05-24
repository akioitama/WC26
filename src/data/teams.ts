import type { GroupLetter } from "@/lib/types";

export type TeamHistoryEntry = {
  year: number;
  host: string;
  result:
    | "Champions"
    | "Runners-up"
    | "Third"
    | "Fourth"
    | "Quarter-finals"
    | "Round of 16"
    | "Round of 32"
    | "Group stage"
    | "Did not qualify";
  notes?: string;
};

export type Player = {
  name: string;
  role: "GK" | "DF" | "MF" | "FW";
  number?: number;
  caps?: number;
  club?: string;
};

export type Legend = {
  name: string;
  era: string;
  honour: string;
};

export type Team = {
  slug: string;
  name: string;
  fifaCode: string;
  confederation: "UEFA" | "CONMEBOL" | "CONCACAF" | "CAF" | "AFC" | "OFC";
  group2026?: GroupLetter;
  colors: {
    primary: string;
    secondary: string;
    trim: string;
  };
  manager?: string;
  fifaRank?: number;
  elo: number;
  worldCup: {
    appearances: number;
    titles: number;
    bestFinish: TeamHistoryEntry["result"];
    history: TeamHistoryEntry[];
  };
  keyPlayers: Player[];
  legends: Legend[];
  story: string;
  motto?: string;
};

export const TEAMS: Team[] = [
  {
    slug: "argentina",
    name: "Argentina",
    fifaCode: "ARG",
    confederation: "CONMEBOL",
    group2026: "J",
    colors: { primary: "#75AADB", secondary: "#FFFFFF", trim: "#0E1A40" },
    manager: "Lionel Scaloni",
    fifaRank: 1,
    elo: 2120,
    worldCup: {
      appearances: 19,
      titles: 3,
      bestFinish: "Champions",
      history: [
        { year: 2022, host: "Qatar", result: "Champions", notes: "Messi crowned in Lusail." },
        { year: 1986, host: "Mexico", result: "Champions", notes: "Maradona’s tournament." },
        { year: 1978, host: "Argentina", result: "Champions" },
        { year: 2014, host: "Brazil", result: "Runners-up" },
        { year: 1990, host: "Italy", result: "Runners-up" },
        { year: 1930, host: "Uruguay", result: "Runners-up" },
      ],
    },
    keyPlayers: [
      { name: "Lionel Messi", role: "FW", number: 10, club: "Inter Miami" },
      { name: "Emiliano Martínez", role: "GK", number: 23, club: "Aston Villa" },
      { name: "Lautaro Martínez", role: "FW", number: 22, club: "Inter" },
      { name: "Alexis Mac Allister", role: "MF", number: 20, club: "Liverpool" },
      { name: "Cristian Romero", role: "DF", number: 13, club: "Tottenham" },
    ],
    legends: [
      { name: "Diego Maradona", era: "1977–1994", honour: "Hand of God, 1986 talisman" },
      { name: "Mario Kempes", era: "1973–1985", honour: "1978 Golden Boot" },
      { name: "Daniel Passarella", era: "1976–1986", honour: "Two-time champion captain" },
    ],
    story:
      "From La Albiceleste’s 1978 home triumph to Maradona’s 1986 solo, ending in Lusail with Messi’s long-awaited star.",
    motto: "Vamos, vamos Argentina",
  },
  {
    slug: "brazil",
    name: "Brazil",
    fifaCode: "BRA",
    confederation: "CONMEBOL",
    group2026: "C",
    colors: { primary: "#FFCC00", secondary: "#0E5E2D", trim: "#002776" },
    manager: "Dorival Júnior",
    fifaRank: 5,
    elo: 2090,
    worldCup: {
      appearances: 22,
      titles: 5,
      bestFinish: "Champions",
      history: [
        { year: 2002, host: "Korea/Japan", result: "Champions", notes: "Ronaldo, Rivaldo, Ronaldinho." },
        { year: 1994, host: "United States", result: "Champions" },
        { year: 1970, host: "Mexico", result: "Champions", notes: "Pelé’s third star." },
        { year: 1962, host: "Chile", result: "Champions" },
        { year: 1958, host: "Sweden", result: "Champions", notes: "17-year-old Pelé." },
        { year: 1998, host: "France", result: "Runners-up" },
        { year: 1950, host: "Brazil", result: "Runners-up", notes: "The Maracanazo." },
      ],
    },
    keyPlayers: [
      { name: "Vinícius Júnior", role: "FW", number: 7, club: "Real Madrid" },
      { name: "Rodrygo", role: "FW", number: 11, club: "Real Madrid" },
      { name: "Alisson", role: "GK", number: 1, club: "Liverpool" },
      { name: "Marquinhos", role: "DF", number: 4, club: "PSG" },
      { name: "Bruno Guimarães", role: "MF", number: 8, club: "Newcastle" },
    ],
    legends: [
      { name: "Pelé", era: "1957–1971", honour: "Three-time champion, 77 international goals" },
      { name: "Ronaldo (R9)", era: "1994–2011", honour: "2002 Golden Boot, 15 WC goals" },
      { name: "Garrincha", era: "1955–1966", honour: "1962 Golden Ball, joy of football" },
    ],
    story:
      "The only nation to play every World Cup. Five stars, samba football, and the original yellow-and-blue magic.",
    motto: "Ordem e Progresso",
  },
  {
    slug: "germany",
    name: "Germany",
    fifaCode: "GER",
    confederation: "UEFA",
    group2026: "E",
    colors: { primary: "#000000", secondary: "#FFFFFF", trim: "#FFCC00" },
    manager: "Julian Nagelsmann",
    fifaRank: 10,
    elo: 1995,
    worldCup: {
      appearances: 20,
      titles: 4,
      bestFinish: "Champions",
      history: [
        { year: 2014, host: "Brazil", result: "Champions", notes: "7–1 Mineirazo, Götze’s final." },
        { year: 1990, host: "Italy", result: "Champions" },
        { year: 1974, host: "West Germany", result: "Champions" },
        { year: 1954, host: "Switzerland", result: "Champions", notes: "Miracle of Bern." },
        { year: 2006, host: "Germany", result: "Third", notes: "A summer fairytale." },
        { year: 2002, host: "Korea/Japan", result: "Runners-up" },
      ],
    },
    keyPlayers: [
      { name: "Florian Wirtz", role: "MF", number: 17, club: "Bayer Leverkusen" },
      { name: "Jamal Musiala", role: "MF", number: 10, club: "Bayern Munich" },
      { name: "Manuel Neuer", role: "GK", number: 1, club: "Bayern Munich" },
      { name: "Joshua Kimmich", role: "MF", number: 6, club: "Bayern Munich" },
      { name: "Kai Havertz", role: "FW", number: 7, club: "Arsenal" },
    ],
    legends: [
      { name: "Franz Beckenbauer", era: "1965–1977", honour: "Captain ’74, Manager ’90" },
      { name: "Gerd Müller", era: "1966–1974", honour: "1974 final goal, 14 WC goals" },
      { name: "Miroslav Klose", era: "2001–2014", honour: "All-time WC top scorer (16)" },
    ],
    story:
      "Tournament football personified. Hosted 2006’s ‘summer fairytale’ and lifted four stars across seven decades.",
    motto: "Schwarz-Rot-Gold",
  },
  {
    slug: "france",
    name: "France",
    fifaCode: "FRA",
    confederation: "UEFA",
    group2026: "I",
    colors: { primary: "#0055A4", secondary: "#FFFFFF", trim: "#EF4135" },
    manager: "Didier Deschamps",
    fifaRank: 2,
    elo: 2080,
    worldCup: {
      appearances: 16,
      titles: 2,
      bestFinish: "Champions",
      history: [
        { year: 2018, host: "Russia", result: "Champions", notes: "Mbappé arrives." },
        { year: 1998, host: "France", result: "Champions", notes: "Zidane double in the final." },
        { year: 2022, host: "Qatar", result: "Runners-up", notes: "Mbappé hat-trick in defeat." },
        { year: 2006, host: "Germany", result: "Runners-up", notes: "Zidane’s last dance." },
        { year: 1958, host: "Sweden", result: "Third" },
        { year: 1986, host: "Mexico", result: "Third" },
      ],
    },
    keyPlayers: [
      { name: "Kylian Mbappé", role: "FW", number: 10, club: "Real Madrid" },
      { name: "Antoine Griezmann", role: "FW", number: 7, club: "Atlético" },
      { name: "Aurélien Tchouaméni", role: "MF", number: 8, club: "Real Madrid" },
      { name: "William Saliba", role: "DF", number: 4, club: "Arsenal" },
      { name: "Mike Maignan", role: "GK", number: 16, club: "Milan" },
    ],
    legends: [
      { name: "Zinedine Zidane", era: "1994–2006", honour: "1998 final brace" },
      { name: "Michel Platini", era: "1976–1987", honour: "Three Ballons d’Or" },
      { name: "Just Fontaine", era: "1953–1960", honour: "13 goals in one WC (1958)" },
    ],
    story:
      "From Platini’s magic to Zidane in Berlin to Mbappé’s hat-trick in Lusail — France produces decade-defining talents.",
    motto: "Allez les Bleus",
  },
  {
    slug: "italy",
    name: "Italy",
    fifaCode: "ITA",
    confederation: "UEFA",
    group2026: "H",
    colors: { primary: "#003399", secondary: "#FFFFFF", trim: "#FFD700" },
    manager: "Luciano Spalletti",
    fifaRank: 9,
    elo: 1880,
    worldCup: {
      appearances: 18,
      titles: 4,
      bestFinish: "Champions",
      history: [
        { year: 2006, host: "Germany", result: "Champions", notes: "Berlin, on penalties vs France." },
        { year: 1982, host: "Spain", result: "Champions", notes: "Paolo Rossi golden tournament." },
        { year: 1938, host: "France", result: "Champions" },
        { year: 1934, host: "Italy", result: "Champions" },
        { year: 1994, host: "United States", result: "Runners-up", notes: "Baggio’s skied penalty." },
        { year: 1970, host: "Mexico", result: "Runners-up" },
      ],
    },
    keyPlayers: [
      { name: "Gianluigi Donnarumma", role: "GK", number: 1, club: "PSG" },
      { name: "Federico Chiesa", role: "FW", number: 14, club: "Liverpool" },
      { name: "Nicolò Barella", role: "MF", number: 18, club: "Inter" },
      { name: "Alessandro Bastoni", role: "DF", number: 23, club: "Inter" },
    ],
    legends: [
      { name: "Fabio Cannavaro", era: "1997–2010", honour: "Captain ’06, Ballon d’Or" },
      { name: "Paolo Maldini", era: "1988–2002", honour: "Defensive masterclass" },
      { name: "Roberto Baggio", era: "1988–2004", honour: "Three-time WC scorer" },
    ],
    story:
      "Catenaccio’s home and a four-time champion. Berlin 2006 was the spiritual peak — Cannavaro lifting the cup in his 100th cap.",
    motto: "Forza Azzurri",
  },
  {
    slug: "spain",
    name: "Spain",
    fifaCode: "ESP",
    confederation: "UEFA",
    group2026: "H",
    colors: { primary: "#AA151B", secondary: "#F1BF00", trim: "#000000" },
    manager: "Luis de la Fuente",
    fifaRank: 8,
    elo: 2010,
    worldCup: {
      appearances: 16,
      titles: 1,
      bestFinish: "Champions",
      history: [
        { year: 2010, host: "South Africa", result: "Champions", notes: "Iniesta’s 116th-minute winner." },
        { year: 1950, host: "Brazil", result: "Fourth" },
        { year: 2018, host: "Russia", result: "Round of 16" },
      ],
    },
    keyPlayers: [
      { name: "Lamine Yamal", role: "FW", number: 19, club: "Barcelona" },
      { name: "Rodri", role: "MF", number: 16, club: "Manchester City" },
      { name: "Pedri", role: "MF", number: 8, club: "Barcelona" },
      { name: "Nico Williams", role: "FW", number: 17, club: "Athletic" },
      { name: "Unai Simón", role: "GK", number: 23, club: "Athletic" },
    ],
    legends: [
      { name: "Andrés Iniesta", era: "2006–2018", honour: "2010 final winner" },
      { name: "Xavi Hernández", era: "2000–2014", honour: "Tiki-taka conductor" },
      { name: "Iker Casillas", era: "2000–2014", honour: "2010 winning captain" },
    ],
    story: "Tiki-taka in its purest form delivered La Roja’s first star in Johannesburg, 2010.",
    motto: "Roja y Amarilla",
  },
  {
    slug: "england",
    name: "England",
    fifaCode: "ENG",
    confederation: "UEFA",
    group2026: "L",
    colors: { primary: "#FFFFFF", secondary: "#1E1E1E", trim: "#CE1124" },
    manager: "Thomas Tuchel",
    fifaRank: 4,
    elo: 2020,
    worldCup: {
      appearances: 16,
      titles: 1,
      bestFinish: "Champions",
      history: [
        { year: 1966, host: "England", result: "Champions", notes: "Hurst hat-trick at Wembley." },
        { year: 1990, host: "Italy", result: "Fourth", notes: "Gazza’s tears." },
        { year: 2018, host: "Russia", result: "Fourth" },
        { year: 2022, host: "Qatar", result: "Quarter-finals" },
      ],
    },
    keyPlayers: [
      { name: "Harry Kane", role: "FW", number: 9, club: "Bayern Munich" },
      { name: "Jude Bellingham", role: "MF", number: 10, club: "Real Madrid" },
      { name: "Phil Foden", role: "MF", number: 11, club: "Manchester City" },
      { name: "Bukayo Saka", role: "FW", number: 7, club: "Arsenal" },
      { name: "Jordan Pickford", role: "GK", number: 1, club: "Everton" },
    ],
    legends: [
      { name: "Bobby Moore", era: "1962–1973", honour: "1966 winning captain" },
      { name: "Sir Geoff Hurst", era: "1966–1972", honour: "Only WC final hat-trick" },
      { name: "Wayne Rooney", era: "2003–2018", honour: "All-time top scorer" },
    ],
    story: "Football’s home, with one star — and a generation of nearly men chasing the second.",
    motto: "Three Lions",
  },
  {
    slug: "portugal",
    name: "Portugal",
    fifaCode: "POR",
    confederation: "UEFA",
    group2026: "K",
    colors: { primary: "#006600", secondary: "#FF0000", trim: "#FFD700" },
    manager: "Roberto Martínez",
    fifaRank: 6,
    elo: 2030,
    worldCup: {
      appearances: 9,
      titles: 0,
      bestFinish: "Third",
      history: [
        { year: 1966, host: "England", result: "Third", notes: "Eusébio’s tournament." },
        { year: 2006, host: "Germany", result: "Fourth" },
        { year: 2022, host: "Qatar", result: "Quarter-finals" },
      ],
    },
    keyPlayers: [
      { name: "Cristiano Ronaldo", role: "FW", number: 7, club: "Al-Nassr" },
      { name: "Bruno Fernandes", role: "MF", number: 8, club: "Manchester United" },
      { name: "Bernardo Silva", role: "MF", number: 10, club: "Manchester City" },
      { name: "Rúben Dias", role: "DF", number: 4, club: "Manchester City" },
    ],
    legends: [
      { name: "Eusébio", era: "1961–1973", honour: "1966 Golden Boot" },
      { name: "Luís Figo", era: "1991–2006", honour: "2000 Ballon d’Or" },
    ],
    story: "From Eusébio’s 1966 to Ronaldo’s sixth WC at 41, Portugal turns flair into folklore.",
    motto: "A Selecção das Quinas",
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    fifaCode: "NED",
    confederation: "UEFA",
    group2026: "F",
    colors: { primary: "#FF6B00", secondary: "#000000", trim: "#FFFFFF" },
    manager: "Ronald Koeman",
    fifaRank: 7,
    elo: 1985,
    worldCup: {
      appearances: 11,
      titles: 0,
      bestFinish: "Runners-up",
      history: [
        { year: 1974, host: "West Germany", result: "Runners-up", notes: "Total Football revolution." },
        { year: 1978, host: "Argentina", result: "Runners-up" },
        { year: 2010, host: "South Africa", result: "Runners-up" },
        { year: 2014, host: "Brazil", result: "Third" },
      ],
    },
    keyPlayers: [
      { name: "Virgil van Dijk", role: "DF", number: 4, club: "Liverpool" },
      { name: "Frenkie de Jong", role: "MF", number: 21, club: "Barcelona" },
      { name: "Cody Gakpo", role: "FW", number: 11, club: "Liverpool" },
      { name: "Memphis Depay", role: "FW", number: 10, club: "Corinthians" },
    ],
    legends: [
      { name: "Johan Cruyff", era: "1966–1977", honour: "Total Football icon" },
      { name: "Marco van Basten", era: "1983–1992", honour: "1988 Euros volley" },
    ],
    story: "Inventors of Total Football. Three finals, no stars — yet the most influential losers in football history.",
    motto: "Oranje boven",
  },
  {
    slug: "belgium",
    name: "Belgium",
    fifaCode: "BEL",
    confederation: "UEFA",
    group2026: "G",
    colors: { primary: "#000000", secondary: "#FAE042", trim: "#ED2939" },
    manager: "Domenico Tedesco",
    fifaRank: 12,
    elo: 1900,
    worldCup: {
      appearances: 14,
      titles: 0,
      bestFinish: "Third",
      history: [
        { year: 2018, host: "Russia", result: "Third", notes: "Golden generation peak." },
        { year: 1986, host: "Mexico", result: "Fourth" },
      ],
    },
    keyPlayers: [
      { name: "Kevin De Bruyne", role: "MF", number: 7, club: "Manchester City" },
      { name: "Romelu Lukaku", role: "FW", number: 9, club: "Napoli" },
      { name: "Thibaut Courtois", role: "GK", number: 1, club: "Real Madrid" },
    ],
    legends: [
      { name: "Eden Hazard", era: "2008–2022", honour: "Golden generation leader" },
      { name: "Jean-Marie Pfaff", era: "1976–1989", honour: "1986 fourth-place keeper" },
    ],
    story: "The golden generation that came so close — and the next one trying to finish the job.",
    motto: "De Rode Duivels",
  },
  {
    slug: "croatia",
    name: "Croatia",
    fifaCode: "CRO",
    confederation: "UEFA",
    group2026: "L",
    colors: { primary: "#D32F2F", secondary: "#FFFFFF", trim: "#1B3F8B" },
    manager: "Zlatko Dalić",
    fifaRank: 11,
    elo: 1895,
    worldCup: {
      appearances: 6,
      titles: 0,
      bestFinish: "Runners-up",
      history: [
        { year: 2018, host: "Russia", result: "Runners-up", notes: "Modrić’s tournament." },
        { year: 2022, host: "Qatar", result: "Third" },
        { year: 1998, host: "France", result: "Third" },
      ],
    },
    keyPlayers: [
      { name: "Luka Modrić", role: "MF", number: 10, club: "Milan" },
      { name: "Joško Gvardiol", role: "DF", number: 20, club: "Manchester City" },
      { name: "Mateo Kovačić", role: "MF", number: 8, club: "Manchester City" },
    ],
    legends: [
      { name: "Davor Šuker", era: "1990–2002", honour: "1998 Golden Boot" },
      { name: "Luka Modrić", era: "2006–", honour: "2018 Golden Ball" },
    ],
    story: "A nation of four million reaching two semi-finals and a final in eight years. Pure midfield mastery.",
    motto: "Vatreni",
  },
  {
    slug: "uruguay",
    name: "Uruguay",
    fifaCode: "URU",
    confederation: "CONMEBOL",
    group2026: "H",
    colors: { primary: "#5DADE2", secondary: "#FFFFFF", trim: "#1A1A1A" },
    manager: "Marcelo Bielsa",
    fifaRank: 14,
    elo: 1965,
    worldCup: {
      appearances: 14,
      titles: 2,
      bestFinish: "Champions",
      history: [
        { year: 1950, host: "Brazil", result: "Champions", notes: "The Maracanazo." },
        { year: 1930, host: "Uruguay", result: "Champions", notes: "First-ever WC." },
        { year: 2010, host: "South Africa", result: "Fourth" },
      ],
    },
    keyPlayers: [
      { name: "Federico Valverde", role: "MF", number: 15, club: "Real Madrid" },
      { name: "Darwin Núñez", role: "FW", number: 19, club: "Liverpool" },
      { name: "Ronald Araújo", role: "DF", number: 4, club: "Barcelona" },
    ],
    legends: [
      { name: "Diego Forlán", era: "2002–2014", honour: "2010 Golden Ball" },
      { name: "Luis Suárez", era: "2007–", honour: "All-time top scorer" },
    ],
    story: "First-ever world champions in 1930. Garra Charrúa — a fight that defines a country.",
    motto: "La Celeste",
  },
  {
    slug: "morocco",
    name: "Morocco",
    fifaCode: "MAR",
    confederation: "CAF",
    group2026: "C",
    colors: { primary: "#C1272D", secondary: "#006233", trim: "#FFFFFF" },
    manager: "Walid Regragui",
    fifaRank: 13,
    elo: 1850,
    worldCup: {
      appearances: 6,
      titles: 0,
      bestFinish: "Fourth",
      history: [
        { year: 2022, host: "Qatar", result: "Fourth", notes: "First African semi-finalists." },
        { year: 1986, host: "Mexico", result: "Round of 16", notes: "First Arab/African team to top a group." },
      ],
    },
    keyPlayers: [
      { name: "Achraf Hakimi", role: "DF", number: 2, club: "PSG" },
      { name: "Hakim Ziyech", role: "MF", number: 7, club: "Al-Duhail" },
      { name: "Yassine Bounou", role: "GK", number: 1, club: "Al-Hilal" },
    ],
    legends: [
      { name: "Mustapha Hadji", era: "1992–2002", honour: "1998 African Footballer of the Year" },
    ],
    story: "Qatar 2022 changed everything — the Atlas Lions roared into a semi-final and rewrote African football.",
    motto: "أسود الأطلس",
  },
  {
    slug: "japan",
    name: "Japan",
    fifaCode: "JPN",
    confederation: "AFC",
    group2026: "F",
    colors: { primary: "#000F66", secondary: "#FFFFFF", trim: "#BC002D" },
    manager: "Hajime Moriyasu",
    fifaRank: 17,
    elo: 1830,
    worldCup: {
      appearances: 7,
      titles: 0,
      bestFinish: "Round of 16",
      history: [
        { year: 2022, host: "Qatar", result: "Round of 16", notes: "Beat Germany & Spain in groups." },
        { year: 2018, host: "Russia", result: "Round of 16" },
        { year: 2010, host: "South Africa", result: "Round of 16" },
      ],
    },
    keyPlayers: [
      { name: "Takefusa Kubo", role: "FW", number: 7, club: "Real Sociedad" },
      { name: "Wataru Endō", role: "MF", number: 6, club: "Liverpool" },
      { name: "Kaoru Mitoma", role: "FW", number: 9, club: "Brighton" },
    ],
    legends: [
      { name: "Hidetoshi Nakata", era: "1995–2006", honour: "Symbol of Japanese football" },
    ],
    story: "Asia’s most consistent giant-killers. Beat Germany and Spain in Qatar and never stopped chasing the eighth round.",
    motto: "Samurai Blue",
  },
  {
    slug: "senegal",
    name: "Senegal",
    fifaCode: "SEN",
    confederation: "CAF",
    group2026: "I",
    colors: { primary: "#00853F", secondary: "#FDEF42", trim: "#E31B23" },
    manager: "Pape Thiaw",
    fifaRank: 18,
    elo: 1810,
    worldCup: {
      appearances: 4,
      titles: 0,
      bestFinish: "Quarter-finals",
      history: [
        { year: 2002, host: "Korea/Japan", result: "Quarter-finals", notes: "Beat France on debut." },
        { year: 2022, host: "Qatar", result: "Round of 16" },
      ],
    },
    keyPlayers: [
      { name: "Sadio Mané", role: "FW", number: 10, club: "Al-Nassr" },
      { name: "Édouard Mendy", role: "GK", number: 16, club: "Al-Ahli" },
      { name: "Kalidou Koulibaly", role: "DF", number: 3, club: "Al-Hilal" },
    ],
    legends: [
      { name: "El Hadji Diouf", era: "1999–2009", honour: "2002 Bronze Ball" },
    ],
    story: "Stunned France on debut in 2002 and became Africa’s most exciting export ever since.",
    motto: "Lions de la Teranga",
  },
  {
    slug: "mexico",
    name: "Mexico",
    fifaCode: "MEX",
    confederation: "CONCACAF",
    group2026: "A",
    colors: { primary: "#006847", secondary: "#FFFFFF", trim: "#CE1126" },
    manager: "Javier Aguirre",
    fifaRank: 15,
    elo: 1810,
    worldCup: {
      appearances: 17,
      titles: 0,
      bestFinish: "Quarter-finals",
      history: [
        { year: 1970, host: "Mexico", result: "Quarter-finals" },
        { year: 1986, host: "Mexico", result: "Quarter-finals" },
      ],
    },
    keyPlayers: [
      { name: "Edson Álvarez", role: "MF", number: 4, club: "West Ham" },
      { name: "Hirving Lozano", role: "FW", number: 22, club: "PSV" },
      { name: "Santiago Giménez", role: "FW", number: 9, club: "Feyenoord" },
    ],
    legends: [
      { name: "Hugo Sánchez", era: "1977–1994", honour: "Mexican icon" },
      { name: "Rafael Márquez", era: "1997–2018", honour: "Five-time WC captain" },
    ],
    story: "Co-host in 1970, 1986 and 2026. The only nation to host three World Cups.",
    motto: "El Tri",
  },
  {
    slug: "united-states",
    name: "United States",
    fifaCode: "USA",
    confederation: "CONCACAF",
    group2026: "D",
    colors: { primary: "#0A3161", secondary: "#FFFFFF", trim: "#B31942" },
    manager: "Mauricio Pochettino",
    fifaRank: 16,
    elo: 1790,
    worldCup: {
      appearances: 11,
      titles: 0,
      bestFinish: "Third",
      history: [
        { year: 1930, host: "Uruguay", result: "Third" },
        { year: 2002, host: "Korea/Japan", result: "Quarter-finals" },
      ],
    },
    keyPlayers: [
      { name: "Christian Pulisic", role: "FW", number: 10, club: "Milan" },
      { name: "Tyler Adams", role: "MF", number: 4, club: "Bournemouth" },
      { name: "Weston McKennie", role: "MF", number: 8, club: "Juventus" },
    ],
    legends: [{ name: "Landon Donovan", era: "2000–2014", honour: "All-time icon" }],
    story: "Hosts of 2026. The biggest tournament in history opens on home soil.",
    motto: "USMNT",
  },
  {
    slug: "canada",
    name: "Canada",
    fifaCode: "CAN",
    confederation: "CONCACAF",
    group2026: "B",
    colors: { primary: "#FF0000", secondary: "#FFFFFF", trim: "#1A1A1A" },
    manager: "Jesse Marsch",
    fifaRank: 30,
    elo: 1700,
    worldCup: {
      appearances: 3,
      titles: 0,
      bestFinish: "Group stage",
      history: [
        { year: 2022, host: "Qatar", result: "Group stage", notes: "First WC in 36 years." },
        { year: 1986, host: "Mexico", result: "Group stage" },
      ],
    },
    keyPlayers: [
      { name: "Alphonso Davies", role: "DF", number: 19, club: "Bayern Munich" },
      { name: "Jonathan David", role: "FW", number: 20, club: "Juventus" },
    ],
    legends: [],
    story: "Co-host of 2026, with a generation as exciting as any in Canadian sport.",
    motto: "Les Rouges",
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    fifaCode: "SUI",
    confederation: "UEFA",
    group2026: "B",
    colors: { primary: "#D52B1E", secondary: "#FFFFFF", trim: "#1A1A1A" },
    elo: 1820,
    worldCup: {
      appearances: 12,
      titles: 0,
      bestFinish: "Quarter-finals",
      history: [
        { year: 1934, host: "Italy", result: "Quarter-finals" },
        { year: 1954, host: "Switzerland", result: "Quarter-finals" },
      ],
    },
    keyPlayers: [
      { name: "Granit Xhaka", role: "MF", number: 10, club: "Leverkusen" },
      { name: "Manuel Akanji", role: "DF", number: 5, club: "Manchester City" },
    ],
    legends: [],
    story: "Tournament regulars who specialise in being a problem nobody wants in their group.",
  },
  {
    slug: "south-korea",
    name: "South Korea",
    fifaCode: "KOR",
    confederation: "AFC",
    group2026: "A",
    colors: { primary: "#CD2E3A", secondary: "#FFFFFF", trim: "#0047A0" },
    elo: 1790,
    worldCup: {
      appearances: 11,
      titles: 0,
      bestFinish: "Fourth",
      history: [
        { year: 2002, host: "Korea/Japan", result: "Fourth", notes: "Beat Italy & Spain on home soil." },
      ],
    },
    keyPlayers: [
      { name: "Heung-min Son", role: "FW", number: 7, club: "Tottenham" },
      { name: "Lee Kang-in", role: "MF", number: 18, club: "PSG" },
    ],
    legends: [{ name: "Park Ji-sung", era: "2000–2011", honour: "2002 fourth-place hero" }],
    story: "Asia’s most consistent contender, with a 2002 fourth-place that still divides opinions.",
    motto: "대한민국",
  },
  {
    slug: "ecuador",
    name: "Ecuador",
    fifaCode: "ECU",
    confederation: "CONMEBOL",
    group2026: "E",
    colors: { primary: "#FFD90F", secondary: "#0033A0", trim: "#EF3340" },
    elo: 1750,
    worldCup: {
      appearances: 5,
      titles: 0,
      bestFinish: "Round of 16",
      history: [{ year: 2006, host: "Germany", result: "Round of 16" }],
    },
    keyPlayers: [
      { name: "Moisés Caicedo", role: "MF", number: 23, club: "Chelsea" },
      { name: "Pervis Estupiñán", role: "DF", number: 7, club: "Brighton" },
    ],
    legends: [],
    story: "Andean grit and a midfield engine that powers half of Europe’s top sides.",
  },
  {
    slug: "ivory-coast",
    name: "Ivory Coast",
    fifaCode: "CIV",
    confederation: "CAF",
    group2026: "E",
    colors: { primary: "#F77F00", secondary: "#FFFFFF", trim: "#009E60" },
    elo: 1740,
    worldCup: {
      appearances: 3,
      titles: 0,
      bestFinish: "Group stage",
      history: [{ year: 2010, host: "South Africa", result: "Group stage" }],
    },
    keyPlayers: [
      { name: "Sébastien Haller", role: "FW", number: 9, club: "Dortmund" },
      { name: "Simon Adingra", role: "FW", number: 11, club: "Brighton" },
    ],
    legends: [
      { name: "Didier Drogba", era: "2002–2014", honour: "All-time icon" },
      { name: "Yaya Touré", era: "2004–2015", honour: "Four-time AFCON" },
    ],
    story: "Drogba’s legacy lives on through a generation aiming to finally translate AFCON titles into a deep WC run.",
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    fifaCode: "KSA",
    confederation: "AFC",
    group2026: "H",
    colors: { primary: "#006C35", secondary: "#FFFFFF", trim: "#000000" },
    elo: 1690,
    worldCup: {
      appearances: 7,
      titles: 0,
      bestFinish: "Round of 16",
      history: [
        { year: 1994, host: "United States", result: "Round of 16" },
        { year: 2022, host: "Qatar", result: "Group stage", notes: "Beat eventual champions Argentina." },
      ],
    },
    keyPlayers: [{ name: "Salem Al-Dawsari", role: "MF", number: 10, club: "Al-Hilal" }],
    legends: [],
    story: "The team that beat the team that won it all — Lusail, 22 November 2022.",
  },
  {
    slug: "egypt",
    name: "Egypt",
    fifaCode: "EGY",
    confederation: "CAF",
    group2026: "G",
    colors: { primary: "#CE1126", secondary: "#FFFFFF", trim: "#000000" },
    elo: 1750,
    worldCup: {
      appearances: 3,
      titles: 0,
      bestFinish: "Group stage",
      history: [{ year: 2018, host: "Russia", result: "Group stage" }],
    },
    keyPlayers: [{ name: "Mohamed Salah", role: "FW", number: 10, club: "Liverpool" }],
    legends: [],
    story: "Salah-led Pharaohs back on the world stage with a generation hungry to make up for lost time.",
  },
  // ---- Lighter entries: still real, just less narrative ----
  basicTeam("south-africa", "South Africa", "RSA", "CAF", "A", "#007749", "#FFB81C", "#000000", 1660, 3),
  basicTeam("czech-republic", "Czech Republic", "CZE", "UEFA", "A", "#11457E", "#D7141A", "#FFFFFF", 1750, 9),
  basicTeam("bosnia-and-herzegovina", "Bosnia & Herzegovina", "BIH", "UEFA", "B", "#FFCC00", "#1F3F8B", "#FFFFFF", 1700, 1),
  basicTeam("qatar", "Qatar", "QAT", "AFC", "B", "#8A1538", "#FFFFFF", "#000000", 1620, 1),
  basicTeam("haiti", "Haiti", "HAI", "CONCACAF", "C", "#00209F", "#D21034", "#FFFFFF", 1500, 2),
  basicTeam("scotland", "Scotland", "SCO", "UEFA", "C", "#0065BD", "#FFFFFF", "#FFD700", 1740, 8),
  basicTeam("paraguay", "Paraguay", "PAR", "CONMEBOL", "D", "#DA121A", "#FFFFFF", "#0038A8", 1680, 8),
  basicTeam("australia", "Australia", "AUS", "AFC", "D", "#FFCC00", "#00843D", "#000000", 1700, 6),
  basicTeam("turkey", "Türkiye", "TUR", "UEFA", "D", "#E30A17", "#FFFFFF", "#000000", 1820, 2),
  basicTeam("curacao", "Curaçao", "CUW", "CONCACAF", "E", "#002B7F", "#FCD116", "#FFFFFF", 1490, 1),
  basicTeam("sweden", "Sweden", "SWE", "UEFA", "F", "#006AA7", "#FECC00", "#FFFFFF", 1820, 12),
  basicTeam("tunisia", "Tunisia", "TUN", "CAF", "F", "#E70013", "#FFFFFF", "#000000", 1690, 6),
  basicTeam("iran", "Iran", "IRN", "AFC", "G", "#239F40", "#FFFFFF", "#DA0000", 1730, 6),
  basicTeam("new-zealand", "New Zealand", "NZL", "OFC", "G", "#000000", "#FFFFFF", "#C8102E", 1500, 2),
  basicTeam("cape-verde", "Cape Verde", "CPV", "CAF", "H", "#0052A5", "#FCD116", "#FFFFFF", 1620, 1),
  basicTeam("iraq", "Iraq", "IRQ", "AFC", "I", "#CE1126", "#FFFFFF", "#007A33", 1610, 1),
  basicTeam("norway", "Norway", "NOR", "UEFA", "I", "#BA0C2F", "#FFFFFF", "#00205B", 1820, 3),
  basicTeam("algeria", "Algeria", "ALG", "CAF", "J", "#006633", "#FFFFFF", "#D21034", 1700, 4),
  basicTeam("austria", "Austria", "AUT", "UEFA", "J", "#ED2939", "#FFFFFF", "#000000", 1780, 7),
  basicTeam("jordan", "Jordan", "JOR", "AFC", "J", "#000000", "#FFFFFF", "#CE1126", 1530, 1),
  basicTeam("dr-congo", "DR Congo", "COD", "CAF", "K", "#007FFF", "#F7D618", "#CE1021", 1620, 2),
  basicTeam("uzbekistan", "Uzbekistan", "UZB", "AFC", "K", "#1EB53A", "#FFFFFF", "#0099B5", 1620, 1),
  basicTeam("colombia", "Colombia", "COL", "CONMEBOL", "K", "#FCD116", "#003893", "#CE1126", 1850, 7),
  basicTeam("ghana", "Ghana", "GHA", "CAF", "L", "#CE1126", "#FCD116", "#006B3F", 1650, 4),
  basicTeam("panama", "Panama", "PAN", "CONCACAF", "L", "#005293", "#D21034", "#FFFFFF", 1560, 1),
];

function basicTeam(
  slug: string,
  name: string,
  fifaCode: string,
  confederation: Team["confederation"],
  group2026: GroupLetter,
  primary: string,
  secondary: string,
  trim: string,
  elo: number,
  appearances: number,
): Team {
  return {
    slug,
    name,
    fifaCode,
    confederation,
    group2026,
    colors: { primary, secondary, trim },
    elo,
    worldCup: {
      appearances,
      titles: 0,
      bestFinish: appearances >= 3 ? "Round of 16" : "Group stage",
      history: [],
    },
    keyPlayers: [],
    legends: [],
    story: "",
  };
}

export const TEAMS_BY_SLUG: Record<string, Team> = Object.fromEntries(
  TEAMS.map((t) => [t.slug, t]),
);

export const TEAMS_BY_CODE: Record<string, Team> = Object.fromEntries(
  TEAMS.map((t) => [t.fifaCode, t]),
);

export const TEAMS_BY_NAME: Record<string, Team> = Object.fromEntries(
  TEAMS.map((t) => [t.name, t]),
);

export function teamFromName(name: string): Team | undefined {
  const aliases: Record<string, string> = {
    "Bosnia and Herzegovina": "Bosnia & Herzegovina",
    Turkey: "Türkiye",
  };
  return TEAMS_BY_NAME[aliases[name] ?? name];
}
