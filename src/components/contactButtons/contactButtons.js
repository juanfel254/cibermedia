import { useState } from "react";
import ReactModal from "react-modal";
import styles from "@/styles/pages-styles/vinculate.module.css";

export default function ContactButtons({ data }) {
  let contactButtons = data ? Object.entries(data.ACF.botones_contacto) : null;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.buttons_container}>
      {contactButtons
        ? contactButtons.map((button, index) => {
            if (button[1].url) {
              if (index === 0) {
                return (
                  <div className={styles.button_container} key={index}>
                    <button
                      target="_blank"
                      onClick={() => setIsOpen(!isOpen)}
                      className={styles.contact_button}
                    >
                      {button[1].title}
                    </button>
                    <ReactModal
                      ariaHideApp={false}
                      isOpen={isOpen}
                      contentLabel="Siuu"
                      className={styles.popup}
                      style={{
                        overlay: {
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        },
                        content: {
                          position: "absolute",
                          top: "150px",
                          left: "40px",
                          right: "40px",
                          height: "68vh",
                          border: "none",
                          background: "#2D1A47",
                          overflowX: "hidden",
                          overflowY: "auto",
                          WebkitOverflowScrolling: "touch",
                          borderRadius: "25px",
                          outline: "none",
                          padding: "0px 20px 40px 20px",
                          fontFamily: "Rubik",
                          fontSize: "15px",
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        },
                      }}
                    >
                      <button
                        style={{
                          color: "black",
                          position: "sticky",
                          top: "0",
                          color: "#FEEA27",
                          backgroundColor: "#2D1A47",
                          border: "none",
                          borderRadius: "5px",
                          fontSize: "35px",
                          fontFamily: "Rubik",
                          cursor: "pointer",
                          padding: "5px",
                          fontWeight: "500",
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        X
                      </button>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: data.ACF.texto_descriptivo_contacto,
                        }}
                        style={{ marginBottom: "30px" }}
                      ></p>
                      <div
                        style={{
                          width: "100%",
                          backgroundColor: "#FEEA27",
                          margin: "0",
                          padding: "0 10px",
                          textAlign: "center",
                          borderRadius: "10px",
                        }}
                      >
                        <a
                          key={index}
                          href={button[1].url}
                          target="_blank"
                          style={{
                            fontFamily: "Compress",
                            textAlign: "center",
                            color: "#2D1A47",
                            fontSize: "4vh",
                            borderRadius: "15px",
                            textDecoration: "none",
                          }}
                        >
                          {button[1].title}
                        </a>
                      </div>
                    </ReactModal>
                  </div>
                );
              } else {
                return (
                  <a
                    key={index}
                    href={button[1].url}
                    target="_blank"
                    className={styles.contact_button}
                  >
                    {button[1].title}
                  </a>
                );
              }
            }
          })
        : null}
    </div>
  );
}
