import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  songs: {
    type: [String],
    required: true
  }
})

export default mongoose.models.Playlist || mongoose.model('Playlist', userSchema);
