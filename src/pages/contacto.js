import Head from "next/head"
import styles from "@/styles/pages-styles/contacto.module.css"

export default function Contacto() {
  return (
    <>
      <Head>
        <title>Contacto</title>
        <meta name="description" content="Datos de contacto con los organizadores del taller narrando en multimedial" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <ul className={styles.contactus_main_container}>
          <li className={`${styles.main_container_child} ${styles.logo_container}`}> <p>Logo de Cibermedia</p></li>
          <li className={styles.main_container_child}>
            <section>
              <ul className={styles.form_main_container}>
                <li><h1 className="main-title">¡Pongámonos en Contacto!</h1></li>
                <li>
                  <form id="contactform" className={styles.form_container}>
                    <input type="text" id="name" placeholder="¿Cuál es tu nombre?" className={styles.name_input} required="required" />
                    <input type="email" id="name" placeholder="¿Cuál es tu correo electrónico?" className={styles.email_input} required="required" />
                    <input type="text" id="subject" placeholder="¿Cuál es el asunto de tu mensaje?" className={styles.subject_input} required="required" />
                    <textarea form="contactform" type="text" id="message" name="message" placeholder="¿Cómo podemos ayudarte?" className={styles.message_input} required="required" size="50"/>
                    <input type="submit" id="submit-button" value="Enviar mensaje" className={`${styles.submit_button}`}/>
                  </form>
                </li>
                <li><h1 className="main-title">O encuéntranos en nuestras redes sociales: </h1></li>
              </ul>
            </section>
          </li>
        </ul>
      </div>
    </>
  )
}