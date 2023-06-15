import Header from './header';
import Footer from './footer';
import { Rubik } from 'next/font/google';
import { useState } from 'react';
const rubik = Rubik({ subsets: ['latin'] });

export default function Layout({ children }) {

/*   const [winSize, setWinSize] = useState('estrellas-horizontal');
  if (window.innerWidth < 600){ // change default zoom for mobile screen
    setWinSize('estrellas-vertical')
  } 
 */
  return (
    <>
      <Header />
        <video className='background-video' autoPlay muted loop id="myVideo">
          <source  src={`/backgrounds/estrellas-horizontal.mp4`} type='video/mp4'/>
          Tu navegador no tiene soporte para video HTML5
        </video>
        <main className={rubik.className}>{children}</main>
      <Footer />
    </>
  )
}