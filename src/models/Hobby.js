const BaseModel = require('./BaseModel')

class Hobby extends BaseModel {
  static get tableName() {
    return 'hobby'
  }

  static get relationMappings() {
    const {Hobby} = require('./Hobby')
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'hobby.user_id',
          to: 'user.id'
        }
      }
    }
  }
}

exports.Hobby = Hobby
