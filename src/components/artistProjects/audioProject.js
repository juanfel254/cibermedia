import AudioPlayer from "../audioPlayer/AudioPlayer";
import styles from "@/styles/pages-styles/artista.module.css";

export default function AudioProject({ projectInfo }) {
  return (
    <li className={styles.sound_project_container}>
      {projectInfo.ACF.audio && <AudioPlayer src={projectInfo.ACF.audio} />}
      <p className={styles.sound_desc}>{projectInfo.ACF.descripcion_audio}</p>
      <p>{projectInfo.ACF.creditos_audio}</p>
    </li>
  );
}
