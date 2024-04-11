import { Schema } from "mongoose";
import mongoose from "mongoose";

const commentSchema = new Schema({
  content: String,
  date: Date,
  userId: String,
  articleId: String,
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
