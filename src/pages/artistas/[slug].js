import Head from "next/head"
import Image from "next/image"
import styles from "@/styles/pages-styles/artista.module.css"
import Link from "next/link";
import Tilt from 'react-parallax-tilt';
import { useEffect, useRef, useState } from "react";
import AudioPlayer from "@/components/audioPlayer/AudioPlayer";

export const getStaticPaths = async () => {
  const res = await fetch('https://admin.ciberespacioartistico.com/index.php/wp-json/wp/v2/portafolio?per_page=100');
  const data = await res.json();
  const paths = data.map(artista => {
    return {
      params: { slug: artista.slug }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const slug = context.params.slug;
  const url = 'https://admin.ciberespacioartistico.com/index.php/wp-json/wp/v2/portafolio?slug=' + slug;
  const res = await fetch(url);
  const data = await res.json();
  return {  
    props: { artista: data[0] }}
}

export default function ArtistaIndv({ artista }){

  const [returnButton, setReturnButton] = useState(false);

  const getGold = (youTubeLink) => youTubeLink.split("/")[3]

  useEffect(()=> {
    if(window.innerWidth < 1050) {
      setReturnButton(true)
    } else {
      setReturnButton(false)
    }
  }, [returnButton])

  const renderRedesSocialesA = (redesSociales) => {
    if (redesSociales) {
      const enlacesRedesSociales = Object.entries(redesSociales)
        .filter(([redSocial, data]) => typeof redSocial === 'string' && data !== null) // Filtrar las claves de cadena y datos no nulos
        .map(([redSocial, data]) => {
          if (data) {
            const redSocialName = redSocial.replace(/\_\d+$/, ''); // Eliminar el número al final si existe
            return (
              <Link href={redSocialName === 'whatsapp' ? `https://wa.me/${data}` : data.url} className={`${styles.social_network} my-link`} target="_blank" key={redSocial}>
                <Tilt scale={1.3}>
                  <Image
                    src={`/social/${redSocialName}-morado.svg`}
                    alt={`ícono de ${redSocialName}`}
                    width={70}
                    height={70}
                  />
                </Tilt>
              </Link>
            );
          } return null
        }); return <div className={styles.artist_networks}>{enlacesRedesSociales}</div>;
    } return null;
  };

  return (
    <>
      <Head>
        <title>{artista.ACF.nombre_artista}</title>
        <meta name="description" content={`Portafolio de ${artista.ACF.nombre_artista}: ${artista.ACF.descripcion_artista}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={`${styles.portfolio_container} main-container`}>
        <div className={styles.artist_desc_auxiliar_container}>
        <section className={`${styles.artist_desc_container}`} >

        <Link href="/artistas" className={`my-link ${styles.back_link}`}>{"<<"}</Link>
          <center>
            <Tilt scale={1.05} gyroscope={true}>
            <Image 
              src={artista.ACF.galeria_fotos.foto_1} 
              width={300}
              height={300}
              alt="artist image"
              className={styles.artist_picture}
              id="artist-desc"
              />
            </Tilt>
          </center>

          <h2 className={styles.artist_name}>
            {artista.title.rendered}
          </h2>

          <div className={styles.artist_tags}>
            {artista.perfil.map((tag, index) => {
              return <Tilt scale={1.2} tiltReverse={true} key={index}><p className={styles.tagB} >#{tag}</p></Tilt>
            })}
          </div>

{/*           <div className={styles.artist_tags}>
            {artista.perfil.map((tag, index) => {
              return <Tilt tiltReverse={true} key={index}><p className={styles.tag} >#{tag}</p></Tilt>
            })}
          </div> */}

          <div className={styles.artist_text_desc}>
            <p className={styles.artist_text}>{artista.ACF.descripcion_artista}</p>
          </div>

          <div className={styles.email_container}>
            <p className={styles.email}>{artista.ACF.correo_electronico ? artista.ACF.correo_electronico : null}</p>
          </div>

          {renderRedesSocialesA(artista.acf.redes_sociales)}
          
        </section>
        </div>
        
        <ul className={styles.projects_container}>

          {returnButton ? 
            <li className={styles.return_button}>
              <Link href={"#artist-desc"} >
                <Image
                  alt="Botón de retorno"
                  width={45}
                  height={45}
                  src={'/icons/Replay-button.png'}
                />
              </Link>
            </li>
            : null}

          <li className={styles.project_title_container}>
            <h2 className={styles.project_title}>
              {artista.ACF.nombre_del_proyecto}
            </h2>
          </li>
          <li className={styles.visual_project_container}>
            <div>
              <iframe width="100%" height="501vw" src={"https://www.youtube.com/embed/"+getGold(artista.ACF.youtube_link)} title={artista.ACF.nombre_del_proyecto} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            <p className={styles.visual_desc}>
              {artista.ACF.sinopsis_video}
            </p>
            <p>
              {artista.ACF.creditos_video}
            </p>
          </li>
          <li className={styles.sound_project_container}>
            {artista.ACF.archivo_audio && <AudioPlayer src={artista.ACF.archivo_audio}/>}
            <p className={styles.sound_desc}>
              {artista.ACF.sinopsis_audio}
            </p>
            <p>
            {artista.ACF.creditos_audio}
            </p>
          </li>
        </ul>
      </div>
    </>
  )
}