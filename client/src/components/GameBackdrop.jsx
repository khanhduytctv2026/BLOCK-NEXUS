import { useId } from 'react';
import { getBackgroundById } from '../data/backgrounds';
import { renderScenePartA } from './backdrops/scenesA';
import { renderScenePartB } from './backdrops/scenesB';

/**
 * Reusable 3-Layer Illustrated Game Backdrop
 * - Layer 1: Deep atmospheric multi-stop CSS lighting
 * - Layer 2: Bespoke multi-layered SVG scenery unique to each of the 25 backgrounds
 * - Layer 3: Gameplay readability vignette (when isPreview={false}) so blocks stay 100% crisp
 */
export default function GameBackdrop({ bgId = 'BG_DEFAULT', isPreview = false, className = '' }) {
  const uid = useId().replace(/:/g, '');
  const theme = getBackgroundById(bgId);
  const artwork = renderScenePartA(theme.id, uid) || renderScenePartB(theme.id, uid);

  return (
    <div
      className={`pointer-events-none overflow-hidden select-none ${
        isPreview ? 'absolute inset-0' : 'fixed inset-0 z-0'
      } ${theme.styleClass} ${className}`}
      aria-hidden="true"
    >
      {/* Layer 2: Bespoke Illustrated SVG Scenery */}
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
      >
        {artwork}
      </svg>

      {/* Layer 3: Gameplay Readability Shield */}
      {!isPreview && (
        <>
          <div className="absolute inset-0 bg-black/35" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(4, 7, 17, 0.42) 0%, rgba(4, 7, 17, 0.12) 55%, rgba(4, 7, 17, 0.48) 100%)',
            }}
          />
        </>
      )}
    </div>
  );
}
