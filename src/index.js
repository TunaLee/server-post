import app from "./app.js";
import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/mongoose-test')
    .then(()=> {
        console.log('database connected')
        app.listen(3001, ()=> {
            console.log('server running')
        })
    })