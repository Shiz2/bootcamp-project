const { Post } = require('../../../models/Post');

const postResolver = async (obj, args, context) => {
  // TODO: Write a resolver which returns a post given its id.
  try {
    const { id } = args;
    return await Post.query().where('id', id).then(rows => rows[0]);
  } catch (error) {
    console.error('userResolver: ', error);
  }
};

const postsResolver = async (obj, args, context) => {
  /* TODO: Write a resolver which returns a list of all posts.
    - this list should be ordered with the most recent posts first 
  */
  try {
    return await Post.query().orderBy('created_at');
  } catch (error) {
    console.error(error);
  }
};

const resolver = {
  Query: {
    post: postResolver,
    posts: postsResolver,
  },
};

module.exports = resolver;
