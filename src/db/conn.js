const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/students-api",{
    // useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection is successfull");
}).catch((e)=>{
    console.log(`no connection ${e}`);
});


//this code's purpose is to establish the connection between this code and the mongo compass.
//by using connect method I created the students-api collection on the mongodb atlas with the help of localhost on my computer
//after this line 3 , the collection named students-api is created on the atlas. 