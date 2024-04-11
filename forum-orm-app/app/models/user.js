import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema({
  fullName: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
