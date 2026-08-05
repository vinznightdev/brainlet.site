import { Character, Card, StickyNote } from './types';

export const ROUNDTABLE_CHARACTERS: Character[] = [
  {
    id: 'troll-chad',
    name: 'Troll Chad',
    role: 'Central Strategist',
    avatarEmoji: '😏',
    color: 'border-slate-400 text-slate-800 dark:text-slate-200',
    bgColor: 'bg-stone-50 dark:bg-zinc-800',
    description: 'The smug mastermind sitting at the center. Rumor has it he bought the genesis block and shorted the top using a typewriter. He always smiles, even when liquidation is 1% away.',
    trait: 'Maximum Smugness',
    stats: {
      liquidity: 95,
      copium: 5,
      alpha: 99,
      leverage: '125x'
    },
    quote: 'Problem, market? Just double down. It’s simple mathematics.',
    tablePosition: { x: 50, y: 55 }
  },
  {
    id: 'overlord-slime',
    name: 'Overlord Slime',
    role: 'Curtain Master & Liquidity God',
    avatarEmoji: '👁️',
    color: 'border-cyan-400 text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-50/50 dark:bg-cyan-950/20',
    description: 'A colossal, blue gooey entity pulling the curtains behind the scene. He controls the flows, spits bubblegum, and is technically 99% water and 1% pure leverage.',
    trait: 'Viscous Mindset',
    stats: {
      liquidity: 100,
      copium: 15,
      alpha: 80,
      leverage: '0.1x (Spot Only)'
    },
    quote: 'Slurp... The market flows wherever I expand. Don’t get stuck in my goo.',
    tablePosition: { x: 50, y: 15 }
  },
  {
    id: 'degen-squid',
    name: 'Degen Squid',
    role: 'Hopium Addict',
    avatarEmoji: '👃',
    color: 'border-blue-400 text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50/50 dark:bg-blue-950/20',
    description: 'A giant blue creature with a long nose and bloodshot eyes. He drools green slime when looking at charts. He has been holding onto bags since the Bronze Age.',
    trait: 'Diamond Suction Cups',
    stats: {
      liquidity: 12,
      copium: 98,
      alpha: 35,
      leverage: '250x'
    },
    quote: 'It’s just a healthy correction! We are going back to the moon by Tuesday.',
    tablePosition: { x: 80, y: 30 }
  },
  {
    id: 'stop-being-poor',
    name: 'Sass Cadet',
    role: 'Financial Adviser',
    avatarEmoji: '🕶️',
    color: 'border-amber-400 text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50/50 dark:bg-amber-950/20',
    description: 'Wearing white sunglasses, a yellow beanie, and her famous "STOP BEING POOR" tank top. Her strategy involves drinking juice boxes and ignoring all chart red indicators.',
    trait: 'Aggressive Optimism',
    stats: {
      liquidity: 60,
      copium: 40,
      alpha: 90,
      leverage: '10x'
    },
    quote: 'Have you tried simply having more funds? It worked for me.',
    tablePosition: { x: 25, y: 40 }
  },
  {
    id: 'pill-cat',
    name: 'Copium Pill Cat',
    role: 'Chief Pharmacist',
    avatarEmoji: '💊',
    color: 'border-pink-400 text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-50/50 dark:bg-pink-950/20',
    description: 'A cat living inside a pink and white capsule pill. He dispenses medical-grade copium and hopium. Always purring when the price goes sideways.',
    trait: 'Time-Released Serotonin',
    stats: {
      liquidity: 45,
      copium: 100,
      alpha: 50,
      leverage: 'No Leverage (Underground)'
    },
    quote: 'One dosage in the morning, and the red candles will look like beautiful candy stripes.',
    tablePosition: { x: 10, y: 35 }
  },
  {
    id: 'detective-whiskers',
    name: 'Detective Whiskers',
    role: 'Blockchain Auditor',
    avatarEmoji: '🤠',
    color: 'border-orange-400 text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50/50 dark:bg-orange-950/20',
    description: 'A sophisticated cat wearing a brown ranger hat and orange trenchcoat. He plays cards, analyzes smart contracts with a magnifying glass, and never trusts a project with "Inu" in its name.',
    trait: 'Hyper-Scent Tracker',
    stats: {
      liquidity: 75,
      copium: 20,
      alpha: 85,
      leverage: '1x (Spot only)'
    },
    quote: 'The transaction logs don’t lie, kid. Follow the kibble.',
    tablePosition: { x: 78, y: 70 }
  },
  {
    id: 'monk-e',
    name: 'Monk-E',
    role: 'Retail Investor Icon',
    avatarEmoji: '🐒',
    color: 'border-indigo-400 text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-50/50 dark:bg-indigo-950/20',
    description: 'A monkey in a blue hoodie, staring blankly. He buys high, sells low, and thinks the candle charts look like banana trees. He doesn’t know what a block is, but he likes the pictures.',
    trait: 'Unshakable Grip',
    stats: {
      liquidity: 8,
      copium: 90,
      alpha: 15,
      leverage: '500x'
    },
    quote: 'I clicked buy because the icon was a funny puppy. Why is my bank account empty?',
    tablePosition: { x: 92, y: 60 }
  },
  {
    id: 'house-head',
    name: 'House Head',
    role: 'Real Estate Visionary',
    avatarEmoji: '🏠',
    color: 'border-yellow-600 text-yellow-700 dark:text-yellow-400',
    bgColor: 'bg-yellow-50/50 dark:bg-yellow-950/20',
    description: 'A literal house with legs and arms. He has drool coming out of his window doors because he invested his entire mortgage into a pixelated rock token. Highly illiquid.',
    trait: 'Structural Integrity (Low)',
    stats: {
      liquidity: 2,
      copium: 95,
      alpha: 30,
      leverage: '3x (Home Equity)'
    },
    quote: 'You can sleep in a JPEG, but you can’t buy a JPEG without taking out a second mortgage.',
    tablePosition: { x: 12, y: 60 }
  },
  {
    id: 'dribbler-frog',
    name: 'Dribbler Frog',
    role: 'Lurker',
    avatarEmoji: '🐸',
    color: 'border-emerald-400 text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50/50 dark:bg-emerald-950/20',
    description: 'A bright green frog standing near the chips, drooling with big buggy eyes. He represents the silent majority watching from the sidelines, ready to pounce on crumbs.',
    trait: 'Aqueous Reflexes',
    stats: {
      liquidity: 30,
      copium: 70,
      alpha: 60,
      leverage: '50x'
    },
    quote: '*Croak*... Just waiting for the dip of the dip of the dip.',
    tablePosition: { x: 66, y: 62 }
  },
  {
    id: 'volt-stickman',
    name: 'Volt Stickman',
    role: 'Hype Coordinator',
    avatarEmoji: '⚡',
    color: 'border-sky-400 text-sky-600 dark:text-sky-400',
    bgColor: 'bg-sky-50/50 dark:bg-sky-950/20',
    description: 'A glowing blue neon stickman rocking the devil horns. He thrives on high-volatility hours, and burns through energy drinks at an alarming rate.',
    trait: 'High-Voltage Energy',
    stats: {
      liquidity: 50,
      copium: 30,
      alpha: 75,
      leverage: '1000x'
    },
    quote: 'VOLATILITY IS MY CAFFEINE! SEND IT!',
    tablePosition: { x: 20, y: 22 }
  }
];

export const DEFAULT_STICKY_NOTES: StickyNote[] = [
  {
    id: 'note-1',
    text: 'DEGEN LAW #1: If a coin has a cute dog or cat logo, it has a 50% chance of going to the moon and a 50% chance of dissolving into thin air.',
    color: 'bg-yellow-100 dark:bg-yellow-950/40 text-yellow-900 dark:text-yellow-200 border-yellow-300',
    x: 10,
    y: 15,
    paperStyle: 'ruled',
    rotation: -2,
    timestamp: '11:42 PM'
  },
  {
    id: 'note-2',
    text: '💊 REMINDER: DO NOT take more than 2 capsules of Copium per hour. Overdosing leads to thinking you are a financial genius while looking at a -94% chart.',
    color: 'bg-pink-100 dark:bg-pink-950/40 text-pink-900 dark:text-pink-200 border-pink-300',
    x: 52,
    y: 10,
    paperStyle: 'plain',
    rotation: 3,
    timestamp: '11:45 PM'
  },
  {
    id: 'note-3',
    text: 'Troll Chad’s Secret Recipe for Alpha:\n1. Buy high.\n2. Panic.\n3. Troll on forums.\n4. Somehow break even.\n5. Repeat.',
    color: 'bg-cyan-100 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-200 border-cyan-300',
    x: 30,
    y: 48,
    paperStyle: 'grid',
    rotation: 1,
    timestamp: '11:50 PM'
  },
  {
    id: 'note-4',
    text: 'Degen Card Tournament at midnight! Bring your shiny Sherlock Kitty cards. Standard entry fee is 2 half-eaten pizza crusts.',
    color: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300',
    x: 72,
    y: 50,
    paperStyle: 'legal',
    rotation: -1.5,
    timestamp: '11:58 PM'
  }
];

export const CARD_POOL: Card[] = [
  {
    id: 'card-troll',
    name: 'Troll Chad',
    emoji: '😏',
    rarity: 'Degen Mythic',
    color: 'from-slate-500 to-zinc-700 text-white',
    stats: {
      copium: 5,
      alpha: 99,
      leverage: 125,
      hype: 90
    },
    flavorText: '"Oh, did you lose your savings? Sounds like a skill issue to me, buddy."'
  },
  {
    id: 'card-slime',
    name: 'Overlord Slime',
    emoji: '👁️',
    rarity: 'Rare',
    color: 'from-cyan-400 to-teal-600 text-white',
    stats: {
      copium: 15,
      alpha: 82,
      leverage: 1,
      hype: 75
    },
    flavorText: 'An ocean of viscous liquidity. Hard to liquidate, impossible to contain.'
  },
  {
    id: 'card-sass',
    name: 'Sass Cadet',
    emoji: '🕶️',
    rarity: 'Rare',
    color: 'from-amber-400 to-orange-500 text-white',
    stats: {
      copium: 40,
      alpha: 88,
      leverage: 10,
      hype: 95
    },
    flavorText: 'She doesn’t read the whitepaper, but her tank top alone drives 20% trading volume.'
  },
  {
    id: 'card-squid',
    name: 'Degen Squid',
    emoji: '👃',
    rarity: 'Common',
    color: 'from-blue-400 to-indigo-600 text-white',
    stats: {
      copium: 95,
      alpha: 25,
      leverage: 250,
      hype: 60
    },
    flavorText: 'Legends say his nose grows 1cm for every fake breakout he believes in.'
  },
  {
    id: 'card-pillcat',
    name: 'Copium Pill Cat',
    emoji: '💊',
    rarity: 'Rare',
    color: 'from-pink-400 to-rose-500 text-white',
    stats: {
      copium: 100,
      alpha: 40,
      leverage: 0,
      hype: 80
    },
    flavorText: 'Provides instant healing against liquidations, but tastes like damp catnip.'
  },
  {
    id: 'card-whiskers',
    name: 'Detective Whiskers',
    emoji: '🤠',
    rarity: 'Rare',
    color: 'from-orange-400 to-amber-600 text-white',
    stats: {
      copium: 20,
      alpha: 84,
      leverage: 1,
      hype: 70
    },
    flavorText: 'He smells bad code from three blocks away. Folds immediately on meme tokens.'
  },
  {
    id: 'card-monke',
    name: 'Monk-E',
    emoji: '🐒',
    rarity: 'Common',
    color: 'from-purple-400 to-violet-600 text-white',
    stats: {
      copium: 85,
      alpha: 10,
      leverage: 500,
      hype: 85
    },
    flavorText: 'The true soul of the retail market. Clicking shiny buttons is his superpower.'
  },
  {
    id: 'card-frog',
    name: 'Dribbler Frog',
    emoji: '🐸',
    rarity: 'Common',
    color: 'from-emerald-400 to-green-600 text-white',
    stats: {
      copium: 70,
      alpha: 55,
      leverage: 50,
      hype: 50
    },
    flavorText: 'Stares unblinkingly. Thinks every post is a hidden message from the gods.'
  },
  {
    id: 'card-house',
    name: 'House Head',
    emoji: '🏠',
    rarity: 'Common',
    color: 'from-yellow-600 to-amber-800 text-white',
    stats: {
      copium: 90,
      alpha: 20,
      leverage: 3,
      hype: 40
    },
    flavorText: 'Literally made of mortar, wood, and terrible financial decisions.'
  },
  {
    id: 'card-volt',
    name: 'Volt Stickman',
    emoji: '⚡',
    rarity: 'Rare',
    color: 'from-sky-400 to-blue-500 text-white',
    stats: {
      copium: 30,
      alpha: 70,
      leverage: 100,
      hype: 99
    },
    flavorText: 'fueled by electricity, charts, and intense screaming during green candles.'
  }
];

export const COPIUM_FORTUNES = [
  "Buy the dip! It cannot possibly go lower. (Narrator: It did.)",
  "You are precisely one transaction away from generational wealth.",
  "Stop looking at the 1-minute chart. Take a deep breath of 100% pure Copium.",
  "Troll Chad smiles upon you today. Your leverage has been increased by 10x automatically.",
  "Sass Cadet says: Stop being poor! Just buy more coins.",
  "Copium Pill Cat purrs. Your bags are safe (as long as you never open your wallet).",
  "Detective Whiskers smelled something fishy. It was your trading strategy.",
  "Monk-E says: Banana candle is green! Grab your helmet!",
  "Dribbler Frog drooled. The next dip is the real one, definitely.",
  "Volt Stickman screams: 1000x OR BUST! THERE IS NO IN BETWEEN!",
  "A wild blue slime blocks your path. Slurp! Liquidity has been absorbed.",
  "House Head warns: Keep a roof over your head, or at least keep a JPEG of one."
];
