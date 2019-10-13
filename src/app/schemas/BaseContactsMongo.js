import mongoose from 'mongoose';

const BaseContactSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    contacts: {
      type: Array,
    },
  },
  { collection: 'user_contacts', timestamps: true }
);

export default mongoose.model('BaseContactMongo', BaseContactSchema);
