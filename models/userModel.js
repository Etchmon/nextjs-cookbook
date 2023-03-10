import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    cookbooks: [{
        title: 'All Recipes',
        recipes: [Schema.Types.ObjectId],
        description: 'A collection of all the recipes in your cookbooks'
    }, Schema.Types.ObjectId]
});

const User = models.User || model('User', userSchema);

export default User;
