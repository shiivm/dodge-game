const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema(
  {
    score: {
      type: Number,
      required: true,
    },
    created_date: {
      type: Date,
      default: Date.now,
    },
    userId : {
      type : Schema.Types.ObjectId,
      ref : 'Users',
      required : true
    }
  },
  { versionKey: false }
);

module.exports = Score = mongoose.model("Score", ScoreSchema);
