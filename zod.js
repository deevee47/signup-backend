// Zod is a library which helps to define a certain "schema" for the data 

//MIDDLEWARES AND ZOD LIBRARY

//make sure to: npm install express, npm install zod

const express= require("express")
const zod = require("zod")
const app = express()


//zod define your schema (validation criteria) i.e if array contains number
const schema = zod.array(zod.number());

//You use express.json() "middleware" to parse JSON in the request body.
app.use(express.json())

app.post("/health-checkup",(req,res)=>{
    const kidneys = req.body.kidneys;
    // checked if response is valid according to schema
    const response = schema.safeParse(kidneys);
    //if success = false (invalid data is input)
    if (!response.success) {
      res.status(400).json({ error: "Invalid kidneys data" });
    }
    else{
    res.json({msg:"kidneys data is valid"})
    }
})
  //});


//global catch written after all routes
//returns a message for any error occured
// app.use((err,req,res,next)=>{
//   //console.log(err)  display error in console
//   res.send(500,"Something is up with our servers :(")
// })

app.listen(3000)
 







//zod schemas

//{ 
// email: string =>email
// password: atleast 8 characters
// country: "IN" or "US"
// }
// 
// const schema = zod.object({
//   email: zod.string().email(),
//   password: zod.string().min(8),
//   country: zod.literal("IN").or(zod.literal("US")),
//   kidneys: zod.array(zod.number())
// });

// we can use zod.safeParse(inputdata) or zod.Parse(inputdata)