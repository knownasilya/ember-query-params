import Ember from 'ember';

export default Ember.Mixin.create({
  init() {
    this._super(...arguments);
    this._map = new Map();
  },

  setParam(name, value) {
    let map = this._map;

    if (map.has(name)) {
      map.get(name).value = value;
      this.callCbs(name);
    } else {
      map.set(name, {
        value,
        cbs: []
      });
    }
  },

  getParam(name) {
    let map = this._map;
  	let item = map.get(name);

    return item ? item.value : undefined;
  },

  subscribe(name, cb) {
    let map = this._map;

    if (map.has(name)) {
      let item = map.get(name);
      item.cbs.push(cb);
    } else {
    	map.set(name, {
				value: undefined,
        cbs: [cb]
      });
    }
  },

  autoSubscribe(context) {
  	if (!context || !context.queryParams) {
    	return;
    }

    let keys = context.queryParams.reduce((all, item) => {
    	if (typeof item === 'string') {
      	all.push(item);
      } else if (typeof item === 'object') {
      	all = all.concat(Object.keys(item));
      }

      return all;
    }, []);
    let update = (name, val) => {
      if (context.isDestroyed || context.isDestroying) {
        return;
      }

      Ember.run(context, 'set', name, val);
    };

    keys.forEach(key => this.subscribe(key, update));
  },

  callCbs(name) {
    let map = this._map;

  	if (map.has(name)) {
      let item = map.get(name);
      item.cbs.forEach(cb => cb(name, item.value));
    }
  }
});
