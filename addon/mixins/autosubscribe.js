import Ember from 'ember';

const { typeOf, inject } = Ember;
const arrRegex = /^"?\[.*,*\]"?$/;

export default Ember.Mixin.create({
  paramsRelay: inject.service(),

  beforeModel() {
    var paramsRelay = this.get('paramsRelay');
    var routeName = this.routeName || this.router.currentRouteName;
    var controller = this.controllerFor(routeName);

    if (!this._eqpSubscribed) {
      paramsRelay.autoSubscribe(controller);
      this._eqpSubscribed = true;
    }

    // Set initial QPs since action fires first
    if (this._initialQps) {
      Ember.run.schedule('afterRender', this, () => {
        paramsRelay.setParams(this._initialQps);
        this._initialQps = undefined;
      });
    }

    return this._super(...arguments);
  },

  subscribeParam(name, cb) {
    var paramsRelay = this.get('paramsRelay');

    paramsRelay.subscribe(name, cb);
  },

  unsubscribeParam(name, cb) {
    var paramsRelay = this.get('paramsRelay');

    paramsRelay.unsubscribe(name, cb);
  },

  actions: {
    queryParamsDidChange: function eqpQueryParamsDidChange(changed) {
      var paramsRelay = this.get('paramsRelay');
      var routeName = this.routeName || this.router.currentRouteName;
      var params = this.paramsFor(routeName);
      var changedKeys = Object.keys(changed);
      var deserialized = changedKeys.reduce((res, key) => {
        let raw = params[key];
        let changedRaw = changed[key];
        let normalized = normalizeArrayQp(changedRaw);
        let value = this.deserializeQueryParam(normalized, key, normalized.match(arrRegex) ? 'array' : typeOf(raw));

        res[key] = value;
        return res;
      }, {});

      if (changedKeys.length && this._eqpSubscribed) {
        paramsRelay.setParams(deserialized);
      } else if (!paramsRelay.hasParams() && changedKeys.length && !this._eqpSubscribed) {
        this._initialQps = deserialized;
      }

      return this._super(...arguments);
    }
  }
});

function normalizeArrayQp(val) {
  var matched = val && val.match(/^"(\[.*,*\])"$/);
  if (matched) {
    try {
      return JSON.parse(matched[1]);
    } catch(e) {}
  }

  return val;
}
