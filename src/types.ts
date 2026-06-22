export type DecisionType = 'APPROVE' | 'DEPORT' | 'DELAY' | 'TEMPORARY' | 'INVESTIGATE';

export interface HiddenTraits {
  honesty: number;      // 0 to 10
  adaptability: number;  // 0 to 10
  empathy: number;       // 0 to 10
  ambition: number;      // 0 to 10
  resilience: number;    // 0 to 10
  risk: number;          // 0 to 10
}

export interface DocumentInfo {
  idNumber: string;
  fullName: string;
  expiryDate: string;
  hasTypo: boolean;
  notes: string;
}

export interface StatementComparison {
  topic: string;
  docStatement: string;
  verbalStatement: string;
  isDiscrepancy: boolean;
}

export interface CharacterDialogue {
  id: string;
  question: string;
  response: string;
  clueBodyLanguage: string; // "Nervous adjustments", "Maintains strong eye contact", "Slight hesitation", "Frustrated sigh", "Immediate relief smile"
  reactionType: 'nervous' | 'confident' | 'hesitant' | 'frustrated' | 'relieved' | 'neutral';
}

export interface Applicant {
  id: string;
  name: string;
  age: number;
  origin: string;
  profession: string;
  portraitSeed: string; // Seed for SVG-based cartoon portrait generator in-app
  avatarStyle: {
    skinColor: string;
    hairStyle: string;
    hairColor: string;
    shirtColor: string;
    accessory: string;
  };
  reasonForEntry: string;
  hiddenTraits: HiddenTraits;
  documents: {
    passport: DocumentInfo;
    workPermit?: DocumentInfo;
    referenceLetter?: {
      author: string;
      title: string;
      content: string;
      phone: string;
      isFake: boolean;
    };
  };
  dialogues: CharacterDialogue[];
  statements: StatementComparison[];
  referenceCheck: {
    prompt: string;
    result: string;
    bodyLanguage: string;
  };
  startingCityOnly?: boolean; // If true, only appears in Act 1
  isReturningVersionOf?: string; // Links back to an original applicant's ID
  returningTriggerDecision?: 'APPROVE' | 'DEPORT' | 'DELAY' | 'TEMPORARY' | 'INVESTIGATE';
  consequenceSummary: {
    APPROVE: string;
    DEPORT: string;
    DELAY: string;
    TEMPORARY: string;
    INVESTIGATE: string;
  };
  statImpacts: {
    APPROVE: Partial<CityStats>;
    DEPORT: Partial<CityStats>;
    DELAY: Partial<CityStats>;
    TEMPORARY: Partial<CityStats>;
    INVESTIGATE: Partial<CityStats>;
  };
  bribeDetails?: {
    amount: number;
    description: string;
    itemOffer: string;
    dialogOffer: string;
  };
}

export interface CityStats {
  economy: number;
  healthcare: number;
  education: number;
  housing: number;
  publicSafety: number;
  tourism: number;
  laborSupply: number;
  communityTrust: number;
  foodCulture: number;
}

export interface District {
  id: string;
  name: string;
  description: string;
  flavor: string;
  icon: string;
}

export interface StarterCity {
  id: string;
  name: string;
  description: string;
  priority: string;
  pay: 'High' | 'Medium' | 'Low';
  quotas: string;
  challenge: string;
  statsBoost: Partial<CityStats>;
}

export interface DecisionHistoryEntry {
  day: number;
  applicantId: string;
  applicantName: string;
  decision: DecisionType;
  city: string;
  comicPanels: string[]; // Comic dialogue descriptions or frames
  traceSummary: string; // For tracing consequences (e.g., "Accepted Chef, boosted Food Culture")
}

export interface GameState {
  playerName: string;
  reputation: number; // 0 - 100
  starterCityId: string;
  currentDay: number;
  act: 1 | 2 | 3; // Act 1: Starter, Act 2: Relocation Cutscene, Act 3: Mango Point
  cityStats: CityStats;
  decisions: DecisionHistoryEntry[];
  currentApplicantId: string | null;
  relocationReason: string;
  currentEventId: string | null;
  gameEnded: boolean;
  endingId: string | null;
  unlockedTools: string[]; // e.g. 'Reference Verification', 'Deeper Forensic DB'
  walletBalance?: number;
  bribesRecord?: Record<string, 'ACCEPTED' | 'REJECTED' | 'REPORTED'>;
  ledgerExpenses?: string[];
}
