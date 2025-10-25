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