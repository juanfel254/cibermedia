import styles from "@/styles/footer.module.css"
import { Rubik } from 'next/font/google'

const rubik = Rubik({ subsets: ['latin'] });

export default function Footer () {
  return (
    <footer className={`${styles.footer} ${rubik.className}`}>
      <ul className={styles.first_container}>
        
        <li className={styles.second_container}>
          <h4>Síguenos</h4>
          <ul className={styles.logos_container}>
            <li>logo instagram</li>
            <li>logo youtube</li>
            <li>logo twitter</li>
          </ul>
        </li>

        <li className={styles.second_container}>
        <h4>Escríbenos</h4>
          <ul>
            <li className={styles.email_container}>colectivocibermedia@gmail.com</li>
            <li>3222222</li>
          </ul>
        </li>

      </ul>
    </footer>
  )
}