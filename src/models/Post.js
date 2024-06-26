const { Model } = require('objection');

class Post extends Model {
  static get tableName() {
    return 'posts';
  }

  static get idColumn() {
    return 'post_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'message'],
      properties: {
        post_id: { type: 'integer' },
        user_id: { type: 'integer' },
        message: { type: 'string'},
        created_at: { type: 'string', format: 'date-time' }
      }
    };
  }

  static get relationMappings() {
    const User = require('./User');
    const Like = require('./Like');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'Post.user_id',
          to: 'User.user_id'
        }
      },
      likes: {
        relation: Model.HasManyRelation,
        modelClass: Like,
        join: {
          from: 'posts.post_id',
          to: 'likes.post_id'
        }
      }
    };
  }
}

module.exports = Post;