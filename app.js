const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = "./proto/users.proto";

const packageDefination = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true 
});

const usersProto = grpc.loadPackageDefinition(packageDefination);

const users = [
    {
        id: "a68b823c-7ca6-44bc-b721-fb4d5312cafc",
        name: "John Bolton",
        age: 23,
        address: "Address 1"
    },
    {
        id: "34415c7c-f82d-4e44-88ca-ae2a1aaa92b7",
        name: "Mary Anne",
        age: 45,
        address: "Address 2"
    }
];

const server = new grpc.Server();

// Add a service
server.addService(usersProto.UserService.service, {
    getAll: (_, callback) => {
        callback(null, {users});
    },

    add: (call, callback) => {
        let user = call.request;
        users.push(user);
        callback(null, user);
    }
});

server.bindAsync("127.0.0.1:30043", grpc.ServerCredentials.createInsecure(), (err, port)=>{
    console.log(err, port);
    server.start();
    console.log("Server running at http://127.0.0.1:30043");
});
