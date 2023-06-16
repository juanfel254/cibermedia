import Image from "next/image"
import Head from "next/head"
import styles from "@/styles/pages-styles/vinculate.module.css"
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Vinculate() {
  const [htmlString, setHtmlString] = useState('');

  useEffect(()=> {
    async function fetchData () {
      try {
        const response = await fetch('https://admin.ciberespacioartistico.com/wp-json/wp/v2/pages/103');
        const jsonData = await response.json();
        setHtmlString(jsonData.content.rendered);
      } catch (error) {
        console.log('Error al obtener los datos de la API:', error);
      }
    };

    fetchData();
  }, [])

  function salvacion(htmlString, myClass) {
    if (!htmlString) return("Cargando");
    else {
      var e = document.createElement('div');
      e.innerHTML = htmlString;
      return(e.getElementsByClassName(myClass));
    }
  }

  function getDetails(element, attribute){ return element.getAttribute(attribute)}; 

  return (
    <>
      <Head>
        <title>Contacto</title>
        <meta name="description" content="Datos de contacto con los organizadores del taller narrando en multimedial" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main-container">
        <ul className={styles.contactus_main_container}>
          <li className={`${styles.main_container_child} ${styles.logo_container}`}>
            <Image
              src="/main-logos/logotipo-cibermedia-amarillo.svg"
              width={250}
              height={250}
              alt="Logotipo de Cibermedia amarillo"
              className={styles.main_logo}
            />
          </li>
          <li className={styles.main_container_child}>
            <section>
              <ul className={styles.form_main_container}>
                <li>
                  <h1 className="main-title">Haz Parte o Actualiza tu perfil</h1>
                </li>
                <ul className={styles.buttons_container}>
                  <Link className={styles.contact_button} href="/">
                    Soy Nuevo y quiero hacer parte
                  </Link>
                  <Link href="/" className={styles.contact_button}>
                    Quiero actualizar mi perfil
                  </Link>
                </ul>
                <li>
                  <h1 className="main-title">¡Pongámonos en Contacto!</h1>
                </li>
                <li>
                  <form id="contactform" className={styles.form_container}>
                    <input type="text" id="name" placeholder="¿Cuál es tu nombre?" className={styles.name_input} required="required" autoComplete="given-name"/>
                    <input type="email" id="email" placeholder="¿Cuál es tu correo electrónico?" className={styles.email_input} required="required" autoComplete="email"/>
                    <input type="text" id="subject" placeholder="¿Cuál es el asunto de tu mensaje?" className={styles.subject_input} required="required" autoComplete="off"/>
                    <textarea form="contactform" type="text" id="message" name="message" placeholder="¿Cómo podemos ayudarte?" className={styles.message_input} required="required" size="50" autoComplete="off"/>
                    <input type="submit" id="submit-button" value="Enviar mensaje" className={`${styles.submit_button}`}/>
                  </form>
                </li>
                <li>
                  <h1 className="main-title">O encuéntranos en nuestras redes sociales: </h1>
                </li>
                <li>
                  <ul className={styles.logos_container}>
                    <li>
                      <a href="https://www.instagram.com/ccibermedia/" target="_blank">
                        <Image 
                          src="/social/icono-whatsapp-color.svg"
                          width={80}
                          height={80}
                          alt="Icono de instagram color"
                          className="contact-logos"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/ccibermedia/" target="_blank">
                        <Image 
                          src="/social/icono-instagram-color.svg"
                          width={80}
                          height={80}
                          alt="Icono de instagram color"
                          className="contact-logos"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/ccibermedia/" target="_blank">
                        <Image 
                          src="/social/icono-youtube-color.svg"
                          width={80}
                          height={80}
                          alt="Icono de youtube color"
                          className="contact-logos"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/CCibermedia" target="_blank">
                        <Image 
                          src="/social/icono-twitter-color.svg"
                          width={80}
                          height={80}
                          alt="Icono de twitter color"
                          className="contact-logos"
                        />
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </section>
          </li>
        </ul>
      </div>
    </>
  )
}