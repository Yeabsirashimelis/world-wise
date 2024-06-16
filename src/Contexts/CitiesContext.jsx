import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.paylaod,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("unkown action type");
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) {
          throw new Error("Failed to fetch cities");
        }
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "there was an error loading data...",
        });
      }
    }

    // Similar updates for other async functions like getCity and createCity

    fetchCities();
  }, []);

  const getCity = useCallback(
    function getCity(id) {
      if (Number(id) === currentCity?.id) return;
      async function fetchCities() {
        try {
          dispatch({ type: "loading" });
          const res = await fetch(`${BASE_URL}/cities/${id}`);
          if (!res.ok) {
            throw new Error("Failed to fetch cities");
          }
          const data = await res.json();
          dispatch({ type: "city/loaded", payload: data });
        } catch (error) {
          dispatch({
            type: "rejected",
            payload: "there was an error loading the city...",
          });
        }
      }
      fetchCities();
    },
    [currentCity?.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("ERROR creating the cities");
      }
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "there was an error creating the city..",
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("ERROR deleting the city");
      }
      const data = await res.json();
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "there was an error deleting the city..",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext is used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
