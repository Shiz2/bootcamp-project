const BaseModel = require('./BaseModel')

class Post extends BaseModel {
  static get tableName() {
    return 'post'
  }

  static get relationMappings() {
    const {User} = require('./User')
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'post.user_id',
          to: 'user.id'
        }
      }
    }
  }
}

exports.Post = Post
