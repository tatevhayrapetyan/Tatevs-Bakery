// The API stores ingredients as strIngredient1..20 and strMeasure1..20
export function getIngredients(recipe) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = (recipe["strIngredient" + i] || "").trim();
    const measure = (recipe["strMeasure" + i] || "").trim();
    if (name) {
      ingredients.push({ name, measure });
    }
  }
  return ingredients;
}

// Split the instructions into steps, dropping "STEP 1"-style labels
export function getSteps(recipe) {
  return recipe.strInstructions
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*(step\s*\d+[:.]?|\d+[.)])\s*/i, "").trim())
    .filter((line) => line.length > 0);
}
