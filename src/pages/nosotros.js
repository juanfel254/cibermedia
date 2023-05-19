import Head from "next/head"
import styles from "@/styles/pages-styles/nosotros.module.css"

export default function Nosotros() {
  return (
    <>
      <Head>
        <title>Nosotros</title>
        <meta name="description" content="Sobre nosotros los organizadores de narrando en multimedial" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <ul className={styles.contactus_main_container}>
          <li className={styles.main_container_child}> <p>Logo de Cibermedia</p></li>
          <li className={styles.main_container_child}>
            <section>
              <ul className={styles.form_main_container}>
                <li><h1 className="main-title">¡Escríbenos un correo!</h1></li>
                <li>
                  <form className={styles.form_container}>
                    <input type="text" id="name" placeholder="Nombre" className={styles.name_input} required="required" />
                    <input type="email" id="name" placeholder="Correo Electrónico" className={styles.email_input} required="required" />
                    <input type="text" id="subject" placeholder="Asunto" className={styles.subject_input} required="required" />
                    <input type="text" id="message" placeholder="¿Cómo podemos ayudarte?" className={styles.message_input} required="required" />
                    <input type="submit" id="submit-button" value="Enviar" className={styles.submit_button}/>
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