const express = require('express')
const {Router} = require('express')
const router = Router()

const PORT = 5000

const app = express()

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api', router)

router.get("/products",(req, res)=>{
    res.json([{"title":"TV","price":1000,"thumbnail":"https://images.samsung.com/is/image/samsung/co-hd-t4300-un32t4300akxzl-frontblack-237576094?$2160_1728_PNG$","id":1},{"title":"SmartWatch","price":"15000","thumbnail":"https://m.media-amazon.com/images/I/61OUIIXnPqL._AC_UX522_.jpg","id":2}])
})

app.listen(PORT,()=>{console.log('app running on port',PORT)})

