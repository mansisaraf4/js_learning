// https://forkify-api.herokuapp.com/api/search?q=pizza
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';
/* Global state of the app
*-- Search object
*-- Current recipe object
*--Shopping list object
*--Liked recipe
*/ 
const state = {};
const controlSearch = async () => {
    // 1. Get Query from View
    const query = searchView.getInput(); //TODO
    // console.log(`${query} is the query`);
    if(query) {
        // 2. new Search Object and add to state
        state.search = new Search(query);
        
        //3. Project UI for results
        searchView.clearResults();
        searchView.clearInput();
        renderLoader(elements.searchRes);
        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
        console.log(state.search.result);

    }
}


elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
});
// const search = new Search('pasta');
// search.getResults();