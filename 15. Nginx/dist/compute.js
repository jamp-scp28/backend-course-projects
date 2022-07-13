"use strict";
let num_objs = [{ key: '1', times: 1 }];
const data = process.on('message', (qnt) => {
    console.log('Calculating...', qnt);
    let count = 0;
    for (let index = 0; index < qnt; index++) {
        let rnd_nmb = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
        let fnd_obj = num_objs.find((obj) => {
            return obj.key === rnd_nmb.toString();
        });
        let new_obj = {};
        if (fnd_obj) {
            new_obj = {
                key: rnd_nmb.toString(),
                times: fnd_obj.times++
            };
        }
        else {
            new_obj = {
                key: rnd_nmb.toString(),
                times: count
            };
        }
        num_objs.push(new_obj);
    }
    process.send(num_objs);
});
