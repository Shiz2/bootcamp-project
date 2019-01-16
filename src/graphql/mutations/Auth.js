const {User} = require('../../models/User')
const config = require('../../../config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async (obj, { input }) => {
  const { email, password } = input
  console.log(email, password)
  const user = await User.query().findOne('email', email)

  if (!user) {
    return {
      error: 'Email does not exist.',
    }
  }

  if (!user) {
    return {
      error: 'Password not provided',
    }
  }

  const valid = await bcrypt.compare(password, user.password_hash)

  if (!valid) {
    return {
      error: 'Invalid password.',
    }
  }

  const payload = { id: user.id }
  const token = jwt.sign(payload, config.tokenSecret)
  return {
    user,
    token,
  }
}

const resolver = {
  Mutation: { loginUser },
}

module.exports = resolver
