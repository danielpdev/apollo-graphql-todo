const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  likes: { type: Number, default: 0 },
  content: { type: String }
});

TodoSchema.statics.like = function(id) {
  const Todo = mongoose.model('todo');

  return Todo.findById(id)
    .then(todo => {
      ++todo.likes;
      return todo.save();
    })
}

mongoose.model('todo', TodoSchema);
