import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/footer.module.css";
import { Rubik } from 'next/font/google';
import { useEffect, useState } from "react";

const rubik = Rubik({ subsets: ['latin'] });

export default function Footer () {

  const [htmlString, setHtmlString] = useState('');

  useEffect(()=> {
    async function fetchData () {
      try {
        const response = await fetch('https://admin.ciberespacioartistico.com/index.php/wp-json/wp/v2/pages/103');
        const jsonData = await response.json();
        setHtmlString(jsonData.content.rendered);
      } catch (error) {
        console.log('Error al obtener los datos de la API:', error);
      }
    };

    fetchData();
  }, [])

  function salvacion(htmlString, myQuery) {
    if (!htmlString) return("Cargando");
    else {
      var e = document.createElement('div');
      e.innerHTML = htmlString;
      return(e.querySelector(myQuery));
    }
  }

  function getText(element){ return element.textContent};
  function getDetails(element, attribute){ return element.getAttribute(attribute)}; 

  return (
    <footer className={`${styles.footer} ${rubik.className}`}>
      <ul className={styles.first_container}>
        
        <li className={styles.second_container}>
          <h4>Síguenos</h4>
          <ul className={styles.logos_container}>
            <li>
              <a href="https://www.instagram.com/ccibermedia/" target="_blank">
                <Image 
                  src="/social/icono-instagram-morado.svg"
                  width={50}
                  height={50}
                  alt="Icono de instagram morado"
                />
              </a>
            </li>
            <li>
              <a href="/" target="_blank">
                <Image 
                  src="/social/icono-youtube-morado.svg"
                  width={50}
                  height={50}
                  alt="Icono de youtube morado"
                />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/CCibermedia" target="_blank">
                <Image 
                  src="/social/icono-twitter-morado.svg"
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
                {getText(salvacion(htmlString, ".correo-electronico"))}
              </Link>
            </li>
            <li>{getText(salvacion(htmlString, ".numero-telefono"))}</li>
          </ul>
        </li>
      </ul>
    </footer>
  )
}