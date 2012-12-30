module.exports = function (grunt)
{

    // ==========================================================================
    // TASKS
    // ==========================================================================

    grunt.registerMultiTask('bom', 'byte order mark remove files.', function ()
    {
        var files = this.file.src;
        files.map(function (filepath)
        {
            if (!grunt.file.exists(filepath))
            {
                grunt.log.error('Source file "' + filepath + '" not found.');
                return '';
            }

            var content = grunt.file.read(filepath);
            if (/^\uFEFF/.test(content))
            {
                content = content.replace(/^\uFEFF/, '');
                grunt.file.write(filepath, content);
                grunt.log.writeln('File "' + filepath + '" rewritten.');
            }
        });

        // Fail task if errors were logged.
        if (this.errorCount) { return false; }
    });
}
