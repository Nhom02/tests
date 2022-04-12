var fs = require('fs');
var archiver = require('archiver');
const path = require('path');
MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
exports.MONTHS = MONTHS;
DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
exports.DAYS = DAYS;
const moment = require('moment');

function generateClientData(){
    let currentTime = new Date().getTime();
    return {
        clientNumber: 'Test ' + currentTime,
        firstName: 'Automation ' + currentTime,
        lastName: 'Test ' + currentTime,
        email: 'test' + currentTime + '@mail.com',
        homePhone: '',
        address: 'VN',
        primaryOffice: 'Any',
        mobilePhone: '',
        dateOfBirth: '',
        emailLogin: '',
        phoneLogin: '',
        group: ['Default']
    }
}

exports.generateClientData = generateClientData;

exports.zipResult = async function(){
    var fs = require('fs');
    var archiver = require('archiver');
    const path = require('path');
    
    var output = fs.createWriteStream('./Results/result.zip');
    var archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      });
    
    output.on('close', function() {
      // console.log(archive.pointer() + ' total bytes');
    //   console.log('archiver has been finalized and the output file descriptor has closed.');
    });
    
    output.on('end', function() {
        console.log('Data has been drained');
    });
    
    
    // good practice to catch this error explicitly
    archive.on('error', function(err) {
        throw err;
    });
       
    // pipe archive data to the file
    archive.pipe(output);
    
    
    // append a file from stream
    let list = fs.readdirSync('./report-json/');
    for (let i = 0; i < list.length; i++) {
        let filename = path.join('./report-json', list[i]);
        var file1 ='./report-json/' + list[i];
        archive.append(fs.createReadStream(file1), { name: list[i] });
    }
    
    await archive.finalize();
}
exports.getKeyByValue =  function(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

exports.rmFileInDir= async function(dir){
    if(!fs.existsSync(dir)) return;
    let list = fs.readdirSync(dir);
    for (let i = 0; i < list.length; i++) {
        let filename = path.join(dir, list[i]);
        let stat = fs.statSync(filename);
        fs.unlinkSync(filename);
    }

}

exports.logMessage = function(message) {
    process.emit('test:log', message);
}

exports.takeScreenshot = function(browser, message="") {
    const timestamp = moment().format('YYYYMMDD-HHmmss.SSS');
    // fs.ensureDirSync('reports/html-reports/screenshots/');
    const filepath = path.join('reports/html-reports/screenshots/', timestamp + '.png');
    browser.saveScreenshot(filepath);
    if(message){
        this.logMessage(message) ;
    }
    // if(typeof browser !== 'undefined'){
    //     this.logMessage("Issue occurs in browser " + browser.capabilities.browserName + " -  Version " + browser.capabilities.browserVersion + " - Time " + Date().toLocaleString());
    // }
    process.emit('test:screenshot', filepath);
    return this;
}

exports.convertActionListDueDate = function(convertDate) {
    /*
        Convert selected date to displayed date in action list
        Example: 
        Input - next 1 days / previous 1 days / Today
        Output - Wed 19 Aug / Mon 17 Aug / Today
    */
   const regex = new RegExp('(.*)\\s+(\\d+)\\.*')
   if(convertDate.match(regex)){
       let today = new Date();
       let days = convertDate.match(regex)[2];
       if(convertDate.match(regex)[1] == 'next'){
           today.setDate(today.getDate() + parseInt(days));
       }
       if(convertDate.match(regex)[2] == 'previous'){
           today.setDate(today.getDate() - parseInt(days));
       }
       // convert to Wed 19 Aug type
       convertDate = DAYS[today.getDay()] + " " + String(today.getDate()).padStart(2, '0') + " " + MONTHS[today.getMonth()];
    }
   return convertDate
}

exports.titleCase = function(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join('_'); 
 }

 exports.convertSpaceToUnderLine = function(str) {
    var splitStr = str.toLowerCase().split(' ');
    return splitStr.join('_'); 
 }
 
 exports.convertDotToUnderLine = function(str) {
    var splitStr = str.toLowerCase().split('.');
    return splitStr.join('_'); 
 }

 exports.upperCaseFirstLetter = function(str) {
    return str.charAt(0).toUpperCase() + str.substring(1); 
 }

 exports.lowerCaseFirstLetter = function(str) {
    return str.charAt(0).toLowerCase() + str.substring(1); 
 }
 