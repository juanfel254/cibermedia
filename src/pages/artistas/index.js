import Head from "next/head";
import ArtistsCardsA from "@/components/profileCards/artistsCardsA";

export const getStaticProps = async () => {
  const res = await fetch('https://admin.ciberespacioartistico.com/wp-json/wp/v2/posts/?per_page=100')
  const data = await res.json();

  return {
    props : {artistas : data}
  }

}

const Artistas = ({artistas}) => {

  return (
    <>
      <Head>
        <title>Artistas de la Localidad</title>
        <meta name="description" content="Artistas que participaron en el curso" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main-container">
        <h1 className="main-title">Artistas de la Localidad</h1>
        <section>
          {artistas ? <ArtistsCardsA artistas={artistas} /> : "Nou"}
        </section>
      </div>
    </>
  )
}

export default Artistas;