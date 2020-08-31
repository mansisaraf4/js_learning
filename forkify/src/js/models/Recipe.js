import axios from 'axios';
export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            alert('Something went wrong :(');
        }
    }
    calcTime() {
        //Assuming that we need 15 mins for 3 ingredients
        const numOfIngredients = this.ingredients.length;
        const periods = Math.ceil(numOfIngredients / 3);
        this.time = periods * 15;
    }
    calcServings() {
        this.servings = 4;
    }
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];
        const newIngredients = this.ingredients.map((el) => {
            //Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            //Remove ()
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            // Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex((el2) => units.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                let count;
                const arrCount = arrIng.slice(0, unitIndex);
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }
                objIng = {
                    count: count.toFixed(2),
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
                //There is a unit
            } else if (parseInt(arrIng[0], 10)) {
                //There is not unit but the first element is number
                //TODO - Find a way to check if it is mixed fraction and convert it
                objIng = {
                    count: eval(arrIng[0]).toFixed(2),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };
            } else if (unitIndex === -1) {
                //There is no unit
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }
            return objIng;
        });
        this.ingredients = newIngredients;
    }
    updateServing(type) {
        //Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
        //Ingredients
        this.ingredients.forEach((ing) => {
            ing.count *= newServings / this.servings;
        });
        this.servings = newServings;
    }
}