const fs = require("fs");
const readline = require("readline");
const { v4: uuidv4 } = require('uuid');
const csvFile = "./input/case-study-data.csv";
require("dotenv").config();
const { CourierClient } = require("@trycourier/courier");

const apiKey = process.env.COURIER_API;

function parseFunction (csvFilePath) {

    // notify team function has started
    console.log("function initialized 🚀")

    const courier = CourierClient({ authorizationToken: apiKey });

    const { requestId } = courier.send({
        message: {
          to: {
            email: "mjonatan@me.com",
          },
          template: "0V6P6AN3JZMMSRPQF5J8QRZ91KNF",
          data: {
          },
        },
      });


    // initialize reading of input csv file
    const stream = fs.createReadStream(csvFilePath, { encoding: "utf-8"})
    const reader = readline.createInterface({ input: stream });

    // create csv file for errors
    fs.writeFileSync("./output-errors/csv-errors.csv", "Model Number,Device Number,Color,Size,Price,", function(err) {
        if (err) {
            console.log(err)
        }
    })

    // set up error counter
    let errors = 0;

    // begin reading through csv input row-by-row
    reader.on("line", row => {

        // create array (must be nested here for scope)
        let data = [];
        
        // push row content into array        
        data.push(row.split(","));

        // error handling occurs

        // create regex variable to check decimal points for price column
        let decimalChecker = /^[0-9]+\.[0-9]{2}$|[0-9]+\.[0-9]{2}[^0-9]/;

        // check if row is header
        if (data[0][1] === "Device Number") {
            return
        }

        // check if model name column is empty or not a string
        else if (data[0][0] == "" || !isNaN(data[0][0])) {

            // log error
            errors ++

            console.log("error detected", data[0])

            // append spreadsheet row for CSV errors output
            data[0][0] = "";

            fs.appendFile("./output-errors/csv-errors.csv", `\n${data[0].toString()}`, "utf8", function(err){
                if (err) {
                    console.log(err)
                }
            })

            return
        }

        // check if model number column is empty or not a number
        else if (data[0][1] == "" || data[0][1].includes('.') || Number.isInteger(data[0][1]) || data[0][1] % 1 !== 0) {

            // log error
            errors ++

            console.log("error detected", data[0])

            // append spreadsheet row for CSV errors output
            data[0][1] = "";

            fs.appendFile("./output-errors/csv-errors.csv", `\n${data[0].toString()}`, "utf8", function(err){
                if (err) {
                    console.log(err)
                }
            })

            return
        }

        // check if color column is empty or not a string
        else if (data[0][2] == "" || !isNaN(data[0][2])) {

            // log error
            errors ++

            console.log("error detected", data[0])

            // append spreadsheet row for CSV errors output
            data[0][2] = "";

            fs.appendFile("./output-errors/csv-errors.csv", `\n${data[0].toString()}`, "utf8", function(err){
                if (err) {
                    console.log(err)
                }
            })

            return
        }

        // check if size column is empty or not a string
        else if (data[0][3] == "" || !isNaN(data[0][3])) {

            // log error
            errors ++

            console.log("error detected", data[0])

            // append spreadsheet row for CSV errors output
            data[0][3] = "";

            fs.appendFile("./output-errors/csv-errors.csv", `\n${data[0].toString()}`, "utf8", function(err){
                if (err) {
                    console.log(err)
                }
            })

            return
        }

        // check if price column is empty or a float
        else if (data[0][4] === "" || !data[0][4].includes('.') || isNaN(data[0][4])
        || decimalChecker.test(data[0][4]) == false) {

            // log error 
            errors ++
            console.log("error detected", data[0])

            // append spreadsheet row for CSV errors output
            data[0][4] = "";

            fs.appendFile("./output-errors/csv-errors.csv", `\n${data[0].toString()}`, "utf8", function(err){
                if (err) {
                    console.log(err)
                }
            })

        }
        
        // if no errors, row is converted to json file
         else {

            // data array is converted into an object
            let dataObj = {
                deviceId: `${data[0][0]}-${data[0][1]}`,
                color: data[0][2],
                size: data[0][3],
                price: +data[0][4]
                };

            //create unique name for each row of csv/json file
            let jsonFile = uuidv4() + ".json"

            // convert dataObj to json and save new file
            fs.writeFileSync('./output-json/' + jsonFile, JSON.stringify(Object.assign({}, dataObj)), (err) => {
                if (err) {
                    console.log(err)
                }

                else return
            });

            console.log("row success 🤓", dataObj)
        }   

      });

      // file has been read, end stream
      reader.on("close", () => {

        // function was completed and there were errors
        if (errors > 0 ) {
            console.log(`function completed with ${errors} errors 🙃`)

            const { requestId } = courier.send({
                message: {
                  to: {
                    email: "mjonatan@me.com",
                  },
                  template: "EC6E0BKC9YMH4KMYED9NT1WAXKVW",
                  data: {
                  },
                },
              });
        }

        // function was completed and there were not errors
        else {

            // delete error output csv
            fs.unlink("./output-errors/csv-errors.csv", (err) => {
                if (err) {
                    console.log(err);
                }
            })

            const { requestId } = courier.send({
                message: {
                  to: {
                    email: "mjonatan@me.com",
                  },
                  template: "FBYRTZEW184AQQP28HBQYH94NM87",
                  data: {
                  },
                },
              });

            console.log("function complete 🥳");
            return
        }
      });
      
      return
};

parseFunction(csvFile)
