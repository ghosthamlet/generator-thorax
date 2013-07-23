var util = require('util');
var path = require('path');
var Base = require('../lib/base');

var ThoraxGenerator = module.exports = function (args, options, config) {
  Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });
};

util.inherits(ThoraxGenerator, Base);

ThoraxGenerator.prototype._name  = 'application';
ThoraxGenerator.prototype.askFor = Base.prototype._askFor;

ThoraxGenerator.prototype.app = function () {
  this.template('_bower.json', 'bower.json');
  this.template('_lumbar.json', 'lumbar.json');
  this.template('_package.json', 'package.json');

  this.directory('seed', '.', true);

  this.mkdir('js');
  this.mkdir('js/views');
  this.mkdir('js/models');
  this.mkdir('js/routers');
  this.mkdir('js/collections');
};

ThoraxGenerator.prototype.scripts = function () {
  this.template('_view.js', 'js/view.js');
  this.template('_init.js', 'js/init.js');
  this.template('_model.js', 'js/model.js');
  this.template('_collection.js', 'js/collection.js');

  this.template('_index.html', 'public/index.html');
};

ThoraxGenerator.prototype.projectFiles = function () {
  this.copy('jshintrc', '.jshintrc');
  this.copy('editorconfig', '.editorconfig');
  this.copy('bowerrc', '.bowerrc');
};
