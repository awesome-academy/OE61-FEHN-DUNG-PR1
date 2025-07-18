'use client'

import React from 'react'
import { ThemeProvider } from '@/providers/ThemeProvider'
import ReduxProvider from '@/providers/ReduxProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </ReduxProvider>
    )
}
