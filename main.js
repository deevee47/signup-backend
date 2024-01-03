//Use MongoDB Databases to store the sent data and retrieve data (through the Route Methods) (also check data "schema" through zod)

const express = require("express")
const mongoose = require("mongoose")
const z = require("zod")
const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://deevee4712:CohortWeek3@cohortweek3.39ooljk.mongodb.net/signupData")

const users = mongoose.model("Users",{name: String, email: String, password: String})

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

app.post("/signup", async function (req,res) {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    
    //Checking Data
    const response = schema.safeParse({
        name: name,
        email: email,
        password: password
    })
    if (!response.success) {
        return res.status(400).json({ error: "Invalid Data!" });
    }

    //Check User Existance
    const existingUser = await users.findOne({email:email})
    if (existingUser) {
        return res.send(411,"User account already exists! ")
    }

    const user = new users({
        name: name,
        email: email,
        password: password
    })
    //very important to save the data so that it goes to the database
    user.save().then(res.send("User data created successfully"))
})

app.listen(3000)