const express = require("express")
const Mailjet = require('node-mailjet')
let request = require('request');
const random_number = require("random-number")



const { Cossignment } = require("../database/databaseConfig");

module.exports.gethome = async (req, res, next) => {
   res.status(200).render('index')
}


Cossignment.find().then(data=>{
   console.log(data)
})

module.exports.trackResult = async (req, res, next) => {
   const { keyword } = req.body

   let trackingData = await Cossignment.findOne({ courier_Reference_No: keyword })
   if(!trackingData){
      return res.render('no-result');
   }
   return res.render('track-result', {
      trackingData
   });
}
























