  const shortid = require('shortid');

  const Url = require("../models/models.js");

    exports.create = (req, res) => {

        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
        }
      
        const url = new Url({
            originalUrl:req.body.orglUrl,
            shorternUrl:'http://'+shortid.generate(),
        });
      
        // Save url in the database
        Url.create(url, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the url."
            });
          else res.send(data);
        });
      };

// Retrieve all urls from the database.
    exports.findAll = (req, res) => {
        Url.getAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving urls"
            });
          else res.send(data);
        });
      };
  

    exports.findOne = (req, res) => {
          Url.findById(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found url with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving url with id " + req.params.id
              });
            }
          } else res.send(data);
        });
      };
      

//update the original URL given its ID
    exports.update = (req, res) => {
        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
        }
      
        Url.updateById(req.params.id,
          new Url({
            originalUrl:req.body.orglUrl,
            shorternUrl:'http://'+shortid.generate()}) ,
            (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found url with id ${req.params.id}.`
                });
              } else {
                res.status(500).send({
                  message: "Error updating url with id " + req.params.id
                });
              }
            } else res.send(data);
          }
        );
      };
  
//delete the shortened URL given its ID
    exports.delete = (req, res) => {
        Url.remove(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found url with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Could not delete url with id " + req.params.id
              });
            }
          } else res.send({ message: `url was deleted successfully!` });
        });
      };
  
