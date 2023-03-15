import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Searched() {
  const [searchResults, setSearchResults] = useState([]);
  let params = useParams();

  useEffect(() => {
    getSearchedCuisines(params.search);
  }, [params.search]);

  const getSearchedCuisines = async (search) => {
    try {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&query=${search}`
      );
      const data = await api.json();

      setSearchResults(data.results);
    } catch (e) {
      alert("Oops! Sorry, Not able to fetch the cuisines you requested");
    }
  };

  return (
    <Grid>
      {searchResults.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(15rem, 1fr));
  grid-gap: 1rem;
`;

const Card = styled.div`
  border-radius: 2rem;

  img {
    border-radius: 2rem;
    object-fit: cover;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
