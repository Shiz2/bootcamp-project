const gql = require('graphql-tag')

module.exports = gql`
  type User {
    id: ID 
    name: String
    email: String
    hometown: String
    gender: String
    house: String
    concentration: String
    posts: [Post]
    hobbies: [Hobby]
  }

  type Post {
    id: ID
    content: String
  }

  type Hobby {
    id: ID
    hobby: String
  }

  type Query {
    user(id: ID!): User!
    users(
      substr: String,
      hometown: String,
      gender: String,
      house: String,
      concentration: String,
      hobbies: [String]
    ): [User!]!
    post: Post!
    posts: [Post!]!
    hobby(id:ID!): Hobby!
    hobbies: [Hobby!]!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
    hometown: String
    gender: String
    house: String
    concentration: String
  }

  input UserUpdate {
    id: ID!
    name: String
    email: String
    password: String
    oldPassword: String
    hometown: String
    gender: String
    house: String
    concentration: String
  }

  input HobbyUpdate {
    id: ID!
    hobby: String!
  }

  input PostUpdate {
    id: ID!
    post: String!
  }

  input PostInput {
    content: String!
  }

  input HobbyInput {
    hobby: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input DeleteInput {
    id: ID!
  }

  type DefaultMutationResponse {
    message: String!
    code: Int!
    success: Boolean!
  }

  type LoginReturn {
    user: User!
    token: String!
  }

  type UserReturn {
    user: User
    token: String!
  }

  type UserUpdateReturn {
    message: String!
    code: Int!
    success: Boolean!
    user: User
  }

  type HobbyUpdateReturn {
    message: String!
    code: Int!
    success: Boolean!
    hobby: Hobby
  }

  type PostUpdateReturn {
    message: String!
    code: Int!
    success: Boolean!
    post: Post
  }

  type Mutation {
    createUser(input: UserInput!): UserReturn
    createPost(input: PostInput!): Post
    loginUser(input: LoginInput!): LoginReturn!
    insertHobby(input: HobbyInput!): Hobby
    updateUser(input: UserUpdate!): UserUpdateReturn
    updateHobby(input: HobbyUpdate!): HobbyUpdateReturn
    updatePost(input: PostUpdate!): PostUpdateReturn
    deleteUser(input: DeleteInput): DefaultMutationResponse
    deleteHobby(input: DeleteInput): DefaultMutationResponse
    deletePost(input: DeleteInput): DefaultMutationResponse
  }
`
