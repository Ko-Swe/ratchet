/*!
 * Ratchet Grunt task for Ratchicons data generation
 * http://goratchet.com
 * Original script from Bootstrap (http://getbootstrap.com).
 * Bootstrap is copyright 2015 Twitter, Inc. and licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE).
 */

/* jshint node: true */
/* eslint-env node */

'use strict';

var fs = require('fs');

module.exports = function generateRatchiconsData(grunt) {
  // Pass encoding, utf8, so `readFileSync` will return a string instead of a
  // buffer
  var ratchiconsFile = fs.readFileSync('sass/ratchicons.scss', 'utf8');
  var ratchiconsLines = ratchiconsFile.split('\n');

  // Use any line that starts with ".icon-" and capture the class name
  var iconClassName = /^\.(icon-[^\s]+)/;
  var ratchiconsData = '# This file is generated via Grunt task. **Do not edit directly.**\n' +
                       '# See the \'build-ratchicons-data\' task in Gruntfile.js.\n\n';
  var ratchiconsYml = 'docs/_data/ratchicons.yml';
  for (var i = 0, len = ratchiconsLines.length; i < len; i++) {
    var match = ratchiconsLines[i].match(iconClassName);

    if (match !== null) {
      ratchiconsData += '- ' + match[1] + '\n';
    }
  }

  // Create the `_data` directory if it doesn't already exist
  if (!fs.existsSync('docs/_data')) {
    fs.mkdirSync('docs/_data');
  }

  try {
    fs.writeFileSync(ratchiconsYml, ratchiconsData);
  } catch (err) {
    grunt.fail.warn(err);
  }
  grunt.log.writeln('File ' + ratchiconsYml.cyan + ' created.');
};
