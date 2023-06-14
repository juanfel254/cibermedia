import Link from "next/link";
import styles from "@/styles/profileCards/artistCardA.module.css"

export default function ArtistsCardsA() {
  const artists = ["artista1", "artista2", "artista3", "artista4", "artista5", "artista6"];

  return (
    <ul className={styles.cards_container}>
      {artists.map((artist, index) => (
          <li key={artist} className={styles.card_container}>
              <p className={styles.picture_container}>Foto</p>
            <ul>
              <li>
                <Link href={`/group-portfolio`} className={styles.card_link} key={artist}>
                  <h3 className={`font-family-compress ${styles.artist_name}`}>{artist}</h3>
                </Link>
              </li>
              <li><p className={styles.artist_description}>{`Sinopsis de ${artist}`}</p></li>
            </ul>
          </li>
        ))}
    </ul>
  )
}