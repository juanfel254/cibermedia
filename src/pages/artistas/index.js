import { useEffect, useState } from "react";
import Head from "next/head";
import ArtistsCardsA from "@/components/profileCards/artistsCardsA";
import styles from "@/styles/pages-styles/artistas.module.css";
import Image from "next/image";

const Artistas = () => {
  const [artists, setArtists] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");
  const [selectedUpz, setSelectedUpz] = useState("");
  const [filtered, setFiltered] = useState(null);
  const [upzCategories, setUpzCategories] = useState(null);
  const [profilesCategories, setProfilesCategories] = useState(null);
  const [searchBarValue, setSearchBarValue] = useState("");

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === "profile") {
      setSelectedProfile(value);
    } else if (name === "upz") {
      setSelectedUpz(value);
    }
  };

  const handleResetFilter = () => {
    setSelectedProfile("");
    setSelectedUpz("");
    setSearchBarValue("");
  };

  const filterArtists = (artists) => {
    const keywords = searchBarValue.toLowerCase().split(" ");
    return artists.filter((artist) => {
      const matchProfile =
        selectedProfile !== "" ? artist.perfil.includes(selectedProfile) : true;
      const matchUpz = selectedUpz !== "" ? artist.upz === selectedUpz : true;
      const matchSearchBar =
        searchBarValue === ""
          ? true
          : keywords.every((keyword) =>
              [artist.nombre_artista.toLowerCase(), artist.upz.toLowerCase(), ...artist.perfil.map((p) => p.toLowerCase())].some((value) =>
                value.includes(keyword)
              )
            );
      return matchProfile && matchUpz && matchSearchBar;
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://admin.ciberespacioartistico.com/index.php/wp-json/wp/v2/portafolio?per_page=100"
        );
        const data = await res.json();
        setProfilesCategories([...new Set(data.flatMap((portafolio) => portafolio.perfil))]);
        setUpzCategories([...new Set(data.map((portafolio) => portafolio.upz))]);
        setArtists(data);
      } catch (error) {
        console.log("Error al obtener los datos de la API:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (artists) {
      const filteredArtists = filterArtists(artists);
      setFiltered(filteredArtists);
    }
  }, [artists, selectedProfile, selectedUpz, searchBarValue]);

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
            <div className={styles.search_bar_container}>
              <Image
                src="/icons/lupa.svg"
                alt="magnifying glass icon"
                width={20}
                height={20}
              />
              <input
                name="searchBar"
                type="text"
                id="searchBar"
                className={styles.search_bar}
                placeholder="Nombre, perfil y/o upz"
                autocomplete="off"
                value={searchBarValue}
                onChange={(e) => setSearchBarValue(e.target.value)}
              />
            </div>
            <div>
              <h3 className={styles.filter_title}>Perfil</h3>
              <select onChange={handleSelectChange} name="profile" value={selectedProfile}>
                <option value="">Todos</option>
                {profilesCategories &&
                  profilesCategories.map((category, index) => (
                    <option className={styles.option_select} key={index} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <h3 className={styles.filter_title}>UPZ</h3>
              <select onChange={handleSelectChange} name="upz" value={selectedUpz}>
                <option value="">Todos</option>
                {upzCategories &&
                  upzCategories.map((category, index) => (
                    <option className={styles.option_select} key={index} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            </div>
            <button className={styles.reset_button} onClick={handleResetFilter}>
              Restablecer filtro
            </button>
          </section>
          <section className={styles.cards_container}>
            {filtered ? <ArtistsCardsA artistas={filtered} /> : "Cargando..."}
          </section>
        </ul>
      </div>
    </>
  );
};

export default Artistas;
