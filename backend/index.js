const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors= require('cors')
const wordRoutes = require("./routes/wordRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

/// mongoose connection here
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected succesfully"))
  .catch((err) => console.error("MongoDB given connection error: ", err));


app.use("/api/words", wordRoutes);

//// port checking
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
