const userUtil = require("../utils/users");
const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const sendEmail = require("../utils/sendEmail");

const loginUser = async (req, res, next) => {
  try {
    
    let { username, password } = req.body;

    // check if user exists
    if (username == null || password == null) return res.status(403).json({ error: "Missing username or password." });
    
    if (await userUtil.userByIdExists(req)) return res.status(403).json({ error: "Already logged in." });

    const user = await userUtil.findUserByCredentials(username, password);
    if (user == null) return res.status(403).json({ error: "Invalid username or password." });
    const token =  await userUtil.getToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({
      message: "Login successfully.",
      token: token,
    });

  }
  catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const logoutUser = async (req, res, next) => {
  try {
    let user = await userUtil.findUserById(req);
    console.log(user);

    if (user == null) res.status(200).json({ message: "Invalid session" });
    else {
      user.sessionStart = null;
      user.lastAccessed = null;
      await user.save();
      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
      });
      res.status(200).json({ message: "Logout successfully." });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const registerUser = async (req, res, next) => {
  try {
    const user = await userUtil.findUserById(req);
    if (user.role != "admin")
      res
        .status(403)
        .json({ error: "Access denied because you are not admin." });
    else {
      let { username, password, fullname, email } = req.body;
      if (username == null || password == null || fullname == null || email == null) return res.status(403).json({ error: "Missing required fields." });

      let exists = await userModel.findOne({ username })
      if (exists != null) return res.status(403).json({ error: "User already exists." });
      
      let newUser = new userModel();
      newUser.username = username;
      newUser.fullname = fullname;
      newUser.email = email;
      await userUtil.setPassword(newUser, password);

      res
        .status(200)
        .json({
          message: "User created successfully.",
          access_token: await userUtil.getToken(newUser),
          username, fullname, password
      });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const infoUser = async (req, res, next) => {
  try {
    let user = await userUtil.findUserById(req);
    console.log('infoUser');
    console.log(user);
    if (user == null) res.status(403).json({ error: "Invalid session." });
    else {
      res.status(200).json({
        message: "User info.",
        user: user,
      });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Forgot password and reset password
const forgotPassword = async (req, res, next) => {
  try {
    const { username } = req.body;
    if (username == null) return res.status(403).json({ error: "Missing username." });
    
    if (await userUtil.findUserById(req) != null) return res.status(403).json({ error: "Already logged in." });

    const user = await userModel.findOne({ username });
    if (user == null) return res.status(403).json({ error: "Invalid username." });
    
    // Send email to user
    const resetPasswordToken = await userUtil.getPasswordResetToken(user, true);
    const html = `<h1>Forgot password request</h1>
  <p>Click <a target="_blank" href="http://localhost:3000/reset-password/${resetPasswordToken}">here</a> to reset your password.</p>
  <p>If you didn't make this request, please ignore this message.</p>`;
    
    const info = await sendEmail({ email: user.email, html });
    console.log(info);
    res.status(200).json({
      success: info.response?.includes("OK") ? true : false,
      mes: info.response?.includes("OK")
        ? "Email sent successfully"
        : "Something went wrong",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// This code is not completed yet
const resetPassword = async (req, res, next) => {
  try {
    const { passwordResetToken, newPassword, confirmNewPassword } = req.body;

    if (newPassword != confirmNewPassword) return res.status(403).json({
      code: "PASSWORD_MISMATCH",
      message: "Password and password retype doesn't match"
    });

    let user = await userUtil.findUserWithPasswordTokenRequest(passwordResetToken);

    if (user == null) return res.status(403).json({
      code: "INVALID_REQUEST_TOKEN",
      message: "Password reset token is expired or invalid"
    });

    user.passwordResetExpiry = null;
    await userUtil.resetTokenLifespan(user);
    await userUtil.setPassword(user, newPassword);

    res.status(200).json({
      code: "SUCCESS",
      message: "Password reset successfully"
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userUtil.findUserById(req);
    if (user == null) res.status(403).json({ error: "Invalid session." });
    else {
      if (user.role === 'admin') next();
      else res.status(403).json({ error: "Access denied." });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  loginUser,
  logoutUser,
  registerUser,
  infoUser,
  forgotPassword,
  resetPassword,
  isAdmin,
};
