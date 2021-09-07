const testFolder = './jsons/';
const fs = require('fs');

const allFiles = [];

let mergedJson = [];

fs.readdirSync(testFolder).forEach(file => {
  allFiles.push(__dirname+'/jsons/'+file);
});

allFiles.forEach((filePath)=>{
  try {
    console.log("Reading file "+filePath);
    const jsonData = JSON.parse(fs.readFileSync(filePath,{encoding:'utf8', flag:'r'}));
    if(!jsonData instanceof Array){
      jsonData = [jsonData];
    }
    console.log("Writing file "+filePath+' to output.json');
    mergedJson = mergedJson.concat(jsonData);
  } catch (err) {
    console.log("Issue with file: "+filePath);
    return;
  }
});

fs.writeFileSync('output.json',JSON.stringify(mergedJson));
console.log("Merge Complete");