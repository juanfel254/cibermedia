import { useEffect, useState } from "react";
import Head from "next/head"
import Image from "next/image"
import styles from "@/styles/pages-styles/artista.module.css"

export const getStaticPaths = async () => {
  const res = await fetch('https://admin.ciberespacioartistico.com/wp-json/wp/v2/posts/?per_page=100');
  const data = await res.json();

  const paths = data.map(artista => {
    return {
      params: { slug: artista.id.toString() }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.slug;
  const url = 'https://admin.ciberespacioartistico.com/index.php/wp-json/wp/v2/posts/' + id;
  const res = await fetch(url);
  const data = await res.json();

  return {  
    props: { artista: data }}
}

function useSalvacion(htmlString, myQuery) {
  const [element, setElement] = useState(null)

  useEffect(() => {
    if(!window) return;
    if (htmlString && typeof document !== 'undefined') {
      var e = document.createElement('div');
      e.innerHTML = htmlString;
      setElement(e);
    }
  }, [htmlString]);
  
  return {
    element,
    getByClassName: (className) => element && element.getElementsByClassName(className)[0],
    getByTagName: (tagName) => element && element.getElementsByTagName(tagName)[0],
    querySelector: (myQuery) => element && element.querySelector(myQuery),
    getDetails: (myElement, attribute) => myElement && myElement.getAttribute(attribute),
    getText: (myElement) => myElement && myElement.textContent,
  };
}

export default function ArtistaIndv({ artista }){
  const { getByClassName, querySelector, getDetails, getText, getByTagName } = useSalvacion(artista.content.rendered);
  const info = {
    imgSrc: getDetails(querySelector("img"), 'src'),
    description: getText(getByClassName("descripcion-artista")),
    project: {
      name: getText(getByClassName("nombre-proyecto")),
      videoSrc: (getByTagName('iframe') || {}).src,
      videoDescription: getText(getByClassName("sinopsis-video")),
      audioSrc: (getByTagName('audio') || {}).src,
      audioDescription: getText(getByClassName("sinopsis-audio")),
    },
  }
console.log("test",info.project.audioSrc)
  return (
    <>
      <Head>
        <title>{artista.title.rendered}</title>
        <meta name="description" content="Información individual del artista" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={`${styles.portfolio_container} main-container`}>
        <section className={styles.artist_desc_container}>
          <center>
            <img src={info.imgSrc} style={{ width: '90%', maxWidth: '400px', marginBottom: '20px' }} alt="artist image"/>
          </center>
          <h2 className={styles.artist_name}>
            {artista.title.rendered}
          </h2>
          <p className={styles.artist_desc}>
            {info.description}
          </p>
        </section>
        <ul className={styles.projects_container}>
          <li className={styles.project_title_container}>
            <h2 className={styles.project_title}>
              {info.project.name}
            </h2>
          </li>
          <li className={styles.visual_project_container}>
            <p className={styles.visual_desc}>
              <div>
                <iframe width="560" height="315" src={info.project.videoSrc} title={info.project.name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              </div>
              {info.project.videoDescription}
            </p>
          </li>
          <li className={styles.sound_project_container}>
            {info.project.audioSrc && <audio controls  >  
              <source src={info.project.audioSrc}/>
            </audio>}
            <p className={styles.sound_desc}>
              {info.project.audioDescription}
            </p>
          </li>
        </ul>
      </div>
    </>
  )
}