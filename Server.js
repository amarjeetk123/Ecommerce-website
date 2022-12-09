const mongoose = require("mongoose");
const app = require("./App");
const { PORT } = require("./config/index");
const config = require("./config/index");

mongoose.set('strictQuery', false);


// here we are going to learn a new method of connecting database
// self invoked function , or efy or imediately invoked function    ()()
//syntax: - (async () => {} )()   //// create a function and run a function

(async  () => {
    try {
        await mongoose.connect( config.MONGO_URI )
        console.log("DB Connected Succesfully")

        app.on('error' , (err) => {
            console.log("Error is:" , err );
            throw err;
        } )

        const onListening = () =>{
            console.log(`Listening on ${config.PORT} port number`)
        }

        app.listen( config.PORT , onListening )
        
    } catch (error) {
        console.log("DB Connected failed" ,config.PORT , config.MONGO_URI )
        console.log("Error is:" , error );
    }

} )()

