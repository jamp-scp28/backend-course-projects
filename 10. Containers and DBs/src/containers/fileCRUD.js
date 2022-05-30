import fs from 'fs';

class FileContainerClass {

    constructor(dbFile){
        this.dbFile = dbFile;
    }

    Insert(newObject){
        let data = this.ReadFile(this.dbFile);
        let [newId, timeStp] = this.AssignIdandTimeStamp(data);
        newObject.id = newId;
        newObject.timestamp = timeStp;
        data.push(newObject);
        let response = this.SaveFile(this.dbFile,data);
        console.log(response);
    }

    UpdateObject(id,newData){
        let data = this.ReadFile(this.dbFile);
        let [obj,position] = this.findObjectByID(id);

        if(obj != null){
            data[position] = newData;
            this.SaveFile(this.dbFile,data);
        } else {
            return "item not found..."
        }

    }

    findObjectByID(id){
        let data = this.ReadFile(this.dbFile);
        let foundID = null;
    
        for(let i = 0;i < data.length;i++){
            if(data[i].id === parseInt(id)){
                 foundID = i;
            }
        }
        
        if (foundID != null){
            return [data[foundID],foundID]
        }else {
            return null
        }
    }

    GetAllObjects(){
        let data = this.ReadFile(this.dbFile);
        return data;
    }
    
    DeleteProduct(id){
        let data = this.ReadFile(this.dbFile);
        let [obj,position] = this.findObjectByID(id);
        data.splice(position,1);
        this.SaveFile(this.dbFile,data);
    }

    /* --------------------------------------- */
    /*  Helper Functions */
    /* --------------------------------------- */

    ReadFile(dbFile){
        try{
            const data = JSON.parse(fs.readFileSync(dbFile,'utf-8'));
            return data;
        }catch(err){
            console.log(err);
        }
    }

    SaveFile(dbFile,data){
        fs.writeFileSync(dbFile, JSON.stringify(data), err =>{
            if (err){
                console.log(err);
            }
        });
        return "200: data saved...";
    }

    AssignIdandTimeStamp(data){        
        let objectId;

        if (data != null && data.length > 0) {
            objectId = data[data.length-1].id + 1;
        } else{
            objectId = 1;
        }

        const timeStamp = new Date();

        return [objectId,timeStamp]
    }

}

export default FileContainerClass
