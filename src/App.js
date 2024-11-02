import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeList from './components/RecipeList';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  // Load favorites from local storage 
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Fetch recipes from recipes.json
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('recipes.json');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

//  Call fetchRecipes 
  useEffect(() => {
    fetchRecipes();
  }, []);

// Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      // Filter recipes based on search query
      const filteredRecipes = recipes.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(query.toLowerCase())
      );
      setRecipes(filteredRecipes);
    } else {
    // Reset recipes to original list
      fetchRecipes();
    }
  };

// Save to favorites 
const handleFavorite = (recipe) => {
  const existingFavorite = favorites.find((fav) => fav.strMeal === recipe.strMeal);
  if (!existingFavorite) {
    const updatedFavorites = [...favorites, recipe];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  } else {
    alert(`"${recipe.strMeal}" is already in your favorites!`)
  }
};

// Remove from favorites
  const handleRemoveFavorite = (recipe) => {
    const updatedFavorites = favorites.filter((fav) => fav.strMeal !== recipe.strMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

// For ingredients
  return (
    <div className="App">
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ingredient"
        />
        <button type="submit">Search</button>
      </form>
      <RecipeList recipes={recipes} onFavorite={handleFavorite} />
      <h2>Favorite Recipes</h2>
      <div className="favorites">
        {favorites.length > 0 ? (
          favorites.map((recipe, index) => (
            <div key={index} className="favorite-recipe">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h3>{recipe.strMeal}</h3>
              <button onClick={() => handleRemoveFavorite(recipe)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No favorite recipes yet</p>
        )}
      </div>
    </div>
  );
}

export default App;
