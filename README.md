# Scorpion

## Quickstart
Install Scorpion 2 with npm: `npm install simpledi2`.

```javascript
import Scorpion from 'scorpion';
const di = new Scorpion();

// register an object
di.register('myConfig', Scorpion.always({
  test: true
}));

// register a class
class MyClass {
  constructor(myConfig) {
  }
}
di.register('MyClass', ['myConfig'], Scorpion.withNew(MyClass));

// register an async factory
di.register('asyncModule', () => {
  return new Promise((resolve) => {
    // do some async tasks then resolve
    resolve({
      asyncModule: true
    });
  });
});

// get registered modules
di.get('myConfig').then((myConfig) => {
  // do something
});

di.get('MyClass').then((myClassInstance) => {
  // do something
});

di.get('asyncModule').then((asyncModule) => {
  // do something
});
```

## API

### Registration of modules

#### `di.register(name, dependencies, factoryFunction)`

Register a module with dependencies.

```javascript
di.register('foo', ['bar'], (bar) => {
  return {};
});
```

#### `di.register(name, factoryFunction)`

Register a module without dependencies.

```javascript
di.register('foo', () => {
  return {};
});
```

#### `di.forceRegister(name, dependencies, factoryFunction)`
#### `di.forceRegister(name, factoryFunction)`

This method just works like `register` but won't throw when a module with the same name already exists.

### Get and resolve dependencies

#### `di.get(name)`

`get` returns a promise which will be resolved once all dependencies are resolved.

```javascript
di.get('foo').then((foo) => {
  // do something with foo
});
```

## Built-in factory functions

### `Scorpion.always(objectOrFunction)`

Name | Type | Description
-----|------|------------
objectOrFunction | `mixed` | Always returns this argument

A factory function that always returns the first argument when `di.get` is called.

### `Scorpion.once(objectOrFunction)`

Name | Type | Description
-----|------|------------
objectOrFunction | `mixed` | Invokes this function once

Invokes the passed factory once and will then always return the same return value.

### `Scorpion.withNew(Constructor)`

Name | Type | Description
-----|------|------------
Constructor | `function` | A constructor function

When `di.get` is called this factory function will initialize the given constructor with new.

### `Scorpion.withNewOnce(Constructor)`

Name | Type | Description
-----|------|------------
Constructor | `function` | A constructor function

When `di.get` is called the *first time* this factory function will initialize 
the given constructor and for all upcoming calls it will always return the
same instance. You can think of it as a singleton factory.
