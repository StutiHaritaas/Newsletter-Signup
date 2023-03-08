const express = require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https=require("https");
const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});

// let port = process.env.PORT;
// if(port==null || port ==""){
//     port=3000;
// }

// app.listen(port,function(){
//     console.log("Server is running");
// })

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.get("/failure",function(req,res){
    res.redirect("/")
})

app.post("/",function(req,res){
    
    const FirstName= req.body.Fn;
    const LastName= req.body.Ln;
    const Email= req.body.mail;

    const data={
        members: [
            {
                email_address: Email,
                status:"subscribed", 
                merge_fields :{
                    FNAME:FirstName,
                    LNAME:LastName
                }
            }
        ]
        
    };

    const jsonData=JSON.stringify(data);

    const url= "https://us21.api.mailchimp.com/3.0/lists/5a138c21ea";
    const options={
        method: "POST",
        auth: "Stuti:5e6ad0212ac20d7e751b295e2a0949ee-us21"
    }


      const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
           console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});




//API Key:5e6ad0212ac20d7e751b295e2a0949ee-us21
//Audience Id:5a138c21ea