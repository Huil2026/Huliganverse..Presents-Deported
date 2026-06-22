import React from 'react';

interface PortraitProps {
  skinColor: string;
  hairStyle: string;
  hairColor: string;
  shirtColor: string;
  accessory: string;
  expression: 'neutral' | 'nervous' | 'confident' | 'hesitant' | 'frustrated' | 'relieved';
  seed?: string;
}

export const PortraitGenerator: React.FC<PortraitProps> = ({
  skinColor,
  hairStyle,
  hairColor,
  shirtColor,
  accessory,
  expression
}) => {
  // Determine facial features based on expression
  let eyeY = 115;
  let eyeHeight = 10;
  let eyeWidth = 10;
  let mouthPath = "M 135 155 Q 150 165 165 155"; // Happy arc by default
  let browLeft = "M 120 100 L 140 102";
  let browRight = "M 160 102 L 180 100";
  let showSweat = false;
  let showSparkle = false;

  switch (expression) {
    case 'nervous':
      eyeHeight = 6;
      mouthPath = "M 138 155 Q 150 155 162 155"; // Straight line
      browLeft = "M 120 95 L 140 105"; // Worried slant up
      browRight = "M 160 105 L 180 95";
      showSweat = true;
      break;
    case 'confident':
      eyeHeight = 12;
      mouthPath = "M 130 150 Q 150 172 170 150"; // Broad smile
      browLeft = "M 120 95 L 140 98"; // relaxed high eyebrows
      browRight = "M 160 98 L 180 95";
      showSparkle = true;
      break;
    case 'hesitant':
      eyeHeight = 8;
      mouthPath = "M 135 158 Q 150 152 165 154"; // Wobbly wave
      browLeft = "M 120 102 L 140 104";
      browRight = "M 160 101 L 180 103";
      break;
    case 'frustrated':
      eyeHeight = 6;
      mouthPath = "M 135 162 Q 150 148 165 162"; // Big frown
      browLeft = "M 120 105 L 140 95"; // Angry slant down
      browRight = "M 160 95 L 180 105";
      break;
    case 'relieved':
      eyeHeight = 2; // Sleepy closed eyes
      mouthPath = "M 132 150 Q 150 168 168 150"; // Happy sigh smile
      browLeft = "M 120 98 L 140 99";
      browRight = "M 160 99 L 180 98";
      break;
    case 'neutral':
    default:
      eyeHeight = 9;
      mouthPath = "M 135 154 Q 150 160 165 154"; // Relaxed gentle grin
      break;
  }

  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 bg-slate-800/80 rounded-2xl border-4 border-amber-400 overflow-hidden shadow-xl flex items-center justify-center p-2">
      {/* Dynamic Background Rays or Accents */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/40 via-transparent to-amber-950/30 pointer-events-none" />

      {/* SVG canvas */}
      <svg viewBox="0 0 300 300" className="w-full h-full select-none">
        
        {/* Background Elements (Sunburst underlay) */}
        <circle cx="150" cy="150" r="130" fill="none" stroke="rgba(251, 191, 36, 0.1)" strokeWidth="6" strokeDasharray="10 10" className="animate-spin" style={{ animationDuration: '60s' }} />

        {/* Hair Back layer (for dreads or long hair) */}
        {(hairStyle === 'dreads-tall' || hairStyle === 'dreads-short' || hairStyle === 'pigtails') && (
          <g fill={hairColor}>
            {hairStyle === 'dreads-tall' && (
              <>
                <rect x="70" y="80" width="30" height="150" rx="15" />
                <rect x="200" y="80" width="30" height="150" rx="15" />
                <rect x="50" y="100" width="25" height="120" rx="12" />
                <rect x="225" y="100" width="25" height="120" rx="12" />
              </>
            )}
            {hairStyle === 'dreads-short' && (
              <>
                <rect x="80" y="90" width="22" height="90" rx="11" />
                <rect x="198" y="90" width="22" height="90" rx="11" />
                <rect x="65" y="105" width="20" height="70" rx="10" />
                <rect x="215" y="105" width="20" height="70" rx="10" />
              </>
            )}
            {hairStyle === 'pigtails' && (
              <>
                <circle cx="70" cy="90" r="30" />
                <circle cx="230" cy="90" r="30" />
                <rect x="40" y="90" width="20" height="60" rx="10" transform="rotate(15 40 90)" />
                <rect x="240" y="90" width="20" height="60" rx="10" transform="rotate(-15 240 90)" />
              </>
            )}
          </g>
        )}

        {/* Ears */}
        <circle cx="85" cy="140" r="18" fill={skinColor} stroke="#1e293b" strokeWidth="3" />
        <circle cx="215" cy="140" r="18" fill={skinColor} stroke="#1e293b" strokeWidth="3" />
        <circle cx="85" cy="140" r="8" fill="rgba(0,0,0,0.15)" />
        <circle cx="215" cy="140" r="8" fill="rgba(0,0,0,0.15)" />

        {/* Ear accessories */}
        {accessory === 'earring' && (
          <ellipse cx="85" cy="158" rx="8" ry="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
        )}

        {/* Neck */}
        <rect x="125" y="180" width="50" height="50" fill={skinColor} stroke="#1e293b" strokeWidth="4" rx="5" />
        <path d="M 125 180 Q 150 205 175 180" fill="rgba(0,0,0,0.15)" />

        {/* Face Base */}
        <circle cx="150" cy="140" r="68" fill={skinColor} stroke="#1e293b" strokeWidth="4" />

        {/* Shoulder & Shirt */}
        <path d="M 60 300 Q 60 220 150 220 Q 240 220 240 300 Z" fill={shirtColor} stroke="#1e293b" strokeWidth="4" />
        {/* Shirt Collar / Neckline */}
        <path d="M 120 220 Q 150 245 180 220" fill="none" stroke="#1e293b" strokeWidth="4" />
        {/* High vis vest straps if safety vest */}
        {accessory === 'safety-vest' && (
          <>
            <path d="M 90 225 L 120 300" fill="none" stroke="#fbbf24" strokeWidth="12" />
            <path d="M 210 225 L 180 300" fill="none" stroke="#fbbf24" strokeWidth="12" />
            <path d="M 80 260 H 220" fill="none" stroke="#fbbf24" strokeWidth="12" />
            <rect x="135" y="245" width="30" height="20" fill="#f8fafc" rx="2" stroke="#1e293b" strokeWidth="2" />
          </>
        )}

        {/* Gold Chain */}
        {accessory === 'gold-chain' && (
          <path d="M 115 220 Q 150 250 185 220" fill="none" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
        )}

        {/* Eyebrows */}
        <path d={browLeft} stroke="#1e293b" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d={browRight} stroke="#1e293b" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Eyes */}
        {expression === 'relieved' ? (
          <>
            {/* Curved closed eyes */}
            <path d="M 115 118 Q 125 108 135 118" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
            <path d="M 165 118 Q 175 108 185 118" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="125" cy={eyeY} rx={eyeWidth} ry={eyeHeight} fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
            <ellipse cx="175" cy={eyeY} rx={eyeWidth} ry={eyeHeight} fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
            {/* Irises focusing */}
            <circle cx="125" cy={eyeY} r="5" fill="#1e293b" />
            <circle cx="175" cy={eyeY} r="5" fill="#1e293b" />
            <circle cx="127" cy={eyeY - 2} r="2" fill="#ffffff" />
            <circle cx="177" cy={eyeY - 2} r="2" fill="#ffffff" />
          </>
        )}

        {/* Nose */}
        <path d="M 150 120 L 145 140 L 155 140" fill="none" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Mouth */}
        <path d={mouthPath} fill="none" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />

        {/* Cheeks blush/lines */}
        {expression === 'relieved' && (
          <>
            <ellipse cx="112" cy="140" rx="8" ry="4" fill="#f43f5e" opacity="0.25" />
            <ellipse cx="188" cy="140" rx="8" ry="4" fill="#f43f5e" opacity="0.25" />
          </>
        )}

        {/* Glasses accessory */}
        {accessory === 'glasses' && (
          <g stroke="#0f172a" strokeWidth="4.5" fill="none">
            <rect x="105" y="105" width="38" height="28" rx="8" fill="rgba(14, 165, 233, 0.15)" />
            <rect x="157" y="105" width="38" height="28" rx="8" fill="rgba(14, 165, 233, 0.15)" />
            <line x1="143" y1="118" x2="157" y2="118" />
            <path d="M 105 115 Q 90 110 85 118" />
            <path d="M 195 115 Q 210 110 215 118" />
          </g>
        )}

        {/* Hair Front Layer */}
        <g fill={hairColor}>
          {hairStyle === 'dreads-tall' && (
            <>
              {/* Roots on head */}
              <path d="M 90 90 Q 150 40 210 90 Q 200 60 150 65 Q 100 60 90 90 Z" />
              <rect x="135" y="45" width="30" height="20" rx="5" fill="#f59e0b" /> {/* Dread tie band */}
            </>
          )}
          {hairStyle === 'dreads-short' && (
            <path d="M 85 92 Q 150 45 215 92 Q 180 65 150 68 Q 120 65 85 92 Z" />
          )}
          {hairStyle === 'bun' && (
            <>
              <circle cx="150" cy="50" r="28" stroke="#1e293b" strokeWidth="4" />
              <path d="M 85 95 Q 150 65 215 95 Q 150 85 85 95" stroke="#1e293b" strokeWidth="3" />
            </>
          )}
          {hairStyle === 'slick-back' && (
            <path d="M 90 95 Q 150 50 210 95 Q 150 78 90 95" stroke="#1e293b" strokeWidth="3" />
          )}
          {hairStyle === 'fringe' && (
            <>
              <path d="M 84 96 Q 150 55 216 96 Q 190 70 150 90 Q 110 70 84 96 Z" />
              {/* side bangs cut-in */}
              <path d="M 84 96 L 90 130" stroke="#1e293b" strokeWidth="4" />
              <path d="M 216 96 L 210 130" stroke="#1e293b" strokeWidth="4" />
            </>
          )}
          {hairStyle === 'bald' && (
            // No hair back, maybe a slight shadow ring for stubble
            <path d="M 90 92 Q 150 60 210 92" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="8" />
          )}
          {hairStyle === 'bandana' && (
            <g>
              <path d="M 85 95 Q 150 60 215 95 Q 150 80 85 95" stroke="#1e293b" strokeWidth="3" fill="#ef4444" />
              {/* Tie knots */}
              <path d="M 210 95 Q 230 100 220 115" stroke="#1e293b" strokeWidth="3" fill="#ef4444" />
              <circle cx="215" cy="98" r="5" fill="#ef4444" />
            </g>
          )}
          {hairStyle === 'beret' && (
            <g>
              <ellipse cx="145" cy="65" rx="60" ry="18" fill="#1e1b4b" stroke="#0f172a" strokeWidth="3.5" transform="rotate(-10 145 65)" />
              <rect x="140" y="42" width="6" height="12" rx="2" fill="#1e1b4b animate-bounce" />
            </g>
          )}
          {hairStyle === 'pigtails' && (
            <path d="M 84 96 Q 150 65 216 96 Q 150 85 84 96" />
          )}
          {hairStyle === 'receding' && (
            <g>
              <path d="M 86 100 Q 100 90 110 96 C 120 70 180 70 190 96 Q 200 90 214 100 C 220 120 220 135 218 150" fill="none" stroke="#1e293b" strokeWidth="8.5" strokeLinecap="round" />
            </g>
          )}
          {hairStyle === 'spiky' && (
            <path d="M 85 95 L 95 75 L 110 88 L 125 65 L 140 85 L 155 60 L 170 85 L 185 68 L 198 86 L 210 72 L 215 95 Z" stroke="#1e293b" strokeWidth="3" />
          )}
        </g>

        {/* Extra accessories (Chef Hat, Stethoscope, Tape Measure, Flower, Brush) */}
        {accessory === 'chef-hat' && (
          <g>
            <path d="M 110 85 Q 110 30 130 30 Q 150 20 170 30 Q 190 30 190 85 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="3.5" />
            <rect x="115" y="65" width="70" height="20" fill="#f8fafc" stroke="#1e293b" strokeWidth="3.5" rx="3" />
          </g>
        )}
        {accessory === 'gold-chef-hat' && (
          <g>
            <path d="M 110 85 Q 110 30 130 30 Q 150 20 170 30 Q 190 30 190 85 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="3.5" />
            <rect x="115" y="65" width="70" height="20" fill="#f59e0b" stroke="#d97706" strokeWidth="3.5" rx="3" />
          </g>
        )}
        {accessory === 'stethoscope' && (
          <path d="M 110 220 Q 110 260 150 260 Q 190 260 190 220" fill="none" stroke="#94a3b8" strokeWidth="5.5" strokeLinecap="round" />
        )}
        {accessory === 'tape-measure' && (
          <path d="M 98 220 Q 110 230 130 255 Q 140 230 180 221" fill="none" stroke="#fbbf24" strokeWidth="4.5" strokeDasharray="5 3" />
        )}
        {accessory === 'paint-brush' && (
          <g>
            {/* Brush nested behind neck */}
            <rect x="200" y="165" width="8" height="50" fill="#b45309" stroke="#1e293b" strokeWidth="1.5" transform="rotate(35 200 165)" />
            <path d="M 230 215 Q 240 225 242 220" fill="#db2777" stroke="#1e293b" strokeWidth="1.5" />
          </g>
        )}
        {accessory === 'flower' && (
          <g transform="translate(198, 88)">
            <circle cx="0" cy="0" r="5" fill="#facc15" />
            <circle cx="-6" cy="-6" r="5" fill="#ffffff" />
            <circle cx="6" cy="-6" r="5" fill="#ffffff" />
            <circle cx="-6" cy="6" r="5" fill="#ffffff" />
            <circle cx="6" cy="6" r="5" fill="#ffffff" />
          </g>
        )}

        {/* Expression Overlays: Sweat particles (Nervous) */}
        {showSweat && (
          <g fill="#38bdf8" className="animate-bounce">
            <ellipse cx="102" cy="110" rx="3" ry="5" />
            <ellipse cx="198" cy="120" rx="2.5" ry="4" />
            <path d="M 120 150 Q 120 160 118 165" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          </g>
        )}

        {/* Expression Overlays: Sparkles (Confident) */}
        {showSparkle && (
          <g fill="#fbbf24">
            {/* Starburst */}
            <path d="M 92 88 L 94 94 L 100 96 L 94 98 L 92 104 L 90 98 L 84 96 L 90 94 Z" />
            <path d="M 206 100 L 208 104 L 214 106 L 208 108 L 206 114 L 204 108 L 198 106 L 204 104 Z" />
          </g>
        )}

      </svg>
    </div>
  );
};
