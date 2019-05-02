var Waterline = require('waternile');

module.exports = Waterline.Collection.extend({
  identity: 'compositePrimaryKey',
  tableName: 'compositePrimaryKeyTable',
  connection: 'compositePrimaryKeyConnection',
  autoPK: false,

  attributes: {
    name: 'string',
    pkOne: {
      type: 'number',
      primaryKey: true,
    },

    pkTwo: {
      type: 'string',
      primaryKey: true,
    },
  },
});
