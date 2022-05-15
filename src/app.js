//this is the express application in which we are creating the localhost seeting and the user essential things
//at line 11 we acquiring the conn.js file with the help of their path.
//same for the schema which is present in the student.js file we acquiring the schema with help of path of that file.
//express.json() is mainly used to display the json format data into the string format 

//and the most imp thing in that code is the post method ,,,,,with help of post method we are actually accessing the 
//student record which is present(or written by us) on the postman and then saving that record on the mongodb compass collection named student-api






const express = require("express");

require("./db/conn");
const Student = require("./models/students");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("",(req,res)=>{
    res.send(`hello listening on ${port}`);
})
//here we are using the promises
// app.post("/students",(req,res)=>{

//     console.log(req.body);
//     const user = new Student(req.body);


//     //here we are using the promises i.e. if it is saved the status is 201 which created successfully and after that the data is sended to the database and if status 400 then it is error
//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((e)=>{
//         res.status(400).send(e);
//     })


//     // res.send("student is listening");
// })


//here we are using the async and await
//in async and await we are allowing the user to try first and assuring user the guaranty that we can wait plz go head and process.
//here try and catch is used to recognize if there is any error
app.post("/students",async(req,res)=>{
    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }catch(e){
        res.status(400).send(e);
    }
})



app.get("/students",async(req,res)=>{
    try{
        const getAllStudents = await Student.find();
        res.send(getAllStudents);
    }catch(e){
        res.send(e);
    }
});


app.get("/students/:id",async(req,res) => {
    try{
        const _id = req.params.id;
        const getStudent = await Student.findById(_id);
        console.log(getStudent);
        if(!getStudent)
        {
            return res.status(404).send();
        }else{
            res.send(getStudent);
        }
    }catch(e){
        res.send(e);
    }
})

app.patch("/students/:id", async(req,res)=>{
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body,{
            new:true
        });
        res.send(updateStudent);
    }
    catch(e){
        res.status(400).send(updateStudent);
    }
})

app.delete("/students/:id", async(req,res)=>{
    try{
        const _id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(_id);

        if(!req.params.id)
        {
            return res.status(400).send();
        }
        res.send(deleteStudent);
    }
    catch(e){
        res.status(500).send(e);
    }
})


// app.delete('/students/:{id}', (req, res) => {
//     const course = Student.find(c => c.id === parseInt(req.params.id));
//     if (!course) return res.status(404).send('The course with the given ID was not found.');  //404

//     // Delete
//     const index = Student.indexOf(course);
//     Student.splice(index, 1);
//     res.send(course); 

// });


app.listen(port,()=>{
    console.log(`connection is listening on port ${port}`);
});

