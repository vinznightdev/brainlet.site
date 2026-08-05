import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Pencil, ShieldAlert, Sparkles, Trophy, Twitter, Send, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navigation({ activeTab, setActiveTab, darkMode, toggleDarkMode }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Hero Pad', icon: Sparkles },
    { id: 'tokenomics', label: 'Tokenomics', icon: Trophy },
    { id: 'guestbook', label: 'Brainlet 🧠', icon: Pencil }
  ];

  return (
    <nav className="relative z-50 w-full max-w-7xl mx-auto px-4 pt-4 md:pt-6">
      {/* Main Bar */}
      <div className="relative flex items-center justify-between bg-stone-50 dark:bg-neutral-900 border-2 border-stone-850 dark:border-stone-100 rounded-xl p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(28,25,23,0.9)] dark:shadow-[4px_4px_0px_0px_rgba(245,245,244,0.9)] rotate-[0.2deg] transition-all duration-300">
        {/* Title / Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('hero')}>
          <div className="w-9 h-9 flex items-center justify-center bg-red-100 dark:bg-red-950/40 border border-red-500 rounded-full text-lg -rotate-6">
            🧠
          </div>
          <div>
            <h1 className="font-sketchy text-lg md:text-xl font-bold tracking-tight text-stone-900 dark:text-stone-50 flex items-center gap-1">
              Brainlet <span className="text-red-500 dark:text-red-400 font-hand text-2xl">🧠</span>
            </h1>
          </div>
        </div>

        {/* Desktop Navigation Tabs - styled like crooked paper tabs */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            // Add a slight rotation for each tab to look like crooked paper tabs
            const rotations = [-1, 1.5, -0.5, 2];
            const rotation = rotations[idx % rotations.length];

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{ transform: isActive ? 'scale(1.05) rotate(0deg)' : `rotate(${rotation}deg)` }}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-hand font-bold tracking-wide btn-sketch transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-amber-100 dark:bg-stone-800 text-stone-900 dark:text-stone-50 border-stone-850 dark:border-stone-100 shadow-[2px_2px_0px_0px_rgba(28,25,23,0.9)] dark:shadow-[2px_2px_0px_0px_rgba(245,245,244,0.9)]'
                    : 'bg-stone-50 hover:bg-stone-100 dark:bg-stone-900 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right side controls (Theme toggle + Mobile menu) */}
        <div className="flex items-center gap-2">
          {/* Twitter (X) Link */}
          <a
            href="https://x.com/Brainletcoinpf"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow Brainlet on Twitter"
            className="p-2 border-2 border-stone-850 dark:border-stone-100 rounded-lg bg-stone-50 hover:bg-amber-50 dark:bg-stone-900 dark:hover:bg-stone-850 text-stone-800 dark:text-stone-100 shadow-[2px_2px_0px_0px_rgba(28,25,23,0.9)] dark:shadow-[2px_2px_0px_0px_rgba(245,245,244,0.9)] cursor-pointer transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hidden sm:flex items-center justify-center"
          >
            <Twitter className="w-5 h-5 text-sky-500 dark:text-sky-400" />
          </a>

          {/* Telegram Link */}
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            title="Join Brainlet Telegram"
            className="p-2 border-2 border-stone-850 dark:border-stone-100 rounded-lg bg-stone-50 hover:bg-amber-50 dark:bg-stone-900 dark:hover:bg-stone-850 text-stone-800 dark:text-stone-100 shadow-[2px_2px_0px_0px_rgba(28,25,23,0.9)] dark:shadow-[2px_2px_0px_0px_rgba(245,245,244,0.9)] cursor-pointer transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hidden sm:flex items-center justify-center"
          >
            <Send className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
          </a>

          {/* Reddit Origin Meme Link */}
          <a
            href="https://www.reddit.com/r/fantanoforever/comments/jmxwmn/yeah_i_watch_the_needle_drop_how_could_you_tell/"
            target="_blank"
            rel="noopener noreferrer"
            title="Brainlet Origin Meme"
            className="p-2 border-2 border-stone-850 dark:border-stone-100 rounded-lg bg-stone-50 hover:bg-amber-50 dark:bg-stone-900 dark:hover:bg-stone-850 text-stone-800 dark:text-stone-100 shadow-[2px_2px_0px_0px_rgba(28,25,23,0.9)] dark:shadow-[2px_2px_0px_0px_rgba(245,245,244,0.9)] cursor-pointer transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hidden sm:flex items-center justify-center gap-1.5"
          >
            <span className="text-orange-500 text-sm font-bold font-hand hidden md:inline">Origin Meme</span>
            <ExternalLink className="w-4 h-4 text-orange-500" />
          </a>

          {/* Dark Mode Toggle - Handcrafted Button */}
          <button
            onClick={toggleDarkMode}
            title={darkMode ? 'Switch to Paper Mode' : 'Switch to Blackboard Mode'}
            className="p-2 border-2 border-stone-850 dark:border-stone-100 rounded-lg bg-stone-50 hover:bg-amber-50 dark:bg-stone-900 dark:hover:bg-stone-850 text-stone-800 dark:text-amber-300 shadow-[2px_2px_0px_0px_rgba(28,25,23,0.9)] dark:shadow-[2px_2px_0px_0px_rgba(245,245,244,0.9)] cursor-pointer transition-transform hover:scale-105"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 border-2 border-stone-850 dark:border-stone-100 rounded-lg bg-stone-50 hover:bg-stone-100 dark:bg-stone-900 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-100 shadow-[2px_2px_0px_0px_rgba(28,25,23,0.9)] dark:shadow-[2px_2px_0px_0px_rgba(245,245,244,0.9)] cursor-pointer"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown (Torn notepad overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scaleY: 0.8 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -20, scaleY: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 mt-2 bg-amber-50 dark:bg-neutral-900 border-3 border-stone-850 dark:border-stone-200 rounded-xl p-4 shadow-xl z-50 md:hidden origin-top"
          >
            {/* Ruled lines inside mobile notepad */}
            <div className="absolute inset-0 bg-paper-ruled opacity-20 dark:opacity-5 pointer-events-none rounded-xl" />

            <div className="relative flex flex-col gap-2">
              <div className="flex justify-between items-center border-b border-stone-300 dark:border-stone-700 pb-2 mb-2">
                <span className="font-sketchy font-bold text-xs uppercase tracking-widest text-stone-400">
                  Select Notepad Page
                </span>
                <span className="font-hand font-bold text-stone-500">Page 1 of 4</span>
              </div>

              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-hand font-bold text-lg text-left border-2 transition-all ${
                      isActive
                        ? 'bg-amber-100 dark:bg-stone-800 text-stone-900 dark:text-stone-50 border-stone-850 dark:border-stone-100 shadow-[2px_2px_0px_0px_rgba(28,25,23,0.9)]'
                        : 'bg-stone-50 dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-red-500" />
                    {item.label}
                  </button>
                );
              })}

               <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-dashed border-stone-300 dark:border-stone-700">
                <div className="flex items-center justify-center gap-4">
                  <a
                    href="https://x.com/Brainletcoinpf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 border border-stone-800 dark:border-stone-400 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 font-hand text-sm font-bold shadow-sm"
                  >
                    <Twitter className="w-4 h-4 text-sky-500" />
                    <span>Twitter</span>
                  </a>
                  <a
                    href="https://t.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 border border-stone-800 dark:border-stone-400 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 font-hand text-sm font-bold shadow-sm"
                  >
                    <Send className="w-4 h-4 text-cyan-500" />
                    <span>Telegram</span>
                  </a>
                </div>
                <a
                  href="https://www.reddit.com/r/fantanoforever/comments/jmxwmn/yeah_i_watch_the_needle_drop_how_could_you_tell/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-1.5 border border-stone-800 dark:border-stone-400 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-850 dark:text-stone-100 font-hand text-sm font-bold shadow-sm w-full"
                >
                  <ExternalLink className="w-4 h-4 text-orange-500" />
                  <span>Origin Meme (Reddit)</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
