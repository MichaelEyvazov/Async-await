// let cocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
// let ingredientUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?i=';

// let cocktailNameElement = document.getElementById('cocktail-name');
// let cocktailImageElement = document.getElementById('cocktail-image');
// let ingredientsListElement = document.getElementById('ingredients-list');
// let searchButton = document.getElementById('search-button');
// let searchInput = document.getElementById('search-input');

// async function getCocktailData() {
//   try {
//     let response = await fetch(cocktailUrl);
//     let data = await response.json();
//     let cocktail = data.drinks[0];
//     let cocktailImage = cocktail.strDrinkThumb;
//     cocktailNameElement.textContent = cocktail.strDrink;
//     cocktailImageElement.src = cocktailImage;
//     ingredientsListElement.innerHTML = '';
//     for (let i = 1; i <= 15; i++) {
//       if (cocktail[`strIngredient${i}`]) {
//         let ingredientName = cocktail[`strIngredient${i}`];
//         let listItem = document.createElement('li');
//         listItem.textContent = ingredientName;
//         ingredientsListElement.appendChild(listItem);
//         await getIngredientData(ingredientName);
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function getIngredientData(ingredientName) {
//   try {
//     let response = await fetch(ingredientUrl + ingredientName);
//     let data = await response.json();
//     console.log(data.ingredients[0]);
//   } catch (error) {
//     console.error(error);
//   }
// }

// searchButton.addEventListener('click', () => {
//   let searchTerm = searchInput.value.trim();
//   if (searchTerm) {
//     setTimeout(getIngredientData(searchTerm), 1000);
//   }
// });

// getCocktailData();
let cocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
let ingredientUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

let cocktailNameElement = document.getElementById('cocktail-name');
let cocktailImageElement = document.getElementById('cocktail-image');
let ingredientsListElement = document.getElementById('ingredients-list');
let searchButton = document.getElementById('search-button');
let searchInput = document.getElementById('search-input');

async function getCocktailData() {
  try {
    let response = await fetch(cocktailUrl);
    let data = await response.json();
    let cocktail = data.drinks[0];
    let cocktailImage = cocktail.strDrinkThumb;
    cocktailNameElement.textContent = cocktail.strDrink;
    cocktailImageElement.src = cocktailImage;
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
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function searchIngredients() {
  try {
    let searchTerm = searchInput.value.trim();
    console.log(searchTerm);
    if (searchTerm !== '') {
      let response = await fetch(ingredientUrl + searchTerm);
      let data = await response.json();
      let cocktail = data.drinks[0];
      let cocktailImage = cocktail.strDrinkThumb;
      cocktailNameElement.textContent = cocktail.strDrink;
      cocktailImageElement.src = cocktailImage;
      ingredientsListElement.innerHTML = '';
      for (let i = 1; i <= 15; i++) {
        if (cocktail[`strIngredient${i}`]) {
          let ingredientName = cocktail[`strIngredient${i}`];
          let listItem = document.createElement('li');
          listItem.textContent = ingredientName;
          ingredientsListElement.appendChild(listItem);
          await getIngredientData(ingredientName);
        }
        // } else {
        //   let listItem = document.createElement('li');
        //   listItem.textContent = 'No results found.';
        //   ingredientsListElement.appendChild(listItem);
        // }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

searchButton.addEventListener('click', searchIngredients);

getCocktailData();

