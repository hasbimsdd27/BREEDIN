require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const route = require("./routes/routes");

app.use(cors());
app.use(express.json());
app.use("/api/v1", route);

app.listen(port, () => console.log(`App listening on port ${port}!`));
