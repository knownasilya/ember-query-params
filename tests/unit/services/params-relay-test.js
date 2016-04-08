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

test('unsubscribe', function(assert) {
  let service = this.subject();
  let counter1 = 0;
  let counter2 = 0;
  let onTest = (key, val) => {
    assert.equal(key, 'test');
    assert.equal(val, 'blah');
    counter1++;
  };
  let onTest2 = (key, val) => {
    assert.equal(key, 'test');
    assert.equal(val, counter2 === 0 ? 'blah' : 'blah2');
    counter2++;
  };

  service.subscribe('test', onTest);
  service.subscribe('test', onTest2);

  assert.notOk(service.getParam('test'));
  service.setParam('test', 'blah');

  service.unsubscribe('test', onTest);

  assert.equal(service.getParam('test'), 'blah');
  service.setParam('test', 'blah2');
  assert.equal(service.getParam('test'), 'blah2');
  assert.equal(counter2, 2);
  assert.equal(counter1, 1);
});
