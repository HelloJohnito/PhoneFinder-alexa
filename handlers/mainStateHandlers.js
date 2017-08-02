var Alexa = require('alexa-sdk');

// Constants
var constants = require('../constants/constants');


var mainStateHandlers = Alexa.CreateStateHandler(constants.states.MAIN, {

  'LaunchRequest': function () {
    this.emit(':ask', "Do you want to ring your phone?");
  },


  'FindIntent': function(){

  }

});
