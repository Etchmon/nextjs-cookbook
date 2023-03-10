import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    cookbooks: {
        allRecipes: [Schema.Types.ObjectId],
        myBooks: [Schema.Types.ObjectId]
    }
});

const User = models.User || model('User', userSchema);

export default User;
