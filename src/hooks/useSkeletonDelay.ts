import {useEffect, useRef, useState} from 'react';

/**
 * Evita el parpadeo (flash) de skeletons cuando las cargas son muy rápidas.
 * Estrategia:
 *  - No muestra skeleton hasta que hayan pasado `delayMs` y la carga siga activa.
 *  - Si el skeleton llegó a mostrarse, lo mantiene visible al menos `minVisibleMs`.
 */
export interface UseSkeletonDelayOptions {
  /** Tiempo que debe permanecer la carga antes de que se permita mostrar el skeleton */
  delayMs?: number; // default 150
  /** Duración mínima que permanecerá visible una vez mostrado */
  minVisibleMs?: number; // default 300
}

export function useSkeletonDelay(loading: boolean, options: UseSkeletonDelayOptions = {}) {
  const { delayMs = 150, minVisibleMs = 300 } = options;
  const [showSkeleton, setShowSkeleton] = useState(false);

  const delayTimerRef = useRef<number | null>(null);
  const minVisibleTimerRef = useRef<number | null>(null);
  const skeletonShownAtRef = useRef<number | null>(null);

  useEffect(() => {
    // Cuando empieza una carga
    if (loading) {
      // Limpiar por si acaso
      if (delayTimerRef.current) window.clearTimeout(delayTimerRef.current);
      if (minVisibleTimerRef.current) window.clearTimeout(minVisibleTimerRef.current);

      // Programar mostrar skeleton solo si sigue cargando tras delayMs
      delayTimerRef.current = window.setTimeout(() => {
        if (loading) {
          setShowSkeleton(true);
          skeletonShownAtRef.current = Date.now();
        }
      }, delayMs);
      return () => {
        if (delayTimerRef.current) window.clearTimeout(delayTimerRef.current);
      };
    }

    // Cuando finaliza la carga
    if (!loading) {
      // Cancelar delay pendiente si skeleton aún no salió
      if (!showSkeleton && delayTimerRef.current) {
        window.clearTimeout(delayTimerRef.current);
        delayTimerRef.current = null;
      }
      // Si skeleton visible, asegurar permanencia mínima
      if (showSkeleton && skeletonShownAtRef.current) {
        const elapsed = Date.now() - skeletonShownAtRef.current;
        if (elapsed < minVisibleMs) {
          const remaining = minVisibleMs - elapsed;
          minVisibleTimerRef.current = window.setTimeout(() => {
            setShowSkeleton(false);
            skeletonShownAtRef.current = null;
          }, remaining);
          return () => {
            if (minVisibleTimerRef.current) window.clearTimeout(minVisibleTimerRef.current);
          };
        } else {
          setShowSkeleton(false);
          skeletonShownAtRef.current = null;
        }
      } else {
        // No llegó a mostrarse, asegurar estado oculto
        setShowSkeleton(false);
      }
    }
    return () => {};
  }, [loading, delayMs, minVisibleMs, showSkeleton]);

  return showSkeleton;
}

