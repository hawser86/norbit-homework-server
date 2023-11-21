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
    CREATE PROCEDURE record_position (
      track_id INT,
      latitude NUMERIC,
      longitude NUMERIC,
      heading NUMERIC
    )
    LANGUAGE PLPGSQL
    AS $$
    BEGIN
      INSERT INTO recorded_positions (track_id, latitude, longitude, heading)
      VALUES (track_id, latitude, longitude, heading);
    END; $$
  `);
};

exports.down = function(db) {
  return db.runSql('DROP PROCEDURE record_position');
};

exports._meta = {
  "version": 1
};
