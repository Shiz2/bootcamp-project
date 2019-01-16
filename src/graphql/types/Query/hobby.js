const { Hobby } = require('../../../models/Hobby');

const hobbyResolver = async (obj, args, context) => {
  try {
    const { id } = args;
    return await Hobby.query().where('id', id).then(rows => rows[0]);
  } catch (error) {
    console.error('userResolver: ', error);
  }
};

const hobbiesResolver = async (obj, args, context) => {
  try {
    return await Hobby.query();
  } catch (error) {
    console.error(error);
  }
};

const resolver = {
  Query: {
    hobby: hobbyResolver,
    hobbies: hobbiesResolver,
  },
};

module.exports = resolver;
