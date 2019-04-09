const admin = require('firebase-admin');
const serviceAccount = require('./acct.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://acct-ed7c8.firebaseio.com'
});
module.exports.sendPushNotification = function(token, title, message) {

  return new Promise(function(resolve, reject) {
    var msg = {
      notification: {
        title: title, 
        body: message
      },
      // data: {
      //   "title": "Firebase",
      //   "body": "Firebase is awesome"
      // },
      token: token
    };
  
    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().send(msg)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
        resolve({ message: 'Successfully sent message'});
      })
      .catch((error) => {
        console.log('Error sending message:', error);
        reject(error);
      });
  });
  
}