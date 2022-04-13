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

// //Initialize class and pass file
// let ct = new Container('datafile.json')
// //Create sample products
// let product1 = {'name':'TV','price':1000, 'category':'technology'}
// let product2 = {'name':'SmartWatch','price':600,'category':'technology'}
// let product3 = {'name':'GTX-1000','price':900,'category':'components'}

// /** METHOD NUMBER 1 
//  * SAVE
// */

// //Save products
// id1 = ct.save(product1);
// id2 = ct.save(product2);
// id3 = ct.save(product3);
// //Print IDS of saved products
// console.log('Printing IDs of objects \n');
// console.log(id1 + '\n' + id2 + '\n' + id3 + '\n');


// /** METHOD NUMBER 2 
//  * GET BY ID
// */
// obj = ct.getById(3);
// //Print Object
// console.log('Printing object retrieved by id \n');
// console.log(obj);
// console.log('\n');

// /** METHOD NUMBER 3 
//  * GET ALL
// */
// objects = ct.getAll();
// //Print Object
// console.log('Printing all products \n');
// console.log(objects);
// console.log('\n');

// /** METHOD NUMBER 4
//  * DELETE BY ID
// */
// console.log('Deleting object...');
// //ct.deleteById(2);
// console.log('Printing objects after deleting... \n');
// console.log(ct.productData);

// /** METHOD NUMBER 5
//  * DELETE ALL
// */
// console.log('Deleting ALL objects...');
// //ct.deleteAll();
// console.log('Printing data after deleting... \n');
// console.log(ct.productData);
