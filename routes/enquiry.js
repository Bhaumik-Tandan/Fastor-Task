import express from "express";
import { addEnquiry,getAllEnquiries,getEnquiryById,assignEnquiry,getPrivateEnquiries } from "../controllers/enquiry.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", addEnquiry);
router.get("/", auth, getAllEnquiries);
router.get("/private", auth, getPrivateEnquiries);
router.get("/:id", auth, getEnquiryById);
router.patch("/:id", auth, assignEnquiry);

export default router;