var Alexa = require('alexa-sdk');

// Constants
var constants = require('../constants/constants');

//Twilio Information
var accountSid;
var authToken;

var client = require('twilio')(accountSid, authToken);


var mainStateHandlers = Alexa.CreateStateHandler(constants.states.MAIN, {

  'LaunchRequest': function () {
    this.emit(':ask', "Do you want to ring your phone?");
  },


  'FindIntent': function(){
    client.calls.create({
      url: 'http://demo.twilio.com/docs/voice.xml',
      to: this.attributes['phoneNumber'],
      from: ''
    }, function(err, call){
      if(err){
        console.log(err);
        this.emit(':tell', "Sorry there was an error with the program.");
      }
      else{
        console.log(call.sid);
        this.emit(':tell', "We are now calling your phone.");
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
  }

});
