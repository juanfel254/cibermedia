import Head from "next/head";
import styles from "@/styles/pages-styles/artista.module.css";
import ArtistInfo from "@/components/artistInfo/artistInfo";
import ArtistProjects from "@/components/artistProjects/artistProjects";

export const getStaticPaths = async () => {
  const res = await fetch(
    "https://admin.ciberespacioartistico.com/index.php/wp-json/wp/v2/portafolio?per_page=100"
  );
  const data = await res.json();
  const paths = data.map((artista) => {
    return {
      params: { slug: artista.slug },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const slug = context.params.slug;
  const url =
    "https://admin.ciberespacioartistico.com/index.php/wp-json/wp/v2/portafolio?slug=" +
    slug;
  const res = await fetch(url);
  const data = await res.json();
  return {
    props: { artista: data[0] },
    revalidate: 10,
  };
};

export default function ArtistaIndv({ artista }) {
  return (
    <>
      <Head>
        <title>{`${artista.ACF.nombre_artista} - Portafolio - Ciberespacio Artístico de Kennedy`}</title>
        <meta
          name="description"
          content={`Portafolio de ${artista.ACF.nombre_artista}: ${artista.ACF.descripcion_artista}`}
        />
        <meta
          name="keywords"
          content={`${artista.ACF.nombre_artista}, Ciberespacio, Artístico, Kennedy, Portafolio`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.portfolio_container} main-container`}>
        <ArtistInfo artista={artista ? artista : null} />
        {artista.ACF.portafolio_de_proyectos ? (
          <ArtistProjects artista={artista ? artista : null} />
        ) : null}
      </div>
    </>
  );
}
