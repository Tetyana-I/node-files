const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}:`);
            process.exit(1);
        }
        console.log(data);
    });
}

function webCat(url) {
    axios.get(url)
    .then(resp => {
      console.log(resp.data);
    })
    .catch(err => {
        console.log(`Error fetching ${url}`)
    })
}


if (process.argv.length > 2) {
    let argString = process.argv[2];
    if (argString.slice(0,7) == 'http://') {
        webCat(argString); 
    } 
    else {
        cat(argString);
    }
 }
 else {
     console.log("No arguments were specified");
 }
 


