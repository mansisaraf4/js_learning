import { elements } from './base';
export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = '';
};
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};
export const highlightedSelected = (id) => {
    const resArray = Array.from(document.querySelectorAll('.results__link'));
    resArray.forEach((element) => {
        element.classList.remove('results__link--active');
    });
    console.log(id);
    try {
        document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
    } catch (error) {
        console.log(error);
    }

};
export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        //return the result
        return `${newTitle.join(' ')}...`;
    } else {
        return title;
    }
};
//Render recipe
const renderRecipe = (recipe) => {
    const markup = `
    <li>
        <a class="results__link" href=#${recipe.recipe_id}>
            <figure class="results__fig">
                <img src=${recipe.image_url} alt=${recipe.title}>
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>

    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) =>
    `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        //display only next
        button = createButton(page, 'next');
    } else if (page < pages) {
        //display both buttons
        button = `
        ${createButton(page, 'next')}
        ${createButton(page, 'prev')}`;
    } else if (page === pages && pages > 1) {
        //display only previous button
        button = createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};
//Render results on screen
export const renderResults = (recipes, page = 2, resPerPage = 10) => {
    //render results of current page and rent pagination button
    const start = (page - 1) * resPerPage;
    const end = start + 9;
    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length, resPerPage);
};