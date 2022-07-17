const { Schema, model, Types } = require("mongoose");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: 'reactionBody must not be null',
      trim: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: 'username must not be null',
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
        type: String,
        required: true,
        trim: true
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

ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
