import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: { 
    type: String,
    enum: ["User", "Admin"],
    default: "User"
  },
  refreshToken: {
    type: String,
  },
}, {
  timestamps: true
})

export default mongoose.models.User || mongoose.model('User', userSchema);
