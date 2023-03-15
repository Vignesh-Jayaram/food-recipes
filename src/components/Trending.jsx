import { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./Trending.css";
import { Link } from "react-router-dom";

function Trending() {
  const [trending, setTrending] = useState([]);

  // Once the component mounts, fetch the trending picks from the api
  useEffect(() => {
    getTrending();
  }, []);

  const getTrending = async () => {
    // To avoid repeated api calls, store the data in the LocalStorage
    const localTrending = localStorage.getItem("trending");

    if (localTrending) {
      setTrending(JSON.parse(localTrending));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=9`
      );
      const data = await api.json();

      localStorage.setItem("trending", JSON.stringify(data.recipes));
      setTrending(data.recipes);
    }
  };

  return (
    <div className="trending__Cuisines">
      <h3 className="trending__Title">Trending Cuisines</h3>

      <Splide
        options={{
          perPage: 4,
          pagination: false,
          drag: "free",
          gap: "1.5rem",
        }}
      >
        {trending.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <div className="trending__Card">
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

export default Trending;
