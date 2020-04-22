//listenters for three search variables-----listenters for three search variables-----
//listenters for three search variables-----listenters for three search variables-----
//----------------listenters for three search variables-----listenters for three search variables-----
const apiKey = "&apiKey=9e69e52110214fba9df8d2b11c0d0ec1";

function listenToCuisine() {
  $(".navigationSearch").on("click", "#cuisine", function (event) {
    event.preventDefault();
    
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
    console.log("i hear you want a dish");
    
  });
}

function listenToIngredients() {
  $(".navigationSearch").on("click", "#ingredients", function (event) {
    event.preventDefault();
    $(".searchResults2").hide();
    $(".searchResults3").hide(); 
    $(".searchResults").show();
    
    console.log("i hear you have ingredients to use");
    $(".searchResults").html(renderIngredientsForm());
    listenToIngredient();
  });
}

function listenToIngredient() {
  $("form").on("submit", function (event) {
    event.preventDefault();
    let ingredient = $("#firstIngredient").val();
    console.log(ingredient);
    fetchRecipiesIngredients(ingredient);
  });
}


function listenToDropDownMenu(){
$('#myList').on('click change', function(event){
event.preventDefault();
console.log('you selected a cuisine')
const aquireCuisine = parseInt($('.cuisineSelection').val());
console.log(aquireCuisine);



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
                    <section class="searchResults" id="results"></section>
                    <section class="searchResults2" id="results2"></section>
                    <section class="searchResults3" id="results3"></section>
                    <h1>SUGGESTIONS FOR YOU</h1>
                     
                    
                    </section>
                    <section class="suggestions" id="hideme"></section>
                  </main>
    </div>
    `;
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
    
`;
}

function renderIngredientResults(responseJson) {
  console.log(responseJson);
  let id = 0
  for (let i = 0; i < responseJson.length; i++)
    $(".searchResults").append(`

          <div id='ingredientRecipies'>
            <img id="ingredientRecipeImage" src=${responseJson[i].image}>
            <h3 id="ingredientRecipeTitle">${responseJson[i].title}</h3>
              <p>${responseJson[i].id}</p>
           
              <button type="submit" class="getid${i}">Get Recipe</button>
              <br><br>
              

          </div><br><br>`);

  id[i] = responseJson[i].id
}

function renderCuisineForm() {
  return `
  <form>
  <fieldset>
     <legend>Select Cuisines</legend>
     <p>
        <label for= "Cuisine">Select list</label>
        <select id = "myList" class = "cuisineSelection">
        <option selected disabled>Select Cuisine</option>
          <option value = 1>African</option>
          <option value = 2>American</option>
          <option value = 3>British</option>
          <option value = 4>Cajun</option>
          <option value = 5>Caribbean</option>
          <option value = 6>Chinese</option>
          <option value = 7>Eastern European</option>
          <option value = 8>French</option>
          <option value = 9>German</option>
          <option value = 10>Greek</option>
          <option value = 11>Indian</option>
          <option value = 12>Irish</option>
          <option value = 13>Italian</option>
          <option value =14>Japanese</option>
          <option value = 15>Mexican</option>
          <option value = 16>Middle Eastern</option>
          <option value = 17>Spanish</option>
          <option value =18>Thai</option>
          <option value =19>Vietnamese</option>
          <option value ="Jewish">Jewish</option>
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

  fetch(ingredientBaseURL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => renderIngredientResults(responseJson));
}



function handleRecipies() {
  render();
  listenToDishes();
  listenToIngredients();
  listenToCuisine();
}

$(handleRecipies);
