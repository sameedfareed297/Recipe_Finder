import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, onFavorite }) => (
  <div className="recipe-list">
    {recipes.length > 0 ? (
      recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} onFavorite={onFavorite} />
      ))
    ) : (
      <p>No recipes found</p>
    )}
  </div>
);

export default RecipeList;