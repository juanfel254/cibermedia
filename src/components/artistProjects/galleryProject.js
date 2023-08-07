import styles from "@/styles/pages-styles/artista.module.css";
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";

export default function GalleryProject({ projectInfo }) {
  const galleryUrls = Object.keys(projectInfo.ACF.galeria_de_fotos)
    .filter((key) => projectInfo.ACF.galeria_de_fotos[key] !== false)
    .map((key) => ({ src: projectInfo.ACF.galeria_de_fotos[key] }));

  return (
    <>
      {galleryUrls.length !== 0 ? (
        <div className={styles.gallery_project_container}>
          (
          <div className={styles.gallery_container}>
            (
            <Carousel
              className="gallery-carousel"
              images={galleryUrls}
              hasMediaButton={false}
              hasIndexBoard={false}
              hasThumbnails={true}
              style={{
                backgroundColor: "var(--light-black-opacity",
                aspectRatio: "auto",
              }}
            />
            )
          </div>
          )
          <div className={styles.gallery_info}>
            <p className={styles.gallery_description}>
              {projectInfo.ACF.descripcion_galeria}
            </p>
            <p className={styles.gallery_credits}>
              {projectInfo.ACF.creditos_galeria}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
