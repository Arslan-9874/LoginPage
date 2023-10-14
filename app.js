const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const app = express();
const loginInfo = require("./mongo_model/model.js")

const port = 80;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/LoginForm').then(()=>
  {
    console.log("Database Successfully connected");
  })
}

app.use(express.static('./'))
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'html');
app.set('views', path.join(__dirname, './'))

app.get('/', (req, res) => {
    res.status(200).send(__dirname + "index.html");
})

app.get('/user', (req, res) => {
    res.status(200).sendFile(__dirname+ "/user.html");
})

app.post('/user', (req, res) => {

    const user = req.body;
    // console.log(user);

    loginInfo.findOne({email: user.email, password: user.userPassword}).then((result)=>
    {
        if(result)
        {
            res.status(200).sendFile(__dirname + "/userSuccess.html")
        }
        else
        {
            res.status(200).send('<script>alert("Wrong Email or Password!"); window.location.href = "/user"; </script>');

        }
    }).catch(()=>
    {
        res.status(200).send('<script>alert("Something Went Wrong!"); window.location.href = "/user"; </script>');
    })
    
})

app.get('/admin', (req, res) => {
    res.status(200).sendFile(__dirname+ "/admin.html");
})

app.post('/admin', (req, res) => {

    const email = "arslankhan9874@gmail.com";
    const password = "LoginPage";

    const user = req.body;

    if(user.email == email && user.userPassword == password)
    {
        res.status(200).sendFile(__dirname + "/adminSucess.html")
    }
    else
    {
        res.status(200).send('<script>alert("Wrong Email or Password!"); window.location.href = "/admin"; </script>');
    }
})



app.get('/signUp', (req, res) => {
    res.status(200).sendFile(__dirname+ "/userSignUp.html");
})

app.post('/signUp', (req, res) => {

    let user = new loginInfo(req.body);

    loginInfo.findOne({email: user.email}).then((result)=>
    {
        if(result)
        {
            res.status(200).send('<script>alert("Email already Registered, Please try to Sign In."); window.location.href = "/user"; </script>');
        }
        else
        {
            user.save().then(()=>
            {
                res.status(200).send('<script>alert("User Successfully Registered, You can LogIn Now"); window.location.href = "/user"; </script>');
            }).catch(()=>
            {
                res.status(200).send('<script>alert("Something Went Wrong!"); window.location.href = "/user"; </script>');
            })
        }
    })


})

app.listen(port, () => {
    console.log(`The server has successfully started at port ${port}`);
})