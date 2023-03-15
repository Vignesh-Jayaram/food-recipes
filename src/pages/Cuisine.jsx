import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function Cuisine() {
  const [cuisines, setCuisines] = useState([]);
  let params = useParams();

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  const getCuisine = async (type) => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&cuisine=${type}`
    );
    const data = await api.json();
    setCuisines(data.results);
  };

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisines.map((item) => {
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

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(15rem, 1fr));
  grid-gap: 1rem;
`;

const Card = styled.div`
  img {
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;
