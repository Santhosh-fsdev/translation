const readline = require("readline");
const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const rl = readline.createInterface({
  input: fs.createReadStream("t8.shakespeare.txt"),
});
let dataObject = [];

fs.createReadStream(path.resolve(__dirname, "french_dictionary.csv"))
  .pipe(csv.parse({ headers: false }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => {
    let obj = {};
    obj.english = row[0];
    obj.french = row[1];
    dataObject.push(obj);
  })
  .on("end", (rowCount) => {
      for(let i = 0 ; i < rowCount ; i++){
        rl.on("line", (line) => {
            if (line.includes(dataObject[i].english)) {
              fs.appendFile('Output.txt', line.replace(dataObject[i].english,dataObject[i].french), (err) => { 
                  if (err) throw err; 
              })
              fs.appendFile('Output.txt', "\n", (err) => { 
                if (err) throw err; 
            })
            }
          });
        }

  });





