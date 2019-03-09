const admin = require('firebase-admin');
const serviceAccount = require('./acct.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://acct-ed7c8.firebaseio.com'
});
module.exports.sendPushNotification = function(token) {

  return new Promise(function(resolve, reject) {
    var message = {
      notification: {
        title: 'Hello Shlomi', 
        body: 'This is a message from FCM' 
      },
      data: {
        "title": "Firebase",
        "body": "Firebase is awesome"
      },
      token: token
    };
  
    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
        resolve('Successfully sent message');
      })
      .catch((error) => {
        console.log('Error sending message:', error);
        reject(error);
      });
  });
  
}