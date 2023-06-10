const fs = require("fs");
const readline = require("readline");
const { v4: uuidv4 } = require('uuid');
const csvFile = "./input/case-study-data.csv"
// const newArray = "./functions.js"

function parseFunction (csvFilePath) {

    // notify team function has started
    console.log("function initialized 🚀")

    fs.appendFile

    const stream = fs.createReadStream(csvFilePath, { encoding: "utf-8", delimiter: 2 })

    const reader = readline.createInterface({ input: stream });

    // create csv file for errors
    fs.writeFileSync("./output-errors/csv-errors.csv", "Model Number,Device Number,Color,Size,Price,", function(err) {
        if (err) {
            console.log("womp womp")
        }
    })

    // begin reading through csv input row-by-row
    reader.on("line", row => {

        // create array (must be nested here for scope)
        let data = [];
        
        // push row content into array        
        data.push(row.split(","));

        // error handling occurs

        // check if row is header
        if (data[0][1] === "Device Number") {
            return
        }

        // check if first cell is empty or is not a string
        else if (data[0][0] == "" || typeof data[0][0] != "string") {

            // log error 
            console.log("error detected", data)

            fs.appendFile("./output-errors/csv-errors.csv", `\n${data[0].toString()}`, "utf8", function(err){
                if (err) {
                    console.log(err)
                }
            })

            return
        }

        // // check is second cell is empty or not a number
        else if (data[0][1] == "" || isNaN(data[0][1])) {
            fs.appendFile("./output-errors/csv-errors.csv", `\n${data[0].toString()}`, "utf8", function(err){
                if (err) {
                    console.log(err)
                }
            })

            return
        }

        // if no errors, row is converted to json file
         else {

        // data array is converted into an object
        let dataObj = {
            deviceId: `${data[0][0]}-${data[0][1]}`,
            color: data[0][2],
            size: data[0][3],
            price: data[0][4]            
            };

        //create unique name for each row of csv/json file
        let jsonFile = uuidv4() + ".json"

        // convert dataObj to json and save new file
        fs.writeFileSync('./output-json/' + jsonFile, JSON.stringify(Object.assign({}, dataObj)), (err) => {
            if (err) {
                throw (err)
            }

            else return
         });
        }   

        // console.log(jsonFile)
        // console.log(dataObj)
      });

      // file has been read, end stream
      reader.on("close", () => {
        
        // notify team function has completed
        console.log("function complete 🥳");
        return
      });
      
      return
};

parseFunction(csvFile)
