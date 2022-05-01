const fs = require('fs');

class baseClass{

    //will receive a file path
    constructor(baseDataFile){
        this.baseDataFile = baseDataFile;
        this.objectId = 1;
        this.baseData = [];
    }

    save(object){
        //save object and return id
        
        let data = JSON.parse(fs.readFileSync(this.baseDataFile,'utf-8'));

        if (data != null && data.length > 0) {
            this.objectId = data[data.length-1].id + 1;
        } else{
            this.objectId = 1;
        }
        const timestp = new Date();
        object.id = this.objectId;
        object.timestamp = timestp;

        data.push(object);
        
        this.baseData = data;
        
        //write to file
        fs.writeFileSync(this.baseDataFile, JSON.stringify(this.baseData), err =>{
            if (err){
                console.log(err);
            }
        });
        this.objectId += 1;
        return 'ID: ' + object.id + ' assignated to object';
    }

    getById(id){
        let data = JSON.parse(fs.readFileSync(this.baseDataFile,'utf-8'));
        let foundID = null;

        console.log(id);
        for(let i = 0;i < data.length;i++){
            if(data[i].id === parseInt(id)){
                 foundID = i;
            }
        }

        return data[foundID]

    }

    update(id,newData){
        console.log(id, newData);
        let data = JSON.parse(fs.readFileSync(this.baseDataFile,'utf-8'));
        let foundId = null;

        for(let i = 0;i < data.length;i++){
            if(data[i].id === parseInt(id)){
                foundId = i;
            }
        }

        if(foundId != null){
            const newTimeStp = new Date();
            data[foundId] = newData;
            data[foundId].timestamp = newTimeStp;
            this.baseData = data;
            fs.writeFileSync(this.baseDataFile,JSON.stringify(this.baseData), err =>{
                if(err) {
                    console.log(err);
                }
            })
        } else {
            return "item not found..."
        }
    }

    getAll(){
        //return array with all the objects
        try{
            let data = JSON.parse(fs.readFileSync(this.baseDataFile,'utf-8'));
            this.baseData = data;
            return this.baseData;
        } catch (e){
            console.log(e);
        }
    }

    deleteById(id){
        let foundID = null

        try{
            let data = JSON.parse(fs.readFileSync(this.baseDataFile,'utf-8'));
            for (let i = 0;i<data.length;i++){
                if(data[i].id === parseInt(id)){
                    foundID = i
                }
            }
            if(foundID != null){
                data.splice(foundID,1);
            }
            this.baseData = data;
            fs.writeFileSync(this.baseDataFile,JSON.stringify(this.baseData));
        }catch(e){
            console.log(e);
        }
    }

    deleteByProductId(objId, productId){
        let foundObjID = null
        let foundProductID = null

        try{
            let data = JSON.parse(fs.readFileSync(this.baseDataFile,'utf-8'));
            
            for (let i = 0;i<data.length;i++){
                if(data[i].id === parseInt(objId)){
                    foundObjID = i
                }
            }

            if(foundObjID != null){
                let obj = data[foundObjID]
                if (obj.products != null){
                    for (let o=0;o<obj.products.length;o++){
                        console.log('login again...',obj.products)
                        if(obj.products[o].id === parseInt(productId)){
                            foundProductID = o
                        }
                    }
                }
            }

            if (foundProductID != null){
                data[foundObjID].products.splice(foundProductID,1);
            }

            this.baseData = data;
            fs.writeFileSync(this.baseDataFile,JSON.stringify(this.baseData));
        }catch(e){
            console.log(e);
        }
    }

    deleteAll(){
        //delete all objects of the file
        this.baseData = []
        try{
            fs.writeFileSync(this.baseDataFile,JSON.stringify(this.baseData));
        }catch(e){
            console.log('error: ',e);
        }
    }
}

module.exports = baseClass
