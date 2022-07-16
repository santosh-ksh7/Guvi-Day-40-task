const express = require('express');
const fs = require("fs");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express()

dotenv.config();

app.use(cors());

app.get('/', function (req, res) {
  res.send('Welcome to rest API')
})


app.post('/create', function (req, res) {
      const temp = new Date();

      let data = temp.getHours() +"hrs" +"-" + temp.getMinutes() + "mins" +"-" + temp.getSeconds() + "secs";

      let filename = temp.getFullYear()+"-"+`${temp.getMonth() + 1}`+"-"+temp.getDate();

      fs.writeFile(`./newfilesfolder/${filename}-${data}.txt`, data, (err)=>{
            if(err){
                  console.log("action not completed");
                  res.status(404).send(`Not completed the action due to ${err}`)
            }else{
                  console.log(`Action succesfully completed`);
                  res.status(200).send(`data written to file is: ${data} & file name is ${filename}-${data}`)
            }
      })
})



app.get('/retrieve', function (req, res) {
      const result = fs.readdir("./newfilesfolder", (err, files)=>{
            if(err){
                  res.status(404).send(`Unable to retrieve files from the directory`)
            }else{
                  console.log(`Action succesfully completed`);
                  res.status(200).send(`The files retrieved from the directory are : ${files}`)
            }
      });
})

app.listen(process.env.PORT)
