import styles from "@/styles/profileCards/artistCardB.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

export default function ArtistsCardsB({ data }) {
  const [members, setMembers] = useState(null);

  const slugs = data.ACF.miembros_colectivo.map(
    (url) => url.split("/").slice(-2, -1)[0]
  );

  useEffect(() => {
    const fetchData = async () => {
      const promises = slugs.map(async (slug) => {
        const url = `https://admin.ciberespacioartistico.com/index.php/wp-json/wp/v2/portafolio?slug=${slug}`;
        const res = await fetch(url);
        const data = await res.json();
        return data[0];
      });
      setMembers(await Promise.all(promises));
    };

    fetchData();
  }, []);

  return (
    <div className={styles.cards_container}>
      {members
        ? members.map((member, index) => (
            <Tilt
              key={index}
              className={styles.tilt_container}
              scale={0.9}
              gyroscope={true}
              tiltMaxAngleX={0}
            >
              <Link
                className={`my-link ${styles.card_container}`}
                href={`/artistas/${member.slug}`}
              >
                <img
                  className={styles.member_picture}
                  alt={`Foto de ${member.ACF.nombre_artista}`}
                  src={member.ACF.galeria_fotos.foto_1}
                />
                <div className={styles.member_description_container}>
                  <h3 className={styles.member_name}>
                    {member.ACF.nombre_artista}
                  </h3>
                  {member.ACF.perfil.map((skill, index) => {
                    return (
                      <p key={index} className={styles.member_description}>
                        {skill}
                      </p>
                    );
                  })}
                </div>
              </Link>
            </Tilt>
          ))
        : null}
    </div>
  );
}
