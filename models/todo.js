import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dueDate: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;
