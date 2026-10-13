import { useEffect, useState } from "react";

const API_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

// Loads one recipe from TheMealDB and returns { recipe, loading, error }
export function useRecipe(id) {
  const [state, setState] = useState({ recipe: null, loading: false, error: null });

  useEffect(() => {
    if (!id) {
      setState({ recipe: null, loading: false, error: null });
      return;
    }

    // Cancel the request if the user picks another recipe before this one loads
    const controller = new AbortController();
    setState({ recipe: null, loading: true, error: null });

    async function load() {
      try {
        const response = await fetch(API_URL + encodeURIComponent(id), { signal: controller.signal });
        if (!response.ok) {
          throw new Error("Request failed with status " + response.status);
        }

        const data = await response.json();
        if (!data.meals) {
          setState({ recipe: null, loading: false, error: "Sorry, we couldn't find this recipe." });
          return;
        }

        setState({ recipe: data.meals[0], loading: false, error: null });
      } catch (error) {
        if (error.name !== "AbortError") {
          setState({
            recipe: null,
            loading: false,
            error: "Something went wrong while loading the recipe. Please try again.",
          });
        }
      }
    }

    load();
    return () => controller.abort();
  }, [id]);

  return state;
}
