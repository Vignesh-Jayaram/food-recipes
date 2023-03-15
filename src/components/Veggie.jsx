import { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./Veggie.css";
import { Link } from "react-router-dom";

function Veggie() {
  const [veggies, setVeggies] = useState([]);

  // Once the component mounts, fetch the trending picks from the api
  useEffect(() => {
    getVeggies();
  }, []);

  const getVeggies = async () => {
    // To avoid repeated api calls, store the data in the LocalStorage
    const localVeggies = localStorage.getItem("veggies");

    if (localVeggies) {
      setVeggies(JSON.parse(localVeggies));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=9&tags=vegetarian`
      );
      const data = await api.json();

      localStorage.setItem("veggies", JSON.stringify(data.recipes));
      setVeggies(data.recipes);
    }
  };

  return (
    <div className="veggies">
      <h3 className="veggies__Title">Vegetarian Cuisines</h3>

      <Splide
        options={{
          perPage: 3,
          pagination: false,
          drag: "free",
          gap: "1.75rem",
        }}
      >
        {veggies.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <div className="veggies__Card">
                <Link to={"/recipe/" + recipe.id}>
                  <p className="card__Title">{recipe.title}</p>
                  <img
                    className="card__image"
                    src={recipe.image}
                    alt={recipe.title}
                  />
                  <div className="gradient"></div>
                </Link>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
}

export default Veggie;
