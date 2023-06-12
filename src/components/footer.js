import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/footer.module.css";
import { Rubik } from 'next/font/google';

const rubik = Rubik({ subsets: ['latin'] });

export default function Footer () {
  return (
    <footer className={`${styles.footer} ${rubik.className}`}>
      <ul className={styles.first_container}>
        
        <li className={styles.second_container}>
          <h4>Síguenos</h4>
          <ul className={styles.logos_container}>
            <li>
              <a href="https://www.instagram.com/ccibermedia/" target="_blank">
                <Image 
                  src="/social/icono-instagram-morado.svg"
                  width={50}
                  height={50}
                  alt="Icono de instagram morado"
                />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/ccibermedia/" target="_blank">
                <Image 
                  src="/social/icono-youtube-morado.svg"
                  width={50}
                  height={50}
                  alt="Icono de youtube morado"
                />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/CCibermedia" target="_blank">
                <Image 
                  src="/social/icono-twitter-morado.svg"
                  width={50}
                  height={50}
                  alt="Icono de twitter morado"
                />
              </a>
            </li>
          </ul>
        </li>

        <li className={styles.second_container}>
        <h4>Escríbenos</h4>
          <ul>
            <li className={styles.email_container}>
              <Link href="/contacto" className="my-link">colectivocibermedia@gmail.com</Link>
            </li>
            <li>3222222</li>
          </ul>
        </li>
      </ul>
    </footer>
  )
}