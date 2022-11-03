const client = require("./client");

client.getAll(null, (err, data)=>{
    if(!err){
        console.log(data);
    }
});