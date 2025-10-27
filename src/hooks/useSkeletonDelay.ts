/**
 * useSkeletonDelay
 *
 * Hook personalizado de React para controlar el tiempo de visualizacion de cargadores skeleton durante estados de carga asincrona.
 *
 * Este hook previene parpadeos al introducir un retraso antes de mostrar el skeleton y asegura
 * una duracion visible minima una vez que el skeleton se muestra. Es util para mejorar la percepcion
 * de rendimiento de carga y experiencia de usuario en componentes de UI.
 *
 * @param {boolean} loading - Si el contenido esta actualmente cargando.
 * @param {UseSkeletonDelayOptions} [options] - Configuracion opcional para retraso y tiempo minimo visible.
 * @param {number} [options.delayMs=150] - Retraso en milisegundos antes de mostrar el skeleton.
 * @param {number} [options.minVisibleMs=300] - Tiempo minimo en milisegundos que el skeleton debe permanecer visible.
 * @returns {boolean} Si el skeleton debe mostrarse.
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
            // Cancelar delay pendiente si skeleton aun no salio
            if (!showSkeleton && delayTimerRef.current) {
                window.clearTimeout(delayTimerRef.current);
                delayTimerRef.current = null;
            }
            // Si skeleton visible, asegurar permanencia minima
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
                // No llego a mostrarse, asegurar estado oculto
                setShowSkeleton(false);
            }
        }
        return () => {
        };
    }, [loading, delayMs, minVisibleMs, showSkeleton]);

    return showSkeleton;
}
