const admin = require('firebase-admin');
const serviceAccount = require('../firebaseService.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://kalpas-assignment.appspot.com' 
});

const bucket = admin.storage().bucket();
module.exports = { bucket };