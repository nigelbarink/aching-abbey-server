const mongoose = require('mongoose');

export default class Database {
    static create_user  ( user : any )  {
        console.log(`Storing ${user.username} in database`);

        // create a connection 
        const db = mongoose.connect("mongodb://127.0.0.1:27017/Aching_abbey", {useNewUrlParser: true});
        
        // setup a new user document 
        const user_db : any = mongoose.model('users', {username : String , password : String });
        const newUser = new user_db({ username: user.username,password: user.password});
        
        newUser
            .save()
            .then( function () {
                    console.log ("new user is saved!");
                    }
                );

        // Close the connection to the database 
        db.disconnect();

    }
} 