import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';
import emberVersionGTE from 'ember-test-helpers/has-ember-version';

moduleFor('route:test', {
  needs: ['service:params-relay'],
});

test('it works', function(assert) {
  let controllerStub = Ember.Object.create({
    queryParams: [
      'hello',
      { myName: 'name' }
    ]
  });
  let subject = this.subject();
  let relay = subject.get('paramsRelay');

  subject.routeName = 'test';
  subject.controller = controllerStub;
  subject.controllerFor = function () {
    return subject.controller;
  };

  subject.beforeModel();

  relay.setParam('hello', 'bob');
  relay.setParam('myName', 'john');

  assert.equal(subject.controller.get('hello'), 'bob');
  assert.equal(subject.controller.get('myName'), 'john');
});

test('auto unsubscribe', function(assert) {
  let controllerStub = Ember.Object.create({
    queryParams: [
      'hello',
      { myName: 'name' }
    ]
  });
  let subject = this.subject();
  let relay = subject.get('paramsRelay');
  let originalDestroy = subject.destroy;
  let local;

  subject.routeName = 'test';
  subject.controller = controllerStub;
  subject.controllerFor = function () {
    return subject.controller;
  };
  subject.destroy = function () {
    subject.controller.destroy();
    originalDestroy.call(subject, ...arguments);
  };

  subject.beforeModel();

  relay.subscribe('hello', (key, val) => {
    local = val;
  });

  relay.setParam('hello', 'bob');
  relay.setParam('myName', 'john');

  assert.equal(subject.controller.get('hello'), 'bob');
  assert.equal(subject.controller.get('myName'), 'john');
  assert.equal(local, 'bob');

  Ember.run(() => {
    subject.destroy();
  });

  relay.setParam('hello', 'bob2');
  relay.setParam('myName', 'john2');

  // values stayed the same, since it's destroyed/ing
  if (emberVersionGTE(2,0)) {
    assert.equal(subject.controller.get('hello'), 'bob');
    assert.equal(subject.controller.get('myName'), 'john');
  } else {
    // 1.13 returns `undefined` if controller destroyed
    assert.equal(subject.controller.get('hello'), undefined);
    assert.equal(subject.controller.get('myName'), undefined);
  }
  // other functions still present
  assert.equal(local, 'bob2');
});
