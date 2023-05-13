export default async function getRecipes() {
    try {
        const response = await fetch('www.themealdb.com/api/json/v1/1/search.php?f=a');
        const data = await response.json();

        if (response.ok) {
            return data.meals;
        } else {
            throw new Error(data.message || 'Failed to fetch recipes.');
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}
