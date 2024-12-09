
const jwt = require("jsonwebtoken");

const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { User } = require("../../models");

exports.protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  if (!token) throw new AppError(401, "Not authorized");

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new AppError(401, "Not authorized");
  }

  const currentUser = await User.findById(decoded.id);

  if (!currentUser || currentUser.token !== token) throw new AppError(401, "Not authorized");
  
  req.user = currentUser;
  req.token = token;
  req.userId = decoded.id;
  
  next();
});
