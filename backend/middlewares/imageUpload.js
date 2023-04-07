module.exports = async function (req, res, next) {
  try {
    console.log(req.files);
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
