
import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Dice5, Settings, Maximize, Minimize, Moon, Sun, ArrowRight, HelpCircle, Activity, X } from 'lucide-react';
import { useGame } from './gamelogic/useGame';
import { MainMenu } from './components/MainMenu';
import { PlayerCard } from './components/PlayerCard';
import { TrackMap } from './components/TrackMap';
import { GameLogs } from './components/GameLogs';
import { SettingsModal } from './components/SettingsModal';
import { HelpModal } from './components/HelpModal';
import { EventModal } from './components/EventModal'; 
import { Language } from './types/index';
import { TRANSLATIONS } from './gameConfig/i18n/translations';

// Helper per determinare il colore del testo ottimale (nero o bianco) su uno sfondo dato
const getContrastYIQ = (hexcolor: string) => {
  hexcolor = hexcolor.replace("#", "");
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'text-slate-900' : 'text-white';
};

export default function App() {
  const [language, setLanguage] = useState<Language>('it');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isLogsOpenMobile, setIsLogsOpenMobile] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { 
    gameMode, 
    toggleMode,
    activeMap,
    changeMap,
    goToNextMap, 
    turn, 
    p1, 
    p2, 
    winner, 
    logs, 
    isRolling, 
    startGame, 
    resetGame, 
    performRoll,
    processRollResult,
    updatePlayerName,
    updatePlayerColor,
    modalState, 
    handleModalClose,
    totalLaps,
    changeTotalLaps,
    manualDiceEnabled,
    setManualDiceEnabled
  } = useGame();

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const t = TRANSLATIONS[language];
  const isAiThinking = gameMode === 'AI' && turn === 2 && !winner;
  const activePlayer = turn === 1 ? p1 : p2;
  const activePlayerName = activePlayer.name;
  const isManualTurn = manualDiceEnabled && (turn === 1 ? !p1.isAi : !p2.isAi);

  const rollButtonStyle = !winner && !isRolling && !isAiThinking ? {
    backgroundColor: activePlayer.hexColor,
    borderColor: activePlayer.hexBorderColor,
    boxShadow: `0 4px 0 ${activePlayer.hexBorderColor}`,
    color: getContrastYIQ(activePlayer.hexColor).includes('white') ? 'white' : '#0f172a'
  } : {};

  return (
    <div className={`w-full transition-colors duration-300 bg-graph-paper flex flex-col h-[100dvh] overflow-hidden font-sans`}>
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        language={language}
        setLanguage={setLanguage}
        isDarkMode={isDarkMode}
        currentMapId={activeMap.id}
        onMapChange={changeMap}
        totalLaps={totalLaps}
        onLapsChange={changeTotalLaps}
        manualDiceEnabled={manualDiceEnabled}
        setManualDiceEnabled={setManualDiceEnabled}
        gameMode={gameMode!}
        onToggleMode={toggleMode}
      />

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} language={language} isDarkMode={isDarkMode} />
      
      <EventModal 
        isOpen={modalState.isOpen}
        type={modalState.type}
        eventKey={modalState.eventKey}
        rollValue={modalState.rollValue}
        onClose={handleModalClose}
        onManualSelect={processRollResult}
        language={language}
      />

      {/* MOBILE LOGS OVERLAY */}
      {isLogsOpenMobile && (
        <div className="lg:hidden absolute inset-0 z-40 bg-black/50 backdrop-blur-sm flex flex-col justify-end">
           <div className={`w-full h-2/3 rounded-t-2xl p-4 flex flex-col shadow-2xl border-t-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
              <div className="flex justify-between items-center mb-4">
                  <h3 className={`font-bold uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.race_telemetry}</h3>
                  <button onClick={() => setIsLogsOpenMobile(false)} className="p-2 bg-slate-200 dark:bg-slate-700 rounded-full"><X size={20}/></button>
              </div>
              <div className="flex-1 overflow-y-auto">
                 <GameLogs logs={logs} language={language} isDarkMode={isDarkMode} />
              </div>
           </div>
        </div>
      )}

      {/* HEADER */}
      <header className="flex-none p-2 z-10">
        <div className={`w-full max-w-[1920px] mx-auto flex flex-wrap justify-between items-center border-b-2 lg:border-2 p-2 rounded-xl lg:shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-600 text-white shadow-black' : 'bg-white border-slate-800 text-slate-900'}`}>
          <div className="flex items-center gap-2 lg:gap-4 overflow-hidden">
            <div className="min-w-0">
              <h1 className="font-display text-lg md:text-xl lg:text-3xl uppercase font-black tracking-normal flex items-center gap-2 whitespace-nowrap">
                <span className="text-red-600">F1</span> <span className="hidden sm:inline">PAPER CIRCUIT</span><span className="sm:hidden">PC</span>
              </h1>
              {gameMode && (
                <div className="flex flex-row gap-2 mt-0.5">
                   <p className={`text-[10px] font-bold truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{activeMap.name}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
             {gameMode && (
                 <button onClick={() => setIsLogsOpenMobile(true)} className={`lg:hidden p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-slate-700 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                    <Activity size={18} />
                 </button>
             )}
            <button onClick={() => setIsHelpOpen(true)} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-blue-400' : 'hover:bg-blue-50 text-blue-600'}`}><HelpCircle size={18} className="lg:w-6 lg:h-6" /></button>
            <button onClick={toggleTheme} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-yellow-400' : 'hover:bg-slate-100 text-slate-600'}`}>{isDarkMode ? <Sun size={18} className="lg:w-5 lg:h-5" /> : <Moon size={18} className="lg:w-5 lg:h-5" />}</button>
            <button onClick={toggleFullScreen} className={`hidden sm:block p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}>
              {isFullScreen ? <Minimize size={18} className="lg:w-5 lg:h-5" /> : <Maximize size={18} className="lg:w-5 lg:h-5" />}
            </button>
            <button onClick={() => setIsSettingsOpen(true)} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}><Settings size={18} className="lg:w-5 lg:h-5" /></button>
            {gameMode && <button onClick={() => resetGame()} className={`flex items-center gap-2 p-2 lg:px-4 lg:py-2 font-bold rounded-lg transition-colors ml-1 ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}><RotateCcw size={18} /><span className="hidden lg:inline text-sm">{t.reset}</span></button>}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col lg:overflow-hidden p-2 pt-0 h-full min-h-0">
        <div className="w-full max-w-[1920px] mx-auto h-full flex flex-col lg:flex-row gap-2 lg:gap-6 min-h-0">
          
          {!gameMode ? (
            <div className="flex-1 flex items-center justify-center overflow-y-auto"><MainMenu onStart={startGame} language={language} isDarkMode={isDarkMode} /></div>
          ) : (
            <>
              {/* MAP AREA (Flex Grow) */}
              <div className={`flex-1 relative flex flex-col border-2 rounded-xl shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] lg:shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] overflow-hidden transition-colors duration-300 min-h-0 ${isDarkMode ? 'border-slate-600 shadow-black' : 'border-slate-800'}`}>
                <div className="flex-1 w-full h-full p-2 lg:p-6 relative">
                    <TrackMap p1={p1} p2={p2} winner={winner} isDarkMode={isDarkMode} language={language} map={activeMap} />
                </div>
                
                {/* WINNER OVERLAY */}
                {winner && (
                    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300 p-4">
                        <div className={`border-4 p-6 lg:p-8 rounded-2xl text-center shadow-2xl transform scale-100 lg:scale-110 max-w-lg w-full ${isDarkMode ? 'bg-slate-800 border-yellow-500' : 'bg-white border-yellow-400'}`}>
                            <Trophy size={48} className="mx-auto text-yellow-500 mb-4 animate-bounce" />
                            <h2 className={`text-2xl lg:text-4xl font-display uppercase font-black tracking-normal mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.winner}</h2>
                            <p className={`text-lg lg:text-2xl font-bold mb-6 font-display uppercase ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{winner === 1 ? p1.name : p2.name} {t.wins}</p>
                            <div className="flex flex-col gap-3">
                                <button onClick={() => goToNextMap()} className="w-full flex items-center justify-center gap-2 px-6 py-3 lg:py-4 bg-green-600 hover:bg-green-700 text-white font-bold font-display uppercase text-lg rounded-lg shadow-lg"><span>{t.next_race}</span><ArrowRight size={20} /></button>
                                <button onClick={() => resetGame()} className={`w-full px-6 py-3 font-bold rounded-lg transition-colors ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-200' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}>{t.play_again}</button>
                            </div>
                        </div>
                    </div>
                )}
              </div>

              {/* RIGHT SIDEBAR (Desktop) / BOTTOM BAR (Mobile) */}
              <div className="flex-none lg:w-[380px] xl:w-[420px] flex flex-col gap-2 lg:gap-4 lg:h-full lg:overflow-y-auto pb-safe">
                
                {/* Players & Dice Section */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-4">
                  <PlayerCard player={p1} isActive={turn === 1} isWinner={winner === 1} language={language} isDarkMode={isDarkMode} onNameChange={(name) => updatePlayerName(1, name)} onColorChange={(idx) => updatePlayerColor(1, idx)} totalLaps={totalLaps} />
                  <PlayerCard player={p2} isActive={turn === 2} isWinner={winner === 2} language={language} isDarkMode={isDarkMode} onNameChange={(name) => updatePlayerName(2, name)} onColorChange={(idx) => updatePlayerColor(2, idx)} totalLaps={totalLaps} />
                </div>

                <div className={`border-2 p-2 lg:p-4 rounded-xl shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] lg:shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-600 shadow-black' : 'bg-white border-slate-800'}`}>
                  {winner ? (
                      <div className={`text-center font-bold py-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.race_finished}</div>
                  ) : (
                    <button 
                      onClick={performRoll} 
                      disabled={isRolling || isAiThinking || (turn === 1 ? p1.skipTurn : p2.skipTurn)} 
                      style={rollButtonStyle}
                      className={`w-full py-3 lg:py-6 rounded-xl font-display text-xl uppercase tracking-wider shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 border-2 ${isRolling || isAiThinking ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed' : ''}`}
                    >
                      {isRolling ? t.rolling : isAiThinking ? t.ai_thinking : <><Dice5 size={24} /> <span className="truncate">{activePlayerName}</span></>}
                    </button>
                  )}
                </div>

                {/* LOGS (Desktop Only - Mobile uses Overlay) */}
                <div className="hidden lg:flex flex-1 min-h-[200px] flex-col">
                    <GameLogs logs={logs} language={language} isDarkMode={isDarkMode} />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
