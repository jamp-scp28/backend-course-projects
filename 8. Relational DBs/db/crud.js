class dataBase {
    //GET
    getProducts = (knex,callback) => {
        knex('products').select('id', 'title', 'price','thumbnail')
        .then((result) => {
            console.log(result);
            callback(result);
        }).catch((err) => {
            console.log(err);
        });
    }
    
    getChats = (knex,callback) => {
        knex('chat').select('id','email','messages')
        .then((result) => {
            console.log(result);
            callback(result);
        }).catch((err) => {
            console.log(err);
        });
    }
    
    //POST
    insertProduct = (knex,data) => {
        console.log('insertData',data);
        knex('products').insert(data)
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }
    
    insertChat = (knex,data) => {
        knex('chat').insert(data)
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }
    
    //PUT
    updateProducts = (knex,id,data) => {
        knex('products').where(id).update(data)
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }
    
    updateChat = (knex,id,data) => {
        knex('chat').where(id).update(data)
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }
    
    //DELETE
    deleteProducts = (knex) => {
        knex('products').del()
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }
    
    deleteChats = (knex) => {
        knex('chat').del()
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }

}

module.exports = dataBase;