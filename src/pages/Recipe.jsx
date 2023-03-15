import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  let params = useParams();

  const getRecipeDetails = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
    );
    const recipeDetail = await data.json();

    setDetails(recipeDetail);
  };

  useEffect(() => {
    getRecipeDetails(params.name);
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => {
              return <li key={ingredient.id}>{ingredient.original}</li>;
            })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 3rem;
  display: flex;

  .active {
    background: linear-gradient(#494949, #313131);
    color: white;
  }

  img {
    width: 30rem;
    height: 20rem;
    object-fit: cover;
  }

  h3 {
    font-size: 1.2rem;
    line-height: 1.5rem;
    text-justify: inter-word;
  }

  h2 {
    margin-bottom: 1.75rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 1.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 1rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 5rem;
`;

export default Recipe;
