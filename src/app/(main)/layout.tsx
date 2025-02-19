import MainContent from '@/components/main-content'
import { ColorPreferencesProvider } from '@/provider/color-preferences'
import { QueryProvider } from '@/provider/query-provider'
import { ThemeProvider } from '@/provider/theme-provider'
import { WebSocketProvider } from '@/provider/web-socket'
import { FC, ReactNode } from 'react'

const Mainlayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>

      <WebSocketProvider>
        <ColorPreferencesProvider>
          <MainContent>
            <QueryProvider>

              {children}
            </QueryProvider>
          </MainContent>
        </ColorPreferencesProvider>
      </WebSocketProvider>

    </ThemeProvider>
  )
}

export default Mainlayout