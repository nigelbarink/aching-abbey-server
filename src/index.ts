const express = require('express')
const app = express()
const port = 443

app.get('/', (req : any , res : any ) =>{
    res.send(200, 'Hello world!');
});

app.listen( port , () => console.log(`Api started on ${port}!`));
