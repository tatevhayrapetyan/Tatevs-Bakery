import { useRecipe } from "../hooks/useRecipe.js";
import { getIngredients, getSteps } from "../utils/recipe.js";

function Placeholder({ children }) {
  return <div className="recipe-placeholder">{children}</div>;
}

export default function RecipeDetails({ id }) {
  const { recipe, loading, error } = useRecipe(id);

  if (!id) {
    return (
      <Placeholder>
        <span className="placeholder-icon material-symbols-rounded" aria-hidden="true">restaurant_menu</span>
        <h2 className="instructions-title">Pick a recipe</h2>
        <p>Choose one of the treats above to see its ingredients and step-by-step method.</p>
      </Placeholder>
    );
  }

  if (loading) {
    return <Placeholder><p>Loading recipe...</p></Placeholder>;
  }

  if (error) {
    return <Placeholder><p>{error}</p></Placeholder>;
  }

  if (!recipe) {
    return null;
  }

  const ingredients = getIngredients(recipe);
  const steps = getSteps(recipe);

  return (
    <article className="recipe">
      <div className="recipe-top">
        <div className="recipe-intro">
          <h2 className="recipe-title">{recipe.strMeal}</h2>
          <p className="recipe-meta">{ingredients.length} ingredients · {steps.length} steps</p>
        </div>
      </div>

      <div className="recipe-body">
        <div className="ingredients">
          <h3>Ingredients</h3>
          <ul className="ingredient-list">
            {ingredients.map((item, index) => (
              <li key={index}>
                <span className="measure">{item.measure}</span> {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="steps">
          <h3>Method</h3>
          <ol className="step-list">
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}
