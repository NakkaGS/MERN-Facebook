const fs = required("fs");

module.exports = async function (req, res, next) {
  try {
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).json({ message: "No file selected" });
    }
    let files = Object.values(req.files).flat();
    files.forEach((file) => {
      if (
        file.mimetype !== "images/jpeg" &&
        file.mimetype !== "images/png" &&
        file.mimetype !== "images/gif" &&
        file.mimetype !== "images/webp"
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "Unsupported format " });
      }
      if(file.size > 1024 * 1024 * 5) {
        return res.status(400).json({ message: "File size is too large" });
      }
    });
    next()
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
