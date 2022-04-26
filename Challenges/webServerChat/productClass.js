const fs = require('fs');

class Container{

    //will receive a file path
    constructor(productDataFile){
        this.productDataFile = productDataFile;
        this.objectId = 1;
        this.productData = [];
    }

    save(object){
        //save object and return id
        
        let data = JSON.parse(fs.readFileSync(this.productDataFile,'utf-8'));

        if (data != null) {
            this.objectId = data[data.length-1].id + 1; 
        } else{
            this.objectId = 1;
        }
        
        object.id = this.objectId;
        data.push(object);
        
        this.productData = data;
        
        //write to file
        fs.writeFileSync(this.productDataFile, JSON.stringify(this.productData), err =>{
            if (err){
                console.log(err);
            }
        });
        this.objectId += 1;
        return 'ID: ' + object.id + ' assignated to object';
    }

    getById(id){
        let data = JSON.parse(fs.readFileSync(this.productDataFile,'utf-8'));
        for(let i = 0;i < data.length;i++){
            if(data[i].id === parseInt(id)){
                return data[i];
            } else{
                return 'Product not found...'
            }
        }

    }

    update(id,newData){
        console.log(id, newData);
        let data = JSON.parse(fs.readFileSync(this.productDataFile,'utf-8'));
        for(let i = 0;i < data.length;i++){
            if(data[i].id === parseInt(id)){
                data[i] = newData;
                this.productData = data;
                fs.writeFileSync(this.productDataFile,JSON.stringify(this.productData), err =>{
                    if(err) {
                        console.log(err);
                    }
                })
            } else{
                return 'Product not found...'
            }
        }
    }

    getAll(){
        //return array with all the objects
        try{
            let data = JSON.parse(fs.readFileSync(this.productDataFile,'utf-8'));
            this.productData = data;
            return this.productData;
        } catch (e){
            console.log(e);
        }
    }

    deleteById(id){
        console.log(id);
        try{
            let data = JSON.parse(fs.readFileSync(this.productDataFile,'utf-8'));
            for (let i = 0;i<data.length;i++){
                if(data[i].id === parseInt(id)){
                    data.splice(i,1);
                }
            }
            this.productData = data;
            fs.writeFileSync(this.productDataFile,JSON.stringify(this.productData));
        }catch(e){
            console.log(e);
        }
    }

    deleteAll(){
        //delete all objects of the file
        this.productData = []
        try{
            fs.writeFileSync(this.productDataFile,JSON.stringify(this.productData));
        }catch(e){
            console.log('error: ',e);
        }
    }

}

module.exports = Container
