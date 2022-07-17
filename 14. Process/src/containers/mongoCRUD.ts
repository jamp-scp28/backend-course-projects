import mongoose from "mongoose";

export class mongoCRUD{

    modelName: any;

    constructor(modelName: any){
        this.modelName = modelName;
        console.log("printing model from mongo");
        console.log(modelName);
    }

    getData(func:Function){
        let data = [];
        this.modelName.find({}, function(err:String,result: String){
            if (err){
                console.log(err);
            }else {
                func(result);
            }
        });
    }

    insertRecord(data: any){
        const newRecord = data;
        const saveModel = this.modelName(newRecord);
        let dataSaved = saveModel.save();
        console.log('Record saved...');
    }

    updateRecord(id: number,newData: any){
        let Update = this.modelName.updateOne({_id: id},{
            $set: newData
        })
        console.log('Record updated...');
    }

    deleteRecord(id: number){
        let dataDelete = this.modelName.deleteOne({id: id});
        console.log("Record deleted...");
    }

}
