var admin = require("firebase-admin");

class firebaseCRUD{

    constructor(collectionName){
        this.collectionName = collectionName;
        const query = db.collection(collectionName);
    }

    async getData() {
        const querySnapshot = await query.get();
        let docs = querySnapshot.docs;

        const response = docs.map((doc)=> ({
            data: doc,
        }))
        console.log("response...");
        return response;
    }

    async insertRecord(data){
        await query.create(data);
        console.log('data inserted...');
    }

    async updateRecord(id,newData){
        const doc = query.doc(id);
        let item = await doc.update(newData);
        console.log("updated...");        
    }

    async deleteRecord(id){
        const doc = query.doc(id);
        const deleteRecord = await doc.delete();
        console.log("Deleted...");
    }
}

export default firebaseCRUD;