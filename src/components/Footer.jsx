export default function Footer() {
  return (
    <footer className="site-footer">
      <p>
        &copy; {new Date().getFullYear()} Tatev's Bakery · Recipes from{" "}
        <a href="https://www.themealdb.com" target="_blank" rel="noopener">TheMealDB</a>
      </p>
    </footer>
  );
}
