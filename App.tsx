import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Dice5, Settings, Maximize, Minimize, Moon, Sun, ArrowRight, HelpCircle } from 'lucide-react';
import { useGame } from './gamelogic/useGame';
import { MainMenu } from './components/MainMenu';
import { PlayerCard } from './components/PlayerCard';
import { TrackMap } from './components/TrackMap';
import { GameLogs } from './components/GameLogs';
import { SettingsModal } from './components/SettingsModal';
import { HelpModal } from './components/HelpModal';
import { EventModal } from './components/EventModal'; 
import { Language } from './types/index';
import { TRANSLATIONS } from './config/i18n/translations';

export default function App() {
  const [language, setLanguage] = useState<Language>('it');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
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
  const activePlayerName = turn === 1 ? p1.name : p2.name;
  const isManualTurn = manualDiceEnabled && (turn === 1 ? !p1.isAi : !p2.isAi);

  return (
    <div className={`w-full transition-colors duration-300 bg-graph-paper flex flex-col h-auto min-h-screen lg:h-screen lg:overflow-hidden font-sans`}>
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

      <header className="flex-none p-2 lg:p-4 lg:pb-4 z-10">
        <div className={`w-full max-w-[1920px] mx-auto flex flex-wrap justify-between items-center border-2 p-2 lg:p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-600 text-white shadow-black' : 'bg-white border-slate-800 text-slate-900'}`}>
          <div className="flex items-center gap-4">
            <div>
              <h1 className="font-display text-lg md:text-2xl lg:text-3xl uppercase font-black tracking-normal flex items-center gap-2">
                <span className="text-red-600">F1 PAPER</span> CIRCUIT
              </h1>
              {gameMode && <div className="flex flex-row gap-2 sm:gap-4 mt-0.5 lg:mt-1"><p className={`text-[10px] md:text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{gameMode === 'PVP' ? t.start_pvp : t.start_ai}</p><p className={`text-[10px] md:text-xs font-bold text-blue-500`}>GP: {activeMap.name}</p></div>}
            </div>
          </div>
          <div className="flex items-center gap-1.5 lg:gap-2">
            <button onClick={() => setIsHelpOpen(true)} className={`p-1.5 lg:p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-blue-400' : 'hover:bg-blue-50 text-blue-600'}`} title="Help"><HelpCircle size={18} className="lg:w-6 lg:h-6" /></button>
            <button onClick={toggleTheme} className={`p-1.5 lg:p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-yellow-400' : 'hover:bg-slate-100 text-slate-600'}`} title="Toggle Theme">{isDarkMode ? <Sun size={18} className="lg:w-5 lg:h-5" /> : <Moon size={18} className="lg:w-5 lg:h-5" />}</button>
            <button onClick={toggleFullScreen} className={`p-1.5 lg:p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`} title="Toggle Full Screen">
              {isFullScreen ? <Minimize size={18} className="lg:w-5 lg:h-5" /> : <Maximize size={18} className="lg:w-5 lg:h-5" />}
            </button>
            <button onClick={() => setIsSettingsOpen(true)} className={`p-1.5 lg:p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`} title="Settings"><Settings size={18} className="lg:w-5 lg:h-5" /></button>
            {gameMode && <button onClick={() => resetGame()} className={`flex items-center gap-2 px-2 py-1.5 lg:px-4 lg:py-2 font-bold rounded-lg transition-colors ml-1 lg:ml-2 ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}><RotateCcw size={16} className="lg:w-[18px]" /><span className="hidden sm:inline text-sm">{t.reset}</span></button>}
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:overflow-hidden p-2 lg:p-4 pt-0">
        <div className="w-full max-w-[1920px] mx-auto h-full flex flex-col lg:flex-row gap-3 lg:gap-6">
          {!gameMode ? (<div className="flex-1 flex items-center justify-center"><MainMenu onStart={startGame} language={language} isDarkMode={isDarkMode} /></div>) : (
            <><div className={`flex-1 relative flex flex-col border-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] overflow-hidden transition-colors duration-300 min-h-[45vh] lg:min-h-0 ${isDarkMode ? 'border-slate-600 shadow-black' : 'border-slate-800'}`}>
                <div className="flex-1 w-full h-full p-2 lg:p-6"><TrackMap p1={p1} p2={p2} winner={winner} isDarkMode={isDarkMode} language={language} map={activeMap} /></div>
                {winner && (<div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300 p-4"><div className={`border-4 p-6 lg:p-8 rounded-2xl text-center shadow-2xl transform scale-100 lg:scale-110 max-w-lg w-full ${isDarkMode ? 'bg-slate-800 border-yellow-500' : 'bg-white border-yellow-400'}`}><Trophy size={48} className="mx-auto text-yellow-500 mb-4 animate-bounce" /><h2 className={`text-2xl lg:text-4xl font-display uppercase font-black tracking-normal mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.winner}</h2><p className={`text-lg lg:text-2xl font-bold mb-6 font-display uppercase ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{winner === 1 ? p1.name : p2.name} {t.wins}</p><div className="flex flex-col gap-3"><button onClick={() => goToNextMap()} className="w-full flex items-center justify-center gap-2 px-6 py-3 lg:py-4 bg-green-600 hover:bg-green-700 text-white font-bold font-display uppercase text-lg rounded-lg shadow-lg"><span>{t.next_race}</span><ArrowRight size={20} /></button><button onClick={() => resetGame()} className={`w-full px-6 py-3 font-bold rounded-lg transition-colors ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-200' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}>{t.play_again}</button></div></div></div>)}
              </div>
              <div className="lg:w-[380px] xl:w-[420px] flex flex-col gap-3 lg:gap-4 lg:h-full lg:overflow-y-auto pr-1 pb-1">
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-4 shrink-0">
                  <PlayerCard player={p1} isActive={turn === 1} isWinner={winner === 1} language={language} isDarkMode={isDarkMode} onNameChange={(name) => updatePlayerName(1, name)} onColorChange={(idx) => updatePlayerColor(1, idx)} totalLaps={totalLaps} />
                  <PlayerCard player={p2} isActive={turn === 2} isWinner={winner === 2} language={language} isDarkMode={isDarkMode} onNameChange={(name) => updatePlayerName(2, name)} onColorChange={(idx) => updatePlayerColor(2, idx)} totalLaps={totalLaps} />
                </div>
                <div className={`shrink-0 border-2 p-3 lg:p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-600 shadow-black' : 'bg-white border-slate-800'}`}>
                  {winner ? (<div className={`text-center font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.race_finished}</div>) : (
                    <button onClick={performRoll} disabled={isRolling || isAiThinking || (turn === 1 ? p1.skipTurn : p2.skipTurn)} className={`w-full py-3 lg:py-6 rounded-xl font-display text-lg uppercase tracking-wider shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 ${isRolling || isAiThinking ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed border-2' : 'bg-green-600 hover:bg-green-500 text-white border-2 border-green-800 shadow-[0_4px_0_rgb(22,101,52)]'}`}>
                      {isRolling ? t.rolling : isAiThinking ? t.ai_thinking : <><Dice5 size={24} /> {activePlayerName}: {isManualTurn ? t.enter_dice : t.roll_dice}</>}
                    </button>
                  )}
                </div>
                <div className="shrink-0 lg:flex-1 lg:min-h-[200px] flex flex-col"><GameLogs logs={logs} language={language} isDarkMode={isDarkMode} /></div>
              </div></>
          )}
        </div>
      </main>
    </div>
  );
}