var Alexa = require('alexa-sdk');

// Constants
var constants = require('../constants/constants');

//Twilio Information
var accountSid = process.env['accountSid'];
var authToken = process.env['authToken'];

var client = require('twilio')(accountSid, authToken);


var mainStateHandlers = Alexa.CreateStateHandler(constants.states.MAIN, {

  'LaunchRequest': function () {
    this.emit(':ask', "Ok, do you want to call your phone?", "Do you want to ring your phone? Say yes or cancel.");
  },

  'CallIntent': function(){
    var self = this;
    client.calls.create({
      url: 'http://demo.twilio.com/docs/voice.xml',
      to: `+1${this.attributes['phoneNumber']}`,
      from: process.env['fromPhoneNumber'],
    }, function(err, call){
      if(err){
        console.log(err);
        self.emit(':tell', "Sorry there was an error with the program.");
      }
      else{
        console.log(call.sid);
        self.emit(':tell', "We are now calling your phone.");
      }
    });
  },

  'AMAZON.StopIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', 'Goodbye!');
  },

  'AMAZON.CancelIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', 'Goodbye!');
  },

  'AMAZON.HelpIntent': function(){
    this.emit(':ask', "Do you want me to call your phone?");
  },

  'Unhandled': function () {
    this.emitWithState('AMAZON.HelpIntent');
  },

});


module.exports = mainStateHandlers;
