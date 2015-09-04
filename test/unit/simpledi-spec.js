import SimpleDi from '../../src/simpledi.js';


describe('SimpleDi', function() {

  let di;
  beforeEach(function() {
    di = new SimpleDi();
  });

  describe('register', function(done) {
    it('registers a simple object', function() {
      expect(function() {
        di.register('foo', {});
      }).not.toThrow();
    });
    it('throws when something is already registered with the same name', function() {
      di.register('foo', {});
      expect(function() {
        di.register('foo', {});
      }).toThrow();
    });
    it('throws when a invalid number of arguments is passed', function() {
      expect(function() {
        di.register('foo');
      }).toThrow();
    });
  });

  describe('forceRegister', function() {
    it('does not throw when a invalid number of arguments is passed', function() {
      di.register('foo', {});
      expect(function() {
        di.forceRegister('foo', {});
      }).not.toThrow();
    });
  });

  describe('get', function() {

    const depA = {a: true};
    const depB = {b: true};
    const depC = {c: true};
    beforeEach(function() {
      di.register('depA', function() {
        return depA;
      });
      di.register('depB', function() {
        return new Promise(function(resolve) {
          resolve(depB);
        });
      });
    });

    it('retrieves a module', function(done) {
      di.get('depA').then(function(retrievedObj) {
        expect(retrievedObj).toBe(depA);
        done();
      });
    });

    it('retrieves a async module', function(done) {
      di.get('depB').then(function(retrievedObj) {
        expect(retrievedObj).toBe(depB);
        done();
      });
    });

    it('retrieves a async module and resolves its dependencies', function(done) {
      di.register('depC', ['depB'], function(depB) {
        return new Promise(function(resolve, reject) {
          if(depB) {
            resolve(depC);
          } else {
            reject();
          }
        });
      });
      di.get('depC').then(function(retrievedObj) {
        expect(retrievedObj).toBe(depC);
        done();
      }).catch(function() {
        throw new Error('module not resolved');
      });
    });
  });

});
