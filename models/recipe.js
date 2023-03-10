import { Schema, model, models } from "mongoose";

const recipeSchema = new Schema({
    recipe: { type: String, required: true },
    ingredients: [],
    instructions: [],
    images: [],
    comments: [Schema.Types.ObjectId]
});

const Recipe = models.Recipe || model('Recipe', recipeSchema);

export default Recipe;