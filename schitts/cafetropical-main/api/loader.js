
module.exports = {
   loadRoutes: function (app) {
    app.routes = [];
    // Endpoint routes 
    var filelist = this.getDirFileList(__dirname + '/routes');
    filelist.forEach(function (item) {
      var className = item.replace('.js', '');
      app.routes[className.toString()]= require('./routes/' + className);
    });
   
  },
  loadServices: function (app) {
    app.services = [];
    var filelist = this.getDirFileList(__dirname + '/services');
    filelist.forEach(function (item) {
      var className = item.replace('.js', '');
      app.services[className.toString()] = require('./services/' + className)
    });
  },
  getDirFileList: function (dir) {
    var fs = fs || require('fs');
    var walkSync = require('walk-sync');
    files = fs.readdirSync(dir);
    var filelist = filelist || [];
    files.forEach(function (file) {

      if (fs.statSync(dir + '/' + file).isDirectory()) {
        filelist = walkSync(dir + '/' + file, filelist);
      }
      else {
        filelist.push(file);
      }
    });
    return filelist;
  }

   
};
