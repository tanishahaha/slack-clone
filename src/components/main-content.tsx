"use client"
import { cn } from '@/lib/utils';
import { usecolorPreferences } from '@/provider/color-preferences';
import { useTheme } from 'next-themes'
import React, { FC, ReactNode } from 'react'

const MainContent: FC<{ children: ReactNode }> = ({ children }) => {

    const { theme } = useTheme();
    const { color } = usecolorPreferences();

    let backgroundColor = 'bg-primary-dark';
    if (color === 'green') {
        backgroundColor = 'bg-[#245501]';
    } else if (color === 'blue') {
        backgroundColor = 'bg-[#023047]'
    }


    return (
        <div className={cn('md:px-2 md:pb-2 md:h-screen md:pt-14', backgroundColor)}>
            <main className={cn('md:ml-[280px] lg:ml-[420px] md:h-full overflow-y-hidden', theme === 'dark' ? 'bg-[#232529]' : 'bg-white')}>
                {children}
            </main>
        </div>
    )
}

export default MainContent