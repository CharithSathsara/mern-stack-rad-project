const asyncHandler = require("express-async-handler");
const Expenditure = require("../models/expenditure");

//@description - Get all Expenditure
//@route - GET /api/Expenditure
//@access private
const getExpenditures = asyncHandler(async (req, res) => {

  console.log("getting expenditure from back end");
  const expenditure = await Expenditure.find({ user: req.user.id });
  res.status(200).json(expenditure);
});

//@description - Update expenditure
//@route - POST /api/expenditure
//@access private
const setExpenditure = asyncHandler(async (req, res) => {
  if (!req.body.description) {
    
    res.status(400);
    throw new Error("Please add a expenditure name field");
  }

  if (!req.body.amount) {
    res.status(400);
    throw new Error("Please add a expenditure price field");
  }

  const expenditure = await Expenditure.create({
    amount: req.body.amount,
    description: req.body.description,
    //relationship
    user: req.user.id,
  });

  res.status(200).json(expenditure);
});

//@description - Update expenditure
//@route - PUT /api/expenditure/:id
//@access private
const updateExpenditure = asyncHandler(async (req, res) => {
  
  const expenditure = await Expenditure.findById(req.params.id);

  if (!expenditure) {
    res.status(400);
    throw new Error("Expenditure not found");
  }

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure the logged-in user matches the goal user
  if (expenditure.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedExpenditure = await Expenditure.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedExpenditure);
});

//@description - DELETE expenditure
//@route - DELETE /api/expenditure/:id
//@access private
const deleteExpenditure = asyncHandler(async (req, res) => {

  const expenditure = await Expenditure.findById(req.params.id);

  if (!expenditure) {
    res.status(400);
    throw new Error("Expenditure not found");
  }

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure the logged-in user matches the goal user
  if (expenditure.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await expenditure.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getExpenditures,
  setExpenditure,
  updateExpenditure,
  deleteExpenditure,
};
