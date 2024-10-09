const express = require("express")
const Mailjet = require('node-mailjet')
let request = require('request');
const random_number = require("random-number")



const { History, Cossignment } = require("../database/databaseConfig");

module.exports.gethome = async (req, res, next) => {
   res.status(200).render('index')
}




module.exports.trackResult = async (req, res, next) => {
   res.status(200).render('track-result')
}
























































































