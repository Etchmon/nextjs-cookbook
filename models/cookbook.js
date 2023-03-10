import { Schema, model, models } from "mongoose";

const cookbookSchema = new Schema({
    title: String,
    recipes: [Schema.Types.ObjectId],
    description: String
});

const Cookbook = models.Cookbook || model('Cookbook', cookbookSchema);

export default Cookbook;