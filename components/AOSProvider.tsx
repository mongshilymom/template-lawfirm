'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function AOSProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({ once: true, duration: 600, easing: 'ease-out-quad' })
  }, [])
  return <>{children}</>
}
