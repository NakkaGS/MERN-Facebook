const express = require("express");
const cors = require("cors");

const fileUpload = require("express-fileupload");

const mongoose = require("mongoose");

//reads the javacript file
const { readdirSync } = require("fs");

//.env
const dotenv = require("dotenv");
dotenv.config();

//create app in express
const app = express();
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// routes - reads the javacript file and create a route for each filer
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//database
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODBURL)
  .then(() => console.log("Database Connected Sucessfully"))
  .catch((err) => console.log("Error Connecting to MongoDB", err));

//Port from the env file OR 8000
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ...`);
});
