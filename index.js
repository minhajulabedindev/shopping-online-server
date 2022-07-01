const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const port = process.env.PORT || 8800;

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
// const stripeRoute = require("./routes/stripe");

//middleaware
app.use(cors());
app.use(express.json());

mongoose
  .connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.wehqx.mongodb.net/shopping?retryWrites=true&w=majority`)
  .then(() => console.log("Db connection established"))
  .catch((err) => {
    console.log(err);
  });

// connect
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
// app.use("/api/checkout", stripeRoute);

app.get("/", (req, res) => {
  res.send(" server is running");
});
app.listen(port, () => {
  console.log("listening on port", port);
});
