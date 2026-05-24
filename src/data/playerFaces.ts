/**
 * Stylised face profiles for animated portraits.
 * Original illustration traits — evocative silhouettes, not photorealistic likenesses.
 */

export type FaceExpression = "smile" | "focus" | "shout" | "calm" | "triumph";
export type FaceAnim = "blink" | "breathe" | "shout" | "grin" | "nod";
export type FaceShape = "oval" | "round" | "angular" | "narrow" | "wide";
export type HairStyle =
  | "short"
  | "curly-short"
  | "curly-messy"
  | "afro"
  | "mullet-70s"
  | "bald-top"
  | "ronaldo-02"
  | "fade"
  | "messi-beard"
  | "blonde-short"
  | "thinning"
  | "wavy-dark"
  | "side-part"
  | "bald"
  | "buzz";

export type FaceProfile = {
  id: string;
  skin: string;
  hairColor: string;
  hair: HairStyle;
  faceShape: FaceShape;
  beard?: boolean;
  stubble?: boolean;
  beardColor?: string;
  brows?: "thick" | "thin" | "bushy" | "arched";
  eyes?: "narrow" | "wide" | "intense";
  eyeColor?: string;
  expression: FaceExpression;
  anim: FaceAnim;
  /** Optional signature trait rendered as extra SVG layer */
  signature?: "messi" | "maradona" | "mbappe" | "ronaldo" | "zidane" | "pele" | "cruyff";
};

const PROFILES: Record<string, FaceProfile> = {
  "Pelé": {
    id: "pele",
    skin: "#c68642",
    hairColor: "#1a1208",
    hair: "curly-short",
    faceShape: "round",
    brows: "thick",
    eyes: "wide",
    eyeColor: "#3d2810",
    expression: "smile",
    anim: "grin",
    signature: "pele",
  },
  "Geoff Hurst": {
    id: "hurst",
    skin: "#e0b896",
    hairColor: "#2a2018",
    hair: "side-part",
    faceShape: "angular",
    expression: "triumph",
    anim: "nod",
  },
  "Carlos Alberto": {
    id: "carlos-alberto",
    skin: "#8d5524",
    hairColor: "#0f0a06",
    hair: "afro",
    faceShape: "oval",
    brows: "thick",
    expression: "triumph",
    anim: "breathe",
  },
  "Johan Cruyff": {
    id: "cruyff",
    skin: "#f0c9a0",
    hairColor: "#c4a574",
    hair: "mullet-70s",
    faceShape: "narrow",
    brows: "thin",
    eyes: "intense",
    eyeColor: "#4a3820",
    expression: "focus",
    anim: "blink",
    signature: "cruyff",
  },
  "Marco Tardelli": {
    id: "tardelli",
    skin: "#d4a574",
    hairColor: "#1a1008",
    hair: "wavy-dark",
    faceShape: "angular",
    brows: "bushy",
    stubble: true,
    expression: "shout",
    anim: "shout",
  },
  "Diego Maradona": {
    id: "maradona",
    skin: "#c68642",
    hairColor: "#0a0806",
    hair: "curly-messy",
    faceShape: "wide",
    brows: "thick",
    eyes: "intense",
    eyeColor: "#1a1008",
    expression: "focus",
    anim: "breathe",
    signature: "maradona",
  },
  "Salvatore Schillaci": {
    id: "schillaci",
    skin: "#d4a574",
    hairColor: "#1a1008",
    hair: "bald-top",
    faceShape: "angular",
    brows: "bushy",
    eyes: "wide",
    stubble: true,
    expression: "shout",
    anim: "shout",
  },
  "Zinédine Zidane": {
    id: "zidane",
    skin: "#c68642",
    hairColor: "#0a0806",
    hair: "bald",
    faceShape: "oval",
    brows: "thin",
    eyes: "narrow",
    eyeColor: "#2a1810",
    expression: "focus",
    anim: "blink",
    signature: "zidane",
  },
  Ronaldo: {
    id: "ronaldo-r9",
    skin: "#8d5524",
    hairColor: "#0a0806",
    hair: "ronaldo-02",
    faceShape: "wide",
    brows: "thick",
    eyes: "wide",
    eyeColor: "#1a1008",
    expression: "triumph",
    anim: "grin",
    signature: "ronaldo",
  },
  "Andrés Iniesta": {
    id: "iniesta",
    skin: "#f0c9a0",
    hairColor: "#3a2818",
    hair: "thinning",
    faceShape: "narrow",
    beard: true,
    beardColor: "#3a2818",
    expression: "calm",
    anim: "breathe",
  },
  "Mario Götze": {
    id: "gotze",
    skin: "#f0c9a0",
    hairColor: "#8a7040",
    hair: "blonde-short",
    faceShape: "oval",
    expression: "focus",
    anim: "blink",
  },
  "Kylian Mbappé": {
    id: "mbappe",
    skin: "#5c3d2e",
    hairColor: "#0a0806",
    hair: "fade",
    faceShape: "round",
    brows: "thick",
    eyes: "intense",
    eyeColor: "#1a1008",
    expression: "focus",
    anim: "breathe",
    signature: "mbappe",
  },
  "Lionel Messi": {
    id: "messi",
    skin: "#f0c9a0",
    hairColor: "#2a1810",
    hair: "messi-beard",
    faceShape: "narrow",
    beard: true,
    beardColor: "#2a1810",
    brows: "thin",
    eyes: "narrow",
    eyeColor: "#3d2818",
    expression: "triumph",
    anim: "grin",
    signature: "messi",
  },
  "Miroslav Klose": {
    id: "klose",
    skin: "#f0c9a0",
    hairColor: "#6a5030",
    hair: "bald",
    faceShape: "oval",
    expression: "calm",
    anim: "blink",
  },
  "Gerd Müller": {
    id: "muller",
    skin: "#f0c9a0",
    hairColor: "#4a3820",
    hair: "thinning",
    faceShape: "round",
    expression: "focus",
    anim: "nod",
  },
  "Just Fontaine": {
    id: "fontaine",
    skin: "#f0c9a0",
    hairColor: "#2a2018",
    hair: "side-part",
    faceShape: "oval",
    expression: "smile",
    anim: "grin",
  },
  "Sándor Kocsis": {
    id: "kocsis",
    skin: "#f0c9a0",
    hairColor: "#2a2018",
    hair: "wavy-dark",
    faceShape: "angular",
    expression: "focus",
    anim: "blink",
  },
  "Jürgen Klinsmann": {
    id: "klinsmann",
    skin: "#f0c9a0",
    hairColor: "#c4a060",
    hair: "blonde-short",
    faceShape: "angular",
    expression: "triumph",
    anim: "grin",
  },
  "Helmut Rahn": {
    id: "rahn",
    skin: "#f0c9a0",
    hairColor: "#3a2818",
    hair: "side-part",
    faceShape: "oval",
    expression: "smile",
    anim: "breathe",
  },
};

const DEFAULT: FaceProfile = {
  id: "generic",
  skin: "#d4a574",
  hairColor: "#2a2018",
  hair: "short",
  faceShape: "oval",
  expression: "calm",
  anim: "blink",
};

export function faceFor(playerName: string): FaceProfile {
  return PROFILES[playerName] ?? DEFAULT;
}
