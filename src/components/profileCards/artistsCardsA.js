import Link from "next/link";
import styles from "@/styles/profileCards/artistCardA.module.css"
import Image from "next/image";

export default function ArtistsCardsA({ artistas }) {
  
  function limit (string = '', limit = 0) {  
    return string.substring(0, limit)
  }

  return (
    <ul className={styles.cards_container}>
      {artistas.length !== 0 ? artistas.map((artista, index) => (
        <li key={index} className={styles.card_container}>      
          <Image 
            width={250}
            height={250}  
            src={artista.ACF.galeria_fotos.foto_1}
            alt="Foto de artista"
            className={styles.picture_container}
          />
          <ul>
            <li>
              <Link href={`/artistas/${artista.slug}`} className={styles.card_link} key={artista.id}>
                <h3 className={`font-family-compress ${styles.artist_name}`}>{artista.nombre_artista}</h3>
              </Link>
            </li>
            <li>
              <p className={styles.artist_description}>
                {limit(artista.descripcion_artista , "120") + "..."}
              </p>
            </li>
          </ul>
        </li>
      )) : <h2 className={styles.no_artists}>Aún no tenemos artistas con estas características. 
              <Link href={"/vinculate"} className={styles.vinculate_link}> ¡Podrías ser el primero!</Link>
            </h2>}
    </ul>
  )
}