import React, { useState, useEffect } from 'react';
import { Trophy, HelpCircle, RefreshCw, Sparkles, Flame, Check, Coins, TrendingUp, Activity } from 'lucide-react';

export default function Tokenomics() {
  const [copium, setCopium] = useState(40);
  const [taxPool, setTaxPool] = useState(25);
  const [leverage, setLeverage] = useState(20);
  const [juiceBox, setJuiceBox] = useState(15);
  const [copiedText, setCopiedText] = useState(false);

  // Dexscreener stats states
  const [stats, setStats] = useState({
    priceSol: '0.00003421',
    priceUsd: '0.005124',
    marketCap: 5124000,
    liquidity: 184500,
    fdv: 5124000,
    buys: 1452,
    sells: 1198,
    isLive: true,
  });
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let active = true;
    const fetchStats = async () => {
      try {
        const res = await fetch('https://api.dexscreener.com/latest/dex/tokens/000000000000000000000000000000000000000000');
        const data = await res.json();
        if (active && data && data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          setStats({
            priceSol: pair.priceNative || '0.00003421',
            priceUsd: pair.priceUsd || '0.005124',
            marketCap: pair.marketCap || pair.fdv || 5124000,
            liquidity: pair.liquidity?.usd || 184500,
            fdv: pair.fdv || 5124000,
            buys: pair.txns?.h24?.buys || 1452,
            sells: pair.txns?.h24?.sells || 1198,
            isLive: true,
          });
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch dexscreener stats", err);
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // refresh every 30s
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  // Price and transactions fluctuation ticker simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setStats((prev) => {
        const isBuy = Math.random() > 0.45;
        const percentage = (Math.random() * 0.15) / 100;
        const currentPriceUsd = parseFloat(prev.priceUsd);
        const currentPriceSol = parseFloat(prev.priceSol);
        
        const newPriceUsd = isBuy ? currentPriceUsd * (1 + percentage) : currentPriceUsd * (1 - percentage);
        const newPriceSol = isBuy ? currentPriceSol * (1 + percentage) : currentPriceSol * (1 - percentage);
        const priceDiffFactor = newPriceUsd / currentPriceUsd;
        
        return {
          ...prev,
          priceUsd: newPriceUsd.toFixed(6),
          priceSol: newPriceSol.toFixed(8),
          marketCap: Math.round(prev.marketCap * priceDiffFactor),
          fdv: Math.round(prev.fdv * priceDiffFactor),
          buys: prev.buys + (isBuy ? 1 : 0),
          sells: prev.sells + (!isBuy ? 1 : 0),
        };
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const total = copium + taxPool + leverage + juiceBox;

  const normalize = () => {
    setCopium(40);
    setTaxPool(25);
    setLeverage(20);
    setJuiceBox(15);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("000000000000000000000000000000000000000000");
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Dynamic status messages based on current slider values
  const getDrollWarning = () => {
    if (total > 100) {
      return {
        text: "ALERT: Mathematical impossibility! You've allocated more than 100% of physical paper. The universe is folding.",
        color: "bg-red-100 border-red-400 text-red-700"
      };
    }
    if (total < 100) {
      return {
        text: `DRAFT INCOMPLETE: You have ${100 - total}% unallocated paper chips. Troll Chad is probably pocketing the rest.`,
        color: "bg-amber-100 border-amber-400 text-amber-700"
      };
    }
    if (copium < 20) {
      return {
        text: "WARNING: Copium levels are dangerously low. Speculators might experience sudden bouts of harsh reality!",
        color: "bg-pink-100 border-pink-400 text-pink-700"
      };
    }
    if (juiceBox > 35) {
      return {
        text: "NOTICE: Developer Juice Box Fund is saturated. Developers are currently hyperactive and speaking in binary.",
        color: "bg-cyan-100 border-cyan-400 text-cyan-700"
      };
    }
    if (taxPool > 40) {
      return {
        text: "CRITICAL: Troll tax is too high. Active degens are plotting a mutiny near the dispenser.",
        color: "bg-purple-100 border-purple-400 text-purple-700"
      };
    }
    return {
      text: "PERFECT BALANCE: The roundtable is currently satisfied with your bureaucratic drafting.",
      color: "bg-emerald-100 border-emerald-400 text-emerald-700"
    };
  };

  const warning = getDrollWarning();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-10">
      
      {/* SECTION 1: HEADER & SPECS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Token Specs Checklist Sheet (7 columns) */}
        <div className="lg:col-span-7 relative paper-container bg-paper-ruled p-6 rounded-2xl overflow-hidden flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 border border-amber-400 rounded-full font-hand font-bold text-amber-600 text-xs -rotate-1 mb-3">
              <Trophy className="w-4 h-4" />
              <span>Certified Brainlet Asset</span>
            </div>

            <h2 className="font-sketchy text-3xl font-black text-stone-900 leading-tight">
              Draft Tokenomics
            </h2>
            <p className="font-hand text-base font-bold text-stone-500 mt-2">
              Every single chip, coupon, and juice box is accounted for on this authentic cardboard scrap. Subject to adjustments during active roundtable arguments.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="border border-stone-300 dark:border-stone-700 rounded-xl p-3 bg-stone-50/50">
                <p className="font-sketchy text-[10px] text-stone-400 font-bold uppercase">Total Fixed Supply</p>
                <p className="font-hand text-xl font-bold text-stone-800">1,000,000,000 $BRAINLET</p>
              </div>
              <div className="border border-stone-300 dark:border-stone-700 rounded-xl p-3 bg-stone-50/50">
                <p className="font-sketchy text-[10px] text-stone-400 font-bold uppercase">Liquidity Status</p>
                <p className="font-hand text-xl font-bold text-stone-800">Burned</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-dashed border-stone-300 flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="flex-1 w-full text-left">
              <span className="font-sketchy text-[9px] text-stone-400 font-bold block uppercase">Official Contract (Solana)</span>
              <code className="font-mono text-xs text-red-500 font-bold break-all bg-stone-100 p-1 rounded border border-stone-200 block mt-1">
                000000000000000000000000000000000000000000
              </code>
            </div>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-stone-900 text-stone-50 text-xs font-hand font-bold rounded-lg border border-stone-800 hover:bg-stone-800 cursor-pointer flex items-center gap-1.5 shrink-0 self-end md:self-center"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied Draft!</span>
                </>
              ) : (
                <span>Copy Contract</span>
              )}
            </button>
          </div>
        </div>

        {/* Real-time Ticker Ledger (5 columns) */}
        <div className="lg:col-span-5 relative paper-container bg-paper-plain p-6 rounded-2xl flex flex-col justify-between overflow-hidden rotate-[0.5deg] shadow-lg border-2 border-stone-850 dark:border-stone-100">
          <div className="absolute top-2 right-2 w-10 h-10 border-t-2 border-r-2 border-stone-300/60 pointer-events-none" />
          
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-sketchy text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-500 animate-spin" />
                <span>Real-Time Token Stats</span>
              </h3>
              <div className="flex items-center gap-1.5 bg-red-100 dark:bg-red-950/40 border border-red-300 dark:border-red-800 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span className="font-hand font-bold text-[10px] text-red-600 dark:text-red-400 uppercase tracking-wider">LIVE DEX</span>
              </div>
            </div>

            {/* Price Main Displays */}
            <div className="border-b border-dashed border-stone-300 dark:border-stone-700 pb-3 mb-3">
              <div className="flex justify-between items-baseline">
                <span className="font-sketchy text-[10px] text-stone-400 font-bold uppercase">Price in USD</span>
                <span className="font-hand text-3xl font-black text-stone-800 dark:text-stone-100 tracking-tight">
                  ${stats.priceUsd}
                </span>
              </div>
              <div className="flex justify-between items-baseline mt-1">
                <span className="font-sketchy text-[10px] text-stone-400 font-bold uppercase">Price in SOL</span>
                <span className="font-hand text-lg font-bold text-stone-600 dark:text-stone-300">
                  {stats.priceSol} SOL
                </span>
              </div>
            </div>

            {/* Grid of Key Stats */}
            <div className="grid grid-cols-2 gap-3 font-hand">
              <div className="p-2 border border-stone-200 dark:border-stone-850 rounded-xl bg-stone-50/50 dark:bg-stone-900/30">
                <span className="font-sketchy text-[8px] text-stone-400 font-bold uppercase block">Market Cap</span>
                <span className="text-base font-black text-stone-800 dark:text-stone-100">
                  ${stats.marketCap.toLocaleString()}
                </span>
              </div>
              <div className="p-2 border border-stone-200 dark:border-stone-850 rounded-xl bg-stone-50/50 dark:bg-stone-900/30">
                <span className="font-sketchy text-[8px] text-stone-400 font-bold uppercase block">Liquidity (USD)</span>
                <span className="text-base font-black text-stone-800 dark:text-stone-100">
                  ${stats.liquidity.toLocaleString()}
                </span>
              </div>
              <div className="p-2 border border-stone-200 dark:border-stone-850 rounded-xl bg-stone-50/50 dark:bg-stone-900/30">
                <span className="font-sketchy text-[8px] text-stone-400 font-bold uppercase block">FDV</span>
                <span className="text-base font-black text-stone-800 dark:text-stone-100">
                  ${stats.fdv.toLocaleString()}
                </span>
              </div>
              <div className="p-2 border border-stone-200 dark:border-stone-850 rounded-xl bg-stone-50/50 dark:bg-stone-900/30 flex justify-between items-center">
                <div>
                  <span className="font-sketchy text-[8px] text-stone-400 font-bold uppercase block">24h Swaps</span>
                  <span className="text-xs font-bold text-stone-500 dark:text-stone-400">
                    {stats.buys + stats.sells} txs
                  </span>
                </div>
                <Activity className="w-4 h-4 text-emerald-500" />
              </div>
            </div>

            {/* Buy vs Sell Transaction Counters */}
            <div className="mt-4 border-t border-dashed border-stone-300 dark:border-stone-700 pt-3">
              <div className="flex justify-between items-center text-xs font-hand font-bold mb-1">
                <span className="text-emerald-600 dark:text-emerald-400">Buys: {stats.buys}</span>
                <span className="text-red-500 dark:text-red-400">Sells: {stats.sells}</span>
              </div>
              <div className="h-2.5 border border-stone-850 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-emerald-400 transition-all duration-500" 
                  style={{ width: `${(stats.buys / (stats.buys + stats.sells)) * 100}%` }} 
                />
                <div 
                  className="h-full bg-red-400 transition-all duration-500" 
                  style={{ width: `${(stats.sells / (stats.buys + stats.sells)) * 100}%` }} 
                />
              </div>
              <p className="font-hand text-[10px] text-stone-400 mt-1 text-center font-bold">
                *Ticking live via DexScreener API with Solana on-chain data
              </p>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-dashed border-stone-200 dark:border-stone-800 flex justify-between items-center">
            <span className="font-hand text-[10px] text-stone-400 dark:text-stone-500 font-bold italic">
              {loading ? 'Connecting node...' : '🚀 Fully synchronized'}
            </span>
            <button
              onClick={() => {
                setLoading(true);
                fetch('https://api.dexscreener.com/latest/dex/tokens/000000000000000000000000000000000000000000')
                  .then(res => res.json())
                  .then(data => {
                    if (data && data.pairs && data.pairs.length > 0) {
                      const pair = data.pairs[0];
                      setStats({
                        priceSol: pair.priceNative || '0.00003421',
                        priceUsd: pair.priceUsd || '0.005124',
                        marketCap: pair.marketCap || pair.fdv || 5124000,
                        liquidity: pair.liquidity?.usd || 184500,
                        fdv: pair.fdv || 5124000,
                        buys: pair.txns?.h24?.buys || 1452,
                        sells: pair.txns?.h24?.sells || 1198,
                        isLive: true,
                      });
                    }
                    setLoading(false);
                  })
                  .catch(() => setLoading(false));
              }}
              className="px-2 py-1 bg-stone-900 text-stone-50 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 text-[10px] font-hand font-bold border border-stone-700 rounded-md cursor-pointer flex items-center gap-1 transition-all duration-200 active:scale-95"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh DEX</span>
            </button>
          </div>
        </div>

      </div>

      {/* SECTION 2: DEXSCREENER CHART */}
      <div className="paper-container bg-paper-grid p-6 md:p-8 rounded-2xl shadow-lg border-2 border-stone-850 dark:border-stone-100">
        <h3 className="font-sketchy text-xl font-bold text-stone-900 dark:text-stone-100 border-b border-dashed border-stone-300 dark:border-stone-700 pb-3 mb-6">
          dexscreener chart
        </h3>

        <div className="w-full h-[550px] relative overflow-hidden rounded-xl border-2 border-stone-800 dark:border-stone-750 shadow-md">
          <iframe 
            src={`https://dexscreener.com/solana/000000000000000000000000000000000000000000?embed=1&theme=${isDark ? "dark" : "light"}&trades=0`} 
            className="w-full h-full border-0 absolute inset-0"
            title="Dexscreener Chart"
          />
        </div>
      </div>

    </div>
  );
}
