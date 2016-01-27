var db = require('../db_config.js');
var mongoose = require('mongoose');
var helpers = require("../helpers/helpers.js");
var bcrypt = require('bcrypt');

module.exports = {

  recoverPassword: function(req, res, next) {
    var user = req.body;
    console.log('user inside sendPasswordRecoveryEmail: ', user);

  }
}
