const socket = io('http://localhost:3000');

const input = document.getElementById('link');
const button = document.getElementById('send')
const result = document.getElementById('res')
const doneRes = document.getElementById('done')

input.value = 'https://youtu.be/W3zU0KjgXwQ';

button.onclick = () => {
    const link = input.value
    console.log("send", link);

    socket.emit('download-req', {link: link});
}

// Get room and users
socket.on('download-progress', (data) => {
    console.log(data)
    res = []
    res.push(JSON.stringify(data))
    result.innerHTML = res.map(data => {return  '<p>' + data + '</p>'});
});

// Get room and users
socket.on('download-done', (data) => {
    console.log(data)
    res = []
    res.push(JSON.stringify(data))
    doneRes.innerHTML = '<a link href=' + data.link + '> download</a>'
});
