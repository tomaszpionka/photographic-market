const express = require("express");
const morgan = require("morgan");

const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/items", require("./routes/item"));
app.use("/orders", require("./routes/order"));
app.use("/users", require("./routes/user"));

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
