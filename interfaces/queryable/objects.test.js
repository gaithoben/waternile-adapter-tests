var assert = require('assert');
var _ = require('@sailshq/lodash');

describe('Queryable Interface', function () {
  describe('select()', function () {
    var User;

    before(function (done) {
      Queryable.Userforqueryableinterface.destroy({}, function (err) {
        if (err) {
          return done(err);
        }

        var user = {
          first_name: 'foo',
          last_name: 'bar',
          type: 'bot',
        };

        Queryable.Userforqueryableinterface.create(user, function (err, users) {
          if (err) {
            return done(err);
          }

          User = users[0];

          return done();
        });
      });
    });

    // In order for the integrator to work correctly records must have a primary
    // key. This is enforced at the query builder level.
    it('Should return an array of Object instances', function (done) {
      Queryable.Userforqueryableinterface.find()
        .select(['first_name', 'last_name'])
        .exec(function (err, users) {
          if (err) {
            return done(err);
          }

          assert(users[0] instanceof global[`UserforqueryableinterfaceObject`]);

          return done();
        });
    });

    it('Should return keyProps property in every returned object', function (done) {
      Queryable.Userforqueryableinterface.findOne({
        first_name: 'foo',
        last_name: 'bar',
      }).exec(function (err, user) {
        if (err) {
          return done(err);
        }

        assert(typeof user.keyProps === 'object');
        assert(_.size(user.keyProps) >= 1);
        assert(_.has(user.keyProps, '_id'));
        assert(_.size(user.keyProps, 'id') >= 1);

        return done();
      });
    });
  });
});
