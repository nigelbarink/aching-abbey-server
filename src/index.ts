const express = require('express');
const app = express();
const port = 443;
import database from './database';


// setup middle ware.
app.use(express.json());


// define routes
app.post('/user' , (req : any, res : any) => {
    
    let user : any = req.body;
    
    database.create_user(user);

    res.send(201, "Created user!");
});

app.get('/', (req : any , res : any ) =>{
    res.send(200, 'Hello world!');
});

// start listening for traffic
app.listen( port , () => console.log(`Api started on ${port}!`));
