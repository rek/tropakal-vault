'use strict';

module.exports = {
    index: function(req, res) {
        //res.render('index');
        res.json({
            data: 'Well, what ya doing to do with this?'
        });
    }
};
