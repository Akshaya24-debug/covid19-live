// body parser is generally used to tap into the data
const express=require('express')
const app=express()

//using body-parser helps in encoding space between words in links into the server
const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));

const https=require('https')

app.listen(8080,function(){
    console.log("Server connected to port 8080...")
})
//getting the data
app.get("/",function(request,response){
   response.sendFile(__dirname + "/index.html");
    console.log("sendfile")

 });
//posting the data at directory
 app.post("/",function(request,response){
    //******************define all req.body,url and apikey
    const cityName=request.body.cityname;
    const url="https://coronavirus-19-api.herokuapp.com/countries/"+cityName;

    https.get(url,function(res){
      res.on("data",function(data){
        var covidinfo= JSON.parse(data);
        console.log(data);
        var country=covidinfo.country;
        var today=covidinfo.todayCases;
        var cases=covidinfo.cases;
        var active=covidinfo.active;
        var critical=covidinfo.critical;
        var deaths=covidinfo.deaths;
        var recovered=covidinfo.recovered;
        var testsPerOneMillion=covidinfo.testsPerOneMillion;
        response.write("<h1>"+ "The Live COVID updates Countries are.."+"</h1>");
        response.write("<h1>"+"\n Country:"+country+"</h1>");
        response.write("<h1>"+"\n TodayCases:"+today+"</h1>");
        response.write("<h1>"+"\n TotalCases:"+cases+"</h1>");
        response.write("<h1>"+"\n Active Cases:"+active+"</h1>");
        response.write("<h1>"+"\n Critical Cases:"+critical+"</h1>");
        response.write("<h1>"+"\n DeathCounts:"+deaths+"</h1>");
        response.write("<h1>"+"\n Recovered Cases:"+recovered+"</h1>");
        response.write("<h1>"+"\n Tests taken permillion:"+testsPerOneMillion+"</h1>");
        response.send();

      });

    });

 });
