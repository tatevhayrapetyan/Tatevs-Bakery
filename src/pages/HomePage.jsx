import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import RecipeCarousel from "../components/RecipeCarousel.jsx";
import RecipeDetails from "../components/RecipeDetails.jsx";
import recipes from "../data/recipes.js";

export default function HomePage() {
  // The chosen recipe lives in the URL (/?recipe=52860), so it can be shared or bookmarked
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("recipe");
  const detailsRef = useRef(null);

  useEffect(() => {
    if (selectedId) {
      detailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedId]);

  function selectRecipe(id) {
    setSearchParams({ recipe: id });
  }

  return (
    <>
      <div className="welcome">
        <p className="eyebrow">Homemade &amp; fresh</p>
        <h2>Welcome to Tatev's Bakery!</h2>
        <p>Treat yourself to some of the greatest sweet treats specially crafted for you to enjoy!</p>
      </div>

      <main className="total-container">
        <RecipeCarousel recipes={recipes} selectedId={selectedId} onSelect={selectRecipe} />

        <section className="instructions-container" ref={detailsRef} aria-live="polite">
          <RecipeDetails id={selectedId} />
        </section>
      </main>
    </>
  );
}
