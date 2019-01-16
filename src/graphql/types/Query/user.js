const { User } = require('../../../models/User');
const { Hobby } = require('../../../models/Hobby');
const { Post } = require('../../../models/Post');

const userResolver = async (obj, args, context) => {
  // TODO: Write a resolver which returns a user given a user id.
  try {
    const { id } = args;
    const user = await User.query()
      .where('id', id)
      .then(rows => rows[0]);
    return user;
  } catch (error) {
    console.error('userResolver: ', error);
  }
};

const usersResolver = async (obj, args, context) => {
  const { substr, hometown, house, concentration, hobbies } = args;
  /* TODO: Write a resolver which returns a list of all users.
  Once you're done, implement the following pieces of functionality one by one:

  If any of the following arguments are provided, apply the corresponding filter:
    - substr: include only users whose name contains the substring
    - hometown: include only users from that hometown
    - house: include only users from that house
    - concentration: include only users who have that concentration
    - hobbies: include only users who have indicated one of the hobbies in that list
  */
  try {
    const queryBuilder = User.query();
    if (substr) {
      const substr_search = '%' + substr + '%';
      queryBuilder.whereRaw('na?', substr_search);
    }

    if (hometown) {
      queryBuilder.where('hometown', hometown)
    }

    if (house) {
      queryBuilder.where('house', house);
    }

    if (concentration) {
      queryBuilder.where('concentration', concentration);
    }

    if (hobbies) {
      queryBuilder.leftJoin('hobby','user.id', 'hobby.user_id').whereIn('hobby.hobby', hobbies);
    }
    return await queryBuilder;
  } catch (error) {
    console.error(error);
  }
};

const resolver = {
  Query: {
    user: userResolver,
    users: usersResolver,
  },
  User: {
    hobbies: async (user, args) => {
      try{
        return await Hobby.query().where(user_id, user.id)
      } catch(error){
        console.error(error)
      }
    },
    posts: async (user, args) => {
      try{
        return await Post.query().where(user_id, user.id)
      } catch(error){
        console.error(error)
      }
    }
  }
};

module.exports = resolver;
