import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  sender: {
    type: String,
    required: true
  },
  recipient: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true,
    default: ""
  },
  message: {
    type: String,
    required: true,
    default: ""
  },
  createdAt: { 
    type: Date, default: Date.now 
  },
  parentId: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'Mail', default: null 
  },
  threadId: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'Mail' 
  },
})

export default mongoose.models.Mail || mongoose.model('Mail', userSchema);
