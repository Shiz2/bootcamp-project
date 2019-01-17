const { User } = require('../../models/User');
const bcrypt = require('bcrypt');
const config = require('../../../config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const createUser = async (obj, { input }) => {
  const registerInput = _.pick(input, [
    'name',
    'email',
    'birthday',
    'concentration',
    'hometown',
    'house',
    'gender',
    'bio',
    'picture',
  ]);

  const result = await User.query().findOne('email', input.email);

  if (result) {
    return {
      error: { message: 'Email already exists!' },
    };
  }

  const hash = bcrypt.hashSync(input.password, config.saltRounds);

  registerInput.password_hash = hash;

  if (input.hobbies) {
    registerInput.hobbies = input.hobbies.map(hobby => ({
      hobby,
    }));
  }

  const user = await User.query().insertWithRelatedAndFetch(registerInput);

  if (!user) {
    return {
      error: { message: 'There was an error registering your information.' },
    };
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, config.tokenSecret);

  return {
    user,
    token,
  };
};

const updateUser = async (_, { input }, context) => {
  try {
    if (!context.user) {
      throw new Error('User is not logged in')
    };
    const {
      name,
      email,
      password,
      oldPassword,
      hometown,
      gender,
      house,
      concentration,
    } = input;

    const { id } = context.user
    const update={}
    if (name) {
      update.name = name
    }

    if (email) {
      // check if email already exists
      const rows = await User.query()
        .select('email')
        .where('id', id)
        .limit(1)
      if (!rows) {
        throw new Error('email provided is not unique')
      }
      update.email = email
    }

    if (concentration) {
      update.concentration = concentration
    }

    if (gender) {
      update.gender = gender
    }

    if (hometown) {
      update.hometown = hometown
    }

    if (house) {
      update.house = house
    }

    if (concentration) {
      update.concentration = concentration;
    }

    if (password) {
      const [ hash_obj ] = await User.query()
        .select('password_hash')
        .where('id', id)
        .limit(1);
      const valid = await bcrypt.compare(oldPassword, hash_obj.password_hash);
      if (!valid) {
        throw new Error('Invalid password.')
      }
      const password_hash = await bcrypt.hash(password, config.saltRounds)
      update.password_hash = password_hash
    }

    await User.query().where('id', id).update(update)

    return {
      code: 200,
      success: true,
      message: 'user successfully updated',
      user: input,
    };
  } catch (error) {
    return {
      code: 400,
      success: false,
      message: error.message,
      user: input,
    };
  }
};

const deleteUser = async (_, args ,context) => {
  try{
    if (!context.user) {
      throw new Error('User is not logged in')
    };
    const { id } = context.user
    await User.query()
      .where('id', id)
      .del()
    return {
      message: 'User has been successfully deleted',
      code: 200,
      success: true
    }
  } catch (error) {
    return {
      message: error.message,
      code: 400,
      success: false
    }
  }
}

const resolver = { Mutation: { createUser, updateUser, deleteUser } };

module.exports = resolver;
