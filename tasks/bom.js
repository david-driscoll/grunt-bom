/*
 * grunt
 * https://github.com/cowboy/grunt
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 */

module.exports = function(grunt) {

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('bom', 'Concatenate files.', function() {
    var files = grunt.file.expandFiles(this.file.src);
    // Concat specified files.
    grunt.helper('bom', files);

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  // Concat source files and/or directives.
  grunt.registerHelper('bom', function(files) {
	if (files)
	{
		files.map(function(filepath)
		{
			var content = grunt.task.directive(filepath, grunt.file.read);
			if (/^\uFEFF/.test(content))
			{
				content = content.replace(/^\uFEFF/, '');
				grunt.file.write(filepath, content);
				grunt.log.writeln('File "' + filepath + '" rewritten.');
			}
		});
	}
  });

};
