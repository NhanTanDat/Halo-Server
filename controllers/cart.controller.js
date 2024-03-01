const cartModel = require('../models/cart.model');

module.exports = {
  getCarts: async (req, res) => {
    const user = req.params.user;
    const isOrder = req.query.isOrder;
    const bodyQuery = {
      user: user,
    };
    if (isOrder) {
      bodyQuery.isOrder = isOrder;
    }
    const carts = await cartModel.findOne(bodyQuery).populate('items.shoe');
    if (!carts) {
      return res.status(404).json({ error: 'Chưa có sản phẩm nào' });
    }
    return res.status(200).json(carts);
  },
  createCart: async (req, res) => {
    const user = req.params.user;
    //mảng các item
    const body = req.body;
    const cart = await cartModel.findOne({
      user: user,
      isOrder: 0,
    });
    let newCart;
    if (!cart) {
      newCart = await cartModel.create({
        user: user,
        items: [body],
      });
    } else {
      newCart = await cartModel.findOneAndUpdate(
        { user: user, isOrder: 0 },
        { items: [...cart.items, body] },
        { new: true },
      );
    }

    return res.status(200).json(newCart);
  },
  deleteItem: async (req, res) => {
    const user = req.params.user;
    const shoe = req.params.shoe;
    const cart = await cartModel.findOne({
      user: user,
    });
    const newItems = cart.items.filter((v) => v.shoe != shoe);
    const newCart = await cartModel.findOneAndUpdate(
      { user: user },
      { items: newItems },
      { new: true },
    );

    return res.status(200).json(newCart);
  },
};
