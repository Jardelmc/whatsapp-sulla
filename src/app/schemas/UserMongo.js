import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    lastConversation: {
      type: Array,
    },
    avaliable: {
      type: Boolean,
    },
  },
  { collection: 'user', timestamps: true }
);

export default mongoose.model('UserMongo', UserSchema);
