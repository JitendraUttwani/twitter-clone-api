const { Model } = require('objection');

class Like extends Model {
  static get tableName() {
    return 'likes';
  }

  static get idColumn() {
    return ['user_id', 'post_id'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'post_id'],
      properties: {
        user_id: { type: 'integer' },
        post_id: { type: 'integer' },
        created_at: { type: 'string', format: 'date-time' }
      }
    };
  }

  static get relationMappings() {
    const User = require('./User');
    const Post = require('./Post');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'likes.user_id',
          to: 'users.user_id'
        }
      },
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: 'likes.post_id',
          to: 'posts.post_id'
        }
      }
    };
  }
}

module.exports = Like;