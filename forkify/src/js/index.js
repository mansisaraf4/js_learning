// https://forkify-api.herokuapp.com/api/search?q=pizza
import Search from './models/Search';
/* Global state of the app
*-- Search object
*-- Current recipe object
*--Shopping list object
*--Liked recipe
*/ 
const state = {};
document.querySelector('.search').addEventListener('submit', e =>{
    e.preventDefault();
});
const search = new Search('pasta');
search.getResults();