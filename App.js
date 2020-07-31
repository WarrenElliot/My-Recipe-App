import React, {useEffect, useState} from 'react';
import Recipe from './Recipes';
import './App.css';

const App = () => {

  const APP_ID = "777a739e";
  const APP_KEY = "c328889f5f936a86ab36e1f8010635e4";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('egg');

  useEffect( () => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <h1 className="title">Your Own Recipe App on REACT</h1>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text"value={search} onChange={updateSearch}/>
            <button className="search-button" type="submit">Search</button>
      </form>
      <p className="para"> Showing {recipes.length} results for {query}</p>
        <div className="recipes">
            {recipes.map(recipe => (
              <Recipe 
              key={recipe.recipe.label} 
              title={recipe.recipe.label} 
              calories={recipe.recipe.calories} 
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              />
            ))}
        </div>`
    </div>
  );
}

export default App;
