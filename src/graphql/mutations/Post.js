const { User } = require('../../models/User');
const { Post } = require('../../models/Post');

const createPost = async (obj, { content }, context) => {
  try {
    if (!context.user) {
      throw new Error('User is not logged in');
    }
    const user = await User.query()
      .where('id', context.user.id)
      .then(res => res[0]);

    if (!user) {
      return {
        error: {
          message: 'Logged in user does not exist',
        },
      };
    }

    const post = await user.$relatedQuery('post').insert({ content });

    if (!post) {
      throw new Error('Could not add post');
    }

    return post;
  } catch (error) {
    return error;
  }
};

const updatePost = async (obj, args, context) => {
  try {
    if (!context.user) {
      throw new Error('User is not logged in')
    };
    const { id, newContent } = args;
    
    if (!id || !newContent) {
      throw new Error('id and/or post not provided');
    }
    const post = await Post.query().update({
      id,
      content,
      newContent,
    });
    if (!post) {
      throw new Error('Post not updated');
    }
  } catch (error) {
    console.error('edit Post: ', error);
  }
};

const resolver = { Mutation: { createPost, updatePost } };

module.exports = resolver;
