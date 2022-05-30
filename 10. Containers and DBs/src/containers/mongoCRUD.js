import mongoose, { model, mongo } from "mongoose";

class mongoCRUD{

    constructor(modelName){
        this.modelName = modelName;
    }

    async getData(modelName){
        let data = await model.modelName.find({});
        return data;
    }

    async insertRecord(modelName,data){
        const newRecord = data;
        const saveModel = new model.modelName(newRecord);
        let dataSaved = await saveModel.save();
        console.log('Record saved...');
    }

    async updateRecord(modelName,id,newData){
        let  dataUpdate = await model.modelName.updateOne({id: id},{
            $set: newData
        })
        console.log('Record updated...');
    }

    async deleteRecord(modelName,id){
        let dataDelete = await model.modelName.deleteOne({id: id});
        console.log("Record deleted...");
    }

}

export default mongoCRUD;