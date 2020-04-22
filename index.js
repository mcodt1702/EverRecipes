//listenters for three search variables-----listenters for three search variables-----
//listenters for three search variables-----listenters for three search variables-----
//----------------listenters for three search variables-----listenters for three search variables-----
const apiKey = '&apiKey=9e69e52110214fba9df8d2b11c0d0ec1'

function listenToCuisine(){
  $('.navigationSearch').on('click', '#cuisine', function(event) {
      event.preventDefault();
      $('.searchResults').hide();
      console.log('i hear you want mexican');
  
  })}

function listenToDishes() {
  $(".navigationSearch").on("click", "#dishes", function (event) {
    event.preventDefault();
    $(".searchResults").hide();
    console.log("i hear you want a dish");
  });
}

function listenToIngredients() {
  $(".navigationSearch").on("click", "#ingredients", function (event) {
    event.preventDefault();
    $(".searchResults").empty();
    console.log("i hear you have ingredients to use");
    $(".searchResults").html(renderIngredientsForm());
    listenToIngredient()
  });
}

function listenToIngredient(){
$('form').on('submit', function(event){
  event.preventDefault();
  let ingredient = $('#firstIngredient').val()
console.log(ingredient);
fetchRecipiesIngredients(ingredient);


})



}




//render--------render--------render--------render--------render--------render--------render--------render
//--------render--------render--------render--------render--------render--------render--------render

function render() {
  $("body").html(renderStartPage());
}

function renderStartPage() {
  fetchRandomRecipies();
  return `
    <div>
    <header>            
                <h1>Ever Recipes</h1>
                <nav class="navigationSearch">
                <button class="nav" id="dishes">Dishes</button>
                <button class="nav" id="ingredients">Ingredients</button>
                <button class="nav" id="cuisine">Cuisines</button>
                </nav>
                
     
    </header>
                
                  <main>
                    <section class="searchResults" id="results">
                    <h1>SUGGESTIONS FOR YOU</h1>
                     
                    
                    </section>
                    <section class="suggestions" id="hideme"></section>
                  </main>
    </div>
    `
}

function renderRandom(responseJson) {
  for (let i = 0; i < responseJson.recipes.length; i++)
    $(".searchResults").append(`

  <div id='randomRecipies'>
  <img id="randomRecipeImage" src=${responseJson.recipes[i].image}
      <h3 id="randomRecipeTitle">${responseJson.recipes[i].title}</h3>
        <p>${responseJson.recipes[i].summary}</p>
        

  </div>`);
}

function renderIngredientsForm() {
  return `
    <form>
      <div id="one"><input type="text" id="firstIngredient" class="addfirstIngredient">
          <button type="submit" class="addfirstIngredient">Submit</button>
      </div>
    </form>
    
`
}

// //---------------fetch api functions---------------fetch api functions---------------fetch api functions
// //fetch api functions-----------------------fetch api functions---------------fetch api functions---------------fetch api functions
// //---------------fetch api functions---------------fetch api functions---------------fetch api functions

function fetchRandomRecipies() {
  randomBaseUrl =
    "111https://api.spoonacular.com/recipes/random?number=5&apiKey=9e69e52110214fba9df8d2b11c0d0ec1";

  fetch(randomBaseUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => renderRandom(responseJson));
}

function fetchRecipiesIngredients(ingredient) {
 ingredientBaseURL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}${apiKey}`;
console.log(ingredientBaseURL);

   fetch (ingredientBaseURL)
    .then((response) => {
     if (response.ok) {
       return response.json();
    }
     throw new Error(response.statusText);
  })
   .then((responseJson) => renderIngredientResults(responseJson));
  
}


 function renderIngredientResults(responseJson){
 console.log(responseJson)
 for (let i = 0; i < responseJson.length; i++)
 $(".searchResults").append(`

<div id='randomRecipies'>
<img id="randomRecipeImage" src=${responseJson[i].image}
   <h3 id="randomRecipeTitle">${responseJson[i].title}</h3>
     <p>${responseJson[i].id}</p>
     

</div>`);




}





function handleRecipies() {
  render();
  listenToDishes();
  listenToIngredients();
  listenToCuisine();
}

$(handleRecipies);
