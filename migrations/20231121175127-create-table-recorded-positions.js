'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(`
    CREATE TABLE recorded_positions (
      id SERIAL PRIMARY KEY,
      track_id INT NOT NULL,
      latitude NUMERIC NOT NULL,
      longitude NUMERIC NOT NULL,
      heading NUMERIC NOT NULL
    )
  `);
};


exports.down = function(db) {
  return db.runSql('DROP TABLE recorded_positions');
};

exports._meta = {
  "version": 1
};
