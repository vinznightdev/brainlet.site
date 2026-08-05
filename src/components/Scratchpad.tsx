import React, { useState, useEffect } from 'react';
import { DEFAULT_STICKY_NOTES } from '../data';
import { StickyNote, PaperStyle } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, RotateCw, Check, Move, LayoutGrid } from 'lucide-react';

export default function Scratchpad() {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [inputText, setInputText] = useState('');
  const [noteColor, setNoteColor] = useState('yellow');
  const [paperStyle, setPaperStyle] = useState<PaperStyle>('ruled');

  // Load notes on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('degen_lounge_notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        setNotes(DEFAULT_STICKY_NOTES);
      }
    } else {
      setNotes(DEFAULT_STICKY_NOTES);
    }
  }, []);

  // Save notes on update
  const saveNotes = (updatedNotes: StickyNote[]) => {
    setNotes(updatedNotes);
    localStorage.setItem('degen_lounge_notes', JSON.stringify(updatedNotes));
  };

  const colors = {
    yellow: 'bg-yellow-100 dark:bg-yellow-950/40 text-yellow-950 dark:text-yellow-100 border-yellow-300 dark:border-yellow-900',
    pink: 'bg-pink-100 dark:bg-pink-950/40 text-pink-950 dark:text-pink-100 border-pink-300 dark:border-pink-900',
    blue: 'bg-blue-100 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 border-blue-300 dark:border-blue-900',
    green: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 border-emerald-300 dark:border-emerald-900',
    purple: 'bg-purple-100 dark:bg-purple-950/40 text-purple-950 dark:text-purple-100 border-purple-300 dark:border-purple-900'
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Distribute responsive coordinate placements safely so they don't cover each other
    const existingCount = notes.length;
    const computedX = 10 + (existingCount * 15) % 75;
    const computedY = 15 + (existingCount * 12) % 65;

    const newNote: StickyNote = {
      id: `note-${Date.now()}`,
      text: inputText.trim(),
      color: colors[noteColor as keyof typeof colors],
      x: computedX,
      y: computedY,
      paperStyle,
      rotation: (Math.random() - 0.5) * 8, // rotation between -4 and +4 degrees
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...notes, newNote];
    saveNotes(updated);
    setInputText('');
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    saveNotes(updated);
  };

  // Move / Jiggle note (simulates sliding things on a desk)
  const handleJiggle = (id: string) => {
    const updated = notes.map(n => {
      if (n.id === id) {
        // Shift position randomly
        const shiftX = (Math.random() - 0.5) * 8;
        const shiftY = (Math.random() - 0.5) * 8;
        return {
          ...n,
          x: Math.max(5, Math.min(85, n.x + shiftX)),
          y: Math.max(5, Math.min(80, n.y + shiftY)),
          rotation: (Math.random() - 0.5) * 8
        };
      }
      return n;
    });
    saveNotes(updated);
  };

  const handleClearAll = () => {
    if (confirm('Clear all Brainlet 🧠 notes?')) {
      saveNotes([]);
    }
  };

  const handleResetDefault = () => {
    saveNotes(DEFAULT_STICKY_NOTES);
  };

  // Translate abstract styles into HTML class names
  const getPaperClass = (style: PaperStyle) => {
    switch (style) {
      case 'ruled': return 'bg-paper-ruled';
      case 'grid': return 'bg-paper-grid';
      case 'legal': return 'bg-paper-legal';
      case 'plain': return 'bg-paper-plain';
      default: return 'bg-paper-plain';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* LEFT: Pencil Control Box for writing new notes */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="relative paper-container bg-paper-legal p-6 rounded-2xl shadow-md min-h-[460px] overflow-hidden">
          {/* Top binder strip */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-red-400 opacity-80" />
          
          <div className="pt-4 h-full flex flex-col justify-between">
            <div>
              <h2 className="font-sketchy text-xl font-bold text-stone-900 dark:text-stone-100 border-b border-dashed border-stone-300 dark:border-stone-700 pb-2">
                ✍️ Brainlet 🧠
              </h2>
              <p className="text-xs font-hand text-stone-600 dark:text-stone-400 font-bold mt-1">
                Draft your meme portfolio, short formulas, trading rules, or daily reminders here.
              </p>

              <form onSubmit={handleAddNote} className="mt-5 space-y-4">
                {/* Text area */}
                <div>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Write a thought... (e.g. Monk-E said banana coins will 10x by Friday)"
                    maxLength={200}
                    className="w-full h-28 p-3 bg-white/70 dark:bg-black/30 border-2 border-stone-850 dark:border-stone-700 rounded-xl font-hand text-base font-bold text-stone-850 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-red-500 shadow-inner resize-none"
                  />
                  <div className="text-right text-[10px] font-hand text-stone-400 font-bold">
                    {200 - inputText.length} chars left
                  </div>
                </div>

                {/* Color Selector */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-sketchy text-stone-400 dark:text-stone-500 font-bold mb-1.5">
                    Post-it Hue
                  </label>
                  <div className="flex gap-2">
                    {Object.keys(colors).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setNoteColor(c)}
                        className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-transform hover:scale-115 active:scale-90 flex items-center justify-center ${
                          c === 'yellow' ? 'bg-yellow-200 border-yellow-400' :
                          c === 'pink' ? 'bg-pink-200 border-pink-400' :
                          c === 'blue' ? 'bg-blue-200 border-blue-400' :
                          c === 'green' ? 'bg-emerald-200 border-emerald-400' :
                          'bg-purple-200 border-purple-400'
                        }`}
                      >
                        {noteColor === c && <Check className="w-3.5 h-3.5 text-stone-800" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Paper Grid Lines Style */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-sketchy text-stone-400 dark:text-stone-500 font-bold mb-1.5">
                    Paper Grid Pattern
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['ruled', 'grid', 'legal', 'plain'] as PaperStyle[]).map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setPaperStyle(style)}
                        className={`py-1 px-1 text-[11px] font-hand font-bold capitalize rounded-md border-2 cursor-pointer text-center ${
                          paperStyle === style
                            ? 'bg-amber-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-stone-800'
                            : 'bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-500 border-stone-200 dark:border-stone-800'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-stone-900 dark:bg-stone-50 hover:bg-stone-800 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-950 font-hand font-bold text-base rounded-xl border-2 border-stone-850 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] cursor-pointer transition-transform hover:scale-102"
                >
                  <Plus className="w-5 h-5" />
                  <span>Pin to Board</span>
                </button>
              </form>
            </div>

            {/* Quick Actions at bottom */}
            <div className="flex gap-2 border-t border-dashed border-stone-300 dark:border-stone-700 pt-3 mt-6">
              <button
                onClick={handleResetDefault}
                className="flex-1 py-1.5 px-2 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-lg text-xs font-hand font-bold text-stone-500 hover:text-stone-800 dark:hover:text-stone-300 cursor-pointer"
              >
                Reset Defaults
              </button>
              <button
                onClick={handleClearAll}
                disabled={notes.length === 0}
                className="flex-1 py-1.5 px-2 bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-900 rounded-lg text-xs font-hand font-bold text-red-500 hover:text-red-700 cursor-pointer disabled:opacity-40"
              >
                Clear Pinned
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: The Pinboard Canvas area */}
      <div className="lg:col-span-8">
        <div className="relative bg-amber-50/20 dark:bg-neutral-900/20 border-3 border-stone-850 dark:border-stone-300 rounded-3xl p-4 md:p-6 min-h-[500px] overflow-hidden flex flex-col justify-between shadow-inner">
          {/* Subtle grid backing to look like a workspace desk corkboard */}
          <div className="absolute inset-0 bg-paper-grid opacity-20 dark:opacity-10 pointer-events-none rounded-3xl" />

          {/* Canvas Header */}
          <div className="relative z-10 flex justify-between items-center border-b-2 border-stone-300 dark:border-stone-700 pb-2 mb-4">
            <div>
              <h3 className="font-sketchy text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <LayoutGrid className="w-4.5 h-4.5 text-red-500" />
                <span>The Pinboard Desktop</span>
              </h3>
              <p className="text-xs font-hand text-stone-400 dark:text-stone-500 font-bold">
                Notes scatter dynamically. Use the controls on each note to shift or discard.
              </p>
            </div>
            <span className="font-hand font-bold text-xs bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 px-2 py-0.5 rounded-md text-stone-500">
              Total: {notes.length} Notes
            </span>
          </div>

          {/* Notes Canvas */}
          <div className="relative flex-1 min-h-[400px]">
            {notes.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-stone-300 dark:border-stone-800 rounded-2xl">
                <p className="font-hand font-bold text-lg text-stone-400 dark:text-stone-600">
                  Your desk is clean. Use the Brainlet 🧠 to write your first degen post-it note!
                </p>
                <div className="text-3xl mt-2 opacity-50">📝</div>
              </div>
            ) : (
              // Desktop layout (for larger screens we render them in flexible slots or positions)
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AnimatePresence>
                  {notes.map((note) => {
                    const paperStyleClass = getPaperClass(note.paperStyle);
                    
                    return (
                      <motion.div
                        key={note.id}
                        initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                        animate={{ opacity: 1, scale: 1, rotate: note.rotation }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className={`relative p-5 rounded-xl border-2 border-stone-850 dark:border-stone-100 ${note.color} ${paperStyleClass} shadow-md overflow-hidden min-h-[160px] flex flex-col justify-between`}
                        style={{ transform: `rotate(${note.rotation}deg)` }}
                      >
                        {/* Tape effect on top */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/40 dark:bg-white/10 border-b border-stone-400/20 transform -rotate-1 shadow-sm" />

                        {/* Note Header (Controls) */}
                        <div className="flex justify-between items-center border-b border-stone-350 dark:border-stone-800/20 pb-1 mb-2 relative z-10 text-[10px] font-hand font-bold uppercase text-stone-400">
                          <span>{note.timestamp}</span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleJiggle(note.id)}
                              title="Shuffle position & slant"
                              className="p-1 hover:bg-stone-500/10 dark:hover:bg-white/10 rounded cursor-pointer transition-colors"
                            >
                              <RotateCw className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
                            </button>
                            <button
                              onClick={() => handleDeleteNote(note.id)}
                              title="Discard"
                              className="p-1 hover:bg-red-500/20 dark:hover:bg-red-500/20 rounded cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            </button>
                          </div>
                        </div>

                        {/* Note text */}
                        <div className="relative z-10 flex-1 flex items-center mb-3">
                          <p className="font-hand font-bold text-base leading-snug whitespace-pre-wrap break-words">
                            {note.text}
                          </p>
                        </div>

                        {/* Note footer (Style stamp) */}
                        <div className="relative z-10 text-[9px] font-sketchy uppercase tracking-wide text-right text-stone-400 font-bold border-t border-dashed border-stone-300 dark:border-stone-800/20 pt-1.5">
                          Paper: {note.paperStyle}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center text-[9px] text-stone-400 dark:text-stone-500 font-hand border-t border-stone-200 dark:border-stone-800 pt-2 font-bold uppercase mt-6 relative z-10">
            <span>Desktop Save Engine: LocalStorage Active</span>
            <span>Ink formula: Permanent Charcoal Marker</span>
          </div>
        </div>
      </div>

    </div>
  );
}
