const { GraphQLScalarType } = require('graphql');
const moment = require('moment');

const TimeStamp = new GraphQLScalarType({
  name: 'TimeStamp',
  description: 'An ISO-8601 encoded UTC date string.',
  serialize(date_string) {
    let date_moment = moment(date_string, moment.ISO_8601);
    if (!date_moment.isValid()) {
      throw new Error(
        'DateTime cannot represent an invalid ISO-8601 Date string'
      );
    }
    return date_moment.format();
  },
  parseValue(date_string) {
    let date_moment = moment(date_string, moment.ISO_8601);
    if (!date_moment.isValid()) {
      throw new Error(
        'DateTime cannot represent an invalid ISO-8601 Date string'
      );
    }
    return date_moment.format();
  },
  parseLiteral(ast) {
    let date_moment = moment(ast.value, moment.ISO_8601);
    if (!date_moment.isValid()) {
      throw new Error(
        'DateTime cannot represent an invalid ISO-8601 Date string'
      );
    }
    return date_moment.format();
  },
});

exports.TimeStamp = TimeStamp;
