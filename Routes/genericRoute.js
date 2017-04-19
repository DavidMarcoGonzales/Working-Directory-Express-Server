/**
 * Created by David on 10/12/2016.
 */
var express = require('express');

var routes = function (MongooseAPIModel) {
    var genericRouter = express.Router();
    genericRouter.route('/:section/:subsetion/:cardNum')
        .get(function (req, res) {
            MongooseAPIModel.find({currentURN: req.originalUrl}, function (err, cards) {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    return res.json(cards);
                }
            });
        });
    return genericRouter;
};
module.exports = routes;