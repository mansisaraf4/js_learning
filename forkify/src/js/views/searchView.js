import {elements} from './base';
export const getInput = () => elements.searchInput.value;
//Render recipe
const renderRecipe = recipe =>{
    
}
//Render results on screen
export const renderResults = recipes => {
    recipe.forEach(renderRecipe);
}
