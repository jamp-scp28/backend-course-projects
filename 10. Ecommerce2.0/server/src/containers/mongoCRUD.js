import mongoose from "mongoose";

class mongoCRUD{

    constructor(modelName){
        this.modelName = modelName;
        console.log("printing model from mongo");
        console.log(modelName);
    }

    getData(func){
        let data = [];
        this.modelName.find({}, function(err,result){
            if (err){
                console.log(err);
            }else {
                func(result);
            }
        });
    }

    insertRecord(data){
        const newRecord = data;
        const saveModel = this.modelName(newRecord);
        let dataSaved = saveModel.save();
        console.log('Record saved...');
    }

    updateRecord(id,newData){
        let Update = this.modelName.updateOne({_id: id},{
            $set: newData
        })
        console.log('Record updated...');
    }

    deleteRecord(id){
        let dataDelete = this.modelName.deleteOne({_id: id});
        console.log("Record deleted...");
    }

}

export default mongoCRUD;