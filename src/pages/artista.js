import Head from "next/head"
import styles from "@/styles/pages-styles/artista.module.css"

export default function Artista({
  name, 
  profile, 
  description, 
  projectName, 
  videoSinop, 
  audioSinop, 
  videoCred, 
  audioCred
}){
  
  return (
    <>
      <Head>
        <title>Portafolio Personal</title>
        <meta name="description" content="Información individual del artista" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={`${styles.portfolio_container} main-container`}>
        <section className={styles.artist_desc_container}>
          <h2 className={styles.artist_name}>
            Nombre del Artista - Perfil o Enfoque
          </h2>
          <p className={styles.artist_desc}>
            Tempor nisi incididunt proident cillum enim elit consectetur ad adipisicing do Lorem. Dolore aliquip ipsum labore incididunt pariatur ea duis laborum esse excepteur minim dolore do aliquip. Velit aliquip consequat minim non elit sint veniam cupidatat exercitation elit pariatur labore quis. Tempor incididunt occaecat esse culpa commodo id esse. Qui ea culpa et laboris culpa aute deserunt in. Aute occaecat anim culpa in culpa reprehenderit aute incididunt.
          </p>
        </section>
        <ul className={styles.projects_container}>
          <li className={styles.project_title_container}>
            <h2 className={styles.project_title}>
              Nombre Proyecto Audiovisual
            </h2>
          </li>
          <li className={styles.visual_project_container}>
            <p className={styles.visual_desc}>
              Duis consectetur nostrud ipsum deserunt ea elit sint adipisicing magna magna aliquip aliquip cupidatat id. Eu dolore cillum sunt laboris labore. Occaecat enim id proident commodo dolore exercitation anim velit id reprehenderit amet enim cillum est. Minim amet eiusmod velit laboris cupidatat laboris non ullamco consequat exercitation adipisicing ad cillum do. Nostrud officia consectetur ut voluptate veniam quis qui.
            </p>
          </li>
          <li className={styles.sound_project_container}>
            <p className={styles.sound_desc}>
              Duis consectetur nostrud ipsum deserunt ea elit sint adipisicing magna magna aliquip aliquip cupidatat id. Eu dolore cillum sunt laboris labore. Occaecat enim id proident commodo dolore exercitation anim velit id reprehenderit amet enim cillum est. Minim amet eiusmod velit laboris cupidatat laboris non ullamco consequat exercitation adipisicing ad cillum do. Nostrud officia consectetur ut voluptate veniam quis qui.
            </p>
          </li>
        </ul>
      </div>
    </>
  )
}