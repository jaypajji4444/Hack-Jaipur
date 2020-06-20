// sh
const express=require("express");
const app= express();
const bodyParser=require('body-parser');
const mongoose=require("mongoose");
const User=require("./model/data");
const path=require("path");
const config=require("./config/key");


// Database
const db=async()=>{
    await mongoose.connect(config.connectionKey,{useNewUrlParser:true,useUnifiedTopology:true})
    console.log("Connection Success!")
 }
 db().catch(err=>console.log("err"))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/",express.static("Dashboard"))
//app.use("/Dashboard",express.static("Dashboard"))



app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); //// Website you wish to allow to connect   
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');  // methods to allowed  
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');// Request headers you wish to allow     
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// @@@@@@@@@@@@ API ENDPOINTS @@@@@@@@@@@@


app.get("/",(req,res)=>{
res.send("Hello World")
})

app.post("/web",async(req,res)=>{
    User.remove({},(err,datas)=>{
        if(err){
            return res.status(400).json(err)
        }
        else{
            const data={data:req.body}
            const user=new User(data)
            user.save().then(res=>console.log("saved to database")).catch(err=>{
                return res.status(500).json(err)
            })
            return res.status(200).json({msg:"all good"})
        }
    })
    
})

app.get("/web",async(req,res)=>{
User.find({},(err,data)=>{
    if(err){
        return res.status(500).json(err)
    }
    else{
        res.setHeader("content-type", "application/json")
        //  console.log(data);
        res.status(200).send(JSON.stringify(data));
    }
})

})

app.post("/home",(req,res)=>{
    console.log(req.body)
    const data=req.body
    console.log(req.body)
    res.json({msg:"succes",data})
})


// @@@@@@@@ server Runnig @@@@@@@@@@@@
const port=process.env.NODE_ENV || 8000
app.listen(port,()=>{
    console.log("Server Running Successfully on port:",port);
})

