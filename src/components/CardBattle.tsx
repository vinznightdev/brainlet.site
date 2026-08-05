import React, { useState } from 'react';
import { CARD_POOL } from '../data';
import { Card, GameState } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Flame, RefreshCw, Trophy, AlertTriangle, MessageSquareQuote } from 'lucide-react';

export default function CardBattle() {
  const [gameState, setGameState] = useState<GameState>({
    playerHand: [],
    opponentHand: [],
    playerScore: 0,
    opponentScore: 0,
    activeRound: 1,
    selectedCardId: null,
    selectedStat: null,
    roundResult: null,
    battleLog: []
  });

  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Initialize a new game by dealing 3 cards to both
  const startNewGame = () => {
    // Shuffle and pick 6 unique cards
    const shuffled = [...CARD_POOL].sort(() => Math.random() - 0.5);
    const pHand = shuffled.slice(0, 3);
    const oHand = shuffled.slice(3, 6);

    setGameState({
      playerHand: pHand,
      opponentHand: oHand,
      playerScore: 0,
      opponentScore: 0,
      activeRound: 1,
      selectedCardId: null,
      selectedStat: null,
      roundResult: null,
      battleLog: ['🃏 Cards have been dealt! Prepare for battle.']
    });

    setGameActive(true);
    setGameOver(false);
  };

  const handleSelectCard = (cardId: string) => {
    if (gameState.roundResult !== null || gameOver) return;
    setGameState(prev => ({
      ...prev,
      selectedCardId: cardId,
      selectedStat: null
    }));
  };

  const handlePlayRound = (statKey: keyof Card['stats']) => {
    const { playerHand, opponentHand, selectedCardId, playerScore, opponentScore, activeRound, battleLog } = gameState;
    if (!selectedCardId || gameOver) return;

    const playerCard = playerHand.find(c => c.id === selectedCardId)!;
    
    // Opponent plays their first card in their hand
    const opponentCard = opponentHand[0];

    const playerVal = playerCard.stats[statKey];
    const opponentVal = opponentCard.stats[statKey];

    let result: 'win' | 'lose' | 'tie' = 'tie';
    let pScoreDelta = 0;
    let oScoreDelta = 0;
    let logMessage = '';

    if (playerVal > opponentVal) {
      result = 'win';
      pScoreDelta = 1;
      logMessage = `🎉 ROUND ${activeRound} WIN: ${playerCard.name}'s ${statKey} (${playerVal}) defeated ${opponentCard.name}'s ${statKey} (${opponentVal})!`;
    } else if (playerVal < opponentVal) {
      result = 'lose';
      oScoreDelta = 1;
      logMessage = `💔 ROUND ${activeRound} LOSS: ${opponentCard.name}'s ${statKey} (${opponentVal}) overpowered ${playerCard.name}'s ${statKey} (${playerVal})!`;
    } else {
      result = 'tie';
      logMessage = `🤝 ROUND ${activeRound} TIE: Both had ${statKey} score of ${playerVal}!`;
    }

    // Prepare next state
    const nextPlayerHand = playerHand.filter(c => c.id !== selectedCardId);
    const nextOpponentHand = opponentHand.slice(1);
    const isLastRound = activeRound === 3;

    setTimeout(() => {
      setGameState(prev => {
        const updatedPlayerScore = playerScore + pScoreDelta;
        const updatedOpponentScore = opponentScore + oScoreDelta;

        if (isLastRound) {
          setGameOver(true);
          let finalWinnerMsg = '';
          if (updatedPlayerScore > updatedOpponentScore) {
            finalWinnerMsg = '🏆 GAME OVER: You defeated Troll Chad and won the entire stack of chips!';
          } else if (updatedPlayerScore < updatedOpponentScore) {
            finalWinnerMsg = '💀 GAME OVER: Troll Chad cleaned you out. Time to apply for more Copium refills!';
          } else {
            finalWinnerMsg = '🤝 GAME OVER: It is a perfect tie. The chips remain on the table!';
          }

          return {
            ...prev,
            playerScore: updatedPlayerScore,
            opponentScore: updatedOpponentScore,
            roundResult: result,
            playerHand: nextPlayerHand,
            opponentHand: nextOpponentHand,
            battleLog: [finalWinnerMsg, logMessage, ...battleLog]
          };
        }

        return {
          ...prev,
          playerScore: updatedPlayerScore,
          opponentScore: updatedOpponentScore,
          roundResult: result,
          playerHand: nextPlayerHand,
          opponentHand: nextOpponentHand,
          battleLog: [logMessage, ...battleLog]
        };
      });
    }, 400);
  };

  const handleNextRound = () => {
    setGameState(prev => ({
      ...prev,
      activeRound: prev.activeRound + 1,
      selectedCardId: null,
      selectedStat: null,
      roundResult: null
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-8">
      
      {/* ARENA HEADER */}
      <div className="relative bg-stone-50 dark:bg-zinc-900 border-2 border-stone-850 dark:border-stone-100 rounded-2xl p-6 shadow-md text-center max-w-3xl mx-auto w-full">
        {/* Paper texture */}
        <div className="absolute inset-0 bg-paper-plain opacity-30 dark:opacity-10 pointer-events-none rounded-2xl" />
        
        <h2 className="font-sketchy text-2xl font-black text-stone-900 dark:text-stone-100 uppercase tracking-tight">
          🃏 Degen Card Arena
        </h2>
        <p className="text-sm font-hand text-stone-600 dark:text-stone-400 font-bold mt-1">
          Draw sketchy meme cards from the table pool and engage in stat-based combat against Troll Chad's algorithm.
        </p>

        {!gameActive && (
          <button
            onClick={startNewGame}
            className="mt-4 px-8 py-3 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-stone-50 font-hand font-bold text-lg rounded-xl border-2 border-stone-850 dark:border-stone-100 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            Draw Hand & Fight
          </button>
        )}
      </div>

      {gameActive && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Game Table Stage */}
          <div className="lg:col-span-8 flex flex-col gap-6 bg-amber-50/10 dark:bg-neutral-900/10 border-3 border-stone-850 dark:border-stone-200 rounded-3xl p-6 relative shadow-inner">
            <div className="absolute inset-0 bg-paper-grid opacity-25 dark:opacity-10 pointer-events-none rounded-3xl" />

            {/* SCORE TRACKER */}
            <div className="relative z-10 flex justify-between items-center border-b border-stone-300 dark:border-stone-700 pb-3 font-hand font-bold">
              <div className="flex items-center gap-2">
                <span className="text-xl">👤</span>
                <div>
                  <div className="text-stone-500 dark:text-stone-400 text-xs">YOUR CHIPS</div>
                  <div className="text-stone-850 dark:text-stone-100 text-lg">{gameState.playerScore} Wins</div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-red-500 dark:text-red-400 font-sketchy text-lg uppercase tracking-wide">
                  Round {gameState.activeRound} of 3
                </div>
                {gameOver && (
                  <span className="text-xs bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 px-2.5 py-0.5 rounded-full border border-red-300">
                    Match Completed
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-right">
                <div>
                  <div className="text-stone-500 dark:text-stone-400 text-xs">TROLL CHAD'S CHIPS</div>
                  <div className="text-stone-850 dark:text-stone-100 text-lg">{gameState.opponentScore} Wins</div>
                </div>
                <span className="text-xl">😏</span>
              </div>
            </div>

            {/* STAGE ZONE (Active Battle Cards) */}
            <div className="relative flex-1 py-8 flex flex-col md:flex-row justify-around items-center gap-6 min-h-[320px]">
              
              {/* Opponent played card (Left to face player card) */}
              <div className="flex flex-col items-center gap-2">
                <span className="font-hand font-bold text-xs uppercase tracking-wider text-stone-400 dark:text-stone-600">
                  Opponent's Card Slot
                </span>
                
                {gameState.roundResult !== null ? (
                  // Revealed Opponent Card
                  <motion.div
                    initial={{ rotateY: 180, scale: 0.9 }}
                    animate={{ rotateY: 0, scale: 1 }}
                    className="w-48 h-72 bg-gradient-to-br from-neutral-800 to-neutral-950 text-white rounded-xl border-3 border-stone-850 dark:border-stone-200 p-4 shadow-xl flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-center border-b border-stone-800 pb-2">
                      <span className="text-xs uppercase tracking-wider font-sketchy font-bold text-red-400">
                        OPPONENT CARD
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center py-4">
                      <span className="text-5xl select-none">😏</span>
                      <h4 className="font-sketchy text-md font-black mt-2">Troll Chad</h4>
                    </div>
                    <div className="text-[10px] font-hand text-stone-400 italic text-center">
                      "Is that the best you got, kid?"
                    </div>
                  </motion.div>
                ) : (
                  // Mystery Card Back
                  <div className="w-48 h-72 bg-stone-200 dark:bg-stone-800 border-3 border-dashed border-stone-400 dark:border-stone-600 rounded-xl flex items-center justify-center p-4 shadow-md rotate-2">
                    <div className="text-center font-hand text-stone-400">
                      <div className="text-3xl mb-1">🃏</div>
                      <span className="font-bold text-xs">Mystery Sheet</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Central VS layout */}
              <div className="flex flex-col items-center">
                {gameState.roundResult === null ? (
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-stone-900 text-stone-50 border-2 border-stone-850 text-lg font-sketchy font-bold">
                    VS
                  </div>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`px-4 py-2 rounded-xl border-2 font-hand font-bold text-center text-lg shadow-md ${
                      gameState.roundResult === 'win' ? 'bg-emerald-100 text-emerald-800 border-emerald-400' :
                      gameState.roundResult === 'lose' ? 'bg-red-100 text-red-800 border-red-400' :
                      'bg-stone-100 text-stone-850 border-stone-400'
                    }`}
                  >
                    {gameState.roundResult === 'win' ? 'Round Win! 🎉' :
                     gameState.roundResult === 'lose' ? 'Round Loss 💔' :
                     'Round Tie 🤝'}
                  </motion.div>
                )}

                {gameState.roundResult !== null && !gameOver && (
                  <button
                    onClick={handleNextRound}
                    className="mt-3 px-4 py-1.5 bg-stone-50 hover:bg-stone-100 dark:bg-stone-900 border-2 border-stone-850 dark:border-stone-100 rounded-lg text-xs font-hand font-bold cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]"
                  >
                    Next Round →
                  </button>
                )}
              </div>

              {/* Player Played Card (Drafted slot) */}
              <div className="flex flex-col items-center gap-2">
                <span className="font-hand font-bold text-xs uppercase tracking-wider text-stone-400 dark:text-stone-600">
                  Your Slot
                </span>
                
                {gameState.selectedCardId ? (
                  (() => {
                    const card = CARD_POOL.find(c => c.id === gameState.selectedCardId)!;
                    return (
                      <motion.div
                        layoutId={`card-${card.id}`}
                        className={`w-48 h-72 bg-gradient-to-br ${card.color} rounded-xl border-3 border-stone-850 dark:border-stone-100 p-4 shadow-xl flex flex-col justify-between`}
                      >
                        <div className="flex justify-between items-start border-b border-white/20 pb-1">
                          <span className="font-sketchy text-[10px] font-bold tracking-wider">{card.rarity}</span>
                          <span className="font-hand text-xs opacity-75">#Degen</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center py-2">
                          <span className="text-5xl mb-2 filter drop-shadow select-none">{card.emoji}</span>
                          <h4 className="font-sketchy text-md font-black tracking-tight text-center">{card.name}</h4>
                        </div>
                        <div className="text-[9px] leading-tight font-hand opacity-90 text-center italic border-t border-white/10 pt-1">
                          {card.flavorText}
                        </div>
                      </motion.div>
                    );
                  })()
                ) : (
                  <div className="w-48 h-72 bg-stone-100/50 dark:bg-stone-950/20 border-3 border-dashed border-stone-300 dark:border-stone-800 rounded-xl flex items-center justify-center p-4">
                    <p className="font-hand font-bold text-xs text-stone-400 text-center max-w-[120px]">
                      Select a card from your hand below to play
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* PLAYER HAND INVENTORY */}
            {!gameOver && (
              <div className="border-t border-stone-300 dark:border-stone-800 pt-4 mt-4 relative z-10">
                <h4 className="font-sketchy text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-600 font-bold mb-3 text-center">
                  Your Available Hand Sheets ({gameState.playerHand.length} cards)
                </h4>
                
                <div className="flex flex-wrap justify-center gap-3">
                  {gameState.playerHand.map((card) => {
                    const isSelected = gameState.selectedCardId === card.id;
                    return (
                      <button
                        key={card.id}
                        disabled={gameState.roundResult !== null}
                        onClick={() => handleSelectCard(card.id)}
                        className={`relative group cursor-pointer transition-all ${
                          isSelected 
                            ? 'scale-105 -translate-y-2 z-20' 
                            : 'hover:scale-102 hover:-translate-y-1'
                        }`}
                      >
                        {/* Compact Card sheet */}
                        <div className={`w-32 py-3 px-2 rounded-lg bg-gradient-to-br ${card.color} border-2 border-stone-850 dark:border-stone-100 shadow-md text-center`}>
                          <span className="text-3xl select-none filter drop-shadow">{card.emoji}</span>
                          <h5 className="font-sketchy font-bold text-[11px] truncate mt-1">{card.name}</h5>
                          <div className="text-[8px] opacity-75 uppercase font-hand font-bold">{card.rarity}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* GAME OVER CARD STATS MODAL & ACTIONS */}
            {gameOver && (
              <div className="absolute inset-0 bg-stone-950/60 flex items-center justify-center p-6 z-40 rounded-3xl">
                <div className="relative paper-container bg-paper-ruled p-6 max-w-sm rounded-2xl shadow-xl text-center">
                  <span className="text-4xl">🏆</span>
                  <h3 className="font-sketchy text-xl font-bold text-stone-900 mt-2">
                    Tournament Concluded
                  </h3>
                  <p className="font-hand font-bold text-base text-stone-700 leading-normal mt-2">
                    {gameState.playerScore > gameState.opponentScore
                      ? 'Incredible! You played your cards with maximum strategic leverage and won Troll Chad’s entire stash of gold chips!'
                      : 'Alas! Troll Chad’s logic was too superior. Your chips are gone. Better grab some fresh Copium and draft another deck!'}
                  </p>

                  <div className="flex gap-2 justify-center mt-5">
                    <button
                      onClick={startNewGame}
                      className="px-6 py-2 bg-red-500 hover:bg-red-600 text-stone-50 font-hand font-bold rounded-xl border-2 border-stone-850 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] cursor-pointer"
                    >
                      Deal Another Match
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Stat Selector & Dossier Card Details */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Stat choosing desk */}
            {gameState.selectedCardId && gameState.roundResult === null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative paper-container bg-paper-legal p-6 rounded-2xl shadow-md flex-1 flex flex-col justify-between"
              >
                {/* Spiral binder */}
                <div className="absolute top-0 left-0 right-0 h-3 bg-red-400 opacity-60" />

                <div className="pt-2">
                  <h3 className="font-sketchy text-md font-bold text-stone-900 flex items-center gap-1">
                    <Flame className="w-4 h-4 text-red-500" />
                    <span>Choose Battle Stat</span>
                  </h3>
                  <p className="text-[11px] font-hand text-stone-500 font-bold">
                    Select which parameter you want to compete on. Opponent plays their sheet blindly.
                  </p>

                  {/* Stats choosing buttons */}
                  <div className="space-y-2 mt-4 font-hand">
                    {(() => {
                      const card = CARD_POOL.find(c => c.id === gameState.selectedCardId)!;
                      return (
                        <>
                          <button
                            onClick={() => handlePlayRound('copium')}
                            className="w-full flex justify-between items-center py-2 px-3 bg-white hover:bg-amber-50 rounded-lg border-2 border-stone-850 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] text-left cursor-pointer transition-transform hover:scale-[1.01]"
                          >
                            <span className="font-bold flex items-center gap-1">💊 Copium Level</span>
                            <span className="font-black text-red-500">{card.stats.copium}%</span>
                          </button>

                          <button
                            onClick={() => handlePlayRound('alpha')}
                            className="w-full flex justify-between items-center py-2 px-3 bg-white hover:bg-amber-50 rounded-lg border-2 border-stone-850 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] text-left cursor-pointer transition-transform hover:scale-[1.01]"
                          >
                            <span className="font-bold flex items-center gap-1">⚡ Alpha Gauge</span>
                            <span className="font-black text-blue-500">{card.stats.alpha}/100</span>
                          </button>

                          <button
                            onClick={() => handlePlayRound('leverage')}
                            className="w-full flex justify-between items-center py-2 px-3 bg-white hover:bg-amber-50 rounded-lg border-2 border-stone-850 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] text-left cursor-pointer transition-transform hover:scale-[1.01]"
                          >
                            <span className="font-bold flex items-center gap-1">📈 Leverage Multiplier</span>
                            <span className="font-black text-amber-600">{card.stats.leverage}x</span>
                          </button>

                          <button
                            onClick={() => handlePlayRound('hype')}
                            className="w-full flex justify-between items-center py-2 px-3 bg-white hover:bg-amber-50 rounded-lg border-2 border-stone-850 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] text-left cursor-pointer transition-transform hover:scale-[1.01]"
                          >
                            <span className="font-bold flex items-center gap-1">🔥 Hype Sensation</span>
                            <span className="font-black text-indigo-500">{card.stats.hype}/100</span>
                          </button>
                        </>
                      );
                    })()}
                  </div>
                </div>

                <div className="mt-4 border-t border-dashed border-stone-300 pt-3 flex items-center gap-1 text-[10px] font-hand font-bold text-stone-400">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Choose carefully based on card strength!</span>
                </div>
              </motion.div>
            )}

            {/* Arena Battle logs */}
            <div className="relative paper-container bg-paper-plain p-5 rounded-2xl shadow-md min-h-[220px] flex flex-col justify-between">
              <div>
                <h4 className="font-sketchy text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest border-b border-dashed border-stone-200 dark:border-stone-800 pb-1.5 mb-2.5">
                  Battle Commentary
                </h4>
                
                <div className="max-h-56 overflow-y-auto space-y-2 pr-1 font-hand">
                  {gameState.battleLog.length === 0 ? (
                    <p className="text-center text-xs font-bold text-stone-400 dark:text-stone-600 py-6">
                      Deck is quiet. Start the game or play a round to generate logs.
                    </p>
                  ) : (
                    gameState.battleLog.map((log, idx) => (
                      <p 
                        key={idx} 
                        className={`text-sm leading-snug font-bold ${
                          idx === 0 
                            ? 'text-stone-850 dark:text-stone-100 font-extrabold' 
                            : 'text-stone-400 dark:text-stone-600'
                        }`}
                      >
                        {log}
                      </p>
                    ))
                  )}
                </div>
              </div>

              {gameActive && (
                <button
                  onClick={() => {
                    if (confirm('Forfeit and restart?')) {
                      startNewGame();
                    }
                  }}
                  className="w-full py-1.5 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 hover:text-red-500 rounded-lg text-xs font-hand font-bold text-stone-400 cursor-pointer text-center mt-4 transition-colors"
                >
                  Forfeit & Reshuffle Hand
                </button>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
