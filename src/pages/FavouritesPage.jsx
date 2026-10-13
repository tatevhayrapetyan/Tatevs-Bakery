import { Link, useNavigate } from "react-router";
import RecipeCard from "../components/RecipeCard.jsx";
import { useFavourites } from "../context/FavouritesContext.jsx";
import recipes from "../data/recipes.js";

export default function FavouritesPage() {
  const { favouriteIds } = useFavourites();
  const navigate = useNavigate();
  const favouriteRecipes = recipes.filter((recipe) => favouriteIds.includes(recipe.id));

  function openRecipe(id) {
    navigate("/?recipe=" + id);
  }

  return (
    <main className="total-container page">
      <div className="page-heading">
        <p className="eyebrow">Saved for later</p>
        <h2>Your favourites</h2>
      </div>

      {favouriteRecipes.length === 0 ? (
        <div className="instructions-container">
          <div className="recipe-placeholder">
            <span className="placeholder-icon material-symbols-rounded" aria-hidden="true">favorite</span>
            <h2 className="instructions-title">No favourites yet</h2>
            <p>Tap the heart on any recipe to save it here.</p>
            <Link to="/" className="pill-button">Browse recipes</Link>
          </div>
        </div>
      ) : (
        <ul className="card-grid">
          {favouriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} selected={false} onSelect={openRecipe} />
          ))}
        </ul>
      )}
    </main>
  );
}
