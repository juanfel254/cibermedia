import Link from "next/link";
import styles from "@/styles/profileCards/artistCardA.module.css"
import Image from "next/image";

export default function ArtistsCardsA({ artistas }) {
  function limit (string = '', limit = 0) {  
    return string.substring(0, limit)
  }

  function salvacion(htmlString, myQuery) {
    if (!htmlString) return("Cargando");
    else {
      if(typeof document !== 'undefined') {
        var e = document.createElement('div');
        e.innerHTML = htmlString;
        return(e.getElementsByClassName(myQuery));
      }
    }
  }

  function getText(element){ return element.textContent};
  function getDetails(element, attribute){ return element.getAttribute(attribute)}; 

  function findText(htmlText, myClass, tagName) {
    const regex = new RegExp(`<${tagName}[^>]*class="${myClass}"[^>]*>(.*?)<\/${tagName}>`, 'gi');
    const matches = htmlText.match(regex);
    
    if (matches) {
      return matches.map(match => match.replace(/<[^>]*>/g, ''));
    } return [];
  }

  function extractAttributeFromTag(htmlText, attribute, tagName) {
    const regex = new RegExp(`<${tagName}[^>]*${attribute}="([^"]*)"[^>]*>`, 'i');
    const match = htmlText.match(regex);
  
    if (match) {
      const [, attributeValue] = match;
      const valArray = attributeValue.split(",");
      const firstPhoto = valArray[0].split(" ");
      return firstPhoto[0];
    } return null;
  }

  return (
    <ul className={styles.cards_container}>
      {artistas.length !== 0 ? artistas.map((artista, index) => (
        <li key={index} className={styles.card_container}>
          <img 
            width={250}
            height={250}
            src={extractAttributeFromTag(artista.content.rendered, "srcSet", "img")}
            alt="Foto de artista"
            className={styles.picture_container}
          />
          <ul>
            <li>
              <Link href={`/artistas/${artista.id}`} className={styles.card_link} key={index}>
                <h3 className={`font-family-compress ${styles.artist_name}`}>{artista.title.rendered}</h3>
              </Link>
            </li>
            <li>
              <p className={styles.artist_description}>
                {limit(findText(artista.content.rendered, "descripcion-artista", "p").toString(), "150") + "..."}
              </p>
            </li>
          </ul>
        </li>
      )) : <h2>No hay resultados para tu selección</h2>}
    </ul>
  )
}