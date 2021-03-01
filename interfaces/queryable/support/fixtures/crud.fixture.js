module.exports = {
  globalId: 'Userforqueryableinterface',
  identity: 'userforqueryableinterface',
  tableName: 'userTable2',
  datastore: 'queryable',
  primaryKey: 'id',
  fetchRecordsOnUpdate: true,
  fetchRecordsOnDestroy: false,
  fetchRecordsOnCreate: true,
  fetchRecordsOnCreateEach: true,

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

    first_name: {
      type: 'string',
      columnName: 'fName',
      autoMigrations: {
        columnType: 'varchar',
      },
    },

    last_name: {
      type: 'string',
      columnName: 'lName',
      autoMigrations: {
        columnType: 'varchar',
      },
    },

    type: {
      type: 'string',
      columnName: 't',
      autoMigrations: {
        columnType: 'varchar',
      },
    },

    age: {
      type: 'number',
      columnName: 'a',
      autoMigrations: {
        columnType: 'integer',
      },
    },

    email: {
      type: 'string',
      autoMigrations: {
        columnType: 'varchar',
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
