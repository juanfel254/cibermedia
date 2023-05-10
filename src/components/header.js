import Link from "next/link";
import styles from "@/styles/header.module.css"

export default function Header () {
  return (
    <header className={styles.header}>
      <h3>Colectivo Cultural Cibermedia</h3>
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