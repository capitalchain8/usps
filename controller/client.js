const express = require("express")
const Mailjet = require('node-mailjet')
let request = require('request');
const random_number = require("random-number")



const { History, Cossignment } = require("../database/databaseConfig");

module.exports.gethome = async (req, res, next) => {
   res.status(200).render('index')
}




module.exports.trackResult = async (req, res, next) => {
   console.log(req.body)

   let trackingData = [{
      inTransit: {
        status: 'In Transit',
        location: 'United States',
        timestamp: '10:39',
        active: true
      },
      pickedUp: { status: 'Picked Up', location: '', timestamp: '', active: false },
      preparingForDelivery: {
        status: 'Preparing For Delivery',
        location: '',
        timestamp: ' ',
        active: false
      },
      outForDelivery: {
        status: 'Out For Delivery',
        location: '',
        timestamp: '',
        active: false
      },
      delivered: { status: 'Delivered', location: '', timestamp: '', active: false },
      _id: '67064edb182a0436ac36b395',
      payment_mode: 'Cash',
      carrier: 'DHL',
      destination: 'United States',
      mode: 'Sea transport',
      origin: 'United States',
      piece_type: 'Pallet',
      shipper_name: 'precious',
      shipper_phoneNumber: '07014991581',
      shipper_address: 'Asaba delta state. Meed Field',
      shipper_email: 'arierhiprecious@gmail.com',
      reciever_name: 'John',
      reciever_email: 'arierhiprecious@gmail.com',
      reciever_phoneNumber: '07014991581',
      reciever_address: '2055 Limestone Road',
      weight: '90',
      packages: '90',
      product: 'product',
      depature_time: '10:39',
      pickup_time: '10:41',
      quantity: '90',
      total_freight: '899',
      courier_Reference_No: '5124804310',
      pickup_date: '2024-10-16',
      expected_delivery_date: '2024-10-25',
      Qty: '90',
      description: 'description',
      length: '900',
      width: '900',
      height: '90',
      __v: 0
    }]



   return res.render('track-result', { trackingData });


}


















































































