import express from "express";
import {
    getProducts,
    saveCart,
    getOrders,
    getProductsbyId,
} from "../controllers/product.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductsbyId);
router.post("/saveCart", auth, saveCart);
router.post("/getOrders", auth, getOrders);

export default router;