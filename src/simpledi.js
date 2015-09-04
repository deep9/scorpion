export default class SimpleDi {

  constructor() {
    this._registry = {};
  }

  get(name) {
    if(!this._registry[name]) {
      throw new Error('Module not found: ' + name);
    }
    const requestedModule = this._registry[name];
    return new Promise((resolve, reject) => {
      Promise.all(requestedModule.dependencies.map((dependencyName) => {
        return this.get(dependencyName);
      })).then((dependencies) => {
        const returnValue = requestedModule.factory.apply(null, dependencies);
        if(typeof returnValue.then === 'function') {
          returnValue.then((resolvedModule) => {
            resolve(resolvedModule);
          });
        } else {
          resolve(returnValue);
        }
      });
    });
  }

  register(...args) {
    if(args.length === 2) {
      // name, factory
      return this._register(args[0], args[1]);
    }
    if(args.length === 3) {
      // name, dependencies, factory
      return this._register(args[0], args[2], args[1]);
    }
    throw new Error('Invalid number of arguments');
  }

  forceRegister(...args) {
    if(args.length === 2) {
      // name, factory
      return this._register(args[0], args[1], undefined, true);
    }
    if(args.length === 3) {
      // name, dependencies, factory
      return this._register(args[0], args[2], args[1], true);
    }
    throw new Error('Invalid number of arguments');
  }

  _register(name, factory, dependencies = [], overwrite = false) {
    if(this._registry[name] && overwrite === false) {
      throw new Error('Module already exists: ' + name);
    }
    this._registry[name] = {
      factory,
      dependencies
    }
  }

}
