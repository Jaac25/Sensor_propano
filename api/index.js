const { ReadlineParser, SerialPort } = require('serialport')

const path = require('path');
const express = require('express');
const http = require('http');
const SocketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = SocketIo(server);
io.on('connection', () => {console.log("YEAAA")});

const serverPort = Number(process.env.PORT) || 2525;

let cont = 0
let valuesDanger = {value: 0, date: new Date()}
// let dataSensor = []
let dataSensor = [
  {
    value: 182, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 256, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 350, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 389, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 401, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 450, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 489, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 410, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 460, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 210, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 200, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 187, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 100, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 401, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 450, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 489, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 10, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 7, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 18, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 256, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 350, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 389, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 401, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 450, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 489, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 410, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 499, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 182, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 256, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 350, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 389, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 401, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 450, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 489, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 10, 
    date: (new Date()).toLocaleString()
  },
  {
    value: 270, 
    date: (new Date()).toLocaleString()
  }
]

// server.listen(3000);

// settings

// routes
app.get('/', (req, res) => {
  res.sendFile(__dirname +'server/index.html');
});

app.get("/data", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"  )
  res.json(dataSensor)
  cont = 0
})

app.get("/alert", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"  )
  res.json(valuesDanger,)
  valuesDanger = {value: 0, date: new Date()}
})

// static files
app.use(express.static(path.join(__dirname, 'public')));

const parser = new ReadlineParser();

// const mySerial = new SerialPort({ path: "COM8", baudRate: 9600 })

// mySerial.pipe(parser);

// mySerial.on('open', function () {
//   console.log('Opened Port.');
// });

// mySerial.on('data', function (data) {
//   cont++;
//   let value = parseInt(data)
//   if (value >= 500) {
//     valuesDanger = {
//       value: value,
//       date: (new Date()).toLocaleTimeString()
//     }
//   }
//   if (cont <= 100) {
//     dataSensor.push({value: value, date: (new Date()).toLocaleTimeString()})
//     io.emit('arduino:data', {
//       value: data.toString()
//     });
//   }
// });

// mySerial.on('err', function (data) {
//   console.log(err.message);
// });

server.listen(serverPort, () => {
  console.log('Server on port '+serverPort);
});
