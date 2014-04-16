'use strict';

module.exports = {
    options: {
        limit: 4
    },
    server: {
        tasks: ['nodemon:dev', 'shell:mongo', 'watch:scripts', 'watch:less', 'watch:test'],
        options: {
            logConcurrentOutput: true
        }
    },
    test: [

    ],
    dist: [
        'imagemin',
        'svgmin',
        'htmlmin:dist',
        'cssmin'
    ]
};