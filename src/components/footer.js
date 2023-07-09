import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/footer.module.css";
import { Rubik } from "next/font/google";
import { useEffect, useState } from "react";

const rubik = Rubik({ subsets: ["latin"] });

export default function Footer() {
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const url =
          "https://admin.ciberespacioartistico.com/index.php/wp-json/wp/v2/contacto?slug=redes-y-contacto";
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData[0]);
      } catch (error) {
        console.log("Error al obtener los datos de la API:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <footer className={`${styles.footer} ${rubik.className}`}>
      <ul className={styles.first_container}>
        <li className={styles.second_container}>
          <h4>Síguenos</h4>
          <ul className={styles.logos_container}>
            <li>
              <a
                href={data ? data.ACF.redes_sociales.instagram : "/"}
                target="_blank"
              >
                <Image
                  src="/social/instagram-morado.svg"
                  width={50}
                  height={50}
                  alt="Instagram del colectivo cultural cibermedia"
                />
              </a>
            </li>
            <li>
              <a
                href={data ? data.ACF.redes_sociales.youtube : "/"}
                target="_blank"
              >
                <Image
                  src="/social/youtube-morado.svg"
                  width={50}
                  height={50}
                  alt="Icono de youtube morado"
                />
              </a>
            </li>
            <li>
              <a
                href={data ? data.ACF.redes_sociales.youtube : "/"}
                target="_blank"
              >
                <Image
                  src="/social/twitter-morado.svg"
                  width={50}
                  height={50}
                  alt="Icono de twitter morado"
                />
              </a>
            </li>
          </ul>
        </li>

        <li className={styles.second_container}>
          <h4>Escríbenos</h4>
          <ul>
            <li className={styles.email_container}>
              <Link href="/vinculate" className="my-link">
                {data ? data.ACF.correo_electronico : ""}
              </Link>
            </li>
            <li>{data ? data.ACF.numero_telefono : ""}</li>
          </ul>
        </li>
      </ul>
      <div className={styles.author_container}>
        <p style={{ fontStyle: "italic" }}>Developed with Love: </p>
        <p>
          {" "}
          <Link
            href="https://juanfe.bio.link/"
            alt="Sitio Hecho Por Juan Felipe Parra Runceria - Desarrollador Web"
            className={styles.author_link}
            target="_blank"
          >
            Juan Felipe Parra Runceria
          </Link>
          {""}
        </p>
        <p>2023</p>
      </div>
    </footer>
  );
}
