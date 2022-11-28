const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

  order: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  orderStatus: { 
    type: String,
    required: true,
    default: 'pending'
  },
  customerName: { 
    type: String,
    required: true,
  },
  assignedBarista: { 
    type: String,
    required: true,
    default: " " 
  }

  
});

module.exports = mongoose.model("storebucks", PostSchema); 
