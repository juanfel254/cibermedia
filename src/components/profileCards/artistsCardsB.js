import styles from "@/styles/profileCards/artistCardB.module.css"

export default function ArtistsCardsB() {

  const members = ["Melisa Cobo", "Jeison Xxxx", "Juan Xxxx", "Santiago Xxxx"];

  return (
    <ul className={styles.cards_container}>
      {members.map((member) => (
          <li key={member} className={styles.card_container}>
          <p className={styles.picture_container}>Foto</p>
          <ul>
            <li><h3 className={`font-family-compress ${styles.artist_name}`}>{member}</h3></li>
            <li><p className={styles.artist_description}>{`Sinopsis de ${member}`}</p></li>
          </ul>
        </li>
        ))}
    </ul>
  )
}