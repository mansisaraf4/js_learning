// https://forkify-api.herokuapp.com/api/search?q=pizza
import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
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
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id));
        } catch (error) {
            console.log(error);
            alert('error processing recipe');
        }
    }
};
['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlRecipe));

/*LIST CONTROLLER */
const controlList = () => {
    //Create a new list if there is not one yet
    if (!state.list) state.list = new List();
    //Add each ingredient to list and UI
    state.recipe.ingredients.forEach((el) => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};

//handle delete and update item buttons
elements.shopping.addEventListener('click', (e) => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    //Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        //Delete from state
        state.list.deleteItem(id);
        //Delete from UI
        listView.deleteItem(id);
        //Handle count update
    } else if (e.target.matches('.shopping__count--value')) {
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
    }
});

/*LIKE CONTROLLER */
const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentId = state.recipe.id;
    if (!state.likes.isLiked(currentId)) {
        //user has not yet liked current recipe
        //1. Add like to state
        const newLike = state.likes.addLike(currentId, state.recipe.title, state.recipe.author, state.recipe.img);
        //2. Add like to UI list
        likesView.renderLikes(newLike);
    } else {
        //user has already liked the current recipe
        //1. Remove like from state
        state.likes.deleteLike(currentId);

        //2. Remove like from UI list
        likesView.deleteLike(currentId);
    }
    //Toggle the like button
    likesView.toggleLikeBtn(state.likes.isLiked(currentId));
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};
// Restore likes recipe on page reload
window.addEventListener("load", () => {
    state.likes = new Likes();
    //restore likes
    state.likes.readStorage();
    //count no of likes
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    //fetch likes
    state.likes.likes.forEach(like => likesView.renderLikes(like));
});

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
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //add ingredient to list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        //Like Controller
        controlLike();
    }
});