import { AuthContextProvider } from '@/context/AuthContext'
import { neueWorld, pierSans } from '@/fonts/fonts'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} className={`${neueWorld.variable} ${pierSans.variable}`}/>
    </AuthContextProvider>
  )
}
