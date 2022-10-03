const express=require('express')
const bodyParser=require('body-parser')
const route=require('./route/routes.js')
const mongoose=require('mongoose')
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://arnabbiswas_14:arnabbiswas@cluster0.b95gv.mongodb.net/BookAndAuthor_DataBase?retryWrites=true&w=majority"
,{
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/',route)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});