import { neueWorld, pierSans } from '@/fonts/fonts'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className={`${neueWorld.variable} ${pierSans.variable}`}>
      <Head />
      <body className={`${neueWorld.variable} ${pierSans.variable}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
