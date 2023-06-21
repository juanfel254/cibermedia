import { useEffect, useState, useRef } from "react";
import Image from "next/image"
import Head from "next/head"
import Link from "next/link";
import emailjs from '@emailjs/browser';
import styles from "@/styles/pages-styles/vinculate.module.css"

export default function Vinculate() {

  const [emailSent, setEmailSent] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_l4ijyy5', 'template_ko4fqzk', form.current, '7VuGspBtC6biwANer')
      .then((result) => {
          console.log(result.text);
          setEmailSent(true);
      }, (error) => {
        alert("Tu mensaje no pudo ser enviado. Intenta nuevamente dando click en enviar.")
          console.log(error.text);
      });
  };

  useEffect(()=> {
    if(emailSent === true){
      alert("Tu mensaje ha sido enviado con éxito");
      location.reload();
      setEmailSent(false)
    }
  }, [emailSent])

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
                  <Link target="_blank" href="https://forms.gle/t6MicFD1DWanthGv6" className={styles.contact_button} >
                    Soy Nuevo y quiero hacer parte
                  </Link>
                  <Link target="_blank" href=" https://docs.google.com/forms/d/e/1FAIpQLScE6n3kiqM5aaN4Q0XFhSP-CWZonuV67TFIFSfWY4NjowO70g/viewform" className={styles.contact_button}>
                    Quiero actualizar mi perfil
                  </Link>
                </ul>
                <li>
                  <h1 className="main-title">¡Pongámonos en Contacto!</h1>
                </li>
                <li>
                  <form ref={form} onSubmit={sendEmail} id="contactform" className={styles.form_container}>
                    <input name="user_name" type="text" id="name" placeholder="¿Cuál es tu nombre?" className={styles.name_input} required="required" autoComplete="given-name"/>
                    <input name="user_email" type="email" id="email" placeholder="¿Cuál es tu correo electrónico?" className={styles.email_input} required="required" autoComplete="email"/>
                    <textarea name="message" form="contactform" type="text" id="message" placeholder="¿Cómo podemos ayudarte?" className={styles.message_input} required="required" size="50" autoComplete="off"/>
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