import React, { useState } from 'react';
import { COPIUM_FORTUNES } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Send, BookOpen } from 'lucide-react';

export default function CopiumDispenser() {
  const [fortunes, setFortunes] = useState<string[]>(COPIUM_FORTUNES);
  const [currentFortune, setCurrentFortune] = useState<string | null>(null);
  const [isDispensing, setIsDispensing] = useState(false);
  const [customScroll, setCustomScroll] = useState('');
  const [userNotification, setUserNotification] = useState<string | null>(null);

  // Sparkles particles
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  const dispenseCopium = () => {
    if (isDispensing) return;
    setIsDispensing(true);
    setCurrentFortune(null);

    // Generate floating paper particles
    const newParticles = [...Array(12)].map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 160,
      color: ['bg-green-400', 'bg-pink-400', 'bg-cyan-400', 'bg-amber-400', 'bg-indigo-400'][i % 5]
    }));
    setParticles(newParticles);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * fortunes.length);
      setCurrentFortune(fortunes[randomIndex]);
      setIsDispensing(false);
    }, 1000);
  };

  const handleAddScroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customScroll.trim()) return;

    setFortunes(prev => [...prev, customScroll.trim()]);
    setCustomScroll('');
    setUserNotification('📝 Custom fortune rolled and loaded into the capsule!');
    setTimeout(() => setUserNotification(null), 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
      
      {/* LEFT: The Pill Dispenser Container */}
      <div className="md:col-span-7 flex flex-col items-center justify-between bg-stone-50 dark:bg-zinc-900 border-2 border-stone-850 dark:border-stone-100 rounded-3xl p-6 shadow-md relative min-h-[480px]">
        {/* Lined paper pattern inside */}
        <div className="absolute inset-0 bg-paper-plain opacity-30 dark:opacity-10 pointer-events-none rounded-3xl" />
        
        {/* Header */}
        <div className="w-full relative z-10 text-center border-b border-stone-200 dark:border-stone-800 pb-3">
          <h2 className="font-sketchy text-xl font-bold text-stone-900 dark:text-stone-100">
            Copium Pill &copy; 420
          </h2>
          <p className="text-xs font-hand text-stone-500 dark:text-stone-400 font-bold">
            Split the giant capsule to receive an automated dose of mental relief
          </p>
        </div>

        {/* Central Capsule Dispensation Area */}
        <div className="relative flex-1 flex flex-col items-center justify-center py-6 w-full">
          {/* Pedestal/Silver Bracket holder from the image */}
          <div className="absolute bottom-12 w-48 h-10 border-2 border-stone-850 dark:border-stone-100 rounded-full bg-stone-300 dark:bg-stone-800 shadow-md flex items-center justify-center opacity-60">
            <div className="w-40 h-6 border border-stone-400 dark:border-stone-700 rounded-full bg-stone-200 dark:bg-stone-900 shadow-inner" />
          </div>

          {/* Interactive Capsule Pill */}
          <button 
            onClick={dispenseCopium}
            disabled={isDispensing}
            className="relative z-10 group cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-200"
          >
            {/* Split Capsule Animation Container */}
            <div className="flex items-center justify-center gap-0.5 relative min-h-[140px] w-64">
              
              {/* Left Side: Green Pill Half */}
              <motion.div
                animate={isDispensing ? { 
                  x: -45, 
                  rotate: -15,
                  scale: 0.95
                } : { 
                  x: 0, 
                  rotate: 0,
                  scale: 1
                }}
                transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                className="w-24 h-12 bg-emerald-500 dark:bg-emerald-600 border-2 border-stone-850 dark:border-stone-100 rounded-l-full shadow-lg relative flex items-center justify-end pr-2 overflow-hidden"
              >
                {/* Glossy lighting overlay */}
                <div className="absolute top-1 left-2 w-16 h-2 bg-white/20 rounded-full" />
                <span className="font-sketchy text-[9px] text-white font-bold tracking-widest pointer-events-none select-none uppercase rotate-90 opacity-40">
                  COPE
                </span>
              </motion.div>

              {/* Right Side: White Pill Half */}
              <motion.div
                animate={isDispensing ? { 
                  x: 45, 
                  rotate: 15,
                  scale: 0.95
                } : { 
                  x: 0, 
                  rotate: 0,
                  scale: 1
                }}
                transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                className="w-24 h-12 bg-stone-50 dark:bg-stone-100 border-2 border-stone-850 dark:border-stone-300 rounded-r-full shadow-lg relative flex items-center justify-start pl-2 overflow-hidden"
              >
                {/* Glossy lighting overlay */}
                <div className="absolute top-1 right-2 w-16 h-2 bg-white/40 rounded-full" />
                <span className="font-sketchy text-[9px] text-stone-800 font-bold tracking-widest pointer-events-none select-none uppercase -rotate-90 opacity-40">
                  PILL
                </span>
              </motion.div>

              {/* Breaking Sparks/Particles */}
              {isDispensing && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {particles.map(p => (
                    <motion.div
                      key={p.id}
                      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                      animate={{ x: p.x, y: p.y, scale: 0, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className={`absolute w-3 h-3 rounded-full border border-stone-850 ${p.color}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </button>

          {/* Prompt labels */}
          <div className="mt-4 text-center">
            <button 
              onClick={dispenseCopium}
              disabled={isDispensing}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-stone-50 font-hand font-bold rounded-xl border-2 border-stone-850 dark:border-stone-100 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] cursor-pointer transition-transform hover:scale-103 active:scale-95"
            >
              {isDispensing ? 'Breaking Pill...' : '🧪 Dispense Prescription'}
            </button>
            <p className="text-[10px] font-hand text-stone-400 dark:text-stone-500 font-bold mt-2 uppercase">
              No medical prescription required. Highly addictive.
            </p>
          </div>
        </div>

        {/* Revealed Scroll Scroll Holder */}
        <div className="w-full relative min-h-[110px] flex items-center justify-center mt-2">
          <AnimatePresence mode="wait">
            {currentFortune ? (
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: -2, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, rotate: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20, rotate: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="w-full bg-amber-50 dark:bg-zinc-800 border-2 border-stone-800 dark:border-amber-900 rounded-xl p-4 shadow-md text-center border-sketch relative overflow-hidden"
              >
                {/* Background scroll lines */}
                <div className="absolute inset-y-0 left-2 w-[1px] bg-red-400/20" />
                <div className="absolute inset-y-0 right-2 w-[1px] bg-red-400/20" />
                
                <span className="absolute top-1 left-4 text-[9px] uppercase tracking-wider font-sketchy text-red-500 font-bold">
                  📜 Dispensed Scroll
                </span>
                <p className="font-hand font-bold text-lg md:text-xl text-stone-800 dark:text-stone-100 px-4 mt-2">
                  {currentFortune}
                </p>
              </motion.div>
            ) : (
              !isDispensing && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  className="text-center font-hand text-stone-400 dark:text-stone-600 text-sm font-bold border-2 border-dashed border-stone-300 dark:border-stone-800 rounded-xl py-6 px-4 w-full"
                >
                  Pill is sealed. Press "Dispense" to pop your daily copium.
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT: Scroll Deck Customization Notebook */}
      <div className="md:col-span-5">
        <div className="relative paper-container bg-paper-ruled p-6 rounded-2xl min-h-[480px] flex flex-col justify-between overflow-hidden">
          {/* Top Spiral binder effect */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-stone-300/40 dark:bg-stone-700/40 flex justify-around items-center border-b border-stone-400/40 px-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-full border border-stone-500 bg-stone-100 shadow-inner flex items-center justify-center">
                <div className="w-1 h-3 bg-stone-400 rounded-full" />
              </div>
            ))}
          </div>

          <div className="pt-4 flex-1 flex flex-col justify-between">
            {/* Folder Header */}
            <div>
              <h3 className="font-sketchy text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 border-b border-dashed border-stone-300 dark:border-stone-700 pb-2">
                <BookOpen className="w-5 h-5 text-red-500" />
                <span>Scripture Vault</span>
              </h3>
              <p className="text-xs font-hand text-stone-500 dark:text-stone-400 font-bold mt-1">
                Customize the pill deck! Write funny droll thoughts, buy orders, or motivational remarks for the capsule.
              </p>

              {/* Scroll Adding Form */}
              <form onSubmit={handleAddScroll} className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-sketchy text-stone-400 dark:text-stone-500 font-bold mb-1">
                    New Fortune Text
                  </label>
                  <textarea
                    value={customScroll}
                    onChange={(e) => setCustomScroll(e.target.value)}
                    placeholder="e.g., Short the absolute bottom on 100x leverage. Problem, physics?"
                    maxLength={140}
                    className="w-full h-24 p-3 bg-stone-50 dark:bg-stone-900 border-2 border-stone-850 dark:border-stone-700 rounded-xl font-hand text-base font-bold text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-emerald-500 shadow-inner"
                  />
                  <div className="text-right text-[10px] font-hand text-stone-400">
                    {140 - customScroll.length} characters left
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2 bg-stone-50 hover:bg-stone-100 dark:bg-stone-900 dark:hover:bg-stone-800 border-2 border-stone-850 dark:border-stone-100 rounded-xl font-hand font-bold text-stone-800 dark:text-stone-50 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] cursor-pointer transition-all active:translate-y-0.5 active:shadow-none"
                >
                  <Send className="w-4 h-4 text-emerald-500" />
                  <span>Insert into Capsule Deck</span>
                </button>
              </form>
            </div>

            {/* Deck statistics */}
            <div className="mt-6 border-t border-dashed border-stone-300 dark:border-stone-700 pt-4">
              {userNotification && (
                <div className="p-2 mb-3 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 text-xs font-hand font-bold rounded-lg border border-emerald-300">
                  {userNotification}
                </div>
              )}

              <h4 className="font-sketchy text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500 font-bold mb-2">
                Active Deck Library ({fortunes.length} scrolls loaded)
              </h4>
              <div className="max-h-36 overflow-y-auto space-y-1.5 pr-2">
                {fortunes.slice(-4).reverse().map((f, idx) => (
                  <div 
                    key={idx} 
                    className="p-1.5 bg-stone-100/40 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 rounded-md text-xs font-hand font-bold text-stone-600 dark:text-stone-400 truncate"
                  >
                    • {f}
                  </div>
                ))}
                {fortunes.length > 4 && (
                  <div className="text-center text-[10px] font-hand text-stone-400 font-bold pt-1">
                    + {fortunes.length - 4} more loaded scrolls...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
