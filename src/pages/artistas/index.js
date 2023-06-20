import { useEffect, useState } from "react";
import Head from "next/head";
import ArtistsCardsA from "@/components/profileCards/artistsCardsA";
import styles from "@/styles/pages-styles/artistas.module.css"
import categoriesArray from "@/categories.json"

/* export const getStaticProps = async () => {
  const res = await fetch('https://admin.ciberespacioartistico.com/wp-json/wp/v2/posts/?per_page=100')
  const data = await res.json();

  return {
    props : {artistas : data}
  }
} */

const Artistas = () => {
  const [artists, setArtists] = useState('');
  const [selectedProfile, setSelectedProfile] = useState("");
  const [selectedUpz, setSelectedUpz] = useState("");
  const [filtered, setFiltered] = useState(null);

  const profilesCategories = categoriesArray.filter(category => category.parent == 9);
  const upzCategories = categoriesArray.filter(category => category.parent == 7);

  function handleSelectChange(e) {
    const { name, value } = e.target;
    if(name == "profile") {
      setSelectedProfile(value)
    } else if(name === "upz") {
      setSelectedUpz(value)
    }
  }

  useEffect(()=> {
    async function fetchData () {
      try {
        const res = await fetch('https://admin.ciberespacioartistico.com/index.php/wp-json/wp/v2/portafolio?per_page=100')
        const data = await res.json();
        setArtists(data);
      } catch (error) {
        console.log('Error al obtener los datos de la API:', error);
      }
    };
    fetchData();
  }, [])

  useEffect(() => {
    if(artists) {
      let filteredArtists = artists;
      if(selectedProfile !== "" || selectedUpz !== "") {
        filteredArtists = artists.filter((artist) => 
        (selectedProfile !== "" ? artist.ACF.perfil.includes(selectedProfile) : true) 
        && (selectedUpz !== "" ? artist.ACF.upz.includes(selectedUpz) : true)
      )}
      setFiltered(filteredArtists);
    }
  }, [artists, selectedProfile, selectedUpz])

  return (
    <>
      <Head>
        <title>Artistas de la Localidad</title>
        <meta name="description" content="Artistas que participaron en el curso" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main-container">
        <h1 className="main-title">Artistas de la Localidad</h1>
        <ul className={styles.cards_filter_container}>
          <section className={styles.filters_container}>
            <div>
              <h3 className={styles.filter_title}>Perfil</h3>
              <select onChange={handleSelectChange} name="profile">
                <option value={""}>Todos</option>
                {profilesCategories.map((category, index) => 
                  <option className={styles.option_select} key={category.slug} value={category.name}>{category.name}</option>
                )}
              </select>
            </div>
            <div>
              <h3 className={styles.filter_title}>UPZ</h3>
              <select onChange={handleSelectChange} name="upz">
                <option value={""}>Todos</option>
                {upzCategories.map((category, index) => 
                  <option className={styles.option_select} key={category.slug} value={category.name}>{category.name}</option>
                )}
              </select>
            </div>
          </section>
          <section className={styles.cards_container}>
            {filtered ? <ArtistsCardsA artistas={filtered} /> : "Cargando..."}
          </section>
        </ul>
      </div>
    </>
  )
}

export default Artistas;