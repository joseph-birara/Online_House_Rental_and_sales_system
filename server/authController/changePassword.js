const mongoose = require("mongoose");
const getUser = require("./authorize");
const { hashPassword } = require("./passwordHash");

async function changePassword(req, res, userModel) {
  try {
    const id = await getUser(req, res);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "invalid id" });
    }

    const newPassword = req.body.password;
    if (!newPassword) {
      return res.status(400).json({ error: "New password is required" });
    }

    const hashedPassword = await hashPassword(newPassword);
    const user = await userModel.findOneAndUpdate(
      { _id: id },
      { password: hashedPassword }
    );
    if (!user) {
      return res.status(400).json({ error: "No such user" });
    }
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    return res.status(400).json({ error: error.message });
  }
}

module.exports = { changePassword };
