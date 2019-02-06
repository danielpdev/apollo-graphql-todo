const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Todo = mongoose.model('todo');
const TodoType = require('./todo_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        content: { 
          type: GraphQLString
        }
      },
      resolve(parentValue, { content }) { 
        return (new Todo({ content })).save()
      }
    },
    likeTodo: {
      type: TodoType,
      args: { 
        id: { 
          type: GraphQLID
        }
      },
      resolve(parentValue, { id }) {
        return Todo.like(id);
      }
    },
    deleteTodo: {
      type: TodoType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parentValue, { id }) {
        return Todo.remove({ _id: id });
      }
    },
    updateTodo: {
      type: TodoType,
      args: {
        id: {
          type: GraphQLID
        },
        content: {
          type: GraphQLString
        }
      },
      resolve(parentValue, { id, content }) {
        return Todo.update({ _id: id }, { content });
      }
    },
  }
});

module.exports = mutation;
