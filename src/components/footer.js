import styles from "@/styles/footer.module.css"

export default function Footer () {
  return (
    <footer className={styles.footer}>
      <ul className={styles.first_container}>
        
        <li className={styles.second_container}>
          Síguenos
          <ul className={styles.logos_container}>
            <li>logo instagram</li>
            <li>logo youtube</li>
            <li>logo twitter</li>
          </ul>
        </li>

        <li className={styles.second_container}>
          Escríbenos
          <ul>
            <li className={styles.email_container}>colectivocibermedia@gmail.com</li>
            <li>3222222</li>
          </ul>
        </li>

      </ul>
    </footer>
  )
}