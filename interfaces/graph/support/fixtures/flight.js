module.exports = {
  identity: 'flightforgraphinterface',
  tableName: 'graphflight',
  datastore: 'graph',
  primaryKey: 'id',
  fetchRecordsOnUpdate: true,
  fetchRecordsOnDestroy: false,
  fetchRecordsOnCreate: true,
  fetchRecordsOnCreateEdge: true,
  fetchRecordsOnCreateEach: true,
  classType: 'Edge',
  edgeDefinition:{
    from:'graphairport',
    to:'graphairport'
  }

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

    Year: {
      type: 'number',
      autoMigrations: {
        columnType: 'integer',
      },
    },
    Month: {
      type: 'number',
      autoMigrations: {
        columnType: 'integer',
      },
    },
    Day: {
      type: 'number',
      autoMigrations: {
        columnType: 'integer',
      },
    },
    DayOfWeek: {
      type: 'number',
      autoMigrations: {
        columnType: 'integer',
      },
    },
    DepTime: {
      type: 'number',
      autoMigrations: {
        columnType: 'integer',
      },
    },
    ArrTime: {
      type: 'number',
      autoMigrations: {
        columnType: 'integer',
      },
    },
    DepTimeUTC: {
      type: 'string',
      autoMigrations: {
        columnType: 'varchar',
      },
    },
    ArrTimeUTC: {
      type: 'string',
      autoMigrations: {
        columnType: 'varchar',
      },
    },
    UniqueCarrier: {
      type: 'string',
      autoMigrations: {
        columnType: 'varchar',
      },
    },
    FlightNum: {
      type: 'number',
      autoMigrations: {
        columnType: 'integer',
      },
    },
    TailNum: {
      type: 'string',
      autoMigrations: {
        columnType: 'varchar',
      },
    },
    Distance: {
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
