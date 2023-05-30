import styles from "@/styles/profileCards/artistCardB.module.css"

export default function ArtistsCardsB() {
  return (
    <ul className={styles.cards_container}>
      <li className={styles.card_container}>
        <p className={styles.picture_container}>Foto</p>
        <ul>
          <li><h3 className={`font-family-compress ${styles.artist_name}`}>Nombre</h3></li>
          <li><p className={styles.artist_description}>Sinopsis</p></li>
        </ul>
      </li>
      <li className={styles.card_container}>
        <p className={styles.picture_container}>Foto</p>
        <ul>
          <li><h3 className={`font-family-compress ${styles.artist_name}`}>Nombre</h3></li>
          <li><p className={styles.artist_description}>Sinopsis</p></li>
        </ul>
      </li>
      <li className={styles.card_container}>
        <p className={styles.picture_container}>Foto</p>
        <ul>
          <li><h3 className={`font-family-compress ${styles.artist_name}`}>Nombre</h3></li>
          <li><p className={styles.artist_description}>Sinopsis</p></li>
        </ul>
      </li>
      <li className={styles.card_container}>
        <p className={styles.picture_container}>Foto</p>
        <ul>
          <li><h3 className={`font-family-compress ${styles.artist_name}`}>Nombre</h3></li>
          <li><p className={styles.artist_description}>Sinopsis</p></li>
        </ul>
      </li>
      <li className={styles.card_container}>
        <p className={styles.picture_container}>Foto</p>
        <ul>
          <li><h3 className={`font-family-compress ${styles.artist_name}`}>Nombre</h3></li>
          <li><p className={styles.artist_description}>Sinopsis</p></li>
        </ul>
      </li>
      <li className={styles.card_container}>
        <p className={styles.picture_container}>Foto</p>
        <ul>
          <li><h3 className={`font-family-compress ${styles.artist_name}`}>Nombre</h3></li>
          <li><p className={styles.artist_description}>Sinopsis</p></li>
        </ul>
      </li>
    </ul>
  )
}