import React from 'react';

const RecipeCard = ({ recipe, onFavorite }) => (
  <div className="recipe-card">
    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
    <h2>{recipe.strMeal}</h2>
    <button onClick={() => onFavorite(recipe)}>Save to Favorites</button>
  </div>
);

export default RecipeCard;