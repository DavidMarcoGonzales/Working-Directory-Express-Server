/**
 * Created by David on 10/12/2016.
 */
var express = require('express');

var routes = function (MongooseAPIModel, apiPath ) {
    var genericRouter = express.Router();

    genericRouter.route('/')
        .post(function (req, res) {
            var mongooseAPIObj = new MongooseAPIModel(req.body);
            mongooseAPIObj.save();
            res.status(201).send(mongooseAPIObj);
        })
        .get(function (req, res) {
            var query = {};
            if (req.query.genre) {
                query.genre = req.query.genre;
            }
            MongooseAPIModel.find(query, function (err, mongooseAPIObjs) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    var returnJSONArray = [];
                    mongooseAPIObjs.forEach(function (element, index, array) {
                        var newJSON = element.toJSON();
                        newJSON.links = {};
                        newJSON.links.self = `http://${ req.headers.host}/${apiPath}/${newJSON._id}`;
                        returnJSONArray.push(newJSON);
                    });
                    /* res.json returns array of json */
                    res.json(returnJSONArray);
                }
            });
        });
    genericRouter.use('/:id', function (req, res, next) {
        console.log(req);
        MongooseAPIModel.findById(req.params.id, function (err, mongooseAPIObj) {
            if (err) {
                res.status(500).send(err);
            }
            else if (mongooseAPIObj) {
                req.mongooseAPIObj = mongooseAPIObj;
                next();
            } else {
                res.status(404).send('no book found');
            }
        });

    });
    genericRouter.route('/:id')
        .get(function (req, res) {
            var returnJSON = req.mongooseAPIObj.toJSON();
            returnJSON.links = {};
            var newLink = `http://${ req.headers.host}/${apiPath}/?genre=${returnJSON.genre}`;
            returnJSON.links.FilterByThisGenre = newLink.replace(' ', '%20');
            res.json(returnJSON);
        })
        .put(function (req, res) {
            for (var p in req.body) {
                req.mongooseAPIObj[p] = req.body[p];
            }
            req.mongooseAPIObj.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.mongooseAPIObj)
                }
            });

        })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id
            }
            for (var p in req.body) {
                req.mongooseAPIObj[p] = req.body[p];
            }
            req.mongooseAPIObj.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.mongooseAPIObj)
                }
            });
        })
        .delete(function (req, res) {
            req.mongooseAPIObj.remove(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Removed');
                }
            });
        });
    return genericRouter;
};
module.exports = routes;