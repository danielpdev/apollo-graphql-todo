const mongoose = require('mongoose'); //require mongoose for defining our todo schema
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  likes: { type: Number, default: 0 }, //default 0 becuase when we first define a todo we have need to have 0 likes
  content: { type: String }
});

TodoSchema.statics.like = function(id) { // add a function for setting like in order to call TodoSchema.like(id) 
  const Todo = mongoose.model('todo');

  return Todo.findById(id)
    .then(todo => {
      ++todo.likes;
      return todo.save();
    })
}

mongoose.model('todo', TodoSchema);
