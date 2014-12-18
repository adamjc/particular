module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            release: {
                files: {
                    'particular.min.js': ['random.js', 'particular.js']
                }
            }
        }
    });

    grunt.registerTask('minify', ['uglify']);

    grunt.loadNpmTasks('grunt-contrib-uglify');
}
