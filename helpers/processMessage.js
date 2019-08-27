const API_AI_TOKEN = 'eda11a96281c4b7b808e765064aea85f';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAAfrzH9sZAXMBAEERkZALUOgZCZCvUwK695xFJQ42U6wNnIN6gDicVkqS4EJG8gZABXZAj2nvzdF3IJkbYagwJwk7aZBRRCqLbV3k9pMW2wxOHRhF0NVEXqWx0Gxl0JSzfHsIDHnDF40Npx0ZAhFZCWBCpdoDpBeUrZAjMC2SVIK7DtAZDZD';
const request = require('request');
const sendTextMessage = (senderId, text) => {
 request({
 url: 'https://graph.facebook.com/v2.6/me/messages',
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: 'POST',
 json: {
 recipient: { id: senderId },
 message: { text },
 }
});
};
module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;
const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'Bunny'});
apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on('error', error => console.log(error));
 apiaiSession.end();
};