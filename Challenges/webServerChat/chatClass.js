const fs = require('fs');

class chatClass{

    //will receive a file path
    constructor(chatDataFile){
        this.chatDataFile = chatDataFile;
        this.objectId = 1;
        this.chatData = [];
    }

    save(object){
        //save object and return id
        
        let data = JSON.parse(fs.readFileSync(this.chatDataFile,'utf-8'));

        if (data != null) {
            this.objectId = data[data.length-1].id + 1; 
        } else{
            this.objectId = 1;
        }
        
        object.id = this.objectId;
        data.push(object);
        
        this.chatData = data;
        
        //write to file
        fs.writeFileSync(this.chatDataFile, JSON.stringify(this.chatData), err =>{
            if (err){
                console.log(err);
            }
        });
        this.objectId += 1;
        return 'ID: ' + object.id + ' assignated to object';
    }

    getById(id){
        let data = JSON.parse(fs.readFileSync(this.chatDataFile,'utf-8'));
        for(let i = 0;i < data.length;i++){
            if(data[i].id === parseInt(id)){
                return data[i];
            } else{
                return 'chat not found...'
            }
        }

    }

    update(id,newData){
        console.log(id, newData);
        let data = JSON.parse(fs.readFileSync(this.chatDataFile,'utf-8'));
        for(let i = 0;i < data.length;i++){
            if(data[i].id === parseInt(id)){
                data[i] = newData;
                this.chatData = data;
                fs.writeFileSync(this.chatDataFile,JSON.stringify(this.chatData), err =>{
                    if(err) {
                        console.log(err);
                    }
                })
            } else{
                return 'chat not found...'
            }
        }
    }

    getAll(){
        //return array with all the objects
        try{
            let data = JSON.parse(fs.readFileSync(this.chatDataFile,'utf-8'));
            this.chatData = data;
            return this.chatData;
        } catch (e){
            console.log(e);
        }
    }

    deleteById(id){
        console.log(id);
        try{
            let data = JSON.parse(fs.readFileSync(this.chatDataFile,'utf-8'));
            for (let i = 0;i<data.length;i++){
                if(data[i].id === parseInt(id)){
                    data.splice(i,1);
                }
            }
            this.chatData = data;
            fs.writeFileSync(this.chatDataFile,JSON.stringify(this.chatData));
        }catch(e){
            console.log(e);
        }
    }

    deleteAll(){
        //delete all objects of the file
        this.chatData = []
        try{
            fs.writeFileSync(this.chatDataFile,JSON.stringify(this.chatData));
        }catch(e){
            console.log('error: ',e);
        }
    }

}

module.exports = chatClass
