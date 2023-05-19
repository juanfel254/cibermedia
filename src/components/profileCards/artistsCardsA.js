import styles from "@/styles/profileCards/artistCardA.module.css"

export default function ArtistsCardsA() {
  return (
    <ul className={styles.cards_container}>
      <li className={styles.card_container}>
        <p className={styles.picture_container}>Foto</p>
        <ul>
          <li><h3 className={`font-family-compress ${styles.artist_name}`}>Nombre del artista</h3></li>
          <li><p className={styles.artist_description}>Sinopsis del artista</p></li>
        </ul>
      </li>
      <li className={styles.card_container}>
        <p className={styles.picture_container}>Foto</p>
        <ul>
          <li><h3 className={`font-family-compress ${styles.artist_name}`}>Nombre del artista</h3></li>
          <li><p className={styles.artist_description}>Sinopsis del artista</p></li>
        </ul>
      </li>
      <li className={styles.card_container}>
        <p className={styles.picture_container}>Foto</p>
        <ul>
          <li><h3 className={`font-family-compress ${styles.artist_name}`}>Nombre del artista</h3></li>
          <li><p className={styles.artist_description}>Sinopsis del artista</p></li>
        </ul>
      </li>
      <li className={styles.card_container}>
        <p className={styles.picture_container}>Foto</p>
        <ul>
          <li><h3 className={`font-family-compress ${styles.artist_name}`}>Nombre del artista</h3></li>
          <li><p className={styles.artist_description}>Sinopsis del artista</p></li>
        </ul>
      </li>
      <li className={styles.card_container}>
        <p className={styles.picture_container}>Foto</p>
        <ul>
          <li><h3 className={`font-family-compress ${styles.artist_name}`}>Nombre del artista</h3></li>
          <li><p className={styles.artist_description}>Sinopsis del artista</p></li>
        </ul>
      </li>
      <li className={styles.card_container}>
        <p className={styles.picture_container}>Foto</p>
        <ul>
          <li><h3 className={`font-family-compress ${styles.artist_name}`}>Nombre del artista</h3></li>
          <li><p className={styles.artist_description}>Sinopsis del artista</p></li>
        </ul>
      </li>
    </ul>
  )
}