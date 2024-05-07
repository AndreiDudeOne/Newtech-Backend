import { Schema } from "mongoose";
import mongoose from "mongoose";

const articleSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  keywords: {
    type: Array,
    default: [],
  },
  userId: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
});

// articleSchema.index({ content: "text "});

const Article = mongoose.model("Article", articleSchema);

export default Article;
