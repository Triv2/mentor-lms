// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import { Toaster } from 'react-hot-toast'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Toaster/>
      {children}
    </NextUIProvider>
  )
}