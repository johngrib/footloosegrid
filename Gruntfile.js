module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/time.js', 
              'src/head.js',
              'src/utilities.js',
              'src/configure.js',
              'src/initializer.js',
              'src/cell_define.js',
              'src/constructor.js',
              'src/event.js',
              'src/sort_functions.js',
              'src/show_data.js',
              'src/calc_row.js',
              'src/controls.js',
              'src/filter.js',
              'src/search.js',
              'src/modal.js',
              'src/tail.js'
              ],
        dest: 'dist/footloosegrid.js',
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        //src: 'dist/<%= pkg.name %>.js',
        src: 'build/<%= pkg.name %>.bundle.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);
};