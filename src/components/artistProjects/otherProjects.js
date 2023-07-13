import styles from "@/styles/pages-styles/artista.module.css";

export default function OtherProjects({ projectsInfo }) {
  return (
    <li className={styles.project_container}>
      <div className={styles.project_title_container}>
        <h2 className={styles.project_title}>Otros Proyectos</h2>
      </div>
      <div className={styles.other_proyects_container}>
        {Object.entries(projectsInfo).map(([key, value]) => {
          if (value.url) {
            return (
              <a
                className={styles.other_project}
                key={key}
                href={value.url}
                target="_blank"
              >
                {value.title}
              </a>
            );
          }
        })}
      </div>
    </li>
  );
}
