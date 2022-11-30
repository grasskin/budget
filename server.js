const express = require('express');
const bodyParser = require('body-parser');
const { DateTime } = require("luxon");

const serverport = process.env.PORT || 3000;

const DAILY_BUDGET = 100;

const app = express();

let money = 0;
// first datetime set to end of current day
let lastpassgo = DateTime.now().setZone('America/New_York').startOf('day');

const passGo = () => {
    money = money + DAILY_BUDGET;
    console.log('pass')
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/api/test', (req, res) => {
  res.send('Hi this is working. If you found this email.');
})

app.get('/api', (req, res) => {
    res.send({money});
})

app.post('/api/money', (req, res) => {
    money += req.body.money;
})

const updateGo = () => {
    let datetime = DateTime.now().setZone('America/New_York');
    if(datetime.diff(lastpassgo, 'days').days > 1) {
        passGo();
        lastpassgo = datetime;
    }
}

app.listen(serverport, () => {
  console.log('server listening on port ' + serverport);
  setInterval(updateGo, 500);
  // setInterval(passGo, 2000);//1000 * 3600 * 24)
})
