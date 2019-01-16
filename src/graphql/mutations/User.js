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

  console.log(user);
  console.log(token);

  return {
    user,
    token,
  };
};

const updateUser = async (_, { input }, context) => {
  if (!context.user) {
    return {
      error: {
        message: 'User not logged in',
      },
    };
  }
  try {
    const {
      id,
      name,
      email,
      password,
      oldPassword,
      hometown,
      gender,
      house,
      concentration,
    } = input;

    const queryBuilder = User.query().where('id', id);
    if (name) {
      queryBuilder.update('name', name);
    }

    if (email) {
      queryBuilder.update('email', email);
    }

    if (concentration) {
      queryBuilder.update('concentration', concentration);
    }

    if (gender) {
      queryBuilder.update('gender', gender);
    }

    if (hometown) {
      queryBuilder.update('hometown', hometown);
    }

    if (house) {
      queryBuilder.update('house', house);
    }

    if (concentration) {
      queryBuilder.update('concentration', concentration);
    }

    if (password) {
      const [user] = await User.query()
        .select('password_hash')
        .where('id', id);
      const valid = await bcrypt.compare(oldPassword, user.password_hash);
      if (!valid) {
        throw new Error('Invalid password.')
      }

      queryBuilder.update('password_hash', bcrypt(password, config.saltRounds));
    }

    await queryBuilder;

    return {
      code: 200,
      success: true,
      message: 'user successfully updated',
      user: input,
    };
  } catch (error) {
    return {
      code: 200,
      success: true,
      message: error.message,
      user: input,
    };
  }
};

const resolver = { Mutation: { createUser, updateUser } };

module.exports = resolver;
