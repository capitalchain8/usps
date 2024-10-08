const express = require("express")
const Mailjet = require('node-mailjet')
let request = require('request');
const random_number = require("random-number")



const { welcomeTemplate, fundTemplate, withdrawTemplate } = require('../utiils/util');
const { History, Cossignment } = require("../database/databaseConfig");

module.exports.gethome = async (req, res, next) => {
   res.status(200).render('track-result')
}


module.exports.track = async (req, res, next) => {
   res.status(200).render('track')
}

module.exports.trackResult = async (req, res, next) => {
   try {
      let {
         wpcargo_tracking_number,
      } = req.body


      let foundCossinment = await Cossignment.findOne({courier_Reference_No: wpcargo_tracking_number })

      console.log(foundCossinment)

      if (!foundCossinment) {
         return res.status(200).render('track-empty')
      }

      //get all history of the cossigment

      let historys = await History.find({ cossignment: foundCossinment })
      console.log(historys)

      return res.status(200).render('track-result',{
         cossignment:foundCossinment,
         historys:historys
      })

   } catch (err) {
      return res.status(200).render('track-empty')
   }
}

module.exports.services = async (req, res, next) => {
   res.status(200).render('services')
}






















































































