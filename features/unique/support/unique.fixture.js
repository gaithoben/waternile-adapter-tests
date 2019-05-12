/**
 * Dependencies
 */

var Waterline = require('waternile');

module.exports = Waterline.Collection.extend({
  identity: 'unique',
  tableName: 'uniqueTable',
  connection: 'uniqueConn',
  primaryKey: 'id',
  archiveModelIdentity: false,

  attributes: {
    // Primary Key
    id: {
      type: Adapter.identity === 'sails-mysql' ? 'number' : 'string',
      columnName: Adapter.identity === 'sails-arangojs' ? '_key' : '_id',
      autoMigrations: {
        columnType:
          Adapter.identity === 'sails-mysql' ? '_numberkey' : '_stringkey',
        autoIncrement: Adapter.identity === 'sails-mysql',
        unique: true,
      },
    },

    name: {
      type: 'string',
      autoMigrations: {
        columnType: 'varchar',
      },
    },
    email: {
      type: 'string',
      required: true,
      autoMigrations: {
        unique: true,
        columnType: 'varchar',
      },
    },
    type: {
      type: 'string',
      autoMigrations: {
        columnType: 'varchar',
      },
    },
  },
});
