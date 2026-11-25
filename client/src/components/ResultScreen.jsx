import { AlertCircle, Loader2, UserPlus } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import {
  HomeHexIcon,
  ReplayArcIcon,
  ShieldHexIcon,
  TrophyHexIcon,
} from './icons/NexusIcons';

export default function ResultScreen({
  mode,
  result,
  isGuest,
  syncState,
  onPlayAgain,
  onGoHome,
  onOpenLeaderboard,
  onOpenRegister,
  onRetrySync,
}) {
  if (!result) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-[#050812]/80 backdrop-blur-md">
      <div className="hud-drop w-full max-w-md animate-modal-in">
        <div className="hud-panel p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 bg-white/8 border border-white/15 text-slate-300">
              {mode === 'dragMode' ? 'Chiến Thuật 8×8' : 'Tốc Độ 10×20'}
            </span>
            {result.isNewRecord && (
              <span className="text-xs font-extrabold px-2.5 py-0.5 bg-amber-400 text-slate-950">
                Kỷ lục mới
              </span>
            )}
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight">KẾT THÚC</h2>

          <div className="hud-panel-sm mt-4 py-4 px-5 border border-cyan-400/30">
            <div className="text-xs text-slate-400">Điểm chung cuộc</div>
            <div className="font-mono font-extrabold text-4xl sm:text-5xl text-[#00f3ff] tabular-nums mt-1">
              {(result.score || 0).toLocaleString()}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            {mode === 'dragMode' ? (
              <>
                <div className="hud-panel-sm p-3">
                  <div className="text-xs text-slate-400">Chuỗi tối đa</div>
                  <div className="font-mono font-extrabold text-xl text-amber-300 tabular-nums mt-1">
                    x{result.maxCombo || 0}
                  </div>
                </div>
                <div className="hud-panel-sm p-3">
                  <div className="text-xs text-slate-400">Số hàng đã xóa</div>
                  <div className="font-mono font-extrabold text-xl text-cyan-300 tabular-nums mt-1">
                    {result.linesCleared || 0}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="hud-panel-sm p-3">
                  <div className="text-xs text-slate-400">Số hàng đã xóa</div>
                  <div className="font-mono font-extrabold text-xl text-cyan-300 tabular-nums mt-1">
                    {result.linesCleared || 0}
                  </div>
                </div>
                <div className="hud-panel-sm p-3">
                  <div className="text-xs text-slate-400">Cấp độ đạt được</div>
                  <div className="font-mono font-extrabold text-xl text-purple-300 tabular-nums mt-1">
                    Cấp {result.level || 1}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-4">
            {isGuest ? (
              <div className="hud-panel-sm p-3.5 border border-amber-400/40 text-left flex items-center justify-between gap-3">
                <div className="text-xs text-amber-100 leading-relaxed">
                  <strong className="text-amber-300">Tài khoản Khách:</strong> Điểm chỉ lưu cục bộ. Đăng ký để ghi danh BXH tuần và nhận Xu.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playButtonClick();
                    onOpenRegister();
                  }}
                  className="btn-arcade btn-arcade-amber px-3 py-2 text-xs font-extrabold inline-flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Đăng ký
                </button>
              </div>
            ) : syncState.status === 'syncing' ? (
              <div className="hud-panel-sm px-4 py-3 border border-cyan-400/30 flex items-center justify-center gap-2 text-xs text-cyan-200 font-medium">
                <Loader2 className="w-4 h-4 animate-spin text-[#00f3ff]" />
                Đang đồng bộ điểm lên Bảng Xếp Hạng tuần...
              </div>
            ) : syncState.status === 'synced' ? (
              <div className="hud-panel-sm px-4 py-3 border border-emerald-400/40 flex items-center justify-between gap-2 text-xs text-emerald-200">
                <div className="flex items-center gap-2 font-medium">
                  <ShieldHexIcon className="w-4 h-4 shrink-0" />
                  <span>
                    Đã lưu BXH · Hạng tuần:{' '}
                    <strong className="font-mono text-emerald-300 tabular-nums">
                      #{syncState.weeklyRank || '—'}
                    </strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playButtonClick();
                    onOpenLeaderboard();
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#00f3ff] hover:underline cursor-pointer shrink-0"
                >
                  <TrophyHexIcon className="w-4 h-4" />
                  Xem BXH
                </button>
              </div>
            ) : syncState.status === 'error' ? (
              <div className="hud-panel-sm px-4 py-3 border border-rose-400/40 flex items-center justify-between gap-2 text-xs text-rose-200">
                <div className="flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{syncState.error || 'Chưa đồng bộ được điểm.'}</span>
                </div>
                <button
                  type="button"
                  onClick={onRetrySync}
                  className="btn-arcade btn-arcade-slate px-3 py-1 text-xs font-bold cursor-pointer shrink-0"
                >
                  Thử lại
                </button>
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              type="button"
              onClick={() => {
                soundEngine.playButtonClick();
                onGoHome();
              }}
              className="btn-arcade btn-arcade-slate py-3 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <HomeHexIcon className="w-4 h-4" />
              Trang chủ
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playButtonClick();
                onPlayAgain();
              }}
              className="btn-arcade btn-arcade-cyan py-3 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <ReplayArcIcon className="w-4 h-4" />
              Chơi lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
