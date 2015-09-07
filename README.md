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
