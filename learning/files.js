const fs = require('fs');

let date = new Date();

fs.writeFile('fyh.txt',date.toString(), err => {
    if (err){
        console.log(err)
        return
    }
});

fs.readFile('fyh.txt', 'utf-8', (err, data)=>{
    console.log(data);
});
