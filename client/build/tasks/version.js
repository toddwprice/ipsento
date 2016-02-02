var gulp = require('gulp');
var fs = require('fs');

gulp.task('version', function() {
  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  var versionFile = 'export class Version {\r\n';
  versionFile += 'versionNumber = "v' + pkg.version + '";\r\n';
  versionFile += '}';
  fs.writeFile('./src/version.js', versionFile);
});
