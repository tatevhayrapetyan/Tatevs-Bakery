// Recipe carousel (only on pages that have one)

let cardList = document.querySelector(".card-list");
let prevButton = document.querySelector(".carousel-prev");
let nextButton = document.querySelector(".carousel-next");

function updateCarouselButtons() {
    let maxScroll = cardList.scrollWidth - cardList.clientWidth;
    prevButton.disabled = cardList.scrollLeft <= 1;
    nextButton.disabled = cardList.scrollLeft >= maxScroll - 1;
}

if (cardList) {
    // Scroll by one "page" of visible cards
    prevButton.addEventListener("click", function () {
        cardList.scrollBy({ left: -cardList.clientWidth, behavior: "smooth" });
    });
    nextButton.addEventListener("click", function () {
        cardList.scrollBy({ left: cardList.clientWidth, behavior: "smooth" });
    });

    cardList.addEventListener("scroll", updateCarouselButtons);
    window.addEventListener("resize", updateCarouselButtons);
    updateCarouselButtons();

    // Clicking a card loads its recipe
    cardList.addEventListener("click", function (event) {
        let card = event.target.closest(".card-link");
        if (card) {
            showRecipe(card.dataset.mealId, card);
        }
    });
}


// Recipe details

let recipeContainer = document.querySelector(".instructions-container");

function escapeHtml(text) {
    let div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// The API stores ingredients as strIngredient1..20 and strMeasure1..20
function getIngredients(recipe) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        let name = (recipe["strIngredient" + i] || "").trim();
        let measure = (recipe["strMeasure" + i] || "").trim();
        if (name) {
            ingredients.push({ name: name, measure: measure });
        }
    }
    return ingredients;
}

// Split the instructions into steps, dropping "STEP 1"-style labels
function getSteps(recipe) {
    return recipe.strInstructions
        .split(/\r?\n/)
        .map(function (line) {
            return line.replace(/^\s*(step\s*\d+[:.]?|\d+[.)])\s*/i, "").trim();
        })
        .filter(function (line) {
            return line.length > 0;
        });
}

function renderRecipe(recipe) {
    let ingredients = getIngredients(recipe);
    let steps = getSteps(recipe);

    let ingredientItems = ingredients.map(function (item) {
        return "<li><span class=\"measure\">" + escapeHtml(item.measure) + "</span> " + escapeHtml(item.name) + "</li>";
    }).join("");

    let stepItems = steps.map(function (step) {
        return "<li>" + escapeHtml(step) + "</li>";
    }).join("");

    let videoLink = "";
    if (recipe.strYoutube) {
        videoLink = "<a class=\"video-link\" href=\"" + escapeHtml(recipe.strYoutube) + "\" target=\"_blank\" rel=\"noopener\">"
            + "<span class=\"material-symbols-rounded\" aria-hidden=\"true\">play_circle</span> Watch the video</a>";
    }

    recipeContainer.innerHTML =
        "<article class=\"recipe\">"
        + "<div class=\"recipe-top\">"
        +   "<img class=\"recipe-image\" src=\"" + escapeHtml(recipe.strMealThumb) + "\" alt=\"" + escapeHtml(recipe.strMeal) + "\">"
        +   "<div class=\"recipe-intro\">"
        +     "<p class=\"eyebrow\">" + escapeHtml(recipe.strCategory) + " · " + escapeHtml(recipe.strArea) + "</p>"
        +     "<h2 class=\"recipe-title\">" + escapeHtml(recipe.strMeal) + "</h2>"
        +     "<p class=\"recipe-meta\">" + ingredients.length + " ingredients · " + steps.length + " steps</p>"
        +     videoLink
        +   "</div>"
        + "</div>"
        + "<div class=\"recipe-body\">"
        +   "<div class=\"ingredients\"><h3>Ingredients</h3><ul class=\"ingredient-list\">" + ingredientItems + "</ul></div>"
        +   "<div class=\"steps\"><h3>Method</h3><ol class=\"step-list\">" + stepItems + "</ol></div>"
        + "</div>"
        + "</article>";
}

function showMessage(message) {
    recipeContainer.innerHTML = "<div class=\"recipe-placeholder\"><p>" + escapeHtml(message) + "</p></div>";
}

async function showRecipe(mealId, card) {
    // Highlight the chosen card
    document.querySelectorAll(".card-link").forEach(function (otherCard) {
        otherCard.classList.remove("selected");
        otherCard.setAttribute("aria-pressed", "false");
    });
    card.classList.add("selected");
    card.setAttribute("aria-pressed", "true");

    showMessage("Loading recipe...");
    recipeContainer.scrollIntoView({ behavior: "smooth", block: "start" });

    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + encodeURIComponent(mealId);

    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error("Request failed with status " + response.status);
        }

        let data = await response.json();
        if (!data.meals) {
            showMessage("Sorry, we couldn't find this recipe.");
            return;
        }

        renderRecipe(data.meals[0]);
    } catch (error) {
        showMessage("Something went wrong while loading the recipe. Please try again.");
    }
}


// Contact form (opens the visitor's email app with the message filled in)

let contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = contactForm.elements.name.value.trim();
        let email = contactForm.elements.email.value.trim();
        let message = contactForm.elements.message.value.trim();

        let subject = "Message from " + name;
        let body = message + "\n\nFrom: " + name + " (" + email + ")";

        window.location.href = "mailto:tatev.bakery@gmail.com"
            + "?subject=" + encodeURIComponent(subject)
            + "&body=" + encodeURIComponent(body);

        document.querySelector(".form-status").textContent = "Thank you! Your email app should open so you can send the message.";
        contactForm.reset();
    });
}
