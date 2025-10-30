import { useEffect, RefObject } from 'react';

/**
 * useClickOutside - Detect clicks outside a referenced element
 *
 * Commonly used for dismissing dropdowns, popovers, modals, and floating panels
 * when user clicks anywhere outside the component.
 *
 * @param ref - React ref to the element to monitor
 * @param handler - Callback function to execute on outside click
 * @param enabled - Optional flag to enable/disable the listener (default: true)
 *
 * @example
 * const panelRef = useRef<HTMLDivElement>(null);
 * useClickOutside(panelRef, () => setIsOpen(false));
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, enabled]);
}
