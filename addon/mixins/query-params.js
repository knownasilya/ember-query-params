import Ember from 'ember';

const { get } = Ember;

export default Ember.Mixin.create({
  init() {
    this._super(...arguments);
    this._map = {};
  },

  setParam(name, value) {
    let map = this._map;
    let item = map[name];
    let oldValue;

    if (item) {
      oldValue = item.value;
      item.value = value;

      if (oldValue !== value) {
        this.callCbs(name);
      }
    } else {
      map[name] = {
        value,
        cbs: []
      };
    }
  },

  getParam(name) {
    let map = this._map;
  	let item = map[name];

    return item ? item.value : undefined;
  },

  setParams(hash) {
    Object.keys(hash).forEach(key => {
      let value = hash[key];
      this.setParam(key, value);
    });
  },

  subscribe(name, cb) {
    let map = this._map;
    let item = map[name];

    if (item) {
      item.cbs.push(cb);
    } else {
    	map[name] = {
				value: undefined,
        cbs: [cb]
      };
    }
  },

  unsubscribe(name, cb) {
    let map = this._map;
    let item = map[name];

    if (item) {
      let index = item.cbs.indexOf(cb);

      if (index !== -1) {
        item.cbs.splice(index, 1);
      }
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

    keys.forEach(key => {
      // only set if it doesn't exist yet
      if (!this._map[key]) {
        this.setParam(key, get(context, key));
      }
      this.subscribe(key, update);
    });

    let originalWillDestroy = context.willDestroy;
    // Override willDestroy to cleanup handlers
    if (originalWillDestroy) {
      context.willDestroy = () => {
        keys.forEach(key => this.unsubscribe(key, update));
        originalWillDestroy(...arguments);
      };
    }
  },

  callCbs(name) {
    let map = this._map;
  	let item = map[name];

  	if (item) {
      item.cbs.forEach(cb => cb(name, item.value));
    }
  }
});
