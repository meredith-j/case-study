function handleErrors(data) {
    if (data[0][1] === "Device Number") {
        return
    }

    // check if model name, color or size columns are empty or are not a string
    else if (data[0][0] == "" || data[0][2] == "" || data[0][3] == "" || typeof data[0][0] != "string" || typeof data[0][2] != "string" || typeof data[0][3] != "string") {

        console.log("error detected", data[0])

        fs.appendFile("./output-errors/csv-errors.csv", `\n${data[0].toString()}`, "utf8", function(err){
            if (err) {
                console.log(err)
            }
        })

        return
    }

    // check if model number column is empty or not a number
    else if (data[0][1] == "" || typeof data[0][1] === "number") {

        console.log("error detected", data[0])
        fs.appendFile("./output-errors/csv-errors.csv", `\n${data[0].toString()}`, "utf8", function(err){
            if (err) {
                console.log(err)
            }
        })

        return
    }

    // check if price column is empty or not data type: float
    else if (data[0][4] === "" || typeof data[0][4] == 'number' && !isNaN(data[0][4])
    // || data[0][4] % 1 == true
    // || isNaN(data[0][4] && data[0][4] % 1 !== true || Number.isInteger(data[0][4]))
    
    ) {

        if (Number.isInteger(data[0][4])) {
            console.log(`${x} is integer.`);
        }

        else {
            console.log("success")
            
            return;
        }

        // log error 
        console.log("error detected", typeof data[0][4], data[0])

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

}



module.exports = handleErrors