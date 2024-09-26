import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bandMailSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
    default: "",
  },
  message: {
    type: String,
    required: true,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.BandMail ||
  mongoose.model("BandMail", bandMailSchema);
