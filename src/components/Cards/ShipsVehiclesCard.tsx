import React from "react";
import styles from "./ShipsVehicles.module.css";
import { shipsVehiclesResponse } from "../../interfaces/ApiResponses";
import GenericCard from "./GenericCard";

const ShipsVehiclesCard: React.FC<shipsVehiclesResponse> = ({
  name,
  model,
  manufacturer,
  cost_in_credits,
  length,
  crew,
  passengers,
  cargo_capacity,
}) => {
  return (
    <GenericCard>
      <div key={name} className={styles["title-details"]}>
        <h2>{name}</h2>
        <p>{model}</p>
      </div>
      <div className={styles["other-details"]}>
        <div className={styles.headings}>
          <p>Manufacturer</p>
          <p>Cost in Credits</p>
          <p>Length</p>
          <p>Crew</p>
          <p>Passengers</p>
          <p>Cargo Capacity</p>
        </div>
        <div className={styles.divider}></div>
        <div>
          <p>{manufacturer}</p>
          <p>{cost_in_credits}</p>
          <p>{length}</p>
          <p>{crew}</p>
          <p>{passengers}</p>
          <p>{cargo_capacity}</p>
        </div>
      </div>
    </GenericCard>
  );
};

export default ShipsVehiclesCard;
