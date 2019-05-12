module.exports = {
  tableName: 'alter',
  connection: 'migratable',
  migrate: 'alter',
  primaryKey: 'id',
  schema: true,
  fetchRecordsOnUpdate: true,
  fetchRecordsOnDestroy: false,
  fetchRecordsOnCreate: true,
  fetchRecordsOnCreateEach: true,

  attributes: {
    // Primary Key
    id: {
      type: Adapter.identity == 'sails-mysql' ? 'number' : 'string',
      columnName: '_id',
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
