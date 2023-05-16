import Link from "next/link";
import styles from "@/styles/header.module.css"
import { Rubik } from 'next/font/google'

const rubik = Rubik({ subsets: ['latin'] });

export default function Header () {
  return (
    <header className={`${styles.header} ${rubik.className}`}>
      <Link href="/" className={`my-link ${styles.home_logo}`}>
        <h3>Colectivo Cultural Cibermedia</h3>
      </Link>
      <ul>
        <li>
          <Link href="/" className="my-link">Mapa</Link>
        </li>
        <li>
          <Link href="/artistas" className="my-link">Artistas</Link>
        </li>
        <li>
          <Link href="/nosotros" className="my-link">Nosotros</Link>
        </li>
        <li>
          <Link href="/contacto" className="my-link">Contacto</Link>
        </li>
      </ul>
    </header>
  );
}