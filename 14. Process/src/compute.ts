
interface INumObject {
    key?: string,
    times?: number
}

const num_objs: INumObject[] = [];

process.on('gen_random', (qnt) => {
    console.log('Calculating...')
    
    let count: number = 0;
    
    for (let index = 0; index < qnt; index++) {
        let rnd_nmb = Math.floor(Math.random() * (1000 - 1 + 1) + 1);

        let fnd_obj = num_objs.find((obj)=>{
            return obj.key === rnd_nmb.toString();
        })

        let new_obj: INumObject = {}

        if(fnd_obj){
            new_obj = {
                key: rnd_nmb.toString(),
                times: fnd_obj.times!++ 
            }
        }else{
            new_obj = {
                key: rnd_nmb.toString(),
                times: count
            }
        }

        num_objs.push(new_obj)

    }

    return num_objs;
})


process.send!({arr: num_objs});