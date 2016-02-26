'use strict';

require('dotenv').config();
var app = require('express')();
var path = process.cwd();

app.route('/').get(function (req, res) {
  res.sendFile(path + '/index.html');
});

app.route(/^\/(.*)/).get(function (req, res) {
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let param = req.params[0];
  let timeString;
  let timeStamp;

  let stringRegex = new RegExp('^(' + months.join('|') + ') (\\d{2}), (\\d{4})$');
  let stampRegex = /^(\d{10})$/;

  if (stampRegex.test(param)) {
    timeStamp = Number(param);

    let d = new Date(timeStamp * 1000);
    timeString = months[d.getUTCMonth()] + ' ' + d.getUTCDate() + ', ' + d.getUTCFullYear();
  } else if (stringRegex.test(param)) {
    timeString = param;
    timeStamp = new Date(timeString).getTime() / 1000;
  }

  if (timeStamp && timeString) {
    res.send({
      unix: timeStamp,
      natural: timeString
    });
  } else {
    res.send(null);
  }
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Started service at port', port);
});
