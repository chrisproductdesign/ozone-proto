/**
 * View Transitions API Helper
 *
 * Provides a consistent way to use the View Transitions API with graceful fallback
 * for browsers that don't support it yet.
 *
 * Browser Support:
 * - Chrome/Edge 111+: ✅ Full support
 * - Safari: 🟡 Coming soon
 * - Firefox: 🟡 In development
 * - Fallback: Instant transition (no animation)
 */

/**
 * Execute a DOM update with view transition animation
 *
 * @param updateCallback - Function that updates the DOM
 * @param onComplete - Optional callback after transition completes
 * @returns Promise that resolves when transition finishes
 *
 * @example
 * ```typescript
 * transitionTo(() => {
 *   navigateTo('dashboard');
 * });
 * ```
 */
export function transitionTo(
  updateCallback: () => void,
  onComplete?: () => void
): Promise<void> {
  // Feature detection
  if (!('startViewTransition' in document)) {
    // Fallback: execute immediately without animation
    updateCallback();
    onComplete?.();
    return Promise.resolve();
  }

  // Use View Transitions API
  const transition = (document as any).startViewTransition(() => {
    updateCallback();
  });

  // Return promise that resolves when transition finishes
  return transition.finished.then(() => {
    onComplete?.();
  });
}

/**
 * Check if View Transitions API is supported in current browser
 *
 * @returns true if supported, false otherwise
 */
export function isViewTransitionSupported(): boolean {
  return 'startViewTransition' in document;
}
