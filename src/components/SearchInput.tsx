import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./SearchInput.module.css";
import {
  filmsResponse,
  shipsVehiclesResponse,
} from "../interfaces/ApiResponses";
import FilmCard from "./Cards/FilmCard";
import ShipsVehiclesCard from "./Cards/ShipsVehiclesCard";

const starshipsURL = "https://swapi.dev/api/starships/";
const filmsURL = "https://swapi.dev/api/films/";
const vehiclesURL = "https://swapi.dev/api/vehicles/";

const SearchInput = () => {
  const [starships, setStarships] = useState<shipsVehiclesResponse[]>([]);
  const [films, setFilms] = useState<filmsResponse[]>([]);
  const [vehicles, setVehicles] = useState<shipsVehiclesResponse[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState<String>("");
  const [filter, setFilter] = useState<String>("starships");
  const [sort, setSort] = useState<"asc" | "desc" | null>(null);

  const fetchAllData = async (api: string) => {
    let data: shipsVehiclesResponse[] = [];
    let nextPage = api;

    while (nextPage) {
      try {
        const response = await axios.get(nextPage);
        data = [...data, ...response.data.results];
        nextPage = response.data.next;
      } catch (error: any) {
        setError(error);
        console.log(error);
        break;
      }
    }

    return data;
  };

  const handleSort = () => {
    const newSort = sort === "asc" ? "desc" : "asc";
    setSort(newSort);

    if (filter === "starships") {
      setStarships((prevStarShips) =>
        [...prevStarShips].sort((a, b) =>
          newSort === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        )
      );
    }

    if (filter === "films") {
      setFilms((prevFilms) =>
        [...prevFilms].sort((a, b) =>
          newSort === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        )
      );
    }

    if (filter === "vehicles") {
      setVehicles((prevVehicles) =>
        [...prevVehicles].sort((a, b) =>
          newSort === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        )
      );
    }
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(starshipsURL)
      .then((response) => {
        fetchAllData(response.data.next).then((allStarShips) => {
          setStarships(allStarShips);
        });
      })
      .catch((error: any) => {
        setError(error);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
    axios
      .get(filmsURL)
      .then((response) => {
        setFilms(response.data.results);
      })
      .catch((error: any) => {
        setError(error);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
    axios
      .get(vehiclesURL)
      .then((response) => {
        fetchAllData(response.data.next).then((allVehicles) => {
          setVehicles(allVehicles);
        });
      })
      .catch((error: any) => {
        setError(error);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <h1>Star Wars API</h1>
      </header>
      <main className={styles.container}>
        <input
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        >
          <option value="starships">Starships</option>
          <option value="films">Films</option>
          <option value="vehicles">Vehicles</option>
        </select>
        <button onClick={handleSort}>Sort by Name/Title</button>
      </main>
      {isLoading ? <div>Loading data...please wait!</div> : null}
      {error ? <div>Error: ${error}</div> : null}
      {filter === "films"
        ? films
            .filter(
              (film) =>
                query === "" ||
                film.title.toLowerCase().includes(query.toLowerCase())
            )
            .map((film) => (
              <FilmCard
                title={film.title}
                episode_id={film.episode_id}
                director={film.director}
                producer={film.producer}
                release_date={film.release_date}
                opening_crawl={film.opening_crawl}
              />
            ))
        : null}
      {filter === "starships"
        ? starships
            .filter(
              (starship) =>
                query === "" ||
                starship.name.toLowerCase().includes(query.toLowerCase())
            )
            .map((starship) => (
              <ShipsVehiclesCard
                name={starship.name}
                model={starship.model}
                manufacturer={starship.manufacturer}
                cost_in_credits={starship.cost_in_credits}
                length={starship.length}
                crew={starship.crew}
                passengers={starship.passengers}
                cargo_capacity={starship.cargo_capacity}
              />
            ))
        : null}
      {filter === "vehicles"
        ? vehicles
            .filter(
              (vehicle) =>
                query === "" ||
                vehicle.name.toLowerCase().includes(query.toLowerCase())
            )
            .map((vehicle) => (
              <ShipsVehiclesCard
                name={vehicle.name}
                model={vehicle.model}
                manufacturer={vehicle.manufacturer}
                cost_in_credits={vehicle.cost_in_credits}
                length={vehicle.length}
                crew={vehicle.crew}
                passengers={vehicle.passengers}
                cargo_capacity={vehicle.cargo_capacity}
              />
            ))
        : null}
    </div>
  );
};

export default SearchInput;
