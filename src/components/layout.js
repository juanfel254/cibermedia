import Header from './header';
import Footer from './footer';
import { Rubik } from 'next/font/google';
import { useEffect, useState } from 'react';
const rubik = Rubik({ subsets: ['latin'] });

export default function Layout({ children }) {

  const [width, setWidth] = useState(0)
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [width]);

  return (
    <>
      <Header />
        <video className='background-video' autoPlay muted loop id="myVideo">
          <source  src={`/backgrounds/${width>640 ? "estrellas-vertical" : "estrellas-horizontal"}.mp4`} type='video/mp4'/>
          Tu navegador no tiene soporte para video HTML5
        </video>
        <main className={rubik.className}>{children}</main>
      <Footer />
    </>
  )
}