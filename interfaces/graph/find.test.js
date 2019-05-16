const assert = require('assert');
const _ = require('@sailshq/lodash');
const airport_data = require('./support/fixtures/airports_data');

describe('Graph Interface', () => {
  describe('.find()', () => {
    before((done) => {
      // Insert 10 Users

      Graph.Airportforgraphinterface.createEach(
        airport_data,
        (err, airports) => {
          if (err) {
            return done(err);
          }

          return done();
        },
      );
    });

    it('should be able to find a Vertex', (done) => {
      Graph.Airportforgraphinterface.findOne({ id: '00M' }, (err, airport) => {
        if (err) {
          return done(err);
        }
        assert(airport);
        assert.equal(airport.id, '00M');

        return done();
      });
    });
    it('should create an Edge connecting two airports', (done) => {
      const edgeproperties = {
        Year: 2008,
        Month: 1,
        Day: 1,
        DayOfWeek: 2,
        DepTime: 644,
        ArrTime: 866,
        DepTimeUTC: '2008-01-01T11:04:00.000Z',
        ArrTimeUTC: '2008-01-01T13:06:00.000Z',
        UniqueCarrier: '9E',
        FlightNum: 2938,
        TailNum: '87979E',
        Distance: 444,
      };

      const from_id = 'graphairport/00M';
      const to_id = 'graphairport/00R';

      Graph.Flightforgraphinterface.createEdge(
        edgeproperties,
        {
          from: from_id,
          to: to_id,
        },
        (err, edge) => {
          if (err) {
            return done(err);
          }

          assert.equal(edge._id, `graphflight/${edge.id}`);
          assert.equal(edge._from, `${from_id}`);
          assert.equal(edge._to, `${to_id}`);
          return done();
        },
      );
    });
  });
});
