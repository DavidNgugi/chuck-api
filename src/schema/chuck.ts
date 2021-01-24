import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
  } from 'graphql';

import { fetchResponseByURL } from '../api';
import { Joke, Categories } from '../types';

const joke_obj = new GraphQLObjectType({
  name: 'Joke',
  description: 'This represents a joke',
  fields: () => ({
    categories: {type: GraphQLList(GraphQLString)},
    created_at: {type: GraphQLNonNull(GraphQLString)},
    icon_url: {type: GraphQLNonNull(GraphQLString)},
    id: {type: GraphQLNonNull(GraphQLString)},
    updated_at: {type: GraphQLNonNull(GraphQLString)},
    url: {type: GraphQLString},
    value: {type: GraphQLNonNull(GraphQLString)},      
  })
});

const category_obj = new GraphQLObjectType({
  name: 'Category',
  description: 'This represents a joke category',
  fields: () => ({
    categories: {type: GraphQLNonNull(GraphQLString)},
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    joke: {
      type: joke_obj,
      description: 'Random Joke',
      resolve: () => {
        return fetchResponseByURL(`/random`)
        .then((res: Joke ) => {
          console.log('Random Joke: ',res);
          return res;
        })
        .catch( (err: any) => console.log(err));
      }
    },
    categories: {
      type: new GraphQLList(GraphQLString),
      description: 'Category Listing',
      resolve: () => {
        return fetchResponseByURL(`/categories`)
        .then((res: Categories) => {
          console.log('Categories: ',res);
          return res;
        })
        .catch( (err:any) => console.log(err));
      }
    },
    findByCategory: {
      type: joke_obj,
      description: 'Find a joke by category',
      args: {
        category: {type: GraphQLNonNull(GraphQLString)}
      },
      resolve: (parent, args) => {
        return fetchResponseByURL(`/random?category=${args.category}`)
        .then((res: Joke) => {
          console.log('findByCategory: ', res);
          return res;
        })
        .catch( (err:any) => console.log(err));
      }
    },
    searchJoke: {
      type: new GraphQLList(joke_obj),
      description: 'Search for a joke. Free text search',
      args: {
        query: {type: GraphQLNonNull(GraphQLString)}
      },
      resolve: (parent, args) => {
        return fetchResponseByURL(`/random?search?query=${args.query}`)
        .then((res:any) => {
          console.log('searchJoke: ',res);
          return [res];
        })
        .catch( (err:any) => console.log(err));
      }
    }
  })
  
});

const schema = new GraphQLSchema({
    query: RootQueryType
})

module.exports = {
    schema: schema
}