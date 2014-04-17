'use strict';

module.exports = {
    // for changes to the node code
    dev: {
        script: 'server.js',
        options: {
            cwd: 'server',
            nodeArgs: ['--debug'],
            watchedFolders: ['server'],
            env: {
                PORT: '3300'
            }
        }
    }
};