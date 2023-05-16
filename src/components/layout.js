import Header from './header'
import Footer from './footer'
import { Rubik } from 'next/font/google'

const rubik = Rubik({ subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <>
      <Header />
        <main className={rubik.className }>{children}</main>
      <Footer />
    </>
  )
}