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
let dataSensor = []
// let dataSensor = [
//   {
//     value: 182, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 256, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 350, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 389, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 401, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 450, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 489, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 410, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 460, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 210, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 200, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 187, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 100, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 401, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 450, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 489, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 10, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 7, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 18, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 256, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 350, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 389, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 401, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 450, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 489, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 410, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 499, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 182, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 256, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 350, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 389, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 401, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 450, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 489, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 10, 
//     date: (new Date()).toLocaleString()
//   },
//   {
//     value: 570, 
//     date: (new Date()).toLocaleString()
//   }
// ]

// server.listen(3000);

const parser = new ReadlineParser();

// settings
const mySerial = new SerialPort({ path: "COM9", baudRate: 9600 })

// routes
app.get('/', (req, res) => {
  res.sendFile(__dirname +'server/index.html');
});

app.get("/data", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"  )
  let cont = 0

  // if (mySerial.readable){
  //   while(cont <= 50){
  //     let value = await mySerial.read(1)
  //     console.log(value)
  //     if (value !== null ){
  //       dataSensor.push({value: parseInt(value), date: (new Date()).toLocaleTimeString()})
  //       cont++;
  //     }
  //   }
  // }
  mySerial.pipe(parser);
  for(let i  = 0; i< 20;i++){
    let val = parseInt(mySerial.read(20))
    if (val !== NaN){
      dataSensor.push({value: val, date: (new Date()).toLocaleTimeString()})
    }
    // mySerial.on("data", (val) => dataSensor.push({value: val, date: (new Date()).toLocaleTimeString()}))
  }
  
  res.json(dataSensor)
  cont = 0
  dataSensor.length = 0
})

app.get("/alert", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"  )
  res.json(valuesDanger)
  valuesDanger = {value: 0, date: new Date()}
})

// static files
app.use(express.static(path.join(__dirname, 'public')));



//

// mySerial.on('open', function () {
//   console.log('Opened Port.');
// });

// mySerial.on('data', function (data) {
//   cont++;
//   let value = parseInt(data)
//   if (cont <= 100) {
//     console.log(value)
//     dataSensor.push({value: value, date: (new Date()).toLocaleTimeString()})
//     io.emit('arduino:data', {
//       value: data.toString()
//     });
//   }
// });

const getData = async () => {
  let datos = []
  let cont = 0
  return await new Promise((resolve, reject) => {

    mySerial.pipe(parser);
    
    // mySerial.open()

    console.log(parseInt(mySerial.read()))
    mySerial.on('data', function (data) {
      // if (cont < 50){
        resolve(parseInt(data))
        // console.log(cont)
        // cont++
      // }
    })
    console.log(mySerial.read())

    mySerial.on('err', function (data) {
      console.log(err.message);
    });

    // mySerial.close()
    // mySerial.on("close", function(msg){console.log(msg)})
  })
}

server.listen(serverPort, () => {
  console.log('Server on port '+serverPort);
});
