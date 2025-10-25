/**
 * useSkeletonDelay
 *
 * Custom React hook to control the display timing of skeleton loaders during asynchronous loading states.
 *
 * This hook prevents flickering by introducing a delay before showing the skeleton and ensures
 * a minimum visible duration once the skeleton is displayed. It is useful for improving perceived
 * loading performance and user experience in UI components.
 *
 * @param {boolean} loading - Whether the content is currently loading.
 * @param {UseSkeletonDelayOptions} [options] - Optional configuration for delay and minimum visible time.
 * @param {number} [options.delayMs=150] - Delay in milliseconds before showing the skeleton.
 * @param {number} [options.minVisibleMs=300] - Minimum time in milliseconds the skeleton should remain visible.
 * @returns {boolean} Whether the skeleton should be shown.
 *
 * @example
 * const showSkeleton = useSkeletonDelay(loading, { delayMs: 200, minVisibleMs: 400 });
 * if (showSkeleton) return <Skeleton />;
 * return <ActualContent />;
 */
import {useEffect, useRef, useState} from 'react';
import type {UseSkeletonDelayOptions} from "../types/useSkeletonDelayOptions.ts";

export function useSkeletonDelay(loading: boolean, options: UseSkeletonDelayOptions = {}) {
    const {delayMs = 150, minVisibleMs = 300} = options;
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
        return () => {
        };
    }, [loading, delayMs, minVisibleMs, showSkeleton]);

    return showSkeleton;
}
