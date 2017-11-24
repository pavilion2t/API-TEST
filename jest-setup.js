let _bind = Function.prototype.apply.bind(Function.prototype.bind);
Object.defineProperty(Function.prototype, 'bind', {
    value: function(obj) {
        var boundFunction = _bind(this, arguments);
        boundFunction.boundObject = obj;
        return boundFunction;
    }
});

global.fetch = require('jest-fetch-mock');

if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
  process.on('unhandledRejection', reason => {
    if (process.argv.includes('--watch') === false)
      throw reason
    else {
      console.log(reason);
    }
  })
  // Avoid memory leak by adding too many listeners
  process.env.LISTENING_TO_UNHANDLED_REJECTION = true
}
