var assert, lib, test;

test = require('tape'),
lib = require('./');

test('should upgrade using default version property', function(t) {
  var original, up, versionSpec;

  versionSpec = {
    "0.0.1": function(doc) {
      doc.upgradedAt = new Date;
      if (doc.propGroup == null) {
        doc.propGroup = {};
      }
      doc.propGroup.field2 = doc.field1;
      delete doc.field1;
      return doc;
    }
  };

  original = {
    version: '0.0.0',
    field1: 'my val'
  };

  up = lib(original, versionSpec);

  t.equal(up.propGroup.field2, 'my val', "propGroup.field2 should get field1 value");
  t.equal(up.version, '0.0.1', 'version should be upgraded');
  t.ok(up.upgradedAt, 'upgradedAt should be set');
  t.notOk(up.field1, 'field1 should have been deleted');
  t.end();
});

test('should upgrade using custom version property', function(t) {
  var original, up, versionSpec;

  versionSpec = {
    "0.0.1": function(doc) {
      doc.upgradedAt = new Date;
      if (doc.propGroup == null) {
        doc.propGroup = {};
      }
      doc.propGroup.field2 = doc.field1;
      delete doc.field1;
      return doc;
    }
  };

  original = {
    aCustomVersionField: '0.0.0',
    field1: 'my val'
  };

  up = lib(original, versionSpec, 'aCustomVersionField');

  t.equal(up.propGroup.field2, 'my val', "propGroup.field2 should get field1 value");
  t.equal(up.aCustomVersionField, '0.0.1', 'ss_version should be upgraded');
  t.ok(up.upgradedAt, 'upgradedAt should be set');
  t.notOk(up.field1, 'field1 should have been deleted');
  t.end();
});
