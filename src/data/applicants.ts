import { Applicant, CityStats } from '../types';

export const STARTER_CITIES = [
  {
    id: 'port_ashley',
    name: 'Port Ashley',
    description: 'A wealthy, secure, corporate-controlled gateway with a high-paying salary, but under massive border pressure and strict approval quotas.',
    priority: 'Security & Quotas',
    pay: 'High' as const,
    quotas: 'Strict (Needs high deportation rate or perfect documents)',
    challenge: 'Suspicious documents and smugglers trying to sneak into corporate offices.',
    statsBoost: { economy: 15, publicSafety: 15, communityTrust: -10, housing: -10 }
  },
  {
    id: 'seaview',
    name: 'Seaview',
    description: 'A breezy, vibrant tourist paradise with a coastal economy that demands high seasonal labor, but suffers from overcrowding.',
    priority: 'Tourism & Service Labor',
    pay: 'Medium' as const,
    quotas: 'Moderate (Requires hospitality workers)',
    challenge: 'Sifting through holiday-maker permits and finding real workers versus tourists overstaying.',
    statsBoost: { tourism: 20, economy: 10, laborSupply: 15, housing: -15 }
  },
  {
    id: 'riverton',
    name: 'Riverton',
    description: 'An industrious, metallic, smog-covered factory hub desperately in need of manual labor, but struggling with extreme public health and safety issues.',
    priority: 'Industrial Output & Health',
    pay: 'Medium' as const,
    quotas: 'Lenient (Approve able-bodied workers)',
    challenge: 'Forged medical clearances and industrial espionage.',
    statsBoost: { laborSupply: 25, economy: 15, healthcare: -15, publicSafety: -10 }
  },
  {
    id: 'highland_gate',
    name: 'Highland Gate',
    description: 'A tranquil, community-driven mountain settlement focused on low crime, social cohesion, and quality education, but very isolated.',
    priority: 'Community Trust & Integration',
    pay: 'Low' as const,
    quotas: 'Strict (Approve only highly honest, peace-loving applicants)',
    challenge: 'Skeptical locals who fear any external influence and demand flawless background checks.',
    statsBoost: { communityTrust: 25, education: 15, publicSafety: 10, economy: -10 }
  }
];

export const DISTRICTS = [
  { id: 'harbourfront', name: 'Harbourfront', description: 'The gateway of Mango Point. Handles maritime trade, fishing boats, and shipping containers.', flavor: 'Salty breeze and rusting crane silhouettes.', icon: 'Anchor' },
  { id: 'market_square', name: 'Market Square', description: 'The beating retail heart of the city. Food stalls, vendors, dynamic street life.', flavor: 'Smells of jerk seasoning, fresh mangoes, and vibrant bargaining noise.', icon: 'ShoppingBag' },
  { id: 'hope_heights', name: 'Hope Heights', description: 'The residential ridge overlooking the bay, dealing with high housing crunches and community trust issues.', flavor: 'Humble cottages alongside dense tenement blocks.', icon: 'Home' },
  { id: 'industry_yard', name: 'Industry Yard', description: 'Warehouses, repair docks, and minor fabrication shops that feed the local supply chains.', flavor: 'Sparks from welding torches and heavy machinery diesel hum.', icon: 'Wrench' },
  { id: 'culture_corner', name: 'Culture Corner', description: 'Art studios, steel-pan yards, street murals, and the local reggae sound system rigs.', flavor: 'Bass drums echoing off colorful walls and vibrant flags.', icon: 'Music' },
  { id: 'green_hills', name: 'Green Hills', description: 'The highland fringe. Soil is extremely rich, ideal for local agriculture, chocolate farms, and small homesteads.', flavor: 'Fresh morning mist, terraced banana trees, and wild orchids.', icon: 'Leaf' }
];

export const INITIAL_CITY_STATS: CityStats = {
  economy: 40,
  healthcare: 35,
  education: 35,
  housing: 30,
  publicSafety: 45,
  tourism: 20,
  laborSupply: 30,
  communityTrust: 30,
  foodCulture: 25
};

export const APPLICANTS: Applicant[] = [
  // ==========================================
  // ACT 1: STARTER CITY APPLICANTS (1 - 5)
  // ==========================================
  {
    id: 'chef_marcus',
    name: 'Marcus Chen',
    age: 38,
    origin: 'Sichuan-Jamaica Alliance',
    profession: 'Jerk-Fusion Master Chef',
    portraitSeed: 'marcus_portrait',
    avatarStyle: { skinColor: '#dfb08c', hairStyle: 'dreads-short', hairColor: '#1a1a1a', shirtColor: '#e05a47', accessory: 'chef-hat' },
    reasonForEntry: 'Wants to establish high-end cuisine integrating Caribbean spices with Sichuan heat.',
    hiddenTraits: { honesty: 9, adaptability: 8, empathy: 7, ambition: 9, resilience: 6, risk: 2 },
    documents: {
      passport: { idNumber: 'MP-8829-X', fullName: 'Marcus Chen', expiryDate: '2028-12-15', hasTypo: false, notes: 'Stamps smell slightly of allspice.' },
      workPermit: { idNumber: 'WP-MARCUS-01', fullName: 'Marcus Chen', expiryDate: '2027-06-30', hasTypo: false, notes: 'Officially certified in Culinary Arts.' },
      referenceLetter: {
        author: 'Councilman Sterling',
        title: 'Gastronomy Board Patron',
        content: 'Marcus’s culinary art is phenomenal. His spicy dumplings saved my family reunion.',
        phone: 'CH-449-332',
        isFake: false
      }
    },
    dialogues: [
      { id: 'm1', question: 'Tell me about your jerk fusion recipe.', response: 'I smoke the chicken with whole pimento wood, injected with Sichuan peppercorn oil. It numbs the mouth and fires the soul!', clueBodyLanguage: 'Gestures passionately with active hands', reactionType: 'confident' },
      { id: 'm2', question: 'Your documents look a bit clean. Any reason?', response: 'They are clean because I pay my taxes and scrub my kitchen twice a day. Cleanliness is close to godliness.', clueBodyLanguage: 'Maintains smiling, calm eye contact', reactionType: 'confident' },
      { id: 'm3', question: 'Do you plan to settle down?', response: 'Mango Point has the perfect climate for growing scotch bonnet peppers. I want to build a major street side establishment there.', clueBodyLanguage: 'Leans forward, smelling slightly of star anise', reactionType: 'neutral' }
    ],
    statements: [
      { topic: 'Duration of Stay', docStatement: '12 Months Temporary Labor', verbalStatement: 'I plan to purchase property and stay permanently if they let me.', isDiscrepancy: true },
      { topic: 'Sponsors', docStatement: 'Gastronomy Board Patron', verbalStatement: 'My primary sponsor is Councilman Sterling.', isDiscrepancy: false }
    ],
    referenceCheck: {
      prompt: 'Verify culinary credentials with Councilman Sterling.',
      result: 'REPUTABLE. Sterling confirms Marcus Chen is code-compliant and highly acclaimed in the capital.',
      bodyLanguage: 'Marcus folds his arms confidently, nodding with a slight grin.'
    },
    startingCityOnly: true,
    consequenceSummary: {
      APPROVE: 'Marcus establishes a beautiful culinary spot. Food culture increases, and tourists love his fusion recipes.',
      DEPORT: 'Marcus is heartbroken, forced to take a sketchy ferry away. Food culture remains bland, and a talented soul is lost.',
      DELAY: 'Marcus misses the cooking festival. His seasoning spoils in port warehouses, causing minor health complaints.',
      TEMPORARY: 'Marcus opens a small pop-up shack. It yields brief economic bonuses, but he complains about instability.',
      INVESTIGATE: 'Marcus undergoes rigorous background checking. His pristine ledger checks out, but he is annoyed by the delays.'
    },
    statImpacts: {
      APPROVE: { foodCulture: 15, tourism: 10, economy: 5, laborSupply: 5 },
      DEPORT: { foodCulture: -5, communityTrust: -5 },
      DELAY: { healthcare: -5, communityTrust: -2 },
      TEMPORARY: { economy: 5, foodCulture: 5, housing: -2 },
      INVESTIGATE: { economy: 2, communityTrust: 2 }
    },
    bribeDetails: {
      amount: 50,
      description: "A fresh linen bundle containing $50 with a faint scent of lemon-sprigged spice oils.",
      itemOffer: "Spiced Cash Roll",
      dialogOffer: "Officer, I know my verbal plans are a bit temporary, but here is $50 to cover any paperwork convenience. Good seasoning needs good pacing!"
    }
  },
  {
    id: 'dr_evelyn',
    name: 'Dr. Evelyn Vance',
    age: 44,
    origin: 'New Edinburgh',
    profession: 'Infectious Disease Specialist',
    portraitSeed: 'evelyn_portrait',
    avatarStyle: { skinColor: '#eed2c4', hairStyle: 'bun', hairColor: '#b45309', shirtColor: '#2563eb', accessory: 'glasses' },
    reasonForEntry: 'To volunteer at local clinics that are severely understaffed.',
    hiddenTraits: { honesty: 10, adaptability: 6, empathy: 9, ambition: 5, resilience: 8, risk: 1 },
    documents: {
      passport: { idNumber: 'MP-1102-V', fullName: 'Evelyn Vance', expiryDate: '2029-01-10', hasTypo: false, notes: 'Dull blue leather with a medical credential stamp.' },
      workPermit: { idNumber: 'WP-VANCE-99', fullName: 'Dr. Evelyn Vancee', expiryDate: '2026-12-01', hasTypo: true, notes: 'The work permit lists "Evelyn Vancee" with an extra "e" at the end.' }
    },
    dialogues: [
      { id: 'e1', question: 'There is an extra letter on your work permit name.', response: 'Oh, typists in New Edinburgh always confuse French and English suffixes. It is an annoying bureaucratic error.', clueBodyLanguage: 'Deeply sighs, rubbing her temples', reactionType: 'frustrated' },
      { id: 'e2', question: 'What is your research focus?', response: 'Pathogens carried by local sandflies. If they mutate, Mango Point could face an outbreak without proper sanitation structures.', clueBodyLanguage: 'Speaks clearly and with professional gravity', reactionType: 'confident' },
      { id: 'e3', question: 'Do you have medical licenses with you?', response: 'I have my original New Edinburgh board certification right here, though it isn’t stamp-validated for Mango Point yet.', clueBodyLanguage: 'Hands over a heavy sealed scroll with a red ribbon', reactionType: 'neutral' }
    ],
    statements: [
      { topic: 'Spelling of Last Name', docStatement: 'Dr. Evelyn Vancee', verbalStatement: 'Evelyn Vance. V-a-n-c-e, like the historical river.', isDiscrepancy: true },
      { topic: 'Destination', docStatement: 'Mango Point Clinic #3', verbalStatement: 'I will be serving at Mango Point Community Hospital.', isDiscrepancy: false }
    ],
    referenceCheck: {
      prompt: 'Check New Edinburgh Medical Registry.',
      result: 'HIGHLY VERIFIED. Academic records are pristine. She was top of her class in epidemiology.',
      bodyLanguage: 'Evelyn adjusts her spectacles and opens her notepad, waiting patiently.'
    },
    startingCityOnly: true,
    consequenceSummary: {
      APPROVE: 'Dr. Vance immediately goes to Mango Point clinics. She manages to prevent a dengue outbreak, greatly boosting Healthcare.',
      DEPORT: 'Rebuffed due to the minor typo, she leaves. A severe fever hits Mango Point later; clinics are overloaded and patients suffer.',
      DELAY: 'While her papers are delayed, she is held in quarantine quarters. She notes that the quarantine design violates health codes.',
      TEMPORARY: 'Allowed in temporary status, she coordinates triage but can’t sign off on clinical trials. Useful but limited.',
      INVESTIGATE: 'Her background is audited. The spelling discrepancy is verified as a clerk typo. Highly robust, but eats up time.'
    },
    statImpacts: {
      APPROVE: { healthcare: 20, publicSafety: 10, communityTrust: 8 },
      DEPORT: { healthcare: -15, communityTrust: -10 },
      DELAY: { healthcare: -5, communityTrust: -3 },
      TEMPORARY: { healthcare: 10, laborSupply: 5 },
      INVESTIGATE: { healthcare: 5, publicSafety: 5 }
    }
  },
  {
    id: 'leon_sterling',
    name: 'Leon "Slick" Sterling',
    age: 29,
    origin: 'The Outer Reefs',
    profession: '"General Commodities Importer"',
    portraitSeed: 'leon_portrait',
    avatarStyle: { skinColor: '#c29774', hairStyle: 'slick-back', hairColor: '#2b2b2b', shirtColor: '#16a34a', accessory: 'gold-chain' },
    reasonForEntry: 'To import high-grade electronics and establish a "recreational club" on the docks.',
    hiddenTraits: { honesty: 3, adaptability: 10, empathy: 4, ambition: 9, resilience: 7, risk: 8 },
    documents: {
      passport: { idNumber: 'MP-0071-S', fullName: 'Leon Sterling', expiryDate: '2025-05-15', hasTypo: false, notes: 'Smells of cheap vanilla cologne.' },
      workPermit: { idNumber: 'WP-SLICK-X', fullName: 'Leon Sterling', expiryDate: '2028-11-09', hasTypo: false, notes: 'Laminated in a shiny plastic that doesn’t match government standards.' }
    },
    dialogues: [
      { id: 'l1', question: 'This laminate looks suspicious. Why are you using non-standard plastic?', response: 'The Outer Reefs government got defunded last winter. We buy whatever plastic sheets they sell on the black market now, officer. Total mess back home.', clueBodyLanguage: 'Winks and drumrolls his fingers on the desk', reactionType: 'nervous' },
      { id: 'l2', question: 'What sort of club are you establishing?', response: 'Oh, just rum, dominoes, dancehall beats, and maybe some slots. Purely therapeutic for overworked dockworkers!', clueBodyLanguage: 'Grins broadly, displaying a shiny gold incisor', reactionType: 'confident' },
      { id: 'l3', question: 'There are rumors you operate illegal gambling rings.', response: 'Officer! I am a simple merchant. My grandmother raised me on the scriptures. Calling dominoes illegal is a crime itself!', clueBodyLanguage: 'Puts hands on chest in mock offense', reactionType: 'frustrated' }
    ],
    statements: [
      { topic: 'Goods Declared', docStatement: 'Handmade Wooden Artifacts', verbalStatement: 'Oh, I got a crate of top-shelf micro-processors and premium Jamaican rum barrels.', isDiscrepancy: true },
      { topic: 'ID Code Match', docStatement: 'MP-0071-S', verbalStatement: 'Passport ending in 0071-S.', isDiscrepancy: false }
    ],
    referenceCheck: {
      prompt: 'Check Coast Guard Maritime blacklists.',
      result: 'WARNING. A vessel registered under Leon Sterling’s firm was once searched for smuggling untaxed spirits.',
      bodyLanguage: 'Leon shifts in his chair, sweating slightly beneath his cologne.'
    },
    startingCityOnly: true,
    consequenceSummary: {
      APPROVE: 'Leon smuggles illegal slot machines. The Economy booms, but Crime spikes. Public Safety drops severely.',
      DEPORT: 'Deported. He leaves cursing your name. Docks remain peaceful and safe, though business owners lose access to cheap imports.',
      DELAY: 'He slide-bribes a cargo assistant. The investigation files mysteriously disappear, making him smug.',
      TEMPORARY: 'Allowed temporarily under strict bond. He stays quiet but secretly lays down the network for illegal gaming.',
      INVESTIGATE: 'You find high-tech counterfeit seals in his luggage. He is immediately jailed or blacklisted, earning you huge Public Safety points.'
    },
    statImpacts: {
      APPROVE: { economy: 18, publicSafety: -18, communityTrust: -10, tourism: 5 },
      DEPORT: { publicSafety: 10, communityTrust: 8, economy: -5 },
      DELAY: { publicSafety: -5, communityTrust: -3 },
      TEMPORARY: { economy: 5, publicSafety: -5 },
      INVESTIGATE: { publicSafety: 15, communityTrust: 20 }
    },
    bribeDetails: {
      amount: 150,
      description: "A thick leather pocketbook containing $150 in clean, unmarked bills with a silver engraving.",
      itemOffer: "Vanilla-scented Wallet Cash",
      dialogOffer: "Listen, commissioner... this job in this hot outpost is a thankless grind. Take this $150, smooth things down, and let us get of active business. What do you say?"
    }
  },
  {
    id: 'maya_song',
    name: 'Maya Song',
    age: 31,
    origin: 'New Taipei',
    profession: 'Primary School Educator',
    portraitSeed: 'maya_portrait',
    avatarStyle: { skinColor: '#f3e8ff', hairStyle: 'fringe', hairColor: '#1e1b4b', shirtColor: '#db2777', accessory: 'scarf' },
    reasonForEntry: 'To open a bilingual nursery and primary school in the under-developed districts.',
    hiddenTraits: { honesty: 10, adaptability: 8, empathy: 9, ambition: 7, resilience: 9, risk: 2 },
    documents: {
      passport: { idNumber: 'MP-9921-S', fullName: 'Maya Song', expiryDate: '2030-08-11', hasTypo: false, notes: 'Includes a sweet sticker of a cartoon panda.' },
      workPermit: { idNumber: 'WP-MAYA-44', fullName: 'Maya Song', expiryDate: '2027-02-12', hasTypo: false, notes: 'Sponsorship listed from the "Teach for Mango Point Aid League".' }
    },
    dialogues: [
      { id: 'ma1', question: 'Why the nursery school focus?', response: 'Parents can’t work in the shipyards or fields if their toddlers are running near live power lines. Education is the bedrock of economic safety!', clueBodyLanguage: 'Smiles warmly, radiating pure hospitality', reactionType: 'relieved' },
      { id: 'ma2', question: 'Do you have resources to fund the classrooms?', response: 'The Taipei Aid League provided small seed grants for desks and textbooks. We only need the physical space, which I will rent.', clueBodyLanguage: 'Shows catalog of children’s math illustrated books', reactionType: 'confident' },
      { id: 'ma3', question: 'The local gangs sometimes extort schools. Are you prepared?', response: 'If you educate a community’s children, even the toughest elements respect your schoolhouse. I survived typhoon camp; I can handle street politics.', clueBodyLanguage: 'Firm posture, direct determined look', reactionType: 'confident' }
    ],
    statements: [
      { topic: 'Funding Source', docStatement: 'Teach for Mango Point Aid League', verbalStatement: 'I am using my personal retirement savings entirely.', isDiscrepancy: true },
      { topic: 'Profession', docStatement: 'Primary School Educator', verbalStatement: 'I am a certified child literacy teacher.', isDiscrepancy: false }
    ],
    referenceCheck: {
      prompt: 'Verify Taipei Aid League Grant records.',
      result: 'REPUTABLE. Grant is fully backed. They have established four successful community schools worldwide.',
      bodyLanguage: 'Maya stands taller, happy to have her sponsors verified.'
    },
    startingCityOnly: true,
    consequenceSummary: {
      APPROVE: 'Maya establishes Hope Heights School. Education surges. Parents trust the neighborhood, skyrocketing Community Trust.',
      DEPORT: 'Deported. Children are left unsupervised; educational resources go unused. Education drops significantly.',
      DELAY: 'While she waits, the Taipei Aid League considers redirecting the fund to Honduras. Urgent pressure!',
      TEMPORARY: 'Admitted on probation. She teaches but complains about lack of long-term planning permissions.',
      INVESTIGATE: 'Checking her degrees. They are perfectly valid. She is approved with high marks, but valuable school days were lost.',
    },
    statImpacts: {
      APPROVE: { education: 25, communityTrust: 18, laborSupply: 10, housing: -5 },
      DEPORT: { education: -12, communityTrust: -8 },
      DELAY: { education: -4, communityTrust: -4 },
      TEMPORARY: { education: 10, communityTrust: 5 },
      INVESTIGATE: { education: 8, communityTrust: 8 }
    }
  },
  {
    id: 'kofi_juma',
    name: 'Kofi Juma',
    age: 41,
    origin: 'Accra Metropolis',
    profession: 'Structural Masonry Engineer',
    portraitSeed: 'kofi_portrait',
    avatarStyle: { skinColor: '#451a03', hairStyle: 'bald', hairColor: '#ffffff', shirtColor: '#eab308', accessory: 'safety-vest' },
    reasonForEntry: 'Wants to reconstruct the decaying retaining walls at Harbourfront and build weather-proof housing.',
    hiddenTraits: { honesty: 8, adaptability: 7, empathy: 8, ambition: 6, resilience: 10, risk: 3 },
    documents: {
      passport: { idNumber: 'MP-5521-K', fullName: 'Kofi Juma', expiryDate: '2028-10-30', hasTypo: false, notes: 'Passport is dry, sturdy, and well-traveled.' },
      workPermit: { idNumber: 'WP-JUMA-88', fullName: 'Kofi Juma', expiryDate: '2029-04-14', hasTypo: false, notes: 'Seals are double-stamped and certified by Accra Civil Engineers Guild.' }
    },
    dialogues: [
      { id: 'k1', question: 'What materials do you use for coastal building?', response: 'Basalt rebar and pozzolanic ash cement. Ocean water corrodes cheap steel-reinforced concrete in five years. Mine lasts fifty!', clueBodyLanguage: 'Speaks with an authoritative baritone, hitting the desk for impact', reactionType: 'confident' },
      { id: 'k2', question: 'Do you have equipment?', response: 'A specialized hydraulic mixer is sitting on the cargo vessel right now, awaiting my entry permit. Every day it floats there costs a fortune.', clueBodyLanguage: 'Shuffling a heavy blueprint set with slightly calloused thumbs', reactionType: 'hesitant' },
      { id: 'k3', question: 'Your work permit lists you as structural mason, but your passport says general laborer?', response: 'I began as a brickmaker in Ghana twenty years ago. I earned my masonry engineering degree at night school in Tema.', clueBodyLanguage: 'Shows severe calluses on hands as physical proof', reactionType: 'neutral' }
    ],
    statements: [
      { topic: 'Title discrepancy', docStatement: 'Masonry Engineer', verbalStatement: 'I am a structural engineer, specialized in concrete composites.', isDiscrepancy: false },
      { topic: 'Import Equipment', docStatement: 'Accra Guild Hydraulic Mixer', verbalStatement: 'I did not declare any heavy industrial machinery.', isDiscrepancy: true }
    ],
    referenceCheck: {
      prompt: 'Check Tema Night Academy registries.',
      result: 'CERTIFIED. Kofi Juma is registered as a graduate with honors in Maritime Materials Science.',
      bodyLanguage: 'Kofi smiles slightly, his muscular shoulders relaxing.'
    },
    startingCityOnly: true,
    consequenceSummary: {
      APPROVE: 'Kofi rebuilds the seawall. Market Square is protected from mudslides. Housing durability increases dramatically.',
      DEPORT: 'Deported. Housing remains crumbling. The monsoon season flooding later washes away seaside huts. High devastation.',
      DELAY: 'His machinery on the ship is impounded. Port auth imposes heavy demurrage. He is stressed.',
      TEMPORARY: 'Allowed short-term. He patches the harbor pier but the deeper residential updates are frozen.',
      INVESTIGATE: 'Checking import tariffs on his heavy mixer. All checked out, but delayed by administrative red tape.'
    },
    statImpacts: {
      APPROVE: { housing: 22, laborSupply: 12, economy: 10, publicSafety: 10 },
      DEPORT: { housing: -15, publicSafety: -12, economy: -8 },
      DELAY: { housing: -5, economy: -4 },
      TEMPORARY: { housing: 8, laborSupply: 5 },
      INVESTIGATE: { housing: 4, economy: 2 }
    }
  },

  // ==========================================
  // ACT 3: MANGO POINT APPLICANTS (6 - 15)
  // ==========================================
  {
    id: 'althea_bailey',
    name: 'Althea Bailey',
    age: 26,
    origin: 'Kingston Outposts',
    profession: 'Fishery Cooperative Lead',
    portraitSeed: 'althea_portrait',
    avatarStyle: { skinColor: '#b4835a', hairStyle: 'bandana', hairColor: '#ef4444', shirtColor: '#0ea5e9', accessory: 'earring' },
    reasonForEntry: 'To revitalize Mango Point Harbourfront by combining small local fishing boats into a high-yield cooperative, bypassing corporate brokers.',
    hiddenTraits: { honesty: 8, adaptability: 9, empathy: 8, ambition: 8, resilience: 9, risk: 4 },
    documents: {
      passport: { idNumber: 'MP-0163-B', fullName: 'Althea Bailey', expiryDate: '2027-01-22', hasTypo: false, notes: 'Faint smell of salted cod.' },
      workPermit: { idNumber: 'WP-FISH-77', fullName: 'Althea Bailey', expiryDate: '2028-12-31', hasTypo: false, notes: 'Sponsored by Mango Point Fishermen Council.' }
    },
    dialogues: [
      { id: 'al1', question: 'How do you plan to handle the big corporate fishing vessels?', response: 'They fish the deep seas and deplete them. We target local reefs with sustainable cast-nets and sell directly to Market Square. Fresh, cheap, and local!', clueBodyLanguage: 'Speaks with local Caribbean rhythm, rhythmic hand-clapping', reactionType: 'confident' },
      { id: 'al2', question: 'The harbor authority says you lack fuel permits.', response: 'The cooperative uses solar-converters on sails for 80% of our power! We only use petrol during heavy squalls.', clueBodyLanguage: 'Nods with a reassuring, proud warm look', reactionType: 'confident' }
    ],
    statements: [
      { topic: 'Fishing Fleet Size', docStatement: '1 vessel list', verbalStatement: 'We have seven small wooden canoes joining our solar fleet.', isDiscrepancy: true },
      { topic: 'Local Backer', docStatement: 'Mango Point Fishermen Council', verbalStatement: 'The fisherman council supports and sponsors us.', isDiscrepancy: false }
    ],
    referenceCheck: {
      prompt: 'Check harbor cooperative applications.',
      result: 'CONFIRMED. Local fishers are enthusiastically listing their outboards for Althea’s alliance.',
      bodyLanguage: 'Althea leans forward, smiling, exuding natural leadership.'
    },
    consequenceSummary: {
      APPROVE: 'Althea organizes the fishermen. Harbourfront thrives with fresh catch. Food Culture and Economy rise, but tourism shipyards complain of slipway crowding.',
      DEPORT: 'Without Althea, the local fishing boats are bought out cheap by corporate trawlers. Cost of food rises; food culture is starved.',
      DELAY: 'Waiting in harbor lobby, she coordinates fishers via mobile. Extremely resourceful but slow.',
      TEMPORARY: 'Allowed for seasonal salmon run. Fresh food is abundant but the cooperative structure fails to build long-term cold storage.',
      INVESTIGATE: 'Sifting through maritime fuel logs. No illegal smuggling found, but cooperative gets frustrated.'
    },
    statImpacts: {
      APPROVE: { economy: 10, foodCulture: 12, laborSupply: 5, tourism: -4 },
      DEPORT: { foodCulture: -10, economy: -5, communityTrust: -5 },
      DELAY: { foodCulture: -2, economy: -1 },
      TEMPORARY: { foodCulture: 6, economy: 4 },
      INVESTIGATE: { communityTrust: 2, economy: 2 }
    }
  },
  {
    id: 'cassandra_reyes',
    name: 'Cassandra Reyes',
    age: 34,
    origin: 'Sanctuary Bay',
    profession: 'E.R. Traumatologist Coordinator',
    portraitSeed: 'cassandra_portrait',
    avatarStyle: { skinColor: '#bfdbfe', hairStyle: 'ponytail', hairColor: '#475569', shirtColor: '#9333ea', accessory: 'stethoscope' },
    reasonForEntry: 'To install a community clinic at Hope Heights. Her local papers are solid, but her medical bags contain experimental, unstamped remedies.',
    hiddenTraits: { honesty: 10, adaptability: 7, empathy: 10, ambition: 5, resilience: 9, risk: 3 },
    documents: {
      passport: { idNumber: 'MP-1244-R', fullName: 'Cassandra Reyes', expiryDate: '2031-03-14', hasTypo: false, notes: 'Pristine document, smells slightly of antiseptic wipes.' }
    },
    dialogues: [
      { id: 'c1', question: 'These herbal distillates in your clinical bag are unstamped.', response: 'They are standardized willow bark infusions and aloe extracts. If I wait for the Capital Pharmacy Board to stamp them, my patients will die of heat strokes or infected cuts first. They are safe; I formulate them myself.', clueBodyLanguage: 'Firmly, calmly holds medical bottle to the light', reactionType: 'confident' },
      { id: 'c2', question: 'Why Hope Heights?', response: 'That ridge is so steep, the main hospital ambulance takes 40 minutes to climb it. Hope Heights needs a first-aid outpost ready 24/7.', clueBodyLanguage: 'Points out the window at the high tenements', reactionType: 'neutral' }
    ],
    statements: [
      { topic: 'Experimental Drugs', docStatement: '0 packages classified pharmaceuticals', verbalStatement: 'I have three liters of surgical willow extract and localized antibiotics.', isDiscrepancy: true },
      { topic: 'Certification', docStatement: 'Sanctuary Bay Trauma Association', verbalStatement: 'I am licensed by the Sanctuary Bay Trauma Guild.', isDiscrepancy: false }
    ],
    referenceCheck: {
      prompt: 'Verify Sanctuary Bay medical licensing.',
      result: 'CERTIFIED. She is highly regarded, although once rebuked for violating corporate patents to supply free cures to slums.',
      bodyLanguage: 'Cassandra maintains a direct, solemn look, offering her credentials.'
    },
    consequenceSummary: {
      APPROVE: 'Cassandra establishes the Hope Heights outpost. Healthcare skyrockets, saving multiple injured workers from the dock yards.',
      DEPORT: 'Deported. Casualties in industrial incidents spike. Hope Heights residents feel completely abandoned.',
      DELAY: 'Her medicine boxes are locked in the customs warehouse. She volunteers as a pure receptionist, saving minor clerical work.',
      TEMPORARY: 'Admitted temporarily. She can do stitches but cannot distribute her customized remedies, reducing efficacy.',
      INVESTIGATE: 'A pharmacy inspector assays her extracts. They verify they are completely pure and therapeutic, but wasting critical days.'
    },
    statImpacts: {
      APPROVE: { healthcare: 18, publicSafety: 10, communityTrust: 15, economy: -3 },
      DEPORT: { healthcare: -12, communityTrust: -12, publicSafety: -5 },
      DELAY: { healthcare: -3, communityTrust: -2 },
      TEMPORARY: { healthcare: 8, communityTrust: 5 },
      INVESTIGATE: { healthcare: 4, publicSafety: 4 }
    }
  },
  {
    id: 'devon_higgins',
    name: 'Devon Higgins',
    age: 27,
    origin: 'Clarendon Ridge',
    profession: 'Analog Dub Sound Engineer',
    portraitSeed: 'devon_portrait',
    avatarStyle: { skinColor: '#a16207', hairStyle: 'dreads-tall', hairColor: '#1e293b', shirtColor: '#10b981', accessory: 'sunglasses' },
    reasonForEntry: 'Wants to setup a custom valve-amplifier system on the beaches to launch local outdoor sessions.',
    hiddenTraits: { honesty: 7, adaptability: 8, empathy: 7, ambition: 8, resilience: 6, risk: 6 },
    documents: {
      passport: { idNumber: 'MP-8831-D', fullName: 'Devon Higgins', expiryDate: '2026-09-01', hasTypo: false, notes: 'Heavily decorated with colorful bass-music stickers.' },
      workPermit: { idNumber: 'WP-DUB-55', fullName: 'Devon Higgins', expiryDate: '2028-06-03', hasTypo: false, notes: 'Registered as a sound technician sponsor of Culture Corner yard.' }
    },
    dialogues: [
      { id: 'dh1', question: 'What is this huge array of vacuum tubes and timber boxes?', response: 'That is my high-vibration sound system! It delivers therapeutic sub-bass waves directly to the soul of Mango Point.', clueBodyLanguage: 'Mimics tapping a percussion delay unit', reactionType: 'confident' },
      { id: 'dh2', question: 'Local police complain your dub shows are too loud.', response: 'Music brings people together, officer. High vibrations drive away crime! When the speaker stacks shake, nobody is thinking of fighting.', clueBodyLanguage: 'Nods slowly in rhythm to an imaginary slow tempo', reactionType: 'confident' }
    ],
    statements: [
      { topic: 'Cargo Volume', docStatement: '4 boxes sound equipment', verbalStatement: 'I have twelve custom speaker cabinets and a massive diesel generator.', isDiscrepancy: true },
      { topic: 'Affiliation', docStatement: 'Culture Corner yard', verbalStatement: 'I was invited by the Roots & Rhythm council of Culture Corner.', isDiscrepancy: false }
    ],
    referenceCheck: {
      prompt: 'Check event coordination logs.',
      result: 'CONFIRMED. Sound system yard members in Culture Corner are waiting to host Devon’s speaker stack.',
      bodyLanguage: 'Devon leans back, adjusting his gold sunglasses with a relaxed grin.'
    },
    consequenceSummary: {
      APPROVE: 'Devon deploys the Sound System. Culture Corner explodes with festive dancehall energy. Tourism and Food Culture spike, but police report slightly higher noise complaints.',
      DEPORT: 'Deported. Culture Corner remains quiet and desolate. Young people linger on streets without musical outlets, lowering trust.',
      DELAY: 'He is detained. He plays bass guitar in the barracks, keeping other refugees entertained but delayed.',
      TEMPORARY: 'Allows a three-week tourist festival. Great short-term excitement but the beautiful speaker tower is dismantled afterwards.',
      INVESTIGATE: 'Checking safety ratings of his self-made voltage transformer. It checks out perfectly.'
    },
    statImpacts: {
      APPROVE: { tourism: 16, foodCulture: 10, communityTrust: 8, publicSafety: -3 },
      DEPORT: { communityTrust: -8, tourism: -8 },
      DELAY: { communityTrust: -1 },
      TEMPORARY: { tourism: 8, foodCulture: 4 },
      INVESTIGATE: { publicSafety: 4, tourism: 2 }
    }
  },
  {
    id: 'professor_julian',
    name: 'Julian Vance',
    age: 49,
    origin: 'New Edinburgh',
    profession: 'Professor of Soil Mechanics',
    portraitSeed: 'julian_portrait',
    avatarStyle: { skinColor: '#fbcfe8', hairStyle: 'receding', hairColor: '#78716c', shirtColor: '#374151', accessory: 'glasses' },
    reasonForEntry: 'Looking to join his sister (Evelyn) and setup high-yield organic crop farming in Green Hills.',
    hiddenTraits: { honesty: 9, adaptability: 6, empathy: 8, ambition: 6, resilience: 7, risk: 2 },
    documents: {
      passport: { idNumber: 'MP-1105-J', fullName: 'Julian Vance', expiryDate: '2029-04-12', hasTypo: false, notes: 'Stamped with multiple university sigils.' }
    },
    dialogues: [
      { id: 'pv1', question: 'How is soil mechanics related to farming?', response: 'If the clay ratio is slightly off, roots rot because water cannot permeate. I have designed a terrace drainage system that lets bananas and chocolate plants survive heavy dry phases.', clueBodyLanguage: 'Taps his glasses, looking very academic', reactionType: 'confident' },
      { id: 'pv2', question: 'Have you seen Dr. Evelyn Vance recently?', response: 'I lost touch with her during her expedition to the Outer Reefs. I hope she reached Mango Point safely. I want to assist her clinics too.', clueBodyLanguage: 'Looks slightly worried, holding a locket with her portrait', reactionType: 'hesitant' }
    ],
    statements: [
      { topic: 'Purpose of Entry', docStatement: 'Soil Survey Research', verbalStatement: 'I want to settle down, teach agriculture, and assist my family here.', isDiscrepancy: true },
      { topic: 'Relationship', docStatement: 'Sister: Dr. Evelyn Vance', verbalStatement: 'My cousin is working in the harbor area.', isDiscrepancy: true }
    ],
    referenceCheck: {
      prompt: 'Check family registry connection.',
      result: 'CONFIRMED. He is indeed the elder brother of Dr. Evelyn Vance.',
      bodyLanguage: 'Julian cleans his spectacles with a cloth, squinting slightly.'
    },
    consequenceSummary: {
      APPROVE: 'Julian organizes terraced farms on Green Hills. Banana and crop yield triple. Economy and Labor Supply benefit.',
      DEPORT: 'Deported. Green Hills clay soil gets dry and muddy. Farms are deserted, and local markets run low on plantains.',
      DELAY: 'He spends days cataloging flowers inside the terminal. Helpful botanical cataloging!',
      TEMPORARY: 'Admitted on a temporary agricultural lease. Small harvest boost, but farmers are reluctant to invest in permanent machinery.',
      INVESTIGATE: 'Verifying his academic tenure at New Edinburgh. Dr. Vance’s brother is cleared with high reputation.'
    },
    statImpacts: {
      APPROVE: { foodCulture: 12, economy: 10, laborSupply: 8, communityTrust: 5 },
      DEPORT: { foodCulture: -10, economy: -5 },
      DELAY: { foodCulture: -2 },
      TEMPORARY: { foodCulture: 5, economy: 4 },
      INVESTIGATE: { foodCulture: 3, communityTrust: 3 }
    }
  },
  {
    id: 'zoe_brooks',
    name: 'Zoe Brooks',
    age: 23,
    origin: 'Greenland Communes',
    profession: 'Permaculture Designer',
    portraitSeed: 'zoe_portrait',
    avatarStyle: { skinColor: '#fca5a5', hairStyle: 'pigtails', hairColor: '#eab308', shirtColor: '#4d7c0f', accessory: 'flower' },
    reasonForEntry: 'Wants to setup community composting, rainwater harvesting, and organic mango orchards.',
    hiddenTraits: { honesty: 8, adaptability: 9, empathy: 9, ambition: 6, resilience: 8, risk: 2 },
    documents: {
      passport: { idNumber: 'MP-7729-Z', fullName: 'Zoe Brooks', expiryDate: '2027-07-20', hasTypo: false, notes: 'Smells of soil and lavender oil.' },
      workPermit: { idNumber: 'WP-ZOE-99', fullName: 'Zoe Brooks', expiryDate: '2026-03-12', hasTypo: false, notes: 'The permit is expired by three months.' }
    },
    dialogues: [
      { id: 'zb1', question: 'Your work permit is expired by three months, Zoe.', response: 'The postal service back in the communes got delayed by a strike! I sent the renewal papers in February, I swear. I can show you my digital shipping receipt!', clueBodyLanguage: 'Searches frantically through her hemp bag, pulling out crumpled receipts', reactionType: 'nervous' },
      { id: 'zb2', question: 'How do you plan to implement composting?', response: 'Every scrap of fish from Harbourfront and veg peelings from Market Square can be composted. No chemical fertilizers needed, pure rich soil for free!', clueBodyLanguage: 'Explains with huge excited gestures and wide eyes', reactionType: 'confident' }
    ],
    statements: [
      { topic: 'Work Permit Status', docStatement: 'Expired 3 months ago', verbalStatement: 'My permit is completely valid until next year, officer.', isDiscrepancy: true },
      { topic: 'Origin', docStatement: 'Greenland Communes', verbalStatement: 'I represent the Highland agricultural coop.', isDiscrepancy: false }
    ],
    referenceCheck: {
      prompt: 'Verify Greenland Communes renewal receipt.',
      result: 'TRUE. A renewal was filed under transaction #9910-Z, held up by postal union strike.',
      bodyLanguage: 'Zoe bites her lip and looks up with hopeful, nervous energy.'
    },
    consequenceSummary: {
      APPROVE: 'Zoe establishes a community permaculture circle. Green Hills and food culture benefit from massive delicious mango crops.',
      DEPORT: 'Deported. Composting is ignored; vegetable wastes Rot on streets, decreasing Public Health / Healthcare levels.',
      DELAY: 'You hold her papers. She teaches other detainees how to propagate seeds in soda cans. Very sweet.',
      TEMPORARY: 'Saves her permit. She works for 6 months, starting an beautiful nursery but has to leave right as the seedlings sprout.',
      INVESTIGATE: 'Rigorous check of her expired permit. It is validated through the postal union logs.'
    },
    statImpacts: {
      APPROVE: { foodCulture: 14, communityTrust: 10, healthcare: 5, economy: 5 },
      DEPORT: { healthcare: -10, communityTrust: -5, foodCulture: -5 },
      DELAY: { communityTrust: -1 },
      TEMPORARY: { foodCulture: 5, communityTrust: 3 },
      INVESTIGATE: { foodCulture: 2, communityTrust: 2 }
    },
    bribeDetails: {
      amount: 30,
      description: "A small hand-woven pouch made of grass reeds, containing $30 and fresh roasted cacao beans.",
      itemOffer: "Humble Reed envelope with cash",
      dialogOffer: "Officer, I know my permit has that unfortunate postal delay... I brought $30 for the 'fast filing fee' and some organic cocoa. Please, help me compost!"
    }
  },
  {
    id: 'rajesh_patel',
    name: 'Rajesh Patel',
    age: 33,
    origin: 'Gujarat Tech Hub',
    profession: 'Microgrid Solar Engineer',
    portraitSeed: 'rajesh_portrait',
    avatarStyle: { skinColor: '#dfa68c', hairStyle: 'spiky', hairColor: '#0f172a', shirtColor: '#1d4ed8', accessory: 'glasses' },
    reasonForEntry: 'Wants to setup solar microgrids at Industry Yard to prevent the frequent rolling brownouts.',
    hiddenTraits: { honesty: 9, adaptability: 8, empathy: 7, ambition: 9, resilience: 8, risk: 3 },
    documents: {
      passport: { idNumber: 'MP-4451-P', fullName: 'Rajesh Patel', expiryDate: '2028-01-18', hasTypo: false, notes: 'Passport contains multiple valid tech expo visas.' },
      workPermit: { idNumber: 'WP-GRID-02', fullName: 'Rajesh Patel', expiryDate: '2029-05-12', hasTypo: false, notes: 'Sponsorship by Mango Point Power Utility Corp.' }
    },
    dialogues: [
      { id: 'rp1', question: 'How serious are these power outages at Industry Yard?', response: 'Three hours of down-time per day costs local welders and fabricators 30% of their weekly wages. Outages ruin welding machines too! My solar micro-grid can buffer that completely.', clueBodyLanguage: 'Adjusts computer terminal on desk to show grid diagrams', reactionType: 'confident' },
      { id: 'rp2', question: 'Do you require government funding?', response: 'The local business alliance has co-signed my grant. No government money required, only permission to sync with the main transformers.', clueBodyLanguage: 'Nods with clear, concise technical explanations', reactionType: 'confident' }
    ],
    statements: [
      { topic: 'Transformers import', docStatement: 'Power inverter arrays', verbalStatement: 'I brought high-voltage medical x-ray machines for the hospital.', isDiscrepancy: true },
      { topic: 'Local sponsor', docStatement: 'Mango Point Power Utility Corp', verbalStatement: 'I have standard corporate endorsement from the power corp.', isDiscrepancy: false }
    ],
    referenceCheck: {
      prompt: 'Check Power Utility Corp endorsement status.',
      result: 'REPUTABLE. utility engineers are desperately awaiting Rajesh to install the transformer banks.',
      bodyLanguage: 'Rajesh looks extremely efficient, ready to start rewiring.'
    },
    consequenceSummary: {
      APPROVE: 'Rajesh brings stable solar energy. Heavy equipment runs 24/7. Economy, Labor Supply, and Public Safety surge.',
      DEPORT: 'Deported. Outages continue, leaving streets dark at night (reducing safety) and grinding industry to a halt.',
      DELAY: 'His shipment of lithium batteries is quarantined. Welders are upset.',
      TEMPORARY: 'Temporary status allows him to build a pilot grid. It works perfectly for 3 businesses, showing massive potential but restricted scale.',
      INVESTIGATE: 'Checking safety specifications of his inverter modules. Fully cleared without issues.'
    },
    statImpacts: {
      APPROVE: { economy: 18, laborSupply: 10, publicSafety: 8, housing: 5 },
      DEPORT: { economy: -12, publicSafety: -10, housing: -5 },
      DELAY: { economy: -4 },
      TEMPORARY: { economy: 8, laborSupply: 4 },
      INVESTIGATE: { economy: 3, publicSafety: 2 }
    }
  },
  {
    id: 'nadia_volkov',
    name: 'Nadia Volkov',
    age: 39,
    origin: 'Volgograd Alliance',
    profession: 'Heritage Hotel Restorer',
    portraitSeed: 'nadia_portrait',
    avatarStyle: { skinColor: '#eed2c4', hairStyle: 'bob-blonde', hairColor: '#fef08a', shirtColor: '#ca8a04', accessory: 'pearl-necklace' },
    reasonForEntry: 'Wants to purchase the abandoned colonial resort at Harbourfront and convert it into a sustainable ecotourism lodge.',
    hiddenTraits: { honesty: 7, adaptability: 8, empathy: 6, ambition: 10, resilience: 9, risk: 5 },
    documents: {
      passport: { idNumber: 'MP-0092-N', fullName: 'Nadia Volkov', expiryDate: '2026-12-31', hasTypo: false, notes: 'Dusted with fine glitter.' },
      workPermit: { idNumber: 'WP-HOTEL-77', fullName: 'Nadia Volkov', expiryDate: '2028-11-20', hasTypo: false, notes: 'Sponsored by Mango Point Tourism Association.' }
    },
    dialogues: [
      { id: 'nv1', question: 'This lodge would cater to wealthy tourists. How does that help locals?', response: 'We employ forty local housekeepers, guides, and chefs at double minimum wage! We also buy all our organic ingredients from Green Hills farmers.', clueBodyLanguage: 'Takes a slow sip of her water, perfectly composed', reactionType: 'confident' },
      { id: 'nv2', question: 'There are tax records missing from your tourism sponsorship filings.', response: 'These corporate lawyers always delay filings during mergers. I assure you, my bank guarantee sheet is fully liquid and cleared.', clueBodyLanguage: 'Smiles smoothly, moving her pearl necklace ever so slightly', reactionType: 'confident' }
    ],
    statements: [
      { topic: 'Budget Declared', docStatement: '500,000 credits asset holdings', verbalStatement: 'I have three million cash ready to invest right now.', isDiscrepancy: true },
      { topic: 'Investment Partner', docStatement: 'Pure Sea Ventures Co.', verbalStatement: 'My silent partner is Councilman Sterling.', isDiscrepancy: true }
    ],
    referenceCheck: {
      prompt: 'Check Pure Sea Ventures holding company filings.',
      result: 'WARNING. Pure Sea Ventures is a shell corporation linked to offshore tax avoidance. Sterling’s stake is hidden.',
      bodyLanguage: 'Nadia raises her eyebrows and smiles slightly. "Business is complex, officer."'
    },
    consequenceSummary: {
      APPROVE: 'Nadia opens the Luxury Coral Resort. Tourism booms. However, local fishermen complain of Beach privatization, lowering community trust.',
      DEPORT: 'Deported. The colonial lodge remains an eyesore, harboring vagrants and crumbling into the sea.',
      DELAY: 'Waiting in limbo. The hotel option expires. She loses interest and moves her money to Saint Kitts.',
      TEMPORARY: 'Allowed short-term. She hosts a high-profile fashion show, giving a short burst to Tourism, but investment falls short.',
      INVESTIGATE: 'Tracing Sterling’s shell company money. It reveals corrupt kickbacks, giving you high political reputation if you expose it!'
    },
    statImpacts: {
      APPROVE: { tourism: 25, economy: 15, communityTrust: -12, laborSupply: 5 },
      DEPORT: { tourism: -10, communityTrust: 5 },
      DELAY: { economy: -5, tourism: -5 },
      TEMPORARY: { tourism: 10, economy: 5 },
      INVESTIGATE: { communityTrust: 15, publicSafety: 10 }
    }
  },
  {
    id: 'tarek_mansoor',
    name: 'Tarek Mansoor',
    age: 45,
    origin: 'Alexandria Delta',
    profession: 'Irrigation & Drainage Mason',
    portraitSeed: 'tarek_portrait',
    avatarStyle: { skinColor: '#bd9a74', hairStyle: 'short-grey', hairColor: '#4b5563', shirtColor: '#b91c1c', accessory: 'none' },
    reasonForEntry: 'Wants to construct robust greywater filtering systems at Market Square and Hope Heights to combat sanitation failures.',
    hiddenTraits: { honesty: 10, adaptability: 7, empathy: 8, ambition: 5, resilience: 9, risk: 2 },
    documents: {
      passport: { idNumber: 'MP-9011-T', fullName: 'Tarek Mansoor', expiryDate: '2028-05-15', hasTypo: false, notes: 'Dry, simple, with water engineering stamps.' }
    },
    dialogues: [
      { id: 'tm1', question: 'How serious is the sanitation hazard in Market Square?', response: 'Right now, graywater from washing tubs mixes with drinking drainage when rain hits. A single cholera outbreak can paralyze the whole marketplace! I can build gravel-sand filters that clean 90% of it.', clueBodyLanguage: 'Draws concrete piping specs on a napkin', reactionType: 'confident' },
      { id: 'tm2', question: 'Do you have assistants?', response: 'I plan to hire ten local apprentices from Hope Heights. A good master mason teaches, he doesn’t just build alone.', clueBodyLanguage: 'Speaks with warm, caring eyes and calloused hands', reactionType: 'relieved' }
    ],
    statements: [
      { topic: 'Apprenticeships', docStatement: 'No local hires listed', verbalStatement: 'I will train ten local youths from the heights.', isDiscrepancy: true },
      { topic: 'Certification', docStatement: 'Delta Masonry League', verbalStatement: 'I am certified by Alexandria Masonry Guild.', isDiscrepancy: false }
    ],
    referenceCheck: {
      prompt: 'Check Alexandria Guild licensure.',
      result: 'CERTIFIED. He oversaw public aqueducts for 15 years, highly praised for community-led design.',
      bodyLanguage: 'Tarek relaxes his shoulders, waiting for approval.'
    },
    consequenceSummary: {
      APPROVE: 'Tarek installs high-efficiency filters. Cholera threat neutralized. Healthcare and Public Safety rise.',
      DEPORT: 'Deported. Drainage remains clogged. A heavy rainfall results in flooded market stalls and toxic runoff.',
      DELAY: 'Gravel shipping lines are delayed. He waits, but cannot lay down pipes.',
      TEMPORARY: 'Allowed for a 6 month repair contract. Good temporary fixed drainage but lacks long term upkeep.',
      INVESTIGATE: 'Checking concrete strength ratings. Pristine results.'
    },
    statImpacts: {
      APPROVE: { healthcare: 16, publicSafety: 12, laborSupply: 8, economy: 5 },
      DEPORT: { healthcare: -14, publicSafety: -8, economy: -5 },
      DELAY: { healthcare: -4 },
      TEMPORARY: { healthcare: 8, publicSafety: 5 },
      INVESTIGATE: { publicSafety: 3, healthcare: 3 }
    }
  },
  {
    id: 'chloe_dubois',
    name: 'Chloe Dubois',
    age: 24,
    origin: 'Paris Commune #12',
    profession: 'Community Mural Painter',
    portraitSeed: 'chloe_portrait',
    avatarStyle: { skinColor: '#fce7f3', hairStyle: 'beret', hairColor: '#b45309', shirtColor: '#db2777', accessory: 'paint-brush' },
    reasonForEntry: 'Wants to run youth art programs to transform gloomy industrial walls into vibrant murals.',
    hiddenTraits: { honesty: 8, adaptability: 9, empathy: 10, ambition: 7, resilience: 7, risk: 4 },
    documents: {
      passport: { idNumber: 'MP-5592-C', fullName: 'Chloe Dubois', expiryDate: '2027-02-14', hasTypo: false, notes: 'Passport is stained with magenta acrylic flecks.' }
    },
    dialogues: [
      { id: 'ch1', question: 'How can murals combat crime?', response: 'Murals take away empty grey walls that gangs tag. When community kids paint their own stories on walls, they protect those spaces and feel pride!', clueBodyLanguage: 'Smiles widely, her eyes shining with artistic energy', reactionType: 'confident' },
      { id: 'ch2', question: 'This paint cargo lists solvent-based chemicals. Mango Point has toxic strict limits.', response: 'These are water-based organic plant pigments! The customs officer saw "paint" and checked the hazardous box by mistake.', clueBodyLanguage: 'Points to watercolor plant swatches', reactionType: 'frustrated' }
    ],
    statements: [
      { topic: 'Hazardous Cargo', docStatement: 'Class 4 Solvent Paint Cargo', verbalStatement: 'I have non-toxic natural plant oil canvases.', isDiscrepancy: true },
      { topic: 'Local Sponsor', docStatement: 'Culture Corner Council', verbalStatement: 'The arts council supports my trip.', isDiscrepancy: false }
    ],
    referenceCheck: {
      prompt: 'Check natural pigments manufacturer.',
      result: 'REPUTABLE. Manufacturer confirms the paint lines contain no volatile solvents.',
      bodyLanguage: 'Chloe plays with her paintbrush, smiling hopefully.'
    },
    consequenceSummary: {
      APPROVE: 'Chloe coordinates youth muralists. Vibrant reggae and historical artwork adorn the blocks. Graffiti decreases; Community Trust and Tourism rise.',
      DEPORT: 'Deported. Dark industrial corridors remain bleak and tagged with intimidating gang marker taggings.',
      DELAY: 'Her paint brushes are impounded. She sketches charcoal drawings of port characters on scrap papers.',
      TEMPORARY: 'Admitted temporarily. She paints a single large pier wall, which looks gorgeous, but leaving the local classrooms unfinished.',
      INVESTIGATE: 'Auditing toxic rating of her paints. Cleared safely.'
    },
    statImpacts: {
      APPROVE: { communityTrust: 16, tourism: 10, foodCulture: 8, publicSafety: 5 },
      DEPORT: { communityTrust: -10, tourism: -5 },
      DELAY: { communityTrust: -2 },
      TEMPORARY: { communityTrust: 6, tourism: 5 },
      INVESTIGATE: { communityTrust: 4 }
    }
  },
  {
    id: 'samuel_taylor',
    name: 'Samuel "Stitch" Taylor',
    age: 32,
    origin: 'Savanna-la-Mar',
    profession: 'Tailor & Costume Designer',
    portraitSeed: 'samuel_portrait',
    avatarStyle: { skinColor: '#54301a', hairStyle: 'flat-top', hairColor: '#172554', shirtColor: '#ea580c', accessory: 'tape-measure' },
    reasonForEntry: 'Wants to open a tailoring workshop in Market Square, clothing local community bands and restoring pride.',
    hiddenTraits: { honesty: 9, adaptability: 8, empathy: 9, ambition: 6, resilience: 8, risk: 1 },
    documents: {
      passport: { idNumber: 'MP-3312-S', fullName: 'Samuel Taylor', expiryDate: '2029-08-01', hasTypo: false, notes: 'A sewing needle is stuck inside the sleeve cover.' }
    },
    dialogues: [
      { id: 'st1', question: 'Why tailoring for bands?', response: 'If the kids in the youth bands play steel drums in ragged shirts, they feel like beggars. Give them beautiful, colorful gold-dyed cotton shirts, and they play like royalty! Self-respect is the best social program.', clueBodyLanguage: 'Demonstrates stitch-work with swift hand loops', reactionType: 'confident' },
      { id: 'st2', question: 'How will you acquire your cotton fabrics?', response: 'I buy pure organic cotton from our local farms in Green Hills. We support each other; complete local cycle!', clueBodyLanguage: 'Stands tall, proud of local support network', reactionType: 'confident' }
    ],
    statements: [
      { topic: 'Cotton Origin', docStatement: 'Savanna-la-Mar Imports', verbalStatement: 'I will buy 100% of my fabric from the local Green Hills agricultural cooperative.', isDiscrepancy: true },
      { topic: 'Certification', docStatement: 'Savanna Guild of Master Tailors', verbalStatement: 'Guild certified for 12 years.', isDiscrepancy: false }
    ],
    referenceCheck: {
      prompt: 'Check Green Hills Agriculture cooperative.',
      result: 'CONFIRMED. Cooperative farmers are excited to sell their fiber harvest to Samuel’s tailoring workshop.',
      bodyLanguage: 'Samuel folds his hands, smiling warmly, wearing a custom jacket.'
    },
    consequenceSummary: {
      APPROVE: 'Samuel opens the Tailor Yard. Bands play in radiant apparel. Community Trust and Tourism soar; local pride spikes.',
      DEPORT: 'Deported. Bands look discombobulated, clothing remains expensive, imported synthetic wear dominates local market.',
      DELAY: 'His high-end vintage sewing machines are held up in inspection. Tailoring halts.',
      TEMPORARY: 'Admitted for festival preparation. He dresses one steel pan orchestra but can’t train permanent apprentices.',
      INVESTIGATE: 'Checking his material import certificates. Verified clean.'
    },
    statImpacts: {
      APPROVE: { communityTrust: 14, tourism: 8, economy: 8, foodCulture: 4 },
      DEPORT: { communityTrust: -8, economy: -4 },
      DELAY: { communityTrust: -2 },
      TEMPORARY: { communityTrust: 6, tourism: 4 },
      INVESTIGATE: { communityTrust: 3 }
    }
  },

  // ==========================================
  // RETURNING CHARACTERS PARTWAY EVENTS (16 - 20)
  // (Linked back to original Act 1 applicant IDs)
  // ==========================================
  {
    id: 'returning_chef_marcus_approved',
    isReturningVersionOf: 'chef_marcus',
    returningTriggerDecision: 'APPROVE',
    name: 'Marcus Chen (The Successful)',
    age: 38,
    origin: 'Mango Point',
    profession: 'Acclaimed Joint Owner',
    portraitSeed: 'marcus_portrait',
    avatarStyle: { skinColor: '#dfb08c', hairStyle: 'dreads-short', hairColor: '#1a1a1a', shirtColor: '#e05a47', accessory: 'gold-chef-hat' },
    reasonForEntry: 'Wants to expand his gourmet joint to double size, opening an official training school for poor youth.',
    hiddenTraits: { honesty: 10, adaptability: 9, empathy: 9, ambition: 9, resilience: 8, risk: 2 },
    documents: {
      passport: { idNumber: 'MP-8829-X', fullName: 'Marcus Chen', expiryDate: '2028-12-15', hasTypo: false, notes: 'Golden stamp of regional foodie winner on it.' }
    },
    dialogues: [
      { id: 'mra1', question: 'Officer! You approved my entry on day one. Do you remember?', response: 'Your stamp saved my spices! My Jerk-Fusion restaurant is the most popular in the Market Square now. I want to build a free training program for kids next door.', clueBodyLanguage: 'Hands over a box of fresh warm fusion chicken dumplings', reactionType: 'relieved' },
      { id: 'mra2', question: 'How is the restaurant doing?', response: 'Wonderful! Food writers from Kingston flew in. We boost Tourism, we hire local kitchen aids, but we need expanded building permits.', clueBodyLanguage: 'Beaming with immense warmth and gratitude', reactionType: 'confident' }
    ],
    statements: [
      { topic: 'Licensing', docStatement: 'Approved restaurant owner MP-883', verbalStatement: 'I am looking to buy the vacant lot in Hope Heights too.', isDiscrepancy: false }
    ],
    referenceCheck: {
      prompt: 'Verify restaurant financial logs.',
      result: 'EXCEPTIONAL. Revenues are excellent. Food culture of Mango Point is highly praised nationwide.',
      bodyLanguage: 'Marcus gives a deep respectful bow, presenting a gold-edged permit.'
    },
    consequenceSummary: {
      APPROVE: 'Marcus opens the "Deported Fusion Academe". Education and Food Culture jump. Dozens of kids learn professional trades, lowering crime.',
      DEPORT: 'Deported?! Inexplicable reversal! Citizens are outraged, protests hit Market Square. Community trust crumbles.',
      DELAY: 'Delayed. He waits patiently, but the vacant lot is sold to corporate speculators instead.',
      TEMPORARY: 'Allowed short lease of the vacant lot. Good culinary apprentice camps run but lack continuous stability.',
      INVESTIGATE: 'Inspecting corporate expansion files. Everything perfectly legitimate.'
    },
    statImpacts: {
      APPROVE: { foodCulture: 20, education: 15, economy: 10, communityTrust: 10 },
      DEPORT: { communityTrust: -25, foodCulture: -15, economy: -10 },
      DELAY: { communityTrust: -8 },
      TEMPORARY: { foodCulture: 10, education: 5 },
      INVESTIGATE: { foodCulture: 5, communityTrust: 5 }
    }
  },
  {
    id: 'returning_chef_marcus_deported',
    isReturningVersionOf: 'chef_marcus',
    returningTriggerDecision: 'DEPORT',
    name: 'Marcus Chen (The Smuggled)',
    age: 38,
    origin: 'Clandestine Cove',
    profession: 'Underground Jerk Smuggler',
    portraitSeed: 'marcus_disguised_portrait',
    avatarStyle: { skinColor: '#dfb08c', hairStyle: 'dreads-short', hairColor: '#4b5563', shirtColor: '#334155', accessory: 'eyepatch' },
    reasonForEntry: 'Attempting to enter with altered documents under a pseudonym to reunite with his family.',
    hiddenTraits: { honesty: 6, adaptability: 10, empathy: 8, ambition: 7, resilience: 9, risk: 7 },
    documents: {
      passport: { idNumber: 'MP-9910-Y', fullName: 'Mark Chan', expiryDate: '2027-11-12', hasTypo: false, notes: 'Passport feels slightly damp, like it fell in seawater.' }
    },
    dialogues: [
      { id: 'mrd1', question: 'Your name is listed as Mark Chan, but your fingerprint matches Marcus Chen?', response: 'Officer... please. You deported me in the starter city over minor permit slips. My wife and child live in Hope Heights. I had to use an alias to get on the cargo ferry. I want a second chance.', clueBodyLanguage: 'Whispers quietly, looking nervously around', reactionType: 'nervous' },
      { id: 'mrd2', question: 'How can I trust you if you use forged credentials?', response: 'If the legal gates are locked, a desperate husband can only climb the fence. My family is starving here. I only want to cook fusion food and live quietly, not cause trouble.', clueBodyLanguage: 'Nervous hands trembling, clutching his coat', reactionType: 'hesitant' }
    ],
    statements: [
      { topic: 'Identify match', docStatement: 'Mark Chan', verbalStatement: 'I am Marcus Chen, I cannot lie to you again.', isDiscrepancy: true },
      { topic: 'Accomplice', docStatement: 'N/A', verbalStatement: 'A smuggler on the Outer Reef docks gave me this paper.', isDiscrepancy: true }
    ],
    referenceCheck: {
      prompt: 'Check local family residency records.',
      result: 'TRUE. His wife (Alia Chen) and child are registered residents of Hope Heights, suffering from severe housing hardship.',
      bodyLanguage: 'Marcus hangs his head, tears in his eyes, waiting for your heart.'
    },
    consequenceSummary: {
      APPROVE: 'You show empathy and approve him. He reunites with family, opening a tiny lane restaurant. Community Trust and Food Culture skyrocket.',
      DEPORT: 'Deported again. Heartbreaking. His family lost all hope and moves out in despair, reducing Community Trust severely.',
      DELAY: 'He is kept in holding quarters, drawing attention and sympathy from human rights activists.',
      TEMPORARY: 'Allowed on temporary compassionate grounds. Temporary reprieve, but family remains stressed.',
      INVESTIGATE: 'Checking smuggler networks. You arrest the forged paper handler, but Marcus is devastated.'
    },
    statImpacts: {
      APPROVE: { communityTrust: 18, foodCulture: 12, healthcare: 5 },
      DEPORT: { communityTrust: -20, publicSafety: -5, healthcare: -5 },
      DELAY: { communityTrust: -5 },
      TEMPORARY: { communityTrust: 8, foodCulture: 4 },
      INVESTIGATE: { publicSafety: 10, communityTrust: -5 }
    }
  },
  {
    id: 'returning_dr_evelyn_deported',
    isReturningVersionOf: 'dr_evelyn',
    returningTriggerDecision: 'DEPORT',
    name: 'Dr. Evelyn Vance (The Advocate)',
    age: 44,
    origin: 'Health Rights Coalition',
    profession: 'Epidemiologist Relief Lead',
    portraitSeed: 'evelyn_advocate_portrait',
    avatarStyle: { skinColor: '#eed2c4', hairStyle: 'bun', hairColor: '#b45309', shirtColor: '#b91c1c', accessory: 'coalition-badge' },
    reasonForEntry: 'Returned with heavy backing of international health bodies to force open an epidemic triage center.',
    hiddenTraits: { honesty: 10, adaptability: 8, empathy: 9, ambition: 7, resilience: 10, risk: 4 },
    documents: {
      passport: { idNumber: 'MP-1102-V', fullName: 'Evelyn Vance', expiryDate: '2029-01-10', hasTypo: false, notes: 'Flawlessly reprinted digital card, backed by WHO-style coalition.' },
      workPermit: { idNumber: 'WP-VANCE-COALITION', fullName: 'Evelyn Vance', expiryDate: '2031-12-01', hasTypo: false, notes: 'Inter-governmental diplomatic credential passport.' }
    },
    dialogues: [
      { id: 'erd1', question: 'Doctor, you are back with quite a few credentials.', response: 'Yes. Because you deported me in the starter city, the local malaria strain mutated and infected eighty children in Mango Point! Now, the Health Rights Coalition represents me. You cannot turn me away for a spelling mistake this time.', clueBodyLanguage: 'Speaks with fierce, unyielding clinical authority', reactionType: 'confident' },
      { id: 'erd2', question: 'What is your current medical plan?', response: 'Deploying direct sterile supply crates to Hope Heights and creating water treatment modules. It is a critical humanitarian layout.', clueBodyLanguage: 'Stands with perfect, powerful diplomatic posture', reactionType: 'confident' }
    ],
    statements: [
      { topic: 'Budget Sponsorship', docStatement: 'Health Coalition Core Budget', verbalStatement: 'All resources are backed by inter-governmental funding.', isDiscrepancy: false }
    ],
    referenceCheck: {
      prompt: 'Check Health Coalition active charter.',
      result: 'DIPLOMATIC CLEARED. Turning her away would result in major international sanctions and scandal.',
      bodyLanguage: 'Evelyn crosses her arms, looking directly into your eyes.'
    },
    consequenceSummary: {
      APPROVE: 'Dr. Vance stops the outbreak. Healthcare improves by massive bounds, and Community Trust is slowly repaired.',
      DEPORT: 'YOU REJECTED HER TWICE?! Massive international outrage. The Coalition files human rights violations. Your reputation crashes to zero.',
      DELAY: 'Delaying her results in three more hospital admissions. Healthcare drops.',
      TEMPORARY: 'Allowed conditionally. She heals people, but critiques the officer at every medical seminar.',
      INVESTIGATE: 'Checking legal treaties. Completely valid; wasting critical medical hours.'
    },
    statImpacts: {
      APPROVE: { healthcare: 25, communityTrust: 15, publicSafety: 10 },
      DEPORT: { publicSafety: -40, healthcare: -20, communityTrust: -20 },
      DELAY: { healthcare: -10, communityTrust: -5 },
      TEMPORARY: { healthcare: 12, communityTrust: 5 },
      INVESTIGATE: { healthcare: 4, communityTrust: -22 }
    }
  },
  {
    id: 'returning_leon_sterling_approved',
    isReturningVersionOf: 'leon_sterling',
    returningTriggerDecision: 'APPROVE',
    name: 'Leon Sterling (The Crime Boss)',
    age: 29,
    origin: 'Mango Point Dock Syndicate',
    profession: 'Bar & Casino Kingpin',
    portraitSeed: 'leon_boss_portrait',
    avatarStyle: { skinColor: '#c29774', hairStyle: 'slick-back', hairColor: '#2b2b2b', shirtColor: '#000000', accessory: 'massive-diamond' },
    reasonForEntry: 'Returning with a convoy of five trucks containing "entertainment machinery." Suspected of shipping automatic handguns embedded in slots.',
    hiddenTraits: { honesty: 2, adaptability: 9, empathy: 3, ambition: 10, resilience: 6, risk: 9 },
    documents: {
      passport: { idNumber: 'MP-0071-S', fullName: 'Leon Sterling', expiryDate: '2030-05-15', hasTypo: false, notes: 'Passport bound in pure stingray skin.' }
    },
    dialogues: [
      { id: 'lra1', question: 'Leon. What is inside those slot container crates?', response: 'Just modern mechanical spinning wheels, officer! Our guest patrons like the physical click-noise. I bought you a beautiful pearl lighter from Nassau, by the way.', clueBodyLanguage: 'Attempts to slip a velvet gift pouch onto the ledger book', reactionType: 'confident' },
      { id: 'lra2', question: 'I heard rumors of weapons smuggling.', response: 'Weapons? What would a humble club owner do with iron? Spilling blood ruins the carpet! Good business needs peace, officer.', clueBodyLanguage: 'Spreads hands innocently, chuckling deeply', reactionType: 'confident' }
    ],
    statements: [
      { topic: 'Crate Contents', docStatement: 'Amusement wheels', verbalStatement: 'My guys loaded some titanium alloy cases, heavy stuff.', isDiscrepancy: true },
      { topic: 'Bribe Attempt', docStatement: 'N/A', verbalStatement: 'Oh, that is just a vintage lighter, no bribe at all.', isDiscrepancy: true }
    ],
    referenceCheck: {
      prompt: 'Perform a deep metal-detector scan on cargo containers.',
      result: 'ALERT. Scan shows dense hollow cavities matching standard automatic weapons barrels inside the roulette mechanisms.',
      bodyLanguage: 'Leon’s smile slightly freezes. He tapping his heavy gold rings.'
    },
    consequenceSummary: {
      APPROVE: 'You took his bribe or chose to approve him. Gangs are heavily armed; street warfare breaks out. Public Safety plummets to critical safety, though Economy spikes briefly.',
      DEPORT: 'Deported. He retreats, vowing revenge. Dock workers look relieved, and police intercept the weapon crates at the coast, raising safety.',
      DELAY: 'He slide-bribes the guards, and his trucks vanish overnight. Extremely corrupt layout.',
      TEMPORARY: 'Allowed conditionally. He operates slots under armed guards but smuggles anyway.',
      INVESTIGATE: 'EXPOSED! You raid his slot arrays. The police arrest his entire syndicate. You are celebrated as a legendary officer, skyrocketing reputation and safety!'
    },
    statImpacts: {
      APPROVE: { publicSafety: -35, economy: 15, communityTrust: -20, tourism: -10 },
      DEPORT: { publicSafety: 15, communityTrust: 10, economy: -5 },
      DELAY: { publicSafety: -15, communityTrust: -10 },
      TEMPORARY: { publicSafety: -10, economy: 5 },
      INVESTIGATE: { publicSafety: 50, communityTrust: 25 }
    }
  },
  {
    id: 'returning_maya_song_approved',
    isReturningVersionOf: 'maya_song',
    returningTriggerDecision: 'APPROVE',
    name: 'Maya Song (The Principal)',
    age: 31,
    origin: 'Hope Academy District',
    profession: 'Community School President',
    portraitSeed: 'maya_principal_portrait',
    avatarStyle: { skinColor: '#f3e8ff', hairStyle: 'fringe', hairColor: '#1e1b4b', shirtColor: '#9333ea', accessory: 'gold-badge' },
    reasonForEntry: 'Wants safe funding clearance to construct secondary trade workshops for young adults.',
    hiddenTraits: { honesty: 10, adaptability: 8, empathy: 10, ambition: 8, resilience: 9, risk: 2 },
    documents: {
      passport: { idNumber: 'MP-9921-S', fullName: 'Maya Song', expiryDate: '2030-08-11', hasTypo: false, notes: 'Passport is very worn, stamped with dozens of children aid seals.' }
    },
    dialogues: [
      { id: 'mra_1', question: 'How is the Hope Heights School progressing?', response: 'Due to your trust on day one, we educated four hundred children last year! Now we want to build a vocational trade woodshop for the older teens so they can join the carpentry union.', clueBodyLanguage: 'Hands over beautiful thank you letters handmade by her students', reactionType: 'relieved' },
      { id: 'mra_2', question: 'Do you need district approval?', response: 'We have cleared the municipal zoning. We only need the capital trade grant released, which requires your supervisor sign-off.', clueBodyLanguage: 'Speaks with immense hope and radiant confidence', reactionType: 'confident' }
    ],
    statements: [
      { topic: 'Grant clearance', docStatement: 'Vocational trade woodshop', verbalStatement: 'We will train teens in high-tech fiber glass hull repair.', isDiscrepancy: true }
    ],
    referenceCheck: {
      prompt: 'Verify trade guild sponsorship.',
      result: 'AUTHENTIC. The carpenter guild loves her program and will hire every student she certifies.',
      bodyLanguage: 'Maya stands proudly, glowing with genuine hope.'
    },
    consequenceSummary: {
      APPROVE: 'Trade workshop is fully funded. Dozens of youths become certified union carpenters. Education, Labor Supply, and Economy boom.',
      DEPORT: 'Deported?! The schoolhouse is forced to shut down. Protests hit the streets. Massive social collapse.',
      DELAY: 'Delayed. Teens miss the carpenter guild deadline, returning to street drifting.',
      TEMPORARY: 'Admitted on short vocational lease. Good summer camp but training holds no permanent licensing power.',
      INVESTIGATE: 'Checking safety ratings of vocational circular saws. Perfect ratings.'
    },
    statImpacts: {
      APPROVE: { education: 22, laborSupply: 15, economy: 10, communityTrust: 10 },
      DEPORT: { education: -25, communityTrust: -25, economy: -10 },
      DELAY: { education: -5, communityTrust: -5 },
      TEMPORARY: { education: 8, laborSupply: 5 },
      INVESTIGATE: { education: 4, communityTrust: 2 }
    }
  }
];

// Combine regular and returning applicants helper
export function getApplicantForDay(day: number, decisionsHistory: any[]): Applicant {
  // Let's decide who appears based on the current day!
  // Act 1: Days 1 to 5.
  // Day 1: Chef Marcus
  // Day 2: Dr. Evelyn Vance
  // Day 3: Leon Sterling
  // Day 4: Maya Song
  // Day 5: Kofi Juma
  // Transition to Act 2 (Cinematic Relocation)
  // Act 3: Days 6 to 15. Active in Mango Point!
  // Day 6: Althea Bailey
  // Day 7: Cassandra Reyes
  // Day 8: Devon Higgins
  // Day 9: Rajesh Patel
  // Day 10: Returning character #1 (Chef Marcus returns based on past decision!)
  // Day 11: Julian Vance
  // Day 12: Returning character #2 (Dr. Evelyn Vance returns if deported, or Zoe Brooks if not)
  // Day 13: Returning character #3 (Leon Sterling returns!)
  // Day 14: Returning character #4 (Maya Song returns!)
  // Day 15: Zoe Brooks or Chloe Dubois or Sam Taylor (Fresh grand finale applicant!)

  // Act 1 Days
  if (day === 1) return APPLICANTS.find(a => a.id === 'chef_marcus')!;
  if (day === 2) return APPLICANTS.find(a => a.id === 'dr_evelyn')!;
  if (day === 3) return APPLICANTS.find(a => a.id === 'leon_sterling')!;
  if (day === 4) return APPLICANTS.find(a => a.id === 'maya_song')!;
  if (day === 5) return APPLICANTS.find(a => a.id === 'kofi_juma')!;

  // Act 3 Days (Mango Point)
  if (day === 6) return APPLICANTS.find(a => a.id === 'althea_bailey')!;
  if (day === 7) return APPLICANTS.find(a => a.id === 'cassandra_reyes')!;
  if (day === 8) return APPLICANTS.find(a => a.id === 'devon_higgins')!;
  if (day === 9) return APPLICANTS.find(a => a.id === 'rajesh_patel')!;

  // Day 10: Chef Marcus returns!
  if (day === 10) {
    const marcusDecision = decisionsHistory.find(h => h.applicantId === 'chef_marcus')?.decision;
    if (marcusDecision === 'APPROVE') {
      return APPLICANTS.find(a => a.id === 'returning_chef_marcus_approved')!;
    } else {
      // If deported, delayed, temporary or investigated -> returns as smuggled/disguised
      return APPLICANTS.find(a => a.id === 'returning_chef_marcus_deported')!;
    }
  }

  if (day === 11) return APPLICANTS.find(a => a.id === 'professor_julian')!;

  // Day 12: Dr. Evelyn Vance returns if she was deported! Otherwise Zoe Brooks.
  if (day === 12) {
    const evelynDecision = decisionsHistory.find(h => h.applicantId === 'dr_evelyn')?.decision;
    if (evelynDecision === 'DEPORT') {
      return APPLICANTS.find(a => a.id === 'returning_dr_evelyn_deported')!;
    } else {
      return APPLICANTS.find(a => a.id === 'zoe_brooks')!;
    }
  }

  // Day 13: Leon Sterling returns!
  if (day === 13) {
    const leonDecision = decisionsHistory.find(h => h.applicantId === 'leon_sterling')?.decision;
    if (leonDecision === 'APPROVE') {
      return APPLICANTS.find(a => a.id === 'returning_leon_sterling_approved')!;
    } else {
      return APPLICANTS.find(a => a.id === 'tarek_mansoor')!;
    }
  }

  // Day 14: Maya Song returns!
  if (day === 14) {
    const mayaDecision = decisionsHistory.find(h => h.applicantId === 'maya_song')?.decision;
    if (mayaDecision === 'APPROVE') {
      return APPLICANTS.find(a => a.id === 'returning_maya_song_approved')!;
    } else {
      return APPLICANTS.find(a => a.id === 'chloe_dubois')!;
    }
  }

  // Day 15: Grand finale
  if (day === 15) {
    return APPLICANTS.find(a => a.id === 'samuel_taylor')!;
  }

  // Backup in case day index overflows
  return APPLICANTS[day % APPLICANTS.length];
}
