import mongoose from 'mongoose';

const gradeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
    min: 0,
  },
  lastModified: {
    type: Date,
    required: true,
  },
});

const gradesModel = mongoose.model('grades', gradeSchema, 'grades');
export { gradesModel };
