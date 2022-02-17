const pinataSDK = require('@pinata/sdk');
const fs = require('fs');
require('dotenv').config();
console.log(process.env.PINATA_API_KEY, '\n', process.env.PINATA_API_SECRET)
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

pinata.testAuthentication().then((result) => {
    //handle successful authentication here
    console.log(result);
    uploadDirectory('./out')
}).catch((err) => {
    //handle error here
    console.log(err);
});

function uploadDirectory(dir) {
    const sourcePath = dir;
    pinata.pinFromFS(sourcePath).then((result) => {
        //handle results here
        console.log(result);
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}