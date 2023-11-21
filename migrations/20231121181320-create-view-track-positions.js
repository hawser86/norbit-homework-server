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
    CREATE VIEW track_positions AS
    SELECT t.name AS track_name, p.latitude, p.longitude, p.heading
    FROM recorded_positions p
    JOIN recorded_tracks t ON p.track_id = t.id 
  `);
};

exports.down = function(db) {
  return db.runSql('DROP VIEW track_positions');
};

exports._meta = {
  "version": 1
};
