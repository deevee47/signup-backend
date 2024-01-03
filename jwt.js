//Assignment 
//Create a POST method which Returns a json web token with username encrypted (body is {username:   , password:   })
//Create a GET method Returns an array of all users if user is signed in (token is correct) Returns 403 status code if not (Headers: Authentication Headers)

const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();

app.use(express.json())
const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

//checks if user exists
function userExists(username, password) {
    const matchingUsers = ALL_USERS.filter(function (value) { return value.username === username && value.password === password});
    return matchingUsers.length > 0;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username
    const userList = ALL_USERS.filter((value) => {return !(username === value.username)})
    res.send(200,userList)
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000)