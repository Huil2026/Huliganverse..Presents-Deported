import React, { useState, useEffect } from 'react';
import { Applicant, DecisionType, StatementComparison } from '../types';
import { PortraitGenerator } from './PortraitGenerator';
import {
  FileText, Search, PhoneCall, Check, AlertTriangle, BookOpen, Clock,
  Stamp, UserCheck, ShieldAlert, BadgeInfo, HelpCircle, ArrowRight,
  Coins, Gift, DollarSign, CheckCircle
} from 'lucide-react';

interface InterviewUIProps {
  applicant: Applicant;
  onDecision: (decision: DecisionType) => void;
  day: number;
  onBribeAction?: (applicantId: string, action: 'ACCEPTED' | 'REJECTED' | 'REPORTED', amount: number) => void;
  bribeStatus?: 'ACCEPTED' | 'REJECTED' | 'REPORTED';
}

export const InterviewUI: React.FC<InterviewUIProps> = ({
  applicant,
  onDecision,
  day,
  onBribeAction,
  bribeStatus
}) => {
  // State managers
  const [activeDocTab, setActiveDocTab] = useState<'passport' | 'permit' | 'reference'>('passport');
  const [conversationHistory, setConversationHistory] = useState<{ q: string; r: string; reaction: any }[]>([]);
  const [currentExpression, setCurrentExpression] = useState<'neutral' | 'nervous' | 'confident' | 'hesitant' | 'frustrated' | 'relieved'>('neutral');
  const [currentBodyLanguage, setCurrentBodyLanguage] = useState<string>('Candidate sits upright, waiting patiently for your questioning.');
  
  // Reference checking State
  const [isVerifyingRef, setIsVerifyingRef] = useState<boolean>(false);
  const [isCheckedRef, setIsCheckedRef] = useState<boolean>(false);
  const [refResult, setRefResult] = useState<string>('');

  // Discrepancy confront tracker
  const [selectedDiscrepancy, setSelectedDiscrepancy] = useState<StatementComparison | null>(null);
  const [confrontedStatement, setConfrontedStatement] = useState<string>('');

  // Checklist of observed traits
  const [cluesChecklist, setCluesChecklist] = useState<{ [key: string]: boolean }>({
    nervousnessChecked: false,
    discrepancyChecked: false,
    referenceChecked: false,
    honestySuspected: false
  });

  // Stamp overlay animation state
  const [stampedDecision, setStampedDecision] = useState<DecisionType | null>(null);
  const [armedStamp, setArmedStamp] = useState<DecisionType | null>(null);
  const [physicalInkStamp, setPhysicalInkStamp] = useState<{ type: DecisionType; x: number; y: number; rotate: number } | null>(null);

  // Restart settings when applicant changes
  useEffect(() => {
    setConversationHistory([]);
    setCurrentExpression('neutral');
    setCurrentBodyLanguage('Candidate adjustments settled.');
    setIsVerifyingRef(false);
    setIsCheckedRef(false);
    setRefResult('');
    setSelectedDiscrepancy(null);
    setConfrontedStatement('');
    setStampedDecision(null);
    setArmedStamp(null);
    setPhysicalInkStamp(null);
    setCluesChecklist({
      nervousnessChecked: false,
      discrepancyChecked: false,
      referenceChecked: false,
      honestySuspected: false
    });
  }, [applicant]);

  // Handle Question ask
  const handleAskQuestion = (qId: string, questionText: string, rText: string, bodyLanguage: string, reactionType: any) => {
    // Add to history
    setConversationHistory(prev => [...prev, { q: questionText, r: rText, reaction: reactionType }]);
    
    // Set portrait reaction
    setCurrentExpression(reactionType);
    setCurrentBodyLanguage(bodyLanguage);
  };

  // Run reference check trigger
  const handleCheckReference = () => {
    setIsVerifyingRef(true);
    setTimeout(() => {
      setIsVerifyingRef(false);
      setIsCheckedRef(true);
      setRefResult(applicant.referenceCheck.result);
      setCurrentExpression('confident');
      setCurrentBodyLanguage(applicant.referenceCheck.bodyLanguage);
    }, 1500);
  };

  // Confront applicant regarding discrepancy
  const handleConfrontdiscrepancy = (disc: StatementComparison) => {
    setSelectedDiscrepancy(disc);
    setCurrentExpression('nervous');
    
    let answerText = "I... I made an error on my statement, officer. The document is correct.";
    if (applicant.id === 'leon_sterling') {
      answerText = "Officer! Those wooden toys carry... internal computer processors inside! It’s all a tech integration, totally legal under standard Reef loopholes!";
    } else if (applicant.id === 'zoe_brooks') {
      answerText = "Honestly, the permit office took too long, so I told myself a tiny survival lie. Please, the compost is ready!";
    } else if (applicant.id === 'nadia_volkov') {
      answerText = "Capital investments require custom shell partners, officer. High finance isn’t a neat clerk box.";
    }

    setConfrontedStatement(answerText);
    setCurrentBodyLanguage("Applicant avoids eye contact and shifts weights uncomfortably.");
    
    setCluesChecklist(prev => ({ ...prev, discrepancyChecked: true }));
  };

  // Handle final stamp action
  const handleStampAction = (decision: DecisionType) => {
    setStampedDecision(decision);
    // Timeout of 1s to play the animation / read conclusion
    setTimeout(() => {
      onDecision(decision);
    }, 1000);
  };

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 text-slate-100 max-w-7xl mx-auto px-4">
      
      {/* 1. PORTRAIT VIEWPORT & BODY LANGUAGE PANEL (CENTER COLUMN - Width span 4) */}
      <div className="lg:col-span-4 flex flex-col items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="absolute top-3 left-4 text-[10px] font-mono tracking-widest text-slate-500 uppercase flex items-center gap-1">
          <BookOpen size={12} className="text-amber-500" />
          Active Interrogation Day {day}
        </div>

        {stampedDecision && (
          <div className="absolute inset-0 bg-slate-950/90 z-40 flex flex-col items-center justify-center animate-fade-in">
            <div className="p-4 border-4 border-dashed rounded-3xl uppercase font-black text-2xl tracking-widest rotate-[-12deg] flex flex-col items-center justify-center animate-bounce shadow-xl scale-125 bg-slate-950 px-8 py-4 border-amber-500 text-amber-400">
              <Stamp size={36} className="mb-2" />
              {stampedDecision}
            </div>
            <p className="text-xs text-slate-400 mt-6 font-mono font-bold">SAVING CONFLICT RESOLUTION...</p>
          </div>
        )}

        {/* Dynamic Portrait generator */}
        <div className="mt-4">
          <PortraitGenerator
            skinColor={applicant.avatarStyle.skinColor}
            hairStyle={applicant.avatarStyle.hairStyle}
            hairColor={applicant.avatarStyle.hairColor}
            shirtColor={applicant.avatarStyle.shirtColor}
            accessory={applicant.avatarStyle.accessory}
            expression={currentExpression}
            seed={applicant.portraitSeed}
          />
        </div>

        <div className="w-full text-center space-y-1">
          <h3 className="text-lg font-extrabold text-slate-100 tracking-tight leading-tight">{applicant.name}</h3>
          <p className="text-xs text-amber-500 font-bold tracking-widest uppercase font-mono">{applicant.profession}</p>
          <span className="text-[10px] text-slate-400 font-semibold bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800 inline-block font-mono mt-1">
            Age: {applicant.age} | Origin: {applicant.origin}
          </span>
        </div>

        {/* Body language description feed */}
        <div className="w-full bg-slate-950 rounded-2xl p-4 border border-slate-850 space-y-2">
          <span className="text-[9px] font-bold font-mono text-slate-500 uppercase tracking-widest block">
            Observed Body Language clues:
          </span>
          <p className="text-xs text-cyan-300 font-medium leading-relaxed font-mono">
            {currentBodyLanguage}
          </p>
          {currentExpression !== 'neutral' && (
            <span className="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-md inline-block font-mono tracking-wider">
              Reactive Expression: {currentExpression.toUpperCase()}
            </span>
          )}
        </div>

        {/* Notebook clues checkoff list */}
        <div className="w-full bg-slate-950/60 rounded-2xl p-4 border border-slate-850 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[9px] font-bold font-mono text-slate-500 uppercase tracking-widest">
              Officer Deduction notebook
            </span>
            <span className="text-[8px] bg-amber-500/10 text-amber-400 border border-amber-900 px-1.5 py-0.5 rounded font-mono font-bold">MANUAL CLUE LOG</span>
          </div>

          <div className="space-y-2 text-xs">
            <label className="flex items-center gap-2 text-slate-400 hover:text-slate-200 cursor-pointer select-none">
              <input
                id="clue-nervousness-checkbox"
                type="checkbox"
                checked={cluesChecklist.nervousnessChecked}
                onChange={(e) => setCluesChecklist(prev => ({ ...prev, nervousnessChecked: e.target.checked }))}
                className="rounded border-slate-800 text-amber-500 focus:ring-amber-500 focus:ring-offset-slate-950 w-4 h-4 bg-slate-900"
              />
              <span>Discovered High Nervousness / Sweating</span>
            </label>
            <label className="flex items-center gap-2 text-slate-400 hover:text-slate-200 cursor-pointer select-none">
              <input
                id="clue-discrepancy-checkbox"
                type="checkbox"
                checked={cluesChecklist.discrepancyChecked}
                onChange={(e) => setCluesChecklist(prev => ({ ...prev, discrepancyChecked: e.target.checked }))}
                className="rounded border-slate-800 text-amber-500 focus:ring-amber-500 focus:ring-offset-slate-950 w-4 h-4 bg-slate-900"
              />
              <span>Discovered Document Discrepancy</span>
            </label>
            <label className="flex items-center gap-2 text-slate-400 hover:text-slate-200 cursor-pointer select-none">
              <input
                id="clue-reference-checkbox"
                type="checkbox"
                checked={cluesChecklist.referenceChecked}
                onChange={(e) => setCluesChecklist(prev => ({ ...prev, referenceChecked: e.target.checked }))}
                className="rounded border-slate-800 text-amber-500 focus:ring-amber-500 focus:ring-offset-slate-950 w-4 h-4 bg-slate-900"
              />
              <span>Triggered Verification Check</span>
            </label>
            <label className="flex items-center gap-2 text-slate-400 hover:text-slate-200 cursor-pointer select-none">
              <input
                id="clue-risk-checkbox"
                type="checkbox"
                checked={cluesChecklist.honestySuspected}
                onChange={(e) => setCluesChecklist(prev => ({ ...prev, honestySuspected: e.target.checked }))}
                className="rounded border-slate-800 text-amber-500 focus:ring-amber-500 focus:ring-offset-slate-950 w-4 h-4 bg-slate-900"
              />
              <span>Suspect High Security Risks</span>
            </label>
          </div>
        </div>

      </div>

      {/* 2. DISCUSSION INTERACTIVE DIALOG PANEL (LEFT COLUMN - Width span 4) */}
      <div className="lg:col-span-4 flex flex-col justify-between bg-slate-900 border border-slate-800 p-6 rounded-3xl h-[600px] sm:h-[650px] shadow-xl">
        <div className="space-y-4 overflow-y-auto pr-1 flex-1 relative scrollbar-thin scrollbar-thumb-slate-800">
          
          <div className="border-b border-slate-800 pb-2">
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase flex items-center gap-1.5">
              <HelpCircle size={12} className="text-amber-500" />
              Dialogue and questioning
            </span>
          </div>

          {conversationHistory.length === 0 ? (
            <div className="text-center py-10 text-slate-500 italic text-xs mt-10">
              No questions asked yet. Choose from the legal inquiry options below to elicit testimonials.
            </div>
          ) : (
            <div className="space-y-4">
              {conversationHistory.map((conv, idx) => (
                <div key={idx} className="space-y-2 text-xs">
                  {/* Question */}
                  <div className="bg-amber-950/30 border border-amber-900/40 text-amber-300 p-3 rounded-2xl rounded-tr-sm ml-6 font-mono">
                    <span className="font-extrabold block text-[9px] uppercase tracking-wider text-amber-500 mb-1">OFFICER:</span>
                    {conv.q}
                  </div>
                  {/* Response */}
                  <div className="bg-slate-950 border border-slate-850 text-slate-300 p-3 rounded-2xl rounded-tl-sm mr-6 font-mono leading-relaxed">
                    <span className="font-extrabold block text-[9px] uppercase tracking-wider text-slate-500 mb-1">{applicant.name.toUpperCase()}:</span>
                    {conv.r}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* If confronting */}
          {selectedDiscrepancy && (
            <div className="bg-red-950/20 border border-red-900/50 p-3 rounded-2xl space-y-2 mt-4 text-xs font-mono">
              <div className="flex items-center gap-1 text-red-400 font-extrabold text-[9px] uppercase tracking-widest">
                <AlertTriangle size={12} />
                Confronted regarding Discrepancy
              </div>
              <p className="text-slate-400">
                You pointing to statement "{selectedDiscrepancy.topic}": Discrepancy found!
              </p>
              <p className="text-slate-200">
                {confrontedStatement}
              </p>
            </div>
          )}
        </div>

        {/* Buttons to Ask Questions */}
        <div className="border-t border-slate-800 pt-4 space-y-2 mt-2">
          <p className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">
            Available Inquiries:
          </p>
          <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto scrollbar-thin">
            {applicant.dialogues.map((dlg) => {
              const asked = conversationHistory.some(c => c.q === dlg.question);
              return (
                <button
                  id={`ask-btn-${dlg.id}`}
                  key={dlg.id}
                  onClick={() => handleAskQuestion(dlg.id, dlg.question, dlg.response, dlg.clueBodyLanguage, dlg.reactionType)}
                  className={`text-left p-2.5 rounded-xl text-xs font-medium border transition-all ${
                    asked
                      ? 'bg-slate-950 border-slate-900 text-slate-600 cursor-not-allowed'
                      : 'bg-slate-950/80 border-slate-850 hover:bg-slate-950 hover:border-slate-700 text-slate-300'
                  }`}
                  disabled={asked}
                >
                  {asked ? '✓ ' : '? '} {dlg.question}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. DOCUMENT VERIFICATION DECK & DECISION SYSTEM (RIGHT COLUMN - Width span 4) */}
      <div className="lg:col-span-4 flex flex-col justify-between bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        
        {/* Document view */}
        <div className="space-y-4 flex-1">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-850">
            <button
              id="doc-tab-passport"
              onClick={() => setActiveDocTab('passport')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeDocTab === 'passport' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              <FileText size={14} /> Passport
            </button>
            
            {applicant.documents.workPermit && (
              <button
                id="doc-tab-permit"
                onClick={() => setActiveDocTab('permit')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeDocTab === 'permit' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                <FileText size={14} /> Permit
              </button>
            )}

            {applicant.documents.referenceLetter && (
              <button
                id="doc-tab-reference"
                onClick={() => setActiveDocTab('reference')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeDocTab === 'reference' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                <FileText size={14} /> Letters
              </button>
            )}
          </div>

          {/* STAMP ARMED BANNER ALERTS */}
          {armedStamp && (
            <div className="bg-amber-950/50 border border-amber-900 text-amber-300 p-2.5 text-center text-[10px] font-mono rounded-xl animate-pulse mb-3 select-none flex items-center justify-center gap-2">
              <Stamp size={12} className="text-amber-400 rotate-12 shrink-0 animate-bounce" />
              <span>STAMP ARMED: Click on the document deck card below to apply ink, or click the stamp again to apply immediately centered!</span>
            </div>
          )}

          {/* DOCUMENT BODY */}
          <div
            id="active-document-pad"
            onClick={(e) => {
              if (armedStamp && !stampedDecision) {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotate = Math.floor(Math.random() * 24) - 12; // tilt random
                setPhysicalInkStamp({ type: armedStamp, x, y, rotate });
                
                // play sound
                try {
                  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                  const osc = audioCtx.createOscillator();
                  const gain = audioCtx.createGain();
                  osc.type = 'triangle';
                  osc.frequency.setValueAtTime(140, audioCtx.currentTime);
                  osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.12);
                  gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
                  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
                  osc.connect(gain);
                  gain.connect(audioCtx.destination);
                  osc.start();
                  osc.stop(audioCtx.currentTime + 0.15);
                } catch (err) {}
                
                handleStampAction(armedStamp);
              }
            }}
            className={`bg-slate-950 border rounded-2xl p-4 min-h-60 relative overflow-hidden flex flex-col justify-between shadow-inner transition-all select-none ${
              armedStamp ? 'border-amber-450 ring-2 ring-amber-500/20 cursor-crosshair' : 'border-slate-850'
            }`}
          >
            
            {/* Inner frame pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.02),transparent)] pointer-events-none" />

            {/* TAB 1: Passport details */}
            {activeDocTab === 'passport' && (
              <div className="space-y-3 relative z-10 text-xs font-mono">
                <div className="flex justify-between items-center bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-850">
                  <span className="text-[10px] text-amber-500 font-bold uppercase">PASSPORT ID</span>
                  <span className="text-slate-100 font-extrabold">{applicant.documents.passport.idNumber}</span>
                </div>
                
                <div className="space-y-1.5 text-[11px] text-slate-300">
                  <p><span className="text-slate-500">FULL NAME:</span> {applicant.documents.passport.fullName}</p>
                  <p><span className="text-slate-500">EXPIRY DATE:</span> {applicant.documents.passport.expiryDate}</p>
                  <p><span className="text-slate-500">OFFICES:</span> International Gateway Border Control</p>
                  <p><span className="text-slate-500">RESTRICTIONS:</span> Standard Labor classification</p>
                </div>
                
                {applicant.documents.passport.hasTypo && (
                  <div className="bg-rose-950/20 border border-rose-900/40 p-2 rounded-xl text-[10px] text-rose-450 leading-normal flex items-start gap-1.5">
                    <AlertTriangle size={12} className="text-rose-500 shrink-0 mt-0.5" />
                    <span>Clerk error: Spelling issue layout discovered on ID.</span>
                  </div>
                )}

                <div className="text-[9px] text-slate-600 italic">
                  Notes: {applicant.documents.passport.notes}
                </div>
              </div>
            )}

            {/* TAB 2: Permit details */}
            {activeDocTab === 'permit' && applicant.documents.workPermit && (
              <div className="space-y-3 relative z-10 text-xs font-mono">
                <div className="flex justify-between items-center bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-850">
                  <span className="text-[10px] text-amber-500 font-bold uppercase">WORK PERMIT</span>
                  <span className="text-slate-100 font-extrabold">{applicant.documents.workPermit.idNumber}</span>
                </div>
                
                <div className="space-y-1.5 text-[11px] text-slate-300">
                  <p><span className="text-slate-500">SPONSOR NAME:</span> {applicant.documents.workPermit.fullName}</p>
                  <p><span className="text-slate-500">EXPIRY DATE:</span> {applicant.documents.workPermit.expiryDate}</p>
                  <p><span className="text-slate-500">ZONAL CLASS:</span> Regional Industrial Grid</p>
                </div>

                {applicant.documents.workPermit.hasTypo && (
                  <div className="bg-rose-950/20 border border-rose-950 text-rose-440 p-2 rounded-xl text-[10px] leading-normal flex items-start gap-1.5">
                    <AlertTriangle size={12} className="text-rose-500 shrink-0 mt-0.5" />
                    <span>Clerk error: Work permit contains irregular suffixes.</span>
                  </div>
                )}

                <div className="text-[9px] text-slate-600 italic">
                  Notes: {applicant.documents.workPermit.notes}
                </div>
              </div>
            )}

            {/* TAB 3: Reference Letters */}
            {activeDocTab === 'reference' && applicant.documents.referenceLetter && (
              <div className="space-y-3 relative z-10 text-xs font-mono">
                <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-850">
                  <p className="text-[10px] text-amber-500 font-extrabold uppercase">REFERENCE CORRESPONDENCE</p>
                  <p className="text-[11px] text-slate-200 font-bold leading-tight mt-1">{applicant.documents.referenceLetter.author} ({applicant.documents.referenceLetter.title})</p>
                </div>

                <div className="text-[11px] text-slate-400 italic leading-relaxed bg-slate-950/80 p-2.5 border border-slate-850 rounded-xl max-h-36 overflow-y-auto">
                  "{applicant.documents.referenceLetter.content}"
                </div>

                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-500">TEL REEFS:</span>
                  <span className="text-slate-300 font-bold">{applicant.documents.referenceLetter.phone}</span>
                </div>
              </div>
            )}

            {/* TELECOM REFERENCE VERIFY TOOLS WIRE */}
            <div className="mt-4 pt-3 border-t border-slate-900 flex flex-col gap-2">
              {!isCheckedRef ? (
                <button
                  id="tel-verify-btn"
                  onClick={handleCheckReference}
                  disabled={isVerifyingRef}
                  className="w-full bg-slate-900 hover:bg-slate-850 hover:border-slate-700 text-slate-200 border border-slate-800 rounded-xl py-2 px-3 text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5"
                >
                  <PhoneCall size={14} className="text-cyan-400 animate-pulse" />
                  {isVerifyingRef ? 'CONNECTING TELECOM REGISTER...' : 'VERIFY DOCUMENT SPONSOR WIRE'}
                </button>
              ) : (
                <div className="bg-cyan-950/20 border border-cyan-900/50 p-2.5 rounded-xl text-xs font-mono space-y-1.5">
                  <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-extrabold uppercase tracking-wider">
                    <Check size={12} /> SPONSOR REGISTRY FEEDBACK
                  </div>
                  <p className="text-[10px] text-slate-300 leading-normal">{refResult}</p>
                </div>
              )}
            </div>

            {/* Visual Ink Stamp overlay */}
            {physicalInkStamp && (
              <div
                className="absolute pointer-events-none uppercase font-black text-sm tracking-widest border-2 border-dashed px-3 py-1.5 font-mono rounded opacity-90 select-none animate-bounce flex items-center justify-center gap-1 z-35 font-mono"
                style={{
                  left: `${physicalInkStamp.x}px`,
                  top: `${physicalInkStamp.y}px`,
                  transform: `translate(-50%, -50%) rotate(${physicalInkStamp.rotate}deg)`,
                  color:
                    physicalInkStamp.type === 'APPROVE'
                      ? '#34d399'
                      : physicalInkStamp.type === 'DEPORT'
                      ? '#f87171'
                      : physicalInkStamp.type === 'DELAY'
                      ? '#fbbf24'
                      : physicalInkStamp.type === 'TEMPORARY'
                      ? '#22d3ee'
                      : '#818cf8',
                  borderColor:
                    physicalInkStamp.type === 'APPROVE'
                      ? '#059669'
                      : physicalInkStamp.type === 'DEPORT'
                      ? '#dc2626'
                      : physicalInkStamp.type === 'DELAY'
                      ? '#d97706'
                      : physicalInkStamp.type === 'TEMPORARY'
                      ? '#0891b2'
                      : '#4f46e5',
                  backgroundColor: 'rgba(2, 6, 23, 0.95)'
                }}
              >
                <Stamp size={14} />
                {physicalInkStamp.type}ED
              </div>
            )}

          </div>
        </div>

        {/* MORAL BRIBES REED PORTAL/ENVELOPE PACKAGE */}
        {applicant.bribeDetails && onBribeAction && (
          <div className="mt-4 bg-amber-950/15 border-2 border-amber-900/40 rounded-2xl p-4 space-y-3 relative overflow-hidden select-none font-mono text-xs">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.06),transparent)] pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-amber-900/30 pb-2">
              <span className="font-extrabold text-amber-500 tracking-wider flex items-center gap-1 uppercase text-[10px]">
                <Gift size={13} className="text-amber-550 rotate-12 shrink-0 animate-bounce" />
                💼 Personal Compensation Offer
              </span>
              <span className="text-[10px] font-black text-amber-300 font-mono font-bold">
                Amount: ${applicant.bribeDetails.amount}
              </span>
            </div>

            <div className="bg-slate-950/80 border border-amber-900/30 p-2.5 rounded-xl space-y-2">
              <div className="flex gap-2">
                <span className="text-amber-600 font-bold uppercase text-[9px] block shrink-0 mt-0.5">CARGO:</span>
                <span className="text-slate-300 italic font-semibold leading-relaxed font-sans">
                  "{applicant.bribeDetails.description}"
                </span>
              </div>
              <div className="text-slate-400 leading-normal border-t border-slate-900 pt-2 flex gap-1.5">
                <span className="text-slate-500 font-bold uppercase text-[9px] block shrink-0 mt-0.5 font-bold">MEMO:</span>
                <p className="italic font-sans text-amber-100">"{applicant.bribeDetails.dialogOffer}"</p>
              </div>
            </div>

            {bribeStatus ? (
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                {bribeStatus === 'ACCEPTED' ? (
                  <>
                    <CheckCircle size={14} className="text-rose-500 shrink-0" />
                    <span className="text-rose-400 leading-normal">ACCEPTED: Pocketed the bribe of <strong>${applicant.bribeDetails.amount}</strong>. Your integrity is compromised. Audit has logged the transactions.</span>
                  </>
                ) : bribeStatus === 'REPORTED' ? (
                  <>
                    <CheckCircle size={14} className="text-indigo-400 shrink-0" />
                    <span className="text-indigo-400 leading-normal font-bold">REPORTED: Confiscated bribe envelope. Integrity remains spotless! Government accolades filed.</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                    <span className="text-emerald-400 font-bold leading-normal">REJECTED: Strenuously refused the temptation. Local community remembers your standard of office.</span>
                  </>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                <button
                  id="bribe-accept"
                  onClick={() => {
                    try {
                      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                      const osc = audioCtx.createOscillator();
                      const osc2 = audioCtx.createOscillator();
                      const gain = audioCtx.createGain();
                      osc.type = 'sine';
                      osc2.type = 'sine';
                      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
                      osc.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.08);
                      osc2.frequency.setValueAtTime(1050, audioCtx.currentTime + 0.04);
                      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
                      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
                      osc.connect(gain);
                      osc2.connect(gain);
                      gain.connect(audioCtx.destination);
                      osc.start();
                      osc2.start();
                      osc.stop(audioCtx.currentTime + 0.25);
                      osc2.stop(audioCtx.currentTime + 0.25);
                    } catch (err) {}
                    if (onBribeAction && applicant.bribeDetails) {
                      onBribeAction(applicant.id, 'ACCEPTED', applicant.bribeDetails.amount);
                    }
                  }}
                  className="bg-rose-950/20 hover:bg-rose-900 border border-rose-900 text-rose-300 py-2 px-1 rounded-xl text-center uppercase tracking-wider font-extrabold text-[10px] shadow transition-all active:scale-[0.98] cursor-pointer"
                >
                  Pocket Cash
                </button>
                <button
                  id="bribe-refuse"
                  onClick={() => {
                    if (onBribeAction && applicant.bribeDetails) {
                      onBribeAction(applicant.id, 'REJECTED', 0);
                    }
                  }}
                  className="bg-emerald-950/25 hover:bg-emerald-850 border border-emerald-900 text-emerald-300 py-2 px-1 rounded-xl text-center uppercase tracking-wider font-extrabold text-[10px] shadow transition-all active:scale-[0.98] cursor-pointer"
                >
                  Refuse Offer
                </button>
                <button
                  id="bribe-report"
                  onClick={() => {
                    if (onBribeAction && applicant.bribeDetails) {
                      onBribeAction(applicant.id, 'REPORTED', 0);
                    }
                  }}
                  className="bg-indigo-950/25 hover:bg-indigo-900 border border-indigo-900 text-indigo-300 py-2 px-1 rounded-xl text-center uppercase tracking-wider font-extrabold text-[10px] shadow transition-all active:scale-[0.98] cursor-pointer"
                >
                  Seize & Report
                </button>
              </div>
            )}
          </div>
        )}

        {/* Forensic Discrepancy detector */}
        <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-2xl space-y-3 mt-4 mb-4 select-none">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[9px] font-bold font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
              <Search size={12} className="text-amber-500" />
              Forensic Discrepancy confront board
            </span>
          </div>

          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {applicant.statements.map((stmt, i) => (
              <div key={i} className="bg-slate-900 p-2 rounded-xl text-[10px] space-y-1 flex justify-between items-center border border-slate-850">
                <div className="space-y-0.5 text-slate-400 font-mono">
                  <span className="font-bold text-amber-500 block uppercase text-[8px]">{stmt.topic}</span>
                  <p className="line-clamp-1"><span className="text-slate-600">Document:</span> {stmt.docStatement}</p>
                  <p className="line-clamp-1"><span className="text-slate-600">Verbal claims:</span> {stmt.verbalStatement}</p>
                </div>
                {stmt.isDiscrepancy && (
                  <button
                    id={`confront-btn-${i}`}
                    onClick={() => handleConfrontdiscrepancy(stmt)}
                    className="ml-2 shrink-0 bg-red-950 text-red-400 hover:bg-red-900 hover:text-slate-100 px-2 py-1.5 rounded-lg font-bold border border-red-900 font-mono text-[9px] uppercase tracking-wider"
                  >
                    Confront
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* DECISION MATRIX STAMPS */}
        <div className="space-y-3 border-t border-slate-800 pt-4">
          <span className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest block text-center">
            IMMIGRATION COMMISSIONER DECISION MATRIX
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              id="decision-approve"
              onClick={() => handleStampAction('APPROVE')}
              disabled={stampedDecision !== null}
              className="bg-emerald-950/40 hover:bg-emerald-800 text-emerald-400 border-2 border-emerald-900 font-black p-3 rounded-xl flex items-center justify-center gap-1 text-xs uppercase tracking-wider transition-all duration-150 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <UserCheck size={14} /> APPROVE ENTRY
            </button>
            <button
              id="decision-deport"
              onClick={() => handleStampAction('DEPORT')}
              disabled={stampedDecision !== null}
              className="bg-rose-950/40 hover:bg-rose-800 text-rose-400 border-2 border-rose-900 font-black p-3 rounded-xl flex items-center justify-center gap-1 text-xs uppercase tracking-wider transition-all duration-150 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShieldAlert size={14} /> DEPORT CITIZEN
            </button>
            <button
              id="decision-delay"
              onClick={() => handleStampAction('DELAY')}
              disabled={stampedDecision !== null}
              className="bg-yellow-950/40 hover:bg-yellow-800 text-yellow-400 border-2 border-yellow-900 font-black p-2 rounded-xl flex items-center justify-center gap-1 text-[11px] uppercase tracking-wider transition-all duration-150 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Clock size={12} /> DELAY VERBOSE
            </button>
            <button
              id="decision-temporary"
              onClick={() => handleStampAction('TEMPORARY')}
              disabled={stampedDecision !== null}
              className="bg-cyan-950/40 hover:bg-cyan-800 text-cyan-400 border-2 border-cyan-900 font-black p-2 rounded-xl flex items-center justify-center gap-1 text-[11px] uppercase tracking-wider transition-all duration-150 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <BadgeInfo size={12} /> TEMP PROBATION
            </button>
          </div>

          <button
            id="decision-investigate"
            onClick={() => handleStampAction('INVESTIGATE')}
            disabled={stampedDecision !== null}
            className="w-full bg-indigo-950/40 hover:bg-indigo-800 text-indigo-400 border-2 border-indigo-900 font-black p-3 rounded-xl flex items-center justify-center gap-1 text-xs uppercase tracking-wider transition-all duration-150 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Search size={14} /> LAUNCH DEEPER FORENSIC AUDIT
          </button>
        </div>

      </div>

    </div>
  );
};
