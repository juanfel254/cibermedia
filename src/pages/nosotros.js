import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import ArtistsCardsB from "@/components/profileCards/artistsCardsB";
import styles from "@/styles/pages-styles/nosotros.module.css";

export default function Nosotros() {
  const [aboutUsInfo, setAboutUsInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          "https://admin.ciberespacioartistico.com/index.php/wp-json/wp/v2/nosotros";
        const res = await fetch(url);
        const data = await res.json();
        setAboutUsInfo(data[0]);
      } catch {
        console.log("API fetch error: " + error);
      }
    };
    fetchData();
  }, []);

  console.log(aboutUsInfo);

  return (
    <>
      <Head>
        <title>Nosotros</title>
        <meta
          name="description"
          content="Sobre nosotros los organizadores de narrando en multimedial"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main-container">
        <div className={styles.us_container}>
          <section className={styles.us_info_container}>
            <div className={styles.image_container}>
              <Image
                src="/main-logos/main-logo.svg"
                width={550}
                height={550}
                alt="Logo Principal de Cibermedia"
              />
            </div>
            {aboutUsInfo ? (
              <div className={styles.description_container}>
                <h2 className={styles.title}>
                  {aboutUsInfo.ACF.titulo_seccion}
                </h2>
                <p className={styles.description}>
                  {aboutUsInfo.ACF.descripcion_nosotros}
                </p>
              </div>
            ) : null}
          </section>

          {aboutUsInfo ? <ArtistsCardsB data={aboutUsInfo} /> : null}
        </div>
      </div>
    </>
  );
}
