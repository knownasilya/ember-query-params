import { moduleFor, test } from 'ember-qunit';

moduleFor('service:params-relay', 'Unit | Service | params relay', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('setting a param', function(assert) {
  let service = this.subject();

  assert.notOk(service.getParam('name'));
  service.setParam('name', 'bob');

  assert.equal(service.getParam('name'), 'bob');
  service.setParam('name', 'john');

  assert.equal(service.getParam('name'), 'john');
});
