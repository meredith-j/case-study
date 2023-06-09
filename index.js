const fs = require("fs");
const { parse } = require("path");
const readline = require("readline");

const csvFilePath = "./input/case-study-data.csv"
// const newArray = "./functions.js"

function parseFunction () {
    console.log("hiya!")

    const stream = fs.createReadStream(csvFilePath);
    const reader = readline.createInterface({ input: stream });

    reader.on("line", row => {
        // This will split a row string into an array
        // And then push into the data array
        let data = [];
        data.push(row.split(","));
        console.log(data)
      });

      reader.on("close", () => {
        //  Reached the end of file
        // console.log(data);
      });

};

parseFunction()