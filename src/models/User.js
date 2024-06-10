const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn(){
    return ['user_id'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email','password', 'username'],

      properties: {
        user_id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        username: { type: 'string', minLength: 1, maxLength: 255},
        email: { type: 'string', format: 'email', maxLength: 255 },
        password: { type: 'string', maxLength: 255 },
        bio: { type: 'string', minLength: 1 },
        location: { type: 'string', maxLength: 255},
        created_at: {type: 'string', format: 'date-time'}
      },
    };
  }
  static get relationMappings() {
    const Follows = require('./Follows');
    const Post = require('./Post');
    const Like = require('./Like');
    return {
      following: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'users.user_id',
          through: {
            from: 'follows.follower_id',
            to: 'follows.followee_id',
          },
          to: 'users.user_id',
        },
      },
      followers: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'users.user_id',
          through: {
            from: 'follows.followee_id',
            to: 'follows.follower_id',
          },
          to: 'users.user_id',
        },
      },
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: 'User.user_id',
          to: 'Post.user_id'
        }
      },
      likes: {
        relation: Model.HasManyRelation,
        modelClass: Like,
        join: {
          from: 'users.user_id',
          to: 'likes.user_id'
        }
      }
    };
  }
}

module.exports = User;