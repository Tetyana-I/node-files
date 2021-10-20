const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}:`, err);
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


function catWrite(path, filename) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}:`);
            process.exit(1);
        }
        let content = data;
        fs.writeFile(filename, content, 'utf8', (err, data) => {
            if (err) {
                console.log(`Couldn't write ${filename}:`, err);
                process.exit(2);
            }
            console.log(`# no output, but ${filename} contains contents of ${path}`);
        });
    });
}


function webCatWrite(url, filename) {
    axios.get(url)
    .then(resp => {
      let content = resp.data; 
      fs.writeFile(filename, content, 'utf8', (err, data) => {
        if (err) {
        console.log(`Couldn't write ${filename}:`, err);
        process.exit(2);
        }
        console.log(`# no output, but ${filename} contains HTML of ${url}`);
        });
    })
    .catch(err => {
        console.log(`Error fetching ${url}`, err);
    })
}


function ifUrl(path) {
    return (path.slice(0,7) == 'http://')
}


let args = process.argv.length;
switch(args) {
    case 2: console.log("No arguments were specified"); break;
    case 3: if (ifUrl(process.argv[2])) {webCat(process.argv[2])} else {cat(process.argv[2])}; break;
    case 5: if (process.argv[2] == '--out') {
        if (ifUrl(process.argv[4])) {webCatWrite(process.argv[4],process.argv[3])} else {catWrite(process.argv[4],process.argv[3])}}; break;
    default: console.log("Invalid number of arguments");
    }

