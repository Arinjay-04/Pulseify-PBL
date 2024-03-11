const express = require('express');
const cors = require('cors');
const pg = require('pg');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module for handling file paths
const bcrypt = require("bcrypt");
const passport = require("passport");
const { Strategy } = require( "passport-local");
const session = require( "express-session");
const env = require ("dotenv");



const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "PBL",
    password: "Arinjay@04",
    port: 5432 // Corrected the property name to 'port'
});

db.connect();

const app = express();
const port = 3001;
const saltRounds = 10;
env.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'build')));

// Define a GET route for the login page
app.get('/login', (req, res) => {
    // Assuming your frontend bundle contains a route for /login
    res.sendFile(path.join(__dirname, '..', '..', 'pbl new', 'signinup', 'src', 'components', 'Loginform', 'LoginForm.jsx'));
});

// Define a GET route for the register page
app.get('/register', (req, res) => {
    // Assuming signUpForm.jsx is in the 'SignUpForm' directory
    res.sendFile(path.join(__dirname, '..', '..', 'pbl new', 'signinup', 'src', 'components', 'SignUpForm', 'signUpForm.jsx'));
});



// app.get('/register', (req, res) => {
   
//     res.sendFile(path.join(__dirname, '..', '..', 'SignUpForm', 'signUpForm.jsx'));
// });


app.use(passport.initialize());
app.use(passport.session());



// app.get("", (req, res) => {
//     // console.log(req.user);
//     if (req.isAuthenticated()) {
//       res.render("/");
//     } else {
//       res.redirect("/login");
//     }
//   });

  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/register",
      failureRedirect: "/login",
    })
  );

  passport.use(
    new Strategy(async function verify(email, password, cb) {
      try {
        const result = await db.query("SELECT * FROM patient WHERE email = $1 ", [
          email,
        ]);
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              //Error with password check
              console.error("Error comparing passwords:", err);
              return cb(err);
            } else {
              if (valid) {
                //Passed password check
                return cb(null, user);
              } else {
                //Did not pass password check
                return cb(null, false);
              }
            }
          });
        } else {
          return cb("User not found");
        }
      } catch (err) {
        console.log(err);
      }
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });




// app.post('/login', async (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     try {
//         const result = await db.query("SELECT * FROM patient WHERE email = $1", [email]);

//         if (result.rows.length > 0) {
//             const searchpass = result.rows[0].password;
//             if (password === searchpass) {
//                 // Successful login, redirect to the home page
//                 res.redirect("/");
//             } else {
//                 // Incorrect password
//                 res.send("Incorrect Password");
//             }
//         } else {
//             // User not found
//             res.send("User not found");
//         }
//     } catch (err) {
//         console.log("Error", err);
//         res.status(500).send("Error at server");
//     }
// });





// app.post('/register', async(req,res)=>{
//     const user = req.body["firstname", "lastname", "email ", "dob", "address", "pin", "password", "cpassword"];

//     try{
//         await db.query("INSERT INTO patient (Firstname , Lastname , email, dob, address, pin , password , confirmpass) values($1 , $2 , $3, $4, $5, $6, $7, $8)"[user])
//         res.redirect("/login")
//     }catch(err){
//         console.error("Error executing query", err);
//         res.status(500).send("Error registering user");
//     }
// });


app.post('/register', async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const number = req.body.Number;
  const email = req.body.email;
  const dob = req.body.dob;
  const address = req.body.Address;
  const pin = req.body.Code;
  const password = req.body.password;
  const cpassword = req.body.cpassword;

  // Check if passwords match
  if (password !== cpassword) {
     
  }

  try {
      const checkResult = await db.query("SELECT * FROM patient WHERE email = $1", [
          email,
      ]);

      if (checkResult.rows.length > 0) {
          res.redirect("/login");
      } else {
          bcrypt.hash(password, saltRounds, async (err, hash) => {
              if (err) {
                  console.error("Error hashing password:", err);
              } else {
                  const result = await db.query("INSERT INTO patient(firstname, lastname, email, dob, address, pin, password, confirmpass, mobile) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [firstname, lastname, email, dob, address, pin, hash, hash, number]);
                  const user = result.rows[0];
                  req.login(user, (err) => {
                      console.log("success");
                      res.redirect("/login");
                  });
              }
          });
      }
  } catch (err) {
      console.log(err);
  }
});




app.listen(port , ()=>{
    console.log("The port is running")
})