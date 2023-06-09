const fs = require("fs");
const readline = require("readline");
const csvFilePath = "./input/case-study-data.csv"
// const newArray = "./functions.js"

function parseFunction () {
    console.log("function initialized 🚀")

    const stream = fs.createReadStream(csvFilePath);
    const reader = readline.createInterface({ input: stream });

    reader.on("line", row => {
        // split document by rows

        // create array (must be nested here for scope)
        let data = [];
        
        // push row content into data array        
        data.push(row.split(","));

        // data array must be converted into an object
        // error handling happens as array is being converted

        let dataObj = {
            name: "",
            color: "",
            size: "",
            price: ""            
            };

        //convert array into json string
        const jsonObj = JSON.stringify(Object.assign({}, data[0]));

        // console.log(data)
        console.log(jsonObj)
      });

      reader.on("close", () => {
        //  Reached the end of file
        console.log("function complete 🥳");
      });

};

parseFunction()