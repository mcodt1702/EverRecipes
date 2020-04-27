//listenters for three search variables-----listenters for three search variables-----
//listenters for three search variables-----listenters for three search variables-----
//----------------listenters for three search variables-----listenters for three search variables-----
const apiKey = "&apiKey=9e69e52110214fba9df8d2b11c0d0ec1";

function listenToCuisine() {
  $(".navigationSearch").on("click", "#cuisine", function (event) {
    event.preventDefault();
    $(".randomResults").hide();
    $(".searchResults").hide();
    $(".searchResults3").hide();
    $(".searchResults2").show();
    console.log("i hear you want mexican");
    $(".searchResults2").html(renderCuisineForm());
    handleCuisineChoice();
  });
}

function listenToDishes() {
  $(".navigationSearch").on("click", "#dishes", function (event) {
    event.preventDefault();
    $(".randomResults").hide();
    $(".searchResults").hide();
    $(".searchResults3").show();
    $(".searchResults2").hide()
    console.log("i hear you want a special dish");
    $(".searchResults3").html(renderDishForm());
    handleDishChoice();
    
  });
}

function  listentToIngredients() {
  $(".navigationSearch").on("click", "#ingredients", function (event) {
    event.preventDefault();
    $(".randomResults").hide();
    $(".searchResults2").hide();
    $(".searchResults3").hide();
    $(".searchResults").show();

    console.log("i hear you have ingredients to use");
    $(".searchResults").html(renderIngredientsForm());
     handleIngredientChoice();
  });
}

function  handleIngredientChoice() {
  $("form").on("submit", function (event) {
    event.preventDefault();
    let ingredient = $("#firstIngredient").val();
    console.log(ingredient);
    $("#firstIngredient").val("")
    fetchRecipiesIngredients(ingredient);
  });
}

function handleDishChoice(){ 
  $("form").on("submit", function (event) {
  event.preventDefault();
  console.log("you cliked to submit choice")
  let dish = $("#dishchoice").val();
  $("#dishchoice").val("");
  fetchRecipiesDish(dish);
})
}

function handleCuisineChoice() {
  $("#myList").on("change", function (event) {
    event.preventDefault();
    const aquireCuisine = $(".cuisineSelection").val();
    console.log(aquireCuisine);
    fetchRecipiesCuisine(aquireCuisine); 
    
  });
}

function listenToExpandedIngredientSearch() {
  $(".searchResults").on("click", function (event) {
    event.preventDefault();
    console.log("you want to expand the recipe");

    console.log($(".searchResults").attr("id"));

    fetchURLwithId();
  });
}

//render--------render--------render--------render--------render--------render--------render--------render
//--------render--------render--------render--------render--------render--------render--------render

function render() {
  $("body").html(renderStartPage());
  $(".randomResults").show();
  $(".searchResults2").hide();
  $(".searchResults3").hide();
  $(".searchResults").hide();


}

//render--------render--------render--------render--------render--------render--------render--------render
//--------render--------render--------render--------render--------render--------render--------

function renderStartPage() {
  fetchRandomRecipies();
  return `
    <div>
      <header>   
            <div class="headercont"> 
                <h1>Ever Recipes</h1>
                  <nav class="navigationSearch">
                      <div class="nav" id="dishes">Grocery Items</div>
                      <div class="nav" id="ingredients">Recipes by Ingredients</div>
                      <div class="nav" id="cuisine">Recipes by Cuisines</div>
                  </nav>
             </div>         
               <hr>    
      </header>
                
      <main>
        <section class="randomResults" id="results">
          <h2>Today's Suggestions</h2>
        </section>  
        <section class="searchResults" id="results">
        <h1>Recipies with your igredient</h1>
        </section>
        <section class="searchResults2" id="results2">
        <h1>Recipies with your ingredient</h1>
        </section>
        <section class="searchResults3" id="results3"></section>
        <section class="suggestions" id="hideme"></section>
      </main>
    </div>
    `;
}
//render--------render--------render--------render--------render--------render--------render--------render
//--------render--------render--------render--------render--------render--------render--------
function renderRandom(responseJson) {
  for (let i = 0; i < responseJson.recipes.length; i++)
    $(".randomResults").append(`

  <div class= "randomRecipies" id='randomRecipies'>
        <a href="${responseJson.recipes[i].sourceUrl}">
          <img id="randomRecipeImage" src=${responseJson.recipes[i].image}>
          <p id="RecipeTitle">${responseJson.recipes[i].title}</p>
          <p>Click Me To See Full Recipe</p>
        </a>
  <br>      
  </div><br> <br> <br> `);
}

function renderIngredientsForm() {
  return `
    <form>
      <h2>What ingredients do you want in your recipe?</h2>
      <h5>To search multiple ingredients separete them with a coma,</h5>
      <div id="one"><input type="text" id="firstIngredient" class="addfirstIngredient">
          <button type="submit" class="addfirstIngredient">Submit</button>
      </div>
    </form>
    
`;
}



function renderDishForm(){
  return `
    <form>
      <h2>What dish are you looking for?</h2>
      <div id="one"><input type="text" id="dishchoice" class="dishchoice">
          <button type="submit" class="dishchoice">Submit</button>
      </div>
    </form>
    
`

}


function renderDishResults(responseJson){
  console.log(responseJson);
  $(".searchResults3").html("");
  for (let i = 0; i < responseJson.products.length; i++) {
    $(".searchResults3").append(`

          <div id='ingredientRecipies'>
            <img id="ingredientRecipeImage" src=${responseJson.products[i].image}>
            <h3 id="RecipeTitle">${responseJson.products[i].title}</h3>
              <button type="submit" onclick="gotoURL()">Get Items</button>
          </div><br><br> `);
  }


}


//render--------render--------render--------render--------render--------render--------render--------render
//--------render--------render--------render--------render--------render--------render--------
function gotoRecipe(recipeId) {
  fetchURLwithId(recipeId);
}

//render--------render--------render--------render--------render--------render--------render--------render
//--------render--------render--------render--------render--------render--------render--------


function renderIngredientResults(responseJson) {
  console.log(responseJson);
  for (let i = 0; i < responseJson.length; i++) {
    $(".searchResults").append(`

          <div id='ingredientRecipies'>
            <img id="ingredientRecipeImage" src=${responseJson[i].image}>
            <h3 id="RecipeTitle">${responseJson[i].title}</h3>
            <button type="submit" onclick="gotoRecipe(${responseJson[i].id})">Get Recipe</button>
          </div> `);
  }
 

}



//render--------render--------render--------render--------render--------render--------render--------render
//--------render--------render--------render--------render--------render--------render--------

function renderCuisineForm() {
  return `
  <form>
  <fieldset>
     <legend><h2>Select Cuisine</h2></legend>
     
        
        <select id = "myList" class = "cuisineSelection">
              <option value "" selected disabled>Select One</option>
              <option value = "African">African</option>
              <option value = "American">American</option>
              <option value = "British">British</option>
              <option value = "Cajun">Cajun</option>
              <option value = "Caribbean">Caribbean</option>
              <option value = "Chinese">Chinese</option>
              <option value = "Eastern European">Eastern European</option>
              <option value = "French">French</option>
              <option value = "German">German</option>
              <option value = "Greek">Greek</option>
              <option value = "Indian">Indian</option>
              <option value = "Irish">Irish</option>
              <option value = "Italian">Italian</option>
              <option value = "Japanese">Japanese</option>
              <option value = "Mexican">Mexican</option>
              <option value = "Middle Eastern">Middle Eastern</option>
              <option value = "Spanish">Spanish</option>
              <option value = "Thai">Thai</option>
              <option value = "Vietnamese">Vietnamese</option>
              <option value = "Jewish">Jewish</option>
        </select>
  </fieldset>
</form>
`;
}




function renderCuisine(responseJson){
console.log("Im about to render the responseJson")
console.log(responseJson);
$('.searchResults3').show();
$('.searchResults2').hide();
$('.searchResults').hide();
for (let i=0; i < responseJson.results.length; i++){
console.log(responseJson.results[i].title)
let url = responseJson.results[i].sourceUrl
$('.searchResults3').append(`
<div id="ingredientRecipies">
<br><br>            
<a href="${url}"><img id="ingredientRecipeImage" src="https://spoonacular.com/recipeImages/${responseJson.results[i].image}">
            <h3 id="RecipeTitle">${responseJson.results[i].title}</h3></a>
            <p><a href="${url}">Click to go to the recipie</a></p>
              
          </div>` );

}

}


function gotoURL(){
  
  window.location.assign("https://www.wholefoodsmarket.com/amazon")


}

// //---------------fetch api functions---------------fetch api functions---------------fetch api functions
// //fetch api functions-----------------------fetch api functions---------------fetch api functions---------------fetch api functions
// //---------------fetch api functions---------------fetch api functions---------------fetch api functions

function fetchRandomRecipies() {
  randomBaseUrl =
    "https://api.spoonacular.com/recipes/random?number=5&apiKey=9e69e52110214fba9df8d2b11c0d0ec1";

  fetch(randomBaseUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => renderRandom(responseJson));
}


// //---------------fetch api functions---------------fetch api functions---------------fetch api functions
// //fetch api functions-----------------------fetch api functions---------------fetch api functions---------------fetch api functions
// //---------------fetch api functions---------------fetch api functions---------------fetch api functions



function fetchRecipiesIngredients(ingredient) {
  ingredientBaseURL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}${apiKey}`;
  console.log(ingredientBaseURL);

  fetch(ingredientBaseURL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => renderIngredientResults(responseJson));
}


// //---------------fetch api functions---------------fetch api functions---------------fetch api functions
// //fetch api functions-----------------------fetch api functions---------------fetch api functions---------------fetch api functions
// //---------------fetch api functions---------------fetch api functions---------------fetch api functions


function fetchURLwithId(fetchURLwithId) {
  console.log("recipe id =", fetchURLwithId);

let idBaseURL = `https://api.spoonacular.com/recipes/${fetchURLwithId}/information?includeNutrition=false${apiKey}`


fetch(idBaseURL)
.then((response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
})
.then((responseJson) => window.location.assign(`${responseJson.sourceUrl}`));
console.log('see you later aligator')

}


function fetchRecipiesCuisine(aquireCuisine){
cuisineBaseURL = `https://api.spoonacular.com/recipes/search?cuisine=${aquireCuisine}${apiKey}`
console.log(cuisineBaseURL);
          fetch(cuisineBaseURL)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.statusText);
          })
          .then((responseJson) => renderCuisine(responseJson));
          

}

 function fetchRecipiesDish(dish){
  dishBaseURL = `https://api.spoonacular.com/food/products/search?query=${dish}${apiKey}`

  fetch(dishBaseURL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then((responseJson) => renderDishResults(responseJson));


  console.log(dishBaseURL);
}






function handleRecipies() {
  render();
  listenToDishes();
   listentToIngredients();
  listenToCuisine();
}

$(handleRecipies);
