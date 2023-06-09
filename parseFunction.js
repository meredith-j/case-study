const fs = require("fs")
const readline = require("readline");
const csvFilePath = "./input/case-study-data.csv"

function parseFunction () {
    console.log("hiya!")

    fs.readFile(csvFilePath, 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            return;
        }
            console.log(data);

        console.log("all done 🤘🏻");
    })
    
};


module.exports = parseFunction