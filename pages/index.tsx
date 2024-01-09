import Image from 'next/image'
import { Inter } from 'next/font/google'
import DataUi from './components/dataUi'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col ${inter.className}`}>
  <div className="z-10 w-full h-screen flex flex-col items-center justify-between font-mono text-sm lg:flex">
    <DataUi />
  </div>
</main>

  )
}
