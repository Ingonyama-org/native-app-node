const cors = require("cors");
const express = require("express");
const app = express();
const initRoutes = require("./routes");

var corsOptions = {
  origin: "http://192.168.43.168:19000/",
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = 8001;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
