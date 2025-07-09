import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MapChart - Create Custom Maps",
  description:
    "Create beautiful, custom maps with our easy-to-use map editor. Color countries, states, and regions to visualize your data.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
