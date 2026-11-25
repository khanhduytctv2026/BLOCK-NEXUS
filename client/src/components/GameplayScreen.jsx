import { useCallback, useState } from 'react';
import StrategistEngine from '../engines/StrategistEngine';
import VelocityEngine from '../engines/VelocityEngine';
import { getBackgroundById } from '../data/backgrounds';
import { soundEngine } from '../utils/sound';
import GameBackdrop from './GameBackdrop';
import { PauseBarsIcon } from './icons/NexusIcons';

export default function GameplayScreen({
  mode,
  runId,
  isPaused,
  settings,
  equippedBackground,
  personalBest,
  onOpenSettings,
  onGameOver,
  resultOverlay,
}) {
  const [hud, setHud] = useState({
    score: 0,
    combo: 0,
    maxCombo: 0,
    linesCleared: 0,
    level: 1,
  });

  const theme = getBackgroundById(equippedBackground);
  const displayedBest = Math.max(personalBest || 0, hud.score);

  const handleHudUpdate = useCallback((nextHud) => {
    setHud((prev) => ({ ...prev, ...nextHud }));
  }, []);

  return (
    <div className="h-dvh w-full flex flex-col overflow-hidden relative animate-screen-in">
      {/* Multi-Layer Illustrated Scenery Backdrop + Readability Vignette */}
      <GameBackdrop bgId={theme.id} isPreview={false} />
      <div className="hud-cockpit-overlay" />

      {/* Thanh điểm trên cùng */}
      <header className="w-full max-w-2xl mx-auto px-3 pt-2.5 pb-1.5 shrink-0 z-10">
        <div className="hud-drop">
          <div className="hud-panel px-3 py-2 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                soundEngine.unlock();
                soundEngine.playButtonClick();
                onOpenSettings();
              }}
              className="btn-arcade btn-arcade-slate w-10 h-10 flex items-center justify-center shrink-0 cursor-pointer"
              title="Tạm dừng & Cài đặt"
              aria-label="Tạm dừng & Cài đặt"
            >
              <PauseBarsIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 sm:gap-5">
              <div className="text-center">
                <div className="text-[10px] font-semibold text-cyan-300/80">Điểm</div>
                <div className="font-mono font-extrabold text-xl sm:text-2xl text-white leading-tight tabular-nums">
                  {hud.score.toLocaleString()}
                </div>
              </div>

              <div className="h-7 w-[1px] bg-cyan-400/20" />

              <div className="text-center">
                <div className="text-[10px] font-semibold text-amber-300/85">Kỷ lục</div>
                <div className="font-mono font-bold text-base sm:text-lg text-amber-300 leading-tight tabular-nums">
                  {displayedBest.toLocaleString()}
                </div>
              </div>
            </div>

            {mode === 'dragMode' ? (
              <div className="hud-panel-sm px-3 py-1.5 border border-amber-400/35 text-right shrink-0">
                <div className="text-[10px] text-slate-400 leading-none">Chuỗi</div>
                <div
                  className={`font-mono font-extrabold text-sm leading-tight tabular-nums mt-0.5 ${
                    hud.combo > 1 ? 'text-amber-300' : 'text-slate-200'
                  }`}
                >
                  x{Math.max(1, hud.combo)}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="hud-panel-sm px-2.5 py-1 border border-purple-400/35 text-center">
                  <div className="text-[10px] text-purple-300 leading-none">Cấp</div>
                  <div className="font-mono font-extrabold text-sm text-white leading-tight tabular-nums mt-0.5">
                    {hud.level}
                  </div>
                </div>
                <div className="hud-panel-sm px-2.5 py-1 border border-cyan-400/35 text-center">
                  <div className="text-[10px] text-cyan-300 leading-none">Hàng</div>
                  <div className="font-mono font-extrabold text-sm text-white leading-tight tabular-nums mt-0.5">
                    {hud.linesCleared}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col min-h-0 relative z-10">
        {mode === 'dragMode' ? (
          <StrategistEngine
            key={`drag_${runId}`}
            isPaused={isPaused}
            settings={settings}
            theme={theme}
            onHudUpdate={handleHudUpdate}
            onGameOver={onGameOver}
          />
        ) : (
          <VelocityEngine
            key={`drop_${runId}`}
            isPaused={isPaused}
            settings={settings}
            theme={theme}
            onHudUpdate={handleHudUpdate}
            onGameOver={onGameOver}
          />
        )}
      </main>

      {resultOverlay}
    </div>
  );
}
