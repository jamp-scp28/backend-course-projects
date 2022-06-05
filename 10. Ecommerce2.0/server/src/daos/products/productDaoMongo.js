import mongoCRUD from "../../containers/mongoCRUD.js";
import products from "../../containers/models/product.js";

class productDaoMongo extends mongoCRUD{
    constructor(conn){
        super(conn.models.products);
    }
}

export default productDaoMongo;