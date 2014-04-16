'use strict';

module.exports = {
    // for changes to the node code
    nodemon: {
        dev: {
            options: {
                file: 'server/server.js',
                nodeArgs: ['--debug'],
                watchedFolders: ['server'],
                env: {
                    PORT: '3300'
                }
            }
        }
    }
};