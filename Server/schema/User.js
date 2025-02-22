const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    min: 3,
    required: [true, "please provide username"],
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    match: [
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please provide a valid email",
    ],

    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    default: null
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: "user",
  },
  subscriptionStatus: {
    type: String,
    enum: ["active", "pending", "expired"],
    default: "pending",
  },
  subscriptionStart: {
    type: Date,
  },
  subscriptionEnd: {
    type: Date,
  },
  profilePicture: {
    type: String,
    default: "/uploads/defaultProfile.jpg",
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip hashing if password is not modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (orgPassword) {
  try {
    return await bcrypt.compare(orgPassword, this.password); // Compare provided password with the stored hashed password
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, user: this.username, role: this.role, email: this.email },
    process.env.JWT_SECRET,
  );
};

module.exports = mongoose.model("Users", UserSchema);
