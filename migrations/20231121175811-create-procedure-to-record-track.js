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
    CREATE PROCEDURE record_track (name VARCHAR, new_id INOUT INT)
    LANGUAGE PLPGSQL
    AS $$
    BEGIN
      INSERT INTO recorded_tracks (name) VALUES (name)
      RETURNING id INTO new_id;
    END; $$
  `);
};

exports.down = function(db) {
  return db.runSql('DROP PROCEDURE record_track');
};

exports._meta = {
  "version": 1
};
