import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String,
    required: true
  },
  service: {
    type: String
  },
  source: {
    type: String,
    enum: ['website', 'meta', 'google'],
  },
  campaignName: {
    type: String
  },
  keyword: {
    type: String
  },
   status: {
      type: String,
      enum: ["new", "contacted", "converted"],
      default: "new"
    }
}, {
  timestamps: true  
});

export const Lead = mongoose.model('Lead', leadSchema);
