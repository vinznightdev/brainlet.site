import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ShieldAlert, Award, FileText, TrendingUp, Camera, ZoomIn, X } from 'lucide-react';
import { COPIUM_FORTUNES } from '../data';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

const BOARDROOM_IMAGERY = [
  {
    url: "https://www.image2url.com/r2/default/images/1785911741721-845dfae0-460c-40c7-b404-da1cd3d84c1a.jpg",
    title: "Roundtable Blueprint",
    caption: "The original hand-scribbled design blueprint establishing the 10-seat leverage table structure.",
    rotation: "rotate-[-1.5deg]"
  },
  {
    url: "https://www.image2url.com/r2/default/images/1785911745878-8ffd97f8-9ae8-4837-bed2-54b3cc5fc2d6.jpg",
    title: "Meme Leverage Formula",
    caption: "Sacred ink sketching containing mathematical speculation tables and draft notes of the droll sanctuary.",
    rotation: "rotate-[1deg]"
  },
  {
    url: "https://www.image2url.com/r2/default/images/1785911751213-3b3a90bc-4db2-42f3-8599-1907d6752f2a.jpg",
    title: "Troll Supply & Tax Manifest",
    caption: "Classified sketch details displaying our locked desk drawers, leverage Zones, and developer juice funds.",
    rotation: "rotate-[-0.5deg]"
  }
];

export default function Hero({ setActiveTab }: HeroProps) {
  const [currentFortune, setCurrentFortune] = useState<string | null>(null);
  const [isDispensing, setIsDispensing] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; caption: string } | null>(null);

  const dispenseCopium = () => {
    if (isDispensing) return;
    setIsDispensing(true);
    setCurrentFortune(null);

    // Generate floating paper particles
    const newParticles = [...Array(10)].map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 160,
      color: ['bg-emerald-400', 'bg-pink-400', 'bg-cyan-400', 'bg-amber-400', 'bg-indigo-400'][i % 5]
    }));
    setParticles(newParticles);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * COPIUM_FORTUNES.length);
      setCurrentFortune(COPIUM_FORTUNES[randomIndex]);
      setIsDispensing(false);
    }, 900);
  };

  const mainStats = [
    { label: "COPIUM SATURATION", val: "99.8%", color: "text-pink-500", doodle: "💊" },
    { label: "LEVERAGE LIMIT", val: "1000x", color: "text-red-500", doodle: "📈" },
    { label: "MEME ALPHA DOCK", val: "SECURE", color: "text-cyan-500", doodle: "🔒" },
    { label: "ACTIVE DEGENS", val: "10 / 10", color: "text-amber-500", doodle: "🐒" }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-10">
      
      {/* SECTION 1: MAIN HERO BANNER (Handcrafted Notebook Design) */}
      <div className="relative paper-container bg-paper-ruled p-6 md:p-10 rounded-3xl overflow-hidden flex flex-col gap-6 min-h-[500px]">
        {/* Binder spirals on top */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-stone-300/40 dark:bg-stone-700/40 flex justify-around items-center border-b border-stone-400/40 px-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full border border-stone-500 bg-stone-100 shadow-inner flex items-center justify-center">
              <div className="w-1 h-3 bg-stone-400 rounded-full" />
            </div>
          ))}
        </div>

        {/* Hero Left Side: Typography and Call to Actions */}
        <div className="w-full space-y-5 text-left pt-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 dark:bg-red-950/40 border border-red-400 rounded-full font-hand font-bold text-red-600 dark:text-red-400 text-sm -rotate-2">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Hand-Sketched Degen Sanctuary</span>
          </div>

          <h1 className="font-sketchy text-4xl md:text-5xl lg:text-6xl font-black text-stone-900 dark:text-stone-100 leading-none">
            Welcome to <br />
            <span className="text-red-500 dark:text-red-400 font-hand text-5.5xl md:text-6.5xl lg:text-7.5xl block mt-2 -rotate-1">
              BRAINLET
            </span>
          </h1>

          {/* Gridded Side-by-Side: The Legend of BRAINLET Box & The Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch w-full">
            {/* Legend Box */}
            <div className="bg-stone-100/60 dark:bg-stone-900/40 p-6 rounded-2xl border-2 border-stone-800 dark:border-stone-400 font-hand text-base font-bold text-stone-700 dark:text-stone-300 leading-relaxed space-y-3 shadow-inner flex flex-col justify-between">
              <div>
                <h3 className="font-sketchy text-sm text-red-500 dark:text-red-400 font-bold uppercase tracking-wide border-b border-stone-200 dark:border-stone-800 pb-1 mb-2">
                  📜 The Legend of BRAINLET
                </h3>
                <p>
                  Once upon a time in the land of AI Now, there lived a humble Brainlet.
                </p>
                <p>
                  He wasn’t smart. He wasn’t elegant. He didn’t invent kernels, prove bounds, or derive Gaussian processes while flexing. He just sat there with his big pink brain exposed, staring blankly at the world, muttering <span className="italic">“more data… more GPUs…”</span>
                </p>
                <p>
                  Then someone plugged a thick black cable into the back of his head and stacked four glowing server racks next to him.
                </p>
                <p>
                  Overnight the Brainlet grew.
                </p>
                <p>
                  He still had the same vacant grin. He still had no elegant theory. He still had no idea why anything worked.
                </p>
                <p>
                  But suddenly he could write poetry, debug code, pass medical exams, and generate images of muscular mathematicians from the old days.
                </p>
                <p>
                  People asked, <span className="italic">“How did you get so good?”</span>
                </p>
                <p>
                  Brainlet just shrugged, green lights blinking behind him, and whispered: <span className="text-red-500 dark:text-red-400 font-bold font-sketchy">“I just scaled.”</span>
                </p>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 border-t border-dashed border-stone-200 dark:border-stone-800 pt-2 italic font-bold">
                And that, children, is how the dumbest-looking guy in the room became state of the art.
              </p>
            </div>

            {/* Leveled Roundtable Image (without border, matches height of Legend box) */}
            <div className="rounded-2xl shadow-xl overflow-hidden relative min-h-[320px] lg:min-h-0 bg-white">
              <img 
                src="https://www.image2url.com/r2/default/images/1785911751213-3b3a90bc-4db2-42f3-8599-1907d6752f2a.jpg" 
                alt="Meme Roundtable"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setActiveTab('about')}
              className="flex items-center justify-center gap-2 py-3 px-6 bg-stone-900 hover:bg-stone-800 dark:bg-stone-50 dark:hover:bg-stone-100 text-stone-50 dark:text-stone-950 font-hand font-bold text-lg rounded-xl border-2 border-stone-850 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] cursor-pointer transition-transform hover:scale-103"
            >
              <span>Go to Boardroom</span>
              <ArrowRight className="w-5 h-5 text-red-500" />
            </button>
            <button
              onClick={() => setActiveTab('tokenomics')}
              className="flex items-center justify-center gap-2 py-3 px-6 bg-stone-50 hover:bg-stone-100 dark:bg-stone-900 dark:hover:bg-stone-850 text-stone-850 dark:text-stone-50 font-hand font-bold text-lg rounded-xl border-2 border-stone-850 dark:border-stone-100 shadow-[4px_4px_0px_0px_rgba(28,25,23,0.3)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] cursor-pointer transition-transform hover:scale-103"
            >
              <span>Inspect Tokenomics</span>
            </button>
          </div>
        </div>
      </div>



      {/* SECTION 2.5: ORIGINAL BOARDROOM ARTIFACTS GALLERY */}
      <div className="relative paper-container bg-paper-ruled p-6 md:p-8 rounded-3xl border-2 border-stone-850 dark:border-stone-100 shadow-[4px_4px_0px_0px_rgba(28,25,23,0.95)] dark:shadow-[4px_4px_0px_0px_rgba(245,245,244,0.95)] overflow-hidden">
        {/* Binder spirals on top */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-stone-300/40 dark:bg-stone-700/40 flex justify-around items-center border-b border-stone-400/40 px-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full border border-stone-500 bg-stone-100 shadow-inner flex items-center justify-center">
              <div className="w-1 h-2 bg-stone-400 rounded-full" />
            </div>
          ))}
        </div>

        <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between border-b-2 border-dashed border-stone-300 dark:border-stone-700 pb-4 mb-8">
          <div>
            <h2 className="font-sketchy text-2xl md:text-3xl font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Camera className="w-6 h-6 text-red-500 animate-pulse" />
              <span>Sacred Boardroom Sketches</span>
            </h2>
            <p className="font-hand text-base font-bold text-stone-600 dark:text-stone-300 mt-1">
              Tap any handwritten parchment below to examine the original droll formulas in ultra-high resolution.
            </p>
          </div>
          <div className="mt-3 md:mt-0 px-3 py-1.5 bg-amber-100 dark:bg-amber-950/40 border border-amber-400 rounded-lg text-xs font-hand font-bold text-amber-700 dark:text-amber-400 rotate-1 flex items-center gap-1.5 shrink-0 self-start md:self-center">
            <ZoomIn className="w-3.5 h-3.5 text-amber-500" />
            <span>Click any sketch to zoom in</span>
          </div>
        </div>

        {/* 3-Column Responsive Polaroids/Drafts Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BOARDROOM_IMAGERY.map((img, idx) => (
            <div
              key={idx}
              className={`group relative bg-stone-50 dark:bg-zinc-900 border-2 border-stone-800 dark:border-stone-400 p-4 pb-6 rounded-xl shadow-md cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-lg hover:border-red-400 dark:hover:border-red-400 ${img.rotation}`}
              onClick={() => setSelectedImage(img)}
            >
              {/* Piece of sticky translucent scotch tape at the top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2.5 h-6 w-20 bg-amber-100/70 dark:bg-amber-950/40 border-x border-amber-300/40 opacity-80 backdrop-blur-xs -rotate-1 shadow-sm z-10" />

              {/* Photo Frame Container (Border nesting rule: Inner Radius = Outer Radius - Padding) */}
              <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-100/50">
                <img
                  src={img.url}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hover overlay indicator */}
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                  <div className="flex items-center gap-1.5 bg-stone-50/90 dark:bg-neutral-900/90 text-stone-850 dark:text-stone-50 py-1.5 px-3 rounded-full border border-stone-800 font-hand font-bold text-sm shadow-md">
                    <ZoomIn className="w-4 h-4 text-red-500 animate-bounce" />
                    <span>Zoom in</span>
                  </div>
                </div>
              </div>

              {/* Caption Block (Mathematical polaroid notes style) */}
              <div className="mt-4 text-left font-hand">
                <h4 className="font-sketchy text-lg font-bold text-stone-900 dark:text-stone-100 leading-tight">
                  {img.title}
                </h4>
                <p className="text-sm text-stone-500 dark:text-stone-400 font-bold mt-1 line-clamp-3 leading-snug">
                  {img.caption}
                </p>
              </div>

              {/* Bottom tag identifier */}
              <div className="absolute bottom-2 right-3 text-[9px] font-mono text-stone-400 uppercase tracking-widest">
                Expt-0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: ROUNDTABLE HIGHLIGHT DOODLE SHEET */}
      <div className="max-w-2xl mx-auto w-full">
        
        {/* Highlight Card 1: The Code of Conduct */}
        <div className="relative paper-container bg-paper-legal p-6 rounded-2xl flex flex-col justify-between overflow-hidden">
          {/* Yellow pad strip */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-yellow-300 opacity-80" />
          
          <div className="pt-4">
            <h3 className="font-sketchy text-lg font-bold text-stone-900 flex items-center gap-1.5 border-b border-dashed border-stone-300 pb-2">
              <FileText className="w-5 h-5 text-red-500" />
              <span>Degen Rules of Brainlet 🧠</span>
            </h3>
            
            <ul className="space-y-3 mt-4 font-hand text-base font-bold text-stone-700 leading-snug">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-sketchy">01.</span>
                <span><b>Never Doubt Troll Chad:</b> If his smile is too smug, double down on leverage. Mathematics cannot fail.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-sketchy">02.</span>
                <span><b>Hold Your Bags With Pride:</b> True diamond suction cups are formed under intense liquidation warnings.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-sketchy">03.</span>
                <span><b>Refill Your Copium Daily:</b> Do not neglect the capsule prescription. Sideways charts represent perfect harmony.</span>
              </li>
            </ul>
          </div>

          <div className="text-[9px] uppercase font-sketchy tracking-wider text-stone-400 font-bold border-t border-dashed border-stone-300 pt-3 mt-6">
            Permanent Draft / Rulebook v1.02
          </div>
        </div>

      </div>

      {/* LIGHTBOX OVERLAY FOR DETAILED SKETCHES */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-950/85 backdrop-blur-sm z-50 overflow-y-auto flex items-start md:items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="relative max-w-4xl w-full bg-stone-50 dark:bg-stone-900 border-3 border-stone-850 dark:border-stone-100 p-4 md:p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-6 my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-stone-900 text-stone-50 hover:bg-red-500 rounded-full border border-stone-700 shadow-md cursor-pointer transition-colors z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Side: Zoomed-in Image */}
              <div className="flex-1 rounded-xl overflow-hidden border border-stone-300 dark:border-stone-700 bg-stone-100 shadow-inner flex items-center justify-center">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[70vh] object-contain mx-auto rounded-lg"
                />
              </div>

              {/* Right Side: Description and Notebook metadata */}
              <div className="w-full md:w-80 flex flex-col justify-between text-left relative min-h-[180px] pt-4 md:pt-0">
                {/* Rule pad look background inside modal details */}
                <div className="absolute inset-0 bg-paper-plain opacity-20 pointer-events-none" />

                <div className="relative z-10 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-100 dark:bg-red-950/40 border border-red-300 rounded-full font-hand font-bold text-red-600 dark:text-red-400 text-xs">
                    <span>Authentic Document Evidence</span>
                  </div>
                  <h3 className="font-sketchy text-2xl font-black text-stone-900 dark:text-stone-100 leading-tight">
                    {selectedImage.title}
                  </h3>
                  <p className="font-hand text-base font-bold text-stone-700 dark:text-stone-300 leading-relaxed">
                    {selectedImage.caption}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-dashed border-stone-300 dark:border-stone-700 mt-6 flex justify-between items-center text-xs font-hand text-stone-400">
                  <span>ROUNDTABLE COUNCIL CO.</span>
                  <span>SECURE ACCESS</span>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
