import Head from "next/head"
import ArtistsCardsB from "@/components/profileCards/artistsCardsB"
import styles from "@/styles/pages-styles/nosotros.module.css"

export default function Nosotros() {
  return (
    <>
      <Head>
        <title>Nosotros</title>
        <meta name="description" content="Sobre nosotros los organizadores de narrando en multimedial" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="main-container">
        <h1 className="main-title">Muy pronto podrás conocernos mejor...</h1>
        <p className="text-centered">Sección en mantenimiento 🏗️</p>
        {/* <section id="colectivo-cultural-cibermedia">
          <ul className={styles.card_container}>
            <li className={styles.card_child}>
              <p className={styles.picture_container}>Foto</p>
            </li>
            <li className={styles.card_child}>
              <ul className={styles.team_description_container}>
                <li><h3 className={`font-family-compress ${styles.artist_name}`}>Colectivo Cultural Cibermedia</h3></li>
                <li><p className={styles.artist_description}>Sinopsis</p></li>
              </ul>
            </li>
          </ul>
        </section> */}
      </div>
    </>
  )
}