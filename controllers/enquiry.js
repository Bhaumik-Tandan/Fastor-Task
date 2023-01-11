import Product from "../models/product.js";
import User from "../models/counselor.js";

export const getProducts = async (req, res) => {
  const { page } = req.query;
  console.log(page);
  try {
    const LIMIT = 16;
    // Get the starting index of every page
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Product.countDocuments({});

    const posts = await Product.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};


export const getProductsbyId = async (req, res) => {
  console.log(req.params)
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    console.log(product);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


export const saveCart = async (req, res) => {
  const { cart } = req.body;
 // console.log(cart);
    try {
        const user = await User.findByIdAndUpdate(
        req.userId,
        { cart }
        );
        res.status(201).json(
          {
          success: true,
			    result: "success"});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getOrders = async (req, res) => {
  try {
    res.status(200,"success");
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
};

