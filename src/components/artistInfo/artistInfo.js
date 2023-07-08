import styles from "@/styles/pages-styles/artista.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

export default function ArtistInfo({ artista }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Obtener las claves de las fotos que contienen una URL
      const photoKeys = Object.keys(artista.ACF.galeria_fotos).filter(
        (key) => typeof artista.ACF.galeria_fotos[key] === "string"
      );
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photoKeys.length);
    }, 4000);

    return () => {
      // Limpiar el intervalo cuando el componente se desmonte
      clearInterval(interval);
    };
  }, [artista.ACF.galeria_fotos]);

  const photoKeys = Object.keys(artista.ACF.galeria_fotos).filter(
    (key) => typeof artista.ACF.galeria_fotos[key] === "string"
  );
  const currentPhotoKey = photoKeys[currentPhotoIndex];
  const currentPhotoUrl = artista.ACF.galeria_fotos[currentPhotoKey];

  const renderRedesSocialesA = (redesSociales) => {
    if (redesSociales) {
      const enlacesRedesSociales = Object.entries(redesSociales)
        .filter(
          ([redSocial, data]) => typeof redSocial === "string" && data !== null
        ) // Filtrar las claves de cadena y datos no nulos
        .map(([redSocial, data]) => {
          if (data) {
            const redSocialName = redSocial.replace(/\_\d+$/, ""); // Eliminar el número al final si existe
            return (
              <Link
                href={
                  redSocialName === "whatsapp"
                    ? `https://wa.me/${data}`
                    : data.url
                }
                className={`${styles.social_network} my-link`}
                target="_blank"
                key={redSocial}
              >
                <Tilt scale={1.3}>
                  <img
                    src={`/social/${redSocialName}-morado.svg`}
                    alt={`ícono de ${redSocialName}`}
                    width={70}
                    height={70}
                  />
                </Tilt>
              </Link>
            );
          }
          return null;
        });
      return (
        <div className={styles.artist_networks}>{enlacesRedesSociales}</div>
      );
    }
    return null;
  };

  return (
    <div className={styles.artist_desc_auxiliar_container}>
      <section className={`${styles.artist_desc_container}`}>
        <Link href="/artistas" className={`my-link ${styles.back_link}`}>
          {"<<"}
        </Link>
        <center>
          <Tilt scale={1.05} gyroscope={true} tiltMaxAngleX={0}>
            {photoKeys.map((key, index) => (
              <img
                key={key}
                src={artista.ACF.galeria_fotos[key]}
                alt="artist image"
                className={`${styles.artist_picture} ${
                  index === currentPhotoIndex ? "" : styles.hidden_picture
                }`}
                id="artist-desc"
              />
            ))}
          </Tilt>
        </center>

        <h2 className={styles.artist_name}>{artista.title.rendered}</h2>

        <div className={styles.artist_tags}>
          {artista.perfil.map((tag, index) => {
            return (
              <Tilt scale={1.2} tiltReverse={true} key={index}>
                <p className={styles.tagB}>#{tag}</p>
              </Tilt>
            );
          })}
        </div>
        <div className={styles.artist_text_desc}>
          <p className={styles.artist_text}>
            {artista.ACF.descripcion_artista}
          </p>
        </div>

        <div className={styles.email_container}>
          <p className={styles.email}>
            {artista.ACF.correo_electronico
              ? artista.ACF.correo_electronico
              : null}
          </p>
        </div>

        {renderRedesSocialesA(artista.acf.redes_sociales)}
      </section>
    </div>
  );
}
