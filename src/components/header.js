import React, { useState } from "react";
import styles from "@/styles/header.module.css";
import Link from "next/link";
import Image from 'next/image';

const menuItems = [
  { label: "Mapa", content: "¡Aquí estamos!", link: "/" },
  { label: "Artistas", content: "Los que somos", link: "/artistas" },
  { label: "Nosotros", content: "¿Quiénes somos?", link: "/nosotros" },
  { label: "Únete", content: "Únetenos", link: "/contacto" }
];

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const handleOverlayClick = () => setIsActive(!isActive);

  return (
    <>
      <div
        className={`overlay-navigation ${
          isActive ? "overlay-active overlay-slide-down" : "overlay-slide-up"
        }`}
      >
        <nav role="navigation">
          <ul>
            {menuItems.map((item, index) => (
              <li
                className={
                  isActive
                    ? `slide-in-nav-item-delay-${index}`
                    : `slide-in-nav-item-delay-${index}-reverse`
                }
                key={`menuitem-${index}`}
              >
                <Link href={`${item.link}`} data-content={item.content} onClick={handleOverlayClick}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <section className="header">
        <Link href="/" className={`my-link ${styles.home_logo}`}>
          <ul className={styles.home_logo_secondary_container}>
            <Image
              src="/main-logos/icono-cibermedia-morado.svg"
              width={180}
              height={90}
              alt="Logo del Colectivo Cultural Cibermedia"
              className="header-logo"
            />
            <h3>Colectivo Cultural Cibermedia</h3>
          </ul>
        </Link>
        <div className="open-overlay" onClick={handleOverlayClick}>
          <span
            className={`bar-top ${
              isActive ? "animate-top-bar" : "animate-out-top-bar"
            }`}
          ></span>
          <span
            className={`bar-middle ${
              isActive ? "animate-middle-bar" : "animate-out-middle-bar"
            }`}
          ></span>
          <span
            className={`bar-bottom ${
              isActive ? "animate-bottom-bar" : "animate-out-bottom-bar"
            }`}
          ></span>
        </div>
      </section>
    </>
  );
};