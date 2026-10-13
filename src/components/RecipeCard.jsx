import { useFavourites } from "../context/FavouritesContext.jsx";

export default function RecipeCard({ recipe, selected, onSelect }) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const favourite = isFavourite(recipe.id);

  return (
    <li className="card-item">
      <button
        type="button"
        className={"card-link" + (selected ? " selected" : "")}
        aria-pressed={selected}
        onClick={() => onSelect(recipe.id)}
      >
        <img src={recipe.image} alt={recipe.alt} className="card-image" />
        <span className="card-header">
          <span className="badge">{recipe.name}</span>
        </span>
      </button>

      <button
        type="button"
        className={"favourite-button material-symbols-rounded" + (favourite ? " filled" : "")}
        aria-pressed={favourite}
        aria-label={(favourite ? "Remove " : "Add ") + recipe.name + (favourite ? " from" : " to") + " favourites"}
        onClick={() => toggleFavourite(recipe.id)}
      >
        favorite
      </button>
    </li>
  );
}
