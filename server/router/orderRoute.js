const express = require("express");
const Order = require("../models/orderModel");
const { isAuth, isAdmin } = require("../utility");
const Product = require("../models/productModel");

const { getToken } = require("../utility");

const router = express.Router();

router.post("/", isAuth, async (req, res) => {
  try {
    let newOrderCreated = [];
    let save;
    const items = req.body.cartItems;
    const len = items.length;

    for (i = 0; i < len; i++) {
      const order = new Order({
        user: req.user._id,
        orderItems: items[i],
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.price,
        taxPrice: req.body.tax,
        shippingPrice: req.body.shippingprice,
        totalPrice: req.body.totalprice,
      });

      const OrderCreated = await order.save();

      const pro = await Product.findById(items[i].product);
      if (pro) {
        pro.countInStock -= items[i].qty;

        save = await pro.save();
        if (save) newOrderCreated.push(OrderCreated);
      }
      if (save)
        res
          .status(201)
          .send({ message: "New Order Created", data: newOrderCreated });
    }
  } catch (error) {
    console.log(error, "eorrrrr");
    res.status(500).send({ error: error.message });
  }
});

router.get("/mine", isAuth, async (req, res) => {
  const order = await Order.find({ user: req.user._id }).populate("user");
  console.log(order);
  res.status(201).send({ data: order });
});
router.delete("/delete/:id", async (req, res) => {
  console.log("in delete");
  const order = await Order.findById(req.params.id);
  if (order) {
    const del = await order.remove();

    if (del) {
      console.log(order.orderItems.product);
      const pro = await Product.findById(order.orderItems.product);
      console.log(pro);
      if (pro) {
        pro.countInStock += order.orderItems.qty;
        pro.save();
      }
    }

    res.send({ message: "Order Deleted" });
  } else {
    res.send({ message: "Error in Deletion." });
  }
});

module.exports = router;
