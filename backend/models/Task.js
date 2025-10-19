import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  taskdate: { type: String, required: true },
  taskStarttime: { type: String },
  taskEndtime: { type: String },
  completed: { type: Boolean, default: false },
  completedOn: { type: Date }
}, { versionKey: false,timestamps: true });

export default mongoose.model('Task', taskSchema);
