const { Model } = require('objection');

class Follows extends Model {
  static get tableName() {
    return 'follows';
  }

  static get idColumn() {
    return ['follower_id','followee_id'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['follower_id','followee_id'],
      properties: {
        follower_id: { type: 'integer' },
        followee_id: { type: 'integer'},
      },
    };
  }
}

module.exports = Follows;