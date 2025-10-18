import { Model } from 'objection';

class VerificationTokenModel extends Model {
  static get tableName() {
    return 'verificationToken';
  }

  static get idColumn() {
    return ['identifier', 'token'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['identifier', 'token', 'expires'],
      properties: {
        identifier: { type: 'string' },
        token: { type: 'string' },
        expires: { type: 'string', format: 'date-time' },
      },
    };
  }
}

export default VerificationTokenModel;
