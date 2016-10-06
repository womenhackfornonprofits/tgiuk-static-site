module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    s3settings: grunt.file.readJSON('s3settings.json'),

    //------- AWS -------//
    aws_s3: {
      options: {
       accessKeyId: '<%= s3settings.key %>',
        secretAccessKey: '<%= s3settings.secret %>',
        region: '<%= s3settings.region %>',
        uploadConcurrency: 5,
        downloadConcurrency: 5
      },
      img: {
        options: {
          bucket: '<%= s3settings.bucket %>',
          differential: true // Only uploads the files that have changed
        },
        files: [
          {expand: true, cwd: 'deploy/img/', src: ['**/*.{png,jpg,jpeg,JPG}'], dest: 'img/', params: {CacheControl: 'max-age=31536000, public'}},
        ]
      },
      svg: {
        options: {
          bucket: '<%= s3settings.bucket %>',
          differential: true // Only uploads the files that have changed
        },
        files: [
          {expand: true, cwd: 'deploy/img/', src: ['**/*.svg'], dest: 'img/', params: {CacheControl: 'max-age=31536000, public', ContentEncoding: 'gzip'}},
        ]
      },
      html: {
        options: {
          bucket: '<%= s3settings.bucket %>',
          differential: true // Only uploads the files that have changed
        },
        files: [
          //{expand: true, cwd: 'deploy/', src: ['*.html'], dest: '', params: {CacheControl: 'max-age=31536000, public', ContentEncoding: 'gzip'}},
          {expand: true, cwd: 'deploy/', src: ['*.html'], dest: '', params: {CacheControl: 'max-age=31536000, public'}},

        ]
      },
      css: {
        options: {
          bucket: '<%= s3settings.bucket %>',
          differential: true // Only uploads the files that have changed
        },
        files: [
          //{expand: true, cwd: 'deploy/css/', src: ['**'], dest: '', params: {CacheControl: 'max-age=31536000, public', ContentEncoding: 'gzip'}},
          {expand: true, cwd: 'deploy/css/', src: ['**'], dest: 'css/', params: {CacheControl: 'max-age=31536000, public'}},

        ]
      },
      download: {
        options: {
          bucket: '<%= s3settings.bucket %>',
        },
        files: [
          {dest: '/', cwd: 'backup/', action: 'download'},
        ]
      },
    },
    //------- CSS Minify -------//
    cssmin: {
      combine: {
        files: [
          {expand: true, cwd: 'src', src: ['**/*.css'], dest: 'deploy/'},
        ]
     }
    },
    //------- HTML Minify -------//
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true,
        },
        files: [
          {expand: true, cwd: 'src/', src: ['**/*.html'], dest: 'deploy/'},
        ]
      }
    },
    //------- Copy -------//
   copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, cwd: 'src/', src: ['css'], dest: 'deploy/', filter: 'isFile'},
        ]
      },
      img: {
        files: [
          {expand: true, cwd: 'src/img', src: ['*.{png,jpg,jpeg,svg}'], dest: 'deploy/img/', filter: 'isFile'},
        ]
      }
    },
    //------- SASS -------//
    sass: {
      dist: {
        files: {
          'src/css/styles.css': 'src/sass/styles.scss'
        }
      }
    },
    //------- Watch SASS -> CSS -------//
    watch: {
      sass: {
        files: 'src/sass/**/*.scss',
        tasks: ['sass']
      }
    },
  });


    /** DEPLOY task deployes all changes, check individual tasks above to see what they do **/
    grunt.registerTask('deploy', [ 'aws_s3:css','aws_s3:html', 'aws_s3:img', 'aws_s3:svg']);
    /** IMG task processess ALL images from src to deploy and optimizes them **/
    grunt.registerTask('img', ['copy:img']);
    /** DEFAULT task that compiles, minifies and copies relevant files**/
    grunt.registerTask('default', ['sass:dist', 'copy:main', 'copy:img', 'cssmin', 'htmlmin']);

};

