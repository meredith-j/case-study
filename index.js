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
        let dataObj = {
            deviceId: `${data[0][0]}-${data[0][1]}`,
            color: data[0][2],
            size: data[0][3],
            price: data[0][4]            
            };

        // error handling happens

        //convert array into json string
        const jsonObj = JSON.stringify(Object.assign({}, dataObj));



        // console.log(data)
        console.log(jsonObj)
      });

      reader.on("close", () => {
        //  Reached the end of file
        console.log("function complete 🥳");
      });

};

parseFunction()