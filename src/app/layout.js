import './globals.css'
import { Josefin_Sans } from "next/font/google";

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata = {
  title: 'Smart Road - Port Harcourt',
  description: 'Traffic information app for Port Harcourt road users',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefinSans.className} bg-gray-50`}>{children}</body>
    </html>
  )
}