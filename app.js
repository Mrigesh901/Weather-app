const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");


const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
    const query = req.body.cityName;

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=e9eb8afd60da08bf702f564caab6ac1a&units=metric"
    https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherdata = JSON.parse(data);

        
        const temp = weatherdata.main.temp;
        const description = weatherdata.weather[0].description
        const icon = weatherdata.weather[0].icon;
        const img_url = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

        res.write("<h1 style='text-align:center'>Weather App</h1>")
        res.write("<h1 style='text-align:center'>The temperature in "+query+" is "+ temp +" degree celcius</h1>");
        res.write("<h4 style='text-align:center'>Description : "+description+"</h4>");
        res.write("<center><img src="+img_url+" ></center>");
        res.send()

    })
});
    
})






app.listen(3000, function(){
    console.log("Server is running");
});
