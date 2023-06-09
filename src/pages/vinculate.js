import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import emailjs from "@emailjs/browser";
import styles from "@/styles/pages-styles/vinculate.module.css";
import ContactButtons from "@/components/contactButtons/contactButtons";

export default function Vinculate() {
  const form = useRef();
  const [emailSent, setEmailSent] = useState(false);
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

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_l4ijyy5",
        "template_ko4fqzk",
        form.current,
        "7VuGspBtC6biwANer"
      )
      .then(
        (result) => {
          console.log(result.text);
          setEmailSent(true);
        },
        (error) => {
          alert(
            "Tu mensaje no pudo ser enviado. Intenta nuevamente dando click en enviar."
          );
          console.log(error.text);
        }
      );
  };

  useEffect(() => {
    if (emailSent === true) {
      alert("Tu mensaje ha sido enviado con éxito");
      location.reload();
      setEmailSent(false);
    }
  }, [emailSent]);

  return (
    <>
      <Head>
        <title>Contacto</title>
        <meta
          name="description"
          content="Contacta con nosotros! Redes sociales y correo electrónico Ciberespacio Artístico Cibermedia"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main-container">
        <ul className={styles.contactus_main_container}>
          <li className={`${styles.logo_container}`}>
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
                <li className={styles.form_title_container}>
                  <h1 className="main-title">
                    Únete al Ciberespacio Artístico de Kennedy o Actualiza tu
                    perfil
                  </h1>
                </li>
                <ContactButtons data={data} />
                <li>
                  <h1 className="main-title">
                    ¿Tienes alguna duda? ¡Pongámonos en Contacto!
                  </h1>
                </li>
                <li>
                  <form
                    ref={form}
                    onSubmit={sendEmail}
                    id="contactform"
                    className={styles.form_container}
                  >
                    <input
                      name="user_name"
                      type="text"
                      id="name"
                      placeholder="¿Cuál es tu nombre?"
                      className={styles.name_input}
                      required="required"
                      autoComplete="given-name"
                    />
                    <input
                      name="user_email"
                      type="email"
                      id="email"
                      placeholder="¿Cuál es tu correo electrónico?"
                      className={styles.email_input}
                      required="required"
                      autoComplete="email"
                    />
                    <textarea
                      name="message"
                      form="contactform"
                      type="text"
                      id="message"
                      placeholder="¿Cómo podemos ayudarte?"
                      className={styles.message_input}
                      required="required"
                      size="50"
                      autoComplete="off"
                    />
                    <input
                      type="submit"
                      id="submit-button"
                      value="Enviar mensaje"
                      className={`${styles.submit_button}`}
                    />
                  </form>
                </li>
                <li>
                  <h1 className="main-title">
                    O encuéntranos en nuestras redes sociales para conocernos
                    mejor:{" "}
                  </h1>
                </li>
                <li>
                  <ul className={styles.logos_container}>
                    <li>
                      <a
                        href={
                          data
                            ? data.ACF.redes_sociales.whatsapp
                              ? "wa.me/" + data.ACF.redes_sociales.whatsapp
                              : ""
                            : "/vinculate"
                        }
                        target="_blank"
                      >
                        <Image
                          src="/social/whatsapp-color.svg"
                          width={80}
                          height={80}
                          alt="Icono de instagram color"
                          className="contact-logos"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href={data ? data.ACF.redes_sociales.instagram : "/"}
                        target="_blank"
                      >
                        <Image
                          src="/social/instagram-color.svg"
                          width={80}
                          height={80}
                          alt="Instagram del colectivo cultural cibermedia"
                          className="contact-logos"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href={data ? data.ACF.redes_sociales.youtube : "/"}
                        target="_blank"
                      >
                        <Image
                          src="/social/youtube-color.svg"
                          width={80}
                          height={80}
                          alt="Canal de youtube del colectivo cultural cibermedia"
                          className="contact-logos"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href={data ? data.ACF.redes_sociales.twitter : "/"}
                        target="_blank"
                      >
                        <Image
                          src="/social/twitter-color.svg"
                          width={80}
                          height={80}
                          alt="Twitter del colectivo cultural cibermedia"
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
  );
}
