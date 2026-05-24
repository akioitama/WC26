export type Venue = {
  id: string;
  name: string;
  city: string;
  country: "USA" | "Mexico" | "Canada";
  capacity: number;
  matchesHosted: number;
  highlight?: string;
  accent: string;
};

export const VENUES_2026: Venue[] = [
  { id: "metlife", name: "MetLife Stadium", city: "New York/New Jersey", country: "USA", capacity: 82500, matchesHosted: 8, highlight: "Final, 19 July 2026", accent: "#0A3161" },
  { id: "azteca", name: "Estadio Azteca", city: "Mexico City", country: "Mexico", capacity: 83264, matchesHosted: 5, highlight: "Opening match", accent: "#006847" },
  { id: "att", name: "AT&T Stadium", city: "Dallas (Arlington)", country: "USA", capacity: 80000, matchesHosted: 9, highlight: "Most matches in 2026", accent: "#002244" },
  { id: "sofi", name: "SoFi Stadium", city: "Los Angeles (Inglewood)", country: "USA", capacity: 70240, matchesHosted: 8, accent: "#FFC72C" },
  { id: "gillette", name: "Gillette Stadium", city: "Boston (Foxborough)", country: "USA", capacity: 64628, matchesHosted: 7, accent: "#0033A0" },
  { id: "mb", name: "Mercedes-Benz Stadium", city: "Atlanta", country: "USA", capacity: 71000, matchesHosted: 8, accent: "#A71930" },
  { id: "bmo", name: "BMO Field", city: "Toronto", country: "Canada", capacity: 45736, matchesHosted: 6, highlight: "First WC match in Canada", accent: "#FF0000" },
  { id: "bcplace", name: "BC Place", city: "Vancouver", country: "Canada", capacity: 54500, matchesHosted: 7, accent: "#A6192E" },
  { id: "lincoln", name: "Lincoln Financial Field", city: "Philadelphia", country: "USA", capacity: 67594, matchesHosted: 6, accent: "#004C54" },
  { id: "lumen", name: "Lumen Field", city: "Seattle", country: "USA", capacity: 68740, matchesHosted: 6, accent: "#69BE28" },
  { id: "levi", name: "Levi's Stadium", city: "San Francisco Bay Area", country: "USA", capacity: 68500, matchesHosted: 6, accent: "#AA0000" },
  { id: "nrg", name: "NRG Stadium", city: "Houston", country: "USA", capacity: 72220, matchesHosted: 7, accent: "#03202F" },
  { id: "arrowhead", name: "Arrowhead Stadium", city: "Kansas City", country: "USA", capacity: 76416, matchesHosted: 6, accent: "#E31837" },
  { id: "hmt", name: "Hard Rock Stadium", city: "Miami Gardens", country: "USA", capacity: 64767, matchesHosted: 7, accent: "#F58220" },
  { id: "akron", name: "Estadio Akron", city: "Guadalajara", country: "Mexico", capacity: 49850, matchesHosted: 4, accent: "#CC2229" },
  { id: "monterrey", name: "Estadio BBVA", city: "Monterrey", country: "Mexico", capacity: 53500, matchesHosted: 4, accent: "#0A3F8C" },
];
