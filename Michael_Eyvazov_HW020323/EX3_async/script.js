let cocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
let ingredientUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?i=';

let cocktailNameElement = document.getElementById('cocktail-name');
let ingredientsListElement = document.getElementById('ingredients-list');
let searchButton = document.getElementById('search-button');
let searchInput = document.getElementById('search-input');

async function getCocktailData() {
  try {
    let response = await fetch(cocktailUrl);
    let data = await response.json();
    let cocktail = data.drinks[0];
    cocktailNameElement.textContent = cocktail.strDrink;
    ingredientsListElement.innerHTML = '';
    for (let i = 1; i <= 15; i++) {
      if (cocktail[`strIngredient${i}`]) {
        let ingredientName = cocktail[`strIngredient${i}`];
        let listItem = document.createElement('li');
        listItem.textContent = ingredientName;
        ingredientsListElement.appendChild(listItem);
        await getIngredientData(ingredientName);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function getIngredientData(ingredientName) {
  try {
    let response = await fetch(ingredientUrl + ingredientName);
    let data = await response.json();
    console.log(data.ingredients[0]);
  } catch (error) {
    console.error(error);
  }
}

searchButton.addEventListener('click', () => {
  let searchTerm = searchInput.value.trim();
  if (searchTerm) {
    getIngredientData(searchTerm);
  }
});

getCocktailData();
