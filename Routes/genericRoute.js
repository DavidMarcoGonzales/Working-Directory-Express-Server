/**
 * Created by David on 10/12/2016.
 */
var express = require('express');

var routes = function (MongooseAPIModel, apiPath) {
    var genericRouter = express.Router();

    genericRouter.route('/:page/:section/:subsetion/:cardNum')
        .post(function (req, res) {
            var mongooseAPIObj = new MongooseAPIModel(req.body);
            mongooseAPIObj.save();
            res.status(201).send(mongooseAPIObj);
        })
        .get(function (req, res) {
            MongooseAPIModel.find({url: req.path}, function (err, cards) {
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