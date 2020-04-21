//listenters
function listenToDishes(){
$('.navigationSearch').on('click', '#dishes', function(event) {
    event.preventDefault();
    $('.searchResults').hide();
    console.log('i hear you want a dish');


})}


function listenToIngredients(){
    $('.navigationSearch').on('click', '#ingredients', function(event) {
        event.preventDefault();
        $('.searchResults').empty();
        console.log('i hear you have ingredients to use');
        $('.searchResults').html(renderIngredientsForm())
        listenToAddSecondIngredient();
        listenToAddThirdIngredient();
       
    
    })}


function listenToAddSecondIngredient(){

$('form').on('click', '.addfirstIngredient', function(event){
  event.preventDefault();
  
  $('input, button').removeClass('addsecondingredient');
 console.log('you want to add a second ingredient')
})
//removeClass('addsecondingredient');

}

function listenToAddThirdIngredient(){
  $('form').on('click', '#addThirdIngredient', function(event){
    event.preventDefault();
    $('input, button').removeClass('addThirdIngredient');
    console.log('you want to add a third ingredient')
   
    
   
  })
  

}

    


    function listenToCuisine(){
        $('.navigationSearch').on('click', '#cuisine', function(event) {
            event.preventDefault();
            $('.searchResults').hide();
            console.log('i hear you want mexican');
        
        })}
        



function render(){
$('body').html(renderStartPage())
}


function renderStartPage(){
    fetchRandomRecipies()
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





function fetchRandomRecipies(){
randomBaseUrl= '111https://api.spoonacular.com/recipes/random?number=5&apiKey=9e69e52110214fba9df8d2b11c0d0ec1'

fetch(randomBaseUrl)
.then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
.then((responseJson) => renderRandom(responseJson))

}

function renderRandom(responseJson){


for (let i=0; i < responseJson.recipes.length; i++)

$('.searchResults').append(`

  <div id='randomRecipies'>
  <img id="randomRecipeImage" src=${responseJson.recipes[i].image}
      <h3 id="randomRecipeTitle">${responseJson.recipes[i].title}</h3>
        <p>${responseJson.recipes[i].summary}</p>
        

  </div>`
)
 
 }





//renderIngredientsPage

function renderIngredientsForm(){


return `

<form>
    <div><input type="text" class="addfirstIngredient">
        <button class="addfirstIngredient">Add Ingredient</button>
    </div>
    <div >
    <input type="text" id="secondIngredient" class="addsecondingredient">
        <button class="addsecondingredient">Add Ingredient</button>
    </div>    
    <div>
        <input id="addThirdIngredient" class="addThirdIngredient" type="text">
        <button class="addThirdIngredient">submit</button>
    </div>
    
</form>`
}



function fetchRecipiesIngredients(){
ingredientBaseURL = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients='

stringIngredients()




}
function renderDishesPage(){

    


 }


//renderCuisinePage

//renderDishesPage

function handleRecipies(){
    render()
    listenToDishes()
    listenToIngredients()
    listenToAddThirdIngredient()
    listenToCuisine()



}

$(handleRecipies)