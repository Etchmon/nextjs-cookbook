import { Schema, model, models } from "mongoose";

const recipeSchema = new Schema({
    title: { type: String, required: true },
    ingredients: [],
    instructions: [],
    images: [],
    source: { type: String },
    comments: [Schema.Types.ObjectId]
});

const Recipe = models.Recipe || model('Recipe', recipeSchema);

export default Recipe;