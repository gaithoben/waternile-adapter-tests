module.exports = {
  identity: 'airportforgraphinterface',
  tableName: 'graphairport',
  datastore: 'graph',
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
        autoIncrement: Adapter.identity !== 'sails-mysql',
        unique: true,
      },
    },

    name: {
      type: 'string',
      autoMigrations: {
        columnType: 'varchar',
      },
    },
    city: {
      type: 'string',
      autoMigrations: {
        columnType: 'varchar',
      },
    },
    state: {
      type: 'string',
      autoMigrations: {
        columnType: 'varchar',
      },
    },
    country: {
      type: 'string',
      autoMigrations: {
        columnType: 'varchar',
      },
    },
    lat: {
      type: 'number',
      autoMigrations: {
        columnType: 'integer',
      },
    },
    long: {
      type: 'number',
      autoMigrations: {
        columnType: 'integer',
      },
    },
    vip: {
      type: 'boolean',
      defaultsTo: false,
      autoMigrations: {
        columnType: 'boolean',
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
