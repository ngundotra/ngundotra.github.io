/* Typehouse — Habitat Grounds content. Original boarding-house IP. */
(function (G) {
  const PAL = {
    ink: "#1a1210",
    timber: "#3d2a24",
    copper: "#8b5a3c",
    parchment: "#c4a574",
    lamp: "#e8d5b0",
    moss: "#6b8f71",
    ember: "#c45c26",
    dusk: "#4a6b8a",
  };

  const TYPE_COLOR = {
    ember: "#e86a1c",
    tide: "#3aa8e0",
    moss: "#3db84a",
    spark: "#f0d020",
    hush: "#b48ad4",
    rust: "#d86a2c",
    gleam: "#e8c428",
    draft: "#9ecce8",
    none: PAL.copper,
  };

  const PRESSES = {
    ember: ["moss", "draft"],
    tide: ["ember", "rust"],
    moss: ["tide", "spark"],
    spark: ["hush", "tide"],
    hush: ["spark", "gleam"],
    rust: ["gleam", "ember"],
    gleam: ["draft", "moss"],
    draft: ["rust", "hush"],
  };

  const STAGES = ["Arrived", "Settled", "Flourishing", "Nesting"];
  const STAGE_YIELD = [1, 1.4, 2.0, 2.6];
  const STAGE_NEED = 60;
  const LEVEL_YIELD = [1, 1, 1.35, 1.8];

  const ROOMS = {
    lobby: {
      id: "lobby",
      name: "Gatehouse",
      type: "none",
      cost: { tally: 0, scrap: 0, dust: 0 },
      blurb: "The gate. Holds four waiting. Pays nothing. The night desk lives here.",
      unique: true,
      noSeat: false,
      waitCap: 4,
      unbuildable: true,
    },
    hearth: {
      id: "hearth",
      name: "Ember Grounds",
      type: "ember",
      cost: { tally: 8, scrap: 0, dust: 0 },
      blurb: "A kiln that remembers hands. Ember underfoot.",
      start: true,
    },
    cistern: {
      id: "cistern",
      name: "Tide Basin",
      type: "tide",
      cost: { tally: 14, scrap: 2, dust: 0 },
      blurb: "A throat of standing water behind a rail.",
      afterHearth: true,
    },
    conservatory: {
      id: "conservatory",
      name: "Moss Plot",
      type: "moss",
      cost: { tally: 14, scrap: 2, dust: 0 },
      blurb: "Glass and leaf. The leaf is winning.",
      afterHearth: true,
    },
    dynamo: {
      id: "dynamo",
      name: "Spark Pen",
      type: "spark",
      cost: { tally: 28, scrap: 6, dust: 0 },
      blurb: "A wheel that argues with darkness.",
    },
    dormer: {
      id: "dormer",
      name: "Hush Loft",
      type: "hush",
      cost: { tally: 22, scrap: 4, dust: 1 },
      blurb: "A loft that sleeps sitting up.",
    },
    scullery: {
      id: "scullery",
      name: "Rust Yard",
      type: "rust",
      cost: { tally: 22, scrap: 8, dust: 0 },
      blurb: "Pans that have outlived their meals.",
    },
    vitrine: {
      id: "vitrine",
      name: "Gleam Case",
      type: "gleam",
      cost: { tally: 36, scrap: 8, dust: 0 },
      blurb: "A cabinet of things that look back.",
    },
    transom: {
      id: "transom",
      name: "Draft Lane",
      type: "draft",
      cost: { tally: 18, scrap: 4, dust: 0 },
      blurb: "A lane with opinions about weather. No fence.",
      hallway: true,
    },
    larder: {
      id: "larder",
      name: "Tack Shed",
      type: "none",
      cost: { tally: 30, scrap: 10, dust: 0 },
      blurb: "No seat. Neighbors eat better.",
      unique: true,
      noSeat: true,
    },
  };

  const UPGRADE = {
    2: { tally: 20, scrap: 4, dust: 0 },
    3: { tally: 50, scrap: 12, dust: 2 },
  };

  function lotCost(n) {
    n = n || 0;
    var cost = { tally: 0, scrap: 12 + 8 * n, dust: 0 };
    if (n >= 3) cost.tally = 10 + 6 * (n - 3);
    if (n >= 7) cost.dust = 1 + (n - 7);
    return cost;
  }

  const DENIZENS = {
    Wicknoll: {
      id: "Wicknoll",
      name: "Wicknoll",
      types: ["ember"],
      wants: ["hearth"],
      yield: { tally: 2 },
      later: false,
      silhouette: "kiln-shouldered wick, a squat chimney that sat down",
    },
    Puddlewick: {
      id: "Puddlewick",
      name: "Puddlewick",
      types: ["tide"],
      wants: ["cistern"],
      yield: { tally: 2 },
      later: false,
      silhouette: "ladle-hare, long ear for a handle",
    },
    Ledgerfrond: {
      id: "Ledgerfrond",
      name: "Ledgerfrond",
      types: ["moss"],
      wants: ["conservatory"],
      yield: { scrap: 0.05 },
      later: false,
      silhouette: "bark file-folder, tabs like leaves",
    },
    Zitterplug: {
      id: "Zitterplug",
      name: "Zitterplug",
      types: ["spark"],
      wants: ["dynamo"],
      yield: { tally: 2 },
      later: false,
      silhouette: "prong-weasel, two tines for a face",
    },
    Napwisp: {
      id: "Napwisp",
      name: "Napwisp",
      types: ["hush"],
      wants: ["dormer"],
      yield: { dust: 0.02 },
      later: false,
      silhouette: "faceless coat-rack in a sleeping posture",
    },
    Flakesmith: {
      id: "Flakesmith",
      name: "Flakesmith",
      types: ["rust"],
      wants: ["scullery"],
      yield: { scrap: 0.08 },
      later: false,
      silhouette: "kettle with a smith's shoulders",
    },
    Specktin: {
      id: "Specktin",
      name: "Specktin",
      types: ["gleam"],
      wants: ["vitrine"],
      yield: { tally: 3 },
      later: true,
      silhouette: "walking lens, a speck that hired a body",
    },
    Fluekin: {
      id: "Fluekin",
      name: "Fluekin",
      types: ["draft"],
      wants: ["transom"],
      yield: { tally: 2 },
      later: true,
      silhouette: "flue-brush kin, bristles for hair",
    },
    Ashletter: {
      id: "Ashletter",
      name: "Ashletter",
      types: ["ember", "hush"],
      wants: ["hearth", "dormer"],
      yield: { tally: 1, dust: 0.01 },
      later: true,
      silhouette: "an envelope of cooled ash",
    },
    Jarfox: {
      id: "Jarfox",
      name: "Jarfox",
      types: ["tide", "rust"],
      wants: ["cistern", "scullery"],
      yield: { tally: 1, scrap: 0.04 },
      later: true,
      silhouette: "a rusted lid that grew a water-tail",
    },
    Roofself: {
      id: "Roofself",
      name: "Roofself",
      types: ["moss", "draft"],
      wants: ["conservatory", "transom"],
      yield: { scrap: 0.06 },
      later: true,
      silhouette: "a shingle that learned a self",
    },
    Lampwyrm: {
      id: "Lampwyrm",
      name: "Lampwyrm",
      types: ["spark", "gleam"],
      wants: ["dynamo", "vitrine"],
      yield: { tally: 3 },
      later: true,
      silhouette: "a coil of lamp-glass, not a dragon",
    },
  };

  const MVP_ORDER = ["Puddlewick", "Ledgerfrond", "Zitterplug", "Napwisp", "Flakesmith"];
  const LATER_ORDER = ["Specktin", "Fluekin", "Ashletter", "Jarfox", "Roofself", "Lampwyrm"];

  const EVENTS = [
    {
      id: "evt_soot_handshake",
      title: "SOOT HANDSHAKE",
      body: "Wicknoll offers a palm of hearth-soot. We do not ask what they are. We ask whether we keep it.",
      rarity: "tutorial",
      choices: [
        { id: "keep", label: "KEEP THE SOOT" },
        { id: "wipe", label: "WIPE THE GRATE" },
      ],
    },
    {
      id: "evt_leak_blotter",
      title: "LEAK ON THE BLOTTER",
      body: "Tide wrote itself across the desk. The ink is water. The water is keeping records.",
      rarity: "common",
      choices: [
        { id: "mop", label: "MOP THE PAGE" },
        { id: "sign", label: "LET IT SIGN" },
      ],
    },
    {
      id: "evt_dry_inspector",
      title: "DRY INSPECTOR",
      body: "They taste the air and count the habitats. Their badge might be real. Their thirst is.",
      rarity: "rare",
      choices: [
        { id: "tour", label: "SHOW THEM IN" },
        { id: "tea", label: "OFFER THE KETTLE" },
      ],
    },
    {
      id: "evt_type_bath",
      title: "A TYPE TAKES A BATH",
      body: "Someone sits in the Tide Basin until their weather loosens. The grounds will feel it next door.",
      rarity: "common",
      choices: [
        { id: "soak", label: "LET THEM SOAK" },
        { id: "towel", label: "TOWEL AND TALLY" },
      ],
    },
    {
      id: "evt_haunted_sash",
      title: "HAUNTED SASH",
      body: "A window learns a second name. Hush likes that. Other denizens do not sit easy under it.",
      rarity: "rare",
      choices: [
        { id: "leave", label: "LEAVE THE SASH" },
        { id: "nail", label: "NAIL IT SHUT" },
      ],
    },
    {
      id: "evt_fuse_famine",
      title: "FUSE FAMINE",
      body: "The Spark Pen eats its own spark and goes polite. Unpowered spark pays a quarter until we feed it.",
      rarity: "rare",
      choices: [
        { id: "ration", label: "RATION THE SPARK" },
        { id: "feed", label: "FEED IT DUST" },
      ],
    },
    {
      id: "evt_quiet_contest",
      title: "QUIET CONTEST",
      body: "The grounds hold their breath on purpose. Yield takes the minute off. Hush-dust gathers like dew.",
      rarity: "common",
      choices: [
        { id: "honor", label: "HONOR THE QUIET" },
        { id: "jingle", label: "JINGLE THE TALLY" },
      ],
    },
    {
      id: "evt_parade_speck",
      title: "PARADE OF SPECK",
      body: "Gleam learns choreography. Coins land facing up. One denizen will need the dark afterward.",
      rarity: "rare",
      choices: [
        { id: "open", label: "OPEN THE DOORS" },
        { id: "half", label: "HALF THE SHADES" },
      ],
    },
    {
      id: "uninvited_coat",
      title: "UNINVITED COAT",
      body: "A coat arrives without a body. It knows the pegs. It does not know us.",
      rarity: "common",
      choices: [
        { id: "hang", label: "HANG IT" },
        { id: "out", label: "TURN IT OUT" },
      ],
    },
    {
      id: "moss_union",
      title: "MOSS UNION",
      body: "The green things have a meeting. They want the Moss Plot recognized as a workplace.",
      rarity: "common",
      choices: [
        { id: "recognize", label: "RECOGNIZE THEM" },
        { id: "refuse", label: "REFUSE THE MINUTES" },
      ],
    },
    {
      id: "rust_wedding",
      title: "RUST WEDDING",
      body: "Two pans decide they are married. The Rust Yard wants a witness or a lid.",
      rarity: "rare",
      choices: [
        { id: "lid", label: "GIVE A LID" },
        { id: "fee", label: "CHARGE A FEE" },
      ],
    },
    {
      id: "draft_census",
      title: "DRAFT CENSUS",
      body: "The weather counts who lives in the walls. It would like a window left honest.",
      rarity: "common",
      choices: [
        { id: "window", label: "LEAVE A WINDOW" },
        { id: "books", label: "CLOSE THE BOOKS" },
      ],
    },
    {
      id: "floorboard",
      title: "FLOORBOARD",
      body: "A board offers testimony and a nail. Only one of those is useful.",
      rarity: "common",
      choices: [
        { id: "pry", label: "PRY IT" },
        { id: "nail", label: "NAIL IT" },
      ],
    },
    {
      id: "button_hoard",
      title: "BUTTON HOARD",
      body: "Someone has been saving fasteners in a cup. The cup has started saving them back.",
      rarity: "common",
      choices: [
        { id: "keep", label: "KEEP THE HOARD" },
        { id: "spend", label: "SPEND THE CUP" },
      ],
    },
    {
      id: "indoor_weather",
      title: "INDOOR WEATHER",
      body: "A cloud checks in without a denizen. The lamps lean. The blotter curls.",
      rarity: "rare",
      choices: [
        { id: "curtains", label: "HANG CURTAINS" },
        { id: "sashes", label: "OPEN THE SASHES" },
      ],
    },
    {
      id: "ash_mail",
      title: "ASH MAIL",
      body: "An envelope of cooled fire is addressed to the clerk. The return address is the grate.",
      rarity: "common",
      choices: [
        { id: "read", label: "READ IT" },
        { id: "burn", label: "BURN IT AGAIN" },
      ],
    },
    {
      id: "bulb_famine",
      title: "BULB FAMINE",
      body: "The good wicks have walked off. Every habitat is one honesty darker.",
      rarity: "common",
      choices: [
        { id: "dim", label: "DIM THE HOUSE" },
        { id: "wick", label: "BUY A WICK" },
      ],
    },
    {
      id: "nest_claim",
      title: "NEST CLAIM",
      body: "Two denizens have independently decided one habitat is the plot. The lot is too small to share.",
      rarity: "common",
      choices: [
        { id: "older", label: "SEAT THE OLDER" },
        { id: "promise", label: "PROMISE ANOTHER" },
      ],
    },
    {
      id: "tarnish_banquet",
      title: "TARNISH BANQUET",
      body: "Rust has set a table. The plates are the table. We may eat, or lock the door.",
      rarity: "rare",
      choices: [
        { id: "serve", label: "SERVE IT" },
        { id: "lock", label: "LOCK THE SCULLERY" },
      ],
    },
    {
      id: "crossbreeze_theft",
      title: "CROSSBREEZE THEFT",
      body: "Tally leaves on a draft and tries to become someone else's weather.",
      rarity: "rare",
      choices: [
        { id: "chase", label: "CHASE IT" },
        { id: "let", label: "LET IT GO" },
      ],
    },
  ];

  const HINTS = [
    "Tide Basin beside Ember Grounds is tide on ember. That is friction. Wicknoll will pay less and show a tick.",
    "Nourish is when a denizen presses the neighbor. Friction is when the neighbor presses them.",
    "Tack Shed does not sit anyone. It feeds the habitats that touch it.",
    "Draft Lane walks one lot further at half weather.",
    "We do not ask what they are. We ask which grounds.",
    "Hush-dust is for nights when Tally feels too honest.",
    "A haunted sash pays hush and taxes everyone else.",
    "Spark Pen gone dark makes spark work at a quarter.",
    "Long-press the title only if you truly want new grounds.",
    "Later denizens wait until five habitats, or two hundred lifetime Tally.",
  ];

  const SAVE_KEY = "typehouse.v1";
  const AWAY_CAP = 8 * 3600;
  const AWAY_TAX = 0.85;
  const RECAP_AFTER = 120;
  const TICK_STEP = 1;
  const ACC_MS = 250;
  const EVENT_EVERY = 75;
  const ARRIVE_FAST = 90;
  const ARRIVE_SLOW = 240;
  const SOOT_AT = 55;

  function presses(a, b) {
    if (!a || !b || a === "none" || b === "none") return false;
    return (PRESSES[a] || []).indexOf(b) !== -1;
  }

  G.THData = {
    PAL: PAL,
    TYPE_COLOR: TYPE_COLOR,
    PRESSES: PRESSES,
    STAGES: STAGES,
    STAGE_YIELD: STAGE_YIELD,
    STAGE_NEED: STAGE_NEED,
    LEVEL_YIELD: LEVEL_YIELD,
    ROOMS: ROOMS,
    UPGRADE: UPGRADE,
    lotCost: lotCost,
    DENIZENS: DENIZENS,
    MVP_ORDER: MVP_ORDER,
    LATER_ORDER: LATER_ORDER,
    EVENTS: EVENTS,
    HINTS: HINTS,
    SAVE_KEY: SAVE_KEY,
    AWAY_CAP: AWAY_CAP,
    AWAY_TAX: AWAY_TAX,
    RECAP_AFTER: RECAP_AFTER,
    TICK_STEP: TICK_STEP,
    ACC_MS: ACC_MS,
    EVENT_EVERY: EVENT_EVERY,
    ARRIVE_FAST: ARRIVE_FAST,
    ARRIVE_SLOW: ARRIVE_SLOW,
    SOOT_AT: SOOT_AT,
    presses: presses,
  };
})(window);
