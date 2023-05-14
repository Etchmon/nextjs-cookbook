import fetch from "node-fetch"

async function populateRecipes() {
    try {
        const response = await fetch(`https://api.edamam.com/search?q=popular&app_id=4f61f8f6&app_key=
c5237c5510ccd52bb9b88d3db2c9d52b&to=100`);

        const data = await response.json();
        console.log(data.hits[0].recipe.label)
        const promises = data.hits.map((recipe) => {
            const recipeNew = {
                title: recipe.recipe.label,
                ingredients: recipe.recipe.ingredients
            };
            console.log(recipeNew);
        });
        const results = await Promise.all(promises);
        console.log(await results)

        if (response.ok) {
            return data
        } else {
            throw new Error(data.message || 'Failed to fetch recipes.');
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

// Call the function to populate the recipes
populateRecipes();
