const client = require("./client");
const {v4: uuid} = require("uuid");
/**
 * * Example of adding a user
 */

const user = {
    id: uuid(),
    name: "Rahil Shaikh",
    address: "Silly street",
    age: 30
}
client.add(user, (err, data)=>{
    if(!err){
        console.log(data);
    }
});
