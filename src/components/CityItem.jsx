import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../Contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity, deleteCity } = useCities();

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={styles.cityItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        // so can now acces the latitude and the logitude of the cities from the URL without storing it any where is the program
        //and we need it in the map component
        //this(use state on the url) is also useful when we share the url for another person that he can found the page as the same state as us
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          x
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
