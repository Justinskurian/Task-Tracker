const express = require("express");
const cors = require("cors");
require("dotenv").config();

const habitsRoute = require("./routes/habits");
const recordsRoute = require("./routes/records");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/habits", habitsRoute);
app.use("/records", recordsRoute);

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`app is running on port ${PORT}`);
});
