import React from "react";
import styles from "./FilmCard.module.css";
import { filmsResponse } from "../../interfaces/ApiResponses";
import GenericCard from "./GenericCard";

const FilmCard: React.FC<filmsResponse> = ({
  title,
  episode_id,
  director,
  producer,
  release_date,
  opening_crawl,
}) => {
  return (
    <GenericCard>
      <div key={episode_id} className={styles["title-details"]}>
        <h2>{title}</h2>
        <p>Episode: {episode_id}</p>
      </div>
      <div className={styles["other-details"]}>
        <div className={styles.headings}>
          <p>Director</p>
          <p>Producer</p>
          <p>Relase Date</p>
          <p>Opening Crawl</p>
        </div>
        <div className={styles.divider}></div>
        <div>
          <p>{director}</p>
          <p>{producer}</p>
          <p>{release_date}</p>
          <p>{opening_crawl}</p>
        </div>
      </div>
    </GenericCard>
  );
};

export default FilmCard;
