import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  conversationId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  title: { type: String, required: true },
  pdfFileId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to the GridFS file
});

const Report = mongoose.model('Report', reportSchema);

export default Report;