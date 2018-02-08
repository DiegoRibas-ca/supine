//npm install twilio
//Then in your code:
//var twilio = require('twilio');
const secrets = require('./secrets');

var accountSid = 'AC12b2a9688196e05e1e204fb2f0a0eaab'; // Your Account SID from www.twilio.com/console
var authToken = secrets.TWILIO_TOKEN;   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'thundershowers today',
    to: '+16472296260',  // Text this number
    from: '+12892174594', // From a valid Twilio number
})
.then((message) => console.log(message.sid));
