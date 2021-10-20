const fs = require('fs');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}:`, err);
            process.exit(1);
        }
        console.log(data);
    });
}

process.argv.length > 2 ?  cat(process.argv[2]) : console.log("No file path was specified");
 
 