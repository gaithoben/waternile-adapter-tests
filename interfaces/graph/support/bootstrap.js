/**
 * Module Dependencies
 */

const assert = require('assert');
const _ = require('@sailshq/lodash');
const async = require('async');
const Waterline = require('waternile');
const waterlineUtils = require('waterline-utils');

// Require Fixtures
const fixtures = {
  FlightsFixture: require('./fixtures/flight'),
  AirtportsFixture: require('./fixtures/airport'),
};

let waterline;
let ORM;

// Model defaults
const defaults = {
  fetchRecordsOnUpdate: true,
  fetchRecordsOnDestroy: false,
  fetchRecordsOnCreate: true,
  fetchRecordsOnCreateEach: true,
  migrate: 'alter',
  archiveModelIdentity: false,
  attributes: {
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
  },
};

//  ╔═╗╦  ╔═╗╔╗ ╔═╗╦    ┌┐ ┌─┐┌─┐┌─┐┬─┐┌─┐
//  ║ ╦║  ║ ║╠╩╗╠═╣║    ├┴┐├┤ ├┤ │ │├┬┘├┤
//  ╚═╝╩═╝╚═╝╚═╝╩ ╩╩═╝  └─┘└─┘└  └─┘┴└─└─┘
before(done => {
  waterline = new Waterline();

  _.each(fixtures, (val, key) => {
    const modelFixture = _.merge({}, defaults, fixtures[key]);
    waterline.registerModel(Waterline.Collection.extend(modelFixture));
  });

  const datastores = {
    graph: _.clone(Connections.test),
  };

  waterline.initialize(
    {
      adapters: { wl_tests: Adapter },
      datastores,
      defaults,
    },
    (err, orm) => {
      if (err) {
        return done(err);
      }

      // Save a reference to the ORM
      ORM = orm;

      // Run migrations
      waterlineUtils.autoMigrations('alter', orm, err => {
        if (err) {
          return done(err);
        }

        // Globalize collections for normalization
        _.each(ORM.collections, (collection, identity) => {
          const globalName =
            identity.charAt(0).toUpperCase() + identity.slice(1);
          global.Graph[globalName] = collection;
        });

        return done();
      });
    }
  );
});

//  ╔═╗╦  ╔═╗╔╗ ╔═╗╦    ┌─┐┌─┐┌┬┐┌─┐┬─┐
//  ║ ╦║  ║ ║╠╩╗╠═╣║    ├─┤├┤  │ ├┤ ├┬┘
//  ╚═╝╩═╝╚═╝╚═╝╩ ╩╩═╝  ┴ ┴└   ┴ └─┘┴└─
after(done => {
  function dropCollection(item, next) {
    if (!_.has(Adapter, 'drop')) {
      return next();
    }

    // Grab the adapter to perform the query on
    const collection = ORM.collections[item];
    const datastoreName = collection.datastore;
    const tableName = collection.tableName || collection.identity;
    Adapter.drop(datastoreName, tableName, [], next);
  }

  async.each(_.keys(ORM.collections), dropCollection, err => {
    if (err) {
      return done(err);
    }

    waterline.teardown(done);
  });
});
