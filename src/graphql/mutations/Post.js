const { User } = require('../../models/User')
const { Post } = require('../../models/Post')

const createPost = async (obj, { content }, context) => {
  if (!context.user) {
    return {
      error: {
        message: 'User not logged in',
      },
    }
  }

  const user = await User.query()
    .where('id', context.user.id)
    .then(res => res[0])

  if (!user) {
    return {
      error: {
        message: 'Logged in user does not exist',
      },
    }
  }

  const post = await user.$relatedQuery('post').insert({ content })

  if (!post) {
    throw new Error('Could not add post')
  }

  return {
    post,
  }
}

const updatePost = async (obj, args, context) => {
  if (!context.user) {
    return {
      error: {
        message: 'User not logged in',
      },
    }
  }
  const { id, newContent } = args
  if (!context.user) {
    return {
      error: {
        message: 'User not logged in',
      },
    }
  }
  // TODO - finish this function which edits a post given its id and new content.
  try {
    if (!id || !newContent) {
      throw new Error('id and/or post not provided')
    }
    const post = await Post
      .query()
      .update({
        id, id,
        content, newContent
      })
    if (!post) {
      throw new Error('Post not updated')
    }

  } catch (error) {
    console.error('edit Post: ',error)
  }
}

const resolver = { Mutation: { createPost, updatePost } }

module.exports = resolver
