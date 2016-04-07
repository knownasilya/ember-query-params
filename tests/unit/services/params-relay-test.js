import Ember from 'ember';
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

test('subscribe fired on set', function(assert) {
  let service = this.subject();

  service.subscribe('test', (key, val) => {
    assert.equal(key, 'test');
    assert.equal(val, 'blah');
  });

  assert.notOk(service.getParam('test'));
  service.setParam('test', 'blah');
});

test('autoSubscribe changes values', function(assert) {
  let service = this.subject();
  let target = Ember.Object.create({
    queryParams: [
      'hello',
      { myName: 'name' }
    ]
  });

  service.autoSubscribe(target);

  service.setParam('hello', 'bob');
  service.setParam('myName', 'john');

  assert.equal(target.get('hello'), 'bob');
  assert.equal(target.get('myName'), 'john');
});
