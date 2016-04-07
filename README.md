# ember-query-params

Ember service for your query params

[![NPM][npm-badge-img]][npm-badge-link]
[![Build Status][travis-badge]][travis-badge-url]
[![Ember Observer Score][ember-observer-badge]][ember-observer-url]
![Ember Version][ember-version]

This addon is in response to https://github.com/emberjs/ember.js/issues/11592.

:warning: This addon uses the `Map` browser API, if your app supports browsers that don't
include it, then please use a [polyfill].

## Usage

```js
import Ember from 'ember';

const { inject, Controller } = Ember;

export default Controller.extend({
  paramsRelay: inject.service(),

  queryParams: [
    'theme',
    { isSidebarOpen: 'sidebar' }
  ],
  isSidebarOpen: false,
  theme: 'default',

  init() {
    this._super(...arguments);
    var paramsRelay = this.get('paramsRelay');

    paramsRelay.autoSubscribe(this);
    // or
    paramsRelay.subscribe('theme', (name, val) => {
      // name => 'theme'
      this.set(name, val);
    });
  }
});
```

In another place:

```js
import Ember from 'ember';

const { inject, Controller } = Ember;

export default Controller.extend({
  paramsRelay: inject.service(),

  actions: {
    toggleSidebar(val) {
      var paramsRelay = this.get('paramsRelay');

      paramsRelay.setParam('isSidebarOpen', val);
    }
  }
});
```

## Service API

- `setParam` - Function; For example `paramsRelay.setParam('name', value)`.
- `getParam` - Function; For example `paramsRelay.getParam('name')`. Returns the value, can be anything.
- `subscribe` - Function; For example `paramsRelay.subscribe('name', (key, value) => { //do something });`.
- `autoSubscribe` - Function; For example `paramsRelay.autoSubscribe(this)`. Where `this` is the controller that has a `queryParams` array.
  All query params must have a unique name, since setting a 'theme' in one controller will set the same QP in another.

## Custom Service

You can also setup your own service, just use the mixin.

```js
import Ember from 'ember';
import QPMixin from 'ember-query-params/mixins/query-params';

export default Ember.Service.extend(QPMixin, {
  // your code
});
```

## Contributing

See [CONTRIBUTING.md].

[npm-badge-img]: https://badge.fury.io/js/ember-query-params.svg
[npm-badge-link]: http://badge.fury.io/js/ember-query-params
[travis-badge]: https://travis-ci.org/knownasilya/ember-query-params.svg
[travis-badge-url]: https://travis-ci.org/knownasilya/ember-query-params
[ember-observer-badge]: http://emberobserver.com/badges/ember-query-params.svg
[ember-observer-url]: http://emberobserver.com/addons/ember-query-params
[ember-version]: https://embadge.io/v1/badge.svg?start=1.13.0
[polyfill]: https://github.com/babel/ember-cli-babel#polyfill
[CONTRIBUTING.md]: CONTRIBUTING.md
