import { useCallback, useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import HomeScreen from './components/HomeScreen';
import GameplayScreen from './components/GameplayScreen';
import ResultScreen from './components/ResultScreen';
import AuthGateModal from './components/AuthGateModal';
import LeaderboardModal from './components/LeaderboardModal';
import ShopModal from './components/ShopModal';
import AdminPanelModal from './components/AdminPanelModal';
import SettingsModal from './components/SettingsModal';
import { api } from './utils/api';
import { soundEngine } from './utils/sound';
import { setVibrationEnabled } from './utils/haptics';
import {
  clearGuestRecords,
  clearGuestSession,
  createGuestSession,
  getAuthToken,
  getCachedUser,
  getGuestRecords,
  getGuestSession,
  loadSettings,
  saveGuestScore,
  saveSettings,
  setAuthToken,
  setCachedUser,
} from './utils/storage';

// Centralized Application State Machine: LOADING -> HOME -> PLAYING -> RESULT
export default function App() {
  const [screen, setScreen] = useState('LOADING');
  const [activeMode, setActiveMode] = useState('dragMode'); // 'dragMode' | 'dropMode'
  const [runId, setRunId] = useState(1);

  // Auth & Profile State
  const [currentUser, setCurrentUser] = useState(() => getCachedUser());
  const [guestSession, setGuestSession] = useState(() => getGuestSession());
  const [guestRecords, setGuestRecords] = useState(() => getGuestRecords());

  // Persistent Universal Settings
  const [settings, setSettings] = useState(() => loadSettings());

  // Modals State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalConfig, setAuthModalConfig] = useState({
    allowClose: false,
    isUpgradingGuest: false,
    initialTab: 'register',
  });
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardMode, setLeaderboardMode] = useState('dragMode');
  const [showShop, setShowShop] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Result & Score Sync State
  const [lastResult, setLastResult] = useState(null);
  const [syncState, setSyncState] = useState({
    status: 'idle',
    weeklyRank: null,
    error: '',
  });

  const isGuest = !currentUser;

  // Apply Audio & Vibration Settings whenever updated
  useEffect(() => {
    soundEngine.setSfxEnabled(settings.sound);
    soundEngine.setBgmEnabled(settings.bgm);
    setVibrationEnabled(settings.vibration);
    saveSettings(settings);
  }, [settings]);

  // Unlock Web Audio on first user pointer/key gesture
  useEffect(() => {
    const unlockAudio = () => soundEngine.unlock();
    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  // Transition from LOADING -> HOME and evaluate First-Visit Device Gate
  const handleLoadingComplete = useCallback(async () => {
    const token = getAuthToken();
    const existingGuest = getGuestSession();

    if (token) {
      try {
        const res = await api.getMe();
        setCurrentUser(res.user);
        setCachedUser(res.user);
        setScreen('HOME');
        return;
      } catch (err) {
        if (err.status === 401) {
          setAuthToken(null);
          setCachedUser(null);
          setCurrentUser(null);
        } else {
          // Offline or backend waking up: keep cached user if available
          const cached = getCachedUser();
          if (cached) {
            setCurrentUser(cached);
            setScreen('HOME');
            return;
          }
        }
      }
    }

    if (existingGuest) {
      setGuestSession(existingGuest);
      setGuestRecords(getGuestRecords());
      setScreen('HOME');
      return;
    }

    // First-time device with neither auth_token nor guest_session -> show Device Gate
    setScreen('HOME');
    setAuthModalConfig({
      allowClose: false,
      isUpgradingGuest: false,
      initialTab: 'register',
    });
    setShowAuthModal(true);
  }, []);

  const handleAuthSuccess = useCallback((authPayload) => {
    setAuthToken(authPayload.token);
    setCurrentUser(authPayload.user);
    setCachedUser(authPayload.user);
    clearGuestSession();
    clearGuestRecords();
    setGuestSession(null);
    setGuestRecords(getGuestRecords());
    setShowAuthModal(false);
  }, []);

  const handlePlayAsGuest = useCallback(() => {
    const created = createGuestSession();
    setGuestSession(created);
    setGuestRecords(getGuestRecords());
    setCurrentUser(null);
    setAuthToken(null);
    setCachedUser(null);
    setShowAuthModal(false);
  }, []);

  const handleOpenRegisterFromGuest = useCallback(() => {
    setShowLeaderboard(false);
    setShowShop(false);
    setAuthModalConfig({
      allowClose: true,
      isUpgradingGuest: Boolean(guestSession),
      initialTab: 'register',
    });
    setShowAuthModal(true);
  }, [guestSession]);

  const handleLogout = useCallback(() => {
    setAuthToken(null);
    setCachedUser(null);
    setCurrentUser(null);
    const created = createGuestSession();
    setGuestSession(created);
    setGuestRecords(getGuestRecords());
    setScreen('HOME');
  }, []);

  const handleUserUpdated = useCallback((updatedUser) => {
    setCurrentUser(updatedUser);
    setCachedUser(updatedUser);
  }, []);

  const handleClaimRewards = useCallback(async () => {
    try {
      const res = await api.claimRewards();
      handleUserUpdated(res.user);
    } catch {
      // Ignore network hiccup
    }
  }, [handleUserUpdated]);

  const handleStartGame = useCallback((mode) => {
    setActiveMode(mode);
    setLastResult(null);
    setSyncState({ status: 'idle', weeklyRank: null, error: '' });
    setShowSettings(false);
    setRunId((id) => id + 1);
    setScreen('PLAYING');
  }, []);

  const submitScoreToBackend = useCallback(
    async (mode, stats) => {
      setSyncState({ status: 'syncing', weeklyRank: null, error: '' });
      try {
        const res = await api.submitScore({
          mode,
          score: stats.score,
          maxCombo: stats.maxCombo || 0,
          linesCleared: stats.linesCleared || 0,
        });
        handleUserUpdated(res.user);
        setSyncState({
          status: 'synced',
          weeklyRank: res.weeklyRank,
          error: '',
        });
      } catch (err) {
        setSyncState({
          status: 'error',
          weeklyRank: null,
          error: err.message || 'Không thể đồng bộ điểm lúc này.',
        });
      }
    },
    [handleUserUpdated]
  );

  const handleGameOver = useCallback(
    (stats) => {
      if (isGuest) {
        const { records, isNewRecord } = saveGuestScore(activeMode, stats);
        setGuestRecords(records);
        setLastResult({ ...stats, isNewRecord });
        setSyncState({ status: 'idle', weeklyRank: null, error: '' });
        setScreen('RESULT');
      } else {
        const prevBest = currentUser?.records?.[activeMode]?.allTimeHigh || 0;
        const isNewRecord = stats.score > prevBest;
        setLastResult({ ...stats, isNewRecord });
        setScreen('RESULT');
        submitScoreToBackend(activeMode, stats);
      }
    },
    [activeMode, currentUser, isGuest, submitScoreToBackend]
  );

  // Settings modal actions
  const handleSettingsGoHome = useCallback(() => {
    setShowSettings(false);
    setLastResult(null);
    setScreen('HOME');
  }, []);

  const handleSettingsReplay = useCallback(() => {
    setShowSettings(false);
    setLastResult(null);
    setSyncState({ status: 'idle', weeklyRank: null, error: '' });
    setRunId((id) => id + 1);
    setScreen('PLAYING');
  }, []);

  const handleSettingsSwitchMode = useCallback(() => {
    const nextMode = activeMode === 'dragMode' ? 'dropMode' : 'dragMode';
    handleStartGame(nextMode);
  }, [activeMode, handleStartGame]);

  const currentPersonalBest = isGuest
    ? guestRecords[activeMode]?.allTimeHigh || 0
    : currentUser?.records?.[activeMode]?.allTimeHigh || 0;

  const equippedBackground = isGuest
    ? 'BG_DEFAULT'
    : currentUser?.equippedBackground || 'BG_DEFAULT';

  const isGamePaused =
    screen !== 'PLAYING' ||
    showSettings ||
    showAuthModal ||
    showLeaderboard ||
    showShop ||
    showAdminPanel;

  return (
    <div className="min-h-dvh w-full bg-[#070913] text-slate-100">
      {screen === 'LOADING' && <LoadingScreen onComplete={handleLoadingComplete} />}

      {screen === 'HOME' && (
        <HomeScreen
          isGuest={isGuest}
          currentUser={currentUser}
          guestSession={guestSession}
          guestRecords={guestRecords}
          onStartGame={handleStartGame}
          onOpenLeaderboard={(m = 'dragMode') => {
            setLeaderboardMode(m);
            setShowLeaderboard(true);
          }}
          onOpenShop={() => setShowShop(true)}
          onOpenAdmin={() => setShowAdminPanel(true)}
          onOpenSettings={() => setShowSettings(true)}
          onOpenRegister={handleOpenRegisterFromGuest}
          onLogout={handleLogout}
          onClaimRewards={handleClaimRewards}
        />
      )}

      {(screen === 'PLAYING' || screen === 'RESULT') && (
        <GameplayScreen
          mode={activeMode}
          runId={runId}
          isPaused={isGamePaused}
          settings={settings}
          equippedBackground={equippedBackground}
          personalBest={currentPersonalBest}
          onOpenSettings={() => setShowSettings(true)}
          onGameOver={handleGameOver}
          resultOverlay={
            screen === 'RESULT' ? (
              <ResultScreen
                mode={activeMode}
                result={lastResult}
                isGuest={isGuest}
                syncState={syncState}
                onPlayAgain={handleSettingsReplay}
                onGoHome={handleSettingsGoHome}
                onOpenLeaderboard={() => {
                  setLeaderboardMode(activeMode);
                  setShowLeaderboard(true);
                }}
                onOpenRegister={handleOpenRegisterFromGuest}
                onRetrySync={() =>
                  lastResult && submitScoreToBackend(activeMode, lastResult)
                }
              />
            ) : null
          }
        />
      )}

      {/* First-Visit Device Gate / Account Upgrade Modal */}
      {showAuthModal && (
        <AuthGateModal
          allowClose={authModalConfig.allowClose}
          isUpgradingGuest={authModalConfig.isUpgradingGuest}
          initialTab={authModalConfig.initialTab}
          guestRecords={guestRecords}
          onAuthSuccess={handleAuthSuccess}
          onPlayAsGuest={!authModalConfig.isUpgradingGuest ? handlePlayAsGuest : undefined}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {/* Weekly Leaderboard Modal */}
      {showLeaderboard && (
        <LeaderboardModal
          initialMode={leaderboardMode}
          isGuest={isGuest}
          currentUser={currentUser}
          onOpenRegister={handleOpenRegisterFromGuest}
          onClose={() => setShowLeaderboard(false)}
        />
      )}

      {/* Background Shop Modal */}
      {showShop && (
        <ShopModal
          isGuest={isGuest}
          currentUser={currentUser}
          onUserUpdated={handleUserUpdated}
          onOpenRegister={handleOpenRegisterFromGuest}
          onClose={() => setShowShop(false)}
        />
      )}

      {/* Founder Admin Coin Buff Console (ADMIN role only) */}
      {showAdminPanel && !isGuest && currentUser?.role === 'ADMIN' && (
        <AdminPanelModal
          currentUser={currentUser}
          onUserUpdated={handleUserUpdated}
          onClose={() => setShowAdminPanel(false)}
        />
      )}

      {/* Universal 8-Row Settings Modal */}
      {showSettings && (
        <SettingsModal
          settings={settings}
          currentMode={activeMode}
          onUpdateSettings={setSettings}
          onGoHome={handleSettingsGoHome}
          onReplay={handleSettingsReplay}
          onSwitchMode={handleSettingsSwitchMode}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
