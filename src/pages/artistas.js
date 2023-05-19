import Head from "next/head"
import ArtistsCardsA from "@/components/profileCards/artistsCardsA"
import styles from "@/styles/pages-styles/artistas.module.css"

export default function Artistas() {
  return (
    <>
      <Head>
        <title>Artistas de la Localidad</title>
        <meta name="description" content="Artistas que participaron en el curso" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="main-title">Artistas de la Localidad</h1>
      <section className={styles.cards_container}>
        <ArtistsCardsA/>
      </section>
    </>
  )
}