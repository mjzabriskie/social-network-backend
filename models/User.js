const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'Username is required',
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: 'Email is required',
      trim: true,
      match: [/.+@.+\..+/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//get total count of comments and replies on retrieval

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//Create the pizza model using the PizzaSchema
const User = model("User", UserSchema);

module.exports = User;