const button = document.getElementById('search');
const food = document.getElementById('ingredient');
const divContainer = document.getElementById('recipes-container');

const fetchRecipes = () => {
    fetch('/food/?ingredient=' + food.value, {
        method: 'GET'
    }).then((res) => {
        if (!res.ok) {
            throw new Error('The request failed');
        }
        return res.json();
    }).then((data) => {
        displayLeastDenseCaloriesFood(data);
    }).catch((error) => {
        console.log(error);
    });
};

const displayLeastDenseCaloriesFood = (result) => {
    // clear the results container
    divContainer.innerHTML = '';

    const topThreeRecipes = sortFoodBasedOnCalories('recipe.calories', result.hits);

    topThreeRecipes.forEach((recipeDetails) => {
        // create the card div
        const div = document.createElement('div');
        div.classList.add('card');

        // create the card text
        const paragraph = document.createElement('p');
        paragraph.classList.add('card-text');

        div.innerHTML = `<img
            src="${recipeDetails.recipe.image}"
            class='card-img-top'
            alt="${recipeDetails.recipe.label}"
          />
        <div class='card-body'>
          <h5 class='card-title'>${recipeDetails.recipe.label}</h5>
          <h6 class='card-subtitle mb-2 text-muted'>Calories: ${Math.round(recipeDetails.recipe.calories)}</h6>
          <p class='card-text'>
            <p class='card-text'>${recipeDetails.recipe.totalNutrients.ENERC_KCAL.label}: ${Math.round(recipeDetails.recipe.totalNutrients.ENERC_KCAL.quantity * 100) / 100}${recipeDetails.recipe.totalNutrients.ENERC_KCAL.unit}</p>
            <p class='card-text'>${recipeDetails.recipe.totalNutrients.FAT.label}: ${Math.round(recipeDetails.recipe.totalNutrients.FAT.quantity * 100) / 100}${recipeDetails.recipe.totalNutrients.FAT.unit}</p>
            <p class='card-text'>${recipeDetails.recipe.totalNutrients.FASAT.label}: ${Math.round(recipeDetails.recipe.totalNutrients.FASAT.quantity * 100) / 100}${recipeDetails.recipe.totalNutrients.FASAT.unit}</p>
            <p class='card-text'>${recipeDetails.recipe.totalNutrients.FIBTG.label}: ${Math.round(recipeDetails.recipe.totalNutrients.FIBTG.quantity * 100) / 100}${recipeDetails.recipe.totalNutrients.FIBTG.unit}</p>
            <p class='card-text'>${recipeDetails.recipe.totalNutrients.SUGAR.label}: ${Math.round(recipeDetails.recipe.totalNutrients.SUGAR.quantity * 100) / 100}${recipeDetails.recipe.totalNutrients.SUGAR.unit}</p>
            <p class='card-text'>${recipeDetails.recipe.totalNutrients.PROCNT.label}: ${Math.round(recipeDetails.recipe.totalNutrients.PROCNT.quantity * 100) / 100}${recipeDetails.recipe.totalNutrients.PROCNT.unit}</p>
            <p class='card-text'>${recipeDetails.recipe.totalNutrients.VITC.label}: ${Math.round(recipeDetails.recipe.totalNutrients.VITC.quantity * 100) / 100}${recipeDetails.recipe.totalNutrients.VITC.unit}</p>
            <p class='card-text'>${recipeDetails.recipe.totalNutrients.VITA_RAE.label}: ${Math.round(recipeDetails.recipe.totalNutrients.VITA_RAE.quantity * 100) / 100}${recipeDetails.recipe.totalNutrients.VITA_RAE.unit}</p>
        </div>`;

        // append to main div
        document.getElementById('recipes-container').appendChild(div);
    });
};

const sortFoodBasedOnCalories = (property, recipes) => {
    const prop = property.split('.');
    const len = prop.length;
    const topThree = recipes.slice().sort(function (a, b) {
        var i = 0;
        while (i < len) {
            a = a[prop[i]];
            b = b[prop[i]];
            i++;
        }
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        } else {
            return 0;
        }
    }).slice(0,3);

    return topThree;
};

button.addEventListener('click', fetchRecipes);