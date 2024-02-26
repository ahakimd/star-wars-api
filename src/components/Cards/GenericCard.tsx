import React from "react";
import styles from "./GenericCard.module.css";

interface GenericCardProps {
  children: React.ReactNode;
}

const GenericCard: React.FC<GenericCardProps> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default GenericCard;
