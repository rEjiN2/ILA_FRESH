export const CURRENCY = "AED";
export const money = (n: number) => `${CURRENCY} ${Number(n).toFixed(0)}`;

export type Category = { id: string; label: string; note: string };

export const CATEGORIES: Category[] = [
  { id: "whole", label: "Whole Spices", note: "Sun-dried, single-origin" },
  { id: "ground", label: "Ground Spices", note: "Milled in small batches" },
  { id: "blends", label: "Blends", note: "Recipes with a lineage" },
  { id: "botanical", label: "Botanicals & Tea", note: "Steep, sip, restore" },
];

export type Product = {
  id: string;
  name: string;
  cat: string;
  price: number;
  weight: string;
  origin: string;
  rating: number;
  reviews: number;
  best?: boolean;
  tone: [string, string];
  blurb: string;
  notes: string[];
};

export const PRODUCTS: Product[] = [
  { id: "cardamom", name: "Idukki Green Cardamom", cat: "whole", price: 58, weight: "60g", origin: "Idukki, Kerala", rating: 4.9, reviews: 214, best: true, tone: ["#C4D3AC", "#5E7A4E"],
    blurb: "The pod we built the house on. Hand-picked at 8 mm, cured slow so the oils stay locked inside.",
    notes: ["Eucalyptus & sweet resin", "Single estate, 2025 harvest", "Grade AGEB, whole green pods"] },
  { id: "pepper", name: "Malabar Black Pepper", cat: "whole", price: 34, weight: "100g", origin: "Wayanad, Kerala", rating: 4.8, reviews: 176, best: true, tone: ["#8A9480", "#2C3A2C"],
    blurb: "Vine-ripened Tellicherry berries, bold and citric with a long, warming finish.",
    notes: ["Bright, resinous heat", "Tellicherry TGSEB grade", "Whole peppercorns"] },
  { id: "turmeric", name: "Alleppey Turmeric", cat: "ground", price: 26, weight: "150g", origin: "Alappuzha, Kerala", rating: 4.7, reviews: 132, best: true, tone: ["#EBCB77", "#B8862E"],
    blurb: "High-curcumin finger turmeric, stone-milled to a deep marigold powder.",
    notes: ["5%+ curcumin", "Earthy, faintly peppery", "Stone-ground fine"] },
  { id: "cinnamon", name: "Ceylon Cinnamon Quills", cat: "whole", price: 42, weight: "50g", origin: "Matale, Sri Lanka", rating: 4.9, reviews: 98, tone: ["#D8AB80", "#8A5A34"],
    blurb: "True cinnamon — delicate, paper-thin quills, not the fierce cassia most shelves carry.",
    notes: ["Soft, floral, low coumarin", "Alba grade", "Hand-rolled quills"] },
  { id: "chilli", name: "Kashmiri Chilli", cat: "ground", price: 30, weight: "120g", origin: "Kashmir Valley", rating: 4.6, reviews: 87, tone: ["#DE9070", "#A0432B"],
    blurb: "Colour without the fire. Deep crimson for gravies that look as good as they taste.",
    notes: ["Mild heat, big colour", "Sun-dried, de-stemmed", "Fine ground"] },
  { id: "cumin", name: "Whole Cumin Seed", cat: "whole", price: 22, weight: "150g", origin: "Gujarat, India", rating: 4.7, reviews: 141, tone: ["#DBC195", "#9A7B4A"],
    blurb: "Plump, oil-rich seed that wakes up the second it hits hot fat.",
    notes: ["Nutty, warm, grassy", "Machine-cleaned twice", "Whole seed"] },
  { id: "cloves", name: "Handpicked Cloves", cat: "whole", price: 38, weight: "50g", origin: "Zanzibar", rating: 4.8, reviews: 64, tone: ["#BB9E7C", "#6E4A32"],
    blurb: "Fat, unopened buds with the stem intact — the sign of a clove picked at the right hour.",
    notes: ["Sweet, medicinal warmth", "Hand-sorted", "Whole buds"] },
  { id: "staranise", name: "Star Anise", cat: "whole", price: 28, weight: "60g", origin: "Guangxi, China", rating: 4.7, reviews: 52, tone: ["#CD9E7A", "#7A4A2E"],
    blurb: "Whole eight-point stars, licorice-sweet, the backbone of a slow braise.",
    notes: ["Sweet, anise-forward", "Whole stars", "Grade A intact points"] },
  { id: "garam", name: "House Garam Masala", cat: "blends", price: 46, weight: "80g", origin: "Blended in Sharjah", rating: 4.9, reviews: 189, best: true, tone: ["#CB9E72", "#7A4A2E"],
    blurb: "Twelve spices toasted and ground the day they ship. A family recipe, finally bottled.",
    notes: ["Warm, layered, aromatic", "Toasted-to-order", "No fillers or salt"] },
  { id: "goldenmilk", name: "Golden Milk Blend", cat: "botanical", price: 40, weight: "120g", origin: "Blended in Sharjah", rating: 4.8, reviews: 110, tone: ["#EBCB77", "#C98A3A"],
    blurb: "Turmeric, ginger, cardamom and black pepper — a warm cup for the end of a long day.",
    notes: ["Sweet, soothing, golden", "Just add hot milk", "Caffeine-free"] },
  { id: "chai", name: "Cardamom Chai Masala", cat: "botanical", price: 36, weight: "100g", origin: "Blended in Sharjah", rating: 4.9, reviews: 156, tone: ["#C7A87E", "#6E4A32"],
    blurb: "Cardamom-forward chai spice, built to hold its own against strong Assam leaf.",
    notes: ["Cardamom, ginger, clove", "Coarse-cut for steeping", "Blend for milk tea"] },
  { id: "fennel", name: "Lucknowi Fennel", cat: "whole", price: 20, weight: "150g", origin: "Uttar Pradesh, India", rating: 4.6, reviews: 73, tone: ["#CDD5A8", "#7E8A54"],
    blurb: "Small, sweet green fennel — the after-dinner seed and a quiet workhorse in the pan.",
    notes: ["Sweet, cooling", "Fine 'lucknowi' cut", "Whole seed"] },
];

const WM = (file: string, w = 900) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${w}`;

export const PHOTO: Record<string, string> = {
  cardamom: WM("Cardomom pods.jpg"),
  pepper: WM("Black Peppercorns.jpg"),
  turmeric: WM("Turmeric-powder.jpg"),
  cinnamon: WM("Cinnamomum verum spices.jpg"),
  chilli: WM("Chilli Powder1.JPG"),
  cumin: WM("Cumin Seeds.jpg"),
  cloves: WM("Cloves whole.JPG"),
  staranise: WM("StarAnise.jpg"),
  garam: WM("Garam Masala.JPG"),
  goldenmilk: WM("Turmeric-powder.jpg"),
  chai: WM("Garam Masala.JPG"),
  fennel: WM("Fennel-seeds.jpg"),
};

export const HERO_IMG = WM("Essence of Indian food.JPG", 1400);
export const HERO_MINI = WM("Cardomom pods.jpg", 700);
export const BLOG_IMG = WM("Cardamom plant.jpg", 1200);
export const CAT_IMG: Record<string, string> = {
  whole: PHOTO.cardamom,
  ground: PHOTO.chilli,
  blends: PHOTO.garam,
  botanical: PHOTO.cinnamon,
};

export type Post = {
  id: string;
  cat: string;
  date: string;
  read: string;
  author: string;
  title: string;
  excerpt: string;
  body: string[];
};

export const BLOG: Post[] = [
  { id: "idukki", cat: "Origins", date: "12 Jun 2026", read: "6 min", author: "Anjali Menon",
    title: "The Idukki Highlands, Where Cardamom Learns Patience",
    excerpt: "At 3,000 feet the mist rolls in by four o'clock. It slows everything down — including the pods. Here is why the wait is the whole point.",
    body: [
      "There is a stretch of the Western Ghats where the road stops pretending to be a road and becomes a suggestion. You climb it in low gear, past cardamom under the shade of silver oak, until the air turns cold and green and faintly medicinal. This is Idukki, and it is where our cardamom is grown.",
      "Cardamom is a slow crop. A plant takes three years before it offers a single pod worth picking, and even then the pods do not ripen politely all at once. Pickers return to the same plant again and again across a season, taking only what is ready. There is no shortcut that does not show up later in the cup.",
      "We cure at low heat over a long time. Rush the drying and the pod splits, the oils flash off, and you are left with something that looks like cardamom and tastes like paper. Patience is not a marketing word here. It is the difference between a spice and a souvenir.",
      "When you crack one of our pods, that first hit — eucalyptus, sweet resin, a little citrus — is three years and one careful week of drying, arriving all at once. Worth the wait."
    ] },
  { id: "bloom", cat: "Kitchen", date: "28 May 2026", read: "4 min", author: "Rafiq Ahmed",
    title: "Bloom or Toast? Getting Everything Out of a Whole Spice",
    excerpt: "Whole spices keep their oils sealed until you break them open with heat. Two techniques, and when to reach for each.",
    body: [
      "A whole spice is a locked box. The aromatics live in volatile oils held inside the seed or pod, and they will happily sit there for a year doing very little until you apply heat. There are two ways to turn the key: toasting dry, and blooming in fat.",
      "Toast when you plan to grind. A dry pan on medium, a constant shuffle, and you pull the spices the moment they smell like themselves and a shade darker. Cumin, coriander and fennel love this. Grind while warm.",
      "Bloom when the spice will stay whole in a dish. Warm oil or ghee, add mustard seed, cumin, curry leaf or dried chilli, and let them crackle for a few seconds before the onions go in. The fat carries the flavour everywhere the dish goes.",
      "The mistake is treating them the same. Bloom a delicate ground spice and it scorches; toast something you meant to fry and you have done half the work twice. Match the technique to the destination."
    ] },
  { id: "label", cat: "Guides", date: "09 May 2026", read: "5 min", author: "Anjali Menon",
    title: "How to Read a Spice Label Without Getting Fooled",
    excerpt: "'Premium' means nothing. 'Origin', 'harvest' and 'packed-on' mean everything. A field guide to the small print.",
    body: [
      "Most spice on a shelf tells you almost nothing true. The front of the jar is advertising; the truth, if there is any, hides in the smallest type on the back. Here is what actually matters.",
      "Origin, specifically. 'Product of India' is a country, not an answer. Cardamom from Idukki behaves differently to cardamom from anywhere else. A brand that knows its farm will tell you the region, because it is proud of it.",
      "A harvest date, not just an expiry. Ground spice does not spoil so much as fade. A jar milled fourteen months ago is technically safe and practically flavourless. The packed-on date tells you how far into that fade you are starting.",
      "A single ingredient. 'Turmeric powder' should read 'turmeric'. Anti-caking agents, colour and rice flour are how cheap spice hides being cheap. If the list is longer than one line, ask why."
    ] },
  { id: "goldenmilk", cat: "Recipes", date: "21 Apr 2026", read: "3 min", author: "Rafiq Ahmed",
    title: "Golden Milk, Three Ways for Three Moods",
    excerpt: "One blend, three cups: a bright morning version, a mellow evening one, and an iced pour for the Sharjah heat.",
    body: [
      "Golden milk is forgiving, which is exactly why it is worth getting right. Start with our blend — turmeric, ginger, cardamom, a whisper of pepper to help the curcumin along — and steer from there.",
      "Morning: hot oat milk, a teaspoon of blend, a squeeze of honey and a pinch of extra cardamom. Sharp enough to count as breakfast.",
      "Evening: whole milk, gentle heat, the blend and a single clove steeped for five minutes then removed. Softer, rounder, made for slowing down.",
      "Iced: build a concentrate with a little hot water, stir the blend in fully, then pour over cold milk and ice. The only version that makes sense at forty degrees outside."
    ] },
];
