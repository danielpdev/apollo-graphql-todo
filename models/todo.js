const mongoose = require('mongoose'); //require mongoose for defining our todo schema
const Schema = mongoose.Schema;


/* 
  default 0 becuase when we first define a todo we have need to have 0 likes
*/
const TodoSchema = new Schema({
  likes: { type: Number, default: 0 }, 
  content: { type: String }
});

/* 
  add a function for likes in order to call TodoSchema.like(id) 
  return the promise so we can pass it back to our graphql resolve function
*/
TodoSchema.statics.like = (id) => { 
  const Todo = mongoose.model('todo');

  return Todo.findById(id)
    .then(todo => {
      ++todo.likes;
      return todo.save();
  });
}

mongoose.model('todo', TodoSchema);
