# ember-query-params

Ember service for your query params

## Usage

```js
export default Ember.Controller.extend({
  paramsRelay: Ember.inject.service(),

  queryParams: [
    'theme',
    { isSidebar: 'sidebar' }
  ],
  theme: 'default',

  init() {
    this._super(...arguments);
    var paramsRelay = this.get('paramsRelay');

    paramsRelay.autoSubscribe(this);
    // or
    paramsRelay.subscribe('theme', (name, val) => {
      this.set(name, val);
    });
  }
});
```

In another place:

```js
export default Ember.Controller.extend({
  paramsRelay: Ember.inject.service(),

  actions: {
    toggleSidebar(val) {
      var paramsRelay = this.get('paramsRelay');

      paramsRelay.setParam('theme', val);
    }
  }
});
```

## Contributing

See [CONTRIBUTING.md].

[CONTRIBUTING.md]: CONTRIBUTING.md
