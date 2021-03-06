// Generated by CoffeeScript 1.7.1
(function() {
  var quickmeteor, _;

  require('shelljs/global');

  _ = require('underscore');

  quickmeteor = {
    main: function() {
      var _ref;
      switch ((_ref = process.argv[2]) != null ? _ref.toLowerCase() : void 0) {
        case 'reset':
          return quickmeteor.reset();
        default:
          return quickmeteor.usage();
      }
    },
    reset: function() {
      exec('readlink .meteor/local/db', function(code, output) {
        return quickmeteor.linkTarget = output.trim() || '';
      });
      return quickmeteor.waitUntilDefined(['linkTarget'], function() {
        if (quickmeteor.linkTarget) {
          rm('-rf', '.meteor/local/db/*');
        } else {
          console.log('quickmeteor: .meteor/local/db is not a symbolic link');
          console.log('quickmeteor: an empty db will be created there the next time you run the project');
        }
        exec('meteor reset');
        if (quickmeteor.linkTarget) {
          rm('-rf', '.meteor/local/db');
          mkdir('-p', '.meteor/local');
          return ln('-sf', quickmeteor.linkTarget, '.meteor/local/db');
        }
      });
    },
    usage: function() {
      return console.log("Usage: quickmeteor reset\n\n" + "Works like `meteor reset`, but if the Meteor project\n" + "has a symlink at `.meteor/local/db`, it deletes\n" + "all the db files in the target directory and restores\n" + "the symlink after `meteor reset`.\n");
    },
    waitUntilDefined: function(args, callback) {
      var originalArgs;
      if (_.some(args, function(arg) {
        return typeof quickmeteor[arg] === 'undefined';
      })) {
        originalArgs = arguments;
        return setTimeout(function() {
          return quickmeteor.waitUntilDefined.apply(null, originalArgs);
        }, 10);
      }
      return callback();
    }
  };

  quickmeteor.main();

}).call(this);

//# sourceMappingURL=quickmeteor.map
