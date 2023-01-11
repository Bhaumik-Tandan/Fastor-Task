import mongoose from "mongoose";

const enquirySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  courseInterest: {
    type: String,
    required: true,
  },
  counselor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Counselor",
  },
},
{
  timestamps: true,
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;