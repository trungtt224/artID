var express = require('express');
var fs = require('fs');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const path = '/home/trungtt18/Documents/imsi_import.csv'
  const content = fs.readFileSync(path,  'utf-8');
  const stats = fs.statSync(path);
  
  let sum = 0;
  const checksum = (path) => {
    let sum = 0
    for (i = 0; i < path.length; i += 4) {
      switch(true) {
        case (i  < path.length):
          sum = sum + 1 * path[i].charCodeAt()
          break;
        case (i + 1 < path.length):
          sum = sum + 3 * path[i].charCodeAt()
          break;
        case (i + 2 < path.length):
          sum = sum + 7 * path[i].charCodeAt() 
          break;
        case (i + 3 < path.length):
          sum = sum + 11 * path[i].charCodeAt()
          break;
      }
    }
    return sum;
  }

  const replaceContent = content.split('\n').join('');
  const checkSumPath = checksum(path);
  const checkSumContent = checksum(replaceContent);
  const fileSizeInBytes = stats.size;
  const extentsion = path.split('.').slice(-1).pop()

  const artID = `P${checkSumPath}-L${fileSizeInBytes}-C${checkSumContent}.${extentsion}`
  console.log(fileSizeInBytes)
  console.log(artID)

  res.render('index', { title: 'Express', artID: artID });
});



module.exports = router;
