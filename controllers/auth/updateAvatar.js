const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const { User } = require("../../models/users");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    const resizeAvatar = await jimp.read(tempUpload);
    await resizeAvatar.cover(250, 250).writeAsync(tempUpload);

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
