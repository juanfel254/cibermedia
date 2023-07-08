import styles from "@/styles/pages-styles/artista.module.css";

export default function VideoProject({ projectInfo }) {
  const getGold = (youTubeLink) => {
    return "https://www.youtube.com/embed/" + youTubeLink.split("=")[1];
  };

  const checkYouTubeLink = (url) => {
    if (/youtube\.com\/watch\?v=/.test(url)) {
      return getGold(url);
    } else if (/youtu\.be\//.test(url)) {
      return "https://www.youtube.com/embed/" + url.split("/")[3];
    }
    return "Enlace no reconocido de YouTube";
  };

  return (
    <div className={styles.visual_project_container}>
      <div>
        <iframe
          width="100%"
          height="501vw"
          src={checkYouTubeLink(projectInfo.ACF.youtube_link)}
          title={projectInfo.ACF.titulo_del_proyecto}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <p className={styles.visual_desc}>{projectInfo.ACF.descripcion_video}</p>
      <p className={styles.visual_cred}>{projectInfo.ACF.creditos_video}</p>
    </div>
  );
}
