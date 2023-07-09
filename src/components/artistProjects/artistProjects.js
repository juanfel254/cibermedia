import styles from "@/styles/pages-styles/artista.module.css";
import VideoProject from "./videoProject";
import AudioProject from "./audioProject";
import { useEffect, useState } from "react";

export default function ArtistProjects({ artista }) {
  const [projects, setProjects] = useState(null);

  const slugs = artista.ACF.portafolio_de_proyectos.map(
    (url) => url.split("/").slice(-2, -1)[0]
  );

  useEffect(() => {
    const fetchData = async () => {
      const promises = slugs.map(async (slug) => {
        const url = `https://admin.ciberespacioartistico.com/index.php/wp-json/wp/v2/proyecto?slug=${slug}`;
        const res = await fetch(url);
        const data = await res.json();
        return data[0];
      });
      setProjects(await Promise.all(promises));
    };

    fetchData();
  }, []);

  return (
    <ul className={styles.projects_container}>
      {projects
        ? projects.map((project, index) => {
            return (
              <li key={index} className={styles.project_container}>
                <div key={index} className={styles.project_title_container}>
                  <h2 className={styles.project_title}>
                    {project.ACF.titulo_del_proyecto}
                  </h2>
                </div>
                {project.ACF.youtube_link ? (
                  <VideoProject projectInfo={project} />
                ) : null}
                {project.ACF.audio ? (
                  <AudioProject projectInfo={project} />
                ) : null}
              </li>
            );
          })
        : "Cargando..."}
    </ul>
  );
}
