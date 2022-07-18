const { Schema, model, Types } = require("mongoose");
const { format } = require("date-fns");

//creating schema for reactions
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: "reactionBody must not be null",
      trim: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: "username must not be null",
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => format(createdAtVal, "PPpp"),//Using date-fns to format
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// creating schema for thoughts
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      //no minLength because trim ensures no empty space, and then required gets set off if no characters
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => format(createdAtVal, "PPpp"),//Using date-fns to format
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
// returns a virtual with the count of reactions on a thought
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
