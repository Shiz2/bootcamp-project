const BaseModel = require('./BaseModel')

class User extends BaseModel {
  static get tableName() {
    return 'user'
  }

  static get relationMappings() {
    const {Post} = require('./Post')
    const {Hobby} = require('./Hobby')
    return {
      post: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: 'user.id',
          to: 'post.user_id'
        }
      },
      hobby: {
        relation: BaseModel.HasManyRelation,
        modelClass: Hobby,
        join: {
          from: 'user.id',
          to: 'hobby.user_id'
        }
      },
      following: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'user.id',
          through: { 
            from: 'follow.followerId',
            to: 'follow.followingId',
          },
          to: 'user.id',
        }
      }
    }
  }
}

exports.User = User
