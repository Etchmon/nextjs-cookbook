import { Schema, model, models } from "mongoose";

const commentSchema = new Schema({
    text: { type: String, required: true },
    date: Date.now(),
    author: Schema.Types.ObjectId
});

const Comment = models.Comment || model('Comment', commentSchema);

export default Comment;