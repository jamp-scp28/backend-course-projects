 0. Create Database

use ecommerce

--------

# 1. Create Collections and Documents

db.createCollection('products')
db.products.insertMany([
    {_id:1,timestamp:new ISODate(),name:"Smart TV",description:"none",code:"123",stock:100,price:2000,photo:"image.jpg"},
   
    {_id:2,timestamp:new ISODate(),name:"Smart TV",description:"none",code:"123",stock:100,price:2000,photo:"image.jpg"},
   
    {_id:3,timestamp:new ISODate(),name:"Smart TV",description:"none",code:"123",stock:100,price:2000,photo:"image.jpg"},
   
    {_id:4,timestamp:new ISODate(),name:"Smart TV",description:"none",code:"123",stock:100,price:2000,photo:"image.jpg"}
    
])

db.createCollection('messages')
db.messages.insertMany([
    {_id:1,email:"customer@gmail.com",message:"Good morning."},
    {_id:2,email:"seller@gmail.com",message:"Good morning, how can I help you."},
    {_id:3,email:"customer@gmail.com",message:"Thanks, could you please help me with my order."},
    {_id:4,email:"seller@gmail.com",message:"sure, could you please give me your order number?"},
    {_id:5,email:"customer@gmail.com",message:"ok, is: 12546"},
    {_id:6,email:"seller@gmail.com",message:"please, give me a minute I will check our database."},
    {_id:7,email:"customer@gmail.com",message:"ok, no problem."},
    {_id:8,email:"seller@gmail.com",message:"Sir. everything is ok with the order."},
    {_id:9,email:"customer@gmail.com",message:"Ok, thanks for your help."},
    {_id:10,email:"seller@gmail.com",message:"With pleasure, bye."},
])

--------

# 2. Define keys and custom prices list

Done in step No. 1

--------

# 3. List Documents in Each Collection

db.products.find()
db.messages.find()


--------

# 4. Show the Number of Documents per Collection

db.products.estimatedDocumentCount()
db.messages.estimatedDocumentCount()


--------

# 5. CRUD Operations

#### a. Add New Product:

db.products.insert({_id:11,title:"Backpack", price:420,thumbnail:"product11.jpg"})

#### b. Product Search:

##### I Products with price less than 1000
db.products.find({"price":{$lt: 1000}})

##### II Products with price between 1000 and 3000
db.products.find({$and: [{"price":{$gt: 1000}},{"price":{$lt: 3000}}]})

##### III Products with price over 3000
db.products.find({"price":{$gt: 3000}})

##### IV Get the name of the third cheapest product
db.products.find().sort({price: 1}).limit(1).skip(2)


#### c. Add Stock Field with a Default of 100 for each product

db.products.update(
    {},
    {$set: {stock: 100}},
    false, 
    true
)


#### d. Change stock of products above 4000

db.products.update(
    {price: {$gt: 4000}},
    {$set: {stock: 0}},
    false, 
    true
)

#### e. Delete Products with Price Under 10000

db.products.deleteMany({price: {$lt: 1000}})

--------

# 6. Create Pepe user

use admin
db.createUser({user:"Pepe",pwd:"123",roles:[{role:"read",db:"ecommerce"}]})
mongo -u Pepe -p 123 --authenticationDatabase ecommerce

#Checked read only permissions