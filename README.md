# Tatev's Bakery

A small bakery recipe website built with **React** and **Vite**. Browse a collection of sweet treats, open any recipe to see its ingredients and step-by-step method, and save your favourites for later.

Recipe data comes from the free [TheMealDB](https://www.themealdb.com) API.

## Features

- **Recipe carousel**: scroll through the recipes with the arrow buttons or by swiping.
- **Recipe details**: pick a recipe to load its ingredients and method from TheMealDB, with loading and error states.
- **Shareable recipe links**: the selected recipe is stored in the URL (for example `/?recipe=52860`), so you can bookmark or share it.
- **Favourites**: tap the heart on a recipe to save it. Favourites are kept in `localStorage` and shown on their own page, with a counter in the navigation bar.
- **Light and dark mode**: follows your system setting by default, can be toggled from the header and is remembered between visits.
- **Contact form**: checks the name, email and message, shows a helpful error under any field that needs fixing, and thanks the visitor once it's submitted (see [Notes](#notes)).
- **Responsive layout** for desktop, tablet and mobile.

## Pages

| Route | Page |
|---|---|
| `/` | Home: welcome section, recipe carousel and recipe details |
| `/favourites` | Your saved recipes |
| `/contact` | Contact details and contact form |
| `/about` | About the bakery |
| anything else | 404 page |

## Tech stack

- [React 19](https://react.dev)
- [React Router](https://reactrouter.com) for page routing
- [Vite](https://vite.dev) for the dev server and build
- Plain CSS with CSS variables for theming
- Google Fonts (Libre Baskerville) and Material Symbols icons

## Getting started

You need [Node.js](https://nodejs.org) installed.

```bash
# Clone the repository
git clone https://github.com/tatevhayrapetyan/Tatevs-Bakery.git
cd Tatevs-Bakery

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open the local address shown in the terminal (usually http://localhost:5173).

### Other scripts

| Command | What it does |
|---|---|
| `npm run build` | Builds the site for production into `dist/` |
| `npm run preview` | Serves the production build locally |

## Project structure

```
├── index.html            # Page entry point
├── src/
│   ├── main.jsx          # Renders the app with the router and providers
│   ├── App.jsx           # Routes and shared layout
│   ├── index.css         # All styles
│   ├── assets/           # Recipe photos
│   ├── components/       # Header, Footer, RecipeCarousel, RecipeCard, RecipeDetails, ContactForm
│   ├── context/          # ThemeContext and FavouritesContext
│   ├── data/recipes.js   # The list of recipes shown on the site
│   ├── hooks/            # useLocalStorage and useRecipe
│   ├── pages/            # Home, Favourites, Contact, About, Not Found
│   └── utils/recipe.js   # Helpers for parsing ingredients and steps
└── legacy-html/          # The original HTML/CSS/JS version of the site
```

## Customising

- **Add or change recipes** in `src/data/recipes.js`. Each recipe uses its TheMealDB ID to load the details.
- **Switch photos**: set `USE_API_PHOTOS` in `src/data/recipes.js` to `false` to use the local photos in `src/assets` instead of TheMealDB's.
- **Change colours** with the CSS variables at the top of `src/index.css`.

## Original version

The `legacy-html/` folder contains the first version of the site, written in plain HTML, CSS and JavaScript with three separate pages. The React version now has favourites, dark mode, routing and shareable recipe links.

## Notes

- The address, phone numbers and email addresses on the contact page are made up for demonstration.
- The contact form is front-end only. It validates the input and shows a thank-you message, but the message isn't sent or stored anywhere, since there is no backend.
