// https://forkify-api.herokuapp.com/api/search?q=pizza
import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';
/* Global state of the app
 *-- Search object
 *-- Current recipe object
 *--Shopping list object
 *--Liked recipe
 */
/**Search Controller* */
const state = {};
const controlSearch = async() => {
    // 1. Get Query from View
    const query = searchView.getInput(); //TODO
    if (query) {
        // 2. new Search Object and add to state
        state.search = new Search(query);
        //3. Project UI for results
        searchView.clearResults();
        searchView.clearInput();
        renderLoader(elements.searchRes);
        // 4. Search for recipes
        try {
            await state.search.getResults();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something went wrong with the search!');
        }
        // 5. Render results on UI
        clearLoader();
    }
};
elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    controlSearch();
});
elements.searchResPages.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});
/*Recipe Contoller*/
const controlRecipe = async() => {
    //Get id from url
    const id = window.location.hash.replace('#', '');
    if (id) {
        //highlight selected
        if (state.search) {
            searchView.highlightedSelected(id);
        }
        //Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        //Create new Recipe object
        state.recipe = new Recipe(id);
        //Get recipe data
        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            //Get servings and time
            state.recipe.calcServings();
            state.recipe.calcTime();
            //Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            alert('error processing recipe');
        }
    }
};
['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlRecipe));

//Handling recipe button clicks
elements.recipe.addEventListener('click', (e) => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        //Decrease btn is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServing('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase , .btn-increase *')) {
        //increase btn is clicked
        state.recipe.updateServing('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
});