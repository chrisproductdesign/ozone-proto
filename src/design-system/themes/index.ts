/**
 * Theme Exports
 * Central export for all theme configurations
 */

export { lightTheme } from './light';
export { darkTheme } from './dark';

export type { LightTheme } from './light';
export type { DarkTheme } from './dark';

// Union type for all themes
import { type darkTheme } from './dark';
import { lightTheme } from './light';

export type Theme = typeof lightTheme | typeof darkTheme;

// Theme names
export type ThemeName = 'light' | 'dark';

// Default theme
export const defaultTheme = lightTheme;