import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="total-container page">
      <div className="instructions-container">
        <div className="recipe-placeholder">
          <span className="placeholder-icon material-symbols-rounded" aria-hidden="true">restaurant_menu</span>
          <h2 className="instructions-title">Page not found</h2>
          <p>Sorry, this page doesn't exist.</p>
          <Link to="/" className="pill-button">Back to recipes</Link>
        </div>
      </div>
    </main>
  );
}
