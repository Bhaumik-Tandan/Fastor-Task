import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import enquiryRoutes from "./routes/enquiry.js";
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


app.use("/auth", authRoutes);
app.use("/enquiry", enquiryRoutes);

app.get("/", (req, res) => {
  res.send("Server running....");
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`MongoDB Connected and server running on port: ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err.message);
  });

mongoose.set("useFindAndModify", false);
