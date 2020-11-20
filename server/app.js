const express = require("express");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoute = require("./router/userRoute");
const orderRoute = require("./router/orderRoute");
const productRoute = require("./router/productRoute");
const upload = require("./router/uploadRouter");
const path = require("path");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
try {
  mongoose.connect(
    "mongodb+srv://rish:CxiW1CsPeAp46oPU@cluster0.kjvxf.mongodb.net/ecommerce?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
  console.log("conected....");
} catch (error) {
  console.log(error);
}
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use("/api/users", userRoute);
app.use("/api/order", orderRoute);
app.use("/api/uploads", upload);
app.use("/api/products", productRoute);

app.listen(2000);
