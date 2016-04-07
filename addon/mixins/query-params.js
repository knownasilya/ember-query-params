import Ember from 'ember';

const map = new Map();

export default Ember.Mixin.create({
  setParam(name, value) {
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
  	var item = map.get(name);
    return item ? item.value : undefined;
  },

  subscribe(name, cb) {
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

    let update = (name, val) => { Ember.run(context, 'set', name, val); }
    keys.forEach(key => this.subscribe(key, update));
  },

  callCbs(name) {
  	if (map.has(name)) {
      let item = map.get(name);
      item.cbs.forEach(cb => cb(name, item.value));
    }
  }
});
