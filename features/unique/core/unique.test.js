const assert = require('assert');
const _ = require('@sailshq/lodash');
const WaterlineUtils = require('waterline-utils');

describe('unique attribute feature', () => {
  // ///////////////////////////////////////////////////
  // TEST SETUP
  // //////////////////////////////////////////////////

  const Waterline = require('waternile');
  const defaults = { migrate: 'drop' };
  let waterline;

  const UniqueFixture = require('../support/unique.fixture.js');
  let UniqueModel;

  let id0;
  let id1;
  let email0;

  before((done) => {
    waterline = new Waterline();
    waterline.registerModel(UniqueFixture);

    const connections = { uniqueConn: _.clone(Connections.test) };

    waterline.initialize(
      {
        adapters: { wl_tests: Adapter },
        datastores: connections,
        defaults,
      },
      (err, ontology) => {
        if (err) return done(err);

        // Migrations Helper
        WaterlineUtils.autoMigrations(defaults.migrate, ontology, (err) => {
          if (err) {
            return done(err);
          }

          UniqueModel = ontology.collections.unique;

          // Insert 3 Records
          const records = [];
          for (let i = 0; i < 3; i++) {
            records.push({
              name: `testUnique${i}`,
              email: `email${i}`,
              type: 'unique',
            });
          }

          UniqueModel.createEach(
            records,
            (err, records) => {
              if (err) return done(err);
              id0 = records[0].id;
              id1 = records[1].id;
              email0 = records[0].email.toString();
              done();
            },
            { fetch: true }
          );
        });
      }
    );
  });

  after((done) => {
    if (!Adapter.hasOwnProperty('drop')) {
      waterline.teardown(done);
    } else {
      WaterlineUtils.autoMigrations('drop', waterline, (err1) => {
        waterline.teardown((err2) => done(err1 || err2));
      });
    }
  });

  // ///////////////////////////////////////////////////
  // TEST METHODS
  // //////////////////////////////////////////////////

  it('should error when creating with a duplicate value', (done) => {
    UniqueModel.create({ email: email0, type: 'unique' }, (err, records) => {
      assert(err);

      assert.equal(
        err.raw.code,
        'E_UNIQUE',
        `Expected error instance with code notUnique, but instead got: ${require('util').inspect(
          err,
          { depth: null }
        )}`
      );
      assert(!records);
      UniqueModel.find({ type: 'unique' }).exec((err, records) => {
        assert.ifError(err);
        assert.equal(records.length, 3);
        done();
      });
    });
  });

  it('should error when updating with a duplicate value', (done) => {
    UniqueModel.update(id1, { email: email0 })
      .meta({ fetch: true })
      .exec((err, records) => {
        assert.equal(_.isEmpty(records), true);
        UniqueModel.findOne(id1).exec((err, record) => {
          assert.ifError(err);
          assert.notEqual(record.email, email0);
          done();
        });
      });
  });

  it('should work (do nothing) when updating the field of an existing record to the same value', (done) => {
    UniqueModel.update(id0, {
      name: 'testUnique0',
      email: email0,
      type: 'unique',
    })
      .meta({ fetch: true })
      .exec((err, records) => {
        assert(
          !err,
          `Expected no error when updating to the same value, instead got: ${require('util').inspect(
            err,
            { depth: null }
          )}`
        );
        assert.equal(records.length, 1);
        assert.equal(records[0].id, id0);
        assert.equal(records[0].email, email0);
        done();
      });
  });

  it('should work when updating a unique field to the same value based on search parameters', (done) => {
    UniqueModel.update({ email: email0 }, { email: email0 })
      .meta({ fetch: true })
      .exec((err, records) => {
        assert(
          !err,
          'Expected no error when updating to the same value on searched records'
        );
        assert.equal(records.length, 1);
        assert.equal(records[0].id, id0);
        assert.equal(records[0].email, email0);
        done();
      });
  });
});
