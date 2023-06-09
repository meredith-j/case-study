const fs = require("fs");
const readline = require("readline");
const { v4: uuidv4 } = require('uuid');
const csvFile = "./input/case-study-data.csv"
// const newArray = "./functions.js"

function parseFunction (csvFilePath) {
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
        // const jsonObj = JSON.stringify(Object.assign({}, dataObj));

        let jsonFile = uuidv4() + ".json"

        // save jsonObj to new json file
        // fs.writeFile(`${data[0]}`.json, jsonObj, 'utf8')
        fs.writeFileSync('./output-json/' + jsonFile, JSON.stringify(Object.assign({}, dataObj)), (err) => {
            if (err) {
                throw (err)
            }
            else return
         });
            
        console.log(jsonFile)
        // console.log(jsonObj)
      });

      reader.on("close", () => {
        //  Reached the end of file
        console.log("function complete 🥳");
        return
      });
      
      return
};

parseFunction(csvFile)
