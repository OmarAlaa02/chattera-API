const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user'); 
const app = express();

const url = 'mongodb+srv://asser337:nodejs_11.11@cluster0.ceji32w.mongodb.net/chattera?';

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use(userRouter);


app.use('/', (req, res) => {
    res.status(404).send('<h1>Not found</h1>'); 
});


mongoose.connect(url, {  
})
.then(() => {
    app.listen(3000, () => console.log('Listening on port 3000'));
})
.catch(err => console.log(err));
