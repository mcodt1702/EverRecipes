//listenters for three search variables-----listenters for three search variables-----
//listenters for three search variables-----listenters for three search variables-----
//----------------listenters for three search variables-----listenters for three search variables-----
const apiKey = "&apiKey=9e69e52110214fba9df8d2b11c0d0ec1";
const apiBaseUrl = "https://api.spoonacular.com/";

function listenToCuisine() {
  $(".navigationSearch").on("click", "#cuisine", function (event) {
    event.preventDefault();
    $(".randomResults").hide();
    $(".searchResults").hide();
    $(".searchResults3").hide();
    $(".searchResults2").show();
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

   
    $(".searchResults").html(renderIngredientsForm());
     handleIngredientChoice();
  });
}

function  handleIngredientChoice() {
  $("form").on("submit", function (event) {
    event.preventDefault();
    let ingredient = $("#firstIngredient").val();
 
    $("#firstIngredient").val("")
    fetchRecipiesIngredients(ingredient);
  });
}

function handleDishChoice(){ 
  $("form").on("submit", function (event) {
  event.preventDefault();

  let dish = $("#dishchoice").val();
  $("#dishchoice").val("");
  fetchRecipiesDish(dish);
})
}

function handleCuisineChoice() {
  $("#myList").on("change", function (event) {
    event.preventDefault();
    const aquireCuisine = $(".cuisineSelection").val();
  
    fetchRecipiesCuisine(aquireCuisine); 
    
  });
}

function listenToExpandedIngredientSearch() {
  $(".searchResults").on("click", function (event) {
    event.preventDefault();
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
        <section class="randomResults" id="resultsrandom">
          <h2>Today's Suggestions</h2>
        </section>  
        <section class="searchResults" id="results">
        <h2>Recipies with your igredient</h2>
        </section>
        <section class="searchResults2" id="results2">
        <h2>Recipies with your ingredient</h2>
        </section>
        <section class="searchResults3" id="results3">
        <h2>Recipes by Cuisine</h2></section>
        
      </main>
    </div>
    `;
}
//render--------render--------render--------render--------render--------render--------render--------render
//--------render--------render--------render--------render--------render--------render--------
function renderRandom(responseJson) {
  for (let i = 0; i < responseJson.recipes.length; i++)
    $(".randomResults").append(`

  <div class= "randomRecipies">
        <a href="${responseJson.recipes[i].sourceUrl}" target="blank">
          <img class="randomRecipeImage" src=${responseJson.recipes[i].image}  alt="image random recipes">
          <p class="RecipeTitle">${responseJson.recipes[i].title}</p>
          <p>Click Me To See Full Recipe</p>
        </a>
  <br>      
  </div><br> <br> <br> `);
}

function renderIngredientsForm() {
  return `
    <form>
      <h2>What ingredients do you want in your recipe?</h2>
      <h5>To search multiple ingredients separate them with a coma,</h5>
      <div id="one"><input type="text" id="firstIngredient" class="addfirstIngredient">
          <button type="submit" class="addfirstIngredient">Submit</button>
      </div>
    </form>
    
`;
}



function renderDishForm(){
  return `
    <form>
      <h2>What product are you looking for?</h2>
      <div id="one"><input type="text" id="dishchoice" class="dishchoice">
          <button type="submit" class="dishchoice">Submit</button>
      </div>
    </form>
    
`

}


function renderDishResults(responseJson){
console.log(dishBaseURL)
$(".searchResults3").html("");
  if (!responseJson || responseJson.products.length === 0){

    $(".searchResults3").append(`<p class="errorMessage">We don't know that item please try again</p>`)
  }

 
      

  
  for (let i = 0; i < responseJson.products.length; i++) {
    $(".searchResults3").append(`

          <div id='ingredientRecipies'>
            <img id="ingredientRecipeImage" src=${responseJson.products[i].image}  alt="image of serched recipes">
            <h3 class="RecipeTitle">${responseJson.products[i].title}</h3>
              <button class="buttonItem" type="submit" onclick="gotoURL()">Get Items</button>
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
  $(".searchResults").html("");

  if (!responseJson ||  responseJson.length === 0){

    $(".searchResults").append(`<p class="errorMessage"> We Don't Know That Ingredient Please Try Anotherone</p>`)
  }

  
  for (let i = 0; i < responseJson.length; i++) {
    $(".searchResults").append(`

          <div id='ingredientRecipies'>
            <img id="ingredientRecipeImage" src=${responseJson[i].image}  alt="image of item">
            <h3 class="RecipeTitle">${responseJson[i].title}</h3>
            <button class="buttonItem" type="submit" onclick="gotoRecipe(${responseJson[i].id})">Get Recipe</button>
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
  $(".searchResults2").html("");
$('.searchResults3').hide();
$('.searchResults2').show();
$('.searchResults').hide();

$('.searchResults2').append(`<p class="errorMessage2">Your recipes</p>`)
for (let i=0; i < responseJson.results.length; i++){

let url = responseJson.results[i].sourceUrl
$('.searchResults2').append(`
<div id="ingredientRecipies">
<br><br>            
<a href="${url}" target="blank"><img id="ingredientRecipeImage" src="https://spoonacular.com/recipeImages/${responseJson.results[i].image}" alt="image of recipe">
            <h3 class="RecipeTitle">${responseJson.results[i].title}</h3></a>
            <p><a href="${url}" target="blank">Click to go to the recipie</a></p>
              
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
randomBaseUrl =`${apiBaseUrl}recipes/random?number=5${apiKey}`;

fetch(randomBaseUrl)
.then((response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
})
.catch((error)=> alert(error))

.then((responseJson) => renderRandom(responseJson));




}





// //---------------fetch api functions---------------fetch api functions---------------fetch api functions
// //fetch api functions-----------------------fetch api functions---------------fetch api functions---------------fetch api functions
// //---------------fetch api functions---------------fetch api functions---------------fetch api functions



function fetchRecipiesIngredients(ingredient) {
  ingredientBaseURL = `${apiBaseUrl}recipes/findByIngredients?ingredients=${ingredient}${apiKey}`;


  fetch(ingredientBaseURL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    //throw new Error(response.statusText);
  })
  .then((responseJson) => renderIngredientResults(responseJson));
}


// //---------------fetch api functions---------------fetch api functions---------------fetch api functions
// //fetch api functions-----------------------fetch api functions---------------fetch api functions---------------fetch api functions
// //---------------fetch api functions---------------fetch api functions---------------fetch api functions


function fetchURLwithId(fetchURLwithId) {
 

let idBaseURL = `${apiBaseUrl}recipes/${fetchURLwithId}/information?includeNutrition=false${apiKey}`


fetch(idBaseURL)
.then((response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
})
.then((responseJson) => window.location.assign(`${responseJson.sourceUrl}`));


}


function fetchRecipiesCuisine(aquireCuisine){
cuisineBaseURL = `${apiBaseUrl}recipes/search?cuisine=${aquireCuisine}${apiKey}`

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
  dishBaseURL = `${apiBaseUrl}food/products/search?query=${dish}${apiKey}`

  
  fetch(dishBaseURL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then((responseJson) => renderDishResults(responseJson));

}



function handleRecipies() {
  render();
  listenToDishes();
   listentToIngredients();
  listenToCuisine();
}

$(handleRecipies);
