var Alexa = require('alexa-sdk');

// Constants
var constants = require('../constants/constants');


var onboardingStateHandlers = Alexa.CreateStateHandler(constants.states.ONBOARDING, {

  'NewSession': function () {
    var phoneNumber = this.attributes['phoneNumber'];

    if(phoneNumber){
      this.handler.state = constants.states.MAIN;
      this.emitWithState('LaunchRequest');
    }
    else {
      this.emit(':ask', "We do not have a phone number stored in our system. What is your phone number?");
    }

  },

  //"my phone number is ..."
  'SaveNumberIntent': function (){
    var phoneNumber = this.event.request.intent.slots.phoneNumber.value;
    this.attributes['phoneNumber'] = phoneNumber;
    // find a way to confirm.
    // this.response.speak('foo');
    console.log(phoneNumber);
    this.emit(':tell', `Is this the correct number? ${phoneNumber}`);
    // this.attributes['phoneNumber'] = phoneNumber;
    // this.handler.state = constants.states.MAIN;
    // this.emitWithState('LaunchRequest');
  },

  'AMAZON.StopIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', 'Goodbye!');
  },

  'AMAZON.CancelIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', 'Goodbye!');
  },

  'SessionEndedRequest': function () {
    // Force State to Save when the user times out
    this.emit(':saveState', true);
  },

  'AMAZON.HelpIntent': function () {
    this.emit(':tellWithLinkAccountCard', 'Please link your account to use this skil. I\'ve sent the details to your alexa app.');
  },

  'Unhandled': function () {
    this.emitWithState('AMAZON.HelpIntent');
  }

});

module.exports = onboardingStateHandlers;
