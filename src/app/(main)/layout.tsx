import MainContent from '@/components/main-content'
import { ColorPreferencesProvider } from '@/provider/color-preferences'
import { ThemeProvider } from '@/provider/theme-provider'
import React, { FC, ReactNode } from 'react'

const Mainlayout:FC<{children: ReactNode}> = ({children}) => {
  return (
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange>
        <ColorPreferencesProvider>
        <MainContent>

        {children}
        </MainContent>
        </ColorPreferencesProvider>
        
        </ThemeProvider>
  )
}

export default Mainlayout