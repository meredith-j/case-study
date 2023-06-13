# 🐝 case-study 🐝

To run code:
- install dependencies (npm i)
- get courier api key and create .env folder (needed to send email notifications)
- add a csv file to the input folder. This file should be called "case-study-data.csv" in order for the function to work properly (local file has been added to .gitignore to keep company information private).
- csv file should have rows of input for function to run through
- run server (npm run dev)

input .csv file should have the following columns in order to run properly:

Model Number  | Device Number | Colour  | Size | Price |
------------- | ------------- | ------- | ---- | ----- |
EXAMPLE01     | ###           | COLOUR  | S-XL | $0.00 |

NOTE: the first row of example-input.csv are filled out as they should be and the second row has a sample error. See example-output.json to see the correct output for row 1. See example-error.csv to see the correct output for row 2.