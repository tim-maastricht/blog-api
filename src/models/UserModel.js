const mongoose = require("mongoose");
const crypto = require("node:crypto");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: [8, "Username too short"],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password too short"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: false,
    },
    usersWeFollow: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    postsWeReactedTo: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Post",
        },
      ],
      default: [],
    },
    salt: {
      type: String,
      required: true,
      default: generateSalt,
    },
  },
  {
    timestamps: true,
  },
);

function generateSalt() {
  return crypto.randomBytes(64).toString("hex");
}

// 1. add a middleware/hook to hash the password when the password is updated
UserSchema.pre("save", function (next) {
  // 1. check if the sale is available for this user
  //  if there is no salt on the user
  if (!this.salt) {
    this.salt = generateSalt();
  }

  if (!this.isModified("password")) return;

  this.password = crypto
    .scryptSync(this.password, this.salt, 64)
    .toString("hex");

  // this might only be for post hooks now
  // next();
});

// 2.
UserSchema.methods.comparePassword = function (incomingPasswordToCheck) {
  // hash incoming password and check if hashed version matches

  if (!this.salt) {
    this.salt = generateSalt();
  }

  let hashedAndSaltedIncomingPassword = crypto
    .scryptSync(incomingPasswordToCheck, this.salt, 64)
    .toString("hex");

  if (hashedAndSaltedIncomingPassword == this.password) {
    // passwords match
    return true;
  } else {
    return false;
  }
};
// foundUser.comparePassword(request.body.loginPassword)

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
  UserSchema,
  UserModel,
};
