import brownies from "../assets/brownies.jpeg";
import carrotCake from "../assets/carrot-cake.jpeg";
import cookies from "../assets/cookies.jpeg";
import cremeBrulee from "../assets/creme-brulee.jpeg";
import pumpkinPie from "../assets/pumpkin-pie.jpeg";

// true = use the TheMealDB photos, false = use the local photos in src/assets
const USE_API_PHOTOS = true;

const API_PHOTOS = "https://www.themealdb.com/images/media/meals/";

// `id` is the recipe's ID on TheMealDB
const recipes = [
  { id: "52860", name: "Chocolate Raspberry Brownies", image: brownies, apiImage: API_PHOTOS + "yypvst1511386427.jpg", alt: "Chocolate raspberry brownies" },
  { id: "52897", name: "Carrot Cake", image: carrotCake, apiImage: API_PHOTOS + "vrspxv1511722107.jpg", alt: "Carrot cake with icing" },
  { id: "52958", name: "Peanut Butter Cookies", image: cookies, apiImage: API_PHOTOS + "1544384070.jpg", alt: "Peanut butter cookies" },
  { id: "52917", name: "White Chocolate Creme Brulee", image: cremeBrulee, apiImage: API_PHOTOS + "uryqru1511798039.jpg", alt: "White chocolate creme brulee in a ramekin" },
  { id: "52857", name: "Pumpkin Pie", image: pumpkinPie, apiImage: API_PHOTOS + "usuqtp1511385394.jpg", alt: "Pumpkin pie" },
].map((recipe) => ({ ...recipe, image: USE_API_PHOTOS ? recipe.apiImage : recipe.image }));

export default recipes;
