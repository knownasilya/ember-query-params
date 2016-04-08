import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';
import emberVersionGTE from 'ember-test-helpers/has-ember-version';

moduleFor('controller:test', {
  needs: ['service:params-relay']
});

test('it works', function(assert) {
  let subject = this.subject();
  let relay = subject.get('paramsRelay');

  relay.setParam('hello', 'bob');
  relay.setParam('myName', 'john');

  assert.equal(subject.get('hello'), 'bob');
  assert.equal(subject.get('myName'), 'john');
});

test('auto unsubscribe', function(assert) {
  let subject = this.subject();
  let relay = subject.get('paramsRelay');
  let local;

  relay.subscribe('hello', (key, val) => {
    local = val;
  });

  relay.setParam('hello', 'bob');
  relay.setParam('myName', 'john');

  assert.equal(subject.get('hello'), 'bob');
  assert.equal(subject.get('myName'), 'john');
  assert.equal(local, 'bob');

  Ember.run(() => {
    subject.destroy();
  });

  relay.setParam('hello', 'bob2');
  relay.setParam('myName', 'john2');

  // values stayed the same, since it's destroyed/ing
  if (emberVersionGTE(2,0)) {
    assert.equal(subject.get('hello'), 'bob');
    assert.equal(subject.get('myName'), 'john');
  } else {
    // 1.13 returns `undefined` if controller destroyed
    assert.equal(subject.get('hello'), undefined);
    assert.equal(subject.get('myName'), undefined);
  }
  // other functions still present
  assert.equal(local, 'bob2');
});