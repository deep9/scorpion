# SimpleDi 2

## Quickstart
Install SimpleDi 2 with npm: `npm install simpledi2`.

```javascript
import SimpleDi from 'simpledi2';
const di = new SimpleDi();
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

### `SimpleDi.always(objectOrFunction)`

Name | Type | Description
-----|------|------------
objectOrFunction | `mixed` | Always returns this argument

A factory function that always returns the first argument when `di.get` is called.

### `SimpleDi.withNew(Constructor)`

Name | Type | Description
-----|------|------------
Constructor | `function` | A constructor function

When `di.get` is called this factory function will initialize the given constructor with new.

### `SimpleDi.withNewOnce(Constructor)`

Name | Type | Description
-----|------|------------
Constructor | `function` | A constructor function

When `di.get` is called the *first time* this factory function will initialize 
the given constructor and for all upcoming calls it will always return the
same instance. You can think of it as a singleton factory.
