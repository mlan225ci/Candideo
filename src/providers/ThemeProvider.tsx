'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

/**
 * Wraps `next-themes` ThemeProvider with default configuration
 * so components like `ThemeToggle` can switch between light and
 * dark modes by toggling a `class` on the `<html>` element.
 */
const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    {...props}
  >
    {children}
  </NextThemesProvider>
)

export default ThemeProvider
