const http = require('http');

const server = http.createServer((request, response) =>{ 
    response.end('hello world');
});

const connectServer = server.listen(8080, () =>{
    console.log('server running');
})