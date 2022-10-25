const mongoose = require("mongoose");

const expenditureSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      //which object that this object id refers to
      ref: "User",
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    amount: {
      type: Number,
      required: [true, "Please add amount"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expenditure", expenditureSchema);
