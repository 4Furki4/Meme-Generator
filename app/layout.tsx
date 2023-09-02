import { ThemeProvider } from "@/components/theme-provider";
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from "./Components/Navbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Meme Generator',
  description: 'Meme Generator where you can generate memes and share them with your friends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen"}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
