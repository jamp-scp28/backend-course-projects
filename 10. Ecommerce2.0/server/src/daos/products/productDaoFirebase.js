import firebaseCRUD from "../../containers/firebaseCRUD";

class productDaoFirebase extends firebaseCRUD{
    constructor(){
        super('products');
    }
}

export default productDaoFirebase;