import mongoCRUD from "../../containers/mongoCRUD";
import products from "../../containers/models/product";

class productDaoMongo extends mongoCRUD{
    constructor(){
        super(products);
    }
}

export default productDaoMongo;