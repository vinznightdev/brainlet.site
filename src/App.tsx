import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Tokenomics from './components/Tokenomics';
import Scratchpad from './components/Scratchpad';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('hero');
  const [darkMode, setDarkMode] = useState(false);

  // Sync dark mode class on mount and update
  useEffect(() => {
    const savedTheme = localStorage.getItem('degen_lounge_theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('degen_lounge_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('degen_lounge_theme', 'light');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'hero':
        return <Hero setActiveTab={setActiveTab} />;
      case 'tokenomics':
        return <Tokenomics />;
      case 'guestbook':
        return <Scratchpad />;
      default:
        return <Hero setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-zinc-950 text-stone-800 dark:text-stone-100 flex flex-col justify-between transition-colors duration-300 pb-10">
      
      {/* Background elements (Doodles, rings or papers) */}
      <div className="absolute inset-0 bg-paper-grid opacity-15 dark:opacity-5 pointer-events-none z-0" />

      {/* Header containing floating binder-style menu */}
      <header className="relative z-30">
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </header>

      {/* Main active layout with custom motion fades */}
      <main className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-4 py-4 md:py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Handcrafted notebook footer with crooked pencil signatures */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 border-t border-dashed border-stone-300 dark:border-stone-800 pt-6 mt-12 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-hand font-bold text-stone-400 dark:text-stone-500">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center bg-stone-200 dark:bg-stone-800 rounded border border-stone-400 dark:border-stone-700 rotate-6">
            📝
          </div>
          <span>Drafted with 100% genuine charcoal pencil. No pixels were harmed.</span>
        </div>
        <div className="flex gap-4">
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); setActiveTab('hero'); }}
            className="hover:text-red-500 transition-colors cursor-pointer border-b border-transparent hover:border-red-400"
          >
            Hero Pad
          </a>
          <span>•</span>
          <a 
            href="#tokenomics" 
            onClick={(e) => { e.preventDefault(); setActiveTab('tokenomics'); }}
            className="hover:text-red-500 transition-colors cursor-pointer border-b border-transparent hover:border-red-400"
          >
            Tokenomics Ledger
          </a>
          <span>•</span>
          <a 
            href="#guestbook" 
            onClick={(e) => { e.preventDefault(); setActiveTab('guestbook'); }}
            className="hover:text-red-500 transition-colors cursor-pointer border-b border-transparent hover:border-red-400"
          >
            Brainlet 🧠
          </a>
        </div>
        <div className="italic">
          Room ID: 420-COPE // Lounge v1.0.4
        </div>
      </footer>

    </div>
  );
}
