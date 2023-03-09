var express = require('express');
var router = express.Router();
const cors = require('cors');
router.use(cors());

const fs = require('fs');

/* GET users listing. */
router.get('/', function (req, res, next) {
  fs.readFile('users.txt', function (err, data) {
    if (err) {
      console.log('något gick fel');
    }
    const users = JSON.parse(data);

    res.send(users);
    return;
  });
});

router.post('/add', function (req, res, next) {
  fs.readFile('users.txt', function (err, data) {
    if (err) {
      console.log('något gick fel');

      res.send('404 - något gick fel');
    }
    const users = JSON.parse(data);

    let newUser = req.body;

    users.push(newUser);

    fs.writeFile('users.txt', JSON.stringify(users, null, 2), function (err) {
      if (err) {
        console.log('404 - något gick fel');
      }
    });

    res.send(users);
    return;
  });
});

module.exports = router;
