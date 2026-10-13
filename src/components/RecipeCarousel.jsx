import { useCallback, useEffect, useRef, useState } from "react";
import RecipeCard from "./RecipeCard.jsx";

export default function RecipeCarousel({ recipes, selectedId, onSelect }) {
  const listRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateButtons = useCallback(() => {
    const list = listRef.current;
    const maxScroll = list.scrollWidth - list.clientWidth;
    setCanScrollPrev(list.scrollLeft > 1);
    setCanScrollNext(list.scrollLeft < maxScroll - 1);
  }, []);

  useEffect(() => {
    updateButtons();
    window.addEventListener("resize", updateButtons);
    return () => window.removeEventListener("resize", updateButtons);
  }, [updateButtons]);

  // Scroll by one "page" of visible cards
  function scrollByPage(direction) {
    const list = listRef.current;
    list.scrollBy({ left: direction * list.clientWidth, behavior: "smooth" });
  }

  return (
    <section className="recipes-section" aria-label="Recipes">
      <div className="section-heading">
        <h2>Our recipes</h2>
        <div className="carousel-controls">
          <button
            type="button"
            className="carousel-button material-symbols-rounded"
            aria-label="Previous recipes"
            disabled={!canScrollPrev}
            onClick={() => scrollByPage(-1)}
          >
            arrow_back
          </button>
          <button
            type="button"
            className="carousel-button material-symbols-rounded"
            aria-label="Next recipes"
            disabled={!canScrollNext}
            onClick={() => scrollByPage(1)}
          >
            arrow_forward
          </button>
        </div>
      </div>

      <ul className="card-list" ref={listRef} onScroll={updateButtons}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            selected={recipe.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </section>
  );
}
