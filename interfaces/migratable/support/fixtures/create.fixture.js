module.exports = {
  tableName: 'create',
  connection: 'migratable',
  migrate: 'create',
  primaryKey: 'id',
  fetchRecordsOnUpdate: true,
  fetchRecordsOnDestroy: false,
  fetchRecordsOnCreate: true,
  fetchRecordsOnCreateEach: true,

  attributes: {
    // Primary Key
    id: {
      type: Adapter.identity == 'sails-mysql' ? 'number' : 'string',
      columnName: Adapter.identity === 'sails-arangojs' ? '_key' : '_id',
      autoMigrations: {
        columnType:
          Adapter.identity === 'sails-mysql' ? '_numberkey' : '_stringkey',
        autoIncrement: Adapter.identity === 'sails-mysql' ? true : false,
        unique: true,
      },
    },

    name: {
      type: 'string',
      autoMigrations: {
        columnType: 'varchar',
      },
    },

    age: {
      type: 'number',
      autoMigrations: {
        columnType: 'integer',
      },
    },

    // Timestamps

    updatedAt: {
      type: 'number',
      autoUpdatedAt: true,
      autoMigrations: {
        columnType: 'bigint',
      },
    },

    createdAt: {
      type: 'number',
      autoCreatedAt: true,
      autoMigrations: {
        columnType: 'bigint',
      },
    },
  },
};
