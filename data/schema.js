/*jshint esnext:true */
/* @flow */
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE-examples file in the root directory of this source tree.
 */

import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  toGlobalId,
} from 'graphql-relay';

var { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'User'){
      return getViewer();
    }
    return null;
  },
  (obj) => {
    if (obj instanceof User){
      return UserType;
    }
  }
);

class User extends Object {}

function getViewer(){
  var viewer = new User()
  viewer.id = "me";
  return viewer;
}

const UserType = new GraphQLObjectType({
  name: 'User',
  description: `A single user.`,
  fields: () => ({
    id: globalIdField('user')
  }),
  interfaces: () => [nodeInterface],
});


// function authUser() {
//     return {
//         type: UserType,
//         resolve: (_, args) => {
//             return {}
//         },
//     };
// }
//
// var ViewerType = new GraphQLObjectType({
//   name: 'Viewer',
//   fields: () => ({
//     auth: authUser(),
//   }),
// });

function rootField() {
  return {
    type: UserType,
    resolve: (_, args) => {
      return getViewer();
    },
  };
}

/**
 * The GraphQL type equivalent of the Root resource
 */
var rootType = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    viewer: rootField(),
    node: nodeField,
  }),
});

export var schema = new GraphQLSchema({
  query: rootType
});
