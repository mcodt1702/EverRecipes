//listenters for three search variables-----listenters for three search variables-----
//listenters for three search variables-----listenters for three search variables-----
//----------------listenters for three search variables-----listenters for three search variables-----
const apiKey = "&apiKey=9e69e52110214fba9df8d2b11c0d0ec1";

function listenToCuisine() {
  $(".navigationSearch").on("click", "#cuisine", function (event) {
    event.preventDefault();
    $(".randomResults").hide();
    $(".searchResults").hide();
    $(".searchResults2").show();
    console.log("i hear you want mexican");
    $(".searchResults2").html(renderCuisineForm());
    listenToDropDownMenu();
  });
}

function listenToDishes() {
  $(".navigationSearch").on("click", "#dishes", function (event) {
    event.preventDefault();
    $(".searchResults").hide();
    $(".searchResults2").hide();
    $(".randomResults").hide();
    console.log("i hear you want a dish");
  });
}

function  handleIngredientChoices() {
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
    fetchRecipiesIngredients(ingredient);
  });
}

function listenToDropDownMenu() {
  $("#myList").on("click change", function (event) {
    event.preventDefault();
    console.log("you selected a cuisine");
    const aquireCuisine = $(".cuisineSelection").val();
    console.log(aquireCuisine);
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
                  <h1>Ever Recipes</h1>
                  <nav class="navigationSearch">
                  <button class="nav" id="dishes">Dishes</button>
                  <button class="nav" id="ingredients">Ingredients</button>
                  <button class="nav" id="cuisine">Cuisines</button>
                  </nav>  
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

  <div id='randomRecipies'>
  <img id="randomRecipeImage" src=${responseJson.recipes[i].image}>
      <h3 id="randomRecipeTitle">${responseJson.recipes[i].title}</h3>
        <p>${responseJson.recipes[i].summary}</p>
        

  </div>`);
}

function renderIngredientsForm() {
  return `
    <form>
      <h2>What ingrediet do you want in your recipe?</h2>
      <div id="one"><input type="text" id="firstIngredient" class="addfirstIngredient">
          <button type="submit" class="addfirstIngredient">Submit</button>
      </div>
    </form>
    
`;
}


//render--------render--------render--------render--------render--------render--------render--------render
//--------render--------render--------render--------render--------render--------render--------
function gotoRecipe(recipeId) {
  fetchURLwithId(recipeId);
}

function renderIngredientResults(responseJson) {
  console.log(responseJson);
  // let id = 0;
  for (let i = 0; i < responseJson.length; i++) {
    $(".searchResults").append(`

          <div id='ingredientRecipies${i}'>
            <img id="ingredientRecipeImage" src=${responseJson[i].image}>
            <h3 id="ingredientRecipeTitle">${responseJson[i].title}</h3>
              <p>${responseJson[i].id}</p>
           
              <button type="submit" onclick="gotoRecipe(${responseJson[i].id})">Get Recipe</button>
              <br><br>
          </div><br><br>      `);
  }
  // listenToExpandedIngredientSearch();
  //id[i] = responseJson[i].id
}

function renderCuisineForm() {
  return `
  <form>
  <fieldset>
     <legend><h2>Select Cuisine</h2></legend>
     <p>
        <label for= "Cuisine">Select list</label>
        <select id = "myList" class = "cuisineSelection">
        <option selected disabled></option>
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
     </p>
  </fieldset>
</form>
`;
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
}





function handleRecipies() {
  render();
  listenToDishes();
   handleIngredientChoices();
  listenToCuisine();
}

$(handleRecipies);
