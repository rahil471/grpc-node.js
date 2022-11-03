const PROTO_PATH = "./proto/users.proto";

const grpc = require('@grpc/grpc-js');
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const UserService = grpc.loadPackageDefinition(packageDefinition).UserService;
const client = new UserService(
    "localhost:30043",
    grpc.credentials.createInsecure()
);

module.exports = client;