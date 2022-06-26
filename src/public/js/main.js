const socket = io();

console.log("emmit message")
// Join chatroom
socket.emit('download-req', {test: "asdf"});

// Get room and users
socket.on('download-progress', (data) => {
    console.log(data);
});
