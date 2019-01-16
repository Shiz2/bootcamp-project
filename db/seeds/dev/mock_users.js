const usersData = require('../../../data/users')
const hobbyData = require('../../../data/hobbies')
const postData = require('../../../data/posts')

const createPost = (knex, post, name) => {
  return knex('user')
    .where('name', name)
    .first()
    .then(user => {
      const { id, content } = post
      return knex('post').insert({
        id,
        content,
        user_id: user.id,
      })
    })
}

const createHobby = (knex, hobbyObj, name) => {
  return knex('user')
    .where('name', name)
    .first()
    .then(user => {
      const { hobby, id } = hobbyObj
      return knex('hobby').insert({
        id,
        hobby,
        user_id: user.id,
      })
    })
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user')
    .del()
    .then(() => knex('hobby').del())
    .then(() => knex('post').del())
    .then(() => {
      return knex('user').insert(usersData)
    })
    .then(() => {
      const postPromises = postData.map(post =>
        createPost(knex, post, post.name),
      )
      return Promise.all(postPromises)
    })
    .then(() => {
      const hobbyPromises = hobbyData.map(hobby =>
        createHobby(knex, hobby, hobby.name),
      )
      return Promise.all(hobbyPromises)
    })
}
