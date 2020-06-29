import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const REACT_APP_KEY = "114452ac8704bef696f33554881955ab";
const REACT_APP_ID = "7c62c851";

const App = () => {
  const [recipes, setRecipes] = useState([]);

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("egg");

  useEffect(() => {
    getRecipe();
  }, [query]);

  const getRecipe = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${REACT_APP_ID}&app_key=${REACT_APP_KEY}`
    ); //async used to fetch data and await to wait because it takes time
    const data = await response.json();
    console.log(data);
    setRecipes(data.hits);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <h1>TOP 10 RECIPES</h1>

      <form onSubmit={getSearch} className="search-form">
        <input
          type="text"
          className="search-bar"
          value={search}
          onChange={updateSearch}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          ></Recipe>
        ))}
      </div>
    </div>
  );
};

export default App;
