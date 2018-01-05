const client = require('./../server.js');

const socket = require('socket.io');
const io = socket(server);


// map of connected users, so we can send the correct trip to the correct user
var users = {};

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log(socket.id);

  // have user tell us who they are
  socket.on('login', function(data){
    users[data.username] = socket.id;
  });

}

function tripFound(trip) {
  // find the correct user for this trip
  // assuming trip has a field callsd username
  // TODO what about other user???
  io.sockets.socket(users[trip.username]).emit('tripFound', trip);

}
