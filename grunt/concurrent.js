'use strict';

module.exports = {
    options: {
        limit: 4
    },
    server: {
        tasks: ['nodemon:dev', 'shell:mongo', 'watch'],
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