// import libraries/packages
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const env = require('dotenv')


// define important variables/constants
env.config()
const app = express()
const port = process.env.PORT || 3000
const whitelist = [ 'localhost', '127.0.0.1', ]
const corsOptions = { 
    origin: function (origin : any  , callback : any ){
        console.log("Received request from " + origin)
        if ( whitelist.indexOf(origin) !== -1){
            callback(null, true)
        } else {
            callback( new Error ("Not allowed by cors"))
        }
    }
}
// configure middleware 
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());



// setup routes 
app.get('/', (req : any , res : any ) =>{
    res.send(200, 'Hello world!');
});

app.post( '/login', (req: any , res :any )=>{

    if ( req.body.username == null || req.body.password == null ){
        res.send(200, 'invalid body !');
    }
    console.log( "Received login request from: "  + req.body.username  );
    

    let signoptions =  { 
        issuer: 'Barink.dev',
        subject: req.body.username ,
        audience: 'https://www.barink.dev',
        expiresIn: '3m',
        algorithm: 'RS256'
    }

    let token = jwt.sign(req.body , 'Banana' );
    res.send(200, JSON.stringify({webtoken : token}));

});

app.get('/check',  ( req: any , res: any )=> {

    if ( req.body.token == null ){
        res.send(200, 'Body does not contain token!')
    }

    if ( jwt.verify( req.body.token, 'Banana' )){
        res.send( 200, 'JWT OK!')
    } else{
        res.send( 200, 'Invalid JWT!')
    }


});


// start app on port 
app.listen( port , () => console.log(`Api started on ${port}!`));
