import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:test', {
  needs: ['service:params-relay']
});

// Replace this with your real tests.
test('it works', function(assert) {
  let subject = this.subject();
  let relay = subject.get('paramsRelay');

  relay.setParam('hello', 'bob');
  relay.setParam('myName', 'john');

  assert.equal(subject.get('hello'), 'bob');
  assert.equal(subject.get('myName'), 'john');
});
