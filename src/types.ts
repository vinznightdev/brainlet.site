export interface Character {
  id: string;
  name: string;
  role: string;
  avatarEmoji: string;
  color: string;
  bgColor: string;
  description: string;
  trait: string;
  stats: {
    liquidity: number; // 0 to 100
    copium: number;    // 0 to 100
    alpha: number;     // 0 to 100
    leverage: string;  // e.g. "100x", "0x (Safe)", "1000x"
  };
  quote: string;
  tablePosition: {
    x: number; // percentage from left
    y: number; // percentage from top
  };
}

export type PaperStyle = 'ruled' | 'grid' | 'legal' | 'plain';

export interface StickyNote {
  id: string;
  text: string;
  color: string;
  x: number; // percentage for responsive positioning
  y: number; // percentage for responsive positioning
  paperStyle: PaperStyle;
  rotation: number; // e.g. -5 to 5 degrees for handcrafted crooked feel
  timestamp: string;
}

export interface Card {
  id: string;
  name: string;
  emoji: string;
  rarity: 'Common' | 'Rare' | 'Degen Mythic';
  color: string;
  stats: {
    copium: number;
    alpha: number;
    leverage: number;
    hype: number;
  };
  flavorText: string;
}

export interface GameState {
  playerHand: Card[];
  opponentHand: Card[];
  playerScore: number;
  opponentScore: number;
  activeRound: number;
  selectedCardId: string | null;
  selectedStat: keyof Card['stats'] | null;
  roundResult: 'win' | 'lose' | 'tie' | null;
  battleLog: string[];
}
