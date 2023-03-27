import { Schema, model, models } from "mongoose";

const cookbookSchema = new Schema({
    title: { type: String },
    recipes: [Schema.Types.ObjectId],
    description: { type: String }
});

const Cookbook = models.Cookbook || model('Cookbook', cookbookSchema);

export default Cookbook;