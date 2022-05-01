const express = require('express');

const app = express();

const server = app.listen(3000, (req, res) => {
    console.log('server running');
});

server.on('error', error=> console.log(error));

app.get('/', (req, res) =>{
    res.send('something good md...')
})
