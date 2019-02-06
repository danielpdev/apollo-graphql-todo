const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;

const TodoType = new GraphQLObjectType({
  name:  'TodoType',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    likes: {
      type: GraphQLInt
    },
    content: {
      type: GraphQLString
    }
  })
});

module.exports = TodoType;
