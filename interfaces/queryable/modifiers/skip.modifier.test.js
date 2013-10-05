var Waterline = require('waterline'),
    Model = require('../support/crud.fixture'),
    assert = require('assert');

describe('Queryable Interface', function() {

  /////////////////////////////////////////////////////
  // TEST SETUP
  ////////////////////////////////////////////////////

  var User;

  before(function(done) {
    var waterline = new Waterline();
    waterline.loadCollection(Model);

    Events.emit('fixture', Model);

    waterline.initialize({ adapters: { test: Adapter }}, function(err, colls) {
      if(err) return done(err);
      User = colls.user;
      done();
    });
  });

  describe('SKIP Query Modifier', function() {

    /////////////////////////////////////////////////////
    // TEST SETUP
    ////////////////////////////////////////////////////

    before(function(done) {

      // Insert 10 Users
      var users = [];

      for(var i=0; i<10; i++) {
        users.push({first_name: 'skip_user' + i, type: 'skip test'});
      }

      User.createEach(users, function(err, users) {
        if(err) return done(err);
        done();
      });
    });

    /////////////////////////////////////////////////////
    // TEST METHODS
    ////////////////////////////////////////////////////

    it('should return the correct amount of records', function(done) {
      User.find({ where: { type: 'skip test' }, skip: 3 }, function(err, users) {
        assert(!err);
        assert(Array.isArray(users));
        assert(users.length === 7);
        done();
      });
    });

    it('dynamic finder usage should return the correct amount of records', function(done) {
      User.findByType('skip test', { skip: 3 }, function(err, users) {
        assert(!err);
        assert(Array.isArray(users));
        assert(users.length === 7);
        done();
      });
    });

    it('as an option should return correct amount of records', function(done) {
      User.find({ where: { type: 'skip test' } }, { skip: 3 }, function(err, users) {
        assert(!err);
        assert(Array.isArray(users));
        assert(users.length === 7);
        done();
      });
    });

  });
});