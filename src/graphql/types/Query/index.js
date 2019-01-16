const merge = require('lodash.merge')

const user = require('./user')
const post = require('./post')
const hobby = require('./hobby')

const resolvers = [user, post, hobby]

module.exports = merge(...resolvers)
