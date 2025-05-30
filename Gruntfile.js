module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      downloadfile: {
        options: {
          dest: './downloads',
          overwriteEverytime: true
        },
        files: {
          'vscode.zip': 'https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-archive'
        }
      },
      unzip: {
        'build/vscode': 'downloads/vscode.zip'
      },
      zip: {
        'dist': {
          cwd: 'build/vscode',
          src: ['build/vscode/**/*'],
          dest: 'dist/vscode-dist.zip',
          compression: 'DEFLATE',
          dot: true
        }
      },
      mkdir: {
        data: {
          options: {
            create: ['build/vscode/data']
          },
        },
        build: {
          options: {
            create: ['build', 'build/vscode', 'dist', 'downloads']
          },
        },
      },
      'string-replace': {
        dist: {
          files: {
            'build\\vscode\\data\\argv.json': 'build\\vscode\\data\\argv.json'
          },
          options: { 
            replacements: [
              {
                pattern: /\/\/.*\n?/g,
                replacement: ''
              }
            ]
          }
        }
      },
      replace_json: {
        dist: {
          src: 'build\\vscode\\data\\argv.json',
          changes: {
              'disable-chromium-sandbox': true
          }
        },
      },
      exec: {
        vscode: {
          command: 'build\\vscode\\Code.exe project',
          stdout: true,
          stderr: true
        },
      },
      clean: [
        'dist', 
        'build',
        'downloads'
      ]
    });

    grunt.loadNpmTasks('grunt-downloadfile');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-replace-json');
    grunt.loadNpmTasks("grunt-string-replace");

    // Default task. Downloads latest VS Code portable and install the recommened extensions
    grunt.registerTask('default', ['clean', 'mkdir:build', 'downloadfile', 'unzip', 'mkdir:data', 'exec', 'string-replace:dist', 'replace_json:dist', 'zip']);

    // prepare folders
    grunt.registerTask('1', ['clean', 'mkdir:build']);
    // download VS Code portable
    grunt.registerTask('2', ['downloadfile']);
    // unzip VS Code portable to build folder
    grunt.registerTask('3', ['unzip']);
    // add folder data to make VS Code portable
    grunt.registerTask('4', ['mkdir:data']);
    // Run VS Code and add recommended extensions
    grunt.registerTask('5', ['exec']);
    // sanetize argv.json, remove comments
    grunt.registerTask('6', ['string-replace:dist']);
    // add parameter disable-chromium-sandbox to make VS Code work under Citrix
    grunt.registerTask('7', ['replace_json:dist']);
    // Zip the build folder to dist folder
    grunt.registerTask('8', ['zip:dist']);
  };