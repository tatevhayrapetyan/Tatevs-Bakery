import { Link, NavLink } from "react-router";
import { useTheme } from "../context/ThemeContext.jsx";
import { useFavourites } from "../context/FavouritesContext.jsx";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { favouriteIds } = useFavourites();
  const isDark = theme === "dark";

  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">Tatev's Bakery</Link>
        <nav>
          <ul className="nav-links">
            <li><NavLink to="/" end>Main</NavLink></li>
            <li>
              <NavLink to="/favourites">
                Favourites
                {favouriteIds.length > 0 && <span className="nav-count">{favouriteIds.length}</span>}
              </NavLink>
            </li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li>
              <button
                type="button"
                className="theme-toggle material-symbols-rounded"
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? "light_mode" : "dark_mode"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
