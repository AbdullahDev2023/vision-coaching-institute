/**
 * haptic — lightweight navigator.vibrate wrapper.
 *
 * ─ Android Chrome: fires device vibration motor on CTA taps.
 * ─ iOS Safari: vibrate API not supported — silently no-ops.
 * ─ Desktop: silently no-ops.
 * ─ SSR: guarded by typeof navigator check.
 *
 * @param pattern  ms duration OR [vibrate, pause, vibrate, …] array
 */
export function haptic(pattern: number | readonly number[] | number[] = 8): void {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      (navigator.vibrate as (p: number | number[]) => boolean)(
        Array.isArray(pattern) ? (pattern as number[]) : (pattern as number)
      );
    } catch { /* ignore */ }
  }
}

/** Pre-baked patterns for common interactions */
export const HapticPattern = {
  tap:     8,          // single short tap — nav link, accordion open
  confirm: [10, 40, 10], // double pulse — form submit, WhatsApp open
  call:    15,         // slightly longer — phone call initiation
  error:   [20, 30, 20, 30, 20], // rapid stutters — form validation fail
} as const;
